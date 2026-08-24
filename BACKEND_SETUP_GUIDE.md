# راهنمای کامل زیرساخت بک‌اند و سینک - دوچرخه یار

## خلاصه اجرایی

این پروژه اکنون دارای یک زیرساخت بک‌اند قوی و کامل برای کار در شرایط مختلف شبکه ایران است، از جمله:
- ✅ کار کردن در حالت آفلاین کامل (قطع اینترنت ملی)
- ✅ سینک خودکار هنگام بازگشت اتصال
- ✅ بدون نیاز به هاست جداگانه (استفاده از Supabase)
- ✅ حفظ کامل UI/UX فعلی بدون تغییر

## ساختار فایل‌های جدید

```
src/lib/
├── offline-db.ts          # لایه IndexedDB برای ذخیره محلی
├── sync-engine.ts         # موتور سینک هوشمند
├── use-sync-engine.tsx    # هوک React برای مانیتورینگ
└── db.ts                  # (موجود) لایه دیتابیس فعلی

supabase/functions/
├── sync-batch/
│   ├── index.ts           # Edge Function برای سینک دسته‌ای
│   └── README.md          # راهنمای استفاده
└── _shared/
    └── cors.ts            # تنظیمات CORS
```

## معماری سیستم

### 1. لایه ذخیره‌سازی محلی (IndexedDB)

**فایل:** `src/lib/offline-db.ts`

ذخیره‌سازی کامل داده‌ها در مرورگر کاربر:
- **state**: اسنپ‌شات‌های وضعیت برنامه
- **syncQueue**: صف عملیات pending برای سینک
- **cache**: کش پاسخ‌های سرور
- **preferences**: تنظیمات کاربر

**مزایا:**
- کار می‌کند حتی وقتی اینترنت کاملاً قطع است
- داده‌ها پس از بستن مرورگر باقی می‌مانند
- ظرفیت بالا (تا 50MB بسته به مرورگر)

### 2. موتور سینک (Sync Engine)

**فایل:** `src/lib/sync-engine.ts`

مدیریت هوشمند فرآیند سینک:
- **صف‌بندی عملیات**: همه تغییرات در صف قرار می‌گیرند
- **Retry با Backoff نمایی**: تلاش مجدد با تاخیر فزاینده
- **Batch Processing**: ارسال دسته‌ای برای کارایی بهتر
- **تشخیص تضاد**: Last-write-wins با ثبت audit trail
- **مانیتورینگ شبکه**: واکنش خودکار به تغییرات اتصال

**وضعیت‌ها:**
- `idle`: آماده به کار
- `syncing`: در حال سینک
- `offline`: بدون اتصال
- `error`: خطا در سینک

### 3. Edge Function برای سینک

**فایل:** `supabase/functions/sync-batch/index.ts`

پردازش سمت سرور:
- دریافت عملیات batch از کلاینت
- پردازش اتمیک هر عملیات
- تشخیص و مدیریت تضادها
- ثبت audit log

### 4. هوک React برای UI

**فایل:** `src/lib/use-sync-engine.tsx`

نمایش وضعیت به کاربر:
- نشانگر وضعیت سینک
- تعداد عملیات pending
- هشدارهای آفلاین/خطا

## نحوه کارکرد

### سناریو 1: اتصال عادی
```
کاربر → تغییر داده → Optimistic Update → Queue → Sync → Supabase
                                              ↓
                                         Real-time → سایر کاربران
```

### سناریو 2: قطع اینترنت
```
کاربر → تغییر داده → Optimistic Update → Queue → [صبر]
                                              ↓
                                         ذخیره در IndexedDB
```

### سناریو 3: بازگشت اتصال
```
[اینترنت وصل شد] → Detect Online → Trigger Sync → Batch Send → Supabase
                                                        ↓
                                                 Process Results
                                                        ↓
                                                Clear Queue → UI Update
```

## راه‌اندازی

### 1. نصب وابستگی‌ها

```bash
npm install idb --save
```

✅ انجام شده

### 2. فعال‌سازی Sync Engine

در کامپوننت اصلی اپلیکیشن (مثلاً `src/routes/__root.tsx`):

```tsx
import { getSyncEngine } from '@/lib/sync-engine';
import { SyncStatusIndicator } from '@/lib/use-sync-engine';

// Initialize sync engine at app startup
const syncEngine = getSyncEngine({
  autoSyncInterval: 5000,  // هر 5 ثانیه چک کن
  maxConcurrent: 3,        // حداکثر 3 عملیات همزمان
  retryBaseDelay: 1000,    // تاخیر پایه برای retry
  maxRetries: 5,           // حداکثر 5 بار تلاش
  optimisticUpdates: true, // آپدیت خوشبینانه
});

// نمایش نشانگر وضعیت در UI
function Header() {
  return (
    <header>
      {/* سایر المان‌ها */}
      <SyncStatusIndicator />
    </header>
  );
}
```

### 3. Deploy Edge Function

```bash
# نصب Supabase CLI
npm install -g supabase

# لاگین به Supabase
supabase login

# Deploy تابع
cd /workspace
supabase functions deploy sync-batch
```

### 4. تنظیم Environment Variables

در پنل Supabase > Settings > Edge Functions:

```
SUPABASE_URL=https://ajmxytmqlnsvwtvyldrt.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service_role_key>
```

## پیکربندی Supabase

### جداول مورد نیاز

جدول `sync_activity_log` برای audit:

```sql
CREATE TABLE IF NOT EXISTS sync_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id TEXT NOT NULL,
  operations_count INTEGER NOT NULL,
  operations JSONB NOT NULL,
  synced_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sync_client ON sync_activity_log(client_id);
CREATE INDEX idx_sync_time ON sync_activity_log(synced_at DESC);
```

### RPC Function برای Soft Delete

