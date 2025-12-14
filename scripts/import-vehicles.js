#!/usr/bin/env node

/**
 * Script to import sample vehicles into Firestore
 * Usage: node scripts/import-vehicles.js
 */

const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin
const serviceAccountPath = path.join(__dirname, '../serviceAccountKey.json');

try {
  const serviceAccount = require(serviceAccountPath);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  console.error('❌ Error loading serviceAccountKey.json');
  console.error('Please download it from Firebase Console > Project Settings > Service Accounts');
  process.exit(1);
}

const db = admin.firestore();

// Sample vehicles data
const vehiclesData = [
  {
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
    description: 'Xe gia đình mới, chạy rất êm, an toàn và tiết kiệm xăng. Tặng kèm bảo hiểm toàn diện.',
    amenities: ['🎵 Hệ thống âm thanh', '❄️ Điều hòa nhiệt độ', '📱 Kết nối Bluetooth', '🅿️ Hỗ trợ đỗ xe'],
    images: ['https://images.unsplash.com/photo-1552519507-da3effff991c?w=500&h=400&fit=crop'],
    ownerId: 'owner-1',
    isActive: true,
    rating: 4.8,
    reviewCount: 24,
  },
  {
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
    description: 'Sedan sang trọng, hiện đại, phù hợp cho chuyên gia và doanh nhân. Trang bị công nghệ mới.',
    amenities: ['🎵 Hệ thống âm thanh', '❄️ Điều hòa nhiệt độ', '📱 Kết nối Bluetooth', '🔋 Sạc điện thoại', '🗺️ GPS'],
    images: ['https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=500&h=400&fit=crop'],
    ownerId: 'owner-1',
    isActive: true,
    rating: 4.9,
    reviewCount: 35,
  },
  {
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
    description: 'Xe tiết kiệm, bền bỉ, phù hợp cho người mới lái. Bảo dưỡng định kỳ thường xuyên.',
    amenities: ['❄️ Điều hòa nhiệt độ', '📱 Kết nối Bluetooth'],
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop'],
    ownerId: 'owner-1',
    isActive: true,
    rating: 4.7,
    reviewCount: 18,
  },
  {
    name: 'Mazda CX-5 2023',
    brand: 'Mazda',
    model: 'CX-5',
    year: 2023,
    seats: 5,
    fuelType: 'gasoline',
    transmission: 'automatic',
    mileage: 8000,
    pricePerDay: 750000,
    location: 'Quận 2, TP.HCM',
    description: 'SUV 5 chỗ sang trọng, thoải mái, an toàn. Lý tưởng cho gia đình nhỏ và du lịch.',
    amenities: ['🎵 Hệ thống âm thanh', '❄️ Điều hòa nhiệt độ', '📱 Kết nối Bluetooth', '🔋 Sạc điện thoại', '🗺️ GPS', '📹 Camera lùi'],
    images: ['https://images.unsplash.com/photo-1605559424843-9e4c3ca6917d?w=500&h=400&fit=crop'],
    ownerId: 'owner-1',
    isActive: true,
    rating: 4.9,
    reviewCount: 42,
  },
  {
    name: 'Ford Focus 2020',
    brand: 'Ford',
    model: 'Focus',
    year: 2020,
    seats: 5,
    fuelType: 'gasoline',
    transmission: 'automatic',
    mileage: 45000,
    pricePerDay: 550000,
    location: 'Quận 9, TP.HCM',
    description: 'Hatchback linh hoạt, dễ lái, phù hợp cho đô thị. Rất tốn nhiên liệu.',
    amenities: ['❄️ Điều hòa nhiệt độ', '🗺️ GPS'],
    images: ['https://images.unsplash.com/photo-1552519507-da3effff991c?w=500&h=400&fit=crop'],
    ownerId: 'owner-1',
    isActive: true,
    rating: 4.6,
    reviewCount: 12,
  },
  {
    name: 'Kia Sportage 2023',
    brand: 'Kia',
    model: 'Sportage',
    year: 2023,
    seats: 5,
    fuelType: 'gasoline',
    transmission: 'automatic',
    mileage: 5000,
    pricePerDay: 700000,
    location: 'Quận 4, TP.HCM',
    description: 'SUV nhỏ gọn, hiện đại, tiết kiệm xăng. Bảo hành 3 năm hoặc 100,000 km.',
    amenities: ['🎵 Hệ thống âm thanh', '❄️ Điều hòa nhiệt độ', '📱 Kết nối Bluetooth', '🔋 Sạc điện thoại', '🛡️ Hệ thống an toàn'],
    images: ['https://images.unsplash.com/photo-1606664515524-2ddc6298996f?w=500&h=400&fit=crop'],
    ownerId: 'owner-1',
    isActive: true,
    rating: 4.8,
    reviewCount: 29,
  },
];

async function importVehicles() {
  console.log('🚀 Starting vehicle import...\n');

  try {
    const vehiclesRef = db.collection('vehicles');
    const timestamp = admin.firestore.Timestamp.now();

    for (let i = 0; i < vehiclesData.length; i++) {
      const vehicle = {
        ...vehiclesData[i],
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      await vehiclesRef.add(vehicle);
      console.log(`  ✅ ${vehicle.name}`);
    }

    console.log(`\n✓ Imported ${vehiclesData.length} vehicles successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing vehicles:', error);
    process.exit(1);
  }
}

importVehicles();
