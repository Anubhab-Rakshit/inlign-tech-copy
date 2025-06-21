
"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface Program {
  id: number
  title: string
  duration: string
  description: string
  skills: string[]
  level: string
  color: string
  icon: string
}

const programs: Program[] = [
  {
    id: 1,
    title: "Business Analyst Internship Program",
    duration: "6 months intensive",
    description: "Gain practical business analysis skills by working on real projects with industry mentors",
    skills: ["Data Analysis", "SQL", "Excel", "Power BI", "Business Intelligence"],
    level: "Beginner to Intermediate",
    color: "#3B82F6",
    icon: "chart",
  },
  {
    id: 2,
    title: "Front-End Development Internship",
    duration: "8 months comprehensive",
    description: "Kickstart your journey into web development by building modern, responsive applications",
    skills: ["React", "JavaScript", "HTML/CSS", "Node.js", "Git"],
    level: "Beginner to Advanced",
    color: "#10B981",
    icon: "code",
  },
  {
    id: 3,
    title: "Ethical Hacking with Kali Linux",
    duration: "10 months specialized",
    description: "Gain practical skills in cybersecurity and ethical hacking using industry-standard tools",
    skills: ["Penetration Testing", "Network Security", "Linux", "Python", "Cryptography"],
    level: "Intermediate to Advanced",
    color: "#EF4444",
    icon: "shield",
  },
  {
    id: 4,
    title: "Full Stack Development Mastery",
    duration: "12 months complete",
    description: "Master both frontend and backend development to become a complete software engineer",
    skills: ["React", "Node.js", "MongoDB", "Express", "AWS"],
    level: "Beginner to Expert",
    color: "#8B5CF6",
    icon: "layers",
  },
  {
    id: 5,
    title: "Data Science & AI Bootcamp",
    duration: "14 months intensive",
    description: "Transform raw data into actionable insights using machine learning and AI technologies",
    skills: ["Python", "Machine Learning", "TensorFlow", "Statistics", "Data Visualization"],
    level: "Intermediate to Expert",
    color: "#F59E0B",
    icon: "brain",
  },
  {
    id: 6,
    title: "Cloud Architecture Specialist",
    duration: "10 months specialized",
    description: "Design scalable cloud solutions with AWS, Azure, and modern DevOps practices",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
    level: "Intermediate to Advanced",
    color: "#06B6D4",
    icon: "cloud",
  },
]

