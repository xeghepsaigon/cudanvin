'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Edit2, Trash2, Eye, EyeOff, CheckCircle, XCircle, Plus, Loader } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
// Using mock service for now - will switch to Firebase when configured
import * as vehicleService from '@/lib/services/mockService';
import * as bookingService from '@/lib/services/mockService';
import type { Vehicle } from '@/lib/services/vehicleService';
import type { Booking } from '@/lib/services/bookingService';

export default function OwnerDashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [ownerVehicles, setOwnerVehicles] = useState<Vehicle[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  const [activeTab, setActiveTab] = useState<'vehicles' | 'bookings'>('vehicles');
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use user ID from auth
  const ownerId = user?.uid || 'owner-1';

  // Check auth and redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/dang-nhap');
    }
  }, [user, authLoading, router]);

  // Load data from Firebase
  useEffect(() => {
    if (!user) return; // Don't load data until user is authenticated
    
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [vehiclesData, pendingBookingsData, approvedBookingsData] = await Promise.all([
          vehicleService.getOwnerVehicles(ownerId),
          bookingService.getPendingBookings(ownerId),
          bookingService.getApprovedBookings(ownerId),
        ]);

        setOwnerVehicles(vehiclesData);
        setBookings([...pendingBookingsData, ...approvedBookingsData]);
      } catch (err: any) {
        console.error('Error loading data:', err);
        setError('Lỗi khi tải dữ liệu. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const approvedBookingsCount = bookings.filter(b => b.status === 'approved').length;

  const handleDeleteVehicle = async (vehicleId: string) => {
    try {
      setLoading(true);
      await deleteVehicle(vehicleId);
      setOwnerVehicles(ownerVehicles.filter(v => v.id !== vehicleId));
      setShowDeleteModal(null);
    } catch (err) {
      console.error('Error deleting vehicle:', err);
      setError('Lỗi khi xóa xe. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVehicleStatus = async (vehicleId: string) => {
    try {
      const vehicle = ownerVehicles.find(v => v.id === vehicleId);
      if (!vehicle) return;

      const newStatus = !vehicle.isActive;
      await updateVehicle(vehicleId, { isActive: newStatus });
      
      setOwnerVehicles(ownerVehicles.map(v =>
        v.id === vehicleId ? { ...v, isActive: newStatus } : v
      ));
    } catch (err) {
      console.error('Error updating vehicle status:', err);
      setError('Lỗi khi cập nhật trạng thái xe. Vui lòng thử lại.');
    }
  };

  const handleApproveBooking = async (bookingId: string) => {
    try {
      await updateBookingStatus(bookingId, 'approved');
      setBookings(bookings.map(b =>
        b.id === bookingId ? { ...b, status: 'approved' } : b
      ));
    } catch (err) {
      console.error('Error approving booking:', err);
      setError('Lỗi khi duyệt booking. Vui lòng thử lại.');
    }
  };

  const handleRejectBooking = async (bookingId: string) => {
    try {
      await updateBookingStatus(bookingId, 'rejected');
      setBookings(bookings.map(b =>
        b.id === bookingId ? { ...b, status: 'rejected' } : b
      ));
    } catch (err) {
      console.error('Error rejecting booking:', err);
      setError('Lỗi khi từ chối booking. Vui lòng thử lại.');
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F9FAFB]">
      <Header />

      <div className="flex-1">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-6">
          {/* Error Message */}
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="flex flex-col items-center gap-3">
                <Loader className="animate-spin text-[#00A86B]" size={32} />
                <p className="text-[#6B7280]">Đang tải dữ liệu...</p>
              </div>
            </div>
          )}

          {!loading && (
            <>
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#1F2937] mb-2">Quản lý xe</h1>
            <p className="text-base text-[#6B7280]">Chào mừng chủ xe! Quản lý xe và booking của bạn</p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-4 mb-8">
            <div className="rounded-lg bg-white border border-[#E5E7EB] p-6 shadow-sm hover:shadow-md transition">
              <p className="text-sm text-[#6B7280] mb-2 font-medium">Xe đang đăng</p>
              <p className="text-3xl font-bold text-[#00A86B]">{ownerVehicles.filter(v => v.isActive).length}</p>
              <p className="text-xs text-[#6B7280] mt-2">{ownerVehicles.length} tổng cộng</p>
            </div>

            <div className="rounded-lg bg-white border border-[#E5E7EB] p-6 shadow-sm hover:shadow-md transition">
              <p className="text-sm text-[#6B7280] mb-2 font-medium">Booking chờ</p>
              <p className="text-3xl font-bold text-orange-600">{pendingBookings}</p>
              <p className="text-xs text-[#6B7280] mt-2">Cần xác nhận</p>
            </div>

            <div className="rounded-lg bg-white border border-[#E5E7EB] p-6 shadow-sm hover:shadow-md transition">
              <p className="text-sm text-[#6B7280] mb-2 font-medium">Booking đã duyệt</p>
              <p className="text-3xl font-bold text-[#00A86B]">{approvedBookingsCount}</p>
              <p className="text-xs text-[#6B7280] mt-2">Đã xác nhận</p>
            </div>

            <div className="rounded-lg bg-white border border-[#E5E7EB] p-6 shadow-sm hover:shadow-md transition">
              <p className="text-sm text-[#6B7280] mb-2 font-medium">Tổng doanh thu</p>
              <p className="text-3xl font-bold text-blue-600">
                {(bookings.filter(b => b.status === 'approved').reduce((sum, b) => sum + b.totalPrice, 0) / 1000000).toFixed(1)}M
              </p>
              <p className="text-xs text-[#6B7280] mt-2">Tháng này</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-[#E5E7EB]">
            <button
              onClick={() => setActiveTab('vehicles')}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition ${
                activeTab === 'vehicles'
                  ? 'border-[#00A86B] text-[#00A86B]'
                  : 'border-transparent text-[#6B7280] hover:text-[#1F2937]'
              }`}
            >
              🚗 Quản lý xe ({ownerVehicles.length})
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition ${
                activeTab === 'bookings'
                  ? 'border-[#00A86B] text-[#00A86B]'
                  : 'border-transparent text-[#6B7280] hover:text-[#1F2937]'
              }`}
            >
              📅 Quản lý booking ({bookings.length})
            </button>
          </div>

          {/* Vehicles Tab */}
          {activeTab === 'vehicles' && (
            <div className="space-y-6">
              <div className="flex gap-3">
                <button 
                  onClick={() => router.push('/chu-xe/dashboard/them-xe')}
                  className="flex items-center gap-2 rounded-lg bg-[#00A86B] px-6 py-3 text-sm font-semibold text-white hover:bg-[#008F5A] transition"
                >
                  <Plus size={18} />
                  Thêm xe mới
                </button>
              </div>

              {ownerVehicles.length === 0 ? (
                <div className="rounded-lg border border-[#E5E7EB] bg-white p-8 text-center">
                  <p className="text-[#6B7280] mb-4">Bạn chưa có xe nào</p>
                  <button 
                    onClick={() => router.push('/chu-xe/dashboard/them-xe')}
                    className="rounded-lg bg-[#00A86B] px-6 py-2 text-sm font-semibold text-white hover:bg-[#008F5A]"
                  >
                    Đăng xe đầu tiên
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {ownerVehicles.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className="rounded-lg border border-[#E5E7EB] bg-white p-6 hover:shadow-md transition"
                    >
                      <div className="flex gap-4">
                        <img
                          src={vehicle.images[0]}
                          alt={vehicle.name}
                          className="h-32 w-32 rounded-lg object-cover"
                        />

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-[#1F2937]">{vehicle.name}</h3>
                              <p className="text-sm text-[#6B7280]">
                                {(vehicle.pricePerDay / 1000).toLocaleString('vi-VN')}K/ngày • {vehicle.seats} chỗ
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              vehicle.isActive
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {vehicle.isActive ? '✓ Hiển thị' : '✕ Ẩn'}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-500">⭐</span>
                              <span className="text-sm font-semibold text-[#1F2937]">{vehicle.rating}</span>
                              <span className="text-xs text-[#6B7280]">({vehicle.reviewCount} đánh giá)</span>
                            </div>
                          </div>

                          <div className="flex gap-2 flex-wrap">
                            <button
                              onClick={() => router.push(`/chu-xe/dashboard/sua-xe/${vehicle.id}`)}
                              className="flex items-center gap-2 rounded-md border border-[#00A86B] px-4 py-2 text-sm font-medium text-[#00A86B] hover:bg-green-50 transition"
                            >
                              <Edit2 size={16} />
                              Sửa
                            </button>
                            <button
                              onClick={() => handleToggleVehicleStatus(vehicle.id)}
                              className="flex items-center gap-2 rounded-md border border-[#6B7280] px-4 py-2 text-sm font-medium text-[#6B7280] hover:bg-gray-50 transition"
                            >
                              {vehicle.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                              {vehicle.isActive ? 'Ẩn' : 'Hiển thị'}
                            </button>
                            <button
                              onClick={() => setShowDeleteModal(vehicle.id)}
                              className="flex items-center gap-2 rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
                            >
                              <Trash2 size={16} />
                              Xóa
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              {/* Pending Bookings */}
              {bookings.filter(b => b.status === 'pending').length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-[#1F2937]">📋 Booking chờ xác nhận</h2>
                  {bookings
                    .filter(b => b.status === 'pending')
                    .map((booking) => (
                      <div
                        key={booking.id}
                        className="rounded-lg border border-orange-200 bg-orange-50 p-6"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-base font-semibold text-[#1F2937]">Khách: {booking.customer}</p>
                            <p className="text-sm text-[#6B7280] mt-1">{booking.vehicle}</p>
                            <p className="text-sm text-[#6B7280] mt-1">
                              {new Date(booking.startDate).toLocaleDateString('vi-VN')} → {new Date(booking.endDate).toLocaleDateString('vi-VN')}
                            </p>
                            <p className="text-base font-bold text-orange-600 mt-2">
                              {(booking.totalPrice / 1000000).toFixed(2)}M đ
                            </p>
                          </div>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-200 text-orange-700">
                            ⏳ Chờ
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApproveBooking(booking.id)}
                            className="flex-1 flex items-center justify-center gap-2 rounded-md bg-[#00A86B] py-3 text-sm font-semibold text-white hover:bg-[#008F5A] transition"
                          >
                            <CheckCircle size={16} />
                            Duyệt
                          </button>
                          <button
                            onClick={() => handleRejectBooking(booking.id)}
                            className="flex-1 flex items-center justify-center gap-2 rounded-md border border-red-300 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition"
                          >
                            <XCircle size={16} />
                            Từ chối
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {/* Approved Bookings */}
              {bookings.filter(b => b.status === 'approved').length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-[#1F2937]">✓ Booking đã duyệt</h2>
                  {bookings
                    .filter(b => b.status === 'approved')
                    .map((booking) => (
                      <div
                        key={booking.id}
                        className="rounded-lg border border-green-200 bg-green-50 p-6"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-base font-semibold text-[#1F2937]">Khách: {booking.customer}</p>
                            <p className="text-sm text-[#6B7280] mt-1">{booking.vehicle}</p>
                            <p className="text-sm text-[#6B7280] mt-1">
                              {new Date(booking.startDate).toLocaleDateString('vi-VN')} → {new Date(booking.endDate).toLocaleDateString('vi-VN')}
                            </p>
                            <p className="text-base font-bold text-green-600 mt-2">
                              {(booking.totalPrice / 1000000).toFixed(2)}M đ
                            </p>
                          </div>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-200 text-green-700">
                            ✓ Đã duyệt
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {/* Rejected Bookings */}
              {bookings.filter(b => b.status === 'rejected').length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-[#1F2937]">✕ Booking bị từ chối</h2>
                  {bookings
                    .filter(b => b.status === 'rejected')
                    .map((booking) => (
                      <div
                        key={booking.id}
                        className="rounded-lg border border-red-200 bg-red-50 p-6"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-base font-semibold text-[#1F2937]">Khách: {booking.customer}</p>
                            <p className="text-sm text-[#6B7280] mt-1">{booking.vehicle}</p>
                            <p className="text-sm text-[#6B7280] mt-1">
                              {new Date(booking.startDate).toLocaleDateString('vi-VN')} → {new Date(booking.endDate).toLocaleDateString('vi-VN')}
                            </p>
                          </div>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-200 text-red-700">
                            ✕ Từ chối
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {bookings.length === 0 && (
                <div className="rounded-lg border border-[#E5E7EB] bg-white p-8 text-center">
                  <p className="text-[#6B7280]">Chưa có booking nào</p>
                </div>
              )}
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
                <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Xác nhận xóa xe</h3>
                <p className="text-[#6B7280] mb-6">
                  Bạn chắc chắn muốn xóa xe này? Hành động này không thể hoàn tác.
                </p>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setShowDeleteModal(null)}
                    className="rounded-md border border-[#E5E7EB] px-4 py-2 text-sm font-medium text-[#1F2937] hover:bg-[#F9FAFB]"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={() => handleDeleteVehicle(showDeleteModal)}
                    className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
