'use client';

import { Vehicle } from '@/lib/types/vehicle';

interface VehicleDescriptionProps {
  vehicle: Vehicle;
}

export function VehicleDescription({ vehicle }: VehicleDescriptionProps) {
  return (
    <div className="space-y-4 pb-6 border-b border-[#E5E7EB]">
      <h2 className="text-2xl font-semibold leading-8 text-[#1F2937]">Mô tả</h2>
      <p className="text-base leading-7 text-[#6B7280]">{vehicle.description}</p>
    </div>
  );
}
