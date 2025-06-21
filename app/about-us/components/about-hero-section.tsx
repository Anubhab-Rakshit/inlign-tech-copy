"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Sparkles, Zap, Star, Code, Brain, Shield } from "lucide-react"

export default function AboutHeroSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95])

  return (
    <motion.section ref={sectionRef} className="relative min-h-screen flex items-center justify-center px-4 pt-20">
      {/* Holographic Grid */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
          animate={{
            backgroundPosition: ["0 0", "50px 50px"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-teal-500/10"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(6, 182, 212, 0.1), rgba(147, 51, 234, 0.1), rgba(20, 184, 166, 0.1))",
            "linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(20, 184, 166, 0.1), rgba(6, 182, 212, 0.1))",
            "linear-gradient(225deg, rgba(20, 184, 166, 0.1), rgba(6, 182, 212, 0.1), rgba(147, 51, 234, 0.1))",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <div className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Status Indicator */}
        <motion.div
          className="inline-flex items-center space-x-3 mb-8 px-6 py-3 rounded-full border border-cyan-400/30 bg-cyan-400/10 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{
            boxShadow: "0 0 30px rgba(6, 182, 212, 0.3)",
            scale: 1.02,
          }}
        >
          <motion.div
            className="w-3 h-3 bg-cyan-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400 font-semibold">ABOUT INLIGHN TECH</span>
        </motion.div>

        {/* Main Title */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6"
            whileHover={{
              textShadow: [
                "0 0 20px rgba(6, 182, 212, 0.5)",
                "2px 0 0 rgba(147, 51, 234, 0.3), -2px 0 0 rgba(20, 184, 166, 0.3)",
                "0 0 20px rgba(6, 182, 212, 0.5)",
              ],
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              className="inline-block bg-gradient-to-r from-cyan-400 via-purple-500 to-teal-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Bridging
            </motion.span>
          </motion.h1>

          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight"
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 30px rgba(255, 215, 0, 0.8)",
            }}
          >
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Dreams & Reality
            </span>
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0.3, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <motion.p
            className="text-2xl md:text-3xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Transforming Education Through Innovation
          </motion.p>
          <motion.p
            className="text-lg text-white/60 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            At Inlighn Tech, we believe that the future of education lies in bridging the gap between academic learning
            and industry needs.
          </motion.p>
        </motion.div>

        {/* Floating Tech Icons */}
        <div className="relative">
          {[Code, Brain, Shield, Zap, Star].map((Icon, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: `${15 + index * 17}%`,
                top: `${Math.random() * 100}px`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.8,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.5,
                rotate: 180,
                transition: { duration: 0.3 },
              }}
            >
              <Icon className="w-8 h-8 text-cyan-400/60" />
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div className="relative" whileHover={{ scale: 1.1 }}>
            <motion.div
              className="w-8 h-12 border-2 border-cyan-400/50 rounded-full flex justify-center relative overflow-hidden"
              animate={{
                borderColor: ["rgba(6, 182, 212, 0.5)", "rgba(20, 184, 166, 0.8)", "rgba(6, 182, 212, 0.5)"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-teal-400 rounded-full mt-2"
                animate={{
                  y: [0, 16, 0],
                  opacity: [1, 0.3, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
