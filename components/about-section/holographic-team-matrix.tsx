"use client"

import { useState } from "react"
import { motion, AnimatePresence, useTransform, type MotionValue } from "framer-motion"

interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  color: string
  skills: { name: string; level: number }[]
  avatar: string
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Chief Technology Officer",
    bio: "Leading innovation in educational technology with expertise in AI-driven learning systems and scalable cloud infrastructure.",
    color: "#00ffff",
    avatar: "/placeholder.svg?height=300&width=300",
    skills: [
      { name: "Machine Learning", level: 95 },
      { name: "Cloud Architecture", level: 98 },
      { name: "Leadership", level: 96 },
    ],
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Head of Curriculum",
    bio: "Passionate educator with a track record of developing industry-leading curricula that bridge academia and real-world applications.",
    color: "#ff00ff",
    avatar: "/placeholder.svg?height=300&width=300",
    skills: [
      { name: "React/Next.js", level: 98 },
      { name: "Curriculum Design", level: 96 },
      { name: "Mentoring", level: 99 },
    ],
  },
  {
    id: 3,
    name: "Dr. Aisha Patel",
    role: "Director of Research",
    bio: "Research-driven leader combining data science with educational psychology to create evidence-based learning experiences.",
    color: "#00ff00",
    avatar: "/placeholder.svg?height=300&width=300",
    skills: [
      { name: "Data Science", level: 97 },
      { name: "Research", level: 99 },
      { name: "Analytics", level: 93 },
    ],
  },
  {
    id: 4,
    name: "James Kim",
    role: "Senior Full-Stack Engineer",
    bio: "Full-stack engineer specializing in high-performance systems and security-first development practices for educational platforms.",
    color: "#ffff00",
    avatar: "/placeholder.svg?height=300&width=300",
    skills: [
      { name: "System Design", level: 94 },
      { name: "Security", level: 96 },
      { name: "Performance", level: 92 },
    ],
  },
]

