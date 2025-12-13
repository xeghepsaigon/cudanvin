'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { FEATURED_VEHICLES } from '@/lib/constants/vehicles';

export default function OwnerDashboardPage() {
  const router = useRouter();
  const [ownerVehicles] = useState(FEATURED_VEHICLES.filter((v) => v.ownerId === 'owner-1'));
  const [pendingBookings] = useState(2);
  const [approvedBookings] = useState(8);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <Header />

      <div className="flex-1">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-6">
          {/* Dashboard Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold leading-8 font-semibold text-[#1F2937]">Quản lý xe</h1>
            <p className="text-sm leading-5 text-[#6B7280]">Chào mừng chủ xe!</p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-6">
            <div className="rounded-lg border border-[#E5E7EB] p-4">
              <p className="text-xs leading-4 text-[#6B7280] mb-2">Xe đang đăng</p>
              <p className="text-2xl font-semibold leading-8 font-bold text-primary-700">{ownerVehicles.length}</p>
            </div>

            <div className="rounded-lg border border-[#E5E7EB] p-4">
              <p className="text-xs leading-4 text-[#6B7280] mb-2">Booking chờ</p>
              <p className="text-2xl font-semibold leading-8 font-bold text-orange-600">{pendingBookings}</p>
            </div>

            <div className="rounded-lg border border-[#E5E7EB] p-4">
              <p className="text-xs leading-4 text-[#6B7280] mb-2">Booking đã duyệt</p>
              <p className="text-2xl font-semibold leading-8 font-bold text-primary-700">{approvedBookings}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-6 flex gap-3">
            <button className="flex-1 rounded-lg bg-[#00A86B] py-3 text-sm leading-5 font-semibold text-white hover:bg-[#008F5A]">
              ➕ Đăng xe mới
            </button>
          </div>

          {/* Vehicle List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold leading-7 font-semibold text-[#1F2937]">Xe của tôi</h2>

            {ownerVehicles.map((vehicle) => (
              <div key={vehicle.id} className="rounded-lg border border-[#E5E7EB] p-4">
                <div className="flex gap-4">
                  <img
                    src={vehicle.images[0]}
                    alt={vehicle.name}
                    className="h-24 w-24 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="text-sm leading-5 font-semibold text-[#1F2937]">{vehicle.name}</h3>
                    <p className="text-xs leading-4 text-[#6B7280] mb-3">
                      {(vehicle.pricePerDay / 1000).toLocaleString('vi-VN')}K/ngày • {vehicle.seats}{' '}
                      chỗ
                    </p>
                    <div className="flex gap-2">
                      <button className="rounded-md border border-primary-base px-3 py-1 text-xs leading-4 font-medium text-[#00A86B] hover:bg-primary-50">
                        ✏️ Sửa
                      </button>
                      <button className="rounded-md border border-red-300 px-3 py-1 text-xs leading-4 font-medium text-red-600 hover:bg-red-50">
                        👁️ Ẩn
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs leading-4 text-[#6B7280] mb-2">⭐ {vehicle.rating}</p>
                    <p className="text-base font-semibold leading-6 font-bold text-[#1F2937]">{vehicle.reviewCount}</p>
                    <p className="text-xs leading-4 text-[#6B7280]">đánh giá</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pending Bookings */}
          <div className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold leading-7 font-semibold text-[#1F2937]">Booking chờ xác nhận</h2>

            <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-sm leading-5 font-semibold text-[#1F2937]">Khách: Nguyễn Văn A</p>
                  <p className="text-xs leading-4 text-[#6B7280]">Toyota Vios • 2024-12-15 → 2024-12-17</p>
                </div>
                <span className="text-xs leading-4 font-semibold text-orange-600">Chờ</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 rounded-md bg-[#00A86B] py-2 text-xs leading-4 font-semibold text-white hover:bg-[#008F5A]">
                  ✓ Duyệt
                </button>
                <button className="flex-1 rounded-md border border-red-300 py-2 text-xs leading-4 font-semibold text-red-600 hover:bg-red-50">
                  ✕ Từ chối
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
