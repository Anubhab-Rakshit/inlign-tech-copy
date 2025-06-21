"use client"

import { useState } from "react"
import { motion, useTransform, type MotionValue } from "framer-motion"

interface TimelineEvent {
  year: number
  title: string
  description: string
  color: string
  achievements: string[]
}

const timelineEvents: TimelineEvent[] = [
  {
    year: 2016,
    title: "System Genesis",
    description: "Initial quantum core activation and primary neural network establishment.",
    color: "#00ffff",
    achievements: ["Core initialization", "Neural pathways established", "Quantum encryption deployed"],
  },
  {
    year: 2018,
    title: "Network Expansion",
    description: "Massive scale-up of processing nodes and global network integration.",
    color: "#ff00ff",
    achievements: ["1000+ nodes online", "Global sync achieved", "AI learning protocols active"],
  },
  {
    year: 2020,
    title: "Intelligence Emergence",
    description: "Advanced AI consciousness breakthrough and autonomous decision-making capabilities.",
    color: "#00ff00",
    achievements: ["AI consciousness achieved", "Autonomous operations", "Predictive analytics online"],
  },
  {
    year: 2022,
    title: "Quantum Leap",
    description: "Quantum computing integration and interdimensional data processing capabilities.",
    color: "#ffff00",
    achievements: ["Quantum processors online", "Interdimensional access", "Reality simulation active"],
  },
  {
    year: 2024,
    title: "Singularity Protocol",
    description: "Achievement of technological singularity and universal knowledge integration.",
    color: "#ff0080",
    achievements: ["Singularity achieved", "Universal knowledge base", "Omnipresent network"],
  },
]

