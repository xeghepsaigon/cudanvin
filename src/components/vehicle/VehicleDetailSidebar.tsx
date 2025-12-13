'use client';

import { Calendar } from 'lucide-react';
import { Vehicle } from '@/lib/types/vehicle';
import { useState } from 'react';
import { RangeCalendar } from '@/components/ui/RangeCalendar';
import { DeliveryOptions } from '@/components/vehicle/DeliveryOptions';

interface VehicleDetailSidebarProps {
  vehicle: Vehicle;
  startDate: string;
  endDate: string;
  pickupTime?: string;
  returnTime?: string;
  showPickupCalendar: boolean;
  showReturnCalendar: boolean;
  setShowPickupCalendar: (show: boolean) => void;
  setShowReturnCalendar: (show: boolean) => void;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setPickupTime?: (time: string) => void;
  setReturnTime?: (time: string) => void;
  handleBooking: () => void;
}

export function VehicleDetailSidebar({
  vehicle,
  startDate,
  endDate,
  pickupTime = '08:00',
  returnTime = '17:00',
  showPickupCalendar,
  showReturnCalendar,
  setShowPickupCalendar,
  setShowReturnCalendar,
  setStartDate,
  setEndDate,
  setPickupTime,
  setReturnTime,
  handleBooking,
}: VehicleDetailSidebarProps) {
  const [showRangeCalendar, setShowRangeCalendar] = useState(false);

  const handleDatesChange = (newStartDate: string, newEndDate: string, newPickupTime?: string, newReturnTime?: string) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    if (newPickupTime) setPickupTime?.(newPickupTime);
    if (newReturnTime) setReturnTime?.(newReturnTime);
  };

  const handleOpenCalendar = () => {
    setShowRangeCalendar(true);
  };
  return (
    <>
      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-4">
          {/* Pickup/Return Info Card */}
          <div className="rounded-lg border border-[#E5E7EB] p-4">
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={handleOpenCalendar}
                className="text-left hover:bg-[#F9FAFB] p-2 rounded transition-colors cursor-pointer"
              >
                <p className="text-base leading-6 font-medium text-[#1F2937] mb-1">Nhận xe</p>
                <p className="text-lg font-semibold leading-7 text-[#1F2937]">{startDate}</p>
                <p className="text-sm leading-5 text-[#6B7280]">21:00</p>
              </div>
              <div
                onClick={handleOpenCalendar}
                className="text-left hover:bg-[#F9FAFB] p-2 rounded transition-colors cursor-pointer"
              >
                <p className="text-base leading-6 font-medium text-[#1F2937] mb-1">Trả xe</p>
                <p className="text-lg font-semibold leading-7 text-[#1F2937]">{endDate}</p>
                <p className="text-sm leading-5 text-[#6B7280]">20:00</p>
              </div>
            </div>
          </div>

          {/* Delivery Options */}
          <DeliveryOptions vehicle={vehicle} />

          {/* Price Breakdown */}
          <div className="rounded-lg border border-[#E5E7EB] p-4 space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-base leading-6 text-[#1F2937]">Đơn giá thuê</p>
              <p className="text-lg font-semibold leading-7 text-[#1F2937]">
                {Math.round(vehicle.pricePerDay / 1000)}K /ngay
              </p>
            </div>
            <div className="border-t border-[#E5E7EB]" />
            <div className="flex justify-between items-center">
              <p className="text-base leading-6 text-[#1F2937]">Phí dịch vụ Mioto</p>
              <p className="text-lg font-semibold leading-7 text-[#1F2937]">264.180 /ngay</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-base leading-6 text-[#1F2937]">Bảo hiểm thuê xe</p>
              <p className="text-lg font-semibold leading-7 text-[#1F2937]">192.781 /ngay</p>
            </div>
          </div>



          {/* Total Price */}
          <div className="rounded-lg bg-[#F9FAFB] p-4 border border-[#E5E7EB]">
            <p className="text-base leading-6 text-[#6B7280] mb-2">Thành tiền</p>
            <p className="text-3xl font-semibold leading-9 text-[#1F2937]">
              {Math.round((vehicle.pricePerDay + 264180 + 192781) * 16 / 1000 - 120)}d
            </p>
          </div>

          {/* Book Button */}
          <button
            onClick={handleBooking}
            className="w-full rounded-lg bg-[#00A86B] py-4 text-base leading-6 font-semibold text-white hover:bg-[#008F5A]"
          >
            CHỌ̣N THUÊ
          </button>
        </div>
      </div>

      {/* Mobile Sticky CTA - Only on mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-[#E5E7EB] bg-white p-4">
        <button
          onClick={handleBooking}
          className="w-full rounded-lg bg-[#00A86B] py-3 text-base font-semibold text-white hover:bg-[#008F5A] flex items-center justify-center gap-2"
        >
          <Calendar size={18} /> Chọn ngày thuê
        </button>
      </div>

      {/* Unified Range Calendar Modal */}
      {showRangeCalendar && (
        <RangeCalendar
          initialStartDate={startDate}
          initialEndDate={endDate}
          initialPickupTime={pickupTime}
          initialReturnTime={returnTime}
          onDatesChange={handleDatesChange}
          onClose={() => setShowRangeCalendar(false)}
          pricePerDay={vehicle.pricePerDay}
        />
      )}
    </>
  );
}
