# 🚀 Hướng dẫn Cập nhật Firestore Security Rules - Chi tiết từng bước

## ⚠️ Vấn đề
Bạn đang gặp lỗi: **"Lỗi quyền truy cập. Vui lòng kiểm tra Firestore Security Rules."**

Điều này xảy ra vì Firestore Security Rules chưa được cập nhật để cho phép tạo user profile.

## ✅ Giải pháp - Cập nhật Rules (5 phút)

### 📍 Bước 1: Vào Firebase Console
1. Mở https://console.firebase.google.com/
2. Chọn project `vinurban` của bạn
3. Bên trái, click **Build** (biểu tượng nhà)
4. Chọn **Firestore Database**

### 📍 Bước 2: Vào mục Rules
- Ở đầu trang, click tab **Rules** (cạnh tab "Data")

### 📍 Bước 3: Xóa Rules cũ
- Chọn tất cả nội dung hiện tại (Ctrl+A hoặc Cmd+A)
- Xóa hết (Delete)

### 📍 Bước 4: Copy Rules mới
Dán đoạn code dưới đây:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - Cho phép user tạo/cập nhật hồ sơ của chính mình
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && request.auth.uid == userId;
      allow delete: if request.auth != null && request.auth.uid == userId;
    }

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

### 📍 Bước 5: Lưu Rules
- Click nút **Publish** (góc trên phải)
- Chờ tới khi thấy dòng chữ: ✅ **"Rules published successfully"**

### 📍 Bước 6: Test lại ứng dụng
1. Quay lại terminal, restart dev server:
   ```bash
   npm run dev
   ```

2. Xóa cache trình duyệt:
   - **Chrome/Edge**: Nhấn `Ctrl+Shift+Delete` (Windows) hoặc `Cmd+Shift+Delete` (Mac)
   - Chọn "Cookies and other site data"
   - Chọn "All time"
   - Click "Clear data"

3. Truy cập http://localhost:3000/dang-nhap
4. Đăng nhập bằng Google
5. ✅ Bạn sẽ thấy trang **Onboarding** yêu cầu điền thông tin

## 🔍 Kiểm tra xem Rules đã được publish chưa

Nếu Rules đã được publish thành công, bạn sẽ thấy:
- ✅ Dấu tích xanh (green checkmark)
- ✅ Thông báo "Rules published successfully"
- ✅ Ngày/giờ cập nhật ở dưới

## ❌ Nếu vẫn gặp lỗi sau khi publish

1. **Chờ 30 giây** rồi refresh trang (Ctrl+R hoặc Cmd+R)

2. **Kiểm tra Project ID** trong Firebase Console:
   - Project Settings (bánh răng ở góc trái)
   - Copy `Project ID`
   - Kiểm tra xem nó có khớp với `NEXT_PUBLIC_FIREBASE_PROJECT_ID` trong `.env.local` không

3. **Xóa hết site data**:
   - DevTools → Application → Clear all site data
   - Đăng nhập lại

4. **Kiểm tra browser console** để xem error chi tiết:
   - F12 → Console
   - Tìm error bắt đầu với `FirebaseError`
   - Gửi error message để debug thêm

## 📝 Lưu ý về Security

Những rules này cho phép:
- ✅ User tạo hồ sơ của chính mình (onboarding)
- ✅ User chỉ đọc được hồ sơ của chính mình
- ✅ User chỉ cập nhật hồ sơ của chính mình
- ✅ Xe có thể xem được bởi tất cả mọi người
- ✅ Booking chỉ có thể xem bởi customer và owner

Đây là cài đặt an toàn cho production.

## 📞 Cần giúp?

Nếu bạn vẫn gặp lỗi sau khi làm tất cả các bước trên:
1. Chụp ảnh/copy lỗi từ console
2. Kiểm tra lại tên project trong Firebase Console
3. Đảm bảo `.env.local` có đúng thông tin Firebase
