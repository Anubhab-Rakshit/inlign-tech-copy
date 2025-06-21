"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { FileText, Phone, Mail, FolderOpen, Award, ArrowRight } from "lucide-react"

const journeySteps = [
  {
    id: 1,
    title: "Registration Form & Portal Access",
    description: "Register yourself at InLighn Tech and get your portal access",
    icon: FileText,
    color: "#06b6d4",
    position: { x: 10, y: 20 },
  },
  {
    id: 2,
    title: "Interview Call - Next Day",
    description: "Prepare for your interview and showcase your potential",
    icon: Phone,
    color: "#8b5cf6",
    position: { x: 30, y: 40 },
  },
  {
    id: 3,
    title: "Offer Letter with Batch Group Link",
    description: "Once you receive Offer Letter, You will get access of WhatsApp Group",
    icon: Mail,
    color: "#10b981",
    position: { x: 50, y: 60 },
  },
  {
    id: 4,
    title: "Select Your Project and Submit Work",
    description: "Select your project on your own or select the project given in the portal and submit your work",
    icon: FolderOpen,
    color: "#f59e0b",
    position: { x: 70, y: 40 },
  },
  {
    id: 5,
    title: "Experience Letter & Letter of Completion",
    description:
      "Once you Submit your Project, You'll get ISO-Certified Completion Certificate and Letter of Completion",
    icon: Award,
    color: "#ef4444",
    position: { x: 90, y: 20 },
  },
]

export default function InternshipJourneySection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <motion.section ref={sectionRef} className="py-20 px-4 relative overflow-hidden">
      {/* Background with Teal Gradient */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-teal-900/60 via-cyan-800/40 to-blue-900/60"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(13, 148, 136, 0.6), rgba(21, 94, 117, 0.4), rgba(30, 58, 138, 0.6))",
              "linear-gradient(135deg, rgba(21, 94, 117, 0.6), rgba(30, 58, 138, 0.4), rgba(13, 148, 136, 0.6))",
              "linear-gradient(225deg, rgba(30, 58, 138, 0.6), rgba(13, 148, 136, 0.4), rgba(21, 94, 117, 0.6))",
            ],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Curved Road Background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1200 800">
          <motion.path
            d="M100,400 Q300,200 600,400 T1100,400"
            stroke="rgba(6, 182, 212, 0.5)"
            strokeWidth="8"
            fill="none"
            strokeDasharray="20,10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </svg>
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
            className="inline-flex items-center space-x-2 mb-6 px-6 py-3 rounded-full border border-teal-500/30 bg-teal-500/10 backdrop-blur-sm"
            animate={{
              boxShadow: [
                "0 0 20px rgba(20, 184, 166, 0.3)",
                "0 0 40px rgba(20, 184, 166, 0.5)",
                "0 0 20px rgba(20, 184, 166, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <ArrowRight className="w-5 h-5 text-teal-400" />
            <span className="text-teal-400 font-medium">ROADMAP OF INTERNSHIP JOURNEY</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Your Journey With Us
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Follow our structured path to success and transform your career
          </p>
        </motion.div>

        {/* Journey Visualization */}
        <div className="relative h-96 mb-16">
          {/* Animated Road */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 400">
            <motion.path
              d="M50,200 Q250,100 500,200 T950,200"
              stroke="rgba(75, 85, 99, 0.8)"
              strokeWidth="60"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.path
              d="M50,200 Q250,100 500,200 T950,200"
              stroke="rgba(6, 182, 212, 0.6)"
              strokeWidth="4"
              fill="none"
              strokeDasharray="20,10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          </svg>

          {/* Journey Steps */}
          {journeySteps.map((step, index) => (
            <motion.div
              key={step.id}
              className="absolute"
              style={{
                left: `${step.position.x}%`,
                top: `${step.position.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0.2, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.1, z: 10 }}
            >
              {/* Step Marker */}
              <motion.div
                className="relative w-20 h-20 rounded-full border-4 border-white flex items-center justify-center cursor-pointer group"
                style={{
                  backgroundColor: step.color,
                  boxShadow: `0 0 20px ${step.color}80`,
                }}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <step.icon className="w-8 h-8 text-white" />

                {/* Step Number */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold">
                  {step.id}
                </div>

                {/* Pulse Effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: step.color }}
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

                {/* Tooltip */}
                <motion.div
                  className="absolute bottom-full mb-4 w-64 p-4 bg-black/90 backdrop-blur-sm rounded-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ y: 10 }}
                  whileHover={{ y: 0 }}
                >
                  <h4 className="text-white font-semibold mb-2">{step.title}</h4>
                  <p className="text-white/70 text-sm">{step.description}</p>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Begin Journey CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-12 py-4 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 hover:from-teal-600 hover:via-cyan-600 hover:to-blue-600 text-white font-bold text-xl rounded-2xl shadow-2xl transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 50px -12px rgba(20, 184, 166, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 30px rgba(20, 184, 166, 0.3)",
                "0 0 50px rgba(20, 184, 166, 0.5)",
                "0 0 30px rgba(20, 184, 166, 0.3)",
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
            <span className="flex items-center space-x-3">
              <span>Begin Your Journey</span>
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                <ArrowRight className="w-6 h-6" />
              </motion.div>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}
