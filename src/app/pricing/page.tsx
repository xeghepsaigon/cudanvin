import { Check } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function PricingPage() {
  const pricingPlans = [
    {
      name: 'Gói Cơ Bản',
      description: 'Phù hợp cho khách du lịch ngắn hạn',
      price: '500.000',
      period: 'ngày',
      features: [
        'Xe tiêu chuẩn',
        'Bảo hiểm cơ bản',
        'Hỗ trợ 24/7',
        'Miễn phí giao xe',
        'Xăng dầu do khách trả'
      ]
    },
    {
      name: 'Gói Premium',
      description: 'Cho những ai muốn trải nghiệm tốt nhất',
      price: '750.000',
      period: 'ngày',
      featured: true,
      features: [
        'Xe cao cấp',
        'Bảo hiểm toàn diện',
        'Hỗ trợ 24/7',
        'Giao xe tận nơi',
        'Xăng dầu miễn phí',
        'GPS và Wifi',
        'Ưu tiên khách VIP'
      ]
    },
    {
      name: 'Gói Dài Hạn',
      description: 'Giảm giá khi thuê xe trên 7 ngày',
      price: '3.500.000',
      period: 'tuần',
      features: [
        'Xe tiêu chuẩn',
        'Bảo hiểm toàn diện',
        'Hỗ trợ 24/7',
        'Giao xe tận nơi',
        'Xăng dầu miễn phí',
        'Giảm giá 15%'
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1F2937]">
            Bảng Giá Dịch Vụ
          </h1>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            Chọn gói cước phù hợp với nhu cầu của bạn. Giá tốt, dịch vụ chất lượng.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              variant="default"
              className={`transition-all ${
                plan.featured
                  ? 'border-[#00A86B] shadow-lg scale-105'
                  : 'hover:shadow-lg'
              } p-8`}
            >
              {plan.featured && (
                <div className="mb-4 inline-block bg-[#00A86B] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  ĐƯỢC CHỌN NHIỀU NHẤT
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-[#1F2937] mb-2">{plan.name}</h3>
              <p className="text-sm text-[#6B7280] mb-6">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#00A86B]">{plan.price}</span>
                <span className="text-[#6B7280]">đ/{plan.period}</span>
              </div>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-colors mb-8 ${
                  plan.featured
                    ? 'bg-[#00A86B] text-white hover:bg-[#008C5E]'
                    : 'bg-[#F0F0F0] text-[#1F2937] hover:bg-[#E5E7EB]'
                }`}
              >
                Chọn Gói Này
              </button>

              <div className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <Check size={20} className="text-[#00A86B] flex-shrink-0" />
                    <span className="text-[#6B7280]">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#F9FAFB] py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="text-3xl font-bold text-[#1F2937] mb-12 text-center">
            Câu Hỏi Thường Gặp
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: 'Có thể hủy đơn đặt xe không?',
                a: 'Có, bạn có thể hủy miễn phí nếu hủy trước 24 giờ. Sau 24 giờ sẽ bị tính phí 20% giá tiền đặt xe.'
              },
              {
                q: 'Xăng dầu có được cấp sẵn không?',
                a: 'Với gói Premium và Dài Hạn, xăng dầu được cấp miễn phí. Gói Cơ Bản do khách trả.'
              },
              {
                q: 'Bảo hiểm bao gồm những gì?',
                a: 'Bảo hiểm toàn diện bao gồm va chạm, trộm cắp và hư hỏng từ thiên tai.'
              },
              {
                q: 'Tuổi tối thiểu để thuê xe là bao nhiêu?',
                a: 'Khách hàng phải từ 18 tuổi trở lên và có bằng lái xe hạng B hợp lệ.'
              }
            ].map((item, index) => (
              <Card key={index} variant="default" className="p-6">
                <h3 className="font-semibold text-[#1F2937] mb-2">{item.q}</h3>
                <p className="text-[#6B7280] text-sm">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
