'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Star, MapPin, Phone, Mail, Calendar } from 'lucide-react';

export default function CustomerProfilePage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const [activeTab, setActiveTab] = useState<'info' | 'bookings' | 'payments' | 'saved'>('info');

  // Mock customers database
  const customersDatabase: Record<string, any> = {
    'customer-1': {
      id: '1',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0912345678',
      location: 'Quận 10, TP.HCM',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nguyễn Văn A&scale=80',
      joinDate: '2023-05-10',
      totalTrips: 24,
      totalSpent: '15.600.000đ',
      verified: true,
    },
    'customer-2': {
      id: '2',
      name: 'Trần Thị B',
      email: 'tranthib@example.com',
      phone: '0987654321',
      location: 'Quận 1, TP.HCM',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Trần Thị B&scale=80',
      joinDate: '2023-06-15',
      totalTrips: 12,
      totalSpent: '8.400.000đ',
      verified: true,
    },
    'customer-3': {
      id: '3',
      name: 'Lê Minh C',
      email: 'leminhc@example.com',
      phone: '0976543210',
      location: 'Quận 7, TP.HCM',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lê Minh C&scale=80',
      joinDate: '2023-08-20',
      totalTrips: 8,
      totalSpent: '5.200.000đ',
      verified: true,
    },
  };

  // Default customer data
  const customer = userId && customersDatabase[userId] ? customersDatabase[userId] : {
    id: '1',
    name: 'Trần Thị B',
    email: 'customer@example.com',
    phone: '0987654321',
    location: 'Quận 1, TP.HCM',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=customer&scale=80',
    joinDate: '2023-06-15',
    totalTrips: 12,
    totalSpent: '8.400.000đ',
    verified: true,
  };

  const bookings = [
    {
      id: '1',
      vehicle: 'Hyundai Elantra 2023',
      owner: 'Nguyễn Văn A',
      startDate: '2025-01-10',
      endDate: '2025-01-12',
      status: 'completed',
      totalPrice: '900.000đ',
      rating: 5,
    },
    {
      id: '2',
      vehicle: 'Toyota Vios 2022',
      owner: 'Nguyễn Văn A',
      startDate: '2025-01-05',
      endDate: '2025-01-07',
      status: 'completed',
      totalPrice: '700.000đ',
      rating: 4,
    },
    {
      id: '3',
      vehicle: 'Kia Cerato 2023',
      owner: 'Lê Văn C',
      startDate: '2025-01-20',
      endDate: '2025-01-22',
      status: 'confirmed',
      totalPrice: '800.000đ',
      rating: null,
    },
  ];

  const payments = [
    {
      id: '1',
      date: '2025-01-10',
      amount: '900.000đ',
      vehicle: 'Hyundai Elantra 2023',
      method: 'Thẻ tín dụng',
      status: 'completed',
    },
    {
      id: '2',
      date: '2025-01-05',
      amount: '700.000đ',
      vehicle: 'Toyota Vios 2022',
      method: 'E-wallet',
      status: 'completed',
    },
    {
      id: '3',
      date: '2025-01-20',
      amount: '800.000đ',
      vehicle: 'Kia Cerato 2023',
      method: 'Chuyển khoản',
      status: 'pending',
    },
  ];

  const savedVehicles = [
    {
      id: '1',
      name: 'Mercedes-Benz C-Class 2023',
      owner: 'Phạm Văn D',
      price: '650.000đ/ngày',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1494976866955-cda751c3a490?w=400',
    },
    {
      id: '2',
      name: 'BMW 3 Series 2023',
      owner: 'Đặng Thị E',
      price: '700.000đ/ngày',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400',
    },
    {
      id: '3',
      name: 'Audi A4 2023',
      owner: 'Trương Văn F',
      price: '680.000đ/ngày',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1606611013016-969c19d24e1f?w=400',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Hoàn tất';
      case 'confirmed':
        return 'Đã xác nhận';
      case 'pending':
        return 'Chờ thanh toán';
      default:
        return status;
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <Header userType="customer" />

      <div className="flex-1 w-full">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-8">
          {/* Profile Header */}
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <img
                src={customer.avatar}
                alt={customer.name}
                className="w-32 h-32 rounded-full object-cover flex-shrink-0"
              />

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-[#1F2937] mb-2">{customer.name}</h1>
                    {customer.verified && (
                      <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        ✓ Đã xác minh
                      </div>
                    )}
                  </div>
                  <button className="bg-[#00A86B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#008F5A]">
                    Chỉnh sửa hồ sơ
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pb-6 border-b border-[#E5E7EB]">
                  <div>
                    <p className="text-[#6B7280] text-sm mb-1">Tổng chuyến</p>
                    <p className="text-2xl font-bold text-[#1F2937]">{customer.totalTrips}</p>
                  </div>
                  <div>
                    <p className="text-[#6B7280] text-sm mb-1">Tổng chi tiêu</p>
                    <p className="text-2xl font-bold text-[#00A86B]">{customer.totalSpent}</p>
                  </div>
                  <div>
                    <p className="text-[#6B7280] text-sm mb-1">Thành viên từ</p>
                    <p className="text-lg font-bold text-[#1F2937]">2023</p>
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-2 mt-4">
                  <div className="flex items-center gap-2 text-[#6B7280]">
                    <MapPin size={16} />
                    <span>{customer.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#6B7280]">
                    <Phone size={16} />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#6B7280]">
                    <Mail size={16} />
                    <span>{customer.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-[#E5E7EB] mb-8">
            <div className="flex gap-8">
              {(['info', 'bookings', 'payments', 'saved'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 font-semibold transition-colors ${
                    activeTab === tab
                      ? 'text-[#00A86B] border-b-2 border-[#00A86B]'
                      : 'text-[#6B7280] hover:text-[#1F2937]'
                  }`}
                >
                  {tab === 'info' && 'Thông tin'}
                  {tab === 'bookings' && 'Chuyến đi'}
                  {tab === 'payments' && 'Thanh toán'}
                  {tab === 'saved' && 'Đã lưu'}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'info' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-xl font-semibold text-[#1F2937] mb-4">Thông tin cá nhân</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-[#6B7280]">Họ tên</label>
                    <p className="font-semibold text-[#1F2937]">{customer.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-[#6B7280]">Email</label>
                    <p className="font-semibold text-[#1F2937]">{customer.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-[#6B7280]">Số điện thoại</label>
                    <p className="font-semibold text-[#1F2937]">{customer.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-[#6B7280]">Địa chỉ</label>
                    <p className="font-semibold text-[#1F2937]">{customer.location}</p>
                  </div>
                  <button className="w-full bg-[#00A86B] text-white py-2 rounded-lg font-semibold hover:bg-[#008F5A]">
                    Chỉnh sửa thông tin
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-xl font-semibold text-[#1F2937] mb-4">Bảo mật</h3>
                <div className="space-y-4">
                  <button className="w-full text-left p-3 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB]">
                    <p className="font-semibold text-[#1F2937]">Đổi mật khẩu</p>
                    <p className="text-sm text-[#6B7280]">Cập nhật mật khẩu của bạn</p>
                  </button>
                  <button className="w-full text-left p-3 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB]">
                    <p className="font-semibold text-[#1F2937]">Xác minh tài khoản</p>
                    <p className="text-sm text-[#6B7280]">Xác minh danh tính của bạn</p>
                  </button>
                  <button className="w-full text-left p-3 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB]">
                    <p className="font-semibold text-[#1F2937]">Phương thức thanh toán</p>
                    <p className="text-sm text-[#6B7280]">Quản lý thẻ và ví điện tử</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div>
              <h3 className="text-2xl font-semibold text-[#1F2937] mb-6">Chuyến đi của tôi ({bookings.length})</h3>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="rounded-lg border border-[#E5E7EB] p-4 md:p-6">
                    <div className="grid md:grid-cols-5 gap-4 items-center">
                      <div>
                        <p className="text-sm text-[#6B7280] mb-1">Xe</p>
                        <p className="font-semibold text-[#1F2937]">{booking.vehicle}</p>
                        <p className="text-xs text-[#6B7280]">Chủ: {booking.owner}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#6B7280] mb-1">Ngày</p>
                        <p className="font-semibold text-[#1F2937] text-sm">{booking.startDate} đến {booking.endDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#6B7280] mb-1">Trạng thái</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-[#6B7280] mb-1">Tổng tiền</p>
                        <p className="font-bold text-[#00A86B]">{booking.totalPrice}</p>
                      </div>
                      <div className="text-right">
                        {booking.rating ? (
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={i < booking.rating! ? 'fill-yellow-400 text-yellow-400' : 'text-[#D1D5DB]'}
                              />
                            ))}
                          </div>
                        ) : (
                          <button className="text-[#00A86B] font-semibold text-sm hover:underline">
                            Đánh giá
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div>
              <h3 className="text-2xl font-semibold text-[#1F2937] mb-6">Lịch sử thanh toán ({payments.length})</h3>
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div key={payment.id} className="rounded-lg border border-[#E5E7EB] p-4 md:p-6">
                    <div className="grid md:grid-cols-5 gap-4 items-center">
                      <div>
                        <p className="text-sm text-[#6B7280] mb-1">Ngày</p>
                        <p className="font-semibold text-[#1F2937]">{payment.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#6B7280] mb-1">Xe</p>
                        <p className="font-semibold text-[#1F2937]">{payment.vehicle}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#6B7280] mb-1">Phương thức</p>
                        <p className="font-semibold text-[#1F2937]">{payment.method}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#6B7280] mb-1">Trạng thái</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(payment.status)}`}>
                          {getStatusText(payment.status)}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#00A86B]">{payment.amount}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'saved' && (
            <div>
              <h3 className="text-2xl font-semibold text-[#1F2937] mb-6">Xe đã lưu ({savedVehicles.length})</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {savedVehicles.map((vehicle) => (
                  <div key={vehicle.id} className="rounded-lg border border-[#E5E7EB] overflow-hidden hover:shadow-lg transition-shadow">
                    <img src={vehicle.image} alt={vehicle.name} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h4 className="font-semibold text-[#1F2937] mb-1">{vehicle.name}</h4>
                      <p className="text-sm text-[#6B7280] mb-2">Chủ: {vehicle.owner}</p>
                      <p className="text-[#00A86B] font-bold mb-2">{vehicle.price}</p>
                      <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-4">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{vehicle.rating}</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 border border-[#E5E7EB] text-[#1F2937] py-2 rounded-lg hover:bg-[#F9FAFB]">
                          Xem
                        </button>
                        <button className="flex-1 bg-[#00A86B] text-white py-2 rounded-lg hover:bg-[#008F5A]">
                          Đặt xe
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
