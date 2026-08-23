import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

import { toFa } from "@/lib/format";
import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-x-3 gap-y-2 pb-4">
      <div className="min-w-0">
        <h1 className="text-xl font-extrabold tracking-tight sm:text-3xl">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}

type Tone = "success" | "warning" | "danger" | "info" | "neutral" | "primary";

const toneClass: Record<Tone, string> = {
  success: "bg-primary-soft text-primary",
  warning: "bg-warning/20 text-warning-foreground",
  danger: "bg-destructive/12 text-destructive",
  info: "bg-accent text-accent-foreground",
  neutral: "bg-muted text-muted-foreground",
  primary: "bg-primary text-primary-foreground",
};

export function Chip({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold",
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="app-card flex flex-col items-center gap-3 px-6 py-12 text-center">
      <div className="grid size-14 place-items-center rounded-2xl bg-accent text-accent-foreground">
        {icon}
      </div>
      <h3 className="text-base font-bold">{title}</h3>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      {action}
    </div>
  );
}

export function ListSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="app-card space-y-3 p-4">
          <div className="flex items-center justify-between gap-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-3 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      ))}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div
      role="alert"
      className="app-card flex flex-col items-center gap-3 border-destructive/30 px-6 py-10 text-center"
    >
      <h3 className="text-base font-bold text-destructive">خطا در دریافت اطلاعات</h3>
      <p className="text-sm text-muted-foreground">{message}</p>
      {onRetry ? (
        <button
          onClick={onRetry}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
        >
          تلاش دوباره
        </button>
      ) : null}
    </div>
  );
}

export function FilterChips<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="scroll-x -mx-4 flex gap-2 px-4 pb-1 [scrollbar-width:none]">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={cn(
            "shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-colors",
            value === o.value
              ? "bg-primary text-primary-foreground"
              : "bg-accent text-accent-foreground hover:bg-accent/70",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

const toneColor: Record<Tone, string> = {
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--destructive)",
  info: "var(--info)",
  neutral: "var(--muted-foreground)",
  primary: "var(--primary)",
};

/** Sparkline decoration used along the bottom edge of the stat cards. */
function ToneSparkline() {
  return (
    <svg
      viewBox="0 0 200 40"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-10 w-full opacity-60"
    >
      <path
        d="M0 34 C 22 34, 30 22, 48 24 S 78 34, 96 26 118 8, 140 14 168 30, 200 18"
        fill="none"
        stroke="var(--tone)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Splits «۲۴,۵۶۰,۰۰۰ تومان» into the number and its trailing unit word. */
function splitUnit(value: string): { num: string; unit?: string } {
  const m = /^(.*?)\s+([^\s\d,،.]+)$/.exec(value.trim());
  if (m && m[1] && m[2]) return { num: m[1], unit: m[2] };
  return { num: value };
}

export function StatCard({
  icon,
  image,
  label,
  value,
  unit,
  tone = "info",
  to,
  search,
  hint,
}: {
  icon: ReactNode;
  /** Optional 3D illustration shown instead of the flat icon. */
  image?: string;
  label: string;
  value: string;
  /** Small unit word rendered next to the big number («تومان»، «مورد»، …). */
  unit?: string;
  tone?: Tone;
  /** When set the whole card becomes a link into the matching section. */
  to?: string;
  search?: Record<string, string>;
  hint?: string;
}) {
  const parsed = unit ? { num: value, unit } : splitUnit(value);

  const body = (
    <>
      {image ? (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={512}
          height={512}
          className="pointer-events-none absolute -bottom-6 -start-6 size-52 object-contain opacity-[0.08] blur-[0.3px] sm:size-64"
        />
      ) : null}

      <div className="relative flex items-start gap-3">
        <div className="tone-tile grid size-24 shrink-0 place-items-center rounded-[1.75rem] p-3 sm:size-28">
          {image ? (
            <img
              src={image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              width={512}
              height={512}
              className="size-full object-contain drop-shadow-md"
            />
          ) : (
            <span className="text-on-hero">{icon}</span>
          )}
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="truncate text-sm font-bold text-muted-foreground sm:text-base">{label}</p>
          <p className="mt-1.5 flex flex-wrap items-baseline gap-x-1.5 leading-none">
            <span className="num text-[1.75rem] font-black tracking-tight break-words sm:text-[2.25rem]">
              {parsed.num}
            </span>
            {parsed.unit ? (
              <span className="text-xs font-bold text-muted-foreground sm:text-sm">
                {parsed.unit}
              </span>
            ) : null}
          </p>
        </div>
      </div>

      {hint ? (
        <p
          className="relative mt-4 truncate text-sm font-extrabold"
          style={{ color: "var(--tone)" }}
        >
          {hint}
        </p>
      ) : (
        <div className="mt-4 h-5" />
      )}
      <ToneSparkline />
    </>
  );

  const style = { "--tone": toneColor[tone] } as React.CSSProperties;

  if (to)
    return (
      <Link
        to={to}
        {...(search ? { search } : {})}
        className="tone-card block min-w-0 p-4 transition-transform active:scale-[0.98] sm:p-5"
        style={style}
      >
        {body}
      </Link>
    );

  return (
    <div className="tone-card min-w-0 p-4 sm:p-5" style={style}>
      {body}
    </div>
  );
}




export function Fa({ children }: { children: string | number }) {
  return <span className="num">{toFa(children)}</span>;
}
