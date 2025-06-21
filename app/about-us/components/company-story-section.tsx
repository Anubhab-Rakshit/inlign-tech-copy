"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Calendar, Users, Award, TrendingUp } from "lucide-react"

const milestones = [
  {
    year: "2020",
    title: "Foundation",
    description: "Inlighn Tech was founded with a vision to revolutionize tech education",
    icon: Calendar,
    color: "#06b6d4",
  },
  {
    year: "2021",
    title: "First 1000 Students",
    description: "Reached our first major milestone with 1000+ successful interns",
    icon: Users,
    color: "#8b5cf6",
  },
  {
    year: "2022",
    title: "Industry Recognition",
    description: "Received multiple awards for innovation in education technology",
    icon: Award,
    color: "#f59e0b",
  },
  {
    year: "2024",
    title: "Global Expansion",
    description: "Expanded to serve students across 25+ countries worldwide",
    icon: TrendingUp,
    color: "#10b981",
  },
]

export default function CompanyStorySection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <motion.section ref={sectionRef} className="py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-800" />

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0.3, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 mb-6 px-6 py-3 rounded-full border border-cyan-400/30 bg-cyan-400/10 backdrop-blur-sm"
            animate={{
              boxShadow: [
                "0 0 20px rgba(6, 182, 212, 0.3)",
                "0 0 40px rgba(6, 182, 212, 0.5)",
                "0 0 20px rgba(6, 182, 212, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Calendar className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-medium">OUR JOURNEY</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Our Story
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            From a passionate idea to a leading EdTech platform transforming lives
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 via-purple-500 to-green-400 rounded-full" />

          {/* Milestones */}
          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                  <motion.div
                    className="p-6 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 relative"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: `0 0 30px ${milestone.color}40`,
                    }}
                    style={{
                      boxShadow: `0 0 20px ${milestone.color}20`,
                    }}
                  >
                    <div
                      className={`flex items-center space-x-3 mb-4 ${index % 2 === 0 ? "justify-end" : "justify-start"}`}
                    >
                      <motion.div
                        className="p-3 rounded-xl"
                        style={{ backgroundColor: `${milestone.color}20` }}
                        animate={{
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        <milestone.icon className="w-6 h-6" style={{ color: milestone.color }} />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white">{milestone.title}</h3>
                    </div>
                    <p className="text-white/70 leading-relaxed">{milestone.description}</p>

                    {/* Floating Particles */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 rounded-full"
                          style={{
                            backgroundColor: milestone.color,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: Math.random() * 2,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Timeline Node */}
                <div className="w-2/12 flex justify-center">
                  <motion.div
                    className="relative w-16 h-16 rounded-full border-4 border-white bg-black flex items-center justify-center"
                    style={{
                      boxShadow: `0 0 20px ${milestone.color}80`,
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <span className="text-white font-bold text-sm">{milestone.year}</span>

                    {/* Pulse Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2"
                      style={{ borderColor: milestone.color }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.8, 0, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </div>

                {/* Empty Space */}
                <div className="w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
