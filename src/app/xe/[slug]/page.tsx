'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { FEATURED_VEHICLES } from '@/lib/constants/vehicles';
import VehicleGallery from '@/components/vehicle/VehicleGallery';
import VehicleDetailSkeleton from '@/components/vehicle/VehicleDetailSkeleton';
import { VehicleHeader } from '@/components/vehicle/VehicleHeader';
import { VehicleSpecs } from '@/components/vehicle/VehicleSpecs';
import { VehicleDescription } from '@/components/vehicle/VehicleDescription';
import { VehicleAmenities } from '@/components/vehicle/VehicleAmenities';
import { VehicleDocuments } from '@/components/vehicle/VehicleDocuments';
import { CancellationPolicy } from '@/components/vehicle/CancellationPolicy';
import { VehicleLocation } from '@/components/vehicle/VehicleLocation';
import { VehicleOwner } from '@/components/vehicle/VehicleOwner';
import { VehicleReviews } from '@/components/vehicle/VehicleReviews';
import { VehicleDetailSidebar } from '@/components/vehicle/VehicleDetailSidebar';

// Dicebear avatar helper
const getDicebearAvatar = (name: string, style: string = 'avataaars') => {
  const seed = name.replace(/\s+/g, '');
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}&scale=80`;
};

interface VehicleDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  const router = useRouter();
  const { slug } = use(params);
  const vehicle = FEATURED_VEHICLES.find((v) => v.slug === slug);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [startDate, setStartDate] = useState('01/01/2026');
  const [endDate, setEndDate] = useState('17/01/2026');
  const [showPickupCalendar, setShowPickupCalendar] = useState(false);
  const [showReturnCalendar, setShowReturnCalendar] = useState(false);
  const userType: 'owner' | 'customer' | null = 'customer'; // Demo: customer

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [slug]);

  if (!vehicle) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-white">
        <Header userType={userType} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-base leading-6 text-[#6B7280]">Xe không tồn tại</p>
            <button
              onClick={() => router.back()}
              className="mt-2 text-sm leading-5 font-medium text-[#00A86B] hover:text-[#008F5A]"
            >
              Quay l\u1ea1i
            </button>
          </div>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    // Now handled in VehicleGallery component
  };

  const prevImage = () => {
    // Now handled in VehicleGallery component
  };

  const handleBooking = () => {
    router.push(`/booking?vehicle=${vehicle.slug}`);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <Header userType={userType} />

      <div className="flex-1 w-full">
        {/* Gallery Section - Full Width */}
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-8">
          {isLoading ? <VehicleDetailSkeleton /> : <VehicleGallery vehicle={vehicle} />}
        </div>

        {/* Main Content Section - All content + Sidebar */}
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-8">
          {isLoading ? (
            <VehicleDetailSkeleton />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: Content (2 cols) */}
              <div className="lg:col-span-2 space-y-6">
                <VehicleHeader vehicle={vehicle} />
                <VehicleSpecs vehicle={vehicle} />
                <VehicleDescription vehicle={vehicle} />
                <VehicleAmenities />
                <VehicleDocuments vehicle={vehicle} />
                <CancellationPolicy />
                <VehicleLocation vehicle={vehicle} />
                <VehicleOwner vehicle={vehicle} getDicebearAvatar={getDicebearAvatar} />
                <VehicleReviews getDicebearAvatar={getDicebearAvatar} />
              </div>

              {/* Right: Sidebar (1 col) */}
              <VehicleDetailSidebar
                vehicle={vehicle}
                startDate={startDate}
                endDate={endDate}
                showPickupCalendar={showPickupCalendar}
                showReturnCalendar={showReturnCalendar}
                setShowPickupCalendar={setShowPickupCalendar}
                setShowReturnCalendar={setShowReturnCalendar}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                handleBooking={handleBooking}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
