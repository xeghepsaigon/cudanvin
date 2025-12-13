'use client'

import React, { useState, useCallback } from 'react'
import { Vehicle } from '@/lib/types/vehicle'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

interface BookingFormProps {
  vehicle: Vehicle
  onSubmit: (data: any) => void
}

const BookingForm: React.FC<BookingFormProps> = ({ vehicle, onSubmit }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    deliveryType: 'pickup' as 'delivery' | 'pickup',
    deliveryLocation: '',
    fullName: '',
    phone: '',
    email: '',
    address: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleDeliveryTypeChange = useCallback((type: 'delivery' | 'pickup') => {
    console.log('Changing delivery type to:', type)
    setFormData(prev => {
      const updated = { ...prev, deliveryType: type, deliveryLocation: '' }
      console.log('Updated formData:', updated)
      return updated
    })
  }, [])

  const handleNextStep = () => {
    if (step < 4) setStep((step + 1) as 1 | 2 | 3 | 4)
  }

  const handlePreviousStep = () => {
    if (step > 1) setStep((step - 1) as 1 | 2 | 3 | 4)
  }

  const handleSubmit = () => {
    onSubmit(formData)
  }

  // Calculate days
  const startDate = formData.startDate ? new Date(formData.startDate) : null
  const endDate = formData.endDate ? new Date(formData.endDate) : null
  const days = startDate && endDate ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) : 0
  const totalPrice = days > 0 ? days * vehicle.pricePerDay : 0

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                s <= step
                  ? 'bg-[#00A86B] text-white'
                  : 'bg-[#E5E7EB] text-[#6B7280]'
              }`}
            >
              {s}
            </div>
            {s < 4 && (
              <div
                className={`h-1 flex-1 mx-2 transition-colors ${
                  s < step ? 'bg-[#00A86B]' : 'bg-[#E5E7EB]'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form content */}
      <div className="bg-white rounded-lg p-6 md:p-8">
        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold text-[#1F2937] mb-4">Chọn ngày thuê</h2>
            <div className="space-y-4">
              <Input
                label="Ngày bắt đầu"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
              />
              <Input
                label="Ngày kết thúc"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
              />
              {days > 0 && (
                <div className="bg-[#F9FAFB] p-4 rounded-lg">
                  <p className="text-[#6B7280] text-sm mb-1">Tổng tiền</p>
                  <p className="text-2xl font-bold text-[#00A86B]">
                    {(totalPrice / 1000).toFixed(0)}K VND
                  </p>
                  <p className="text-[#6B7280] text-sm mt-1">{days} ngày</p>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-base font-medium text-[#1F2937] mb-4">Vị trí giao nhận xe</h2>
            <div className="space-y-3">
              {/* Option 1: Pickup */}
              <button
                type="button"
                onClick={() => handleDeliveryTypeChange('pickup')}
                className="w-full text-left rounded-lg border-2 p-4 transition-all"
                style={{
                  borderColor: formData.deliveryType === 'pickup' ? '#00A86B' : '#E5E7EB',
                  backgroundColor: formData.deliveryType === 'pickup' ? '#F0FAF6' : '#FFFFFF'
                }}>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-4 w-4 rounded-full border-2 flex-shrink-0"
                    style={{
                      borderColor: formData.deliveryType === 'pickup' ? '#00A86B' : '#E5E7EB',
                      backgroundColor: formData.deliveryType === 'pickup' ? '#00A86B' : 'transparent'
                    }}>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#6B7280]">Tôi tự đến lấy xe</p>
                    <p className="text-base font-semibold text-[#1F2937] mt-1 break-words">
                      {vehicle.location || 'Địa chỉ chủ xe'}
                    </p>
                  </div>
                </div>
              </button>

              {/* Option 2: Delivery */}
              <button
                type="button"
                onClick={() => handleDeliveryTypeChange('delivery')}
                className="w-full text-left rounded-lg border-2 p-4 transition-all"
                style={{
                  borderColor: formData.deliveryType === 'delivery' ? '#00A86B' : '#E5E7EB',
                  backgroundColor: formData.deliveryType === 'delivery' ? '#F0FAF6' : '#FFFFFF'
                }}>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-4 w-4 rounded-full border-2 flex-shrink-0"
                    style={{
                      borderColor: formData.deliveryType === 'delivery' ? '#00A86B' : '#E5E7EB',
                      backgroundColor: formData.deliveryType === 'delivery' ? '#00A86B' : 'transparent'
                    }}>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#6B7280]">Tôi muốn được giao xe tại nơi</p>
                    <p className="text-base font-semibold text-[#1F2937] mt-1">TP. Hồ Chí Minh</p>
                    <p className="text-lg font-semibold text-[#1F2937] mt-2">225.000đ</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Input address if delivery selected */}
            <div className="mt-6">
              <div style={{ opacity: formData.deliveryType === 'delivery' ? 1 : 0.3 }}>
                <Input
                  label="Nhập địa chỉ giao xe"
                  name="deliveryLocation"
                  placeholder="Quận, Phường hoặc địa chỉ cụ thể"
                  value={formData.deliveryLocation}
                  onChange={handleInputChange}
                  disabled={formData.deliveryType !== 'delivery'}
                />
              </div>
              <p style={{ marginTop: '8px', fontSize: '12px', color: '#6B7280' }}>
                deliveryType: {formData.deliveryType}
              </p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold text-[#1F2937] mb-4">Thông tin khách</h2>
            <div className="space-y-4">
              <Input
                label="Họ và tên"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
              />
              <Input
                label="Số điện thoại"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <Input
                label="Địa chỉ"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-xl font-semibold text-[#1F2937] mb-4">Xác nhận đơn đặt</h2>
            <div className="space-y-4">
              <div className="border border-[#E5E7EB] rounded-lg p-4">
                <p className="text-[#6B7280] text-sm mb-2">Xe</p>
                <p className="font-semibold text-[#1F2937]">{vehicle.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-[#E5E7EB] rounded-lg p-4">
                  <p className="text-[#6B7280] text-sm mb-2">Từ ngày</p>
                  <p className="font-semibold text-[#1F2937]">{formData.startDate}</p>
                </div>
                <div className="border border-[#E5E7EB] rounded-lg p-4">
                  <p className="text-[#6B7280] text-sm mb-2">Đến ngày</p>
                  <p className="font-semibold text-[#1F2937]">{formData.endDate}</p>
                </div>
              </div>
              <div className="border border-[#E5E7EB] rounded-lg p-4">
                <p className="text-[#6B7280] text-sm mb-2">Vị trí giao nhận</p>
                <p className="font-semibold text-[#1F2937]">
                  {formData.deliveryType === 'pickup' ? 'Tới lấy xe' : 'Giao tận nơi'}
                </p>
                {formData.deliveryType === 'delivery' && formData.deliveryLocation && (
                  <p className="text-[#6B7280] text-sm mt-1">{formData.deliveryLocation}</p>
                )}
              </div>
              <div className="border border-[#E5E7EB] rounded-lg p-4">
                <p className="text-[#6B7280] text-sm mb-2">Khách hàng</p>
                <p className="font-semibold text-[#1F2937]">{formData.fullName}</p>
                <p className="text-[#6B7280] text-sm">{formData.phone}</p>
              </div>
              <div className="bg-[#F9FAFB] p-4 rounded-lg">
                <p className="text-[#6B7280] text-sm mb-1">Tổng tiền</p>
                <p className="text-2xl font-bold text-[#00A86B]">
                  {(totalPrice / 1000).toFixed(0)}K VND
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <Button variant="outline" onClick={handlePreviousStep}>
              Quay lại
            </Button>
          )}
          {step < 4 ? (
            <Button className="flex-1" onClick={handleNextStep}>
              Tiếp theo
            </Button>
          ) : (
            <Button className="flex-1" onClick={handleSubmit}>
              Xác nhận đặt xe
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookingForm
