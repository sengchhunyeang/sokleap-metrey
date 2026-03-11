import { SkeletonStatCard, SkeletonTableRows } from '@/app/components/ui/Skeleton';

export default function DashboardLoading() {
  return (
    <div>
      {/* Page title placeholder — matches h1 height */}
      <div className="h-7 w-36 rounded bg-[#E5E7EB] animate-pulse mb-6" />

      {/* Stat cards grid — 4 cards mirroring the real layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SkeletonStatCard />
        <SkeletonStatCard />
        <SkeletonStatCard />
        <SkeletonStatCard />
      </div>

      {/* Quick Actions card */}
      <div className="card mb-6">
        <div className="animate-pulse">
          <div className="h-5 w-32 rounded bg-[#E5E7EB] mb-4" />
          <div className="flex gap-4">
            <div className="h-10 w-32 rounded bg-[#E5E7EB]" />
            <div className="h-10 w-40 rounded bg-[#E5E7EB]" />
          </div>
        </div>
      </div>

      {/* Recent Prescriptions table */}
      <div className="card">
        <div className="h-5 w-48 rounded bg-[#E5E7EB] animate-pulse mb-4" />
        <table className="w-full">
          <thead className="bg-[#F5F5FA]">
            <tr>
              {['Patient', 'Doctor', 'Diagnosis', 'Date', 'Actions'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[12px] font-semibold text-[#5E6366]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ABAFB1]">
            <SkeletonTableRows rows={5} cols={5} />
          </tbody>
        </table>
      </div>
    </div>
  );
}
