// Mock data service for testing without Firebase
// This file provides mock implementations of vehicle and booking services

import type { Vehicle } from '@/lib/services/vehicleService'
import type { Booking } from '@/lib/services/bookingService'

// Mock vehicles
const mockVehicles: Vehicle[] = [
  {
    id: 'v1',
    name: 'Toyota Vios 2023',
    brand: 'Toyota',
    model: 'Vios',
    year: 2023,
    seats: 4,
    fuelType: 'gasoline',
    transmission: 'automatic',
    mileage: 15000,
    pricePerDay: 500000,
    location: 'Quận 1, TP.HCM',
    description: 'Xe gia đình mới, chạy rất êm, an toàn và tiết kiệm xăng',
    amenities: [
      '❄️ Điều hòa tự động / đa vùng',
      '🛋️ Ghế da',
      '🔋 Cổng sạc USB / Type-C',
      '🔗 Kết nối Bluetooth',
      '💡 Cảm biến ánh sáng / gạt mưa tự động',
      '🛑 Phanh ABS / EBD / BA',
      '💨 Túi khí (trước, bên, rèm)',
      '📷 Camera sau / 360',
    ],
    images: ['https://images.unsplash.com/photo-1552519507-da3effff991c?w=400'],
    ownerId: 'owner-1',
    isActive: true,
    rating: 4.8,
    reviewCount: 24,
  },
  {
    id: 'v2',
    name: 'Honda Civic 2022',
    brand: 'Honda',
    model: 'Civic',
    year: 2022,
    seats: 5,
    fuelType: 'gasoline',
    transmission: 'automatic',
    mileage: 28000,
    pricePerDay: 650000,
    location: 'Quận 7, TP.HCM',
    description: 'Sedan sang trọng, hiện đại, phù hợp cho chuyên gia',
    amenities: [
      '❄️ Điều hòa tự động / đa vùng',
      '🛋️ Ghế da',
      '⚡ Ghế chỉnh điện',
      '🔋 Cổng sạc USB / Type-C',
      '📱 Màn hình giải trí Android / Apple CarPlay',
      '🎵 Hệ thống âm thanh cao cấp (BOSE/Infinity)',
      '🔗 Kết nối Bluetooth',
      '🚗 Điều khiển hành trình (Cruise Control)',
      '⚠️ Cảnh báo lệch làn đường',
      '🚨 Cảnh báo va chạm phía trước + phanh tự động',
      '📹 Camera 360° / camera lùi',
      '📡 Cảm biến trước sau',
      '🗺️ Bản đồ GPS onboard',
      '🔗 Apple CarPlay / Android Auto (dẫn đường)',
    ],
    images: ['https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400'],
    ownerId: 'owner-1',
    isActive: true,
    rating: 4.9,
    reviewCount: 35,
  },
  {
    id: 'v3',
    name: 'Hyundai Elantra 2021',
    brand: 'Hyundai',
    model: 'Elantra',
    year: 2021,
    seats: 5,
    fuelType: 'gasoline',
    transmission: 'manual',
    mileage: 35000,
    pricePerDay: 450000,
    location: 'Quận 3, TP.HCM',
    description: 'Xe tiết kiệm, bền bỉ, phù hợp cho người mới lái',
    amenities: [
      '❄️ Điều hòa tự động / đa vùng',
      '🔋 Cổng sạc USB / Type-C',
      '🔗 Kết nối Bluetooth',
      '💡 Cảm biến ánh sáng / gạt mưa tự động',
      '🛑 Phanh ABS / EBD / BA',
      '💨 Túi khí (trước, bên, rèm)',
      '📷 Camera sau / 360',
      '🗺️ Bản đồ GPS onboard',
    ],
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
    ownerId: 'owner-1',
    isActive: true,
    rating: 4.7,
    reviewCount: 18,
  },
]

// Mock bookings
const mockBookings: Booking[] = [
  {
    id: 'b1',
    vehicleId: 'v1',
    vehicleName: 'Toyota Vios 2023',
    customerId: 'customer-1',
    customerName: 'Nguyễn Văn A',
    startDate: '2024-12-15',
    endDate: '2024-12-17',
    totalPrice: 1000000,
    status: 'pending',
    notes: 'Cần giao xe sáng sớm',
  },
  {
    id: 'b2',
    vehicleId: 'v2',
    vehicleName: 'Honda Civic 2022',
    customerId: 'customer-2',
    customerName: 'Trần Thị B',
    startDate: '2024-12-20',
    endDate: '2024-12-22',
    totalPrice: 1300000,
    status: 'pending',
    notes: '',
  },
  {
    id: 'b3',
    vehicleId: 'v1',
    vehicleName: 'Toyota Vios 2023',
    customerId: 'customer-3',
    customerName: 'Lê Minh C',
    startDate: '2024-12-10',
    endDate: '2024-12-12',
    totalPrice: 1000000,
    status: 'approved',
    notes: '',
  },
]

