'use client';

import { Music, Video, Navigation, Monitor, Tag, Wifi, Airplay, Wind, Lock, Battery, Shield } from 'lucide-react';

export function VehicleAmenities() {
  const amenities = [
    { icon: Music, label: 'Bluetooth' },
    { icon: Video, label: 'Camera 360' },
    { icon: Video, label: 'Camera hanh trinh' },
    { icon: Navigation, label: 'GPS' },
    { icon: Monitor, label: 'Man hinh DVD' },
    { icon: Tag, label: 'ETC' },
    { icon: Wifi, label: 'Ket noi WiFi' },
    { icon: Wind, label: 'Dieu hoa tu dong' },
    { icon: Lock, label: 'Khoa cua thong minh' },
    { icon: Battery, label: 'Sac nhanh USB-C' },
    { icon: Shield, label: 'He thong an toan 5 sao' },
    { icon: Airplay, label: 'Apple CarPlay & Android Auto' },
  ];

  return (
    <div className="space-y-4 pb-6 border-b border-[#E5E7EB]">
      <h2 className="text-2xl font-semibold leading-8 text-[#1F2937]">Các tiện nghi khác</h2>
      <div className="grid grid-cols-2 gap-4">
        {amenities.map((amenity, idx) => {
          const IconComponent = amenity.icon;
          return (
            <div key={idx} className="flex items-center gap-3">
              <IconComponent size={20} className="text-[#00A86B] flex-shrink-0" />
              <p className="text-base text-[#1F2937]">{amenity.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
