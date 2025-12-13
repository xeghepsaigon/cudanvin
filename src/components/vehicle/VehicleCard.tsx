'use client';

import { Star, Gauge, Users, Droplet, MapPin, Phone, CheckCircle2, TrendingUp, Activity } from 'lucide-react';
import Card from '@/components/ui/Card';
import TransmissionIcon from '@/components/ui/TransmissionIcon';

interface VehicleCardProps {
  id: string;
  slug: string;
  name: string;
  image: string;
  pricePerDay: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  location?: string;
  seats?: number;
  fuelType?: string;
  transmission?: string;
  badges?: string[];
  onViewDetails?: (slug: string) => void;
}

const VehicleCard = ({
  id,
  slug,
  name,
  image,
  pricePerDay,
  originalPrice,
  discount,
  rating,
  reviewCount,
  location,
  seats,
  fuelType,
  transmission,
  badges,
  onViewDetails,
}: VehicleCardProps) => {
  const getTransmissionLabel = (trans?: string) => {
    if (trans === 'automatic') return 'Số tự động';
    if (trans === 'manual') return 'Số sàn';
    return trans;
  };

  const getFuelTypeLabel = (fuel?: string) => {
    if (fuel === 'petrol') return 'Xăng';
    if (fuel === 'diesel') return 'Dầu';
    if (fuel === 'electric') return 'Điện';
    if (fuel === 'hybrid') return 'Hybrid';
    return fuel;
  };

  return (
    <Card
      as="button"
      variant="interactive"
      onClick={() => onViewDetails?.(slug)}
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-200 rounded-t-xl">
        <img
          src={image || '/images/placeholder.jpg'}
          alt={name}
          className="h-full w-full object-cover"
        />
        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white rounded-full px-3 py-1 text-base font-semibold">
            Giảm {discount}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Badges - Left */}
        {badges && badges.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-start">
            {badges.map((badge, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 border border-green-200 rounded-full text-xs text-green-700"
              >
                <CheckCircle2 size={12} /> {badge}
              </div>
            ))}
          </div>
        )}

        {/* Name - Left */}
        <h3 className="text-lg font-bold text-[#1F2937] text-left">{name}</h3>

        {/* Specs Grid - Left, Center, Right */}
        <div className="flex gap-4 text-sm text-[#6B7280] justify-between">
          {transmission && (
            <div className="flex items-center gap-1.5">
              <TransmissionIcon size={16} className="flex-shrink-0" />
              <span>{getTransmissionLabel(transmission)}</span>
            </div>
          )}
          {seats && (
            <div className="flex items-center gap-1.5">
              <Users size={16} className="flex-shrink-0" />
              <span>{seats} chỗ</span>
            </div>
          )}
          {fuelType && (
            <div className="flex items-center gap-1.5">
              <Droplet size={16} className="flex-shrink-0" />
              <span>{getFuelTypeLabel(fuelType)}</span>
            </div>
          )}
        </div>

        {/* Location - Left */}
        {location && (
          <div className="flex items-start gap-2 text-sm text-[#6B7280]">
            <MapPin size={16} className="mt-0.5 flex-shrink-0" />
            <span>{location}</span>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-[#E5E7EB]"></div>

        {/* Rating, Price & Call Info - Same row */}
        <div className="space-y-2">
          {/* Top row: Rating left, Price right */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Star size={16} className="text-yellow-400 fill-yellow-400 flex-shrink-0" />
              <span className="font-semibold text-[#1F2937]">{rating}</span>
            </div>
            <div className="flex items-center gap-1">
              {originalPrice && (
                <span className="text-xs line-through text-[#9CA3AF]">
                  {(originalPrice / 1000).toLocaleString('vi-VN')}K
                </span>
              )}
              <span className="text-lg font-bold text-[#00A86B]">
                {(pricePerDay / 1000).toLocaleString('vi-VN')}K
              </span>
              <span className="text-xs text-[#6B7280]">/ngày</span>
            </div>
          </div>

          {/* Bottom row: Chuyến left, Call right */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5 text-[#6B7280]">
              <Activity size={14} className="flex-shrink-0" />
              <span>{reviewCount} chuyến</span>
            </div>
            <div className="flex items-center gap-1.5 text-blue-500 font-semibold">
              <Phone size={14} className="flex-shrink-0" />
              714K gói 4 giờ
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default VehicleCard;
