'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { signInWithGoogle } from '@/lib/services/authService'
import { useAuth } from '@/context/AuthContext'
import { Loader } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { user, profileCompleted, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      // Redirect new users to onboarding, existing users to profile
      if (!profileCompleted) {
        router.push('/onboarding')
      } else {
        router.push('/profile')
      }
    }
  }, [user, profileCompleted, authLoading, router])

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      setError(null)
      await signInWithGoogle()
      
      // Redirect to onboarding (it will handle the redirect based on profile completion)
      // Actually, let's let the useEffect handle this since the context updates
    } catch (err: any) {
      console.error('Login error:', err)
      setError(err.message || 'Lỗi đăng nhập. Vui lòng thử lại.')
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
              <h1 className="text-3xl font-bold text-[#1F2937]">Đăng nhập</h1>
              <p className="text-[#6B7280]">Tham gia VinUrban ngay hôm nay</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                <p className="text-sm text-red-700">❌ {error}</p>
              </div>
            )}

            {/* Benefits */}
            <div className="space-y-3 p-4 bg-[#F9FAFB] rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-xl">🚗</span>
                <div>
                  <p className="font-semibold text-[#1F2937] text-sm">Thuê xe dễ dàng</p>
                  <p className="text-xs text-[#6B7280]">Tìm và thuê xe trong vài phút</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">💰</span>
                <div>
                  <p className="font-semibold text-[#1F2937] text-sm">Giá tốt nhất</p>
                  <p className="text-xs text-[#6B7280]">So sánh giá từ nhiều chủ xe</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">🛡️</span>
                <div>
                  <p className="font-semibold text-[#1F2937] text-sm">Chuyên nghiệp</p>
                  <p className="text-xs text-[#6B7280]">Xe kiểm tra kỹ, có bảo hiểm</p>
                </div>
              </div>
            </div>

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-[#E5E7EB] rounded-lg px-6 py-3 font-semibold text-[#1F2937] hover:bg-[#F9FAFB] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Đang đăng nhập...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Đăng nhập với Google
                </>
              )}
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-[#6B7280]">
              Chưa có tài khoản?{' '}
              <button
                onClick={() => router.push('/dang-ky')}
                className="font-semibold text-[#00A86B] hover:text-[#008F5A] transition"
              >
                Đăng ký ngay
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
            <p className="text-xs text-[#6B7280]">Không bao giờ chia sẻ mật khẩu của bạn</p>
          </div>
        </div>
      </div>
    </div>
  )
}
