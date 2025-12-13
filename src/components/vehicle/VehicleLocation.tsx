'use client';

import { MapPin } from 'lucide-react';
import { Vehicle } from '@/lib/types/vehicle';

interface VehicleLocationProps {
  vehicle: Vehicle;
}

export function VehicleLocation({ vehicle }: VehicleLocationProps) {
  return (
    <div className="space-y-4 pb-6 border-b border-[#E5E7EB]">
      <h2 className="text-2xl font-semibold leading-8 text-[#1F2937]">Vị trí xe</h2>
      <div className="rounded-lg border border-[#E5E7EB] p-4 space-y-3">
        <div className="flex items-start gap-3">
          <MapPin size={20} className="text-[#00A86B] mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-[#1F2937] text-base">{vehicle.location}</p>
            <p className="text-base text-[#6B7280] mt-1">Địa chỉ cụ thẻ sẽ được hiện thị sau khi thanh toán giữ chỗ</p>
          </div>
        </div>
      </div>
    </div>
  );
}
