'use client';

/**
 * Base skeleton pulse block.
 * Use `className` to set width/height (e.g. "h-4 w-32").
 */
export default function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={`animate-pulse rounded bg-[#E5E7EB] ${className}`}
      {...props}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Pre-composed skeletons                                            */
/* ------------------------------------------------------------------ */

/** A single row of a table skeleton (cells matching a column count). */
export function SkeletonTableRow({ cols = 5 }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="animate-pulse rounded bg-[#E5E7EB] h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

/** Multiple table rows to fill a loading table. */
export function SkeletonTableRows({ rows = 5, cols = 5 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonTableRow key={i} cols={cols} />
      ))}
    </>
  );
}

/** Stat card skeleton (matches dashboard stat cards exactly). */
export function SkeletonStatCard() {
  return (
    <div className="bg-[#E5E7EB] animate-pulse text-transparent rounded-lg p-6 shadow">
      <div className="flex justify-between items-start">
        <div>
          <div className="h-4 w-24 rounded bg-[#D1D5DB] mb-4" />
          <div className="h-8 w-16 rounded bg-[#D1D5DB]" />
        </div>
        <div className="h-8 w-8 rounded bg-[#D1D5DB]" />
      </div>
    </div>
  );
}

/** Card skeleton with a header line and body lines. */
export function SkeletonCard({ lines = 3, className = '' }) {
  return (
    <div className={`card ${className}`}>
      <div className="animate-pulse">
        <div className="h-5 w-40 rounded bg-[#E5E7EB] mb-4" />
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-4 rounded bg-[#E5E7EB] mb-3"
            style={{ width: `${75 - i * 10}%` }}
          />
        ))}
      </div>
    </div>
  );
}

/** Detail page skeleton — back link + two-column layout. */
export function SkeletonDetailPage() {
  return (
    <div>
      <div className="mb-6">
        <div className="animate-pulse h-4 w-32 rounded bg-[#E5E7EB]" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SkeletonCard lines={5} />
        <div className="lg:col-span-2">
          <SkeletonCard lines={6} />
        </div>
      </div>
    </div>
  );
}
