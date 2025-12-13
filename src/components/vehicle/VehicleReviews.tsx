'use client';

import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';

interface ReviewItem {
  name: string;
  userId: string;
  time: string;
  rating: number;
  text: string;
}

interface VehicleReviewsProps {
  getDicebearAvatar: (name: string, style?: string) => string;
}

export function VehicleReviews({ getDicebearAvatar }: VehicleReviewsProps) {
  const router = useRouter();
  const reviews: ReviewItem[] = [
    {
      name: 'Nguyễn Văn A',
      userId: 'customer-1',
      time: '2 tuần trước',
      rating: 5,
      text: 'Xe rất sạch sẹ, tính năng đầy đủ và chủ xe rất thân thiết. Sẽ thuê lại lần tới!',
    },
    {
      name: 'Trần Thị B',
      userId: 'customer-2',
      time: '1 tháng trước',
      rating: 4,
      text: 'Tốt, chỉ hơn lã mất chút thời gian để giao xe, nhưng chất lượng không tế gì.',
    },
    {
      name: 'Lê Minh C',
      userId: 'customer-3',
      time: '1 tháng trước',
      rating: 5,
      text: 'Hoàn hảo! Xe mới, động cơ mạnh mẽ, các tính năng hiện đại. Giá cả rất hợp lý.',
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold leading-8 text-[#1F2937]">Danh giá từ khách hàng</h2>
      <div className="space-y-4">
        {reviews.map((review, idx) => (
          <div key={idx} className="border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-start gap-3 mb-3">
              {/* Avatar */}
              <img
                src={getDicebearAvatar(review.name, 'avataaars')}
                alt={review.name}
                className="w-10 h-10 rounded-full flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => router.push(`/profile?userId=${review.userId}`)}
              />
              {/* Reviewer Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => router.push(`/profile?userId=${review.userId}`)}
                  >
                    <p className="font-semibold text-[#00A86B] text-base">{review.name}</p>
                    <p className="text-sm text-[#6B7280]">{review.time}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={`${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-base text-[#6B7280] pl-13">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