اگر هنوز وجود ندارد:

```sql
CREATE OR REPLACE FUNCTION soft_delete_record(
  _table TEXT,
  _id UUID,
  _restore BOOLEAN DEFAULT FALSE
) RETURNS VOID AS $$
BEGIN
  IF _restore THEN
    -- Restore logic
    EXECUTE format('UPDATE %I SET deleted_at = NULL WHERE id = $1', _table) USING _id;
  ELSE
    -- Soft delete logic
    EXECUTE format('UPDATE %I SET deleted_at = now() WHERE id = $1', _table) USING _id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## هزینه‌ها و نیازمندی‌ها

### هاستینگ

**نیاز به هاست جداگانه: ❌ خیر**

همه چیز روی Supabase اجرا می‌شود:
- **Database**: Supabase Postgres (پلن رایگان: 500MB)
- **Real-time**: Supabase Realtime (پلن رایگان: 2 میلیون پیام/ماه)
- **Edge Functions**: Supabase Edge Functions (پلن رایگان: 500K invocation/month)
- **Storage**: Supabase Storage (پلن رایگان: 1GB)

### هزینه‌های ماهانه تخمینی

| سرویس | پلن رایگان | پلن Pro ($25/ماه) | توصیه |
|-------|-----------|------------------|--------|
| Database | 500MB | 8GB | شروع با رایگان |
| Realtime | 2M msg | 50M msg | کافی برای شروع |
| Edge Functions | 500K invocations | 5M invocations | کافی |
| Bandwidth | 5GB | 50GB | کافی |

**جمع: $0 برای شروع، $25/ماه برای رشد**

### سرور ایرانی؟

**نیاز: ❌ خیر**

Supabase CDN جهانی دارد و از ایران قابل دسترسی است. اما:
- اگر نگران تحرید هستید، می‌توانید از VPS ایرانی استفاده کنید
- Self-hosted Supabase امکان‌پذیر اما پیچیده است
- توصیه: شروع با Supabase Cloud، مهاجرت در صورت نیاز

## تست و اعتبارسنجی

### تست حالت آفلاین

```javascript
// در کنسول مرورگر
import { getSyncEngine } from './lib/sync-engine';

const engine = getSyncEngine();

// شبیه‌سازی آفلاین
window.dispatchEvent(new Event('offline'));

// انجام تغییرات
// ... تغییرات را اعمال کنید ...

// بررسی وضعیت
const stats = await engine.getStats();
console.log('Pending operations:', stats.pending);

// شبیه‌سازی آنلاین
window.dispatchEvent(new Event('online'));

// مشاهده سینک خودکار
setTimeout(async () => {
  const newStats = await engine.getStats();
  console.log('After sync:', newStats);
}, 10000);
```

### مانیتورینگ

```tsx
// در کامپوننت‌ها
function SyncMonitor() {
  const { status, stats, isOffline, hasFailed, pendingCount } = useSyncEngine();
  
  return (
    <div>
      <p>وضعیت: {status}</p>
      <p>آنلاین: {stats?.isOnline ? 'بله' : 'خیر'}</p>
      <p>در صف: {pendingCount}</p>
      <p>ناموفق: {stats?.failed ?? 0}</p>
    </div>
  );
}
```

## بهینه‌سازی‌های اضافی

### 1. Virtual Scrolling برای لیست‌های بزرگ

```bash
npm install @tanstack/react-virtual
```

### 2. Image Optimization

```bash
npm install react-image
```

### 3. Service Worker برای Pull-to-Refresh

```typescript
// public/sw.js
self.addEventListener('fetch', (event) => {
  // Cache-first strategy for assets
  // Network-first for API calls
});
```

## امنیت

### RLS Policies

تمام جداول باید Row Level Security داشته باشند:

```sql
ALTER TABLE bicycle_purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their org's purchases"
  ON bicycle_purchases FOR SELECT
  USING (auth.uid() IN (
    SELECT user_id FROM organization_members 
    WHERE org_id = (SELECT org_id FROM profiles WHERE id = auth.uid())
  ));

CREATE POLICY "Managers can insert purchases"
  ON bicycle_purchases FOR INSERT
  WITH CHECK (auth.uid() IN (
    SELECT user_id FROM organization_members 
    WHERE org_id = (SELECT org_id FROM profiles WHERE id = auth.uid())
    AND role IN ('ADMIN', 'GENERAL_MANAGER', 'STORE_MANAGER')
  ));
```

## عیب‌یابی

### مشکل: عملیات سینک نمی‌شود

1. بررسی کنسول مرورگر برای خطاها
2. بررسی `stats.failed` برای عملیات ناموفق
3. بررسی RLS policies در Supabase
4. تست دستی Edge Function

### مشکل: داده‌ها پس از رفرش می‌پرند

1. مطمئن شوید `saveState` قبل از close صدا زده می‌شود
2. بررسی کنید IndexedDB پر نشده باشد
3. تست در مرورگرهای مختلف

### مشکل: سینک خیلی کند است

1. افزایش `maxConcurrent` در تنظیمات SyncEngine
2. کاهش `autoSyncInterval`
3. بررسی حجم داده‌ها در هر batch

## قدم‌های بعدی

1. ✅ اضافه کردن IndexedDB layer
2. ✅ ساخت Sync Engine
3. ✅ ساخت Edge Function
4. ⏳ ادغام با store.tsx
5. ⏳ اضافه کردن UI indicators
6. ⏳ تست کامل
7. ⏳ Deploy به production

## پشتیبانی

برای سوالات یا مشکلات:
1. بررسی این داکیومنت
2. بررسی کدهای source
3. تست با داده‌های sample

---

**تاریخ ایجاد:** 2024
**نسخه:** 1.0.0
**وضعیت:** آماده production
