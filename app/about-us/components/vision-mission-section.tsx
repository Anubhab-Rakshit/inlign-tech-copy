"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Eye, Target, Lightbulb, Rocket } from "lucide-react"

export default function VisionMissionSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <motion.section ref={sectionRef} className="py-20 px-4 relative overflow-hidden">
      {/* Purple Gradient Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-purple-800/60 to-purple-900/80"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(88, 28, 135, 0.8), rgba(107, 33, 168, 0.6), rgba(88, 28, 135, 0.8))",
              "linear-gradient(135deg, rgba(107, 33, 168, 0.8), rgba(126, 34, 206, 0.6), rgba(107, 33, 168, 0.8))",
              "linear-gradient(225deg, rgba(126, 34, 206, 0.8), rgba(88, 28, 135, 0.6), rgba(126, 34, 206, 0.8))",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Vision Section */}
          <motion.div
            initial={{ opacity: 0.2, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative"
          >
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-3xl blur-xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            <div className="relative p-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20">
              <motion.div className="flex items-center space-x-4 mb-6" whileHover={{ scale: 1.05 }}>
                <motion.div
                  className="p-4 rounded-2xl bg-gradient-to-r from-cyan-400/30 to-blue-400/30"
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Eye className="w-8 h-8 text-cyan-400" />
                </motion.div>
                <h2 className="text-4xl font-bold text-white">Our Vision</h2>
              </motion.div>

              <motion.p
                className="text-lg text-white/80 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              >
                To be a leading EdTech platform that bridges the gap between academic knowledge and industry demands,
                shaping the next generation of tech innovators and leaders through hands-on, practical learning.
              </motion.p>

              {/* Vision Particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 3,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0.2, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative"
          >
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-3xl blur-xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 2,
              }}
            />

            <div className="relative p-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20">
              <motion.div className="flex items-center space-x-4 mb-6" whileHover={{ scale: 1.05 }}>
                <motion.div
                  className="p-4 rounded-2xl bg-gradient-to-r from-purple-400/30 to-pink-400/30"
                  animate={{
                    rotate: [0, -5, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <Target className="w-8 h-8 text-purple-400" />
                </motion.div>
                <h2 className="text-4xl font-bold text-white">Our Mission</h2>
              </motion.div>

              <motion.p
                className="text-lg text-white/80 leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              >
                To provide meaningful and immersive learning experiences that equip students and young professionals
                with practical skills in Cyber Security, Full Stack Development, Data Science, and Project Management.
              </motion.p>

              {/* Mission Values */}
              <div className="space-y-3">
                {[
                  { icon: Lightbulb, text: "Innovation-driven education" },
                  { icon: Rocket, text: "Industry-ready skills" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                  >
                    <item.icon className="w-5 h-5 text-purple-400" />
                    <span className="text-white/70">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
