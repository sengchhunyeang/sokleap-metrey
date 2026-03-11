import { SkeletonTableRows } from '@/app/components/ui/Skeleton';

export default function PrescriptionsLoading() {
  return (
    <div>
      {/* Header row */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-7 w-44 rounded bg-[#E5E7EB] animate-pulse" />
        <div className="h-10 w-40 rounded bg-[#E5E7EB] animate-pulse" />
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
              {['Date', 'NSSF ID', 'Patient', 'Doctor', 'Diagnosis', 'Medicines', 'Actions'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[12px] font-semibold text-[#5E6366]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ABAFB1]">
            <SkeletonTableRows rows={10} cols={7} />
          </tbody>
        </table>
      </div>

      {/* Pagination placeholder */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 w-9 rounded bg-[#E5E7EB] animate-pulse" />
        ))}
      </div>
    </div>
  );
}
