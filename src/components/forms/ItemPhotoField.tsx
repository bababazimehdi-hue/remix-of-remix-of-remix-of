import { useRef, useState } from "react";
import { Camera, ImagePlus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { compressImage } from "@/lib/images";

/**
 * Optional product picture for a single invoice item.
 * Supports camera capture and gallery pick, with preview and removal.
 */
export function ItemPhotoField({
  id,
  value,
  onChange,
  label = "تصویر محصول",
  disabled = false,
}: {
  id: string;
  value?: string | undefined;
  onChange: (photo: string) => void;
  label?: string;
  disabled?: boolean;
}) {
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function pick(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      onChange(await compressImage(file));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "خواندن تصویر ممکن نشد.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="block text-sm font-bold">{label}</span>
        <span className="text-xs text-muted-foreground">اختیاری</span>
      </div>

      {value ? (
        <div className="relative w-full max-w-40">
          <img src={value} alt={label} className="h-32 w-full rounded-xl object-cover" />
          {!disabled ? (
            <button
              type="button"
              aria-label="حذف تصویر محصول"
              onClick={() => onChange("")}
              className="absolute end-1 top-1 rounded-lg bg-background/90 p-1 text-destructive"
            >
              <Trash2 className="size-4" />
            </button>
          ) : null}
        </div>
      ) : null}

      {!disabled ? (
        <div className="flex gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => cameraRef.current?.click()}
            className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary/10 text-sm font-bold text-primary disabled:opacity-60"
          >
            <Camera className="size-5" /> دوربین
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => galleryRef.current?.click()}
            className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-secondary text-sm font-bold disabled:opacity-60"
          >
            <ImagePlus className="size-5" /> {value ? "تغییر عکس" : "گالری"}
          </button>
        </div>
      ) : null}

      <input
        ref={cameraRef}
        id={`cam-${id}`}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          void pick(e.target.files);
          e.target.value = "";
        }}
      />
      <input
        ref={galleryRef}
        id={`gal-${id}`}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          void pick(e.target.files);
          e.target.value = "";
        }}
      />
      {busy ? <p className="text-xs text-muted-foreground">در حال فشرده‌سازی تصویر…</p> : null}
    </div>
  );
}
