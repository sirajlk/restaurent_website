"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

// Create context for dialog state
const DialogContext = createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
}>({
  open: false,
  onOpenChange: () => {},
})

// Root component
const Dialog = ({
  children,
  open,
  onOpenChange,
}: {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) => {
  const [isOpen, setIsOpen] = useState(open || false)

  // Sync with external state if provided
  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  return (
    <DialogContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>{children}</DialogContext.Provider>
  )
}

// Trigger component
const DialogTrigger = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}) => {
  const { onOpenChange } = useContext(DialogContext)

  return (
    <button type="button" onClick={() => onOpenChange(true)} {...props}>
      {children}
    </button>
  )
}

// Content component
const DialogContent = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
}) => {
  const { open, onOpenChange } = useContext(DialogContext)

  // Handle ESC key
  useEffect(() => {
    if (!open) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false)
      }
    }

    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleEscape)

    return () => {
      document.body.style.overflow = "auto"
      window.removeEventListener("keydown", handleEscape)
    }
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80" onClick={() => onOpenChange(false)}></div>

      {/* Dialog content */}
      <div className={cn("relative z-50 bg-background rounded-lg shadow-lg max-w-lg w-full p-6", className)} {...props}>
        {children}
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  )
}

// Export components
export { Dialog, DialogTrigger, DialogContent }
