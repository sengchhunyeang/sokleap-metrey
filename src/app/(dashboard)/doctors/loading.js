import { SkeletonTableRows } from '@/app/components/ui/Skeleton';

export default function DoctorsLoading() {
  return (
    <div>
      {/* Header row */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-7 w-32 rounded bg-[#E5E7EB] animate-pulse" />
        <div className="h-10 w-32 rounded bg-[#E5E7EB] animate-pulse" />
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <div className="h-[46px] w-full rounded bg-[#E5E7EB] animate-pulse" />
      </div>

      {/* Table card */}
      <div className="card">
        <table className="w-full">
          <thead className="bg-[#F5F5FA]">
            <tr>
              {['Name', 'Specialty', 'Phone', 'Status', 'Actions'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[12px] font-semibold text-[#5E6366]">
                  {h}
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
  );
}
