import { Award, Users, Zap, Globe } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function AboutPage() {
  const stats = [
    { label: 'Xe có sẵn', value: '150+' },
    { label: 'Khách hàng hài lòng', value: '10,000+' },
    { label: 'Năm kinh nghiệm', value: '5+' },
    { label: 'Thành phố hoạt động', value: '3' }
  ];

  const values = [
    {
      icon: Award,
      title: 'Chất Lượng Hàng Đầu',
      description: 'Tất cả xe được bảo dưỡng định kỳ và kiểm tra kỹ lưỡng trước mỗi lần cho thuê.'
    },
    {
      icon: Users,
      title: 'Khách Hàng Là Ưu Tiên',
      description: 'Chúng tôi cung cấp dịch vụ hỗ trợ 24/7 để đảm bảo bạn luôn được chăm sóc.'
    },
    {
      icon: Zap,
      title: 'Dịch Vụ Nhanh Chóng',
      description: 'Quy trình đặt xe đơn giản, xác nhận nhanh chóng và giao xe tận nơi.'
    },
    {
      icon: Globe,
      title: 'Phạm Vi Rộng',
      description: 'Hoạt động tại nhiều thành phố lớn, cho phép bạn di chuyển linh hoạt.'
    }
  ];

  const team = [
    { name: 'Nguyễn Văn An', role: 'Giám đốc Điều hành', image: '👨‍💼' },
    { name: 'Trần Thị Bình', role: 'Giám đốc Dịch vụ Khách hàng', image: '👩‍💼' },
    { name: 'Lê Văn Cường', role: 'Quản lý Xe', image: '👨‍💼' },
    { name: 'Phạm Thị Dương', role: 'Trưởng Bộ phận Kế toán', image: '👩‍💼' }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#00A86B] to-[#008C5E] text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              Về VinUrban
            </h1>
            <p className="text-lg text-green-100 max-w-2xl mx-auto">
              Giải pháp thuê xe tự lái hàng đầu tại TP. Hồ Chí Minh
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937]">
              Câu Chuyện Của Chúng Tôi
            </h2>
            <p className="text-[#6B7280] leading-relaxed">
              VinUrban được thành lập vào năm 2019 với mục đích đơn giản: mang đến một giải pháp thuê xe tự lái dễ dàng, rẻ tiền và đáng tin cậy cho mọi người ở TP. Hồ Chí Minh.
            </p>
            <p className="text-[#6B7280] leading-relaxed">
              Những năm qua, chúng tôi đã phục vụ hàng chục nghìn khách hàng từ du khách quốc tế đến doanh nhân địa phương. Chúng tôi liên tục cải tiến dịch vụ để đáp ứng những nhu cầu ngày càng cao của khách hàng.
            </p>
            <p className="text-[#6B7280] leading-relaxed">
              Hiện nay, VinUrban sở hữu hơn 150 xe với các loại từ xe ô tô tiêu chuẩn đến xe sang trọng, và chúng tôi tiếp tục mở rộng quy mô để phục vụ bạn tốt hơn.
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#E5F5F0] to-[#D0F0E8] rounded-lg p-8 h-64 flex items-center justify-center">
            <div className="text-6xl">🚗</div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#F9FAFB] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#00A86B] mb-2">
                  {stat.value}
                </div>
                <p className="text-[#6B7280]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
            Giá Trị Cốt Lõi
          </h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto">
            Những nguyên tắc hướng dẫn tất cả những gì chúng tôi làm
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} variant="default" className="p-6 flex gap-4 hover:shadow-lg">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#00A86B] text-white">
                    <Icon size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1F2937] mb-1">{value.title}</h3>
                  <p className="text-[#6B7280] text-sm">{value.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Team */}
      <section className="bg-[#F9FAFB] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
              Đội Ngũ Của Chúng Tôi
            </h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto">
              Những người tài năng, tận tâm phục vụ bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} variant="default" className="text-center p-6 hover:shadow-lg">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="font-semibold text-[#1F2937] mb-1">{member.name}</h3>
                <p className="text-[#6B7280] text-sm">{member.role}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24">
        <div className="bg-gradient-to-r from-[#00A86B] to-[#008C5E] rounded-lg p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Muốn Tìm Hiểu Thêm?</h2>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
            Liên hệ với chúng tôi để biết thêm về các dịch vụ của VinUrban hoặc đặt xe ngay hôm nay.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="/booking" className="bg-white text-[#00A86B] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Đặt Xe Ngay
            </a>
            <a href="/contact" className="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Liên Hệ Chúng Tôi
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
