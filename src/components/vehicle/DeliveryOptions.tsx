'use client';

import { useState } from 'react';
import { Vehicle } from '@/lib/types/vehicle';

interface DeliveryOptionsProps {
  vehicle: Vehicle;
}

export function DeliveryOptions({ vehicle }: DeliveryOptionsProps) {
  const [selectedDelivery, setSelectedDelivery] = useState<'pickup' | 'delivery'>('pickup');

  const handleChange = (type: 'pickup' | 'delivery') => {
    console.log('Selecting delivery type:', type);
    setSelectedDelivery(type);
  };

  return (
    <div className="space-y-4 pb-6 border-b border-[#E5E7EB]">
      <h2 className="text-2xl font-semibold leading-8 text-[#1F2937]">Địa điểm giao nhận xe</h2>
      
      <div className="space-y-3">
        {/* Option 1: Pickup */}
        <div 
          onClick={() => handleChange('pickup')}
          className="flex items-start gap-3 rounded-lg border-2 p-4 transition-all cursor-pointer"
          style={{
            borderColor: selectedDelivery === 'pickup' ? '#00A86B' : '#E5E7EB',
            backgroundColor: selectedDelivery === 'pickup' ? '#F0FAF6' : '#FFFFFF'
          }}>
          <div className="mt-1 h-4 w-4 rounded-full border-2 flex-shrink-0"
            style={{
              borderColor: selectedDelivery === 'pickup' ? '#00A86B' : '#E5E7EB',
              backgroundColor: selectedDelivery === 'pickup' ? '#00A86B' : 'transparent'
            }} />
          <div className="flex-1">
            <p className="text-sm leading-5 text-[#6B7280]">Tôi tự đến lấy xe</p>
            <p className="text-base leading-6 font-semibold text-[#1F2937] mt-1">{vehicle.location || 'Phường 17, Quận Bình Thạnh'}</p>
          </div>
        </div>

        {/* Option 2: Delivery */}
        <div 
          onClick={() => handleChange('delivery')}
          className="flex items-start gap-3 rounded-lg border-2 p-4 transition-all cursor-pointer"
          style={{
            borderColor: selectedDelivery === 'delivery' ? '#00A86B' : '#E5E7EB',
            backgroundColor: selectedDelivery === 'delivery' ? '#F0FAF6' : '#FFFFFF'
          }}>
          <div className="mt-1 h-4 w-4 rounded-full border-2 flex-shrink-0"
            style={{
              borderColor: selectedDelivery === 'delivery' ? '#00A86B' : '#E5E7EB',
              backgroundColor: selectedDelivery === 'delivery' ? '#00A86B' : 'transparent'
            }} />
          <div className="flex-1">
            <p className="text-sm leading-5 text-[#6B7280]">Tôi muốn được giao xe tại nơi</p>
            <p className="text-base leading-6 font-semibold text-[#1F2937] mt-1">S302 Vinhomes Grand Park</p>
           
          </div>
        </div>
      </div>
    </div>
  );
}
