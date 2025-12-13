import Skeleton from '@/components/ui/Skeleton';

export function VehicleCardSkeleton() {
  return (
    <div className="text-left rounded-xl border border-[#E5E7EB] bg-white shadow-sm overflow-hidden">
      {/* Image Skeleton */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-200 rounded-t-xl">
        <Skeleton variant="rectangular" height="100%" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Badges Skeleton */}
        <div className="flex flex-wrap gap-2 justify-start">
          <Skeleton variant="rectangular" width={100} height={24} className="rounded-full" />
          <Skeleton variant="rectangular" width={120} height={24} className="rounded-full" />
        </div>

        {/* Name Skeleton */}
        <Skeleton variant="text" height={28} width="60%" />

        {/* Specs Skeleton */}
        <div className="flex gap-4 justify-between">
          <Skeleton variant="text" width="25%" height={20} />
          <Skeleton variant="text" width="25%" height={20} />
          <Skeleton variant="text" width="25%" height={20} />
        </div>

        {/* Location Skeleton */}
        <Skeleton variant="text" height={20} width="80%" />

        {/* Divider */}
        <div className="border-t border-[#E5E7EB]"></div>

        {/* Rating & Price Row */}
        <div className="flex items-center justify-between">
          <Skeleton variant="text" width="30%" height={20} />
          <Skeleton variant="text" width="35%" height={24} />
        </div>

        {/* Chuyến & Gói Row */}
        <div className="flex items-center justify-between">
          <Skeleton variant="text" width="30%" height={20} />
          <Skeleton variant="text" width="35%" height={20} />
        </div>
      </div>
    </div>
  );
}

export default VehicleCardSkeleton;
