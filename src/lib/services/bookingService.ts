import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  Timestamp,
  orderBy,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

export interface Booking {
  id?: string
  vehicleId: string
  vehicleName: string
  customerId: string
  customerName: string
  startDate: string
  endDate: string
  totalPrice: number
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled'
  notes?: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

const BOOKINGS_COLLECTION = 'bookings'

// Thêm booking mới
export async function addBooking(booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const newBooking = {
      ...booking,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    }

    const docRef = await addDoc(collection(db, BOOKINGS_COLLECTION), newBooking)
    return docRef.id
  } catch (error) {
    console.error('Error adding booking:', error)
    throw error
  }
}

// Cập nhật trạng thái booking
export async function updateBookingStatus(
  bookingId: string,
  status: Booking['status']
): Promise<void> {
  try {
    const bookingRef = doc(db, BOOKINGS_COLLECTION, bookingId)
    await updateDoc(bookingRef, {
      status,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating booking status:', error)
    throw error
  }
}

// Cập nhật booking
export async function updateBooking(bookingId: string, updates: Partial<Booking>): Promise<void> {
  try {
    const bookingRef = doc(db, BOOKINGS_COLLECTION, bookingId)
    await updateDoc(bookingRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating booking:', error)
    throw error
  }
}

// Xóa booking
export async function deleteBooking(bookingId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, BOOKINGS_COLLECTION, bookingId))
  } catch (error) {
    console.error('Error deleting booking:', error)
    throw error
  }
}

// Lấy booking của chủ xe
export async function getOwnerBookings(ownerId: string): Promise<Booking[]> {
  try {
    const q = query(
      collection(db, BOOKINGS_COLLECTION),
      where('ownerId', '==', ownerId),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Booking))
  } catch (error) {
    console.error('Error getting owner bookings:', error)
    throw error
  }
}

// Lấy booking của khách hàng
export async function getCustomerBookings(customerId: string): Promise<Booking[]> {
  try {
    const q = query(
      collection(db, BOOKINGS_COLLECTION),
      where('customerId', '==', customerId),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Booking))
  } catch (error) {
    console.error('Error getting customer bookings:', error)
    throw error
  }
}

// Lấy booking theo xe
export async function getVehicleBookings(vehicleId: string): Promise<Booking[]> {
  try {
    const q = query(
      collection(db, BOOKINGS_COLLECTION),
      where('vehicleId', '==', vehicleId),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Booking))
  } catch (error) {
    console.error('Error getting vehicle bookings:', error)
    throw error
  }
}

// Lấy booking pending
export async function getPendingBookings(ownerId: string): Promise<Booking[]> {
  try {
    const q = query(
      collection(db, BOOKINGS_COLLECTION),
      where('ownerId', '==', ownerId),
      where('status', '==', 'pending'),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Booking))
  } catch (error) {
    console.error('Error getting pending bookings:', error)
    throw error
  }
}

// Lấy booking approved
export async function getApprovedBookings(ownerId: string): Promise<Booking[]> {
  try {
    const q = query(
      collection(db, BOOKINGS_COLLECTION),
      where('ownerId', '==', ownerId),
      where('status', '==', 'approved'),
      orderBy('startDate', 'asc')
    )
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Booking))
  } catch (error) {
    console.error('Error getting approved bookings:', error)
    throw error
  }
}

// Kiểm tra xe có khả dụng trong khoảng thời gian
export async function checkVehicleAvailability(
  vehicleId: string,
  startDate: string,
  endDate: string
): Promise<boolean> {
  try {
    const q = query(
      collection(db, BOOKINGS_COLLECTION),
      where('vehicleId', '==', vehicleId),
      where('status', 'in', ['approved', 'pending'])
    )
    const querySnapshot = await getDocs(q)
    
    const bookings = querySnapshot.docs.map(doc => doc.data() as Booking)
    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()
    
    return !bookings.some(booking => {
      const bookingStart = new Date(booking.startDate).getTime()
      const bookingEnd = new Date(booking.endDate).getTime()
      
      return (start < bookingEnd && end > bookingStart)
    })
  } catch (error) {
    console.error('Error checking vehicle availability:', error)
    throw error
  }
}

// Tính doanh thu
export async function calculateRevenue(
  ownerId: string,
  startDate?: Date,
  endDate?: Date
): Promise<number> {
  try {
    const q = query(
      collection(db, BOOKINGS_COLLECTION),
      where('ownerId', '==', ownerId),
      where('status', '==', 'completed')
    )
    const querySnapshot = await getDocs(q)
    
    const bookings = querySnapshot.docs.map(doc => doc.data() as Booking)
    
    return bookings
      .filter(booking => {
        if (!startDate || !endDate) return true
        
        const bookingDate = new Date(booking.createdAt as any)
        return bookingDate >= startDate && bookingDate <= endDate
      })
      .reduce((sum, booking) => sum + booking.totalPrice, 0)
  } catch (error) {
    console.error('Error calculating revenue:', error)
    throw error
  }
}
