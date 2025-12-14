# Firebase Setup Guide

## Các bước setup Firebase cho VinUrban

### 1. Tạo Firebase Project

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" và tạo project mới tên `vinurban`
3. Chọn country và đồng ý các điều khoản
4. Chờ project được tạo

### 2. Lấy Firebase Config

1. Vào **Project Settings** (bánh răng icon ở góc trái)
2. Chọn tab **General**
3. Scroll xuống mục **Your apps**
4. Click icon web `</>` để tạo web app
5. Đặt tên app là `vinurban-web`
6. Copy Firebase config

### 3. Setup Authentication

1. Vào **Build** → **Authentication**
2. Click **Get started**
3. Enable các phương thức sau:
   - Email/Password
   - Google (optional)

### 4. Setup Firestore Database

1. Vào **Build** → **Firestore Database**
2. Click **Create database**
3. Chọn **Start in test mode** (untuk development)
4. Chọn location gần nhất (hoặc `asia-southeast1`)
5. Click **Create**

### 5. Setup Storage

1. Vào **Build** → **Storage**
2. Click **Get started**
3. Chọn **Start in test mode**
4. Chọn location (giống Firestore)
5. Click **Done**

### 6. Cấu hình `.env.local`

Tạo file `.env.local` tại root project:

```bash
cp .env.local.example .env.local
```

Sau đó điền các giá trị từ Firebase Config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 7. Cài đặt Firebase SDK

```bash
npm install firebase
```

### 8. Firestore Collections Structure

Tạo các collection sau trong Firestore:

#### Collection: `vehicles`
```
{
  name: string (tên xe)
  brand: string (hãng xe)
  model: string (model)
  year: number (năm sản xuất)
  seats: number (số chỗ)
  fuelType: string (loại nhiên liệu)
  transmission: string (hộp số)
  mileage: number (quãng đường)
  pricePerDay: number (giá/ngày)
  location: string (vị trí)
  description: string (mô tả)
  amenities: array (tiện nghi)
  images: array (ảnh)
  ownerId: string (ID chủ xe)
  isActive: boolean (có hiển thị)
  rating: number (đánh giá)
  reviewCount: number (số đánh giá)
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### Collection: `bookings`
```
{
  vehicleId: string (ID xe)
  vehicleName: string (tên xe)
  customerId: string (ID khách hàng)
  customerName: string (tên khách)
  startDate: string (ngày bắt đầu)
  endDate: string (ngày kết thúc)
  totalPrice: number (tổng giá)
  status: string (pending/approved/rejected/completed/cancelled)
  notes: string (ghi chú)
  ownerId: string (ID chủ xe - để query)
  createdAt: timestamp
  updatedAt: timestamp
}
```

### 9. Firestore Security Rules

Vào **Firestore Database** → **Rules** và cập nhật:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Vehicles collection
    match /vehicles/{vehicleId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.ownerId;
    }
    
    // Bookings collection
    match /bookings/{bookingId} {
      allow read: if request.auth.uid == resource.data.customerId 
                     || request.auth.uid == resource.data.ownerId;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.customerId 
                               || request.auth.uid == resource.data.ownerId;
    }
  }
}
```

Click **Publish**

### 10. Storage Security Rules

Vào **Storage** → **Rules** và cập nhật:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /vehicles/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Click **Publish**

### 11. Test lại

```bash
npm run dev
```

Truy cập `http://localhost:3000/chu-xe/dashboard` để test

## Lưu ý

- **Test Mode**: Storage và Firestore hiện tại ở test mode (dễ thay đổi quyền). Production cần tắt test mode
- **Auth**: Hiện tại dashboard dùng hardcoded `ownerId = 'owner-1'`. Sau này cần tích hợp authentication
- **Images**: Hình ảnh được upload lên Firebase Storage
- **Timestamps**: Sử dụng Firestore Timestamp để track thời gian

## Troubleshooting

1. **"Firebase not initialized"**
   - Kiểm tra `.env.local` có values không
   - Restart dev server: `npm run dev`

2. **"Permission denied"**
   - Kiểm tra Firestore Rules
   - Kiểm tra auth state

3. **"Storage bucket not found"**
   - Kiểm tra Storage Bucket name trong `.env.local`
   - Kiểm tra Storage Rules

## Sau này cần làm

- [ ] Tích hợp Authentication (Google, Email/Password)
- [ ] Update `ownerId` từ auth user thay vì hardcoded
- [ ] Thêm validation rules cho collections
- [ ] Thêm indexes cho queries hiệu quả hơn
- [ ] Setup Hosting trên Firebase
