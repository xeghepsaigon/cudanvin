import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

type CombinedProps = InputProps | TextAreaProps

const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, CombinedProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    const isTextArea = 'rows' in props

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            {label}
          </label>
        )}
        {isTextArea ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={`w-full px-4 py-2 border border-[#E5E7EB] rounded-lg text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#00A86B] focus:border-transparent transition-colors resize-none ${
              error ? 'border-red-500 focus:ring-red-500' : ''
            } ${className || ''}`}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            className={`w-full px-4 py-2 border border-[#E5E7EB] rounded-lg text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#00A86B] focus:border-transparent transition-colors ${
              error ? 'border-red-500 focus:ring-red-500' : ''
            } ${className || ''}`}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        {helperText && <p className="text-sm text-[#6B7280] mt-1">{helperText}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
