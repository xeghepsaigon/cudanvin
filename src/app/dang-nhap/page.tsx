'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';

type AuthMode = 'phone' | 'otp';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleSendOTP = () => {
    if (phone.length >= 10) {
      setMode('otp');
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      alert('Đăng nhập thành công!');
      router.push('/');
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <Header showAuthButtons={false} />

      <div className="flex-1 flex items-center justify-center px-4 md:px-8">
        <div className="w-full max-w-sm rounded-lg border border-[#E5E7EB] bg-white p-6 shadow-sm">
          <h1 className="text-xl font-semibold leading-7 text-[#1F2937] mb-2">Đăng nhập / Đăng ký</h1>
          <p className="text-sm leading-5 text-[#6B7280] mb-6">
            Sử dụng số điện thoại hoặc email để tiếp tục
          </p>

          {mode === 'phone' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm leading-5 font-medium text-[#1F2937] mb-2">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0912345678"
                  className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm leading-5 text-[#1F2937] placeholder:text-[#6B7280]"
                />
              </div>

              <button
                onClick={handleSendOTP}
                disabled={phone.length < 10}
                className="w-full rounded-lg bg-[#00A86B] py-3 text-sm leading-5 font-semibold text-white hover:bg-[#008F5A] disabled:opacity-50"
              >
                Gửi mã OTP
              </button>

              <div className="text-center text-xs leading-4 text-[#6B7280]">
                Hoặc{' '}
                <button className="font-semibold text-[#00A86B] hover:text-[#008F5A]">
                  đăng nhập bằng email
                </button>
              </div>
            </div>
          )}

          {mode === 'otp' && (
            <div className="space-y-4">
              <p className="text-sm leading-5 text-[#6B7280]">
                Mã OTP đã được gửi đến <span className="font-semibold">{phone}</span>
              </p>

              <div>
                <label className="block text-sm leading-5 font-medium text-[#1F2937] mb-2">
                  Nhập mã OTP (6 chữ số)
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm leading-5 text-[#1F2937] text-center tracking-widest placeholder:text-[#6B7280]"
                />
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6}
                className="w-full rounded-lg bg-[#00A86B] py-3 text-sm leading-5 font-semibold text-white hover:bg-[#008F5A] disabled:opacity-50"
              >
                Xác nhận
              </button>

              <button
                onClick={() => {
                  setMode('phone');
                  setPhone('');
                  setOtp('');
                }}
                className="w-full text-xs leading-4 font-medium text-[#00A86B] hover:text-[#008F5A]"
              >
                ← Quay lại
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
