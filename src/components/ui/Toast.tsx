'use client'

import { useEffect, useState } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info'

export interface ToastProps {
  id: string
  message: string
  type: ToastType
  duration?: number
}

interface ToastContainerProps {
  toasts: ToastProps[]
  removeToast: (id: string) => void
}

export function Toast({ id, message, type, duration = 3000, removeToast }: ToastProps & { removeToast: (id: string) => void }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => removeToast(id), duration)
      return () => clearTimeout(timer)
    }
  }, [id, duration, removeToast])

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800'
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800'
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-600" />
      case 'error':
        return <AlertCircle size={20} className="text-red-600" />
      case 'info':
        return <Info size={20} className="text-blue-600" />
      default:
        return null
    }
  }

  return (
    <div className={`border rounded-lg p-4 flex items-center gap-3 ${getStyles()} animate-in fade-in slide-in-from-top-4 duration-300`}>
      {getIcon()}
      <span className="flex-1 font-medium text-sm">{message}</span>
      <button
        onClick={() => removeToast(id)}
        className="text-gray-500 hover:text-gray-700 flex-shrink-0"
      >
        <X size={18} />
      </button>
    </div>
  )
}

export function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-3 w-full max-w-sm">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          removeToast={removeToast}
        />
      ))}
    </div>
  )
}
