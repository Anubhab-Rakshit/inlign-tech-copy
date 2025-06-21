"use client"

import { motion } from "framer-motion"
import { Trophy, Gift, Star, Zap, Crown, Award } from "lucide-react"

const rewards = [
  {
    id: 1,
    title: "A Stipend Reward of ₹15,000!",
    description: "Top 10 outstanding interns receive this incredible financial reward",
    icon: Trophy,
    color: "#f59e0b",
    gradient: "from-yellow-400 to-orange-500",
    particles: 15,
  },
  {
    id: 2,
    title: "An Exclusive Inlighn Tech Welcome Kit & Swag Pack!",
    description: "Premium branded merchandise and exclusive welcome package",
    icon: Gift,
    color: "#8b5cf6",
    gradient: "from-purple-400 to-pink-500",
    particles: 12,
  },
  {
    id: 3,
    title: "Special Recognition on Our Platform!",
    description: "Featured spotlight on our website and social media channels",
    icon: Star,
    color: "#06b6d4",
    gradient: "from-cyan-400 to-blue-500",
    particles: 10,
  },
]

function RewardCard({ reward, index }: any) {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 100, rotateX: -30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
    >
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(reward.particles)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: reward.color,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
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

      {/* Main Card */}
      <motion.div
        className="relative p-8 rounded-3xl backdrop-blur-xl border border-white/10 bg-black/20 overflow-hidden"
        style={{
          boxShadow: `0 0 30px ${reward.color}40`,
        }}
        whileHover={{
          boxShadow: `0 0 50px ${reward.color}60`,
        }}
      >
        {/* Animated Background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${reward.gradient} opacity-10`}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Holographic Border */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2"
          style={{
            borderColor: reward.color,
            opacity: 0.3,
          }}
          animate={{
            borderColor: [reward.color, `${reward.color}80`, reward.color],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

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
                background: `linear-gradient(135deg, ${reward.color}40, ${reward.color}20)`,
                boxShadow: `0 0 30px ${reward.color}60`,
              }}
            >
              <reward.icon className="w-12 h-12" style={{ color: reward.color }} />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-white mb-4 text-center"
            style={{
              textShadow: `0 0 20px ${reward.color}80`,
            }}
          >
            {reward.title}
          </motion.h3>

          {/* Description */}
          <p className="text-white/70 text-center leading-relaxed">{reward.description}</p>

          {/* Energy Pulse */}
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 rounded-full"
            style={{ backgroundColor: reward.color }}
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

export default function ChallengeArena() {
  return (
    <section className="py-20 px-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-purple-500/10 to-cyan-500/10"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(245, 158, 11, 0.1), rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1))",
              "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1), rgba(245, 158, 11, 0.1))",
              "linear-gradient(225deg, rgba(6, 182, 212, 0.1), rgba(245, 158, 11, 0.1), rgba(139, 92, 246, 0.1))",
            ],
          }}
          transition={{
            duration: 10,
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
            <Crown className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">EPIC OPPORTUNITY ARENA</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Interns of the Month Challenge
            </span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Inlighn Tech is bringing you an EPIC opportunity with the "Interns of the Month Challenge!" 🎉✨
          </motion.p>

          <motion.p
            className="text-lg text-white/70 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Every single month, we're recognizing 10 OUTSTANDING interns who have shown exceptional dedication,
            innovation, and top-tier performance! 🏆
          </motion.p>
        </motion.div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {rewards.map((reward, index) => (
            <RewardCard key={reward.id} reward={reward} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-12 py-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-black font-bold text-xl rounded-2xl shadow-2xl transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 50px -12px rgba(245, 158, 11, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 30px rgba(245, 158, 11, 0.3)",
                "0 0 50px rgba(245, 158, 11, 0.5)",
                "0 0 30px rgba(245, 158, 11, 0.3)",
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
              <Zap className="w-6 h-6" />
              <span>Join the Challenge</span>
              <Award className="w-6 h-6" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
