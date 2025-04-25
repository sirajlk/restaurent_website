'use client'

import Image from "next/image"
import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { useInView } from "framer-motion"

// Dining Package Component with Animations
const DiningPackage = ({ title, description, price, image, imagePosition }) => {
     const ref = useRef(null)
      const isInView = useInView(ref, { once: true, amount: 0.3 })
      const [isHovered, setIsHovered] = useState(false)
    
      const isRight = imagePosition === "right"
    
      return (
        <div
          ref={ref}
          className={`flex flex-col ${isRight ? "md:flex-row" : "md:flex-row-reverse"} items-center`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image with Directional Inner Shadow */}
          <motion.div
            className="md:w-2/3 relative overflow-hidden group"
            initial={{ opacity: 0, x: isRight ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isRight ? -50 : 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative h-48 md:h-64 w-full overflow-hidden">
              {/* The actual image */}
              <Image
                src={image || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
    
              {/* Directional shadow overlay - only on the side facing the text */}
              {isRight ? (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(to right, transparent, rgba(0,0,0,1))",
                    width: "100%",
                    height: "100%",
                  }}
                ></div>
              ) : (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(to left, transparent, rgba(0,0,0,1))",
                    width: "100%",
                    height: "100%",
                  }}
                ></div>
              )}
    
              {/* Price tag */}
              <motion.div
                className={`absolute ${isRight ? "right-0" : "left-0"} bottom-0 bg-black bg-opacity-70 py-2 px-4`}
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <span className="text-amber-500 font-medium text-xl">{price}</span>
              </motion.div>
    
              {/* Arrow decoration */}
              {isRight && (
                <motion.div
                  className="absolute left-0 top-1/2 transform -translate-y-1/2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="#D4A054"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              )}
    
              {!isRight && (
                <motion.div
                  className="absolute right-0 top-1/2 transform -translate-y-1/2"
                  initial={{ x: 20, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19 12H5M5 12L12 5M5 12L12 19"
                      stroke="#D4A054"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              )}
            </div>
          </motion.div>
    
          {/* Content */}
          <motion.div
            className={`md:w-1/3 ${isRight ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"} mt-6 md:mt-0`}
            initial={{ opacity: 0, x: isRight ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isRight ? 50 : -50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.h3
              className="text-2xl font-serif font-medium mb-2"
              animate={isHovered ? { color: "#D4A054" } : { color: "#FFFFFF" }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h3>
            <p className="text-gray-400 text-sm mb-3">{description}</p>
            <p className="text-amber-500 font-medium text-xl md:hidden">{price}</p>
    
            <motion.button
              className="mt-4 text-sm text-amber-500 border-b border-amber-500 pb-1 opacity-0 md:opacity-100"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{ x: isRight ? -5 : 5 }}
            >
              Book Now
            </motion.button>
          </motion.div>
        </div>
      )
    }
    
  export default DiningPackage