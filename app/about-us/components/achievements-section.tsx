"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { Award, Shield, Star, Trophy, BadgeIcon as Certificate, CheckCircle } from "lucide-react"

const achievements = [
  {
    id: 1,
    title: "ISO 9001:2015 Certified",
    description: "Quality Management System certification ensuring world-class educational standards",
    icon: Shield,
    color: "#10b981",
    image:
      "/certificate-1.png",
    year: "2023",
    category: "Quality Certification",
  },
  {
    id: 2,
    title: "Government Recognition",
    description: "Officially recognized by the Ministry of Corporate Affairs, Government of India",
    icon: Award,
    color: "#3b82f6",
    image:
      "/certificate-2.png",
    year: "2022",
    category: "Official Recognition",
  },
  {
    id: 3,
    title: "Industry Excellence Award",
    description: "Recognized for innovation in EdTech and outstanding contribution to skill development",
    icon: Trophy,
    color: "#f59e0b",
    image: "/placeholder.svg?height=400&width=600",
    year: "2024",
    category: "Industry Award",
  },
  {
    id: 4,
    title: "Student Success Rate",
    description: "Achieved 95% student satisfaction and 90% job placement rate",
    icon: Star,
    color: "#8b5cf6",
    image: "/placeholder.svg?height=400&width=600",
    year: "2024",
    category: "Performance Metric",
  },
]

function AchievementCard({ achievement, index, isSelected, onClick }: any) {
  return (
    <motion.div
      className={`relative p-6 rounded-3xl backdrop-blur-xl border cursor-pointer transition-all duration-500 ${
        isSelected
          ? "border-white/30 bg-white/10 scale-105"
          : "border-white/10 bg-black/20 hover:border-white/20 hover:bg-white/5"
      }`}
      onClick={onClick}
      whileHover={{ y: -10 }}
      layout
    >
      {/* Holographic Effect */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: `conic-gradient(from 0deg, ${achievement.color}, transparent, ${achievement.color})`,
            filter: "blur(20px)",
            opacity: 0.3,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <motion.div
            className="p-3 rounded-xl"
            style={{ background: `${achievement.color}20` }}
            animate={{
              rotate: isSelected ? [0, 5, -5, 0] : 0,
            }}
            transition={{
              duration: 2,
              repeat: isSelected ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
            }}
          >
            <achievement.icon className="w-6 h-6" style={{ color: achievement.color }} />
          </motion.div>

          <div className="text-right">
            <div className="text-xs text-white/60">{achievement.year}</div>
            <div className="text-xs" style={{ color: achievement.color }}>
              {achievement.category}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-lg mb-2">{achievement.title}</h3>

        {/* Description */}
        <p className="text-white/60 text-sm line-clamp-3">{achievement.description}</p>

        {/* Selection Indicator */}
        {isSelected && (
          <motion.div
            className="absolute top-4 right-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            <CheckCircle className="w-5 h-5 text-green-400" />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default function AchievementsSection() {
  const [selectedAchievement, setSelectedAchievement] = useState(achievements[0])
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

      {/* Certificate Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.3) 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
          animate={{
            backgroundPosition: ["0 0", "60px 60px"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
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
            className="inline-flex items-center space-x-2 mb-6 px-6 py-3 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-sm"
            animate={{
              boxShadow: [
                "0 0 20px rgba(16, 185, 129, 0.3)",
                "0 0 40px rgba(16, 185, 129, 0.5)",
                "0 0 20px rgba(16, 185, 129, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Certificate className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">OUR RECOGNITIONS</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Our Achievements
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Recognition and certifications that validate our commitment to excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Achievement Cards */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0.2, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true, margin: "-80px" }}
                >
                  <AchievementCard
                    achievement={achievement}
                    index={index}
                    isSelected={selectedAchievement.id === achievement.id}
                    onClick={() => setSelectedAchievement(achievement)}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Detailed View */}
          <div className="lg:col-span-1">
            <motion.div
              key={selectedAchievement.id}
              className="sticky top-8 rounded-3xl backdrop-blur-xl border border-white/10 bg-black/20 overflow-hidden"
              initial={{ opacity: 0.3, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                boxShadow: `0 0 50px ${selectedAchievement.color}40`,
              }}
            >
              {/* Certificate Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={selectedAchievement.image || "/placeholder.svg"}
                  alt={selectedAchievement.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
                  style={{
                    background: `linear-gradient(to top, ${selectedAchievement.color}40, transparent)`,
                  }}
                />
              </div>

              <div className="p-6">
                {/* Title & Category */}
                <h3 className="text-white font-bold text-xl mb-2">{selectedAchievement.title}</h3>
                <p className="text-white/70 mb-4">
                  <span style={{ color: selectedAchievement.color }}>{selectedAchievement.category}</span> •{" "}
                  {selectedAchievement.year}
                </p>

                {/* Description */}
                <p className="text-white/70 text-sm leading-relaxed mb-6">{selectedAchievement.description}</p>

                {/* Verification Badge */}
                <motion.div
                  className="flex items-center space-x-2 p-3 rounded-xl border border-green-400/30 bg-green-400/10"
                  whileHover={{ scale: 1.02 }}
                >
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-medium text-sm">Verified Achievement</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
