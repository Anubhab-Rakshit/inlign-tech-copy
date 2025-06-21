"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Terminal, Code2, Cpu, Database } from "lucide-react"

export default function TechHeroSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const [terminalText, setTerminalText] = useState("")
  const fullText = "sudo ./initialize_quantum_experience.sh --mode=extraordinary"

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTerminalText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 pt-20"
      style={{ y, opacity, scale }}
    >
      {/* Holographic Grid */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
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

      {/* Glitch Effect Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(6, 182, 212, 0.1))",
            "linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))",
            "linear-gradient(225deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <div className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Terminal Status */}
        <motion.div
          className="inline-flex items-center space-x-3 mb-8 px-6 py-3 rounded-lg border border-green-400/30 bg-black/80 backdrop-blur-sm font-mono"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{
            boxShadow: "0 0 30px rgba(34, 197, 94, 0.3)",
            scale: 1.02,
          }}
        >
          <motion.div
            className="w-3 h-3 bg-green-400 rounded-full"
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
          <Terminal className="w-5 h-5 text-green-400" />
          <span className="text-green-400 text-sm">SYSTEM_STATUS: QUANTUM_READY</span>
        </motion.div>

        {/* Main Title with Glitch Effect */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6 relative"
            whileHover={{
              textShadow: [
                "0 0 20px rgba(0, 255, 255, 0.5)",
                "2px 0 0 rgba(255, 0, 0, 0.3), -2px 0 0 rgba(0, 255, 0, 0.3)",
                "0 0 20px rgba(0, 255, 255, 0.5)",
              ],
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              className="inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
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
              What's
            </motion.span>
          </motion.h1>

          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight relative"
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 30px rgba(255, 215, 0, 0.8)",
            }}
          >
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Special
            </span>

            {/* Glitch Overlay */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent opacity-0"
              animate={{
                opacity: [0, 0.3, 0],
                x: [0, 2, -2, 0],
              }}
              transition={{
                duration: 0.2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
              }}
            >
              Special
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Terminal Command */}
        <motion.div
          className="mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <motion.div
            className="bg-black/90 border border-green-400/30 rounded-lg p-6 font-mono text-left"
            whileHover={{
              borderColor: "rgba(34, 197, 94, 0.6)",
              boxShadow: "0 0 30px rgba(34, 197, 94, 0.2)",
            }}
          >
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 text-sm ml-4">inlighn@quantum-terminal</span>
            </div>
            <div className="text-green-400">
              <span className="text-blue-400">user@inlighn:~$</span> {terminalText}
              <motion.span
                className="inline-block w-2 h-5 bg-green-400 ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
            <motion.div
              className="text-cyan-400 mt-2 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 1 }}
            >
              ✓ Quantum learning protocols initialized
              <br />✓ Neural feedback matrix activated
              <br />✓ Holographic interface ready
              <br />→ Experience transformation: LOADING...
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating Tech Elements */}
        <div className="relative">
          {[Code2, Cpu, Database].map((Icon, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: `${20 + index * 30}%`,
                top: `${Math.random() * 100}px`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
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

        {/* Advanced Scroll Indicator */}
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
                borderColor: ["rgba(6, 182, 212, 0.5)", "rgba(34, 197, 94, 0.8)", "rgba(6, 182, 212, 0.5)"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-green-400 rounded-full mt-2"
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

              {/* Particle trail */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                  style={{ left: "50%", transform: "translateX(-50%)" }}
                  animate={{
                    y: [8, 20, 32],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                    ease: "easeOut",
                  }}
                />
              ))}
            </motion.div>

            <motion.div
              className="absolute -inset-2 border border-cyan-400/20 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
