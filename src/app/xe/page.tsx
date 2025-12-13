'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Car, Fuel, Zap, Battery, Building, Truck } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import FilterModal from '@/components/ui/FilterModal';
import TransmissionIcon from '@/components/ui/TransmissionIcon';
import ChargingStationIcon from '@/components/ui/ChargingStationIcon';
import EngineIcon from '@/components/ui/EngineIcon';
import VehicleCard from '@/components/vehicle/VehicleCard';
import VehicleCardSkeleton from '@/components/vehicle/VehicleCardSkeleton';
import { FEATURED_VEHICLES, VEHICLE_TYPES, SEAT_OPTIONS, PRICE_RANGES, BRANDS, FUEL_TYPES, TRANSMISSION_TYPES } from '@/lib/constants/vehicles';
import { Vehicle } from '@/lib/types/vehicle';

interface FilterState {
  type: string[];
  seats: number[];
  priceRange: string;
  brand: string[];
  fuelType: string[];
  transmission: string[];
  searchDate?: { startDate?: string; endDate?: string };
}

export default function VehiclesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  const [filters, setFilters] = useState<FilterState>({
    type: [],
    seats: [],
    priceRange: '',
    brand: [],
    fuelType: [],
    transmission: [],
    searchDate: { startDate, endDate: endDate } || undefined,
  });

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const [showFilters, setShowFilters] = useState(false);
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);

  const filteredVehicles = FEATURED_VEHICLES.filter((vehicle) => {
    if (filters.type.length > 0 && !filters.type.includes(vehicle.type)) return false;
    if (filters.seats.length > 0 && !filters.seats.includes(vehicle.seats)) return false;
    if (filters.brand.length > 0 && !filters.brand.includes(vehicle.name.split(' ')[0].toLowerCase())) return false;
    if (filters.fuelType.length > 0 && !filters.fuelType.includes(vehicle.fuelType)) return false;
    if (filters.transmission.length > 0 && !filters.transmission.includes(vehicle.transmission)) return false;

    if (filters.priceRange) {
      const range = PRICE_RANGES.find((r) => r.label === filters.priceRange);
      if (range && (vehicle.pricePerDay < range.min || vehicle.pricePerDay > range.max)) {
        return false;
      }
    }

    return true;
  });

  const handleTypeChange = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      type: prev.type.includes(type) ? prev.type.filter((t) => t !== type) : [...prev.type, type],
    }));
    // Auto open brand filter after selecting type
    setTimeout(() => setExpandedFilter('brand'), 300);
  };

  const handleBrandChange = (brand: string) => {
    setFilters((prev) => ({
      ...prev,
      brand: prev.brand.includes(brand) ? prev.brand.filter((b) => b !== brand) : [...prev.brand, brand],
    }));
    // Auto open fuel type filter after selecting brand
    setTimeout(() => setExpandedFilter('fuel'), 300);
  };

  const handleFuelTypeChange = (fuelType: string) => {
    setFilters((prev) => ({
      ...prev,
      fuelType: prev.fuelType.includes(fuelType) ? prev.fuelType.filter((f) => f !== fuelType) : [...prev.fuelType, fuelType],
    }));
    // Auto open transmission filter after selecting fuel type
    setTimeout(() => setExpandedFilter('transmission'), 300);
  };

  const handleTransmissionChange = (transmission: string) => {
    setFilters((prev) => ({
      ...prev,
      transmission: prev.transmission.includes(transmission) ? prev.transmission.filter((t) => t !== transmission) : [...prev.transmission, transmission],
    }));
  };

  const handleSeatsChange = (seats: number) => {
    setFilters((prev) => ({
      ...prev,
      seats: prev.seats.includes(seats) ? prev.seats.filter((s) => s !== seats) : [...prev.seats, seats],
    }));
  };

  const handleViewDetails = (vehicleSlug: string) => {
    router.push(`/xe/${vehicleSlug}`);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <Header />

      <div className="flex-1">
        {/* Filter Bar with Dropdowns - Full Width Sticky */}
        <div className="sticky top-14 z-40 border-b border-[#E5E7EB] bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="flex items-center gap-2 flex-wrap p-3 overflow-x-auto">
              {/* Type Filter Button */}
              <button
                onClick={() => setExpandedFilter(expandedFilter === 'type' ? null : 'type')}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-base font-medium transition ${
                  filters.type.length > 0
                    ? 'border-[#00A86B] bg-green-50 text-[#00A86B]'
                    : 'border-[#E5E7EB] text-[#1F2937] hover:bg-[#F9FAFB]'
                }`}
              >
                <Car size={18} />
                <span>Loại xe</span>
              </button>

              {/* Brand Filter Button */}
              <button
                onClick={() => setExpandedFilter(expandedFilter === 'brand' ? null : 'brand')}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-base font-medium transition ${
                  filters.brand.length > 0
                    ? 'border-[#00A86B] bg-green-50 text-[#00A86B]'
                    : 'border-[#E5E7EB] text-[#1F2937] hover:bg-[#F9FAFB]'
                }`}
              >
                <Building size={18} />
                <span>Hãng xe</span>
              </button>

              {/* Fuel Type Filter Button */}
              <button
                onClick={() => setExpandedFilter(expandedFilter === 'fuel' ? null : 'fuel')}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-base font-medium transition ${
                  filters.fuelType.length > 0
                    ? 'border-[#00A86B] bg-green-50 text-[#00A86B]'
                    : 'border-[#E5E7EB] text-[#1F2937] hover:bg-[#F9FAFB]'
                }`}
              >
                <EngineIcon size={18} />
                <span>Động cơ</span>
              </button>

              {/* Transmission Filter Button */}
              <button
                onClick={() => setExpandedFilter(expandedFilter === 'transmission' ? null : 'transmission')}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-base font-medium transition ${
                  filters.transmission.length > 0
                    ? 'border-[#00A86B] bg-green-50 text-[#00A86B]'
                    : 'border-[#E5E7EB] text-[#1F2937] hover:bg-[#F9FAFB]'
                }`}
              >
                <TransmissionIcon size={18} />
                <span>Hộp số</span>
              </button>

              {/* Reset Button */}
              {(filters.type.length > 0 || filters.brand.length > 0 || filters.fuelType.length > 0 || filters.transmission.length > 0) && (
                <button
                  onClick={() => {
                    setFilters({ type: [], seats: [], priceRange: '', brand: [], fuelType: [], transmission: [] });
                    setExpandedFilter(null);
                  }}
                  className="ml-auto flex-shrink-0 whitespace-nowrap rounded-lg border border-[#E5E7EB] px-4 py-2 text-sm font-medium text-[#1F2937] hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition"
                >
                  Xóa tất cả
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Modals */}
        {/* Type Filter Modal */}
        {expandedFilter === 'type' && (
          <FilterModal title="Loại xe" onClose={() => setExpandedFilter(null)}>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {VEHICLE_TYPES.map((type) => {
                const count = FEATURED_VEHICLES.filter(v => v.type === type.value).length;
                const isSelected = filters.type.includes(type.value);
                return (
                  <button
                    key={type.value}
                    onClick={() => handleTypeChange(type.value)}
                    className={`p-4 rounded-full border-2 transition-all text-center ${
                      isSelected
                        ? 'border-[#00A86B] bg-green-50'
                        : 'border-[#E5E7EB] hover:border-[#00A86B] bg-white'
                    }`}
                  >
                    <div className="flex justify-center mb-2">
                      {type.value === 'truck' ? (
                        <Truck size={32} className="text-[#1F2937]" />
                      ) : (
                        <Car size={32} className="text-[#1F2937]" />
                      )}
                    </div>
                    <div className="font-semibold text-lg text-[#1F2937]">{type.label}</div>
                    <div className="text-sm text-[#6B7280] mt-1">{count}+ xe</div>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setExpandedFilter(null)}
              className="w-full rounded-lg bg-[#00A86B] py-3 text-base leading-5 font-semibold text-white hover:bg-[#008F5A] transition"
            >
              Áp dụng
            </button>
          </FilterModal>
        )}

        {/* Brand Filter Modal */}
        {expandedFilter === 'brand' && (
          <FilterModal title="Hãng xe" onClose={() => setExpandedFilter(null)}>
            <div className="grid grid-cols-4 gap-3 mb-6">
              {BRANDS.map((brand) => {
                const count = FEATURED_VEHICLES.filter(v => 
                  v.name.split(' ')[0].toLowerCase() === brand.value
                ).length;
                const isSelected = filters.brand.includes(brand.value);
                return (
                  <button
                    key={brand.value}
                    onClick={() => handleBrandChange(brand.value)}
                    className={`p-3 rounded-full border-2 transition-all text-center ${
                      isSelected
                        ? 'border-[#00A86B] bg-green-50'
                        : 'border-[#E5E7EB] hover:border-[#00A86B] bg-white'
                    }`}
                  >
                    <div className="flex justify-center mb-2">
                      <Building size={24} className="text-[#1F2937]" />
                    </div>
                    <div className="font-semibold text-base text-[#1F2937]">{brand.label}</div>
                    <div className="text-sm text-[#6B7280] mt-1">{count}+ xe</div>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setExpandedFilter(null)}
              className="w-full rounded-lg bg-[#00A86B] py-3 text-base leading-5 font-semibold text-white hover:bg-[#008F5A] transition mt-4"
            >
              Áp dụng
            </button>
          </FilterModal>
        )}

        {/* Fuel Type Filter Modal */}
        {expandedFilter === 'fuel' && (
          <FilterModal title="Loại xăng" onClose={() => setExpandedFilter(null)}>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {FUEL_TYPES.map((fuel) => {
                const count = FEATURED_VEHICLES.filter(v => v.fuelType === fuel.value).length;
                const isSelected = filters.fuelType.includes(fuel.value);
                return (
                  <button
                    key={fuel.value}
                    onClick={() => handleFuelTypeChange(fuel.value)}
                    className={`p-4 rounded-full border-2 transition-all text-center ${
                      isSelected
                        ? 'border-[#00A86B] bg-green-50'
                        : 'border-[#E5E7EB] hover:border-[#00A86B] bg-white'
                    }`}
                  >
                    <div className="flex justify-center mb-2">
                      <EngineIcon size={32} className="text-[#1F2937]" />
                    </div>
                    <div className="font-semibold text-lg text-[#1F2937]">{fuel.label}</div>
                    <div className="text-sm text-[#6B7280] mt-1">{count}+ xe</div>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setExpandedFilter(null)}
              className="w-full rounded-lg bg-[#00A86B] py-3 text-base leading-5 font-semibold text-white hover:bg-[#008F5A] transition mt-4"
            >
              Áp dụng
            </button>
          </FilterModal>
        )}

        {/* Transmission Filter Modal */}
        {expandedFilter === 'transmission' && (
          <FilterModal title="Hộp số" onClose={() => setExpandedFilter(null)}>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {TRANSMISSION_TYPES.map((transmission) => {
                const count = FEATURED_VEHICLES.filter(v => v.transmission === transmission.value).length;
                const isSelected = filters.transmission.includes(transmission.value);
                return (
                  <button
                    key={transmission.value}
                    onClick={() => handleTransmissionChange(transmission.value)}
                    className={`p-4 rounded-full border-2 transition-all text-center ${
                      isSelected
                        ? 'border-[#00A86B] bg-green-50'
                        : 'border-[#E5E7EB] hover:border-[#00A86B] bg-white'
                    }`}
                  >
                    <div className="flex justify-center mb-2">
                      <TransmissionIcon size={32} className="text-[#1F2937]" />
                    </div>
                    <div className="font-semibold text-lg text-[#1F2937]">{transmission.label}</div>
                    <div className="text-sm text-[#6B7280] mt-1">{count}+ xe</div>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setExpandedFilter(null)}
              className="w-full rounded-lg bg-[#00A86B] py-3 text-base leading-5 font-semibold text-white hover:bg-[#008F5A] transition mt-4"
            >
              Áp dụng
            </button>
          </FilterModal>
        )}

        <div className="mx-auto max-w-7xl px-4 md:px-8 py-6">
          {/* Results Count */}
          {!isLoading && (
            <div className="mb-4 text-xs leading-4 text-[#6B7280]">
              Tìm thấy {filteredVehicles.length} xe
            </div>
          )}

          {/* Vehicle Grid */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {isLoading ? (
              // Show skeleton loading
              Array.from({ length: 6 }).map((_, i) => (
                <VehicleCardSkeleton key={`skeleton-${i}`} />
              ))
            ) : (
              // Show actual vehicles
              filteredVehicles.map((vehicle) => (
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
                onViewDetails={handleViewDetails}
              />
              ))
            )}
          </div>

          {/* Empty State */}
          {filteredVehicles.length === 0 && (
            <div className="flex min-h-64 items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#F9FAFB]">
              <div className="text-center">
                <p className="text-base leading-5 text-[#6B7280]">Không có xe nào phù hợp</p>
                <button
                  onClick={() => setFilters({ type: [], seats: [], priceRange: '', brand: [], fuelType: [], transmission: [] })}
                  className="mt-2 text-sm leading-4 font-medium text-[#00A86B] hover:text-[#008F5A]"
                >
                  Xóa bộ lọc
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
