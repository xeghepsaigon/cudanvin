'use client';

import { Vehicle } from '@/lib/types/vehicle';

interface BookingData {
  startDate: string;
  endDate: string;
  customerName: string;
  customerPhone: string;
  notes: string;
}

interface BookingSidebarProps {
  vehicle: Vehicle;
  bookingData: BookingData;
  days: number;
}

export function BookingSidebar({ vehicle, bookingData, days }: BookingSidebarProps) {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24 space-y-4">
        {/* Pickup/Return Info Card */}
        <div className="rounded-lg border border-[#E5E7EB] p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm leading-5 font-medium text-[#1F2937] mb-1">Nhận xe</p>
              <p className="text-base font-semibold leading-6 text-[#1F2937]">
                {bookingData.startDate
                  ? new Date(bookingData.startDate).toLocaleDateString('vi-VN')
                  : 'DD/MM/YYYY'}
              </p>
              <p className="text-xs leading-4 text-[#6B7280]">
                {bookingData.startDate ? '21:00' : 'Chưa chọn'}
              </p>
            </div>
            <div>
              <p className="text-sm leading-5 font-medium text-[#1F2937] mb-1">Trả xe</p>
              <p className="text-base font-semibold leading-6 text-[#1F2937]">
                {bookingData.endDate
                  ? new Date(bookingData.endDate).toLocaleDateString('vi-VN')
                  : 'DD/MM/YYYY'}
              </p>
              <p className="text-xs leading-4 text-[#6B7280]">
                {bookingData.endDate ? '20:00' : 'Chưa chọn'}
              </p>
            </div>
          </div>
        </div>


        {/* Price Breakdown */}
        <div className="rounded-lg border border-[#E5E7EB] p-4 space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-sm leading-5 text-[#1F2937]">Đơn giá thuê</p>
            <p className="text-base font-semibold leading-6 text-[#1F2937]">
              {(vehicle.pricePerDay / 1000).toLocaleString('vi-VN')}K /ngay
            </p>
          </div>
          <div className="border-t border-[#E5E7EB]" />
          <div className="flex justify-between items-center">
            <p className="text-sm leading-5 text-[#1F2937]">Phí dịch vụ Mioto</p>
            <p className="text-base font-semibold leading-6 text-[#1F2937]">264.180 /ngay</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm leading-5 text-[#1F2937]">Bảo hiểm thuê xe</p>
            <p className="text-base font-semibold leading-6 text-[#1F2937]">192.781 /ngay</p>
          </div>
        </div>


        {/* Summary */}
        <div className="rounded-lg border border-[#E5E7EB] p-4 space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-sm leading-5 text-[#1F2937]">Tổng cộng</p>
            <p className="text-xl font-semibold leading-7 text-[#1F2937]">
              {days > 0
                ? ((vehicle.pricePerDay + 264180 + 192781) * days / 1000).toLocaleString('vi-VN')
                : '0'}
              K x {days}
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="mt-1 h-5 w-5 rounded-full bg-[#00A86B] text-white flex items-center justify-center text-xs">
              OK
            </div>
            <div className="flex-1">
              <p className="text-sm leading-5 font-semibold text-[#1F2937]">Chương trình giảm giá</p>
              <p className="text-xs leading-4 text-[#6B7280]">Giảm 120K trên đơn giá</p>
              <p className="text-base font-semibold leading-6 text-[#00A86B]">-120.000</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <input type="checkbox" id="promo-code" className="w-4 h-4 rounded mt-1" />
            <label htmlFor="promo-code" className="flex-1 cursor-pointer">
              <p className="text-sm leading-5 font-semibold text-[#1F2937]">Mã khuyến mãi</p>
            </label>
          </div>
        </div>

        {/* Total Price */}
        <div className="rounded-lg bg-[#F9FAFB] p-4 border border-[#E5E7EB]">
          <p className="text-sm leading-5 text-[#6B7280] mb-2">Thành tiền</p>
          <p className="text-2xl font-semibold leading-8 text-[#1F2937]">
            {days > 0
              ? ((vehicle.pricePerDay + 264180 + 192781) * days / 1000 - 120).toLocaleString('vi-VN')
              : '0'}
            d
          </p>
        </div>

        {/* Book Button */}
        <button className="w-full rounded-lg bg-[#00A86B] py-4 text-base leading-6 font-semibold text-white hover:bg-[#008F5A]">
          CHỌ̣N THUÊ
        </button>
      </div>
    </div>
  );
}
