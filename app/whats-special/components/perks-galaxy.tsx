"use client"

import { motion } from "framer-motion"
import { Award, Gift, Clock, BadgeIcon as Certificate, Star, Zap } from "lucide-react"

const perks = [
  {
    id: 1,
    title: "Top 10 Intern Reward",
    subtitle: "₹15,000 stipend + Welcome kit",
    description: "Outstanding interns receive substantial financial rewards plus exclusive branded merchandise",
    icon: Award,
    color: "#f59e0b",
    gradient: "from-yellow-400 to-orange-500",
    image: "/placeholder.svg?height=300&width=400",
    features: ["₹15,000 Cash Reward", "Premium Welcome Kit", "Exclusive Swag Pack", "Certificate of Excellence"],
  },
  {
    id: 2,
    title: "Offer Letter",
    subtitle: "Within 30 minutes",
    description: "Lightning-fast offer letter generation for exceptional performers",
    icon: Clock,
    color: "#10b981",
    gradient: "from-green-400 to-emerald-500",
    image: "/placeholder.svg?height=300&width=400",
    features: ["Instant Processing", "Digital Certificate", "Career Advancement", "Priority Consideration"],
  },
  {
    id: 3,
    title: "ISO Certification",
    subtitle: "Quality Management System",
    description: "Learn from an ISO 9001:2015 certified organization with proven quality standards",
    icon: Certificate,
    color: "#8b5cf6",
    gradient: "from-purple-400 to-violet-500",
    image: "/placeholder.svg?height=300&width=400",
    features: ["ISO 9001:2015 Certified", "Quality Assurance", "Industry Standards", "Professional Recognition"],
  },
]

function PerkCard({ perk, index }: any) {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 100, rotateX: -30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, delay: index * 0.3 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, rotateY: 5 }}
    >
      {/* Orbital Rings */}
      <motion.div
        className="absolute inset-0 rounded-3xl border-2 opacity-30"
        style={{ borderColor: perk.color }}
        animate={{
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
      />

      <motion.div
        className="absolute inset-4 rounded-3xl border opacity-20"
        style={{ borderColor: perk.color }}
        animate={{
          rotate: -360,
          scale: [1, 1.03, 1],
        }}
        transition={{
          rotate: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
      />

      {/* Main Card */}
      <motion.div
        className="relative p-8 rounded-3xl backdrop-blur-xl border border-white/10 bg-black/20 overflow-hidden"
        style={{
          boxShadow: `0 0 40px ${perk.color}40`,
        }}
        whileHover={{
          boxShadow: `0 0 60px ${perk.color}60`,
        }}
      >
        {/* Animated Background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${perk.gradient} opacity-10`}
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
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: perk.color,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 4,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-6">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4"
              style={{
                background: `linear-gradient(135deg, ${perk.color}40, ${perk.color}20)`,
                boxShadow: `0 0 30px ${perk.color}60`,
              }}
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
              <perk.icon className="w-10 h-10" style={{ color: perk.color }} />
            </motion.div>

            <h3
              className="text-2xl md:text-3xl font-bold text-white mb-2"
              style={{
                textShadow: `0 0 20px ${perk.color}80`,
              }}
            >
              {perk.title}
            </h3>
            <p className="text-lg font-semibold" style={{ color: perk.color }}>
              {perk.subtitle}
            </p>
          </div>

          {/* Image */}
          <motion.div className="relative h-48 rounded-2xl overflow-hidden mb-6" whileHover={{ scale: 1.05 }}>
            <img src={perk.image || "/placeholder.svg"} alt={perk.title} className="w-full h-full object-cover" />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
              style={{
                background: `linear-gradient(to top, ${perk.color}40, transparent)`,
              }}
            />
          </motion.div>

          {/* Description */}
          <p className="text-white/70 text-center mb-6 leading-relaxed">{perk.description}</p>

          {/* Features */}
          <div className="space-y-3">
            {perk.features.map((feature: string, featureIndex: number) => (
              <motion.div
                key={featureIndex}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + featureIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: perk.color }}
                  animate={{
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: featureIndex * 0.3,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-white/80 text-sm">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* Energy Pulse */}
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-1 rounded-full"
            style={{ backgroundColor: perk.color }}
            animate={{
              scaleX: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function PerksGalaxy() {
  return (
    <section className="py-20 px-4 relative">
      {/* Galaxy Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-purple-500/10 to-green-500/10"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(245, 158, 11, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 15,
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
            className="inline-flex items-center space-x-2 mb-6 px-6 py-3 rounded-full border border-yellow-500/30 bg-yellow-500/10 backdrop-blur-sm"
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
            <Star className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">REWARDS CONSTELLATION</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Perks & Benefits
            </span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Unlock extraordinary rewards in our quantum-enhanced ecosystem
          </motion.p>
        </motion.div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {perks.map((perk, index) => (
            <PerkCard key={perk.id} perk={perk} index={index} />
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-16 py-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-black font-bold text-2xl rounded-3xl shadow-2xl transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 50px -12px rgba(245, 158, 11, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 40px rgba(245, 158, 11, 0.3)",
                "0 0 60px rgba(245, 158, 11, 0.5)",
                "0 0 40px rgba(245, 158, 11, 0.3)",
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
              <Zap className="w-8 h-8" />
              <span>Experience the Extraordinary</span>
              <Gift className="w-8 h-8" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
