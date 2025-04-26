"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"
import { Button } from "@/components/ui/button"
import ImageModal from "./image-modal"

interface GalleryProps {
  images: {
    url: string
  }[]
}

const Gallery = ({ images }: GalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  return (
    <div className="w-2/3">
      {/* Main Image */}
      <div className="relative aspect-square rounded-xl overflow-hidden mb-4 ">
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
              className="object-contain w-36 h-36 p-4"
              sizes="(max-width: 300px) 50vw, 20vw"
              priority
            />

            {/* Expand button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white/90"
              onClick={openModal}
            >
              <Expand className="w-5 h-5 text-neutral-700" />
            </Button>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white/90"
              onClick={handlePrevious}
            >
              <ChevronLeft className="w-5 h-5 text-neutral-700" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white/90"
              onClick={handleNext}
            >
              <ChevronRight className="w-5 h-5 text-neutral-700" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 snap-x">
          {images.map((image, index) => (
            <motion.button
              key={index}
              className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 snap-start ${
                index === currentIndex ? "ring-2 ring-amber-500" : "ring-1 ring-neutral-200"
              }`}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={image.url || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </motion.button>
          ))}
        </div>
      )}

      {/* Full screen modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={images}
        initialIndex={currentIndex}
      />
    </div>
  )
}

export default Gallery
