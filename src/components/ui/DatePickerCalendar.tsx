'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerCalendarProps {
  onDateSelect: (date: Date) => void;
  minDate?: Date;
}

export function DatePickerCalendar({ onDateSelect, minDate }: DatePickerCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Use minDate if provided, otherwise use today
  const minimumDate = minDate || today;

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    // Don't allow going before minimum date
    if (newDate >= minimumDate) {
      setCurrentDate(newDate);
    }
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    // Only allow dates >= minimum date
    if (selectedDate >= minimumDate) {
      onDateSelect(selectedDate);
    }
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  // Empty cells for days before the 1st
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthName = currentDate.toLocaleString('vi-VN', { month: 'long', year: 'numeric' });
  const isMinDate = minDate && currentDate.getMonth() === minDate.getMonth() && currentDate.getFullYear() === minDate.getFullYear();

  return (
    <div className="w-full max-w-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <button
          onClick={previousMonth}
          className="p-2 hover:bg-[#F0F0F0] rounded-lg transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={20} className="text-[#00A86B]" />
        </button>
        <h3 className="text-base font-semibold text-[#1F2937] text-center flex-1 capitalize">
          {monthName}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-[#F0F0F0] rounded-lg transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={20} className="text-[#00A86B]" />
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-1 mb-3 px-2">
        {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-[#6B7280] py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1 px-2">
        {days.map((day, index) => {
          const isDisabled = day ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day) < minimumDate : true;
          
          return (
            <button
              key={index}
              onClick={() => day && handleDateClick(day)}
              disabled={isDisabled}
              className={`
                p-2 rounded-lg text-sm font-medium transition-all
                ${!day ? 'invisible' : ''}
                ${isDisabled
                  ? 'text-[#D1D5DB] cursor-not-allowed'
                  : 'hover:bg-[#E5F5F0] cursor-pointer text-[#1F2937] hover:text-[#00A86B] hover:font-semibold'
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DatePickerCalendar;
