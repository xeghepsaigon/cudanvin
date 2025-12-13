'use client';

import { Vehicle } from '@/lib/types/vehicle';

interface VehicleSpecsProps {
  vehicle: Vehicle;
}

export function VehicleSpecs({ vehicle }: VehicleSpecsProps) {
  return (
    <div className="space-y-4 pb-6 border-b border-[#E5E7EB]">
      <h2 className="text-2xl font-semibold leading-8 text-[#1F2937]">Đặc điểm</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Transmission */}
        <div className="flex flex-col items-center text-center">
          <p className="text-sm text-[#6B7280] mb-2">Truyền động</p>
          <p className="text-base font-semibold text-[#1F2937]">
            {vehicle.transmission === 'automatic' ? 'Số tự động' : 'Số sàn'}
          </p>
        </div>

        {/* Seats */}
        <div className="flex flex-col items-center text-center">
          <p className="text-sm text-[#6B7280] mb-2">Số ghế</p>
          <p className="text-base font-semibold text-[#1F2937]">{vehicle.seats} chỗ</p>
        </div>

        {/* Fuel Type */}
        <div className="flex flex-col items-center text-center">
          <p className="text-sm text-[#6B7280] mb-2">Nhiên liệu</p>
          <p className="text-base font-semibold text-[#1F2937]">
            {vehicle.fuelType === 'petrol' ? 'Xang' : vehicle.fuelType}
          </p>
        </div>

        {/* Fuel Consumption */}
        <div className="flex flex-col items-center text-center">
          <p className="text-sm text-[#6B7280] mb-2">Tiêu hao</p>
          <p className="text-base font-semibold text-[#1F2937]">8L/100km</p>
        </div>
      </div>
    </div>
  );
}
