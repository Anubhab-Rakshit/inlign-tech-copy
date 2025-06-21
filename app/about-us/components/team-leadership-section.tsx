"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Users, Linkedin, Twitter, Mail } from "lucide-react"

const teamMembers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Founder & CEO",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Visionary leader with 15+ years in EdTech, passionate about bridging the gap between education and industry needs.",
    expertise: ["EdTech Innovation", "Strategic Leadership", "Industry Relations"],
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "rajesh@inlighntech.com",
    },
    color: "#3b82f6",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Chief Technology Officer",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Tech innovator driving our platform development with expertise in AI, machine learning, and scalable systems.",
    expertise: ["AI/ML", "System Architecture", "Product Development"],
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "priya@inlighntech.com",
    },
    color: "#8b5cf6",
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Head of Curriculum",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Education specialist designing industry-relevant curricula that prepare students for real-world challenges.",
    expertise: ["Curriculum Design", "Industry Analysis", "Learning Methodologies"],
    social: {
      linkedin: "https://linkedin.com",
      email: "amit@inlighntech.com",
    },
    color: "#10b981",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    role: "Director of Operations",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Operations expert ensuring seamless delivery of our programs and exceptional student experience.",
    expertise: ["Operations Management", "Quality Assurance", "Student Success"],
    social: {
      linkedin: "https://linkedin.com",
      email: "sarah@inlighntech.com",
    },
    color: "#f59e0b",
  },
]

function TeamMemberCard({ member, index }: any) {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0.2, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ scale: 1.02, rotateY: 5 }}
    >
      {/* Card Background */}
      <motion.div
        className="relative p-6 rounded-3xl backdrop-blur-xl border border-white/10 bg-black/20 overflow-hidden"
        style={{
          boxShadow: `0 0 30px ${member.color}40`,
        }}
        whileHover={{
          boxShadow: `0 0 50px ${member.color}60`,
        }}
      >
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            background: `linear-gradient(135deg, ${member.color}40, transparent, ${member.color}20)`,
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Profile Image */}
        <div className="relative mb-6">
          <motion.div
            className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white/20 relative"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-full object-cover" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20"
              animate={{
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Status Indicator */}
          <motion.div
            className="absolute bottom-0 right-1/2 transform translate-x-8 w-4 h-4 bg-green-400 rounded-full border-2 border-black"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Member Info */}
        <div className="text-center mb-6">
          <h3 className="text-white font-bold text-xl mb-1">{member.name}</h3>
          <p className="text-white/70 mb-3">{member.role}</p>
          <p className="text-white/60 text-sm leading-relaxed">{member.bio}</p>
        </div>

        {/* Expertise Tags */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {member.expertise.map((skill: string, skillIndex: number) => (
            <motion.span
              key={skillIndex}
              className="px-3 py-1 rounded-full text-xs font-medium border"
              style={{
                background: `${member.color}20`,
                borderColor: `${member.color}40`,
                color: member.color,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + skillIndex * 0.1, type: "spring" }}
              whileHover={{
                scale: 1.1,
                backgroundColor: `${member.color}30`,
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4">
          {member.social.linkedin && (
            <motion.a
              href={member.social.linkedin}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin className="w-4 h-4 text-white/70" />
            </motion.a>
          )}
          {member.social.twitter && (
            <motion.a
              href={member.social.twitter}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <Twitter className="w-4 h-4 text-white/70" />
            </motion.a>
          )}
          {member.social.email && (
            <motion.a
              href={`mailto:${member.social.email}`}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail className="w-4 h-4 text-white/70" />
            </motion.a>
          )}
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: member.color,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
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
      </motion.div>
    </motion.div>
  )
}

export default function TeamLeadershipSection() {
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

      {/* Team Network Visualization */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800">
          {[...Array(20)].map((_, i) => (
            <motion.circle
              key={i}
              cx={Math.random() * 1200}
              cy={Math.random() * 800}
              r="2"
              fill="currentColor"
              className="text-blue-400"
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
          {[...Array(15)].map((_, i) => (
            <motion.line
              key={`line-${i}`}
              x1={Math.random() * 1200}
              y1={Math.random() * 800}
              x2={Math.random() * 1200}
              y2={Math.random() * 800}
              stroke="currentColor"
              strokeWidth="1"
              className="text-purple-400/30"
              animate={{
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
              }}
            />
          ))}
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
            className="inline-flex items-center space-x-2 mb-6 px-6 py-3 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm"
            animate={{
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.3)",
                "0 0 40px rgba(59, 130, 246, 0.5)",
                "0 0 20px rgba(59, 130, 246, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-medium">LEADERSHIP TEAM</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Meet Our Leaders
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Visionary leaders driving innovation in education technology
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </div>

        {/* Team Stats */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0.3, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {[
            { label: "Years Combined Experience", value: "50+", color: "#3b82f6" },
            { label: "Students Mentored", value: "10,000+", color: "#8b5cf6" },
            { label: "Industry Partnerships", value: "100+", color: "#10b981" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10"
              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 30px ${stat.color}40`,
              }}
            >
              <motion.div
                className="text-4xl font-bold mb-2"
                style={{ color: stat.color }}
                animate={{
                  textShadow: [`0 0 10px ${stat.color}80`, `0 0 20px ${stat.color}80`, `0 0 10px ${stat.color}80`],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                {stat.value}
              </motion.div>
              <div className="text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
