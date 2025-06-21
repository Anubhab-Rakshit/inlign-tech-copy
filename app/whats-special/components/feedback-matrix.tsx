"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Quote, Star, ThumbsUp, Heart, MessageCircle } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Niha Anjum",
    role: "Cybersecurity Intern",
    image: "/placeholder.svg?height=300&width=300",
    feedback:
      "I really appreciate the hands-on approach, even in the early stages - there are plenty of projects that make the concepts more practical and engaging. The video explanations are clear and easy to follow, which helps a lot, especially when diving into technical topics. One thing I've noticed is that the internship focuses more on videos than on PDF notes. This is great for visual learners like me, though having a few quick-reference guides could make revision even easier.",
    rating: 5,
    specialty: "Network Security",
    duration: "3 months",
    projects: 8,
  },
  {
    id: 2,
    name: "Garima Patel",
    role: "Data Analytics Intern",
    image: "/placeholder.svg?height=300&width=300",
    feedback:
      "The structured curriculum and hands-on projects have been incredible. I gained valuable insights into data analysis where I enjoyed building my portfolio using Power BI. The mentorship provided was excellent and helped me gain deep knowledge.",
    rating: 5,
    specialty: "Data Visualization",
    duration: "4 months",
    projects: 12,
  },
  {
    id: 3,
    name: "Shiva Kiran",
    role: "Python Developer Intern",
    image: "/placeholder.svg?height=300&width=300",
    feedback:
      "The Python programming projects were challenging yet rewarding. The step-by-step approach helped me understand complex concepts easily. The real-world applications made learning more meaningful.",
    rating: 5,
    specialty: "Backend Development",
    duration: "3 months",
    projects: 10,
  },
]

function TestimonialCard({ testimonial, isActive, onClick }: any) {
  return (
    <motion.div
      className={`relative p-6 rounded-3xl backdrop-blur-xl border cursor-pointer transition-all duration-500 ${
        isActive
          ? "border-cyan-400/50 bg-cyan-400/10 scale-105"
          : "border-white/10 bg-black/20 hover:border-white/20 hover:bg-white/5"
      }`}
      onClick={onClick}
      whileHover={{ y: -10 }}
      layout
    >
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
        {/* Profile Section */}
        <div className="flex items-center space-x-4 mb-4">
          <motion.div
            className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400/30"
            whileHover={{ scale: 1.1 }}
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
          </motion.div>

          <div>
            <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
            <p className="text-cyan-400 text-sm">{testimonial.role}</p>
            <div className="flex items-center space-x-1 mt-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-2 bg-white/5 rounded-lg">
            <div className="text-cyan-400 font-bold text-sm">{testimonial.specialty}</div>
            <div className="text-white/60 text-xs">Specialty</div>
          </div>
          <div className="text-center p-2 bg-white/5 rounded-lg">
            <div className="text-cyan-400 font-bold text-sm">{testimonial.duration}</div>
            <div className="text-white/60 text-xs">Duration</div>
          </div>
          <div className="text-center p-2 bg-white/5 rounded-lg">
            <div className="text-cyan-400 font-bold text-sm">{testimonial.projects}</div>
            <div className="text-white/60 text-xs">Projects</div>
          </div>
        </div>

        {/* Feedback Preview */}
        <p className="text-white/70 text-sm line-clamp-3">{testimonial.feedback}</p>

        {/* Interaction Icons */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex space-x-2">
            <motion.button
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ThumbsUp className="w-4 h-4 text-white/60" />
            </motion.button>
            <motion.button
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="w-4 h-4 text-white/60" />
            </motion.button>
          </div>
          <MessageCircle className="w-4 h-4 text-cyan-400" />
        </div>
      </div>
    </motion.div>
  )
}

export default function FeedbackMatrix() {
  const [selectedTestimonial, setSelectedTestimonial] = useState(testimonials[0])

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 mb-6 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm"
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
          >
            <Quote className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 font-medium">NEURAL FEEDBACK MATRIX</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Feedback from Our Interns
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Real experiences from our quantum-enhanced learning environment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Testimonial Cards */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <TestimonialCard
                    testimonial={testimonial}
                    isActive={selectedTestimonial.id === testimonial.id}
                    onClick={() => setSelectedTestimonial(testimonial)}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Detailed View */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTestimonial.id}
                className="sticky top-8 p-8 rounded-3xl backdrop-blur-xl border border-white/10 bg-black/20"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                style={{
                  boxShadow: "0 0 50px rgba(6, 182, 212, 0.3)",
                }}
              >
                {/* Profile Header */}
                <div className="text-center mb-6">
                  <motion.div
                    className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-cyan-400/50 mb-4"
                    whileHover={{ scale: 1.1 }}
                  >
                    <img
                      src={selectedTestimonial.image || "/placeholder.svg"}
                      alt={selectedTestimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <h3 className="text-white font-bold text-2xl">{selectedTestimonial.name}</h3>
                  <p className="text-cyan-400 text-lg">{selectedTestimonial.role}</p>
                </div>

                {/* Full Feedback */}
                <div className="mb-6">
                  <motion.div
                    className="p-6 bg-gradient-to-br from-cyan-400/10 to-purple-400/10 rounded-2xl border border-cyan-400/20"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Quote className="w-8 h-8 text-cyan-400 mb-4" />
                    <p className="text-white/80 leading-relaxed">{selectedTestimonial.feedback}</p>
                  </motion.div>
                </div>

                {/* Enhanced Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div className="p-4 bg-white/5 rounded-xl text-center" whileHover={{ scale: 1.05 }}>
                    <div className="text-2xl font-bold text-cyan-400">{selectedTestimonial.projects}</div>
                    <div className="text-white/60 text-sm">Projects Completed</div>
                  </motion.div>
                  <motion.div className="p-4 bg-white/5 rounded-xl text-center" whileHover={{ scale: 1.05 }}>
                    <div className="text-2xl font-bold text-purple-400">{selectedTestimonial.rating}.0</div>
                    <div className="text-white/60 text-sm">Rating</div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
