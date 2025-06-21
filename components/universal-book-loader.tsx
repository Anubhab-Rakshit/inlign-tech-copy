"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface UniversalBookLoaderProps {
  onComplete?: () => void
}

export default function UniversalBookLoader({ onComplete }: UniversalBookLoaderProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; size: number }>>(
    [],
  )

  const pages = [
    {
      title: "Welcome to the Future",
      subtitle: "InLign Tech Solutions",
      content: "Where Innovation Meets Excellence",
      color: "from-purple-600 via-blue-600 to-cyan-500",
      icon: "🚀",
    },
    {
      title: "Revolutionary Programs",
      subtitle: "Next-Gen Education",
      content: "AI • Cybersecurity • Quantum Computing • Blockchain",
      color: "from-emerald-500 via-teal-500 to-cyan-600",
      icon: "🧠",
    },
    {
      title: "Global Innovation Hub",
      subtitle: "Worldwide Excellence",
      content: "50+ Countries • 10,000+ Students • Industry Leaders",
      color: "from-orange-500 via-red-500 to-pink-600",
      icon: "🌍",
    },
    {
      title: "Success Beyond Limits",
      subtitle: "Extraordinary Achievements",
      content: "98% Job Placement • $120K Average Salary • Global Recognition",
      color: "from-violet-600 via-purple-600 to-fuchsia-600",
      icon: "⭐",
    },
    {
      title: "Your Journey Begins",
      subtitle: "Infinite Possibilities Await",
      content: "Preparing your extraordinary experience...",
      color: "from-cyan-400 via-blue-500 to-purple-600",
      icon: "✨",
    },
  ]

  const handleComplete = useCallback(() => {
    setIsComplete(true)
    setTimeout(() => onComplete?.(), 600) // Increased for smoother exit
  }, [onComplete])

  useEffect(() => {
    // Optimized particles - reduced count for performance
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 1.5,
      size: Math.random() * 3 + 1,
    }))
    setParticles(newParticles)

    // Faster page transitions - 400ms per page for 2s total
    const interval = setInterval(() => {
      setCurrentPage((prev) => {
        if (prev < pages.length - 1) {
          return prev + 1
        } else {
          handleComplete()
          return prev
        }
      })
    }, 800) // Changed to 800ms for better visibility

    return () => clearInterval(interval)
  }, [handleComplete, pages.length])

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed inset-0 z-[9999] bg-black"
      />
    )
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black overflow-hidden">
      {/* Optimized Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"
        animate={{
          background: [
            "radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 60%)",
            "radial-gradient(circle at 70% 70%, rgba(147, 51, 234, 0.3) 0%, transparent 60%)",
            "radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* Optimized Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/50"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Main Content Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Optimized Book Container */}
        <div className="relative w-[450px] h-[320px] perspective-1000">
          {/* Book Glow Effect - Simplified */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            animate={{
              boxShadow: [
                "0 0 40px rgba(59, 130, 246, 0.4)",
                "0 0 60px rgba(147, 51, 234, 0.4)",
                "0 0 40px rgba(236, 72, 153, 0.4)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
          />

          {/* Book Base - Simplified */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl border border-white/20">
            {/* Book Spine */}
            <div className="absolute left-0 top-0 w-5 h-full bg-gradient-to-b from-amber-600 to-amber-800 rounded-l-2xl" />
            {/* Pages Stack */}
            <div className="absolute right-2 top-2 bottom-2 w-2 bg-white/80 rounded-r-lg" />
          </div>

          {/* Current Page - Optimized Animations */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              className="absolute inset-3 rounded-xl shadow-2xl overflow-hidden"
              initial={{
                rotateY: -90,
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                rotateY: 0,
                opacity: 1,
                scale: 1,
              }}
              exit={{
                rotateY: 90,
                opacity: 0,
                scale: 0.9,
              }}
              transition={{
                duration: 0.3, // Reduced from 0.6s
                ease: "easeOut",
              }}
              style={{
                transformOrigin: "left center",
                willChange: "transform, opacity",
              }}
            >
              {/* Page Content */}
              <div
                className={`h-full bg-gradient-to-br ${pages[currentPage].color} p-6 flex flex-col justify-center items-center text-white relative overflow-hidden`}
              >
                {/* Simplified Background Pattern */}
                <div
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "25px 25px",
                  }}
                />

                {/* Icon - Ultra Fast Animation */}
                <motion.div
                  className="text-7xl mb-4 relative z-10"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 0.8, // Reduced from 1.5s
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  style={{
                    filter: "drop-shadow(0 0 15px rgba(255,255,255,0.4))",
                    willChange: "transform",
                  }}
                >
                  {pages[currentPage].icon}
                </motion.div>

                {/* Title - Ultra Fast Reveal */}
                <motion.h1
                  className="text-3xl font-bold text-center mb-3 relative z-10"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.05 }} // Reduced delays
                  style={{
                    textShadow: "0 0 15px rgba(255,255,255,0.4)",
                  }}
                >
                  {pages[currentPage].title}
                </motion.h1>

                {/* Subtitle - Ultra Fast Reveal */}
                <motion.h2
                  className="text-xl font-semibold text-center mb-4 relative z-10"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  style={{
                    textShadow: "0 0 10px rgba(255,255,255,0.3)",
                  }}
                >
                  {pages[currentPage].subtitle}
                </motion.h2>

                {/* Content - Ultra Fast Reveal */}
                <motion.p
                  className="text-base text-center leading-relaxed max-w-sm relative z-10"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.15 }}
                  style={{
                    textShadow: "0 0 8px rgba(255,255,255,0.2)",
                  }}
                >
                  {pages[currentPage].content}
                </motion.p>

                {/* Ultra Fast Page Turn Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
                  animate={{
                    x: [-150, 450],
                  }}
                  transition={{
                    duration: 0.6, // Reduced from 1.2s
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 0.1, // Reduced delay
                    ease: "easeOut",
                  }}
                  style={{ willChange: "transform" }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Optimized Progress Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2 mb-4">
            {pages.map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full ${index <= currentPage ? "bg-white shadow-lg" : "bg-white/30"}`}
                animate={{
                  scale: index === currentPage ? 1.2 : 1,
                  boxShadow: index === currentPage ? "0 0 15px rgba(255,255,255,0.6)" : "none",
                }}
                transition={{ duration: 0.2 }} // Faster transition
                style={{ willChange: "transform" }}
              />
            ))}
          </div>

          {/* Loading Text - Faster Animation */}
          <motion.div
            className="text-center"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <p
              className="text-white text-lg font-semibold mb-1"
              style={{ textShadow: "0 0 8px rgba(255,255,255,0.4)" }}
            >
              Loading Experience
            </p>
            <p className="text-white/70 text-sm">{Math.round(((currentPage + 1) / pages.length) * 100)}%</p>
          </motion.div>
        </div>

        {/* Company Logo - Faster Animation */}
        
      </div>
    </div>
  )
}
