export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  type: 'sedan' | 'suv' | 'mpv' | 'truck';
  seats: number;
  pricePerDay: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  kmLimit?: number;
  year?: number;
  fuelType?: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  transmission?: 'manual' | 'automatic';
  aircon?: boolean;
  features?: string[];
  ownerId: string;
  ownerName: string;
  ownerPhone?: string;
  ownerRating?: number;
  location?: string;
  originalPrice?: number;
  discount?: number;
  badges?: string[];
  createdAt: string;
  conditions?: {
    documents: string[];
    deposit: string;
    cancellationPolicy: string;
    insuranceIncluded?: boolean;
    fuelPolicy?: string;
  };
}

export interface Booking {
  id: string;
  vehicleId: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  startDate: string;
  endDate: string;
  notes?: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  totalPrice: number;
  deliveryType?: 'delivery' | 'pickup';
  deliveryLocation?: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: 'customer' | 'owner' | 'admin';
  createdAt: string;
}