const CustomIcon = ({ type, color }: { type: string; color: string }) => {
  const iconVariants = {
    hover: { scale: 1.2, rotate: 360 },
    tap: { scale: 0.9 },
  }

  switch (type) {
    case "chart":
      return (
        <motion.svg variants={iconVariants} width="40" height="40" viewBox="0 0 40 40" fill="none">
          <motion.path
            d="M8 32V20M16 32V12M24 32V16M32 32V8"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.circle
            cx="8"
            cy="20"
            r="3"
            fill={color}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.circle
            cx="16"
            cy="12"
            r="3"
            fill={color}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
          />
          <motion.circle
            cx="24"
            cy="16"
            r="3"
            fill={color}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          />
          <motion.circle
            cx="32"
            cy="8"
            r="3"
            fill={color}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
          />
        </motion.svg>
      )
    case "code":
      return (
        <motion.svg variants={iconVariants} width="40" height="40" viewBox="0 0 40 40" fill="none">
          <motion.path
            d="M12 8L4 20L12 32M28 8L36 20L28 32M24 4L16 36"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </motion.svg>
      )
    case "shield":
      return (
        <motion.svg variants={iconVariants} width="40" height="40" viewBox="0 0 40 40" fill="none">
          <motion.path
            d="M20 4L32 8V20C32 28 20 36 20 36C20 36 8 28 8 20V8L20 4Z"
            stroke={color}
            strokeWidth="2"
            fill={`${color}20`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M16 20L18 22L24 16"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />
        </motion.svg>
      )
    case "layers":
      return (
        <motion.svg variants={iconVariants} width="40" height="40" viewBox="0 0 40 40" fill="none">
          <motion.path
            d="M20 8L32 14L20 20L8 14L20 8Z"
            stroke={color}
            strokeWidth="2"
            fill={`${color}40`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5 }}
          />
          <motion.path
            d="M8 20L20 26L32 20"
            stroke={color}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          <motion.path
            d="M8 26L20 32L32 26"
            stroke={color}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          />
        </motion.svg>
      )
    case "brain":
      return (
        <motion.svg variants={iconVariants} width="40" height="40" viewBox="0 0 40 40" fill="none">
          <motion.path
            d="M12 8C8 8 6 12 8 16C6 18 8 22 12 20C10 24 14 28 18 26C16 30 20 34 24 32C22 36 28 36 32 32C36 28 32 24 28 26C32 24 34 20 30 18C34 16 32 12 28 14C30 10 26 6 22 8C24 4 20 2 16 6C14 4 10 6 12 8Z"
            stroke={color}
            strokeWidth="2"
            fill={`${color}20`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <motion.circle
            cx="16"
            cy="16"
            r="2"
            fill={color}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.circle
            cx="24"
            cy="20"
            r="2"
            fill={color}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
          />
        </motion.svg>
      )
    case "cloud":
      return (
        <motion.svg variants={iconVariants} width="40" height="40" viewBox="0 0 40 40" fill="none">
          <motion.path
            d="M12 24C8 24 6 20 8 16C10 12 16 12 18 16C20 12 26 12 28 16C30 12 36 14 34 20C38 20 38 28 32 28H12Z"
            stroke={color}
            strokeWidth="2"
            fill={`${color}30`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.circle
            cx="16"
            cy="20"
            r="1"
            fill={color}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.circle
            cx="20"
            cy="22"
            r="1"
            fill={color}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
          />
          <motion.circle
            cx="24"
            cy="20"
            r="1"
            fill={color}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
          />
        </motion.svg>
      )
    default:
      return null
  }
}

const QuantumParticle = ({ x, y, color }: { x: number; y: number; color: string }) => {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full"
      style={{
        left: x,
        top: y,
        backgroundColor: color,
        boxShadow: `0 0 10px ${color}`,
      }}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
      }}
    />
  )
}

