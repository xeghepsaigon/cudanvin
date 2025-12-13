'use client';

import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import { Vehicle } from '@/lib/types/vehicle';

interface VehicleOwnerProps {
  vehicle: Vehicle;
  getDicebearAvatar: (name: string, style?: string) => string;
}

export function VehicleOwner({ vehicle, getDicebearAvatar }: VehicleOwnerProps) {
  const router = useRouter();

  const handleOwnerClick = () => {
    router.push(`/chu-xe/profile?ownerId=${vehicle.ownerName.replace(/\s+/g, '-').toLowerCase()}`);
  };

  return (
    <div className="space-y-4 pb-6 border-b border-[#E5E7EB]">
      <h2 className="text-2xl font-semibold leading-8 text-[#1F2937]">Chủ xe</h2>
      <div className="rounded-lg bg-[#F9FAFB] p-8 cursor-pointer hover:bg-[#F3F4F6] transition-colors" onClick={handleOwnerClick}>
        <div className="flex items-start gap-5">
          {/* Avatar */}
          <img
            src={getDicebearAvatar(vehicle.ownerName, 'avataaars')}
            alt={vehicle.ownerName}
            className="w-16 h-16 rounded-full flex-shrink-0"
          />
          {/* Owner Info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <p className="text-xl font-semibold text-[#00A86B]">{vehicle.ownerName}</p>
                {vehicle.ownerRating && (
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-base text-[#1F2937]">{vehicle.ownerRating}</span>
                    <span className="text-base text-[#6B7280]">({vehicle.reviewCount})</span>
                  </div>
                )}
              </div>
              {/* Stats Grid - 4 columns inline */}
              <div className="flex gap-4 text-base">
                <div>
                  <p className="text-[#6B7280] mb-1">Chuyến</p>
                  <p className="font-semibold text-[#1F2937] text-base">156</p>
                </div>
                <div>
                  <p className="text-[#6B7280] mb-1">Phản hồi</p>
                  <p className="font-semibold text-[#1F2937] text-base">99%</p>
                </div>
                <div>
                  <p className="text-[#6B7280] mb-1">Thời gian</p>
                  <p className="font-semibold text-[#1F2937] text-base">2h</p>
                </div>
                <div>
                  <p className="text-[#6B7280] mb-1">Đồng ý</p>
                  <p className="font-semibold text-[#1F2937] text-base">98%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
