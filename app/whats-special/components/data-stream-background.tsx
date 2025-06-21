"use client"

import { motion, type MotionValue } from "framer-motion"

interface DataStreamBackgroundProps {
  scrollProgress: MotionValue<number>
}

export default function DataStreamBackground({ scrollProgress }: DataStreamBackgroundProps) {
  const dataStreams = [
    "01001000 01100101 01101100 01101100 01101111",
    "49 6E 6C 69 67 68 6E 20 54 65 63 68",
    "console.log('Innovation++');",
    "SELECT * FROM future WHERE tech = 'advanced';",
    "npm install @inlighn/quantum-learning",
    "git commit -m 'Revolutionary education'",
    "docker run --name inlighn-tech innovation:latest",
    "curl -X POST https://api.inlighn.tech/transform",
  ]

  return (
    <div className="fixed inset-0 z-5 pointer-events-none overflow-hidden">
      {dataStreams.map((stream, index) => (
        <motion.div
          key={index}
          className="absolute text-green-400/30 font-mono text-xs whitespace-nowrap"
          style={{
            left: `${(index * 15) % 100}%`,
            top: `${(index * 12) % 100}%`,
            transform: `rotate(${index * 15}deg)`,
          }}
          animate={{
            x: ["-100vw", "100vw"],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 20 + index * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: index * 3,
            ease: "linear",
          }}
        >
          {stream}
        </motion.div>
      ))}

      {/* Scanning Lines */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`scan-${i}`}
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
          style={{
            top: `${25 + i * 25}%`,
          }}
          animate={{
            x: ["-100%", "100%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 1.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
