"use client"

import { motion, useTransform, type MotionValue } from "framer-motion"
import { useState, useEffect } from "react"

interface QuantumStatProps {
  value: number
  suffix: string
  label: string
  color: string
  delay: number
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  index: number
}

function QuantumStat({ value, suffix, label, color, delay, mouseX, mouseY, index }: QuantumStatProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  // Quantum field response
  const quantumX = useTransform(mouseX, [0, window?.innerWidth || 1920], [-50, 50])
  const quantumY = useTransform(mouseY, [0, window?.innerHeight || 1080], [-50, 50])

  useEffect(() => {
    if (isVisible) {
      const duration = 3000
      const steps = 100
      const increment = value / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isVisible, value])

  return (
    <motion.div
      className="relative group cursor-pointer"
      style={{
        x: quantumX,
        y: quantumY,
      }}
      initial={{ opacity: 0, scale: 0, rotateY: -90 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      onViewportEnter={() => setIsVisible(true)}
      transition={{ duration: 1, delay }}
      whileHover={{
        scale: 1.1,
        rotateY: 10,
        z: 50,
        transition: { duration: 0.3 },
      }}
    >
      <motion.div
        className="relative p-8 rounded-3xl backdrop-blur-xl border-2 bg-black/60 overflow-hidden"
        style={{
          borderColor: color,
          boxShadow: `0 0 50px ${color}40, inset 0 0 50px ${color}20`,
        }}
        animate={{
          borderColor: [color, `${color}80`, color],
          boxShadow: [
            `0 0 50px ${color}40, inset 0 0 50px ${color}20`,
            `0 0 100px ${color}80, inset 0 0 100px ${color}40`,
            `0 0 50px ${color}40, inset 0 0 50px ${color}20`,
          ],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: index * 0.5,
        }}
      >
        {/* Quantum Field Background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle, ${color}40, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Holographic Grid Overlay */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(${color}30 1px, transparent 1px),
              linear-gradient(90deg, ${color}30 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
          }}
        />

        {/* Quantum Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: color,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <motion.div
            className="text-5xl md:text-6xl font-black text-white mb-4"
            style={{
              textShadow: `0 0 30px ${color}, 0 0 60px ${color}80`,
              filter: `drop-shadow(0 0 20px ${color})`,
            }}
            animate={{
              scale: [1, 1.05, 1],
              textShadow: [
                `0 0 30px ${color}, 0 0 60px ${color}80`,
                `0 0 50px ${color}, 0 0 100px ${color}FF`,
                `0 0 30px ${color}, 0 0 60px ${color}80`,
              ],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {count.toLocaleString()}
            {suffix}
          </motion.div>

          <div className="text-white/90 text-lg font-bold mb-6">{label}</div>

          {/* Quantum Progress Bar */}
          <div className="relative h-4 bg-white/10 rounded-full overflow-hidden border border-white/20">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${color}, ${color}80, ${color}FF, ${color}80, ${color})`,
                backgroundSize: "300% 100%",
              }}
              initial={{ width: 0 }}
              animate={{
                width: isVisible ? "100%" : 0,
                backgroundPosition: ["0% 0%", "300% 0%"],
              }}
              transition={{
                width: { duration: 2.5, delay: delay + 0.5 },
                backgroundPosition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              }}
            />

            {/* Quantum Energy Pulse */}
            <motion.div
              className="absolute top-0 h-full w-8 rounded-full opacity-80"
              style={{
                background: `radial-gradient(circle, ${color}FF, ${color}80, transparent)`,
                filter: `blur(2px)`,
              }}
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: delay + 1,
              }}
            />
          </div>

          {/* Holographic Data Stream */}
          <motion.div
            className="mt-4 text-xs font-mono opacity-60"
            animate={{
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
           
          </motion.div>
        </div>

        {/* Holographic Corner Accents */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 border-2"
            style={{
              borderColor: color,
              [i === 0 ? "top" : i === 1 ? "top" : "bottom"]: "8px",
              [i === 0 ? "left" : i === 1 ? "right" : i === 2 ? "left" : "right"]: "8px",
              borderWidth: i === 0 ? "2px 0 0 2px" : i === 1 ? "2px 2px 0 0" : i === 2 ? "0 0 2px 2px" : "0 2px 2px 0",
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default function QuantumMissionHub({
  mouseX,
  mouseY,
}: { mouseX: MotionValue<number>; mouseY: MotionValue<number> }) {
  const statistics = [
    { value: 50000, suffix: "+", label: "Lives Transformed", color: "#00ffff" },
    { value: 95, suffix: "%", label: "Success Rate", color: "#ff00ff" },
    { value: 15, suffix: "", label: "Countries Reached", color: "#00ff00" },
    { value: 98, suffix: "%", label: "Performance Score", color: "#ffff00" },
  ]

  return (
    <div className="space-y-16">
      {/* Quantum Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h3
          className="text-4xl md:text-5xl font-black text-white mb-6 relative"
          style={{
            background: "linear-gradient(45deg, #00ffff, #ff00ff, #00ff00)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
         
          {/* Holographic Scan Line */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              repeatDelay: 3,
            }}
          />
        </motion.h3>

        <motion.p
          className="text-cyan-300/80 text-xl font-medium"
          animate={{
            opacity: [0.7, 1, 0.7],
            textShadow: [
              "0 0 10px rgba(0, 255, 255, 0.5)",
              "0 0 20px rgba(0, 255, 255, 0.8)",
              "0 0 10px rgba(0, 255, 255, 0.5)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          
        </motion.p>
      </motion.div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {statistics.map((stat, index) => (
          <QuantumStat key={index} {...stat} delay={index * 0.2} mouseX={mouseX} mouseY={mouseY} index={index} />
        ))}
      </div>

      {/* Quantum System Status */}
      <motion.div
        className="mt-16 p-8 rounded-3xl backdrop-blur-xl border-2 border-cyan-500/50 bg-black/60 relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        animate={{
          boxShadow: [
            "0 0 50px rgba(0, 255, 255, 0.3), inset 0 0 50px rgba(0, 255, 255, 0.1)",
            "0 0 100px rgba(0, 255, 255, 0.6), inset 0 0 100px rgba(0, 255, 255, 0.3)",
            "0 0 50px rgba(0, 255, 255, 0.3), inset 0 0 50px rgba(0, 255, 255, 0.1)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 0 150px rgba(0, 255, 255, 0.8), inset 0 0 150px rgba(0, 255, 255, 0.4)",
        }}
      >
        {/* Quantum Field Background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: "conic-gradient(from 0deg, #00ffff00, #00ffff80, #ff00ff80, #00ff0080, #00ffff00)",
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <motion.div
              className="w-6 h-6 bg-cyan-400 rounded-full relative"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
                boxShadow: ["0 0 20px #00ffff", "0 0 40px #00ffff, 0 0 80px #00ffff", "0 0 20px #00ffff"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              {/* Quantum Ripples */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border-2 border-cyan-400 rounded-full"
                  animate={{
                    scale: [1, 3, 1],
                    opacity: [0.8, 0, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.4,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>

            <div>
              <motion.span
                className="text-cyan-400 font-black text-2xl"
                animate={{
                  textShadow: ["0 0 10px #00ffff", "0 0 20px #00ffff, 0 0 40px #00ffff", "0 0 10px #00ffff"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                QUANTUM SYSTEM: OPTIMAL
              </motion.span>
              <div className="text-white/70 text-sm font-mono">UPTIME: 99.99% | LATENCY: 0.001ms | QUBITS: STABLE</div>
            </div>
          </div>

          <motion.div
            className="text-cyan-300/70 font-mono text-sm"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            TIMESTAMP: {new Date().toISOString()}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
