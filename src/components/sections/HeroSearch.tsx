'use client';

import { useState } from 'react';
import { MapPin, Calendar, Search } from 'lucide-react';
import { DEFAULT_CITY } from '@/lib/constants/cities';
import Modal from '@/components/ui/Modal';
import DatePickerCalendar from '@/components/ui/DatePickerCalendar';

interface HeroSearchProps {
  onSearch?: (startDate: string, endDate: string) => void;
}

export function HeroSearch({ onSearch }: HeroSearchProps) {
  const [location, setLocation] = useState('Vinhomes Grand Park');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);
  const [showEndDateCalendar, setShowEndDateCalendar] = useState(false);

  const handleSearch = () => {
    if (startDate && endDate) {
      onSearch?.(startDate, endDate);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'dd/mm/yyyy';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleStartDateSelect = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    setStartDate(dateStr);
    setShowStartDateCalendar(false);
    // Automatically open end date calendar
    setShowEndDateCalendar(true);
  };

  const handleEndDateSelect = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    setEndDate(dateStr);
    setShowEndDateCalendar(false);
  };

  return (
    <div className="relative w-full bg-gradient-to-br from-primary-600 to-primary-700 py-12 md:py-16 bg-cover bg-center" style={{backgroundImage: 'url(https://www.mioto.vn/static/media/banner.951720e8.png)'}}>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative mx-auto max-w-7xl px-4 md:px-8 space-y-4">
        <h2 className="text-3xl font-semibold leading-9 text-white">Thuê xe tự lái</h2>
        <p className="text-base leading-6 text-white/80">Giải pháp di chuyển linh hoạt tại TP. Hồ Chí Minh</p>

        {/* Search Box */}
        <div className="space-y-3 rounded-xl bg-white p-4 shadow-lg md:space-y-0 md:flex md:items-end md:gap-2">
          {/* Location - Fixed */}
          <div className="flex-1">
            <label className="block text-sm leading-5 font-medium text-[#1F2937] mb-2">
              <MapPin className="inline mr-1" size={14} /> Khu đô thị
            </label>
            <input
              type="text"
              value={location}
              disabled
              className="w-full rounded-md border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2 text-base leading-6 text-[#1F2937]"
            />
          </div>

          {/* Start Date */}
          <div className="flex-1">
            <label className="block text-sm leading-5 font-medium text-[#1F2937] mb-2">
              <Calendar className="inline mr-1" size={14} /> Ngày nhận
            </label>
            <button
              onClick={() => setShowStartDateCalendar(true)}
              className="w-full rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-base leading-6 text-[#1F2937] hover:border-[#00A86B] transition-colors text-left"
            >
              {formatDate(startDate)}
            </button>
          </div>

          {/* End Date */}
          <div className="flex-1">
            <label className="block text-sm leading-5 font-medium text-[#1F2937] mb-2">
              <Calendar className="inline mr-1" size={14} /> Ngày trả
            </label>
            <button
              onClick={() => setShowEndDateCalendar(true)}
              className="w-full rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-base leading-6 text-[#1F2937] hover:border-[#00A86B] transition-colors text-left"
            >
              {formatDate(endDate)}
            </button>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={!startDate || !endDate}
            className="w-full rounded-md bg-[#00A86B] px-4 py-2 text-base leading-6 font-semibold text-white hover:bg-[#008F5A] disabled:opacity-50 md:w-auto flex items-center justify-center gap-2"
          >
            <Search size={16} /> Tìm xe
          </button>
        </div>

        {/* Start Date Calendar Modal */}
        <Modal
          isOpen={showStartDateCalendar}
          onClose={() => setShowStartDateCalendar(false)}
          title="Chọn ngày nhận xe"
        >
          <DatePickerCalendar
            onDateSelect={handleStartDateSelect}
          />
        </Modal>

        {/* End Date Calendar Modal */}
        <Modal
          isOpen={showEndDateCalendar}
          onClose={() => setShowEndDateCalendar(false)}
          title="Chọn ngày trả xe"
        >
          <DatePickerCalendar
            onDateSelect={handleEndDateSelect}
            minDate={startDate ? new Date(startDate) : undefined}
          />
        </Modal>
      </div>
    </div>
  );
}
