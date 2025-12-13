export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#00A86B] to-[#008C5E] text-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold">Chính Sách Bảo Mật</h1>
          <p className="text-green-100 mt-4">Cập nhật lần cuối: Tháng 12, 2024</p>
        </div>
      </section>

      {/* Content */}
      <article className="mx-auto max-w-4xl px-4 md:px-8 py-16 md:py-24">
        <div className="prose prose-sm max-w-none space-y-8 text-[#6B7280]">
          <section>
            <h2 className="text-2xl font-bold text-[#1F2937] mb-4">1. Giới Thiệu</h2>
            <p>
              VinUrban ("chúng tôi," "chúng ta," "của chúng tôi," hoặc "Công ty") cam kết bảo vệ quyền riêng tư của bạn. Chính sách Bảo mật này giải thích cách chúng tôi thu thập, sử dụng, công khai, bảo vệ hoặc xử lý dữ liệu cá nhân của bạn khi bạn sử dụng trang web www.vinurban.com ("Trang web").
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1F2937] mb-4">2. Thông Tin Chúng Tôi Thu Thập</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[#1F2937] mb-2">2.1 Thông Tin Bạn Cung Cấp Trực Tiếp</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Tên, email, số điện thoại</li>
                  <li>Địa chỉ nhà ở</li>
                  <li>Số CCCD/Hộ chiếu</li>
                  <li>Số Bằng lái xe</li>
                  <li>Thông tin thanh toán (số thẻ, tài khoản ngân hàng)</li>
                  <li>Thông tin về độc lập của bạn và lịch sử lái xe</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#1F2937] mb-2">2.2 Thông Tin Thu Thập Tự Động</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Địa chỉ IP của bạn</li>
                  <li>Loại trình duyệt và hệ điều hành</li>
                  <li>Các trang bạn truy cập</li>
                  <li>Thời gian bạn dành trên mỗi trang</li>
                  <li>Các liên kết bạn nhấp vào</li>
                  <li>Vị trí GPS (nếu bạn cho phép)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#1F2937] mb-2">2.3 Cookie và Công Nghệ Theo Dõi</h3>
                <p>
                  Chúng tôi sử dụng cookie và các công nghệ tương tự để theo dõi hoạt động của bạn trên trang web của chúng tôi, ghi nhớ các tùy chọn của bạn, và cung cấp trải nghiệm được cá nhân hóa.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1F2937] mb-4">3. Cách Chúng Tôi Sử Dụng Thông Tin Của Bạn</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Xử lý đơn đặt và thanh toán của bạn</li>
              <li>Gửi email xác nhận đơn đặt và cập nhật</li>
              <li>Cung cấp hỗ trợ khách hàng</li>
              <li>Gửi thông báo về các phí, sửa đổi chính sách hoặc thay đổi dịch vụ</li>
              <li>Gửi thông tin tiếp thị (chỉ nếu bạn đã đồng ý)</li>
              <li>Cải thiện dịch vụ của chúng tôi</li>
              <li>Tuân thủ các yêu cầu pháp lý</li>
              <li>Phát hiện và ngăn chặn gian lận</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1F2937] mb-4">4. Chia Sẻ Thông Tin</h2>
            <div className="space-y-4">
              <p>
                Chúng tôi KHÔNG bán thông tin cá nhân của bạn cho các bên thứ ba. Tuy nhiên, chúng tôi có thể chia sẻ thông tin của bạn trong các trường hợp sau:
              </p>
              <div>
                <h3 className="font-semibold text-[#1F2937] mb-2">4.1 Nhân Viên Và Nhà Cung Cấp</h3>
                <p>
                  Chúng tôi chia sẻ thông tin với nhân viên và nhà thầu của chúng tôi những người cần nó để cung cấp dịch vụ.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1F2937] mb-2">4.2 Các Yêu Cầu Pháp Lý</h3>
                <p>
                  Chúng tôi có thể tiết lộ thông tin nếu được yêu cầu bởi luật pháp hoặc để tuân thủ một quyết định từ một cơ quan chính phủ.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1F2937] mb-2">4.3 Bảo Vệ Quyền</h3>
                <p>
                  Chúng tôi có thể tiết lộ thông tin nếu cần thiết để bảo vệ quyền, quyền riêng tư, sự an toàn, hoặc tài sản của chúng tôi, bạn, hoặc các bên khác.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1F2937] mb-4">5. Bảo Vệ Dữ Liệu</h2>
            <p>
              Chúng tôi sử dụng các biện pháp bảo mật thích hợp, bao gồm mã hóa, để bảo vệ thông tin cá nhân của bạn chống lại sự tiếp cận trái phép, thay đổi, tiết lộ hoặc phá hủy.
            </p>
            <p className="mt-4">
              Tuy nhiên, không có phương pháp truyền tải qua Internet hoặc phương pháp lưu trữ điện tử nào là 100% an toàn. Chúng tôi không thể đảm bảo an toàn tuyệt đối của thông tin của bạn.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1F2937] mb-4">6. Lưu Trữ Dữ Liệu</h2>
            <p>
              Chúng tôi lưu giữ thông tin cá nhân của bạn miễn là cần thiết để cung cấp dịch vụ và tuân thủ các nghĩa vụ pháp lý. Bạn có thể yêu cầu xóa dữ liệu của bạn bất kỳ lúc nào.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1F2937] mb-4">7. Quyền Của Bạn</h2>
            <p>Bạn có quyền:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Truy cập thông tin cá nhân của bạn</li>
              <li>Sửa chữa thông tin không chính xác</li>
              <li>Xóa thông tin của bạn</li>
              <li>Từ chối các thư tiếp thị</li>
              <li>Thu hồi sự đồng ý của bạn</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1F2937] mb-4">8. Người Liên Hệ Cho Quyền Riêng Tư</h2>
            <p>
              Để thực hiện bất kỳ quyền nào được liệt kê ở trên, hoặc nếu bạn có các câu hỏi về Chính sách Bảo mật này, vui lòng liên hệ với chúng tôi:
            </p>
            <div className="mt-4 p-4 bg-[#F9FAFB] rounded-lg">
              <p><strong>Email:</strong> privacy@vinurban.com</p>
              <p><strong>Điện thoại:</strong> 0901 234 567</p>
              <p><strong>Địa chỉ:</strong> 123 Đường Nguyễn Hữu Cảnh, TP.HCM</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1F2937] mb-4">9. Các Trang Web Của Bên Thứ Ba</h2>
            <p>
              Trang web của chúng tôi có thể chứa các liên kết đến các trang web của bên thứ ba. Chúng tôi không chịu trách nhiệm cho các chính sách bảo mật của các trang web đó. Chúng tôi khuyến cáo bạn đọc chính sách bảo mật của bất kỳ trang web của bên thứ ba nào trước khi cung cấp thông tin cá nhân của bạn.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1F2937] mb-4">10. Sửa Đổi Chính Sách Này</h2>
            <p>
              Chúng tôi có thể cập nhật Chính sách Bảo mật này từ thời gian sang thời gian. Chúng tôi sẽ thông báo cho bạn về bất kỳ thay đổi nào bằng cách đăng Chính sách mới trên trang web này và cập nhật ngày "Cập nhật lần cuối" ở trên. Việc tiếp tục sử dụng trang web của chúng tôi sau các thay đổi biểu thị sự chấp nhận của bạn đối với Chính sách Bảo mật được sửa đổi.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