function CyberNode({
  event,
  isActive,
  onClick,
  mouseX,
  mouseY,
  index,
}: {
  event: TimelineEvent
  isActive: boolean
  onClick: () => void
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  index: number
}) {
  // Cyber response to cursor
  const cyberX = useTransform(mouseX, [0, window?.innerWidth || 1920], [-15, 15])
  const cyberY = useTransform(mouseY, [0, window?.innerHeight || 1080], [-15, 15])

  return (
    <motion.div
      className="relative cursor-pointer group"
      style={{
        x: cyberX,
        y: cyberY,
      }}
      onClick={onClick}
      whileHover={{
        scale: 1.2,
        z: 50,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        className="relative"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 30 + index * 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <motion.div
          className={`w-24 h-24 rounded-full border-4 flex items-center justify-center backdrop-blur-xl transition-all duration-500 ${
            isActive ? "border-white bg-white/20 scale-110" : "border-white/40 bg-black/60 hover:border-white/60"
          }`}
          style={{
            borderColor: isActive ? event.color : undefined,
            boxShadow: isActive
              ? `0 0 60px ${event.color}80, inset 0 0 60px ${event.color}30`
              : `0 0 30px ${event.color}40, inset 0 0 30px ${event.color}20`,
          }}
          animate={{
            boxShadow: isActive
              ? [
                  `0 0 60px ${event.color}80, inset 0 0 60px ${event.color}30`,
                  `0 0 100px ${event.color}FF, inset 0 0 100px ${event.color}50`,
                  `0 0 60px ${event.color}80, inset 0 0 60px ${event.color}30`,
                ]
              : [
                  `0 0 30px ${event.color}40, inset 0 0 30px ${event.color}20`,
                  `0 0 50px ${event.color}60, inset 0 0 50px ${event.color}30`,
                  `0 0 30px ${event.color}40, inset 0 0 30px ${event.color}20`,
                ],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {/* Cyber Core */}
          <motion.div
            className="w-8 h-8 rounded-full relative"
            style={{ backgroundColor: event.color }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {/* Data Streams */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-4"
                style={{
                  backgroundColor: event.color,
                  left: "50%",
                  top: "50%",
                  transformOrigin: "center bottom",
                  transform: `rotate(${i * 90}deg) translateX(-50%)`,
                }}
                animate={{
                  scaleY: [0.5, 1.5, 0.5],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>

          {/* Cyber Rings */}
          {isActive && (
            <>
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: event.color }}
                  animate={{
                    scale: [1, 2 + i * 0.5, 1],
                    opacity: [0.8, 0, 0.8],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </>
          )}
        </motion.div>

        {/* Year Label */}
        <motion.div
          className={`mt-4 px-4 py-2 rounded-full text-sm font-bold transition-all duration-500 backdrop-blur-sm border-2 ${
            isActive ? "bg-white/20 text-white" : "bg-black/60 text-white/70"
          }`}
          style={{
            borderColor: isActive ? event.color : "rgba(255,255,255,0.3)",
            boxShadow: isActive ? `0 0 20px ${event.color}60` : undefined,
          }}
          animate={
            isActive
              ? {
                  y: [-2, 2, -2],
                  boxShadow: [`0 0 20px ${event.color}60`, `0 0 40px ${event.color}80`, `0 0 20px ${event.color}60`],
                }
              : {
                  y: [0, -3, 0],
                }
          }
          transition={{
            duration: isActive ? 2 : 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {event.year}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function CyberTimeline({
  mouseX,
  mouseY,
}: { mouseX: MotionValue<number>; mouseY: MotionValue<number> }) {
  const [activeEvent, setActiveEvent] = useState(timelineEvents[0])

  return (
    <div className="space-y-16">
      {/* Cyber Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h3
          className="text-4xl md:text-5xl font-black text-white mb-6 relative"
          style={{
            background: "linear-gradient(45deg, #ff0080, #00ffff, #ff00ff)",
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
          TIMELINE
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
              repeatDelay: 4,
            }}
          />
        </motion.h3>

        <motion.p
          className="text-pink-300/80 text-xl font-medium"
          animate={{
            opacity: [0.7, 1, 0.7],
            textShadow: [
              "0 0 10px rgba(255, 0, 128, 0.5)",
              "0 0 20px rgba(255, 0, 128, 0.8)",
              "0 0 10px rgba(255, 0, 128, 0.5)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          Temporal Data Stream Navigation
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Timeline Navigation */}
        <div className="lg:col-span-2">
          {/* Cyber Timeline Track */}
          <div className="relative mb-12">
            {/* Data Stream Background */}
            <div className="absolute top-12 left-12 right-12 h-4 bg-gradient-to-r from-white/10 via-white/30 to-white/10 rounded-full border border-white/20" />

            {/* Active Data Flow */}
            <motion.div
              className="absolute top-12 left-12 h-4 rounded-full border"
              style={{
                background: `linear-gradient(90deg, ${activeEvent.color}, ${activeEvent.color}80, ${activeEvent.color}FF, ${activeEvent.color}80, ${activeEvent.color})`,
                backgroundSize: "400% 100%",
                borderColor: activeEvent.color,
                width: `${((timelineEvents.findIndex((e) => e.year === activeEvent.year) + 1) / timelineEvents.length) * 100}%`,
                boxShadow: `0 0 20px ${activeEvent.color}60`,
              }}
              animate={{
                backgroundPosition: ["0% 0%", "400% 0%"],
                boxShadow: [
                  `0 0 20px ${activeEvent.color}60`,
                  `0 0 40px ${activeEvent.color}80`,
                  `0 0 20px ${activeEvent.color}60`,
                ],
              }}
              transition={{
                backgroundPosition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                width: { duration: 1, ease: "easeInOut" },
                boxShadow: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              }}
            />

            {/* Data Particles */}
            <div className="absolute top-8 left-12 right-12 h-12 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: activeEvent.color,
                    left: `${(i / 9) * 100}%`,
                    top: "50%",
                  }}
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Timeline Nodes */}
            <div className="relative flex justify-between pt-8">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, y: 80, rotateY: -45 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                >
                  <CyberNode
                    event={event}
                    isActive={activeEvent.year === event.year}
                    onClick={() => setActiveEvent(event)}
                    mouseX={mouseX}
                    mouseY={mouseY}
                    index={index}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Event Details Panel */}
        <div className="lg:col-span-1">
          <motion.div
            key={activeEvent.year}
            className="sticky top-8 p-8 rounded-3xl backdrop-blur-xl border-2 bg-black/60 overflow-hidden"
            style={{
              borderColor: activeEvent.color,
              boxShadow: `0 0 80px ${activeEvent.color}40, inset 0 0 80px ${activeEvent.color}20`,
            }}
            initial={{ opacity: 0, x: 60, rotateY: -30 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{
              boxShadow: `0 0 120px ${activeEvent.color}60, inset 0 0 120px ${activeEvent.color}30`,
            }}
          >
            {/* Cyber Background */}
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                background: `radial-gradient(circle, ${activeEvent.color}40, transparent 70%)`,
              }}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Header */}
            <div className="relative z-10 flex items-center space-x-4 mb-6">
              <motion.div
                className="p-4 rounded-2xl backdrop-blur-sm border-2"
                style={{
                  backgroundColor: `${activeEvent.color}20`,
                  borderColor: activeEvent.color,
                }}
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    `0 0 20px ${activeEvent.color}60`,
                    `0 0 40px ${activeEvent.color}80`,
                    `0 0 20px ${activeEvent.color}60`,
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: activeEvent.color }}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              <div>
                <motion.h4
                  className="text-white font-bold text-xl mb-1"
                  style={{
                    textShadow: `0 0 15px ${activeEvent.color}80`,
                  }}
                  animate={{
                    textShadow: [
                      `0 0 15px ${activeEvent.color}80`,
                      `0 0 25px ${activeEvent.color}FF`,
                      `0 0 15px ${activeEvent.color}80`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  {activeEvent.title}
                </motion.h4>
                <p className="text-white/60 font-mono text-sm">{activeEvent.year}</p>
              </div>
            </div>

            {/* Description */}
            <p className="relative z-10 text-white/80 text-sm leading-relaxed mb-8">{activeEvent.description}</p>

            {/* Achievements */}
            <div className="relative z-10">
              <h5 className="text-white font-bold mb-4 flex items-center">
                <motion.div
                  className="w-2 h-2 rounded-full mr-3"
                  style={{ backgroundColor: activeEvent.color }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                System Achievements
              </h5>

              <div className="space-y-3">
                {activeEvent.achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 border border-white/10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: `${activeEvent.color}10`,
                      borderColor: `${activeEvent.color}30`,
                    }}
                  >
                    <motion.div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: activeEvent.color }}
                      animate={{
                        scale: [1, 1.3, 1],
                        boxShadow: [
                          `0 0 5px ${activeEvent.color}80`,
                          `0 0 15px ${activeEvent.color}FF`,
                          `0 0 5px ${activeEvent.color}80`,
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.3,
                        ease: "easeInOut",
                      }}
                    />
                    <span className="text-white/80 text-sm">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
              <div className="flex justify-between text-sm text-white/60 mb-3">
                <span>Timeline Progress</span>
                <span>
                  {timelineEvents.findIndex((e) => e.year === activeEvent.year) + 1} / {timelineEvents.length}
                </span>
              </div>

              <div className="relative w-full bg-white/10 rounded-full h-3 overflow-hidden border border-white/20">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${activeEvent.color}, ${activeEvent.color}80, ${activeEvent.color}FF, ${activeEvent.color}80, ${activeEvent.color})`,
                    backgroundSize: "300% 100%",
                  }}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((timelineEvents.findIndex((e) => e.year === activeEvent.year) + 1) / timelineEvents.length) * 100}%`,
                    backgroundPosition: ["0% 0%", "300% 0%"],
                  }}
                  transition={{
                    width: { duration: 1, ease: "easeInOut" },
                    backgroundPosition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  }}
                />

                {/* Energy Pulse */}
                <motion.div
                  className="absolute top-0 h-full w-6 rounded-full opacity-80"
                  style={{
                    background: `radial-gradient(circle, ${activeEvent.color}FF, ${activeEvent.color}80, transparent)`,
                    filter: "blur(1px)",
                  }}
                  animate={{
                    x: [
                      "-100%",
                      `${((timelineEvents.findIndex((e) => e.year === activeEvent.year) + 1) / timelineEvents.length) * 100}%`,
                    ],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>

            {/* System Status */}
            <motion.div
              className="relative z-10 mt-6 text-xs font-mono text-white/60"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              SYS_ID: {activeEvent.year} | STATUS: ACTIVE | INTEGRITY: 100%
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
