import { Vehicle } from '@/lib/types/vehicle';

// Mock data for featured vehicles
export const FEATURED_VEHICLES: Vehicle[] = [
  {
    id: '1',
    slug: 'toyota-vios-2022--a7x2',
    name: 'Toyota Vios',
    type: 'sedan',
    seats: 5,
    year: 2022,
    pricePerDay: 700000,
    originalPrice: 750000,
    discount: 7,
    rating: 4.8,
    reviewCount: 124,
    images: [
      'https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/hyundai_stargazer_2024/p/g/2025/06/20/15/wHvOQ3ZdpkYI2reY0Wz-kA.jpg',
      'https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/hyundai_stargazer_2024/p/g/2025/06/20/15/nZj4IPlmzl8tgbUtTBpTzQ.jpg',
      'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3effff991e?w=800&h=600&fit=crop'
    ],
    location: 'Phường 06, Quận Bình Thạnh',
    badges: ['Miễn thế chấp', 'Giao xe tại nơi'],
    description: 'Xe sedan kinh tế, phù hợp cho di chuyển hàng ngày trong thành phố. Tiêu thụ xăng thấp, dễ lái, phù hợp cho người mới.',
    kmLimit: 200,
    fuelType: 'petrol',
    transmission: 'automatic',
    aircon: true,
    features: ['ABS', 'Power Steering', 'Power Windows', 'Air Conditioning'],
    ownerId: 'owner-1',
    ownerName: 'Nguyễn Văn A',
    ownerPhone: '0901 234 567',
    ownerRating: 4.8,
    createdAt: '2024-01-15',
    conditions: {
      documents: ['CCCD', 'Bằng lái xe'],
      deposit: '5,000,000đ',
      cancellationPolicy: 'Miễn phí hủy trước 24 giờ',
      insuranceIncluded: true,
      fuelPolicy: 'Khách trả đầy bình xăng',
    },
  },
  {
    id: '2',
    slug: 'honda-crv-2023--b5y8',
    name: 'Honda CR-V',
    type: 'suv',
    seats: 5,
    year: 2023,
    pricePerDay: 1200000,
    originalPrice: 1300000,
    discount: 8,
    rating: 4.7,
    reviewCount: 89,
    images: [
      'https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/hyundai_stargazer_2024/p/g/2025/06/20/15/wHvOQ3ZdpkYI2reY0Wz-kA.jpg',
      'https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/hyundai_stargazer_2024/p/g/2025/06/20/15/nZj4IPlmzl8tgbUtTBpTzQ.jpg'
    ],
    location: 'Phường 01, Quận 1',
    badges: ['Miễn thế chấp', 'Giao xe tại nơi'],
    description: 'SUV 5 chỗ cao cấp với động cơ mạnh mẽ, thích hợp cho các chuyến du lịch đường dài. Tiêu hao xăng thấp, an toàn và tiện nghi.',
    kmLimit: 300,
    fuelType: 'petrol',
    transmission: 'automatic',
    aircon: true,
    features: ['ABS', 'Stability Control', 'Power Steering', 'Cruise Control', 'Bluetooth', 'Rear Camera'],
    ownerId: 'owner-2',
    ownerName: 'Trần Thị B',
    ownerPhone: '0902 345 678',
    ownerRating: 4.7,
    createdAt: '2024-02-10',
    conditions: {
      documents: ['CCCD', 'Bằng lái xe'],
      deposit: '7,000,000đ',
      cancellationPolicy: 'Miễn phí hủy trước 48 giờ',
      insuranceIncluded: true,
      fuelPolicy: 'Khách trả đầy bình xăng',
    },
  },
  {
    id: '3',
    slug: 'kia-sorento-2024--c9z3',
    name: 'Kia Sorento',
    type: 'suv',
    seats: 7,
    year: 2024,
    pricePerDay: 1500000,
    originalPrice: 1650000,
    discount: 9,
    rating: 4.9,
    reviewCount: 156,
    images: [
      'https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/hyundai_stargazer_2024/p/g/2025/06/20/15/wHvOQ3ZdpkYI2reY0Wz-kA.jpg',
      'https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/hyundai_stargazer_2024/p/g/2025/06/20/15/nZj4IPlmzl8tgbUtTBpTzQ.jpg',
      'https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/kia_carnival_premium_2022/p/g/2024/03/21/17/uvHGfaRmZem0nkFXKPOTXA.jpg'
    ],
    location: 'Phường 25, Quận Bình Thạnh',
    badges: ['Miễn thế chấp', 'Giao xe tại nơi'],
    description: 'SUV 7 chỗ hạng sang với thiết kế hiện đại, tiện nghi cao cấp. Phù hợp cho gia đình lớn hoặc các chuyến du lịch nhóm. Động cơ mạnh mẽ, an toàn, tiết kiệm xăng.',
    kmLimit: 350,
    fuelType: 'petrol',
    transmission: 'automatic',
    aircon: true,
    features: ['ABS', 'Stability Control', 'All Terrain Control', 'Panoramic Sunroof', 'Smart Key', 'Leather Seats', 'Rear Entertainment', 'Bluetooth', 'Backup Camera'],
    ownerId: 'owner-3',
    ownerName: 'Lê Văn C',
    ownerPhone: '0903 456 789',
    ownerRating: 4.9,
    createdAt: '2024-01-20',
    conditions: {
      documents: ['CCCD', 'Bằng lái xe', 'Hóa đơn'],
      deposit: '10,000,000đ',
      cancellationPolicy: 'Miễn phí hủy trước 48 giờ',
      insuranceIncluded: true,
      fuelPolicy: 'Khách trả đầy bình xăng',
    },
  },
  {
    id: '4',
    slug: 'hyundai-elantra-2023--d4m1',
    name: 'Hyundai Elantra',
    type: 'sedan',
    seats: 5,
    year: 2023,
    pricePerDay: 850000,
    originalPrice: 950000,
    discount: 10,
    rating: 4.6,
    reviewCount: 98,
    images: [
      'https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/hyundai_stargazer_2024/p/g/2025/06/20/15/wHvOQ3ZdpkYI2reY0Wz-kA.jpg',
      'https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/hyundai_stargazer_2024/p/g/2025/06/20/15/nZj4IPlmzl8tgbUtTBpTzQ.jpg'
    ],
    location: 'S106 Vinhomes Grand Park',
    badges: ['Miễn thế chấp', 'Giao xe tại nơi'],
    description: 'Sedan hiện đại với thiết kế trẻ trung, trang bị công nghệ tiên tiến. Lý tưởng cho các chuyến đi công tác hoặc du lịch ngắn ngày.',
    kmLimit: 250,
    fuelType: 'petrol',
    transmission: 'automatic',
    aircon: true,
    features: ['ABS', 'Traction Control', 'Power Steering', 'Touchscreen', 'Bluetooth', 'Reverse Camera'],
    ownerId: 'owner-4',
    ownerName: 'Phạm Văn D',
    ownerPhone: '0904 567 890',
    ownerRating: 4.6,
    createdAt: '2024-02-25',
    conditions: {
      documents: ['CCCD', 'Bằng lái xe'],
      deposit: '6,000,000đ',
      cancellationPolicy: 'Miễn phí hủy trước 24 giờ',
      insuranceIncluded: true,
      fuelPolicy: 'Khách trả đầy bình xăng',
    },
  },
];

