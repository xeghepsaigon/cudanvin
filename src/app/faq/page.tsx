import Card from '@/components/ui/Card';

export default function FAQPage() {
  const faqItems = [
    {
      category: 'Đặt Xe',
      questions: [
        {
          q: 'Làm thế nào để đặt xe?',
          a: 'Bạn có thể đặt xe thông qua website hoặc ứng dụng di động. Chọn loại xe, ngày tháng, địa điểm giao nhận, sau đó thanh toán. Đơn đặt sẽ được xác nhận trong vòng 15 phút.'
        },
        {
          q: 'Có yêu cầu gì khi thuê xe?',
          a: 'Bạn cần có bằng lái xe hạng B hợp lệ, CCCD/Hộ chiếu, và tài khoản ngân hàng để thanh toán. Tuổi tối thiểu là 18 tuổi.'
        },
        {
          q: 'Có thể đặt xe trước bao lâu?',
          a: 'Bạn có thể đặt xe từ 1 giờ đến 1 năm trước ngày sử dụng. Chúng tôi khuyến cáo đặt trước 2-3 ngày để có nhiều lựa chọn xe.'
        },
        {
          q: 'Phí đặt cọc là bao nhiêu?',
          a: 'Phí đặt cọc là 30% giá tiền thuê xe. Số tiền này sẽ được trừ vào hóa đơn cuối cùng hoặc hoàn lại nếu hủy đúng hạn.'
        }
      ]
    },
    {
      category: 'Hủy & Hoàn Tiền',
      questions: [
        {
          q: 'Chính sách hủy đơn là gì?',
          a: 'Hủy trước 24 giờ: 100% hoàn cọc. Hủy 12-24 giờ trước: 50% hoàn cọc. Hủy dưới 12 giờ: không hoàn lại cọc.'
        },
        {
          q: 'Hoàn tiền mất bao lâu?',
          a: 'Tiền hoàn sẽ được chuyển về tài khoản ngân hàng trong 3-5 ngày làm việc sau khi xác nhận hủy.'
        },
        {
          q: 'Có lệ phí hủy không?',
          a: 'Không có lệ phí hủy nếu bạn hủy đúng hạn. Chỉ khi hủy sát giờ mới bị trừ cọc.'
        }
      ]
    },
    {
      category: 'Bảo Hiểm & Bảo Vệ',
      questions: [
        {
          q: 'Bảo hiểm bao gồm những gì?',
          a: 'Bảo hiểm cơ bản bao gồm: Trách nhiệm dân sự, Va chạm, Hư hỏng. Bảo hiểm toàn diện thêm: Trộm cắp, Hư hỏng từ thiên tai, Bảo vệ khách hàng.'
        },
        {
          q: 'Mức độ trừ (Deductible) là bao nhiêu?',
          a: 'Mức độ trừ là 2 triệu đồng cho mỗi tai nạn. Bạn có thể mua bảo hiểm thêm để giảm mức độ này.'
        },
        {
          q: 'Nếu xe bị hư hỏng thì sao?',
          a: 'Vui lòng báo cáo ngay cho nhân viên hỗ trợ. Chúng tôi sẽ kiểm tra và xử lý theo chính sách bảo hiểm.'
        }
      ]
    },
    {
      category: 'Thanh Toán',
      questions: [
        {
          q: 'Hình thức thanh toán nào được hỗ trợ?',
          a: 'Chúng tôi hỗ trợ: Chuyển khoản ngân hàng, Thẻ tín dụng/ghi nợ, Ví điện tử (Momo, Zalopay), Thanh toán tại quầy.'
        },
        {
          q: 'Có phí xử lý thanh toán không?',
          a: 'Không có phí xử lý khi thanh toán qua chuyển khoản. Thanh toán qua thẻ sẽ tính 1% phí giao dịch.'
        },
        {
          q: 'Có thể thanh toán sau không?',
          a: 'Có, bạn có thể thanh toán 24 giờ sau khi giao xe nếu được công ty phê duyệt (tuỳ tình huống).'
        }
      ]
    },
    {
      category: 'Xe & Dịch Vụ',
      questions: [
        {
          q: 'Xe được bảo dưỡng thế nào?',
          a: 'Tất cả xe được bảo dưỡng định kỳ theo tiêu chuẩn hãng sản xuất. Chúng tôi kiểm tra trước mỗi lần cho thuê.'
        },
        {
          q: 'Có giới hạn quãng đường không?',
          a: 'Không có giới hạn quãng đường. Bạn có thể đi tới bất kỳ đâu, tuy nhiên các tỉnh xa sẽ được tính thêm phí.'
        },
        {
          q: 'Có thể giao xe tại địa điểm khác không?',
          a: 'Có, bạn có thể giao xe tại một địa điểm khác. Sẽ được tính thêm phí di chuyển xe tương ứng.'
        },
        {
          q: 'Xe có GPS không?',
          a: 'Có, các xe Premium được trang bị GPS miễn phí. Xe cơ bản không có, nhưng bạn có thể thuê GPS thêm.'
        }
      ]
    },
    {
      category: 'Hỗ Trợ & Khắc Phục Sự Cố',
      questions: [
        {
          q: 'Nếu xe bị hỏng trên đường phải làm sao?',
          a: 'Gọi ngay cho đội hỗ trợ 24/7 của chúng tôi. Chúng tôi sẽ gửi cứu hộ hoặc thay thế xe trong vòng 1 tiếng.'
        },
        {
          q: 'Có hỗ trợ kỹ thuật không?',
          a: 'Có, chúng tôi hỗ trợ 24/7 qua điện thoại, email và ứng dụng mobile.'
        },
        {
          q: 'Nếu bị phạt giao thông thì ai trả?',
          a: 'Nếu bạn vi phạm giao thông, bạn phải tự chịu. Chúng tôi sẽ giúp hỗ trợ các thủ tục xử phạt.'
        }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1F2937]">
            Câu Hỏi Thường Gặp
          </h1>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            Tìm câu trả lời cho các câu hỏi phổ biến về dịch vụ thuê xe của chúng tôi.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="mx-auto max-w-4xl px-4 md:px-8 pb-24">
        <div className="space-y-12">
          {faqItems.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-bold text-[#1F2937] mb-6 pb-3 border-b-2 border-[#00A86B]">
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((item, questionIndex) => (
                  <Card key={questionIndex} variant="default" className="overflow-hidden">
                    <details className="group">
                      <summary className="cursor-pointer p-6 hover:bg-[#F9FAFB] transition-colors flex justify-between items-center">
                        <h3 className="font-semibold text-[#1F2937] text-lg">{item.q}</h3>
                        <span className="text-[#6B7280] group-open:text-[#00A86B] transition-colors">
                          <svg className="w-6 h-6 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        </span>
                      </summary>
                      <div className="px-6 pb-6 bg-[#F9FAFB] border-t border-[#E5E7EB]">
                        <p className="text-[#6B7280] leading-relaxed">{item.a}</p>
                      </div>
                    </details>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#00A86B] to-[#008C5E] rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Vẫn có câu hỏi?</h3>
          <p className="mb-6">Đừng ngần ngại liên hệ với chúng tôi</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="tel:+84901234567" className="bg-white text-[#00A86B] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Gọi ngay
            </a>
            <a href="mailto:support@vinurban.com" className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Gửi email
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
