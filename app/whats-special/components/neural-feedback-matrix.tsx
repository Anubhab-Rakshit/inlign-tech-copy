"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Quote, Star, ThumbsUp, Heart, MessageCircle, Brain, Activity, Zap } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Niha Anjum",
    role: "Cybersecurity Specialist",
    image: "/placeholder.svg?height=300&width=300",
    feedback:
      "I really appreciate the hands-on approach, even in the early stages - there are plenty of projects that make the concepts more practical and engaging. The video explanations are clear and easy to follow, which helps a lot, especially when diving into technical topics. One thing I've noticed is that the internship focuses more on videos than on PDF notes. This is great for visual learners like me, though having a few quick-reference guides could make revision even easier.",
    rating: 5,
    specialty: "Network Security",
    duration: "3 months",
    projects: 8,
    techStack: ["Python", "Nmap", "Metasploit", "Wireshark"],
    performance: 94,
    codeLines: 15420,
  },
  {
    id: 2,
    name: "Garima Patel",
    role: "Data Analytics Expert",
    image: "/placeholder.svg?height=300&width=300",
    feedback:
      "The structured curriculum and hands-on projects have been incredible. I gained valuable insights into data analysis where I enjoyed building my portfolio using Power BI. The mentorship provided was excellent and helped me gain deep knowledge.",
    rating: 5,
    specialty: "Data Visualization",
    duration: "4 months",
    projects: 12,
    techStack: ["Power BI", "Python", "SQL", "Tableau"],
    performance: 96,
    codeLines: 22150,
  },
  {
    id: 3,
    name: "Shiva Kiran",
    role: "Python Developer",
    image: "/placeholder.svg?height=300&width=300",
    feedback:
      "The Python programming projects were challenging yet rewarding. The step-by-step approach helped me understand complex concepts easily. The real-world applications made learning more meaningful.",
    rating: 5,
    specialty: "Backend Development",
    duration: "3 months",
    projects: 10,
    techStack: ["Python", "Django", "PostgreSQL", "Docker"],
    performance: 92,
    codeLines: 18750,
  },
]

