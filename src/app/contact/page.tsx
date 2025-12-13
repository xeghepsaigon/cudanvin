'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Điện Thoại',
      value: '0901 234 567',
      description: 'Gọi cho chúng tôi từ 8:00 - 22:00 hàng ngày',
      link: 'tel:+84901234567'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'support@vinurban.com',
      description: 'Gửi email bất kỳ lúc nào, chúng tôi sẽ trả lời trong 24 giờ',
      link: 'mailto:support@vinurban.com'
    },
    {
      icon: MapPin,
      title: 'Địa Chỉ',
      value: '123 Đường Nguyễn Hữu Cảnh, TP.HCM',
      description: 'Gặp gỡ trực tiếp - Mở cửa từ 8:00 - 20:00',
      link: '#'
    },
    {
      icon: Clock,
      title: 'Giờ Hoạt Động',
      value: 'Hàng ngày',
      description: '8:00 - 22:00 (Hỗ trợ khẩn cấp 24/7)',
      link: '#'
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#00A86B] to-[#008C5E] text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              Liên Hệ Chúng Tôi
            </h1>
            <p className="text-lg text-green-100 max-w-2xl mx-auto">
              Chúng tôi sẵn sàng giúp đỡ bạn bất kỳ lúc nào
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <Card
                key={index}
                variant="default"
                as="div"
                className="text-center p-6 hover:shadow-lg"
              >
                <a href={method.link} className="block">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-[#E5F5F0] hover:bg-[#00A86B] text-[#00A86B] hover:text-white rounded-lg transition-colors">
                      <Icon size={24} />
                    </div>
                  </div>
                  <h3 className="font-semibold text-[#1F2937] mb-1">{method.title}</h3>
                  <p className="text-[#00A86B] font-medium mb-2">{method.value}</p>
                  <p className="text-[#6B7280] text-sm">{method.description}</p>
                </a>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="bg-[#F9FAFB] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6">Gửi Tin Nhắn</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Tên của bạn
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#00A86B] focus:ring-1 focus:ring-[#00A86B]"
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#00A86B] focus:ring-1 focus:ring-[#00A86B]"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">
                      Điện thoại
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#00A86B] focus:ring-1 focus:ring-[#00A86B]"
                      placeholder="0901234567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Chủ đề
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#00A86B] focus:ring-1 focus:ring-[#00A86B]"
                  >
                    <option value="">Chọn chủ đề</option>
                    <option value="booking">Vấn đề về đặt xe</option>
                    <option value="vehicle">Vấn đề về xe</option>
                    <option value="payment">Vấn đề thanh toán</option>
                    <option value="support">Hỗ trợ kỹ thuật</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Tin nhắn
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#00A86B] focus:ring-1 focus:ring-[#00A86B] resize-none"
                    placeholder="Hãy cho chúng tôi biết bạn cần giúp gì..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00A86B] text-white py-3 rounded-lg font-semibold hover:bg-[#008C5E] transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Gửi Tin Nhắn
                </button>

                {submitted && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                    <p className="text-green-700 font-medium">
                      ✓ Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm nhất.
                    </p>
                  </div>
                )}
              </form>
            </div>

            {/* Info & Map */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-[#1F2937] mb-6">Thông Tin Liên Hệ</h2>
                <Card variant="default" className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-[#1F2937] mb-1">Văn Phòng Chính</h3>
                    <p className="text-[#6B7280]">123 Đường Nguyễn Hữu Cảnh, Quận 1, TP.HCM</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1F2937] mb-1">Điện Thoại</h3>
                    <p className="text-[#00A86B] font-medium">0901 234 567</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1F2937] mb-1">Email</h3>
                    <p className="text-[#6B7280]">support@vinurban.com</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1F2937] mb-1">Giờ Hoạt Động</h3>
                    <p className="text-[#6B7280]">Thứ 2 - Chủ Nhật: 8:00 - 22:00</p>
                    <p className="text-[#6B7280]">Hỗ trợ khẩn cấp 24/7</p>
                  </div>
                </Card>
              </div>

              {/* Map Placeholder */}
              <div className="bg-[#E5F5F0] rounded-lg p-8 h-64 flex items-center justify-center text-[#6B7280]">
                <div className="text-center">
                  <MapPin size={40} className="mx-auto mb-2 text-[#00A86B]" />
                  <p className="font-medium">Google Maps - Văn phòng VinUrban</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1F2937] mb-6">Theo Dõi Chúng Tôi</h2>
          <div className="flex justify-center gap-4">
            {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map((platform, index) => (
              <a
                key={index}
                href="#"
                className="w-12 h-12 rounded-full bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center hover:bg-[#00A86B] hover:text-white hover:border-[#00A86B] transition-colors font-semibold text-[#6B7280]"
              >
                {platform.charAt(0)}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