export const VEHICLE_TYPES = [
  { value: 'sedan', label: 'Sedan' },
  { value: 'suv', label: 'SUV' },
  { value: 'mpv', label: 'MPV' },
  { value: 'truck', label: 'Xe tải' },
];

export const SEAT_OPTIONS = [2, 4, 5, 7, 9];

export const PRICE_RANGES = [
  { min: 0, max: 500000, label: 'Dưới 500K' },
  { min: 500000, max: 1000000, label: '500K - 1M' },
  { min: 1000000, max: 2000000, label: '1M - 2M' },
  { min: 2000000, max: Infinity, label: 'Trên 2M' },
];

export const BRANDS = [
  { value: 'toyota', label: 'Toyota', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/1968_Toyota_logo.svg/1200px-1968_Toyota_logo.svg.png' },
  { value: 'honda', label: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_logo.svg/1200px-Honda_logo.svg.png' },
  { value: 'kia', label: 'Kia', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Kia-Logo.svg/1200px-Kia-Logo.svg.png' },
  { value: 'hyundai', label: 'Hyundai', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Hyundai_Motor_Company_logo.svg/1200px-Hyundai_Motor_Company_logo.svg.png' },
  { value: 'mazda', label: 'Mazda', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Mazda_2008_logo.svg/1200px-Mazda_2008_logo.svg.png' },
  { value: 'ford', label: 'Ford', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Ford_Motor_Company_Logo.svg/1200px-Ford_Motor_Company_Logo.svg.png' },
  { value: 'mitsubishi', label: 'Mitsubishi', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Mitsubishi_Motors_logo.svg/1200px-Mitsubishi_Motors_logo.svg.png' },
  { value: 'nissan', label: 'Nissan', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Nissan_logo_%282013%29.svg/1200px-Nissan_logo_%282013%29.svg.png' },
  { value: 'mercedes', label: 'Mercedes-Benz', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Mercedes-Benz_logo.svg/1200px-Mercedes-Benz_logo.svg.png' },
];

export const FUEL_TYPES = [
  { value: 'petrol', label: 'Xăng' },
  { value: 'diesel', label: 'Dầu' },
  { value: 'electric', label: 'Điện' },
  { value: 'hybrid', label: 'Hybrid' },
];

export const TRANSMISSION_TYPES = [
  { value: 'automatic', label: 'Số tự động' },
  { value: 'manual', label: 'Số sàn' },
];

export const VEHICLE_CONDITIONS = [
  { value: 'new', label: 'Mới' },
  { value: 'excellent', label: 'Xuất sắc' },
  { value: 'good', label: 'Tốt' },
  { value: 'fair', label: 'Bình thường' },
];

