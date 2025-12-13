export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#00A86B] to-[#008C5E] text-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold">Điều Khoản Sử Dụng</h1>
          <p className="text-green-100 mt-4">Cập nhật lần cuối: Tháng 12, 2024</p>
        </div>
      </section>

      {/* Content */}
      <article className="mx-auto max-w-4xl px-4 md:px-8 py-16 md:py-24">
        <div className="prose prose-sm max-w-none space-y-8 text-[#6B7280]">
          <section>
            <h2 className="text-2xl font-bold text-[#1F2937] mb-4">1. Tổng Quan</h2>
            <p>
              Những Điều khoản Sử dụng này ("Điều khoản") là một thỏa thuận hợp pháp giữa bạn ("Bạn" hoặc "Khách hàng") và VinUrban ("Công ty," "Chúng tôi," "Chúng ta," hoặc "Của chúng ta"). 
              Bằng cách truy cập và sử dụng trang web www.vinurban.com ("Trang web"), bạn chấp nhận và đồng ý tuân theo các Điều khoản này và Chính sách Bảo mật của chúng tôi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1F2937] mb-4">2. Điều Kiện Sử Dụng</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[#1F2937] mb-2">2.1 Tuổi Tối Thiểu</h3>
                <p>
                  Bạn phải ít nhất 18 tuổi để sử dụng dịch vụ của chúng tôi. Bạn đảm bảo rằng bạn là một người có năng lực hành vi dân sự đầy đủ.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1F2937] mb-2">2.2 Bằng Lái Xe Hợp Lệ</h3>
                <p>
                  Bạn phải sở hữu một bằng lái xe hợp lệ được cấp bởi chính quyền công nhân hạng B hoặc cao hơn. Bằng lái phải còn hiệu lực và bạn phải mang theo khi đón xe.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1F2937] mb-2">2.3 Tài Khoản</h3>
                <p>
                  Bạn chịu trách nhiệm duy trì tính bảo mật của thông tin tài khoản của bạn. Bạn đồng ý cung cấp thông tin chính xác, đầy đủ và cập nhật.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1F2937] mb-4">3. Quy Trình Đặt Xe</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[#1F2937] mb-2">3.1 Đặt Chỗ</h3>
                <p>
                  Khi bạn đặt xe thông qua nền tảng của chúng tôi, bạn đang gửi đơn đặt chỗ cho chúng tôi. Chúng tôi có quyền chấp nhận hoặc từ chối đơn đặt chỗ.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1F2937] mb-2">3.2 Tiền Cọc</h3>
                <p>
                  Bạn phải thanh toán 30% giá tiền thuê xe làm tiền cọc. Tiền cọc này sẽ được trừ vào hóa đơn cuối cùng hoặc hoàn lại nếu bạn hủy đúng hạn.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1F2937] mb-2">3.3 Xác Nhận</h3>
                <p>
                  Một khi đơn đặt của bạn được chấp nhận, chúng tôi sẽ gửi email xác nhận cho bạn. Email xác nhận sẽ bao gồm tất cả chi tiết của đơn đặt.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1F2937] mb-4">4. Chính Sách Hủy</h2>
            <ul className="space-y-3 list-disc list-inside">
              <li>Hủy trước 24 giờ: 100% hoàn cọc</li>
              <li>Hủy 12-24 giờ trước: 50% hoàn cọc</li>
              <li>Hủy dưới 12 giờ: Không hoàn lại cọc</li>
              <li>Không xuất hiện: Mất 100% tiền cọc</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1F2937] mb-4">5. Trách Nhiệm Sử Dụng Xe</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[#1F2937] mb-2">5.1 Tình Trạng Xe</h3>
                <p>
                  Bạn đồng ý kiểm tra kỹ lưỡng tình trạng xe trước khi rời khỏi trạm của chúng tôi. Bất kỳ vết xước hoặc hư hỏng hiện có phải được ghi lại.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1F2937] mb-2">5.2 Sử Dụng Hợp Pháp</h3>
                <p>
                  Bạn đồng ý sử dụng xe chỉ cho các mục đích hợp pháp. Bạn không được:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>Sử dụng xe cho các mục đích thương mại mà không được phép</li>
                  <li>Tham gia vào các hoạt động bất hợp pháp</li>
                  <li>Cho phép người khác lái xe mà không sự cho phép của chúng tôi</li>
                  <li>Lái xe trong trạng thái say rượu hoặc dưới ảnh hưởng của chất kích thích</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#1F2937] mb-2">5.3 An Toàn Lái Xe</h3>
                <p>
                  Bạn phải tuân thủ tất cả các quy tắc giao thông. Bạn chịu trách nhiệm về mọi vi phạm giao thông hoặc tai nạn xảy ra trong thời gian cho thuê.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1F2937] mb-4">6. Bảo Hiểm</h2>
            <div className="space-y-4">
              <p>
                Tất cả các xe được bảo hiểm cơ bản. Mức độ trừ (Deductible) là 2 triệu đồng cho mỗi tai nạn. Bạn có thể mua bảo hiểm bổ sung để giảm mức độ này.
              </p>
              <p>
                Bảo hiểm không bao gồm: Hư hỏng do lái xe bất cẩn hoặc vô ý thức, vi phạm giao thông, sử dụng trong các sự kiện đua hoặc giải đua.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1F2937] mb-4">7. Thanh Toán</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[#1F2937] mb-2">7.1 Phương Thức Thanh Toán</h3>
                <p>
                  Chúng tôi chấp nhận chuyển khoản ngân hàng, thẻ tín dụng/ghi nợ, ví điện tử, và thanh toán tại quầy.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1F2937] mb-2">7.2 Giá Cả</h3>
                <p>
                  Giá được hiển thị rõ ràng trên website. Hóa đơn cuối cùng có thể bao gồm phí bổ sung nếu có vượt quá giớn hạn quãng đường hoặc giao xe muộn.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1F2937] mb-4">8. Trách Nhiệm Giới Hạn</h2>
            <p>
              Chúng tôi không chịu trách nhiệm cho bất kỳ thiệt hại gián tiếp, ngẫu nhiên, đặc biệt hoặc hậu quả nào phát sinh từ việc sử dụng dịch vụ của chúng tôi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1F2937] mb-4">9. Sửa Đổi Điều Khoản</h2>
            <p>
              Chúng tôi có quyền sửa đổi các Điều khoản này bất kỳ lúc nào. Sửa đổi sẽ có hiệu lực ngay lập tức khi đăng lên website. Việc tiếp tục sử dụng dịch vụ của chúng tôi biểu thị sự chấp nhận của bạn đối với các Điều khoản được sửa đổi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1F2937] mb-4">10. Luật Pháp Áp Dụng</h2>
            <p>
              Những Điều khoản này được quản lý bởi và được giải thích theo Luật pháp Cộng hòa Xã hội chủ nghĩa Việt Nam.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1F2937] mb-4">11. Liên Hệ</h2>
            <p>
              Nếu bạn có bất kỳ câu hỏi nào về các Điều khoản này, vui lòng liên hệ với chúng tôi tại:
            </p>
            <div className="mt-4 p-4 bg-[#F9FAFB] rounded-lg">
              <p><strong>Email:</strong> support@vinurban.com</p>
              <p><strong>Điện thoại:</strong> 0901 234 567</p>
              <p><strong>Địa chỉ:</strong> 123 Đường Nguyễn Hữu Cảnh, TP.HCM</p>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
