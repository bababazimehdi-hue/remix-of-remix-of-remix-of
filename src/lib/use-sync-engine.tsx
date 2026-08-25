/**
 * React hook for sync status monitoring.
 * 
 * Provides real-time sync status and statistics to UI components.
 */

import { useEffect, useState, useCallback } from 'react';
import { getSyncEngine, type SyncEngineStatus, type SyncStats } from './sync-engine';

export interface UseSyncResult {
  /** Current sync status */
  status: SyncEngineStatus;
  /** Sync statistics */
  stats: SyncStats | null;
  /** Whether currently syncing */
  isSyncing: boolean;
  /** Whether offline */
  isOffline: boolean;
  /** Whether there are failed operations */
  hasFailed: boolean;
  /** Pending operations count */
  pendingCount: number;
  /** Manually trigger sync */
  triggerSync: () => Promise<void>;
  /** Clear all pending operations */
  clearPending: () => Promise<void>;
}

/**
 * Hook to monitor and control the sync engine.
 */
export function useSyncEngine(): UseSyncResult {
  const [status, setStatus] = useState<SyncEngineStatus>('idle');
  const [stats, setStats] = useState<SyncStats | null>(null);
  
  const syncEngine = getSyncEngine();

  useEffect(() => {
    // Subscribe to sync status changes
    const unsubscribe = syncEngine.subscribe((newStatus, newStats) => {
      setStatus(newStatus);
      setStats(newStats);
    });

    return () => {
      unsubscribe();
    };
  }, [syncEngine]);

  const triggerSync = useCallback(async () => {
    await syncEngine.triggerSync();
  }, [syncEngine]);

  const clearPending = useCallback(async () => {
    await syncEngine.clearPendingOperations();
  }, [syncEngine]);

  return {
    status,
    stats,
    isSyncing: status === 'syncing',
    isOffline: stats?.isOnline === false,
    hasFailed: (stats?.failed ?? 0) > 0,
    pendingCount: stats?.pending ?? 0,
    triggerSync,
    clearPending,
  };
}

/**
 * Simple component to display sync status indicator.
 */
export function SyncStatusIndicator() {
  const { status, isOffline, pendingCount, hasFailed } = useSyncEngine();

  // Don't render anything if SSR
  if (typeof window === 'undefined') {
    return null;
  }

  const getStatusColor = () => {
    if (isOffline) return 'bg-yellow-500';
    if (hasFailed) return 'bg-red-500';
    if (status === 'syncing') return 'bg-blue-500 animate-pulse';
    if (status === 'idle' && pendingCount === 0) return 'bg-green-500';
    return 'bg-gray-500';
  };

  const getStatusText = () => {
    if (isOffline) return 'آفلاین';
    if (hasFailed) return 'خطا در سینک';
    if (status === 'syncing') return 'در حال سینک...';
    if (pendingCount > 0) return `${pendingCount} عملیات در صف`;
    return 'همگام‌سازی شده';
  };

  return (
    <div className="flex items-center text-xs" title={getStatusText()}>
      <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
    </div>
  );
}
