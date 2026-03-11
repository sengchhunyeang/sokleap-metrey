import { SkeletonTableRows } from '@/app/components/ui/Skeleton';

export default function SettingsLoading() {
  return (
    <div>
      {/* Title */}
      <div className="h-7 w-28 rounded bg-[#E5E7EB] animate-pulse mb-6" />

      {/* Tab bar skeleton */}
      <div className="flex gap-2 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 w-28 rounded bg-[#E5E7EB] animate-pulse" />
        ))}
      </div>

      {/* Active tab content card */}
      <div className="card">
        <div className="animate-pulse">
          <div className="h-5 w-48 rounded bg-[#E5E7EB] mb-4" />
          <div className="h-[46px] w-full rounded bg-[#E5E7EB] mb-4" />
          <table className="w-full">
            <thead className="bg-[#F5F5FA]">
              <tr>
                {Array.from({ length: 5 }).map((_, i) => (
                  <th key={i} className="px-4 py-3">
                    <div className="h-4 w-20 rounded bg-[#E5E7EB]" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ABAFB1]">
              <SkeletonTableRows rows={10} cols={5} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
