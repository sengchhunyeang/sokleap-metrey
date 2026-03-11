import { SkeletonTableRows } from '@/app/components/ui/Skeleton';

export default function PrescriptionDetailLoading() {
  return (
    <div>
      {/* Action bar */}
      <div className="mb-6 flex justify-between items-center">
        <div className="h-5 w-40 rounded bg-[#E5E7EB] animate-pulse" />
        <div className="flex gap-3">
          <div className="h-10 w-28 rounded bg-[#E5E7EB] animate-pulse" />
          <div className="h-10 w-20 rounded bg-[#E5E7EB] animate-pulse" />
          <div className="h-10 w-36 rounded bg-[#E5E7EB] animate-pulse" />
        </div>
      </div>

      {/* Prescription document skeleton */}
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="bg-white border-2 border-[#E5E7EB] p-6 rounded">
          <div className="animate-pulse">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#E5E7EB]">
              <div className="h-14 w-14 rounded bg-[#E5E7EB]" />
              <div className="text-center space-y-2">
                <div className="h-5 w-64 rounded bg-[#E5E7EB] mx-auto" />
                <div className="h-4 w-48 rounded bg-[#E5E7EB] mx-auto" />
              </div>
              <div className="h-14 w-14 rounded bg-[#E5E7EB]" />
            </div>

            {/* Title */}
            <div className="h-6 w-24 rounded bg-[#E5E7EB] mx-auto mb-4" />

            {/* Patient info lines */}
            <div className="space-y-2 mb-4">
              <div className="h-4 w-3/4 rounded bg-[#E5E7EB]" />
              <div className="h-4 w-1/2 rounded bg-[#E5E7EB]" />
              <div className="h-4 w-2/3 rounded bg-[#E5E7EB]" />
            </div>

            {/* Medicine table skeleton */}
            <table className="w-full mb-4">
              <thead>
                <tr className="border-b-2 border-[#E5E7EB]">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <th key={i} className="py-2 px-2">
                      <div className="h-4 w-full rounded bg-[#E5E7EB]" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <SkeletonTableRows rows={4} cols={8} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
