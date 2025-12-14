# Scripts Import Data Guide

## Cách sử dụng scripts để import dữ liệu vào Firestore

### 1. Lấy Service Account Key từ Firebase

1. Vào [Firebase Console](https://console.firebase.google.com/project/cudanvin-dcdff)
2. Click **Project Settings** (bánh răng icon)
3. Chọn tab **Service Accounts**
4. Click **Generate New Private Key**
5. File `serviceAccountKey.json` sẽ tải về
6. **Copy file này vào thư mục root project** (cùng cấp với `package.json`)

⚠️ **Bảo mật**: Đừng commit `serviceAccountKey.json` lên Git! Đã thêm vào `.gitignore`

### 2. Cài đặt Firebase Admin SDK

```bash
npm install firebase-admin
```

### 3. Chạy script import Amenities

```bash
node scripts/import-amenities.js
```

Cái này sẽ import:
- 15 tiện ích xe (Audio, AC, Bluetooth, Camera, GPS, v.v)
- 4 loại nhiên liệu (Xăng, Dầu, Hybrid, Điện)
- 3 loại hộp số (Số tay, Số tự động, CVT)

Vào Firestore sẽ thấy 3 collections:
- `amenities` - Tiện ích
- `fuelTypes` - Loại nhiên liệu
- `transmissionTypes` - Loại hộp số

### 4. Chạy script import Vehicles

```bash
node scripts/import-vehicles.js
```

Cái này sẽ import 6 xe mẫu vào collection `vehicles`:
- Toyota Vios 2023
- Honda Civic 2022
- Hyundai Elantra 2021
- Mazda CX-5 2023
- Ford Focus 2020
- Kia Sportage 2023

### 5. Xem dữ liệu trên Firestore

Vào https://console.firebase.google.com/project/cudanvin-dcdff/firestore

Sẽ thấy các collections:
- `vehicles` - Danh sách xe
- `amenities` - Tiện ích
- `fuelTypes` - Loại nhiên liệu
- `transmissionTypes` - Loại hộp số

## Troubleshooting

### ❌ "Cannot find module 'firebase-admin'"
```bash
npm install firebase-admin
```

### ❌ "Error loading serviceAccountKey.json"
- Kiểm tra file có nằm ở thư mục root không
- Tên phải đúng: `serviceAccountKey.json`

### ❌ "Permission denied"
- Vào Firestore Rules
- Đổi thành test mode (cho phép tất cả read/write)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;  // Test mode only!
    }
  }
}
```

## Production

Khi lên production, cập nhật Firestore Rules để an toàn hơn:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Read access cho tất cả
    match /vehicles/{vehicleId} {
      allow read: if true;
    }
    
    match /amenities/{amenityId} {
      allow read: if true;
    }
    
    match /fuelTypes/{fuelId} {
      allow read: if true;
    }
    
    match /transmissionTypes/{transId} {
      allow read: if true;
    }
    
    // Write access chỉ cho authenticated users
    match /bookings/{bookingId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null;
    }
  }
}
```

## Xóa dữ liệu (nếu cần)

Vào Firestore Console → Collections → chọn collection → delete tất cả documents

Hoặc viết script xóa:

```javascript
async function deleteCollection(collectionPath, batchSize = 100) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve, reject);
  });
}
```
