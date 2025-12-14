'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { useAuth } from '@/context/AuthContext'
import { getUserProfile, updateUserProfile } from '@/lib/services/userService'
import { ToastContainer } from '@/components/ui/Toast'
import { useToast } from '@/hooks/useToast'
import { LogOut, Edit2, Save, X, Loader, MapPin, Phone, Mail, Star } from 'lucide-react'

interface UserProfile {
  displayName: string
  email: string
  phoneNumber: string
  address: string
}

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading: authLoading, signOut } = useAuth()
  const { toasts, removeToast, success, error } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'bookings'>('bookings')
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [profileLoading, setProfileLoading] = useState(true)
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    phoneNumber: '',
    address: '',
  })

  // Fetch user profile from Firestore
  useEffect(() => {
    if (user && !authLoading) {
      setProfileLoading(true)
      getUserProfile(user.uid)
        .then(profile => {
          if (profile) {
            setUserProfile({
              displayName: profile.displayName || '',
              email: profile.email || '',
              phoneNumber: profile.phoneNumber || '',
              address: profile.address || '',
            })
            setFormData({
              displayName: profile.displayName || '',
              email: profile.email || '',
              phoneNumber: profile.phoneNumber || '',
              address: profile.address || '',
            })
          } else {
            // If no profile found, use user auth data
            setFormData({
              displayName: user.displayName || '',
              email: user.email || '',
              phoneNumber: '',
              address: '',
            })
          }
        })
        .catch(error => {
          console.error('Error fetching profile:', error)
          // Fallback to auth data
          setFormData({
            displayName: user.displayName || '',
            email: user.email || '',
            phoneNumber: '',
            address: '',
          })
        })
        .finally(() => setProfileLoading(false))
    }
  }, [user, authLoading])

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/dang-nhap')
    }
  }, [user, authLoading, router])

  if (authLoading || profileLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-[#F9FAFB] to-[#F3F4F6]">
        <Header showAuthButtons={false} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader className="animate-spin mx-auto" size={32} />
            <p className="text-[#6B7280]">Đang tải...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    if (!user) return

    try {
      setIsSaving(true)
      
      // Validate required fields
      if (!formData.displayName.trim()) {
        error('Vui lòng nhập họ tên')
        return
      }
      if (!formData.phoneNumber.trim()) {
        error('Vui lòng nhập số điện thoại')
        return
      }
      if (!formData.address.trim()) {
        error('Vui lòng nhập địa chỉ')
        return
      }

      // Save to Firestore
      await updateUserProfile(user.uid, {
        displayName: formData.displayName,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      })

      // Update local state
      setUserProfile({
        displayName: formData.displayName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      })

      setIsEditing(false)
      success('Cập nhật thông tin thành công!', 3000)
    } catch (err) {
      console.error('Error saving profile:', err)
      error('Có lỗi xảy ra khi cập nhật thông tin. Vui lòng thử lại.', 3000)
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const getInitials = () => {
    return (user.displayName || user.email || 'U')
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const CUSTOMERS_DATABASE = {
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
  };

  // Use actual user profile data
  const customer = {
    id: user?.uid || '1',
    name: formData.displayName || user?.displayName || 'User',
    email: formData.email || user?.email || 'customer@example.com',
    phone: formData.phoneNumber || '',
    location: formData.address || 'Chưa cập nhật',
    avatar: user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'customer'}&scale=80`,
    joinDate: new Date().toISOString().split('T')[0],
    totalTrips: 0,
    totalSpent: '0đ',
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
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-[#F9FAFB] to-white">
      <Header userType="customer" darkMode={false} />
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <div className="flex-1 w-full">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 sticky top-20 shadow-sm">
                {/* Avatar */}
                <div className="flex justify-center mb-6">
                  <img
                    src={customer.avatar}
                    alt={customer.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-[#00A86B] shadow-lg"
                  />
                </div>

                {/* Name & Title */}
                <h1 className="text-2xl font-bold text-[#1F2937] text-center mb-2">{customer.name}</h1>
                <p className="text-[#6B7280] text-center text-sm mb-6">Khách hàng</p>

                {/* Badge */}
                {customer.verified && (
                  <div className="flex justify-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Đã xác minh
                    </div>
                  </div>
                )}

                {/* Message Button */}
                <button className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-[#F9FAFB] transition-colors mb-8 flex items-center justify-center gap-2 border border-[#E5E7EB]">
                  <Mail size={18} />
                  Nhắn tin
                </button>

                {/* Member Info */}
                <div className="space-y-4 pt-6 border-t border-[#E5E7EB]">
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B7280] text-sm">Thành viên từ</span>
                    <span className="text-[#1F2937] font-semibold">Jan 2024</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B7280] text-sm">Hoạt động cuối</span>
                    <span className="text-[#1F2937] font-semibold">2 giờ trước</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B7280] text-sm">Vai trò</span>
                    <span className="text-[#1F2937] font-semibold">Khách hàng</span>
                  </div>
                </div>

                {/* Edit Button */}
                <button 
                  onClick={() => setIsEditing(true)}
                  className="w-full mt-8 bg-[#00A86B] text-white py-3 rounded-xl font-semibold hover:bg-[#008F5A] transition-colors flex items-center justify-center gap-2"
                >
                  <Edit2 size={18} />
                  Chỉnh sửa hồ sơ
                </button>
              </div>
            </div>

            {/* Right Content - Stats & Activity */}
            <div className="lg:col-span-3 space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Projects Card */}
                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <Star size={24} className="text-[#00A86B]" />
                    </div>
                    <div>
                      <p className="text-[#1F2937] text-3xl font-bold">{customer.totalTrips}</p>
                      <p className="text-[#6B7280] text-sm mt-1">Chuyến đặt</p>
                      <p className="text-[#9CA3AF] text-xs">Hoàn tất</p>
                    </div>
                  </div>
                </div>

                {/* Team Card */}
                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <Phone size={24} className="text-[#00A86B]" />
                    </div>
                    <div>
                      <p className="text-[#1F2937] text-3xl font-bold">5.2k</p>
                      <p className="text-[#6B7280] text-sm mt-1">Điểm tích lũy</p>
                      <p className="text-[#9CA3AF] text-xs">Từ các chuyến</p>
                    </div>
                  </div>
                </div>

                {/* Satisfaction Card */}
                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <Mail size={24} className="text-[#00A86B]" />
                    </div>
                    <div>
                      <p className="text-[#1F2937] text-3xl font-bold">98%</p>
                      <p className="text-[#6B7280] text-sm mt-1">Đánh giá tốt</p>
                      <p className="text-[#9CA3AF] text-xs">Từ chủ xe</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-[#1F2937] mb-8">Hoạt động gần đây</h2>
                
                <div className="space-y-4">
                  {bookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex items-start gap-4 pb-4 border-b border-[#E5E7EB] last:border-0 last:pb-0">
                      <Star size={20} className="text-[#00A86B] flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <p className="text-[#1F2937] font-semibold">Đặt xe "{booking.vehicle}"</p>
                        <p className="text-[#6B7280] text-sm mt-1">{booking.startDate} đến {booking.endDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm transition-opacity duration-200 animate-in fade-in"
            onClick={() => setIsEditing(false)}
          />

          {/* Modal */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl border border-[#E5E7EB] shadow-2xl z-50 w-full max-w-md max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
              <h2 className="text-lg font-semibold text-[#1F2937]">Chỉnh sửa hồ sơ</h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F9FAFB] p-1 rounded-lg transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
                {/* Display Name */}
                <div>
                  <label htmlFor="displayName" className="block text-sm font-medium text-[#1F2937] mb-2">
                    Họ và tên
                  </label>
                  <input
                    id="displayName"
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#E5E7EB] bg-white rounded-lg text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#00A86B] focus:border-transparent"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-[#1F2937] mb-2">
                    Số điện thoại
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#E5E7EB] bg-white rounded-lg text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#00A86B] focus:border-transparent"
                    required
                  />
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-[#1F2937] mb-2">
                    Địa chỉ
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-[#E5E7EB] bg-white rounded-lg text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#00A86B] focus:border-transparent"
                    required
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 px-4 py-2 border border-[#E5E7EB] text-[#1F2937] rounded-lg font-semibold hover:bg-[#F9FAFB] transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 bg-[#00A86B] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#008F5A] disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
                  >
                    {isSaving && <Loader size={16} className="animate-spin" />}
                    {isSaving ? 'Đang lưu...' : 'Lưu'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
