"use client"

import { motion } from "framer-motion"
import { CheckCircle, ArrowRight, Users, FileText, Send, Clock } from "lucide-react"

const steps = [
  {
    id: 1,
    title: "Eligibility Check",
    description: "If you're in your last month of internship, you're eligible!",
    icon: CheckCircle,
    color: "#10b981",
    detail: "You'll receive a Google Form to apply for this prestigious title",
  },
  {
    id: 2,
    title: "Submit Projects",
    description: "Submit your best projects related to your domain!",
    icon: FileText,
    color: "#3b82f6",
    detail: "Showcase your skills through comprehensive project documentation",
  },
  {
    id: 3,
    title: "Evaluation Process",
    description: "Our expert panel reviews your submissions",
    icon: Users,
    color: "#8b5cf6",
    detail: "Projects are evaluated based on innovation, technical depth, and impact",
  },
  {
    id: 4,
    title: "Results & Recognition",
    description: "Top 10 interns receive amazing rewards!",
    icon: Send,
    color: "#f59e0b",
    detail: "Winners are announced and celebrated across our platform",
  },
]

function StepCard({ step, index }: any) {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Connection Line */}
      {index < steps.length - 1 && (
        <motion.div
          className="absolute top-16 left-1/2 w-px h-24 bg-gradient-to-b from-white/30 to-transparent z-0"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 1, delay: index * 0.3 + 0.5 }}
          viewport={{ once: true }}
        />
      )}

      {/* Main Card */}
      <motion.div
        className="relative p-8 rounded-3xl backdrop-blur-xl border border-white/10 bg-black/20 text-center z-10"
        style={{
          boxShadow: `0 0 30px ${step.color}40`,
        }}
        whileHover={{
          boxShadow: `0 0 50px ${step.color}60`,
        }}
      >
        {/* Step Number */}
        <motion.div
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
          style={{ backgroundColor: step.color }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {step.id}
        </motion.div>

        {/* Icon */}
        <motion.div
          className="mb-6 flex justify-center"
          animate={{
            y: [0, -5, 0],
            rotateZ: [0, 2, -2, 0],
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
              background: `linear-gradient(135deg, ${step.color}40, ${step.color}20)`,
              boxShadow: `0 0 30px ${step.color}60`,
            }}
          >
            <step.icon className="w-10 h-10" style={{ color: step.color }} />
          </div>
        </motion.div>

        {/* Title */}
        <h3
          className="text-2xl font-bold text-white mb-4"
          style={{
            textShadow: `0 0 20px ${step.color}80`,
          }}
        >
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-white/70 mb-4 leading-relaxed">{step.description}</p>

        {/* Detail */}
        <motion.div
          className="p-4 rounded-xl border border-white/10 bg-white/5"
          initial={{ opacity: 0, height: 0 }}
          whileInView={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.5, delay: index * 0.1 + 1 }}
          viewport={{ once: true }}
        >
          <p className="text-white/60 text-sm">{step.detail}</p>
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: step.color,
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

export default function ParticipationPortal() {
  return (
    <section className="py-20 px-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
              "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1), rgba(16, 185, 129, 0.1))",
              "linear-gradient(225deg, rgba(139, 92, 246, 0.1), rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))",
            ],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
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
            <ArrowRight className="w-6 h-6 text-blue-400" />
            <span className="text-blue-400 font-semibold">PARTICIPATION GATEWAY</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              How to Participate?
            </span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Your journey to recognition starts here - follow these quantum steps
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <StepCard key={step.id} step={step} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 mb-6 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-sm"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Clock className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">APPLICATIONS OPEN NOW</span>
          </motion.div>

          <motion.button
            className="px-12 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:from-blue-600 hover:via-purple-600 hover:to-cyan-600 text-white font-bold text-xl rounded-2xl shadow-2xl transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 30px rgba(59, 130, 246, 0.3)",
                "0 0 50px rgba(59, 130, 246, 0.5)",
                "0 0 30px rgba(59, 130, 246, 0.3)",
              ],
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
          >
            <span className="flex items-center space-x-2">
              <Send className="w-6 h-6" />
              <span>Start Your Application</span>
              <ArrowRight className="w-6 h-6" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
