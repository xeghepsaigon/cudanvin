'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';

interface AdminBooking {
  id: string;
  customerName: string;
  customerPhone: string;
  vehicleName: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  totalPrice: number;
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>([
    {
      id: '1',
      customerName: 'Nguyễn Văn A',
      customerPhone: '0912345678',
      vehicleName: 'Toyota Vios',
      startDate: '2024-12-15',
      endDate: '2024-12-17',
      status: 'pending',
      totalPrice: 1400000,
    },
    {
      id: '2',
      customerName: 'Trần Thị B',
      customerPhone: '0987654321',
      vehicleName: 'Honda CR-V',
      startDate: '2024-12-20',
      endDate: '2024-12-25',
      status: 'pending',
      totalPrice: 6000000,
    },
    {
      id: '3',
      customerName: 'Lê Văn C',
      customerPhone: '0911111111',
      vehicleName: 'Kia Sorento',
      startDate: '2024-12-10',
      endDate: '2024-12-12',
      status: 'approved',
      totalPrice: 3000000,
    },
  ]);

  const handleApprove = (id: string) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: 'approved' } : booking
      )
    );
  };

  const handleReject = (id: string) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: 'rejected' } : booking
      )
    );
  };

  const pendingCount = bookings.filter((b) => b.status === 'pending').length;

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <Header />

      <div className="flex-1">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-6">
          {/* Admin Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold leading-8 font-semibold text-[#1F2937]">Admin Dashboard</h1>
            <p className="text-sm leading-5 text-[#6B7280]">Quản lý booking và xác nhận thuê xe</p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-6">
            <div className="rounded-lg border border-[#E5E7EB] p-4">
              <p className="text-xs leading-4 text-[#6B7280] mb-2">Tổng booking</p>
              <p className="text-2xl font-semibold leading-8 font-bold text-primary-700">{bookings.length}</p>
            </div>

            <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
              <p className="text-xs leading-4 text-[#6B7280] mb-2">Chờ xác nhận</p>
              <p className="text-2xl font-semibold leading-8 font-bold text-orange-600">{pendingCount}</p>
            </div>

            <div className="rounded-lg border border-[#E5E7EB] p-4">
              <p className="text-xs leading-4 text-[#6B7280] mb-2">Đã duyệt</p>
              <p className="text-2xl font-semibold leading-8 font-bold text-primary-700">
                {bookings.filter((b) => b.status === 'approved').length}
              </p>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold leading-7 font-semibold text-[#1F2937]">Danh sách booking</h2>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className={`rounded-lg border p-4 ${
                    booking.status === 'pending'
                      ? 'border-orange-200 bg-orange-50'
                      : booking.status === 'approved'
                        ? 'border-primary-200 bg-primary-50'
                        : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="mb-3">
                    <p className="text-sm leading-5 font-semibold text-[#1F2937]">
                      {booking.customerName}
                    </p>
                    <p className="text-xs leading-4 text-[#6B7280]">{booking.customerPhone}</p>
                    <p className="text-xs leading-4 text-[#6B7280] mt-1">{booking.vehicleName}</p>
                    <p className="text-xs leading-4 text-[#6B7280]">
                      {new Date(booking.startDate).toLocaleDateString('vi-VN')} →{' '}
                      {new Date(booking.endDate).toLocaleDateString('vi-VN')}
                    </p>
                    <p className="text-sm leading-5 font-bold text-[#1F2937] mt-2">
                      {(booking.totalPrice / 1000).toLocaleString('vi-VN')}K
                    </p>
                  </div>

                  {booking.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(booking.id)}
                        className="flex-1 rounded-md bg-[#00A86B] py-2 text-xs leading-4 font-semibold text-white hover:bg-[#008F5A]"
                      >
                        ✓ Duyệt
                      </button>
                      <button
                        onClick={() => handleReject(booking.id)}
                        className="flex-1 rounded-md border border-red-300 py-2 text-xs leading-4 font-semibold text-red-600 hover:bg-red-50"
                      >
                        ✕ Từ chối
                      </button>
                    </div>
                  )}

                  {booking.status === 'approved' && (
                    <span className="inline-block rounded-full bg-primary-600 px-3 py-1 text-xs leading-4 font-semibold text-white">
                      ✓ Đã duyệt
                    </span>
                  )}

                  {booking.status === 'rejected' && (
                    <span className="inline-block rounded-full bg-red-600 px-3 py-1 text-xs leading-4 font-semibold text-white">
                      ✕ Từ chối
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto rounded-lg border border-[#E5E7EB]">
              <table className="w-full">
                <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm leading-5 font-semibold text-[#1F2937]">
                      Khách
                    </th>
                    <th className="px-4 py-3 text-left text-sm leading-5 font-semibold text-[#1F2937]">
                      Xe
                    </th>
                    <th className="px-4 py-3 text-left text-sm leading-5 font-semibold text-[#1F2937]">
                      Ngày
                    </th>
                    <th className="px-4 py-3 text-left text-sm leading-5 font-semibold text-[#1F2937]">
                      Giá
                    </th>
                    <th className="px-4 py-3 text-left text-sm leading-5 font-semibold text-[#1F2937]">
                      Trạng thái
                    </th>
                    <th className="px-4 py-3 text-center text-sm leading-5 font-semibold text-[#1F2937]">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-default">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-[#F9FAFB]">
                      <td className="px-4 py-3">
                        <p className="text-sm leading-5 font-semibold text-[#1F2937]">
                          {booking.customerName}
                        </p>
                        <p className="text-xs leading-4 text-[#6B7280]">{booking.customerPhone}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm leading-5 text-[#1F2937]">{booking.vehicleName}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm leading-5 text-[#1F2937]">
                          {new Date(booking.startDate).toLocaleDateString('vi-VN')} →{' '}
                          {new Date(booking.endDate).toLocaleDateString('vi-VN')}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm leading-5 font-bold text-[#1F2937]">
                          {(booking.totalPrice / 1000).toLocaleString('vi-VN')}K
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        {booking.status === 'pending' && (
                          <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs leading-4 font-semibold text-orange-700">
                            Chờ
                          </span>
                        )}
                        {booking.status === 'approved' && (
                          <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs leading-4 font-semibold text-primary-700">
                            ✓ Đã duyệt
                          </span>
                        )}
                        {booking.status === 'rejected' && (
                          <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs leading-4 font-semibold text-red-700">
                            ✕ Từ chối
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {booking.status === 'pending' && (
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleApprove(booking.id)}
                              className="rounded-md bg-[#00A86B] px-3 py-1 text-xs leading-4 font-semibold text-white hover:bg-[#008F5A]"
                            >
                              ✓
                            </button>
                            <button
                              onClick={() => handleReject(booking.id)}
                              className="rounded-md border border-red-300 px-3 py-1 text-xs leading-4 font-semibold text-red-600 hover:bg-red-50"
                            >
                              ✕
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
