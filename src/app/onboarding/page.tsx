'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { useAuth } from '@/context/AuthContext'
import { completeUserProfile } from '@/lib/services/userService'
import { ToastContainer } from '@/components/ui/Toast'
import { useToast } from '@/hooks/useToast'
import { Loader } from 'lucide-react'

export default function OnboardingPage() {
  const router = useRouter()
  const { user, profileCompleted, loading: authLoading } = useAuth()
  const { toasts, removeToast, success, error } = useToast()
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    displayName: '',
    phoneNumber: '',
    address: '',
  })

  // Redirect if not authenticated or profile already completed
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/dang-nhap')
      } else if (profileCompleted) {
        router.push('/profile')
      }
    }
  }, [user, profileCompleted, authLoading, router])

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        displayName: user.displayName || '',
      }))
    }
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) return

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

    try {
      setLoading(true)
      setErrorMsg(null)

      await completeUserProfile(user.uid, {
        displayName: formData.displayName,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      })

      // Redirect to profile
      success('Hoàn tất hồ sơ thành công!', 2000)
      setTimeout(() => router.push('/profile'), 2000)
    } catch (err: any) {
      console.error('Error completing profile:', err)
      
      // Handle specific Firebase errors
      if (err?.code === 'permission-denied') {
        setErrorMsg('Lỗi quyền truy cập. Vui lòng kiểm tra Firestore Security Rules. Xem hướng dẫn tại FIRESTORE_RULES_UPDATE.md')
        error('Lỗi quyền truy cập', 5000)
      } else {
        setErrorMsg(err.message || 'Có lỗi xảy ra. Vui lòng thử lại.')
        error(err.message || 'Có lỗi xảy ra. Vui lòng thử lại.', 5000)
      }
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-[#F9FAFB] to-[#F3F4F6]">
        <Header showAuthButtons={false} />
        <ToastContainer toasts={toasts} removeToast={removeToast} />
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

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-[#F9FAFB] to-[#F3F4F6]">
      <Header showAuthButtons={false} />
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-lg border border-[#E5E7EB] shadow-lg p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-[#1F2937]">Hoàn tất hồ sơ</h1>
              <p className="text-[#6B7280]">Để bắt đầu sử dụng VinUrban, vui lòng cung cấp thông tin của bạn</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email (read-only) */}
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email || ''}
                  disabled
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] bg-[#F3F4F6] text-[#6B7280] cursor-not-allowed"
                />
              </div>

              {/* Display Name */}
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-[#1F2937] mb-2">
                  Họ và tên *
                </label>
                <input
                  id="displayName"
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  placeholder="Nhập họ và tên"
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] text-[#1F2937] placeholder-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#00A86B] focus:border-transparent"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-[#1F2937] mb-2">
                  Số điện thoại *
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Nhập số điện thoại"
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] text-[#1F2937] placeholder-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#00A86B] focus:border-transparent"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-[#1F2937] mb-2">
                  Địa chỉ *
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Nhập địa chỉ của bạn"
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] text-[#1F2937] placeholder-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#00A86B] focus:border-transparent"
                  required
                />
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                  {errorMsg}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#00A86B] text-white py-3 rounded-lg font-semibold hover:bg-[#008F5A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && <Loader size={18} className="animate-spin" />}
                {loading ? 'Đang lưu...' : 'Hoàn tất'}
              </button>
            </form>

            {/* Help Text */}
            <p className="text-center text-xs text-[#6B7280]">
              * Các trường bắt buộc phải điền
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
