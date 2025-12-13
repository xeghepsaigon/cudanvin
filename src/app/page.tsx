'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { HeroSearch } from '@/components/sections/HeroSearch';
import { FeaturedVehicles } from '@/components/sections/FeaturedVehicles';
import HeroSearchSkeleton from '@/components/sections/HeroSearchSkeleton';
import FeaturedVehiclesSkeleton from '@/components/sections/FeaturedVehiclesSkeleton';
import { FEATURED_VEHICLES } from '@/lib/constants/vehicles';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const userType: 'owner' | 'customer' | null = 'customer'; // Demo: customer

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (startDate: string, endDate: string) => {
    // TODO: Implement search with date params
    router.push(`/xe?startDate=${startDate}&endDate=${endDate}`);
  };

  const handleViewDetails = (vehicleSlug: string) => {
    router.push(`/xe/${vehicleSlug}`);
  };

  return (
    <div className="flex flex-col w-full bg-white">
      <Header userType={userType} />
      {isLoading ? (
        <>
          <HeroSearchSkeleton />
          <FeaturedVehiclesSkeleton />
        </>
      ) : (
        <>
          <HeroSearch onSearch={handleSearch} />
          <FeaturedVehicles vehicles={FEATURED_VEHICLES} onViewDetails={handleViewDetails} />
        </>
      )}
    </div>
  );
}
