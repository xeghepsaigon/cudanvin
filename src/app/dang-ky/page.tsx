'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { signInWithGoogle } from '@/lib/services/authService'
import { useAuth } from '@/context/AuthContext'
import { Loader, Eye, EyeOff } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    agreeToTerms: false,
  })

  // Redirect if already logged in
  if (user) {
    router.push('/profile')
  }

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true)
      setError(null)
      await signInWithGoogle()
      router.push('/profile')
    } catch (err: any) {
      console.error('Signup error:', err)
      setError(err.message || 'Lỗi đăng ký. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (!formData.email || !formData.password || !formData.fullName) {
      setError('Vui lòng điền đầy đủ các trường.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu không khớp.')
      return
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.')
      return
    }

    if (!formData.agreeToTerms) {
      setError('Vui lòng đồng ý với điều khoản và chính sách.')
      return
    }

    try {
      setLoading(true)
      // TODO: Implement email/password signup with Firebase createUserWithEmailAndPassword
      setError('Tính năng đăng ký email sẽ sớm có. Vui lòng dùng Google Sign-Up.')
    } catch (err: any) {
      console.error('Signup error:', err)
      setError(err.message || 'Lỗi đăng ký. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-[#F9FAFB] to-[#F3F4F6]">
      <Header showAuthButtons={false} />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-lg border border-[#E5E7EB] shadow-lg p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-[#1F2937]">Đăng ký</h1>
              <p className="text-[#6B7280]">Bắt đầu hành trình của bạn với VinUrban</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                <p className="text-sm text-red-700">❌ {error}</p>
              </div>
            )}

            {/* Google Sign Up Button */}
            <button
              onClick={handleGoogleSignUp}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-[#E5E7EB] rounded-lg px-6 py-3 font-semibold text-[#1F2937] hover:bg-[#F9FAFB] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Đang xử lý...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Đăng ký với Google
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E7EB]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[#6B7280]">hoặc</span>
              </div>
            </div>

            {/* Email Signup Form */}
            <form onSubmit={handleEmailSignUp} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-2">
                  Họ và tên
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleFormChange}
                  placeholder="Nguyễn Văn A"
                  disabled
                  className="w-full rounded-lg border border-[#E5E7EB] px-4 py-2 text-sm text-[#1F2937] placeholder:text-[#6B7280] disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="you@example.com"
                  disabled
                  className="w-full rounded-lg border border-[#E5E7EB] px-4 py-2 text-sm text-[#1F2937] placeholder:text-[#6B7280] disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF]"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-2">
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    placeholder="••••••••"
                    disabled
                    className="w-full rounded-lg border border-[#E5E7EB] px-4 py-2 text-sm text-[#1F2937] placeholder:text-[#6B7280] disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] disabled:opacity-50"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-2">
                  Xác nhận mật khẩu
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleFormChange}
                  placeholder="••••••••"
                  disabled
                  className="w-full rounded-lg border border-[#E5E7EB] px-4 py-2 text-sm text-[#1F2937] placeholder:text-[#6B7280] disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF]"
                />
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleFormChange}
                  disabled
                  className="mt-1 rounded border-[#E5E7EB] disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <span className="text-sm text-[#6B7280]">
                  Tôi đồng ý với{' '}
                  <button type="button" className="font-semibold text-[#00A86B] hover:text-[#008F5A]">
                    Điều khoản sử dụng
                  </button>
                  {' '}và{' '}
                  <button type="button" className="font-semibold text-[#00A86B] hover:text-[#008F5A]">
                    Chính sách bảo mật
                  </button>
                </span>
              </label>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled
                className="w-full rounded-lg bg-[#00A86B] py-3 text-sm font-semibold text-white hover:bg-[#008F5A] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Đăng ký bằng Email
              </button>
            </form>

            {/* Coming Soon Notice */}
            <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
              <p className="text-xs text-blue-700">ℹ️ Email signup sẽ sớm có. Hiện tại vui lòng dùng Google Sign-Up.</p>
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-[#6B7280]">
              Đã có tài khoản?{' '}
              <button
                onClick={() => router.push('/dang-nhap')}
                className="font-semibold text-[#00A86B] hover:text-[#008F5A] transition"
              >
                Đăng nhập
              </button>
            </p>

            {/* Back to Home */}
            <button
              onClick={() => router.push('/')}
              className="w-full text-center text-sm text-[#6B7280] hover:text-[#1F2937] transition py-2"
            >
              ← Quay lại trang chủ
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 text-center space-y-2">
            <p className="text-xs text-[#6B7280]">🔒 Thông tin của bạn được bảo vệ bởi Firebase</p>
            <p className="text-xs text-[#6B7280]">Không bao giờ chia sẻ dữ liệu cá nhân của bạn</p>
          </div>
        </div>
      </div>
    </div>
  )
}
