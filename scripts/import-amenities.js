#!/usr/bin/env node

/**
 * Script to import vehicle amenities into Firestore
 * Usage: node scripts/import-amenities.js
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

// Vehicle amenities data
const amenitiesData = [
  // 🏠 Nội thất & Trải nghiệm hành khách
  {
    id: 'amenity-ac-multi-zone',
    name: '❄️ Điều hòa tự động / đa vùng',
    icon: '❄️',
    category: 'interior',
    description: 'Điều hòa tự động đa vùng, kiểm soát nhiệt độ riêng biệt',
  },
  {
    id: 'amenity-leather-seat',
    name: '🛋️ Ghế da',
    icon: '🛋️',
    category: 'interior',
    description: 'Ghế bọc da cao cấp, dễ vệ sinh',
  },
  {
    id: 'amenity-power-seat',
    name: '⚡ Ghế chỉnh điện',
    icon: '⚡',
    category: 'interior',
    description: 'Ghế trước chỉnh điện 8-10 hướng',
  },
  {
    id: 'amenity-seat-heating-cooling',
    name: '🔥 Ghế có sưởi / làm mát',
    icon: '🔥',
    category: 'interior',
    description: 'Ghế trước sưởi và làm mát điều chỉnh được',
  },
  {
    id: 'amenity-usb-charger',
    name: '🔋 Cổng sạc USB / Type-C',
    icon: '🔋',
    category: 'interior',
    description: 'Cổng sạc USB và USB Type-C phía trước và sau',
  },
  {
    id: 'amenity-push-button-start',
    name: '🔘 Khởi động nút bấm',
    icon: '🔘',
    category: 'interior',
    description: 'Khởi động xe bằng nút bấm, không cần chìa khóa',
  },
  {
    id: 'amenity-infotainment',
    name: '📱 Màn hình giải trí Android / Apple CarPlay',
    icon: '📱',
    category: 'interior',
    description: 'Màn hình giải trí với hỗ trợ Apple CarPlay, Android Auto',
  },
  {
    id: 'amenity-premium-audio',
    name: '🎵 Hệ thống âm thanh cao cấp (BOSE/Infinity)',
    icon: '🎵',
    category: 'interior',
    description: 'Hệ thống âm thanh cao cấp BOSE hoặc Infinity',
  },
  {
    id: 'amenity-bluetooth',
    name: '🔗 Kết nối Bluetooth',
    icon: '🔗',
    category: 'interior',
    description: 'Kết nối Bluetooth để nghe nhạc và nhận cuộc gọi',
  },
  {
    id: 'amenity-cruise-control',
    name: '🚗 Điều khiển hành trình (Cruise Control)',
    icon: '🚗',
    category: 'interior',
    description: 'Cruise Control điều chỉnh tốc độ tự động',
  },
  {
    id: 'amenity-auto-light-wiper',
    name: '💡 Cảm biến ánh sáng / gạt mưa tự động',
    icon: '💡',
    category: 'interior',
    description: 'Đèn tự động và gạt mưa tự động theo mưa',
  },
  {
    id: 'amenity-rear-vents',
    name: '🌬️ Cửa gió ghế sau',
    icon: '🌬️',
    category: 'interior',
    description: 'Cửa gió riêng biệt phía ghế sau',
  },
  {
    id: 'amenity-storage-large',
    name: '📦 Khay để đồ cỡ lớn / ngăn lạnh',
    icon: '📦',
    category: 'interior',
    description: 'Khay để đồ cỡ lớn và ngăn lạnh giữ nóng/lạnh',
  },

  // 🧳 Dung tích & tiện ích chứa đồ
  {
    id: 'amenity-large-trunk',
    name: '🧳 Khoang hành lý lớn',
    icon: '🧳',
    category: 'storage',
    description: 'Khoang hành lý rộng rãi với dung tích lớn',
  },
  {
    id: 'amenity-foldable-seat',
    name: '📐 Hàng ghế thứ 2 / thứ 3 gập được',
    icon: '📐',
    category: 'storage',
    description: 'Ghế phía sau gập được để mở rộng khoang chứa',
  },
  {
    id: 'amenity-power-trunk',
    name: '🔓 Cốp mở điện / cốp rảnh tay',
    icon: '🔓',
    category: 'storage',
    description: 'Cốp mở bằng điều khiển từ xa hoặc chân quét',
  },
  {
    id: 'amenity-roof-rack',
    name: '🚙 Giá nóc / thanh nóc',
    icon: '🚙',
    category: 'storage',
    description: 'Giá nóc hoặc thanh nóc để chở đồ thêm',
  },
  {
    id: 'amenity-isofix',
    name: '👶 Móc ghế child seat ISOFIX',
    icon: '👶',
    category: 'storage',
    description: 'Móc ISOFIX chuẩn để lắp ghế trẻ em an toàn',
  },

  // 🛡️ An toàn & hỗ trợ lái
  {
    id: 'amenity-abs-brake',
    name: '🛑 Phanh ABS / EBD / BA',
    icon: '🛑',
    category: 'safety',
    description: 'Hệ thống phanh ABS, EBD, hỗ trợ phanh khẩn cấp',
  },
  {
    id: 'amenity-esc',
    name: '⚖️ Ổn định thân xe (ESC / VSC)',
    icon: '⚖️',
    category: 'safety',
    description: 'Kiểm soát ổn định thân xe ESC/VSC',
  },
  {
    id: 'amenity-lane-warning',
    name: '⚠️ Cảnh báo lệch làn đường',
    icon: '⚠️',
    category: 'safety',
    description: 'Cảnh báo khi xe lệch khỏi làn đường',
  },
  {
    id: 'amenity-lane-keep',
    name: '🛣️ Hỗ trợ giữ làn đường',
    icon: '🛣️',
    category: 'safety',
    description: 'Tự động giữ xe ở giữa làn đường',
  },
  {
    id: 'amenity-blind-spot-warning',
    name: '👁️ Cảnh báo điểm mù',
    icon: '👁️',
    category: 'safety',
    description: 'Cảnh báo khi có xe ở điểm mù',
  },
  {
    id: 'amenity-collision-warning',
    name: '🚨 Cảnh báo va chạm phía trước + phanh tự động',
    icon: '🚨',
    category: 'safety',
    description: 'Phát hiện va chạm phía trước và phanh tự động',
  },
  {
    id: 'amenity-360-camera',
    name: '📹 Camera 360° / camera lùi',
    icon: '📹',
    category: 'safety',
    description: 'Camera toàn cảnh 360° hoặc camera lùi',
  },
  {
    id: 'amenity-parking-sensors',
    name: '📡 Cảm biến trước sau',
    icon: '📡',
    category: 'safety',
    description: 'Cảm biến tránh va chạm phía trước và sau',
  },
  {
    id: 'amenity-adaptive-cruise',
    name: '🚗 Cruise Control thích ứng',
    icon: '🚗',
    category: 'safety',
    description: 'Cruise Control thích ứng (ACC) tự động điều chỉnh tốc độ',
  },
  {
    id: 'amenity-airbags',
    name: '💨 Túi khí (trước, bên, rèm)',
    icon: '💨',
    category: 'safety',
    description: 'Túi khí toàn bộ (trước, bên, rèm)',
  },
  {
    id: 'amenity-child-lock',
    name: '🔒 Khóa trẻ em',
    icon: '🔒',
    category: 'safety',
    description: 'Khóa cửa phía sau để bảo vệ trẻ em',
  },
  {
    id: 'amenity-slope-assist',
    name: '⛰️ Hỗ trợ khởi hành ngang dốc / xuống dốc',
    icon: '⛰️',
    category: 'safety',
    description: 'Hỗ trợ khởi hành trên dốc và kiểm soát xuống dốc',
  },

  // 🅿️ Tiện ích đỗ xe & di chuyển
  {
    id: 'amenity-rear-camera',
    name: '📷 Camera sau / 360',
    icon: '📷',
    category: 'parking',
    description: 'Camera lùi hoặc camera toàn cảnh 360°',
  },
  {
    id: 'amenity-parking-assist',
    name: '🅿️ Cảm biến đỗ xe',
    icon: '🅿️',
    category: 'parking',
    description: 'Cảm biến đỗ xe phát hiện chỗ đỗ phù hợp',
  },
  {
    id: 'amenity-gps-map',
    name: '🗺️ Bản đồ GPS onboard',
    icon: '🗺️',
    category: 'parking',
    description: 'Bản đồ GPS lưu trữ trong xe, không cần kết nối',
  },
  {
    id: 'amenity-navigation',
    name: '📍 Hệ thống định vị / điều hướng',
    icon: '📍',
    category: 'parking',
    description: 'Hệ thống định vị và điều hướng đầy đủ',
  },
  {
    id: 'amenity-carplay-google',
    name: '🔗 Apple CarPlay / Android Auto (dẫn đường)',
    icon: '🔗',
    category: 'parking',
    description: 'Apple CarPlay / Android Auto tích hợp dẫn đường',
  },
];

// Fuel types data
const fuelTypesData = [
  {
    id: 'fuel-gasoline',
    name: 'Xăng',
    icon: '⛽',
    description: 'Xe chạy xăng (Petrol)',
  },
  {
    id: 'fuel-diesel',
    name: 'Dầu',
    icon: '🛢️',
    description: 'Xe chạy dầu (Diesel)',
  },
  {
    id: 'fuel-hybrid',
    name: 'Hybrid',
    icon: '⚡',
    description: 'Xe lai hybrid (xăng + điện)',
  },
  {
    id: 'fuel-electric',
    name: 'Điện',
    icon: '🔌',
    description: 'Xe chạy điện (Electric)',
  },
];

// Transmission types data
const transmissionData = [
  {
    id: 'trans-manual',
    name: 'Số tay',
    icon: '⚙️',
    description: 'Hộp số sàn thủ công',
  },
  {
    id: 'trans-automatic',
    name: 'Số tự động',
    icon: '⚙️',
    description: 'Hộp số tự động',
  },
  {
    id: 'trans-cvt',
    name: 'CVT',
    icon: '⚙️',
    description: 'Hộp số CVT (vô cấp)',
  },
];

async function importData() {
  console.log('🚀 Starting import...\n');

  try {
    // Import amenities
    console.log('📥 Importing amenities...');
    const amenitiesRef = db.collection('amenities');
    for (const amenity of amenitiesData) {
      await amenitiesRef.doc(amenity.id).set(amenity);
      console.log(`  ✅ ${amenity.name}`);
    }
    console.log(`✓ Imported ${amenitiesData.length} amenities\n`);

    // Import fuel types
    console.log('📥 Importing fuel types...');
    const fuelTypesRef = db.collection('fuelTypes');
    for (const fuel of fuelTypesData) {
      await fuelTypesRef.doc(fuel.id).set(fuel);
      console.log(`  ✅ ${fuel.name}`);
    }
    console.log(`✓ Imported ${fuelTypesData.length} fuel types\n`);

    // Import transmission types
    console.log('📥 Importing transmission types...');
    const transmissionRef = db.collection('transmissionTypes');
    for (const trans of transmissionData) {
      await transmissionRef.doc(trans.id).set(trans);
      console.log(`  ✅ ${trans.name}`);
    }
    console.log(`✓ Imported ${transmissionData.length} transmission types\n`);

    console.log('✅ All data imported successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
}

importData();