const ProgramCard = ({ program, index }: { program: Program; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [particles, setParticles] = useState<Array<{ x: number; y: number; id: number }>>([])
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (isHovered) {
      const newParticle = {
        x: x + Math.random() * 20 - 10,
        y: y + Math.random() * 20 - 10,
        id: Date.now() + Math.random(),
      }

      setParticles((prev) => [...prev.slice(-10), newParticle])
    }
  }

  useEffect(() => {
    if (particles.length > 0) {
      const timer = setTimeout(() => {
        setParticles((prev) => prev.slice(1))
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [particles])

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 100, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
        z: 50,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Quantum Particles */}
      {particles.map((particle) => (
        <QuantumParticle key={particle.id} x={particle.x} y={particle.y} color={program.color} />
      ))}

      {/* Card Background with Morphing Effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: `linear-gradient(135deg, ${program.color}20, ${program.color}40, ${program.color}20)`,
          backdropFilter: "blur(20px)",
          border: `1px solid ${program.color}40`,
        }}
        animate={{
          background: isHovered
            ? `linear-gradient(135deg, ${program.color}40, ${program.color}60, ${program.color}40)`
            : `linear-gradient(135deg, ${program.color}20, ${program.color}40, ${program.color}20)`,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Glowing Border Effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: `linear-gradient(45deg, transparent, ${program.color}60, transparent)`,
          opacity: 0,
        }}
        animate={{
          opacity: isHovered ? 0.5 : 0,
          rotate: isHovered ? 360 : 0,
        }}
        transition={{ duration: 2, ease: "linear", repeat: isHovered ? Number.POSITIVE_INFINITY : 0 }}
      />

      {/* Card Content */}
      <div className="relative p-8 h-full flex flex-col">
        {/* Icon Section */}
        <motion.div className="flex justify-center mb-6" whileHover="hover" whileTap="tap">
          <CustomIcon type={program.icon} color={program.color} />
        </motion.div>

        {/* Title */}
        <motion.h3
          className="text-2xl font-bold text-white mb-4 text-center"
          animate={{
            color: isHovered ? program.color : "#ffffff",
          }}
        >
          {program.title}
        </motion.h3>

        {/* Duration Badge */}
        <motion.div
          className="inline-flex items-center justify-center px-4 py-2 rounded-full mb-4 mx-auto"
          style={{
            backgroundColor: `${program.color}30`,
            border: `1px solid ${program.color}60`,
          }}
          animate={{
            scale: isHovered ? 1.1 : 1,
            backgroundColor: isHovered ? `${program.color}50` : `${program.color}30`,
          }}
        >
          <span className="text-sm font-medium text-white">{program.duration}</span>
        </motion.div>

        {/* Description */}
        <p className="text-gray-300 text-center mb-6 flex-grow">{program.description}</p>

        {/* Skills */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-400 mb-3 text-center">Key Skills</h4>
          <div className="flex flex-wrap gap-2 justify-center">
            {program.skills.map((skill, skillIndex) => (
              <motion.span
                key={skill}
                className="px-3 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: `${program.color}20`,
                  color: program.color,
                  border: `1px solid ${program.color}40`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 + skillIndex * 0.1 }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: `${program.color}40`,
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Level Badge */}
        <motion.div
          className="text-center mb-6"
          animate={{
            y: isHovered ? -5 : 0,
          }}
        >
          <span className="text-sm text-gray-400">Level: </span>
          <span className="font-semibold" style={{ color: program.color }}>
            {program.level}
          </span>
        </motion.div>

        {/* Learn More Button */}
        <motion.button
          className="w-full py-3 rounded-xl font-semibold transition-all duration-300"
          style={{
            backgroundColor: program.color,
            color: "white",
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: `0 10px 30px ${program.color}40`,
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            animate={{
              x: isHovered ? 5 : 0,
            }}
          >
            Learn More →
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function ProgramsPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [backgroundParticles, setBackgroundParticles] = useState<
    Array<{ x: number; y: number; color: string; id: number }>
  >([])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 10 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 10 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      // Create background particles occasionally
      if (Math.random() < 0.1) {
        const colors = ["#3B82F6", "#10B981", "#EF4444", "#8B5CF6", "#F59E0B", "#06B6D4"]
        const newParticle = {
          x: e.clientX + Math.random() * 100 - 50,
          y: e.clientY + Math.random() * 100 - 50,
          color: colors[Math.floor(Math.random() * colors.length)],
          id: Date.now() + Math.random(),
        }

        setBackgroundParticles((prev) => [...prev.slice(-20), newParticle])
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    if (backgroundParticles.length > 0) {
      const timer = setTimeout(() => {
        setBackgroundParticles((prev) => prev.slice(1))
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [backgroundParticles])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Quantum Background Field */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            x: springX,
            y: springY,
          }}
          animate={{
            backgroundPosition: ["0px 0px", "50px 50px"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Background Particles */}
        {backgroundParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              backgroundColor: particle.color,
              boxShadow: `0 0 20px ${particle.color}`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-40">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6"
            style={{
              background: "linear-gradient(45deg, #3B82F6, #10B981, #EF4444, #8B5CF6)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              backgroundSize: "400% 400%",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            Quantum Programs
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Experience the future of education with our revolutionary program universe. Each program exists in its own
            quantum field, waiting for you to discover.
          </motion.p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {programs.map((program, index) => (
            <ProgramCard key={program.id} program={program} index={index} />
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.button
            className="px-12 py-4 text-xl font-bold rounded-full"
            style={{
              background: "linear-gradient(45deg, #3B82F6, #10B981, #EF4444, #8B5CF6)",
              backgroundSize: "400% 400%",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Programs
          </motion.button>
        </motion.div>
      </div>

      {/* Cursor Follower */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.6), transparent)",
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  )
}
