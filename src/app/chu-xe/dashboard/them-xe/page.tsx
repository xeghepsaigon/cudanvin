'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Upload, ArrowLeft, Plus, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AddVehiclePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  // Check auth and redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/dang-nhap');
    }
  }, [user, authLoading, router]);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    seats: 4,
    fuelType: 'gasoline',
    transmission: 'automatic',
    mileage: 0,
    pricePerDay: 0,
    location: '',
    description: '',
    amenities: [] as string[],
  });

  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const amenitiesList = [
    '🎵 Hệ thống âm thanh',
    '❄️ Điều hòa nhiệt độ',
    '📱 Kết nối Bluetooth',
    '🔋 Sạc điện thoại',
    '🚪 Cửa tự động',
    '🛡️ Hệ thống an toàn',
    '🅿️ Hỗ trợ đỗ xe',
    '📹 Camera lùi',
    '🗺️ GPS',
    '☀️ Cửa sổ trời',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'seats' || name === 'mileage' || name === 'pricePerDay'
        ? parseInt(value)
        : value
    }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setImages(prev => [...prev, event.target.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Vehicle Data:', {
        ...formData,
        images
      });
      setLoading(false);
      router.push('/chu-xe/dashboard');
    }, 1000);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F9FAFB]">
      <Header />

      <div className="flex-1">
        <div className="mx-auto max-w-4xl px-4 md:px-8 py-6">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-[#00A86B] hover:opacity-80 transition mb-4"
            >
              <ArrowLeft size={20} />
              Quay lại
            </button>
            <h1 className="text-3xl font-bold text-[#1F2937] mb-2">Đăng xe mới</h1>
            <p className="text-base text-[#6B7280]">Nhập thông tin chi tiết về xe của bạn</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Thông tin cơ bản */}
            <div className="rounded-lg bg-white border border-[#E5E7EB] p-6">
              <h2 className="text-xl font-semibold text-[#1F2937] mb-6">📋 Thông tin cơ bản</h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Tên xe <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="VD: Toyota Vios 2023"
                    className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Hãng xe <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    placeholder="VD: Toyota"
                    className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Model <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    placeholder="VD: Vios"
                    className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Năm sản xuất <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    min="2000"
                    max={new Date().getFullYear()}
                    className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Loại nhiên liệu <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                  >
                    <option value="gasoline">Xăng</option>
                    <option value="diesel">Dầu</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="electric">Điện</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Hộp số <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                  >
                    <option value="manual">Số tay</option>
                    <option value="automatic">Số tự động</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Số chỗ ngồi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="seats"
                    value={formData.seats}
                    onChange={handleInputChange}
                    min="1"
                    max="8"
                    className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Quãng đường đi (km)
                  </label>
                  <input
                    type="number"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                  />
                </div>
              </div>
            </div>

            {/* Giá cả & Vị trí */}
            <div className="rounded-lg bg-white border border-[#E5E7EB] p-6">
              <h2 className="text-xl font-semibold text-[#1F2937] mb-6">💰 Giá cả & Vị trí</h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Giá thuê/ngày (VND) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="pricePerDay"
                      value={formData.pricePerDay}
                      onChange={handleInputChange}
                      placeholder="500000"
                      min="0"
                      className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                      required
                    />
                  </div>
                  <p className="text-xs text-[#6B7280] mt-2">
                    Giá: {(formData.pricePerDay / 1000).toLocaleString('vi-VN')}K/ngày
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Vị trí <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="VD: Quận 1, TP.HCM"
                    className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Mô tả */}
            <div className="rounded-lg bg-white border border-[#E5E7EB] p-6">
              <h2 className="text-xl font-semibold text-[#1F2937] mb-6">📝 Mô tả xe</h2>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Mô tả chi tiết về xe, tình trạng, lịch sử sử dụng..."
                rows={5}
                className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
              />
              <p className="text-xs text-[#6B7280] mt-2">
                {formData.description.length}/500 ký tự
              </p>
            </div>

            {/* Ảnh */}
            <div className="rounded-lg bg-white border border-[#E5E7EB] p-6">
              <h2 className="text-xl font-semibold text-[#1F2937] mb-6">📸 Ảnh xe</h2>

              <label className="block">
                <div className="border-2 border-dashed border-[#E5E7EB] rounded-lg p-8 text-center cursor-pointer hover:border-[#00A86B] transition">
                  <Upload className="mx-auto mb-2 text-[#6B7280]" size={32} />
                  <p className="text-sm font-medium text-[#1F2937] mb-1">Tải lên ảnh</p>
                  <p className="text-xs text-[#6B7280]">Kéo & thả hoặc click để chọn ảnh</p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              {images.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-[#1F2937] mb-4">
                    Đã tải: {images.length} ảnh
                  </p>
                  <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Vehicle ${index + 1}`}
                          className="w-full h-32 rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tiện nghi */}
            <div className="rounded-lg bg-white border border-[#E5E7EB] p-6">
              <h2 className="text-xl font-semibold text-[#1F2937] mb-6">🎁 Tiện nghi</h2>

              <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                {amenitiesList.map((amenity) => (
                  <label key={amenity} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="w-5 h-5 rounded border-[#E5E7EB] text-[#00A86B] focus:ring-[#00A86B]"
                    />
                    <span className="text-sm text-[#1F2937]">{amenity}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-[#6B7280] mt-4">
                Đã chọn: {formData.amenities.length}/{amenitiesList.length}
              </p>
            </div>

            {/* Submit */}
            <div className="flex gap-3 justify-end pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="rounded-lg border border-[#E5E7EB] px-6 py-3 text-sm font-semibold text-[#1F2937] hover:bg-[#F9FAFB] transition"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-[#00A86B] px-6 py-3 text-sm font-semibold text-white hover:bg-[#008F5A] disabled:opacity-50 transition"
              >
                <Plus size={18} />
                {loading ? 'Đang lưu...' : 'Đăng xe'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
