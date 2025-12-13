'use client';

import VehicleCard from '@/components/vehicle/VehicleCard';
import { Vehicle } from '@/lib/types/vehicle';

interface FeaturedVehiclesProps {
  vehicles: Vehicle[];
  onViewDetails?: (slug: string) => void;
}

export function FeaturedVehicles({ vehicles, onViewDetails }: FeaturedVehiclesProps) {
  return (
    <section className="w-full py-8 bg-[#F9FAFB]">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 className="text-2xl font-semibold leading-8 mb-6 text-[#1F2937] font-semibold">Xe nổi bật</h2>

        {/* Vehicle Grid */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              id={vehicle.id}
              slug={vehicle.slug}
              name={vehicle.name}
              image={vehicle.images[0]}
              pricePerDay={vehicle.pricePerDay}
              originalPrice={vehicle.originalPrice}
              discount={vehicle.discount}
              rating={vehicle.rating}
              reviewCount={vehicle.reviewCount}
              location={vehicle.location}
              seats={vehicle.seats}
              fuelType={vehicle.fuelType}
              transmission={vehicle.transmission}
              badges={vehicle.badges}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