function HolographicProfile({
  member,
  isSelected,
  onClick,
  mouseX,
  mouseY,
  index,
}: {
  member: TeamMember
  isSelected: boolean
  onClick: () => void
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  index: number
}) {
  // Holographic response to cursor
  const holoX = useTransform(mouseX, [0, window?.innerWidth || 1920], [-20, 20])
  const holoY = useTransform(mouseY, [0, window?.innerHeight || 1080], [-20, 20])

  return (
    <motion.div
      className="relative cursor-pointer group"
      style={{
        x: holoX,
        y: holoY,
      }}
      onClick={onClick}
      whileHover={{
        scale: 1.1,
        rotateY: 10,
        z: 50,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`relative p-6 rounded-3xl backdrop-blur-xl border-2 bg-black/60 overflow-hidden transition-all duration-500 ${
          isSelected ? `border-${member.color} scale-105` : "border-white/30 hover:border-white/50"
        }`}
        style={{
          borderColor: isSelected ? member.color : undefined,
          boxShadow: isSelected
            ? `0 0 80px ${member.color}60, inset 0 0 80px ${member.color}20`
            : `0 0 40px ${member.color}30, inset 0 0 40px ${member.color}10`,
        }}
        animate={{
          boxShadow: isSelected
            ? [
                `0 0 80px ${member.color}60, inset 0 0 80px ${member.color}20`,
                `0 0 120px ${member.color}80, inset 0 0 120px ${member.color}40`,
                `0 0 80px ${member.color}60, inset 0 0 80px ${member.color}20`,
              ]
            : [
                `0 0 40px ${member.color}30, inset 0 0 40px ${member.color}10`,
                `0 0 60px ${member.color}40, inset 0 0 60px ${member.color}20`,
                `0 0 40px ${member.color}30, inset 0 0 40px ${member.color}10`,
              ],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: index * 0.5,
        }}
      >
        {/* Holographic Grid Background */}
        <motion.div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(${member.color}40 1px, transparent 1px),
              linear-gradient(90deg, ${member.color}40 1px, transparent 1px)
            `,
            backgroundSize: "25px 25px",
          }}
        />

        {/* Holographic Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: member.color,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 40 - 20, 0],
                y: [0, Math.random() * 40 - 20, 0],
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

        {/* Profile Content */}
        <div className="relative z-10">
          {/* Holographic Avatar */}
          <div className="relative mb-6">
            <motion.div
              className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 relative"
              style={{ borderColor: member.color }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              animate={{
                boxShadow: [`0 0 20px ${member.color}60`, `0 0 40px ${member.color}80`, `0 0 20px ${member.color}60`],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <img src={member.avatar || "/placeholder.svg"} alt={member.name} className="w-full h-full object-cover" />

              {/* Holographic Overlay */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${member.color}30, transparent 70%)`,
                }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Status Indicator */}
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full border-4 border-black flex items-center justify-center"
              style={{ backgroundColor: member.color }}
              animate={{
                scale: [1, 1.3, 1],
                boxShadow: [`0 0 10px ${member.color}80`, `0 0 20px ${member.color}FF`, `0 0 10px ${member.color}80`],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <div className="w-2 h-2 bg-black rounded-full" />
            </motion.div>
          </div>

          {/* Name and Role */}
          <div className="text-center mb-4">
            <motion.h4
              className="text-white font-bold text-lg mb-2"
              style={{
                textShadow: `0 0 10px ${member.color}80`,
              }}
              whileHover={{
                scale: 1.05,
                textShadow: `0 0 15px ${member.color}FF`,
              }}
            >
              {member.name}
            </motion.h4>
            <motion.p
              className="text-sm font-medium mb-1"
              style={{ color: member.color }}
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              {member.role}
            </motion.p>
            <motion.div
              className="text-xs font-mono opacity-60"
              animate={{
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              ID: HOLO_{String(member.id).padStart(3, "0")}
            </motion.div>
          </div>

          {/* Quick Skills Preview */}
          <div className="flex flex-wrap gap-2 justify-center">
            {member.skills.slice(0, 2).map((skill, skillIndex) => (
              <motion.span
                key={skillIndex}
                className="px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm"
                style={{
                  backgroundColor: `${member.color}20`,
                  borderColor: `${member.color}60`,
                  color: member.color,
                }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: `${member.color}30`,
                  borderColor: member.color,
                }}
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 2 + skillIndex * 0.3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                {skill.name}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Selection Indicator */}
        {isSelected && (
          <motion.div
            className="absolute inset-0 rounded-3xl border-2"
            style={{ borderColor: member.color }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [0.98, 1.02, 0.98],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Holographic Corner Brackets */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 border-2"
            style={{
              borderColor: member.color,
              [i === 0 ? "top" : i === 1 ? "top" : "bottom"]: "8px",
              [i === 0 ? "left" : i === 1 ? "right" : i === 2 ? "left" : "right"]: "8px",
              borderWidth: i === 0 ? "2px 0 0 2px" : i === 1 ? "2px 2px 0 0" : i === 2 ? "0 0 2px 2px" : "0 2px 2px 0",
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

function HolographicSkillBar({ skill, color }: { skill: { name: string; level: number }; color: string }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-white/90 text-sm font-medium">{skill.name}</span>
        <span className="text-white/70 text-sm">{skill.level}%</span>
      </div>
      <div className="relative w-full bg-white/10 rounded-full h-3 overflow-hidden border border-white/20">
        <motion.div
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}80, ${color}FF, ${color}80, ${color})`,
            backgroundSize: "300% 100%",
          }}
          initial={{ width: 0 }}
          animate={{
            width: `${skill.level}%`,
            backgroundPosition: ["0% 0%", "300% 0%"],
          }}
          transition={{
            width: { duration: 2, ease: "easeOut" },
            backgroundPosition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          }}
        />

        {/* Holographic Energy Pulse */}
        <motion.div
          className="absolute top-0 h-full w-6 rounded-full opacity-80"
          style={{
            background: `radial-gradient(circle, ${color}FF, ${color}80, transparent)`,
            filter: "blur(1px)",
          }}
          animate={{
            x: ["-100%", `${skill.level}%`],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  )
}

export default function HolographicTeamMatrix({
  mouseX,
  mouseY,
}: { mouseX: MotionValue<number>; mouseY: MotionValue<number> }) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(teamMembers[0])

  return (
    <div className="space-y-16">
      {/* Holographic Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h3
          className="text-4xl md:text-5xl font-black text-white mb-6 relative"
          style={{
            background: "linear-gradient(45deg, #00ffff, #ff00ff, #00ff00, #ffff00)",
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
          TEAM MEMBERS
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
          Digital Human Interface Network
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Team Grid */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 60, rotateY: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
              >
                <HolographicProfile
                  member={member}
                  isSelected={selectedMember?.id === member.id}
                  onClick={() => setSelectedMember(member)}
                  mouseX={mouseX}
                  mouseY={mouseY}
                  index={index}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detailed Holographic Profile */}
        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {selectedMember && (
              <motion.div
                key={selectedMember.id}
                className="sticky top-8 p-8 rounded-3xl backdrop-blur-xl border-2 bg-black/60 overflow-hidden"
                style={{
                  borderColor: selectedMember.color,
                  boxShadow: `0 0 80px ${selectedMember.color}40, inset 0 0 80px ${selectedMember.color}20`,
                }}
                initial={{ opacity: 0, x: 60, rotateY: -30 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -60, rotateY: 30 }}
                transition={{ duration: 0.6 }}
                whileHover={{
                  boxShadow: `0 0 120px ${selectedMember.color}60, inset 0 0 120px ${selectedMember.color}30`,
                }}
              >
                {/* Holographic Background */}
                <motion.div
                  className="absolute inset-0 opacity-10"
                  style={{
                    background: `conic-gradient(from 0deg, ${selectedMember.color}00, ${selectedMember.color}80, ${selectedMember.color}00)`,
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />

                {/* Header */}
                <div className="relative z-10 text-center mb-8">
                  <motion.div
                    className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 mb-4 relative"
                    style={{ borderColor: selectedMember.color }}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    animate={{
                      boxShadow: [
                        `0 0 30px ${selectedMember.color}60`,
                        `0 0 60px ${selectedMember.color}80`,
                        `0 0 30px ${selectedMember.color}60`,
                      ],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <img
                      src={selectedMember.avatar || "/placeholder.svg"}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Holographic Overlay */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `radial-gradient(circle, ${selectedMember.color}20, transparent 70%)`,
                      }}
                      animate={{
                        opacity: [0.2, 0.5, 0.2],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>

                  <h4 className="text-white font-bold text-2xl mb-2">{selectedMember.name}</h4>
                  <p className="text-lg mb-4" style={{ color: selectedMember.color }}>
                    {selectedMember.role}
                  </p>
                </div>

                {/* Bio */}
                <div className="relative z-10 mb-8">
                  <h5 className="text-white font-bold mb-3 flex items-center">
                    <motion.div
                      className="w-2 h-2 rounded-full mr-3"
                      style={{ backgroundColor: selectedMember.color }}
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
                    Profile Data
                  </h5>
                  <p className="text-white/80 text-sm leading-relaxed">{selectedMember.bio}</p>
                </div>

                {/* Holographic Skills */}
                <div className="relative z-10">
                  <h5 className="text-white font-bold mb-4 flex items-center">
                    <motion.div
                      className="w-2 h-2 rounded-full mr-3"
                      style={{ backgroundColor: selectedMember.color }}
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
                    Skill Matrix
                  </h5>
                  {selectedMember.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <HolographicSkillBar skill={skill} color={selectedMember.color} />
                    </motion.div>
                  ))}
                </div>

                {/* Holographic Data Stream */}
                <motion.div
                  className="relative z-10 mt-6 pt-6 border-t border-white/20"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <div className="text-xs font-mono text-white/60">
                    HOLO_ID: {selectedMember.id} | STATUS: ACTIVE | SYNC: 100%
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
