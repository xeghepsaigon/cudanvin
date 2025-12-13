import Skeleton from '@/components/ui/Skeleton';

export function HeroSearchSkeleton() {
  return (
    <section className="relative w-full bg-gradient-to-r from-[#00A86B] to-[#008C5E] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="space-y-6">
          {/* Title Skeleton */}
          <div className="space-y-3 text-white">
            <Skeleton variant="text" width="70%" height={40} className="bg-white/20" />
            <Skeleton variant="text" width="60%" height={24} className="bg-white/20" />
          </div>

          {/* Search Box Skeleton */}
          <div className="bg-white rounded-xl p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton variant="text" width="40%" height={16} />
                  <Skeleton variant="rectangular" height={40} />
                </div>
              ))}
            </div>
            <Skeleton variant="rectangular" height={44} width="100%" className="rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSearchSkeleton;
