'use client';

import { Vehicle } from '@/lib/types/vehicle';

interface VehicleDocumentsProps {
  vehicle: Vehicle;
}

export function VehicleDocuments({ vehicle }: VehicleDocumentsProps) {
  return (
    <div className="space-y-4 pb-6 border-b border-[#E5E7EB]">
      <h2 className="text-2xl font-semibold leading-8 text-[#1F2937]">Giấy tọ thủ tục</h2>
      <div className="space-y-3 border-l-4 border-orange-400 pl-4">
        {vehicle.conditions?.documents && vehicle.conditions.documents.map((doc, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <span className="text-orange-400 font-bold mt-0.5">•</span>
            <span className="text-base text-[#6B7280]">{doc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
