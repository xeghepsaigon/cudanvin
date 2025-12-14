'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, LogOut, Bell, MessageCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface HeaderProps {
  showAuthButtons?: boolean;
  userType?: 'owner' | 'customer' | null;
  darkMode?: boolean;
}

export function Header({ showAuthButtons = true, userType = null, darkMode = false }: HeaderProps) {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Mock notifications data
  const notifications = [
    { id: 1, message: 'Chuyến đi của bạn đã được xác nhận', time: '2 giờ trước' },
    { id: 2, message: 'Bạn có yêu cầu thuê xe mới', time: '4 giờ trước' },
    { id: 3, message: 'Giảm giá 20% cho chuyến đi tiếp theo', time: '1 ngày trước' },
  ];

  // Mock messages data
  const messages = [
    { id: 1, name: 'Nguyễn Văn A', message: 'Chuyến đi thế nào?', time: '5 phút trước' },
    { id: 2, name: 'Lê Thị B', message: 'Xe còn khả dụng không?', time: '30 phút trước' },
    { id: 3, name: 'Hoàng Minh C', message: 'Cảm ơn bạn về chuyến đi!', time: '2 giờ trước' },
  ];

  // Close dropdowns when clicking outside the dropdown areas
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Check if click is outside all dropdowns and buttons
      const isClickInNotif = target.closest('[data-notif-group]');
      const isClickInMsg = target.closest('[data-msg-group]');
      const isClickInAcc = target.closest('[data-acc-group]');
      
      if (!isClickInNotif) setShowNotifications(false);
      if (!isClickInMsg) setShowMessages(false);
      if (!isClickInAcc) setShowDropdown(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut()
      setShowDropdown(false)
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header ref={headerRef} className={`sticky top-0 z-40 w-full border-b ${
      darkMode 
        ? 'border-[#2A2A2A] bg-gradient-to-r from-[#1F1F1F] to-[#151515]' 
        : 'border-[#E5E7EB] bg-white'
    }`}>
      <div className="flex h-14 mx-auto max-w-7xl items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <button onClick={() => router.push('/')} className="flex items-center hover:opacity-80 transition-opacity">
          <h1 className="text-2xl font-semibold leading-8 font-bold text-[#00A86B]">VinUrban</h1>
        </button>

        {/* Auth buttons - Show when not logged in */}
        {showAuthButtons && !user && !userType && (
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.push('/dang-nhap')}
              className={`rounded-full px-4 py-2 text-base leading-6 font-medium ${
                darkMode 
                  ? 'text-white hover:bg-[#2A2A2A]' 
                  : 'text-[#1F2937] hover:bg-[#F9FAFB]'
              }`}
            >
              Đăng nhập
            </button>
            <button 
              onClick={() => router.push('/dang-ky')}
              className="rounded-full bg-[#00A86B] px-4 py-2 text-base leading-6 font-medium text-white hover:bg-[#008F5A]"
            >
              Đăng ký chủ xe
            </button>
          </div>
        )}

        {/* User Menu - Show when logged in */}
        {user && (
          <div className="flex items-center gap-4 relative">
            {/* Notification Dropdown */}
            <div data-notif-group className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-lg transition-colors relative ${
                  darkMode
                    ? 'hover:bg-[#2A2A2A] text-[#808080]'
                    : 'hover:bg-[#F9FAFB] text-[#6B7280]'
                }`}>
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Notifications List */}
              {showNotifications && (
                <div className={`absolute right-0 mt-2 w-64 min-w-64 border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50 ${
                  darkMode
                    ? 'bg-[#1F1F1F] border-[#2A2A2A]'
                    : 'bg-white border-[#E5E7EB]'
                }`}>
                  <div className={`px-4 py-3 border-b ${
                    darkMode ? 'border-[#2A2A2A]' : 'border-[#E5E7EB]'
                  }`}>
                    <h3 className={`font-semibold text-sm ${
                      darkMode ? 'text-white' : 'text-[#1F2937]'
                    }`}>Thông báo</h3>
                  </div>
                  {notifications.map((notif) => (
                    <button
                      key={notif.id}
                      className={`w-full text-left px-4 py-3 border-b transition-colors ${
                        darkMode
                          ? 'border-[#2A2A2A] hover:bg-[#2A2A2A]'
                          : 'border-[#E5E7EB] hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <p className={`text-sm ${darkMode ? 'text-white' : 'text-[#1F2937]'}`}>
                        {notif.message}
                      </p>
                      <p className={`text-xs mt-1 ${
                        darkMode ? 'text-[#6B7280]' : 'text-[#9CA3AF]'
                      }`}>
                        {notif.time}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Message Dropdown */}
            <div data-msg-group className="relative">
              <button 
                onClick={() => setShowMessages(!showMessages)}
                className={`p-2 rounded-lg transition-colors relative ${
                  darkMode
                    ? 'hover:bg-[#2A2A2A] text-[#808080]'
                    : 'hover:bg-[#F9FAFB] text-[#6B7280]'
                }`}>
                <MessageCircle size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Messages List */}
              {showMessages && (
                <div className={`absolute right-0 mt-2 w-64 min-w-64 border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50 ${
                  darkMode
                    ? 'bg-[#1F1F1F] border-[#2A2A2A]'
                    : 'bg-white border-[#E5E7EB]'
                }`}>
                  <div className={`px-4 py-3 border-b ${
                    darkMode ? 'border-[#2A2A2A]' : 'border-[#E5E7EB]'
                  }`}>
                    <h3 className={`font-semibold text-sm ${
                      darkMode ? 'text-white' : 'text-[#1F2937]'
                    }`}>Tin nhắn</h3>
                  </div>
                  {messages.map((msg) => (
                    <button
                      key={msg.id}
                      className={`w-full text-left px-4 py-3 border-b transition-colors ${
                        darkMode
                          ? 'border-[#2A2A2A] hover:bg-[#2A2A2A]'
                          : 'border-[#E5E7EB] hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-[#1F2937]'}`}>
                        {msg.name}
                      </p>
                      <p className={`text-sm mt-1 ${
                        darkMode ? 'text-[#B3B3B3]' : 'text-[#6B7280]'
                      }`}>
                        {msg.message}
                      </p>
                      <p className={`text-xs mt-1 ${
                        darkMode ? 'text-[#6B7280]' : 'text-[#9CA3AF]'
                      }`}>
                        {msg.time}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Account Dropdown */}
            <div data-acc-group className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  darkMode
                    ? 'hover:bg-[#2A2A2A]'
                    : 'hover:bg-[#F9FAFB]'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-[#00A86B] flex items-center justify-center text-white text-sm font-bold">
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className={`text-sm font-medium max-w-xs truncate ${
                  darkMode ? 'text-white' : 'text-[#1F2937]'
                }`}>
                  {user.displayName || user.email?.split('@')[0] || 'Người dùng'}
                </span>
                <ChevronDown size={16} className={darkMode ? 'text-[#808080]' : 'text-[#6B7280]'} />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className={`absolute right-0 mt-2 w-48 border rounded-lg shadow-lg ${
                  darkMode
                    ? 'bg-[#1F1F1F] border-[#2A2A2A]'
                    : 'bg-white border-[#E5E7EB]'
                }`}>
                  <button
                    onClick={() => {
                      router.push('/profile');
                      setShowDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm border-b transition-colors ${
                      darkMode
                        ? 'text-white border-[#2A2A2A] hover:bg-[#2A2A2A]'
                        : 'text-[#1F2937] border-[#E5E7EB] hover:bg-[#F9FAFB]'
                    }`}
                  >
                    👤 Hồ sơ của tôi
                  </button>
                  <button
                    onClick={() => {
                      router.push('/chu-xe/dashboard');
                      setShowDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm border-b transition-colors ${
                      darkMode
                        ? 'text-white border-[#2A2A2A] hover:bg-[#2A2A2A]'
                        : 'text-[#1F2937] border-[#E5E7EB] hover:bg-[#F9FAFB]'
                    }`}
                  >
                    🚗 Quản lý xe
                  </button>
                  <button className={`w-full text-left px-4 py-3 text-sm border-b transition-colors ${
                    darkMode
                      ? 'text-white border-[#2A2A2A] hover:bg-[#2A2A2A]'
                      : 'text-[#1F2937] border-[#E5E7EB] hover:bg-[#F9FAFB]'
                  }`}>
                    ⚙️ Cài đặt
                  </button>
                  <button 
                    onClick={handleLogout}
                    className={`w-full text-left px-4 py-3 text-sm flex items-center gap-2 transition-colors ${
                      darkMode
                        ? 'text-red-400 hover:bg-[#2A2A2A]'
                        : 'text-red-600 hover:bg-[#F9FAFB]'
                    }`}
                  >
                    <LogOut size={14} />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Legacy User Menu - for userType prop (backward compatibility) */}
        {userType && !user && (
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
