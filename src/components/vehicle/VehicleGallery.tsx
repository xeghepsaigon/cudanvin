'use client';

import React from 'react';
import { Vehicle } from '@/lib/types/vehicle';

interface VehicleGalleryProps {
  vehicle: Vehicle;
}

const VehicleGallery: React.FC<VehicleGalleryProps> = ({ vehicle }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? vehicle.images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === vehicle.images.length - 1 ? 0 : prev + 1));
  };

  if (!vehicle.images.length) {
    return (
      <div className="w-full h-64 md:h-96 bg-[#F9FAFB] rounded-lg flex items-center justify-center">
        <p className="text-[#6B7280]">Không có ảnh</p>
      </div>
    );
  }

  // Grid layout: 2 columns on desktop, 1 on mobile
  if (!mounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="md:col-span-3">
          <div className="relative w-full overflow-hidden rounded-2xl bg-gray-200" style={{ paddingBottom: '66.67%' }} />
        </div>
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((idx) => (
            <div key={idx} className="flex-1 rounded-xl overflow-hidden bg-gray-200 min-h-[80px]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
      {/* Main image - Large on left (3 cols) */}
      <div className="md:col-span-3">
        <div className="relative w-full overflow-hidden rounded-2xl bg-gray-200" style={{ paddingBottom: '66.67%', position: 'relative' }}>
          <img
            src={vehicle.images[currentIndex] || '/images/placeholder.jpg'}
            alt={vehicle.name}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {vehicle.images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white transition-all z-10"
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                onClick={goToNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white transition-all z-10"
                aria-label="Next image"
              >
                →
              </button>
            </>
          )}
        </div>
      </div>

      {/* Thumbnail gallery - Right side (stacked) */}
      {vehicle.images.length > 1 && (
        <div className="flex flex-col gap-3">
          {vehicle.images.slice(1, 4).map((image, idx) => (
            <button
              key={idx + 1}
              onClick={() => setCurrentIndex(idx + 1)}
              className={`flex-1 rounded-xl overflow-hidden border-2 transition-all min-h-[80px] ${
                idx + 1 === currentIndex
                  ? 'border-[#00A86B] ring-2 ring-[#00A86B]'
                  : 'border-[#E5E7EB] hover:border-[#00A86B]'
              }`}
              aria-label={`View image ${idx + 2}`}
            >
              <img
                src={image}
                alt={`${vehicle.name} - ảnh ${idx + 2}`}
                className="h-full w-full object-cover hover:opacity-80 transition-opacity"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleGallery;
