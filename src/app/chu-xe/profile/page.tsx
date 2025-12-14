'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { useAuth } from '@/context/AuthContext'
import { Upload, Save, Loader, ArrowLeft, Shield, Star, Settings } from 'lucide-react'

export default function OwnerProfilePage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  const [formData, setFormData] = useState({
    businessName: '',
    description: '',
    phone: '',
    location: '',
    verificationStatus: 'pending' as 'pending' | 'verified' | 'rejected',
    rating: 4.5,
    totalRatings: 24,
    responseRate: 98,
    documentUrl: '',
  })

  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'info' | 'verification' | 'settings'>('info')

  // Check auth and redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/dang-nhap')
    }
  }, [user, authLoading, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader()
        reader.onload = (event) => {
          setImages(prev => [...prev, event.target?.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSaveProfile = async () => {
    try {
      setLoading(true)
      setError('')
      setSuccess('')

      // TODO: Save profile to Firestore
      // For now, just show success message
      await new Promise(resolve => setTimeout(resolve, 1000))

      setSuccess('Hồ sơ chủ xe đã được cập nhật thành công!')
    } catch (err: any) {
      setError('Lỗi khi cập nhật hồ sơ. Vui lòng thử lại.')
      console.error('Error saving profile:', err)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-[#F9FAFB]">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader className="animate-spin text-[#00A86B]" size={40} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F9FAFB]">
      <Header />

      <div className="flex-1 mx-auto w-full max-w-4xl px-4 py-8 md:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-white rounded-lg transition"
          >
            <ArrowLeft size={20} className="text-[#6B7280]" />
          </button>
          <h1 className="text-3xl font-bold text-[#1F2937]">Hồ sơ chủ xe</h1>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4">
            <p className="text-sm text-green-700">✅ {success}</p>
          </div>
        )}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
            <p className="text-sm text-red-700">❌ {error}</p>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-[#E5E7EB]">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-4 py-3 font-medium border-b-2 transition ${
              activeTab === 'info'
                ? 'border-[#00A86B] text-[#00A86B]'
                : 'border-transparent text-[#6B7280] hover:text-[#1F2937]'
            }`}
          >
            📋 Thông tin cơ bản
          </button>
          <button
            onClick={() => setActiveTab('verification')}
            className={`px-4 py-3 font-medium border-b-2 transition ${
              activeTab === 'verification'
                ? 'border-[#00A86B] text-[#00A86B]'
                : 'border-transparent text-[#6B7280] hover:text-[#1F2937]'
            }`}
          >
            <Shield size={18} className="inline mr-2" />
            Xác minh
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-3 font-medium border-b-2 transition ${
              activeTab === 'settings'
                ? 'border-[#00A86B] text-[#00A86B]'
                : 'border-transparent text-[#6B7280] hover:text-[#1F2937]'
            }`}
          >
            <Settings size={18} className="inline mr-2" />
            Cài đặt
          </button>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Tab: Thông tin cơ bản */}
          {activeTab === 'info' && (
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 space-y-6">
              {/* Profile Avatar and Basic Info */}
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-[#00A86B] flex items-center justify-center text-white text-2xl font-bold">
                  {formData.businessName.charAt(0) || user?.email?.charAt(0) || 'C'}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#6B7280] mb-1">Email</p>
                  <p className="text-lg font-semibold text-[#1F2937] mb-3">{user?.email}</p>
                  <div className="flex items-center gap-2">
                    <Star size={18} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold text-[#1F2937]">{formData.rating}</span>
                    <span className="text-[#6B7280]">({formData.totalRatings} đánh giá)</span>
                  </div>
                </div>
              </div>

              <hr className="border-[#E5E7EB]" />

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Tên kinh doanh
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="VD: Xe Sang Duy"
                    className="w-full rounded-lg border border-[#E5E7EB] px-4 py-2 text-[#1F2937] placeholder:text-[#6B7280] focus:border-[#00A86B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="0912345678"
                    className="w-full rounded-lg border border-[#E5E7EB] px-4 py-2 text-[#1F2937] placeholder:text-[#6B7280] focus:border-[#00A86B] focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Địa chỉ kinh doanh
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="VD: 123 Đường Thành Công, Quận 1, TPHCM"
                    className="w-full rounded-lg border border-[#E5E7EB] px-4 py-2 text-[#1F2937] placeholder:text-[#6B7280] focus:border-[#00A86B] focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Mô tả kinh doanh
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Mô tả về kinh doanh cho thuê xe của bạn"
                    rows={4}
                    className="w-full rounded-lg border border-[#E5E7EB] px-4 py-2 text-[#1F2937] placeholder:text-[#6B7280] focus:border-[#00A86B] focus:outline-none"
                  />
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveProfile}
                disabled={loading}
                className="flex items-center justify-center gap-2 w-full bg-[#00A86B] text-white font-semibold py-3 rounded-lg hover:bg-[#008F5A] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Lưu thay đổi
                  </>
                )}
              </button>
            </div>
          )}

          {/* Tab: Xác minh */}
          {activeTab === 'verification' && (
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Trạng thái xác minh</h3>
                
                <div className={`rounded-lg p-4 mb-6 ${
                  formData.verificationStatus === 'verified'
                    ? 'bg-green-50 border border-green-200'
                    : formData.verificationStatus === 'rejected'
                    ? 'bg-red-50 border border-red-200'
                    : 'bg-yellow-50 border border-yellow-200'
                }`}>
                  <div className="flex items-center gap-3">
                    {formData.verificationStatus === 'verified' ? (
                      <Shield size={24} className="text-green-600" />
                    ) : formData.verificationStatus === 'rejected' ? (
                      <Shield size={24} className="text-red-600" />
                    ) : (
                      <Shield size={24} className="text-yellow-600" />
                    )}
                    <div>
                      <p className={`font-semibold ${
                        formData.verificationStatus === 'verified'
                          ? 'text-green-700'
                          : formData.verificationStatus === 'rejected'
                          ? 'text-red-700'
                          : 'text-yellow-700'
                      }`}>
                        {formData.verificationStatus === 'verified'
                          ? '✅ Đã xác minh'
                          : formData.verificationStatus === 'rejected'
                          ? '❌ Bị từ chối'
                          : '⏳ Đang chờ xác minh'}
                      </p>
                      <p className={`text-sm ${
                        formData.verificationStatus === 'verified'
                          ? 'text-green-600'
                          : formData.verificationStatus === 'rejected'
                          ? 'text-red-600'
                          : 'text-yellow-600'
                      }`}>
                        {formData.verificationStatus === 'verified'
                          ? 'Tài khoản của bạn đã được xác minh'
                          : formData.verificationStatus === 'rejected'
                          ? 'Vui lòng cập nhật thông tin và nộp lại'
                          : 'Chúng tôi đang kiểm tra thông tin của bạn'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-[#1F2937] mb-3">Tài liệu xác minh</h4>
                
                {/* Document Upload */}
                <div className="border-2 border-dashed border-[#E5E7EB] rounded-lg p-6 text-center hover:border-[#00A86B] transition cursor-pointer">
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="doc-upload"
                  />
                  <label htmlFor="doc-upload" className="cursor-pointer">
                    <Upload size={32} className="mx-auto text-[#6B7280] mb-3" />
                    <p className="font-semibold text-[#1F2937] mb-1">Tải lên tài liệu</p>
                    <p className="text-sm text-[#6B7280]">CCCD, Hộ chiếu, hoặc Giấy phép kinh doanh</p>
                  </label>
                </div>

                {/* Uploaded Documents */}
                {images.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-[#1F2937] mb-3">Tài liệu đã tải:</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((img, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={img}
                            alt={`Document ${idx}`}
                            className="w-full h-24 object-cover rounded-lg border border-[#E5E7EB]"
                          />
                          <button
                            onClick={() => removeImage(idx)}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab: Cài đặt */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Thống kê hoạt động</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                    <p className="text-sm text-[#6B7280] mb-2">Tỉ lệ phản hồi</p>
                    <p className="text-2xl font-bold text-[#1F2937]">{formData.responseRate}%</p>
                    <p className="text-xs text-[#6B7280] mt-1">✓ Tuyệt vời</p>
                  </div>
                  
                  <div className="p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                    <p className="text-sm text-[#6B7280] mb-2">Đánh giá trung bình</p>
                    <p className="text-2xl font-bold text-[#1F2937]">{formData.rating} ⭐</p>
                    <p className="text-xs text-[#6B7280] mt-1">Từ {formData.totalRatings} đánh giá</p>
                  </div>
                  
                  <div className="p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                    <p className="text-sm text-[#6B7280] mb-2">Thành viên kể từ</p>
                    <p className="text-2xl font-bold text-[#1F2937]">2024</p>
                    <p className="text-xs text-[#6B7280] mt-1">✓ Chủ xe quản lý</p>
                  </div>
                </div>
              </div>

              <hr className="border-[#E5E7EB]" />

              <div>
                <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Cài đặt tài khoản</h3>
                
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 hover:bg-[#F9FAFB] rounded-lg border border-[#E5E7EB] transition">
                    🔔 Quản lý thông báo
                  </button>
                  <button className="w-full text-left px-4 py-3 hover:bg-[#F9FAFB] rounded-lg border border-[#E5E7EB] transition">
                    🔐 Đổi mật khẩu
                  </button>
                  <button className="w-full text-left px-4 py-3 hover:bg-[#F9FAFB] rounded-lg border border-[#E5E7EB] transition">
                    💳 Phương thức thanh toán
                  </button>
                  <button className="w-full text-left px-4 py-3 hover:bg-[#F9FAFB] rounded-lg border border-[#E5E7EB] transition">
                    📜 Chính sách & Điều khoản
                  </button>
                </div>
              </div>

              <hr className="border-[#E5E7EB]" />

              <button className="w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition font-medium">
                🚫 Xóa tài khoản
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
