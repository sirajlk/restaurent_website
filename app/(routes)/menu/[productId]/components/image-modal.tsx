"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  images: { url: string }[]
  initialIndex: number
}

const ImageModal = ({ isOpen, onClose, images, initialIndex }: ImageModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-[90vw] h-[90vh] p-0 bg-black/95">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-50 text-white bg-black/50 rounded-full hover:bg-black/70"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </Button>

        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <Image
                src={images[currentIndex]?.url || "/placeholder.svg"}
                alt="Product image"
                fill
                className="object-contain p-8"
                sizes="90vw"
              />
            </motion.div>
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full hover:bg-black/70"
                onClick={handlePrevious}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full hover:bg-black/70"
                onClick={handleNext}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </>
          )}

          {/* Indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ImageModal
