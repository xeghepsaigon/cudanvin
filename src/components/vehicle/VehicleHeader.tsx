'use client';

import { Star, Share2, Heart } from 'lucide-react';
import { Vehicle } from '@/lib/types/vehicle';

interface VehicleHeaderProps {
  vehicle: Vehicle;
}

export function VehicleHeader({ vehicle }: VehicleHeaderProps) {
  return (
    <div className="pb-6 border-b border-[#E5E7EB]">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h1 className="text-2xl font-semibold leading-8 text-[#1F2937] flex-1">{vehicle.name}</h1>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors">
            <Share2 size={20} className="text-[#6B7280]" />
          </button>
          <button className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors">
            <Heart size={20} className="text-[#6B7280]" />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-1">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-[#1F2937]">{vehicle.rating}</span>
        </div>
        <span className="text-base text-[#6B7280]">({vehicle.reviewCount} đánh giá)</span>
      </div>
      <div className="flex items-center gap-4 text-base text-[#6B7280]">
        <div>
          {vehicle.location}
        </div>
        <div>
          156 chuyến
        </div>
      </div>
    </div>
  );
}
