'use client';

import { useState } from 'react';

interface RangeCalendarProps {
  onDatesChange: (startDate: string, endDate: string, pickupTime?: string, returnTime?: string) => void;
  initialStartDate?: string;
  initialEndDate?: string;
  initialPickupTime?: string;
  initialReturnTime?: string;
  onClose?: () => void;
  pricePerDay?: number;
}

// Helper function to generate time options (30-minute intervals)
function generateTimeOptions() {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeStr = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      options.push(timeStr);
    }
  }
  return options;
}

// Helper function to generate calendar days
function getDaysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function getFirstDayOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

function RangeCalendarMonth({ 
  date, 
  tempStart,
  tempEnd,
  onClickDate,
  pricePerDay
}: { 
  date: Date;
  tempStart: string;
  tempEnd: string;
  onClickDate: (dateStr: string) => void;
  pricePerDay?: number;
}) {
  const daysInMonth = getDaysInMonth(date);
  const firstDay = getFirstDayOfMonth(date);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthName = date.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' });

  const isStartDate = (day: number) => {
    if (!tempStart) return false;
    const [dDay, dMonth, dYear] = tempStart.split('/');
    return (
      dDay === String(day).padStart(2, '0') &&
      dMonth === String(date.getMonth() + 1).padStart(2, '0') &&
      dYear === String(date.getFullYear())
    );
  };

  const isEndDate = (day: number) => {
    if (!tempEnd) return false;
    const [dDay, dMonth, dYear] = tempEnd.split('/');
    return (
      dDay === String(day).padStart(2, '0') &&
      dMonth === String(date.getMonth() + 1).padStart(2, '0') &&
      dYear === String(date.getFullYear())
    );
  };

  const isInRange = (day: number) => {
    if (!tempStart || !tempEnd) return false;
    
    const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
    const [sDay, sMonth, sYear] = tempStart.split('/');
    const [eDay, eMonth, eYear] = tempEnd.split('/');
    
    const start = new Date(parseInt(sYear), parseInt(sMonth) - 1, parseInt(sDay));
    const end = new Date(parseInt(eYear), parseInt(eMonth) - 1, parseInt(eDay));
    
    // Đảm bảo start <= end
    const [minDate, maxDate] = start <= end ? [start, end] : [end, start];
    
    return currentDate > minDate && currentDate < maxDate;
  };

  const isDragRange = (day: number) => {
    return false;
  };

  return (
    <div className="p-5">
      <h4 className="text-sm font-semibold text-[#1F2937] mb-5 text-center">{monthName}</h4>
      <div className="grid grid-cols-7 gap-1.5">
        {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day) => (
          <div key={day} className="text-xs text-center font-semibold text-[#6B7280] py-2">
            {day}
          </div>
        ))}
        {days.map((day, idx) => (
          <button
            key={idx}
            onMouseDown={() => {
              // Drag removed
            }}
            onMouseEnter={() => {
              // Drag removed
            }}
            onMouseUp={() => {
              // Drag removed
            }}
            onClick={() => {
              if (day) {
                const d = String(day).padStart(2, '0');
                const m = String(date.getMonth() + 1).padStart(2, '0');
                const y = date.getFullYear();
                const dateStr = `${d}/${m}/${y}`;
                const currentDate = new Date(y, parseInt(m) - 1, parseInt(d));
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                if (currentDate >= today) {
                  onClickDate(dateStr);
                }
              }
            }}
            disabled={!day || (day !== null && day !== undefined && new Date(date.getFullYear(), date.getMonth(), day) < new Date(new Date().setHours(0, 0, 0, 0)))}
            className={`py-3 px-1 text-sm font-medium rounded transition-colors cursor-pointer select-none flex flex-col items-center justify-center h-16 ${
              !day
                ? 'text-[#E5E7EB]'
                : day !== null && day !== undefined && new Date(date.getFullYear(), date.getMonth(), day) < new Date(new Date().setHours(0, 0, 0, 0))
                ? 'text-[#E5E7EB] cursor-not-allowed'
                : isStartDate(day!) || isEndDate(day!)
                ? 'bg-[#00A86B] text-white'
                : isDragRange(day!)
                ? 'bg-[#FFE5D6] text-[#1F2937]'
                : isInRange(day!)
                ? 'bg-[#E0F2F1] text-[#1F2937]'
                : 'text-[#1F2937] hover:bg-[#F9FAFB]'
            }`}
          >
            <div className="font-semibold text-base">{day}</div>
            {day && pricePerDay && (
              <div className="text-xs mt-0.5">
                {Math.round(pricePerDay / 1000)}K
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export function RangeCalendar({ 
  onDatesChange, 
  initialStartDate = '', 
  initialEndDate = '',
  initialPickupTime = '08:00',
  initialReturnTime = '17:00',
  onClose,
  pricePerDay
}: RangeCalendarProps) {
  const [tempStartDate, setTempStartDate] = useState(initialStartDate);
  const [tempEndDate, setTempEndDate] = useState(initialEndDate);
  const [tempPickupTime, setTempPickupTime] = useState(initialPickupTime);
  const [tempReturnTime, setTempReturnTime] = useState(initialReturnTime);
  const [startMonth, setStartMonth] = useState(new Date());

  const handleClickDate = (dateStr: string) => {
    console.log('🖱️ Click date:', dateStr, 'Start:', tempStartDate, 'End:', tempEndDate);
    
    const [day, month, year] = dateStr.split('/');
    const clickedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Ignore past dates
    if (clickedDate < today) {
      console.log('❌ Past date, ignoring');
      return;
    }

    // Lần 1: Chưa có startDate → set startDate
    if (!tempStartDate) {
      console.log('✅ Setting startDate:', dateStr);
      setTempStartDate(dateStr);
      setTempEndDate('');
      return;
    }

    // Lần 2: Có startDate nhưng chưa có endDate
    if (!tempEndDate) {
      // Nếu click lại startDate → reset
      if (dateStr === tempStartDate) {
        setTempStartDate('');
        setTempEndDate('');
        return;
      }

      const [sDay, sMonth, sYear] = tempStartDate.split('/');
      const startDate = new Date(parseInt(sYear), parseInt(sMonth) - 1, parseInt(sDay));

      // Ngày 2 >= startDate → set endDate
      if (clickedDate >= startDate) {
        setTempEndDate(dateStr);
        return;
      }

      // Ngày 2 < startDate → đảo chiều (ngày 2 thành start, ngày cũ thành end)
      setTempStartDate(dateStr);
      setTempEndDate(tempStartDate);
      return;
    }

    // Lần 3+: Đã có cả startDate + endDate → Reset & chọn lại
    setTempStartDate(dateStr);
    setTempEndDate('');
  };

  const handleApplyDates = () => {
    if (tempStartDate && tempEndDate) {
      onDatesChange(tempStartDate, tempEndDate, tempPickupTime, tempReturnTime);
      onClose?.();
    }
  };

  const handleCancel = () => {
    setTempStartDate(initialStartDate);
    setTempEndDate(initialEndDate);
    setTempPickupTime(initialPickupTime);
    setTempReturnTime(initialReturnTime);
    onClose?.();
  };

  const calculateDays = () => {
    if (!tempStartDate || !tempEndDate) return 0;
    const [sDay, sMonth, sYear] = tempStartDate.split('/');
    const [eDay, eMonth, eYear] = tempEndDate.split('/');
    const start = new Date(parseInt(sYear), parseInt(sMonth) - 1, parseInt(sDay));
    const end = new Date(parseInt(eYear), parseInt(eMonth) - 1, parseInt(eDay));
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const goToPreviousMonth = () => {
    setStartMonth(new Date(startMonth.getFullYear(), startMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setStartMonth(new Date(startMonth.getFullYear(), startMonth.getMonth() + 1));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-0 md:p-4">
      <div className="bg-white rounded-none md:rounded-lg w-full h-full md:h-auto max-h-[100vh] md:max-h-[90vh] max-w-4xl shadow-xl overflow-y-auto md:overflow-y-auto">
        <div className="border-b border-[#E5E7EB] p-4 flex justify-between items-center">
          <button
            onClick={goToPreviousMonth}
            className="px-3 py-2 text-[#1F2937] hover:bg-[#F3F4F6] rounded-lg transition-colors"
          >
            ← Tháng trước
          </button>
          <h3 className="text-base font-semibold text-[#1F2937]">Chọn ngày thuê (Nhận - Trả)</h3>
          <button
            onClick={goToNextMonth}
            className="px-3 py-2 text-[#1F2937] hover:bg-[#F3F4F6] rounded-lg transition-colors"
          >
            Tháng sau →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <RangeCalendarMonth
            date={startMonth}
            tempStart={tempStartDate}
            tempEnd={tempEndDate}
            onClickDate={handleClickDate}
            pricePerDay={pricePerDay}
          />
          <RangeCalendarMonth
            date={new Date(startMonth.getFullYear(), startMonth.getMonth() + 1)}
            tempStart={tempStartDate}
            tempEnd={tempEndDate}
            onClickDate={handleClickDate}
            pricePerDay={pricePerDay}
          />
        </div>
        <div className="border-t border-[#E5E7EB] p-4 space-y-4">
          {/* Selection Summary */}
          <div className="bg-[#F0F9FF] border border-[#00A86B] rounded-lg p-4">
            {tempStartDate && tempEndDate ? (
              <div className="space-y-3">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-6">
                  <div>
                    <p className="text-xs font-semibold text-[#6B7280] mb-1">NHẬN XE</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-lg font-bold text-[#1F2937]">{tempStartDate}</p>
                      <p className="text-sm font-semibold text-[#00A86B]">{tempPickupTime}</p>
                    </div>
                  </div>
                  <div className="text-[#6B7280] hidden md:block">→</div>
                  <div>
                    <p className="text-xs font-semibold text-[#6B7280] mb-1">TRẢ XE</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-lg font-bold text-[#1F2937]">{tempEndDate}</p>
                      <p className="text-sm font-semibold text-[#00A86B]">{tempReturnTime}</p>
                    </div>
                  </div>
                  <div className="text-right md:text-right">
                    <p className="text-2xl md:text-3xl font-bold text-[#00A86B]">{calculateDays()} ngày</p>
                    <p className="text-xs text-[#6B7280]">({calculateDays()} đêm)</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-[#6B7280]">
                {tempStartDate 
                  ? `Chọn ngày kết thúc` 
                  : 'Chọn ngày bắt đầu'}
              </p>
            )}
          </div>

          {/* Time Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Giờ nhận xe
              </label>
              <select
                value={tempPickupTime}
                onChange={(e) => setTempPickupTime(e.target.value)}
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
              >
                {generateTimeOptions().map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Giờ trả xe
              </label>
              <select
                value={tempReturnTime}
                onChange={(e) => setTempReturnTime(e.target.value)}
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
              >
                {generateTimeOptions().map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row justify-end gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded-lg border border-[#E5E7EB] text-[#1F2937] hover:bg-[#F9FAFB] w-full md:w-auto"
            >
              Hủy
            </button>
            <button
              onClick={handleApplyDates}
              disabled={!tempStartDate || !tempEndDate}
              className={`px-4 py-2 rounded-lg text-white font-medium transition-colors w-full md:w-auto ${
                tempStartDate && tempEndDate
                  ? 'bg-[#00A86B] hover:bg-[#008F5A]'
                  : 'bg-[#D1D5DB] cursor-not-allowed'
              }`}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
