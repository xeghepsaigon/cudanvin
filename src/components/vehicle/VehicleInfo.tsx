import React from 'react'
import { Vehicle } from '@/lib/types/vehicle'
import Badge from '@/components/ui/Badge'

interface VehicleInfoProps {
  vehicle: Vehicle
}

const VehicleInfo: React.FC<VehicleInfoProps> = ({ vehicle }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-[#1F2937] mb-2">
          {vehicle.name}
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-[#00A86B] font-semibold">★ {vehicle.rating}</span>
          <span className="text-[#6B7280] text-sm">({vehicle.reviewCount} đánh giá)</span>
        </div>
      </div>

      {/* Price */}
      <div className="bg-[#F9FAFB] p-4 rounded-lg">
        <p className="text-[#6B7280] text-sm mb-1">Giá thuê</p>
        <p className="text-2xl font-bold text-[#00A86B]">
          {(vehicle.pricePerDay / 1000).toFixed(0)}K <span className="text-base text-[#6B7280]">/ngày</span>
        </p>
      </div>

      {/* Specs */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-[#E5E7EB] rounded-lg p-4">
          <p className="text-[#6B7280] text-sm mb-1">Loại xe</p>
          <p className="font-semibold text-[#1F2937]">{vehicle.type}</p>
        </div>
        <div className="border border-[#E5E7EB] rounded-lg p-4">
          <p className="text-[#6B7280] text-sm mb-1">Số chỗ</p>
          <p className="font-semibold text-[#1F2937]">{vehicle.seats} chỗ</p>
        </div>
        <div className="border border-[#E5E7EB] rounded-lg p-4">
          <p className="text-[#6B7280] text-sm mb-1">Giới hạn km</p>
          <p className="font-semibold text-[#1F2937]">{vehicle.kmLimit ? (vehicle.kmLimit / 100).toFixed(0) + '00' : 'N/A'} km/ngày</p>
        </div>
        <div className="border border-[#E5E7EB] rounded-lg p-4">
          <p className="text-[#6B7280] text-sm mb-1">Chủ xe</p>
          <p className="font-semibold text-[#1F2937]">{vehicle.ownerName}</p>
        </div>
      </div>

      {/* Description */}
      {vehicle.description && (
        <div>
          <h3 className="font-semibold text-[#1F2937] mb-2">Mô tả</h3>
          <p className="text-[#6B7280] leading-relaxed">{vehicle.description}</p>
        </div>
      )}

      {/* Conditions */}
      {vehicle.conditions && (
        <div>
          <h3 className="font-semibold text-[#1F2937] mb-3">Điều kiện thuê</h3>
          <div className="space-y-3">
            {vehicle.conditions.documents && vehicle.conditions.documents.length > 0 && (
              <div>
                <p className="text-sm text-[#6B7280] mb-2">Tài liệu cần thiết:</p>
                <ul className="space-y-1">
                  {vehicle.conditions.documents.map((doc, i) => (
                    <li key={i} className="text-sm text-[#1F2937]">
                      • {doc}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {vehicle.conditions.deposit && typeof vehicle.conditions.deposit === 'number' && vehicle.conditions.deposit > 0 && (
              <p className="text-sm text-[#1F2937]">
                <strong>Đặt cọc:</strong> {(vehicle.conditions.deposit / 1000).toFixed(0)}K VND
              </p>
            )}
            {vehicle.conditions.cancellationPolicy && (
              <p className="text-sm text-[#1F2937]">
                <strong>Chính sách hủy:</strong> {vehicle.conditions.cancellationPolicy}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default VehicleInfo