function NeuralCard({ testimonial, isActive, onClick }: any) {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={cardRef}
      className={`relative p-6 rounded-3xl backdrop-blur-xl border cursor-pointer transition-all duration-500 group ${
        isActive
          ? "border-cyan-400/50 bg-cyan-400/10 scale-105"
          : "border-white/10 bg-black/20 hover:border-white/20 hover:bg-white/5"
      }`}
      onClick={onClick}
      style={{ rotateX, opacity }}
      whileHover={{
        y: -15,
        rotateY: 5,
        transition: { duration: 0.3 },
      }}
      layout
    >
      {/* Neural Network Background */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 300">
          {[...Array(20)].map((_, i) => (
            <motion.circle
              key={i}
              cx={Math.random() * 400}
              cy={Math.random() * 300}
              r="2"
              fill="currentColor"
              className="text-cyan-400"
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
              x1={Math.random() * 400}
              y1={Math.random() * 300}
              x2={Math.random() * 400}
              y2={Math.random() * 300}
              stroke="currentColor"
              strokeWidth="1"
              className="text-cyan-400/30"
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

      {/* Holographic Effect */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: "conic-gradient(from 0deg, #06b6d4, transparent, #06b6d4)",
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
        {/* Profile Section with Tech Enhancement */}
        <div className="flex items-center space-x-4 mb-4">
          <motion.div
            className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400/30"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <img
              src={testimonial.image || "/placeholder.svg"}
              alt={testimonial.name}
              className="w-full h-full object-cover"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-transparent"
              animate={{
                opacity: isActive ? [0.2, 0.5, 0.2] : 0.2,
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Neural Activity Indicator */}
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black flex items-center justify-center"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <Activity className="w-2 h-2 text-black" />
            </motion.div>
          </motion.div>

          <div className="flex-1">
            <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
            <p className="text-cyan-400 text-sm">{testimonial.role}</p>
            <div className="flex items-center space-x-1 mt-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                >
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Performance Indicator */}
          <motion.div className="text-right" whileHover={{ scale: 1.1 }}>
            <div className="text-cyan-400 font-bold text-lg">{testimonial.performance}%</div>
            <div className="text-white/60 text-xs">Performance</div>
          </motion.div>
        </div>

        {/* Tech Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <motion.div
            className="text-center p-2 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-lg border border-cyan-400/20"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(6, 182, 212, 0.2)" }}
          >
            <div className="text-cyan-400 font-bold text-sm">{testimonial.projects}</div>
            <div className="text-white/60 text-xs">Projects</div>
          </motion.div>
          <motion.div
            className="text-center p-2 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-lg border border-purple-400/20"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(147, 51, 234, 0.2)" }}
          >
            <div className="text-purple-400 font-bold text-sm">{testimonial.duration}</div>
            <div className="text-white/60 text-xs">Duration</div>
          </motion.div>
          <motion.div
            className="text-center p-2 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-lg border border-green-400/20"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 197, 94, 0.2)" }}
          >
            <div className="text-green-400 font-bold text-sm">{(testimonial.codeLines / 1000).toFixed(1)}k</div>
            <div className="text-white/60 text-xs">Lines</div>
          </motion.div>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1 mb-4">
          {testimonial.techStack.slice(0, 3).map((tech: string, index: number) => (
            <motion.span
              key={index}
              className="px-2 py-1 bg-black/60 rounded text-xs text-cyan-400 border border-cyan-400/30"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(6, 182, 212, 0.2)",
                borderColor: "rgba(6, 182, 212, 0.6)",
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {tech}
            </motion.span>
          ))}
          {testimonial.techStack.length > 3 && (
            <span className="px-2 py-1 bg-black/40 rounded text-xs text-white/70">
              +{testimonial.techStack.length - 3}
            </span>
          )}
        </div>

        {/* Feedback Preview */}
        <p className="text-white/70 text-sm line-clamp-3 mb-4">{testimonial.feedback}</p>

        {/* Interactive Elements */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {[ThumbsUp, Heart, MessageCircle].map((Icon, index) => (
              <motion.button
                key={index}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-4 h-4 text-white/60" />
              </motion.button>
            ))}
          </div>

          <motion.div
            className="flex items-center space-x-1"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            <Brain className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-cyan-400">Neural Active</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default function NeuralFeedbackMatrix() {
  const [selectedTestimonial, setSelectedTestimonial] = useState(testimonials[0])
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <motion.section ref={sectionRef} className="py-20 px-4 relative overflow-hidden" style={{ y: backgroundY }}>
      {/* Neural Network Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(6, 182, 212, 0.3) 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.3) 1px, transparent 1px)
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
        {/* Enhanced Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center space-x-3 mb-6 px-6 py-3 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm"
            animate={{
              boxShadow: [
                "0 0 20px rgba(147, 51, 234, 0.3)",
                "0 0 40px rgba(147, 51, 234, 0.5)",
                "0 0 20px rgba(147, 51, 234, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.05 }}
          >
            <Brain className="w-6 h-6 text-purple-400" />
            <span className="text-purple-400 font-semibold">NEURAL FEEDBACK MATRIX</span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Zap className="w-5 h-5 text-purple-400" />
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            whileHover={{
              scale: 1.02,
              textShadow: "0 0 30px rgba(147, 51, 234, 0.8)",
            }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Feedback from Our Interns
            </span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Real experiences from our quantum-enhanced learning environment
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Testimonial Cards */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 50, rotateX: -30 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <NeuralCard
                    testimonial={testimonial}
                    isActive={selectedTestimonial.id === testimonial.id}
                    onClick={() => setSelectedTestimonial(testimonial)}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Enhanced Detailed View */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTestimonial.id}
                className="sticky top-8 p-8 rounded-3xl backdrop-blur-xl border border-white/10 bg-black/20 overflow-hidden"
                initial={{ opacity: 0, x: 50, rotateY: -30 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -50, rotateY: 30 }}
                transition={{ duration: 0.5 }}
                style={{
                  boxShadow: "0 0 50px rgba(6, 182, 212, 0.3)",
                }}
                whileHover={{
                  boxShadow: "0 0 70px rgba(6, 182, 212, 0.5)",
                  scale: 1.02,
                }}
              >
                {/* Neural Activity Visualization */}
                <div className="absolute top-4 right-4">
                  <motion.div
                    className="w-12 h-12 border-2 border-cyan-400/30 rounded-full flex items-center justify-center"
                    animate={{
                      rotate: 360,
                      borderColor: ["rgba(6, 182, 212, 0.3)", "rgba(6, 182, 212, 0.8)", "rgba(6, 182, 212, 0.3)"],
                    }}
                    transition={{
                      rotate: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                      borderColor: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                    }}
                  >
                    <Activity className="w-6 h-6 text-cyan-400" />
                  </motion.div>
                </div>

                {/* Profile Header */}
                <div className="text-center mb-6">
                  <motion.div
                    className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-cyan-400/50 mb-4 relative"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <img
                      src={selectedTestimonial.image || "/placeholder.svg"}
                      alt={selectedTestimonial.name}
                      className="w-full h-full object-cover"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-cyan-400/30 to-transparent"
                      animate={{
                        opacity: [0.3, 0.7, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                  </motion.div>
                  <h3 className="text-white font-bold text-2xl">{selectedTestimonial.name}</h3>
                  <p className="text-cyan-400 text-lg">{selectedTestimonial.role}</p>
                </div>

                {/* Performance Metrics */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3 flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                    Performance Metrics
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/80">Overall Performance</span>
                        <span className="text-cyan-400">{selectedTestimonial.performance}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div
                          className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedTestimonial.performance}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <motion.div
                        className="p-3 bg-white/5 rounded-xl text-center border border-cyan-400/20"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                      >
                        <div className="text-2xl font-bold text-cyan-400">{selectedTestimonial.projects}</div>
                        <div className="text-white/60 text-sm">Projects</div>
                      </motion.div>
                      <motion.div
                        className="p-3 bg-white/5 rounded-xl text-center border border-purple-400/20"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(147, 51, 234, 0.1)" }}
                      >
                        <div className="text-2xl font-bold text-purple-400">
                          {(selectedTestimonial.codeLines / 1000).toFixed(1)}k
                        </div>
                        <div className="text-white/60 text-sm">Code Lines</div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Full Feedback */}
                <motion.div
                  className="mb-6"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <motion.div
                    className="p-6 bg-gradient-to-br from-cyan-400/10 to-purple-400/10 rounded-2xl border border-cyan-400/20 relative overflow-hidden"
                    whileHover={{
                      borderColor: "rgba(6, 182, 212, 0.5)",
                      backgroundColor: "rgba(6, 182, 212, 0.15)",
                    }}
                  >
                    <Quote className="w-8 h-8 text-cyan-400 mb-4" />
                    <p className="text-white/80 leading-relaxed">{selectedTestimonial.feedback}</p>

                    {/* Animated quote marks */}
                    <motion.div
                      className="absolute top-2 right-2 text-cyan-400/20"
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Quote className="w-12 h-12" />
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-white font-semibold mb-3">Technology Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTestimonial.techStack.map((tech: string, index: number) => (
                      <motion.span
                        key={index}
                        className="px-3 py-1 rounded-full text-xs font-medium border"
                        style={{
                          background: `linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(147, 51, 234, 0.2))`,
                          borderColor: "rgba(6, 182, 212, 0.4)",
                          color: "#06b6d4",
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, type: "spring" }}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(6, 182, 212, 0.3)",
                          borderColor: "rgba(6, 182, 212, 0.8)",
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
