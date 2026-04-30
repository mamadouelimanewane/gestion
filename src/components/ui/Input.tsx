import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  required?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      icon,
      iconPosition = 'left',
      required,
      type = 'text',
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 inline-flex items-center text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {label}
            {required && <span className="ml-1 text-error">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
              {icon}
            </div>
          )}

          <input
            type={type}
            ref={ref}
            disabled={disabled}
            className={cn(
              'flex h-10 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-base text-neutral-900 placeholder:text-neutral-500 transition-colors duration-200',
              'focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none',
              'dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-0 dark:placeholder:text-neutral-400',
              'dark:focus:ring-primary-900',
              'disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed',
              'dark:disabled:bg-neutral-900 dark:disabled:text-neutral-600',
              icon && iconPosition === 'left' && 'pl-10',
              icon && iconPosition === 'right' && 'pr-10',
              error && 'border-error focus:border-error focus:ring-error/10',
              className
            )}
            {...props}
          />

          {icon && iconPosition === 'right' && (
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">
              {icon}
            </div>
          )}
        </div>

        {error && <p className="mt-1 text-sm text-error">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
