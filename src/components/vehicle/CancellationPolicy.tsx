'use client';

export function CancellationPolicy() {
  return (
    <div className="space-y-4 pb-6 border-b border-[#E5E7EB]">
      <h2 className="text-2xl font-semibold leading-8 text-[#1F2937]">Chính sách hủy chuyến</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-base border border-[#E5E7EB]">
          <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-[#1F2937]">Thời điểm hủy chuyến</th>
              <th className="px-4 py-3 text-left font-semibold text-[#1F2937]">Phí hủy chuyến</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#E5E7EB]">
              <td className="px-4 py-3 text-[#6B7280]">Trong vòng 1h sau giữ chỗ</td>
              <td className="px-4 py-3 text-[#00A86B] font-semibold">Miễn phí</td>
            </tr>
            <tr className="border-b border-[#E5E7EB]">
              <td className="px-4 py-3 text-[#6B7280]">Trước chuyến đi &gt; 7 ngày (sau 1h giữ chỗ)</td>
              <td className="px-4 py-3 text-[#1F2937]">10% giá trị chuyến đi</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-[#6B7280]">Trong vòng 7 ngày trước chuyến đi (sau 1h giữ chỗ)</td>
              <td className="px-4 py-3 text-[#1F2937]">40% giá trị chuyến đi</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
