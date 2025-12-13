'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { BookingSidebar } from '@/components/booking/BookingSidebar';
import { FEATURED_VEHICLES } from '@/lib/constants/vehicles';

type BookingStep = 'date' | 'info' | 'confirm';

interface BookingData {
  startDate: string;
  endDate: string;
  customerName: string;
  customerPhone: string;
  notes: string;
}

function BookingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const vehicleSlug = searchParams.get('vehicle');
  const vehicle = FEATURED_VEHICLES.find((v) => v.slug === vehicleSlug);

  const [step, setStep] = useState<BookingStep>('date');
  const [bookingData, setBookingData] = useState<BookingData>({
    startDate: '',
    endDate: '',
    customerName: '',
    customerPhone: '',
    notes: '',
  });

  if (!vehicle) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-white">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm leading-5 text-[#6B7280]">Xe không tồn tại</p>
          </div>
        </div>
      </div>
    );
  }

  const calculateDays = () => {
    if (!bookingData.startDate || !bookingData.endDate) return 0;
    const start = new Date(bookingData.startDate);
    const end = new Date(bookingData.endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const days = calculateDays();
  const totalPrice = days * vehicle.pricePerDay;

  const handleDateSubmit = () => {
    if (bookingData.startDate && bookingData.endDate) {
      setStep('info');
    }
  };

  const handleInfoSubmit = () => {
    if (bookingData.customerName && bookingData.customerPhone) {
      setStep('confirm');
    }
  };

  const handleConfirm = () => {
    alert('Yêu cầu thuê đã được gửi! Admin sẽ liên hệ xác nhận.');
    router.push('/');
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <Header />

      <div className="flex-1">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Progress Indicator */}
              <div className="mb-6 flex items-center justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm leading-5 font-semibold ${
                    step === 'date' || step === 'info' || step === 'confirm'
                      ? 'bg-[#00A86B] text-white'
                      : 'bg-[#F9FAFB] text-[#6B7280]'
                  }`}
                >
                  1
                </div>
                <div
                  className={`flex-1 h-1 ${
                    step === 'info' || step === 'confirm' ? 'bg-[#00A86B]' : 'bg-[#F9FAFB]'
                  }`}
                />
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm leading-5 font-semibold ${
                    step === 'info' || step === 'confirm'
                      ? 'bg-[#00A86B] text-white'
                      : 'bg-[#F9FAFB] text-[#6B7280]'
                  }`}
                >
                  2
                </div>
                <div
                  className={`flex-1 h-1 ${step === 'confirm' ? 'bg-[#00A86B]' : 'bg-[#F9FAFB]'}`}
                />
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm leading-5 font-semibold ${
                    step === 'confirm' ? 'bg-[#00A86B] text-white' : 'bg-[#F9FAFB] text-[#6B7280]'
                  }`}
                >
                  3
                </div>
              </div>

              {/* Vehicle Card */}
              <div className="mb-6 rounded-lg border border-[#E5E7EB] p-4">
                <div className="flex gap-4">
                  <img
                    src={vehicle.images[0]}
                    alt={vehicle.name}
                    className="h-24 w-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm leading-5 font-semibold text-[#1F2937]">{vehicle.name}</h3>
                    <p className="text-xs leading-4 text-[#6B7280]">
                      {(vehicle.pricePerDay / 1000).toLocaleString('vi-VN')}K/ngay
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 1: Select Date */}
              {step === 'date' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold leading-7 text-[#1F2937]">Chọn ngày thuê</h2>

                  <div>
                    <label className="block text-sm leading-5 font-medium text-[#1F2937] mb-2">
                      Ngày nhận
                    </label>
                    <input
                      type="date"
                      value={bookingData.startDate}
                      onChange={(e) => setBookingData((prev) => ({ ...prev, startDate: e.target.value }))}
                      className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm leading-5 text-[#1F2937]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm leading-5 font-medium text-[#1F2937] mb-2">
                      Ngày trả
                    </label>
                    <input
                      type="date"
                      value={bookingData.endDate}
                      onChange={(e) => setBookingData((prev) => ({ ...prev, endDate: e.target.value }))}
                      className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm leading-5 text-[#1F2937]"
                    />
                  </div>

                  <button
                    onClick={handleDateSubmit}
                    disabled={!bookingData.startDate || !bookingData.endDate}
                    className="w-full rounded-lg bg-[#00A86B] py-3 text-sm leading-5 font-semibold text-white hover:bg-[#008F5A] disabled:opacity-50"
                  >
                    Tiep tuc
                  </button>
                </div>
              )}

              {/* Step 2: Customer Info */}
              {step === 'info' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold leading-7 text-[#1F2937]">Thông tin khách hàng</h2>

                  <div>
                    <label className="block text-sm leading-5 font-medium text-[#1F2937] mb-2">Họ tên</label>
                    <input
                      type="text"
                      value={bookingData.customerName}
                      onChange={(e) =>
                        setBookingData((prev) => ({ ...prev, customerName: e.target.value }))
                      }
                      placeholder="Nhập họ tên"
                      className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm leading-5 text-[#1F2937] placeholder:text-[#6B7280]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm leading-5 font-medium text-[#1F2937] mb-2">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      value={bookingData.customerPhone}
                      onChange={(e) =>
                        setBookingData((prev) => ({ ...prev, customerPhone: e.target.value }))
                      }
                      placeholder="Nhập số điện thoại"
                      className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm leading-5 text-[#1F2937] placeholder:text-[#6B7280]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm leading-5 font-medium text-[#1F2937] mb-2">
                      Ghi chú (tuự chọn)
                    </label>
                    <textarea
                      value={bookingData.notes}
                      onChange={(e) => setBookingData((prev) => ({ ...prev, notes: e.target.value }))}
                      placeholder="Ghi chú thêm nếu cần..."
                      className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm leading-5 text-[#1F2937] placeholder:text-[#6B7280]"
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep('date')}
                      className="flex-1 rounded-lg border border-[#E5E7EB] py-3 text-sm leading-5 font-semibold text-[#1F2937] hover:bg-[#F9FAFB]"
                    >
                      Quay lại
                    </button>
                    <button
                      onClick={handleInfoSubmit}
                      disabled={!bookingData.customerName || !bookingData.customerPhone}
                      className="flex-1 rounded-lg bg-[#00A86B] py-3 text-sm leading-5 font-semibold text-white hover:bg-[#008F5A] disabled:opacity-50"
                    >
                      Tiep tuc
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {step === 'confirm' && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="mb-4 text-6xl">PASS</div>
                    <h2 className="text-xl font-semibold leading-7 text-[#1F2937] mb-2">
                      Yeu cau thue da duoc xac nhan
                    </h2>
                    <p className="text-sm leading-5 text-[#6B7280] mb-6">
                      Admin se lien he ban qua{' '}
                      <span className="font-semibold">{bookingData.customerPhone}</span> de xac nhan
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => router.push('/')}
                      className="flex-1 rounded-lg border border-[#E5E7EB] py-3 text-sm leading-5 font-semibold text-[#1F2937] hover:bg-[#F9FAFB]"
                    >
                      Ve trang chu
                    </button>
                    <button
                      onClick={handleConfirm}
                      className="flex-1 rounded-lg bg-[#00A86B] py-3 text-sm leading-5 font-semibold text-white hover:bg-[#008F5A]"
                    >
                      Xác nhận
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <BookingSidebar 
              vehicle={vehicle} 
              bookingData={bookingData} 
              days={days} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingPageContent />
    </Suspense>
  );
}
