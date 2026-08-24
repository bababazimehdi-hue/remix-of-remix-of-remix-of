/**
 * Notification Service: Syncs notifications across all devices in real-time.
 * 
 * This service ensures that when any user creates a notification (bonus, penalty,
 * task assignment, etc.), it is immediately synced to Supabase and delivered to
 * all relevant users' devices - even if they are offline at the moment.
 * 
 * Features:
 * - Sends notifications to Supabase for cross-device sync
 * - Works with national internet shutdown (queues locally via IndexedDB)
 * - Supports targeted notifications (specific users or roles)
 * - Integrates with existing alarm system (sound, vibrate, timing)
 * - Uses SyncEngine for reliable offline-first synchronization
 */

import { supabase } from '@/integrations/supabase/client';
import type { AppNotification, NotifyInput, AlarmEventKey, Role, User } from './store';
import { nowISO } from './datetime';
import { getSyncEngine } from './sync-engine';
import { uid } from './store';

export interface NotificationSendResult {
  success: boolean;
  notificationId?: string;
  error?: string;
  queuedForSync?: boolean;
}

export class NotificationService {
  private syncEngine = getSyncEngine();
  
  constructor() {
    // SyncEngine already handles network status monitoring
  }

  /**
   * Send a notification to specific users or roles.
   * This notification will be synced across all devices via Supabase.
   * 
   * @param notification - Notification data (title, body, target users/roles, etc.)
   * @param event - Optional alarm event key for sound/vibrate configuration
   * @returns Promise with result of the send operation
   */
  async send(
    notification: Omit<NotifyInput, 'id' | 'isRead' | 'createdAt' | 'deliverAt' | 'delivered'>,
    event?: AlarmEventKey
  ): Promise<NotificationSendResult> {
    try {
      const notificationId = uid('n');
      const deliverAt = this.computeDeliverAt(notification.userRole, notification.priority);
      
      const fullNotification: AppNotification = {
        ...notification,
        priority: notification.priority ?? 'NORMAL',
        id: notificationId,
        isRead: false,
        createdAt: nowISO(),
        deliverAt: deliverAt.toISOString(),
        delivered: false,
      };

      // Queue for sync via SyncEngine (works offline)
      await this.queueForSync(fullNotification);
      
      return {
        success: true,
        notificationId,
        queuedForSync: true,
      };
    } catch (error) {
      console.error('[NotificationService] Failed to send notification:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Queue notification for sync via SyncEngine.
   * This ensures the notification will be sent even if offline.
   */
  private async queueForSync(notification: AppNotification): Promise<void> {
    const row = this.notificationToRow(notification);
    
    await this.syncEngine.queueOperation({
      operation: 'insert',
      table: 'notifications',
      data: row,
    });

    console.log('[NotificationService] Notification queued for sync:', notification.id);
  }

  /**
   * Convert notification to database row format.
   */
  private notificationToRow(notification: AppNotification): any {
    return {
      id: notification.id,
      user_roles: notification.userRole,
      user_ids: notification.userIds ?? [],
      title: notification.title,
      body: notification.body,
      url: notification.url,
      type: notification.type,
      priority: notification.priority ?? 'NORMAL',
      vibrate_pattern: notification.vibratePattern ?? null,
      deliver_at: notification.deliverAt,
      delivered: notification.delivered,
      read_by: [],
      created_by: notification.userIds?.[0] ?? null,
      created_at: notification.createdAt,
    };
  }

  /**
   * Compute delivery time based on alarm settings.
   */
  private computeDeliverAt(roles: Role[], priority?: string): Date {
    // For urgent notifications, deliver immediately
    if (priority === 'URGENT') {
      return new Date();
    }

    // For other notifications, respect quiet hours (simplified version)
    const now = new Date();
    const currentHour = now.getHours();
    
    // Default quiet hours: 23:00 - 07:00
    if (currentHour >= 23 || currentHour < 7) {
      // Schedule for 7 AM
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(7, 0, 0, 0);
      return tomorrow;
    }

    return now;
  }

  /**
   * Send bonus/penalty notification.
   */
  async sendBonusPenalty(
    userId: string,
    amount: number,
    isBonus: boolean,
    description: string
  ): Promise<NotificationSendResult> {
    return this.send({
      userRole: ['MECHANIC', 'EMPLOYEE'],
      userIds: [userId],
      title: isBonus ? '🎉 پاداش' : '⚠️ جریمه',
      body: `${isBonus ? 'پاداش' : 'جریمه'}: ${amount.toLocaleString()} تومان\n${description}`,
      url: '/earnings',
      type: 'expense',
      priority: 'IMPORTANT',
    }, 'BONUS_PENALTY');
  }

  /**
   * Send task assignment notification.
   */
  async sendTaskAssignment(
    workerId: string,
    taskTitle: string,
    priority: string
  ): Promise<NotificationSendResult> {
    return this.send({
      userRole: ['MECHANIC'],
      userIds: [workerId],
      title: '🔧 وظیفه جدید',
      body: `وظیفه جدید به شما محول شد: ${taskTitle}`,
      url: '/tasks',
      type: 'task',
      priority: priority === 'URGENT' ? 'URGENT' : 'NORMAL',
    }, 'NEW_TASK');
  }

  /**
   * Send message notification.
   */
  async sendMessage(
    recipientId: string,
    messageText: string,
    isUrgent: boolean = false
  ): Promise<NotificationSendResult> {
    return this.send({
      userRole: ['ADMIN', 'GENERAL_MANAGER', 'STORE_MANAGER', 'EMPLOYEE'],
      userIds: [recipientId],
      title: isUrgent ? '🚨 پیام فوری' : '💬 پیام جدید',
      body: messageText.slice(0, 100) + (messageText.length > 100 ? '...' : ''),
      url: '/messages',
      type: 'message',
      priority: isUrgent ? 'URGENT' : 'NORMAL',
    }, isUrgent ? 'URGENT_MESSAGE' : 'NEW_MESSAGE');
  }
}

// Singleton instance
let notificationServiceInstance: NotificationService | null = null;

/**
 * Get or create the global notification service instance.
 */
export function getNotificationService(): NotificationService {
  if (!notificationServiceInstance) {
    notificationServiceInstance = new NotificationService();
  }
  return notificationServiceInstance;
}
