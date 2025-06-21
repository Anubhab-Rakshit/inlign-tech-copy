"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { BookOpen, Users, Search, Award } from "lucide-react"

const benefits = [
  {
    id: 1,
    title: "High Quality Resources",
    description:
      "Our expertly designed resources provide hands-on learning and real-world skills. With up-to-date content and personalized mentorship, you'll gain the knowledge needed to succeed in today's tech industry.",
    icon: BookOpen,
    color: "#f59e0b",
    gradient: "from-orange-400 to-yellow-500",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    title: "Expert Instructors",
    description:
      "Learn from seasoned industry professionals who bring real-world experience and insights to every lesson, guiding you with practical knowledge to help you succeed.",
    icon: Users,
    color: "#8b5cf6",
    gradient: "from-purple-400 to-violet-500",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    title: "Internship Portal Access",
    description:
      "Get separate portal access to all course materials and updates, allowing you to learn at your own pace and stay up-to-date with industry trends long after you've completed the program.",
    icon: Search,
    color: "#06b6d4",
    gradient: "from-cyan-400 to-blue-500",
    image: "/placeholder.svg?height=300&width=400",
  },
]

function BenefitCard({ benefit, index }: any) {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.3, 1, 1, 0.8])

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{ opacity: 0.2, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-80px" }}
      style={{ rotateX, opacity }}
      whileHover={{ scale: 1.02, rotateY: 5 }}
    >
      {/* Orbital Rings */}
      <motion.div
        className="absolute inset-0 rounded-3xl border-2 opacity-30"
        style={{ borderColor: benefit.color }}
        animate={{
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
      />

      {/* Main Card */}
      <motion.div
        className="relative p-8 rounded-3xl backdrop-blur-xl border border-white/10 bg-black/20 overflow-hidden"
        style={{
          boxShadow: `0 0 40px ${benefit.color}40`,
        }}
        whileHover={{
          boxShadow: `0 0 60px ${benefit.color}60`,
        }}
      >
        {/* Animated Background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-10`}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: benefit.color,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className="mb-6 flex justify-center"
            animate={{
              y: [0, -10, 0],
              rotateZ: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div
              className="p-6 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${benefit.color}40, ${benefit.color}20)`,
                boxShadow: `0 0 30px ${benefit.color}60`,
              }}
            >
              <benefit.icon className="w-12 h-12" style={{ color: benefit.color }} />
            </div>
          </motion.div>

          {/* Title */}
          <h3
            className="text-2xl md:text-3xl font-bold text-white mb-6 text-center"
            style={{
              textShadow: `0 0 20px ${benefit.color}80`,
            }}
          >
            {benefit.title}
          </h3>

          {/* Description */}
          <p className="text-white/70 text-center leading-relaxed mb-6">{benefit.description}</p>

          {/* Interactive Element */}
          <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
            <motion.button
              className="px-6 py-3 rounded-xl backdrop-blur-sm border text-white font-medium transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${benefit.color}30, ${benefit.color}20)`,
                borderColor: `${benefit.color}60`,
              }}
              whileHover={{
                background: `linear-gradient(135deg, ${benefit.color}40, ${benefit.color}30)`,
              }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function BenefitsSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <motion.section ref={sectionRef} className="py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-800" />

      {/* Connecting Lines */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 800">
          {[...Array(10)].map((_, i) => (
            <motion.path
              key={i}
              d={`M${Math.random() * 1200},${Math.random() * 800} Q${Math.random() * 1200},${Math.random() * 800} ${Math.random() * 1200},${Math.random() * 800}`}
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: i * 0.5,
              }}
            />
          ))}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 mb-6 px-6 py-3 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-sm"
            animate={{
              boxShadow: [
                "0 0 20px rgba(245, 158, 11, 0.3)",
                "0 0 40px rgba(245, 158, 11, 0.5)",
                "0 0 20px rgba(245, 158, 11, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Award className="w-5 h-5 text-orange-400" />
            <span className="text-orange-400 font-medium">THE BEST BENEFICIAL SIDE</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-400 via-yellow-500 to-red-500 bg-clip-text text-transparent">
              Why Choose Inlighn Tech
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Discover the advantages that set us apart in the EdTech landscape
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.id} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}
