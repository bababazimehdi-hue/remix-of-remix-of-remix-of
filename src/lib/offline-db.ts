/**
 * IndexedDB persistence layer for offline-first functionality.
 * 
 * Provides local storage that works even when internet is cut off (national internet shutdown).
 * All data is stored locally and synced when connection returns.
 */

import { openDB, type DBSchema, type IDBPDatabase } from 'idb';

export interface DezzRekabDB extends DBSchema {
  state: {
    key: string;
    value: {
      key: string;
      data: any;
      timestamp: number;
    };
  };
  syncQueue: {
    key: string;
    value: {
      id: string;
      operation: 'insert' | 'update' | 'delete';
      table: string;
      data: any;
      timestamp: number;
      retries: number;
      status: 'pending' | 'syncing' | 'failed';
      error?: string;
    };
    indexes: {
      byStatus: string;
      byTimestamp: number;
    };
  };
  cache: {
    key: string;
    value: {
      key: string;
      data: any;
      timestamp: number;
      expiresAt: number;
    };
    indexes: {
      byExpiresAt: number;
    };
  };
  preferences: {
    key: string;
    value: {
      key: string;
      value: any;
      updatedAt: number;
    };
  };
}

const DB_NAME = 'dezz-rekab-db';
const DB_VERSION = 1;

let dbInstance: IDBPDatabase<DezzRekabDB> | null = null;

/**
 * Initialize or get the IndexedDB database instance.
 */
export async function getDB(): Promise<IDBPDatabase<DezzRekabDB>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<DezzRekabDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // State store
      if (!db.objectStoreNames.contains('state')) {
        db.createObjectStore('state', { keyPath: 'key' });
      }

      // Sync queue store with indexes
      if (!db.objectStoreNames.contains('syncQueue')) {
        const store = db.createObjectStore('syncQueue', { keyPath: 'id' });
        store.createIndex('byStatus', 'status');
        store.createIndex('byTimestamp', 'timestamp');
      }

      // Cache store
      if (!db.objectStoreNames.contains('cache')) {
        const store = db.createObjectStore('cache', { keyPath: 'key' });
        store.createIndex('byExpiresAt', 'expiresAt');
      }

      // Preferences store
      if (!db.objectStoreNames.contains('preferences')) {
        db.createObjectStore('preferences', { keyPath: 'key' });
      }
    },
  });

  return dbInstance;
}

/**
 * Save app state snapshot to IndexedDB.
 */
export async function saveState(key: string, data: any): Promise<void> {
  const db = await getDB();
  await db.put('state', {
    key,
    data,
    timestamp: Date.now(),
  });
}

/**
 * Load app state snapshot from IndexedDB.
 */
export async function loadState(key: string): Promise<any | null> {
  const db = await getDB();
  const record = await db.get('state', key);
  return record?.data ?? null;
}

/**
 * Add an operation to the sync queue.
 */
export async function enqueueOperation(operation: {
  operation: 'insert' | 'update' | 'delete';
  table: string;
  data: any;
}): Promise<string> {
  const db = await getDB();
  const id = `${operation.table}_${operation.operation}_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  
  await db.add('syncQueue', {
    id,
    ...operation,
    timestamp: Date.now(),
    retries: 0,
    status: 'pending',
  });

  return id;
}

/**
 * Get all pending operations from the sync queue.
 */
export async function getPendingOperations(): Promise<Array<{
  id: string;
  operation: 'insert' | 'update' | 'delete';
  table: string;
  data: any;
  timestamp: number;
  retries: number;
  status: 'pending' | 'syncing' | 'failed';
  error?: string;
}>> {
  const db = await getDB();
  const index = db.transaction('syncQueue').store.index('byStatus');
  const pending = await index.getAll('pending');
  return pending;
}

/**
 * Mark an operation as syncing.
 */
export async function markOperationSyncing(id: string): Promise<void> {
  const db = await getDB();
  const op = await db.get('syncQueue', id);
  if (op) {
    await db.put('syncQueue', { ...op, status: 'syncing' as const });
  }
}

/**
 * Mark an operation as completed and remove from queue.
 */
export async function completeOperation(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('syncQueue', id);
}

/**
 * Mark an operation as failed and increment retry counter.
 */
export async function failOperation(id: string, error: string): Promise<void> {
  const db = await getDB();
  const op = await db.get('syncQueue', id);
  if (op) {
    const maxRetries = 5;
    if (op.retries >= maxRetries) {
      // Keep in queue but mark as failed for manual review
      await db.put('syncQueue', { 
        ...op, 
        status: 'failed' as const, 
        error,
        retries: op.retries + 1 
      });
    } else {
      await db.put('syncQueue', { 
        ...op, 
        status: 'pending' as const, 
        error,
        retries: op.retries + 1 
      });
    }
  }
}

/**
 * Cache a server response.
 */
export async function cacheResponse(key: string, data: any, ttlMs: number = 5 * 60 * 1000): Promise<void> {
  const db = await getDB();
  await db.put('cache', {
    key,
    data,
    timestamp: Date.now(),
    expiresAt: Date.now() + ttlMs,
  });
}

/**
 * Get cached response if not expired.
 */
export async function getCachedResponse(key: string): Promise<any | null> {
  const db = await getDB();
  const record = await db.get('cache', key);
  
  if (!record) return null;
  
  if (Date.now() > record.expiresAt) {
    // Expired, delete it
    await db.delete('cache', key);
    return null;
  }
  
  return record.data;
}

/**
 * Clear expired cache entries.
 */
export async function clearExpiredCache(): Promise<void> {
  const db = await getDB();
  const now = Date.now();
  const tx = db.transaction('cache', 'readwrite');
  const index = tx.store.index('byExpiresAt');
  
  let cursor = await index.openCursor();
  while (cursor) {
    if (cursor.value.expiresAt < now) {
      await cursor.delete();
    }
    cursor = await cursor.continue();
  }
}

/**
 * Save user preference.
 */
export async function savePreference(key: string, value: any): Promise<void> {
  const db = await getDB();
  await db.put('preferences', {
    key,
    value,
    updatedAt: Date.now(),
  });
}

/**
 * Load user preference.
 */
export async function loadPreference(key: string): Promise<any | null> {
  const db = await getDB();
  const record = await db.get('preferences', key);
  return record?.value ?? null;
}

/**
 * Get sync queue statistics.
 */
export async function getSyncStats(): Promise<{
  pending: number;
  syncing: number;
  failed: number;
  oldestPending?: number;
}> {
  const db = await getDB();
  const all = await db.getAll('syncQueue');
  
  const pending = all.filter((op: any) => op.status === 'pending');
  const syncing = all.filter((op: any) => op.status === 'syncing');
  const failed = all.filter((op: any) => op.status === 'failed');
  
  return {
    pending: pending.length,
    syncing: syncing.length,
    failed: failed.length,
    oldestPending: pending.length > 0 ? Math.min(...pending.map((op: any) => op.timestamp)) : undefined,
  };
}

/**
 * Clear all data from the database (use with caution).
 */
export async function clearAllData(): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(['state', 'syncQueue', 'cache', 'preferences'], 'readwrite');
  await tx.objectStore('state').clear();
  await tx.objectStore('syncQueue').clear();
  await tx.objectStore('cache').clear();
  await tx.objectStore('preferences').clear();
  await tx.done;
}
