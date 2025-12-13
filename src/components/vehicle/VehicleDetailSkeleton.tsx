import Skeleton from '@/components/ui/Skeleton';

export function VehicleDetailSkeleton() {
  return (
    <div className="space-y-8">
      {/* Gallery Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="md:col-span-3">
          <Skeleton variant="rectangular" width="100%" height={400} />
        </div>
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rectangular" width="100%" height={100} />
          ))}
        </div>
      </div>

      {/* Title and Info Skeleton */}
      <div className="space-y-4">
        <Skeleton variant="text" width="40%" height={32} />
        <Skeleton variant="text" width="60%" height={20} />
        <div className="flex gap-4">
          <Skeleton variant="text" width="20%" height={16} />
          <Skeleton variant="text" width="20%" height={16} />
          <Skeleton variant="text" width="20%" height={16} />
        </div>
      </div>

      {/* Specs Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-3">
            <Skeleton variant="text" width="30%" height={24} />
            <Skeleton variant="text" width="100%" height={16} count={3} />
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-[#E5E7EB]"></div>

      {/* Description Skeleton */}
      <div className="space-y-3">
        <Skeleton variant="text" width="25%" height={24} />
        <Skeleton variant="text" width="100%" height={16} count={4} />
      </div>
    </div>
  );
}

export default VehicleDetailSkeleton;
