'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Star, MapPin, Phone, Mail, Calendar, FileText } from 'lucide-react';

export default function OwnerProfilePage() {
  const searchParams = useSearchParams();
  const ownerId = searchParams.get('ownerId');
  const [activeTab, setActiveTab] = useState<'info' | 'vehicles' | 'bookings' | 'reviews'>('info');

  // Mock owners database
  const ownersDatabase: Record<string, any> = {
    'nguyen-van-a': {
      id: '1',
      name: 'Nguyễn Văn A',
      email: 'owner@example.com',
      phone: '0912345678',
      location: 'Phường 17, Quận Bình Thạnh',
      rating: 4.8,
      reviewCount: 156,
      joinDate: '2022-01-15',
      bio: 'Chủ xe chuyên nghiệp với 3 năm kinh nghiệm cho thuê xe. Xe luôn sạch sẽ, an toàn và được bảo dưỡng định kỳ.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nguyễn Văn A&scale=80',
      verificationStatus: 'verified',
      responseRate: 98,
      responseTime: '2 giờ',
      completedTrips: 156,
    },
  };

  // Default owner data
  const owner = ownerId && ownersDatabase[ownerId] ? ownersDatabase[ownerId] : {
    id: '1',
    name: 'Nguyễn Văn A',
    email: 'owner@example.com',
    phone: '0912345678',
    location: 'Phường 17, Quận Bình Thạnh',
    rating: 4.8,
    reviewCount: 156,
    joinDate: '2022-01-15',
    bio: 'Chủ xe chuyên nghiệp với 3 năm kinh nghiệm cho thuê xe. Xe luôn sạch sẽ, an toàn và được bảo dưỡng định kỳ.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=owner&scale=80',
    verificationStatus: 'verified',
    responseRate: 98,
    responseTime: '2 giờ',
    completedTrips: 156,
  };

  const vehicles = [
    {
      id: '1',
      name: 'Hyundai Elantra 2023',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
      price: '450.000đ/ngày',
      rating: 4.9,
      trips: 45,
    },
    {
      id: '2',
      name: 'Toyota Vios 2022',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
      price: '350.000đ/ngày',
      rating: 4.7,
      trips: 68,
    },
    {
      id: '3',
      name: 'Kia Cerato 2023',
      image: 'https://images.unsplash.com/photo-1619405399517-dea7aefabc5b?w=400',
      price: '400.000đ/ngày',
      rating: 4.8,
      trips: 43,
    },
  ];

  const bookings = [
    {
      id: '1',
      customerName: 'Trần Thị B',
      vehicle: 'Hyundai Elantra 2023',
      startDate: '2025-01-10',
      endDate: '2025-01-12',
      status: 'completed',
      totalPrice: '900.000đ',
    },
    {
      id: '2',
      customerName: 'Lê Văn C',
      vehicle: 'Toyota Vios 2022',
      startDate: '2025-01-15',
      endDate: '2025-01-17',
      status: 'confirmed',
      totalPrice: '700.000đ',
    },
    {
      id: '3',
      customerName: 'Phạm Thị D',
      vehicle: 'Kia Cerato 2023',
      startDate: '2025-01-20',
      endDate: '2025-01-22',
      status: 'pending',
      totalPrice: '800.000đ',
    },
  ];

  const reviews = [
    {
      id: '1',
      customerName: 'Trần Thị B',
      rating: 5,
      comment: 'Chủ xe rất thân thiện, xe sạch sẽ và đúng giờ. Rất hài lòng với dịch vụ!',
      date: '2025-01-12',
    },
    {
      id: '2',
      customerName: 'Lê Văn C',
      rating: 4,
      comment: 'Xe tốt, giao dịch nhanh gọn. Chủ xe chuyên nghiệp.',
      date: '2025-01-17',
    },
    {
      id: '3',
      customerName: 'Phạm Thị D',
      rating: 5,
      comment: 'Rất tuyệt vời! Sẽ thuê lại lần nữa.',
      date: '2025-01-22',
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
        return 'Chờ xác nhận';
      default:
        return status;
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <Header userType="owner" />

      <div className="flex-1 w-full">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-8">
          {/* Profile Header */}
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <img
                src={owner.avatar}
                alt={owner.name}
                className="w-32 h-32 rounded-full object-cover flex-shrink-0"
              />

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-[#1F2937] mb-2">{owner.name}</h1>
                    <div className="flex items-center gap-2 mb-2">
                      <Star size={18} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-semibold text-[#1F2937]">{owner.rating}</span>
                      <span className="text-[#6B7280]">({owner.reviewCount} đánh giá)</span>
                    </div>
                    {owner.verificationStatus === 'verified' && (
                      <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        ✓ Đã xác minh
                      </div>
                    )}
                  </div>
                  <button className="bg-[#00A86B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#008F5A]">
                    Liên hệ
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-[#E5E7EB]">
                  <div>
                    <p className="text-[#6B7280] text-sm mb-1">Chuyến đã hoàn tất</p>
                    <p className="text-2xl font-bold text-[#1F2937]">{owner.completedTrips}</p>
                  </div>
                  <div>
                    <p className="text-[#6B7280] text-sm mb-1">Tỉ lệ phản hồi</p>
                    <p className="text-2xl font-bold text-[#1F2937]">{owner.responseRate}%</p>
                  </div>
                  <div>
                    <p className="text-[#6B7280] text-sm mb-1">Thời gian phản hồi</p>
                    <p className="text-2xl font-bold text-[#1F2937]">{owner.responseTime}</p>
                  </div>
                  <div>
                    <p className="text-[#6B7280] text-sm mb-1">Tham gia từ</p>
                    <p className="text-lg font-bold text-[#1F2937]">2022</p>
                  </div>
                </div>

                {/* Contact & Bio */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#6B7280]">
                    <MapPin size={16} />
                    <span>{owner.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#6B7280]">
                    <Phone size={16} />
                    <span>{owner.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#6B7280]">
                    <Mail size={16} />
                    <span>{owner.email}</span>
                  </div>
                  <p className="text-[#1F2937] mt-4 italic">{owner.bio}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-[#E5E7EB] mb-8">
            <div className="flex gap-8">
              {(['info', 'vehicles', 'bookings', 'reviews'] as const).map((tab) => (
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
                  {tab === 'vehicles' && 'Xe của tôi'}
                  {tab === 'bookings' && 'Đơn đặt'}
                  {tab === 'reviews' && 'Đánh giá'}
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
                    <p className="font-semibold text-[#1F2937]">{owner.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-[#6B7280]">Email</label>
                    <p className="font-semibold text-[#1F2937]">{owner.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-[#6B7280]">Số điện thoại</label>
                    <p className="font-semibold text-[#1F2937]">{owner.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-[#6B7280]">Địa chỉ</label>
                    <p className="font-semibold text-[#1F2937]">{owner.location}</p>
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
                    <p className="font-semibold text-[#1F2937]">Đăng xuất khỏi tất cả thiết bị</p>
                    <p className="text-sm text-[#6B7280]">Kết thúc tất cả các phiên khác</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vehicles' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-[#1F2937]">Xe của tôi ({vehicles.length})</h3>
                <button className="bg-[#00A86B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#008F5A]">
                  + Thêm xe
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="rounded-lg border border-[#E5E7EB] overflow-hidden hover:shadow-lg transition-shadow">
                    <img src={vehicle.image} alt={vehicle.name} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h4 className="font-semibold text-[#1F2937] mb-2">{vehicle.name}</h4>
                      <p className="text-[#00A86B] font-bold mb-2">{vehicle.price}</p>
                      <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-4">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{vehicle.rating}</span>
                        <span>({vehicle.trips} chuyến)</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 border border-[#E5E7EB] text-[#1F2937] py-2 rounded-lg hover:bg-[#F9FAFB]">
                          Xem
                        </button>
                        <button className="flex-1 bg-[#00A86B] text-white py-2 rounded-lg hover:bg-[#008F5A]">
                          Chỉnh sửa
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div>
              <h3 className="text-2xl font-semibold text-[#1F2937] mb-6">Đơn đặt của tôi ({bookings.length})</h3>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="rounded-lg border border-[#E5E7EB] p-4 md:p-6">
                    <div className="grid md:grid-cols-5 gap-4 items-center">
                      <div>
                        <p className="text-sm text-[#6B7280] mb-1">Khách hàng</p>
                        <p className="font-semibold text-[#1F2937]">{booking.customerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#6B7280] mb-1">Xe</p>
                        <p className="font-semibold text-[#1F2937]">{booking.vehicle}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#6B7280] mb-1">Ngày</p>
                        <p className="font-semibold text-[#1F2937]">{booking.startDate} đến {booking.endDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#6B7280] mb-1">Trạng thái</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-[#6B7280] mb-1">Tổng tiền</p>
                        <p className="text-lg font-bold text-[#00A86B]">{booking.totalPrice}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-2xl font-semibold text-[#1F2937] mb-6">Đánh giá ({reviews.length})</h3>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="rounded-lg border border-[#E5E7EB] p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold text-[#1F2937]">{review.customerName}</p>
                        <p className="text-sm text-[#6B7280]">{review.date}</p>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-[#D1D5DB]'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-[#1F2937]">{review.comment}</p>
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
