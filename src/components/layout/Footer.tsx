'use client';

import { useRouter } from 'next/navigation';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const router = useRouter();
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[#E5E7EB] bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <button onClick={() => router.push('/')} className="hover:opacity-80 transition-opacity">
              <h2 className="text-xl font-semibold leading-8 font-bold text-[#00A86B]">VinUrban</h2>
            </button>
            <p className="text-base leading-6 text-[#6B7280]">Giải pháp thuê xe tự lái linh hoạt tại TP. Hồ Chí Minh</p>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h3 className="font-semibold leading-7 text-[#1F2937] text-base">Dịch vụ</h3>
            <ul className="space-y-2 text-base leading-6 text-[#6B7280]">
              <li><button onClick={() => router.push('/xe')} className="hover:text-[#00A86B] transition-colors">Danh sách xe</button></li>
              <li><button onClick={() => router.push('/booking')} className="hover:text-[#00A86B] transition-colors">Đặt xe ngay</button></li>
              <li><button onClick={() => router.push('/pricing')} className="hover:text-[#00A86B] transition-colors">Giá cả</button></li>
              <li><button onClick={() => router.push('/faq')} className="hover:text-[#00A86B] transition-colors">FAQ</button></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h3 className="font-semibold leading-7 text-[#1F2937] text-base">Công ty</h3>
            <ul className="space-y-2 text-base leading-6 text-[#6B7280]">
              <li><button onClick={() => router.push('/about')} className="hover:text-[#00A86B] transition-colors">Về chúng tôi</button></li>
              <li><button onClick={() => router.push('/contact')} className="hover:text-[#00A86B] transition-colors">Liên hệ</button></li>
              <li><button onClick={() => router.push('/terms')} className="hover:text-[#00A86B] transition-colors">Điều khoản</button></li>
              <li><button onClick={() => router.push('/privacy')} className="hover:text-[#00A86B] transition-colors">Chính sách</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="font-semibold leading-7 text-[#1F2937] text-base">Liên hệ</h3>
            <ul className="space-y-2 text-base leading-6 text-[#6B7280]">
              <li>
                <a href="tel:+84901234567" className="hover:text-[#00A86B] transition-colors flex items-center gap-2">
                  <Phone size={14} /> 0901 234 567
                </a>
              </li>
              <li>
                <a href="mailto:support@vinurban.com" className="hover:text-[#00A86B] transition-colors flex items-center gap-2">
                  <Mail size={14} /> support@vinurban.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-[#6B7280]">
                <MapPin size={14} /> TP. Hồ Chí Minh, Việt Nam
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#E5E7EB] pt-8">
          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center text-base leading-6 text-[#6B7280]">
            <p>&copy; {year} VinUrban. Tất cả quyền được bảo lưu.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <button onClick={() => router.push('/privacy')} className="hover:text-[#00A86B] transition-colors">Chính sách bảo mật</button>
              <span>•</span>
              <button onClick={() => router.push('/terms')} className="hover:text-[#00A86B] transition-colors">Điều khoản sử dụng</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
