'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, LogOut } from 'lucide-react';

interface HeaderProps {
  showAuthButtons?: boolean;
  userType?: 'owner' | 'customer' | null;
}

export function Header({ showAuthButtons = true, userType = null }: HeaderProps) {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E5E7EB] bg-white">
      <div className="flex h-14 mx-auto max-w-7xl items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <button onClick={() => router.push('/')} className="flex items-center hover:opacity-80 transition-opacity">
          <h1 className="text-2xl font-semibold leading-8 font-bold text-[#00A86B]">VinUrban</h1>
        </button>

        {/* Auth buttons */}
        {showAuthButtons && !userType && (
          <div className="flex items-center gap-3">
            <button className="rounded-full px-4 py-2 text-base leading-6 font-medium text-[#1F2937] hover:bg-[#F9FAFB]">
              Đăng nhập
            </button>
            <button className="rounded-full bg-[#00A86B] px-4 py-2 text-base leading-6 font-medium text-white hover:bg-[#008F5A]">
              Đăng ký chủ xe
            </button>
          </div>
        )}

        {/* User Menu */}
        {userType && (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-[#00A86B] flex items-center justify-center text-white text-xs font-bold">
                {userType === 'owner' ? 'C' : 'K'}
              </div>
              <span className="text-sm font-medium text-[#1F2937]">
                {userType === 'owner' ? 'Chủ xe' : 'Khách'}
              </span>
              <ChevronDown size={16} className="text-[#6B7280]" />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E5E7EB] rounded-lg shadow-lg">
                <button
                  onClick={() => {
                    router.push(userType === 'owner' ? '/chu-xe/profile' : '/profile');
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-[#1F2937] hover:bg-[#F9FAFB] border-b border-[#E5E7EB]"
                >
                  👤 Hồ sơ của tôi
                </button>
                <button
                  onClick={() => {
                    router.push(userType === 'owner' ? '/chu-xe/dashboard' : '/xe');
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-[#1F2937] hover:bg-[#F9FAFB] border-b border-[#E5E7EB]"
                >
                  🎯 {userType === 'owner' ? 'Quản lý xe' : 'Danh sách xe'}
                </button>
                <button className="w-full text-left px-4 py-3 text-sm text-[#1F2937] hover:bg-[#F9FAFB] border-b border-[#E5E7EB]">
                  ⚙️ Cài đặt
                </button>
                <button className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-[#F9FAFB] flex items-center gap-2">
                  <LogOut size={14} />
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