// Mock vehicle service
export async function getOwnerVehicles(ownerId: string): Promise<Vehicle[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockVehicles.filter(v => v.ownerId === ownerId))
    }, 500)
  })
}

export async function getVehicleById(vehicleId: string): Promise<Vehicle | null> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockVehicles.find(v => v.id === vehicleId) || null)
    }, 300)
  })
}

export async function getFeaturedVehicles(limit: number = 10): Promise<Vehicle[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockVehicles.slice(0, limit))
    }, 500)
  })
}

export async function addVehicle(vehicle: Omit<Vehicle, 'id'>, imageFiles?: File[]): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      const newId = `v${Date.now()}`
      resolve(newId)
    }, 1000)
  })
}

export async function updateVehicle(vehicleId: string, updates: Partial<Vehicle>, newImageFiles?: File[]): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      const vehicle = mockVehicles.find(v => v.id === vehicleId)
      if (vehicle) {
        Object.assign(vehicle, updates)
      }
      resolve()
    }, 800)
  })
}

export async function deleteVehicle(vehicleId: string): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      const index = mockVehicles.findIndex(v => v.id === vehicleId)
      if (index > -1) {
        mockVehicles.splice(index, 1)
      }
      resolve()
    }, 800)
  })
}

export async function searchVehicles(searchTerm: string): Promise<Vehicle[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      const lowerSearchTerm = searchTerm.toLowerCase()
      const results = mockVehicles.filter(
        v =>
          v.name.toLowerCase().includes(lowerSearchTerm) ||
          v.brand.toLowerCase().includes(lowerSearchTerm) ||
          v.location.toLowerCase().includes(lowerSearchTerm)
      )
      resolve(results)
    }, 500)
  })
}

// Mock booking service
export async function getOwnerBookings(ownerId: string): Promise<Booking[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      // For mock, we'll filter by a property that would exist if implemented
      resolve(mockBookings)
    }, 500)
  })
}

export async function getPendingBookings(ownerId: string): Promise<Booking[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockBookings.filter(b => b.status === 'pending'))
    }, 500)
  })
}

export async function getApprovedBookings(ownerId: string): Promise<Booking[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockBookings.filter(b => b.status === 'approved'))
    }, 500)
  })
}

export async function addBooking(booking: Omit<Booking, 'id'>): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      const newId = `b${Date.now()}`
      resolve(newId)
    }, 800)
  })
}

export async function updateBookingStatus(bookingId: string, status: Booking['status']): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      const booking = mockBookings.find(b => b.id === bookingId)
      if (booking) {
        booking.status = status
      }
      resolve()
    }, 800)
  })
}

export async function updateBooking(bookingId: string, updates: Partial<Booking>): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      const booking = mockBookings.find(b => b.id === bookingId)
      if (booking) {
        Object.assign(booking, updates)
      }
      resolve()
    }, 800)
  })
}

export async function deleteBooking(bookingId: string): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      const index = mockBookings.findIndex(b => b.id === bookingId)
      if (index > -1) {
        mockBookings.splice(index, 1)
      }
      resolve()
    }, 800)
  })
}

export async function checkVehicleAvailability(
  vehicleId: string,
  startDate: string,
  endDate: string
): Promise<boolean> {
  return new Promise(resolve => {
    setTimeout(() => {
      const start = new Date(startDate).getTime()
      const end = new Date(endDate).getTime()

      const isAvailable = !mockBookings.some(b => {
        if (b.vehicleId !== vehicleId || !['approved', 'pending'].includes(b.status)) return false
        const bookingStart = new Date(b.startDate).getTime()
        const bookingEnd = new Date(b.endDate).getTime()
        return start < bookingEnd && end > bookingStart
      })

      resolve(isAvailable)
    }, 300)
  })
}

export async function calculateRevenue(
  ownerId: string,
  startDate?: Date,
  endDate?: Date
): Promise<number> {
  return new Promise(resolve => {
    setTimeout(() => {
      const revenue = mockBookings
        .filter(b => b.status === 'approved')
        .reduce((sum, b) => sum + b.totalPrice, 0)
      resolve(revenue)
    }, 500)
  })
}
