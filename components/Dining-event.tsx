"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { useInView } from "framer-motion"
import { diningPackages } from "@/lib/constants"
import DiningPackage from "./DiningPackage"



export default function DiningEvents() {
  const [activeTab, setActiveTab] = useState("private")

  return (
    <div className="w-full bg-black text-white py-16 px-4 md:px-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-40 left-10 w-32 h-32 rounded-full bg-amber-500 opacity-5 blur-3xl"></div>
      <div className="absolute bottom-40 right-10 w-40 h-40 rounded-full bg-red-500 opacity-5 blur-3xl"></div>

      <div className="container mx-auto max-w-6xl">
        {/* Header Section with Animation */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-amber-500 font-serif text-3xl md:text-4xl font-medium mb-3">Dining Events</h2>
          <p className="text-gray-300 text-sm md:text-base max-w-lg mx-auto mb-8">
            We provide dining event for your special day with your important people
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Button
              className={`${activeTab === "private" ? "bg-red-500 hover:bg-red-600" : "bg-transparent border border-gray-700 hover:bg-gray-800"} text-white rounded-full px-6 py-2 h-auto transition-all duration-300`}
              onClick={() => setActiveTab("private")}
            >
              Private Events
            </Button>
            <Button
              className={`${activeTab === "corporate" ? "bg-red-500 hover:bg-red-600" : "bg-transparent border border-gray-700 hover:bg-gray-800"} text-white rounded-full px-6 py-2 h-auto transition-all duration-300`}
              onClick={() => setActiveTab("corporate")}
            >
              Corporate Events
            </Button>
          </div>
        </motion.div>

        {/* Dining Packages */}
        <div className="space-y-16 md:space-y-24">
          {diningPackages.map((pkg) => (
            <DiningPackage
              key={pkg.id}
              title={pkg.title}
              description={pkg.description}
              price={pkg.price}
              image={pkg.image}
              imagePosition={pkg.imagePosition}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

