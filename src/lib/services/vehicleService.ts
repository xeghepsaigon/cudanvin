import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  Query,
  QueryConstraint,
  Timestamp,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '@/lib/firebase'

export interface Vehicle {
  id?: string
  name: string
  brand: string
  model: string
  year: number
  seats: number
  fuelType: 'gasoline' | 'diesel' | 'hybrid' | 'electric'
  transmission: 'manual' | 'automatic'
  mileage: number
  pricePerDay: number
  location: string
  description: string
  amenities: string[]
  images: string[]
  ownerId: string
  isActive: boolean
  rating: number
  reviewCount: number
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

const VEHICLES_COLLECTION = 'vehicles'

// Thêm xe mới
export async function addVehicle(vehicle: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>, imageFiles?: File[]): Promise<string> {
  try {
    const images = await uploadVehicleImages(imageFiles || [])
    
    const newVehicle = {
      ...vehicle,
      images,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    }

    const docRef = await addDoc(collection(db, VEHICLES_COLLECTION), newVehicle)
    return docRef.id
  } catch (error) {
    console.error('Error adding vehicle:', error)
    throw error
  }
}

// Cập nhật xe
export async function updateVehicle(vehicleId: string, updates: Partial<Vehicle>, newImageFiles?: File[]): Promise<void> {
  try {
    const vehicleRef = doc(db, VEHICLES_COLLECTION, vehicleId)
    
    let images = updates.images
    if (newImageFiles && newImageFiles.length > 0) {
      images = await uploadVehicleImages(newImageFiles)
    }

    await updateDoc(vehicleRef, {
      ...updates,
      images,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating vehicle:', error)
    throw error
  }
}

// Xóa xe
export async function deleteVehicle(vehicleId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, VEHICLES_COLLECTION, vehicleId))
  } catch (error) {
    console.error('Error deleting vehicle:', error)
    throw error
  }
}

// Lấy tất cả xe của chủ xe
export async function getOwnerVehicles(ownerId: string): Promise<Vehicle[]> {
  try {
    const q = query(collection(db, VEHICLES_COLLECTION), where('ownerId', '==', ownerId))
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Vehicle))
  } catch (error) {
    console.error('Error getting owner vehicles:', error)
    throw error
  }
}

// Lấy xe theo ID
export async function getVehicleById(vehicleId: string): Promise<Vehicle | null> {
  try {
    const docSnapshot = await getDocs(
      query(collection(db, VEHICLES_COLLECTION), where('__name__', '==', vehicleId))
    )
    
    if (docSnapshot.empty) return null
    
    const doc = docSnapshot.docs[0]
    return {
      id: doc.id,
      ...doc.data(),
    } as Vehicle
  } catch (error) {
    console.error('Error getting vehicle:', error)
    throw error
  }
}

// Lấy xe theo vị trí
export async function getVehiclesByLocation(location: string): Promise<Vehicle[]> {
  try {
    const q = query(
      collection(db, VEHICLES_COLLECTION),
      where('location', '==', location),
      where('isActive', '==', true)
    )
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Vehicle))
  } catch (error) {
    console.error('Error getting vehicles by location:', error)
    throw error
  }
}

// Lấy xe nổi bật
export async function getFeaturedVehicles(limit: number = 10): Promise<Vehicle[]> {
  try {
    const q = query(
      collection(db, VEHICLES_COLLECTION),
      where('isActive', '==', true)
    )
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as Vehicle))
      .slice(0, limit)
  } catch (error) {
    console.error('Error getting featured vehicles:', error)
    throw error
  }
}

// Upload ảnh xe
async function uploadVehicleImages(files: File[]): Promise<string[]> {
  try {
    const uploadPromises = files.map(async (file) => {
      const fileName = `vehicles/${Date.now()}_${file.name}`
      const fileRef = ref(storage, fileName)
      
      await uploadBytes(fileRef, file)
      return getDownloadURL(fileRef)
    })

    return Promise.all(uploadPromises)
  } catch (error) {
    console.error('Error uploading images:', error)
    throw error
  }
}

// Cập nhật rating xe
export async function updateVehicleRating(
  vehicleId: string,
  newRating: number,
  totalReviews: number
): Promise<void> {
  try {
    const vehicleRef = doc(db, VEHICLES_COLLECTION, vehicleId)
    await updateDoc(vehicleRef, {
      rating: newRating,
      reviewCount: totalReviews,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating vehicle rating:', error)
    throw error
  }
}

// Tìm kiếm xe
export async function searchVehicles(searchTerm: string): Promise<Vehicle[]> {
  try {
    const q = query(collection(db, VEHICLES_COLLECTION), where('isActive', '==', true))
    const querySnapshot = await getDocs(q)
    
    const lowerSearchTerm = searchTerm.toLowerCase()
    
    return querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as Vehicle))
      .filter(
        vehicle =>
          vehicle.name.toLowerCase().includes(lowerSearchTerm) ||
          vehicle.brand.toLowerCase().includes(lowerSearchTerm) ||
          vehicle.model.toLowerCase().includes(lowerSearchTerm) ||
          vehicle.location.toLowerCase().includes(lowerSearchTerm)
      )
  } catch (error) {
    console.error('Error searching vehicles:', error)
    throw error
  }
}
