/**
 * Minimal IndexedDB persistence layer used purely to survive a page reload
 * while a change has not yet reached Supabase (e.g. the device lost signal
 * right after the user saved something).
 *
 * This is deliberately small: a single `state` object store keyed by string,
 * storing arbitrary JSON-serialisable snapshots. `store.tsx` uses it to keep
 * one pending "not yet confirmed" write per signed-in user, so that write is
 * retried automatically (with backoff) instead of being silently lost.
 */

import { openDB, type DBSchema, type IDBPDatabase } from "idb";

export interface DezzRekabDB extends DBSchema {
  state: {
    key: string;
    value: {
      key: string;
      data: unknown;
      timestamp: number;
    };
  };
}

const DB_NAME = "dezz-rekab-db";
const DB_VERSION = 2;

let dbInstance: IDBPDatabase<DezzRekabDB> | null = null;

/** Initialise or get the shared IndexedDB database instance. */
export async function getDB(): Promise<IDBPDatabase<DezzRekabDB>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<DezzRekabDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Older versions of this database (v1) shipped `syncQueue`, `cache`
      // and `preferences` stores that turned out to be unused dead code;
      // they are dropped here so the schema stays lean.
      const legacyStores = ["syncQueue", "cache", "preferences"];
      for (const legacy of legacyStores) {
        if (db.objectStoreNames.contains(legacy as never)) {
          db.deleteObjectStore(legacy as never);
        }
      }
      if (!db.objectStoreNames.contains("state")) {
        db.createObjectStore("state", { keyPath: "key" });
      }
    },
  });

  return dbInstance;
}

/** Save an arbitrary JSON-serialisable snapshot under `key`. */
export async function saveState(key: string, data: unknown): Promise<void> {
  const db = await getDB();
  await db.put("state", { key, data, timestamp: Date.now() });
}

/** Load a previously saved snapshot, or `null` if none exists. */
export async function loadState<T = unknown>(key: string): Promise<T | null> {
  const db = await getDB();
  const record = await db.get("state", key);
  return (record?.data as T | undefined) ?? null;
}

/** Remove a saved snapshot (e.g. once a pending write has been confirmed). */
export async function clearState(key: string): Promise<void> {
  const db = await getDB();
  await db.delete("state", key);
}
