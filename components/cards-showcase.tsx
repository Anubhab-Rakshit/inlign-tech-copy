"use client"

import { motion } from "framer-motion"
import { Shield, Code, Brain, BarChart3, Eye, Layers, Zap, Database, Network, Cpu, Sparkles } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import ALL advanced cards to prevent SSR issues
const HolographicCard = dynamic(() => import("./advanced-cards/holographic-card"), { ssr: false })
const MorphingGeometryCard = dynamic(() => import("./advanced-cards/morphing-geometry-card"), { ssr: false })
const LiquidMetalCard = dynamic(() => import("./advanced-cards/liquid-metal-card"), { ssr: false })
const FloatingFragmentCard = dynamic(() => import("./advanced-cards/floating-fragment-card"), { ssr: false })
const PortalWindowCard = dynamic(() => import("./advanced-cards/portal-window-card"), { ssr: false })
const OrigamiCard = dynamic(() => import("./advanced-cards/origami-card"), { ssr: false })

export default function CardsShowcase() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-purple-900/30 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex items-center justify-center mb-6"
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <Sparkles className="w-8 h-8 text-cyan-400 mr-4" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Revolutionary Programs
            </h2>
            <Sparkles className="w-8 h-8 text-purple-400 ml-4" />
          </motion.div>
          <motion.p
            className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Experience the future of tech education with our advanced learning programs that adapt, evolve, and
            transform
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Holographic Card - Cybersecurity */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <HolographicCard
              title="Cybersecurity Elite"
              subtitle="Digital Defense Mastery"
              description="Master the art of digital defense with our comprehensive cybersecurity program featuring real-world simulations, ethical hacking techniques, and cutting-edge security protocols."
              icon={Shield}
              gradient="#ef4444, #dc2626, #b91c1c"
              stats={[
                { label: "Success Rate", value: "98%" },
                { label: "Job Placement", value: "95%" },
              ]}
            />
          </motion.div>

          {/* Morphing Geometry Card - Full Stack */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <MorphingGeometryCard
              title="Full Stack Mastery"
              description="Transform into a complete developer with our immersive full-stack program that adapts to your learning style and evolves with industry demands."
              icon={Code}
              color="#06b6d4"
              features={["Frontend Excellence", "Backend Mastery", "Database Design", "Cloud Deployment"]}
            />
          </motion.div>

          {/* Liquid Metal Card - AI & ML */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <LiquidMetalCard
              title="AI & Machine Learning"
              subtitle="Intelligence Engineering"
              description="Dive deep into the ocean of artificial intelligence and emerge with powerful machine learning skills that shape the future of technology."
              icon={Brain}
              metalColor="#8b5cf6"
              rippleColor="#a855f7"
              stats={[
                { label: "Models Built", value: "50+" },
                { label: "Accuracy Rate", value: "94%" },
              ]}
            />
          </motion.div>

          {/* Floating Fragment Card - Data Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <FloatingFragmentCard
              title="Data Analytics Pro"
              description="Assemble powerful insights from scattered data fragments using our comprehensive analysis toolkit and advanced visualization techniques."
              icon={BarChart3}
              color="#f59e0b"
              fragments={[
                { content: "Excel", position: { x: 10, y: 20 }, size: "small" },
                { content: "SQL", position: { x: 70, y: 15 }, size: "medium" },
                { content: "Power BI", position: { x: 15, y: 60 }, size: "large" },
                { content: "Tableau", position: { x: 65, y: 70 }, size: "medium" },
                { content: "Python", position: { x: 40, y: 45 }, size: "small" },
              ]}
            />
          </motion.div>

          {/* Portal Window Card - Data Science */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <PortalWindowCard
              title="Data Science Portal"
              description="Step through the portal into the world of data science and witness the transformation of raw data into actionable intelligence."
              icon={Eye}
              portalColor="#10b981"
              worldType="neural"
              stats={[
                { label: "Projects", value: "25+" },
                { label: "Accuracy", value: "97%" },
              ]}
            />
          </motion.div>

          {/* Origami Card - Cloud Computing */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <OrigamiCard
              title="Cloud Computing"
              description="Unfold the layers of cloud technology and discover the infinite possibilities of distributed computing, scalable architectures, and modern DevOps practices."
              icon={Layers}
              color="#ec4899"
              folds={[
                {
                  title: "Infrastructure",
                  content:
                    "Master cloud infrastructure with AWS, Azure, and Google Cloud platforms. Learn to design, deploy, and manage scalable cloud solutions.",
                  icon: Database,
                },
                {
                  title: "Networking",
                  content:
                    "Design and implement secure, scalable network architectures. Master VPCs, load balancers, and content delivery networks.",
                  icon: Network,
                },
                {
                  title: "Automation",
                  content:
                    "Automate deployments with CI/CD pipelines and Infrastructure as Code. Master Docker, Kubernetes, and serverless computing.",
                  icon: Zap,
                },
                {
                  title: "Optimization",
                  content:
                    "Optimize performance, cost, and security across cloud environments. Learn monitoring, scaling, and cost management strategies.",
                  icon: Cpu,
                },
              ]}
            />
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-12 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-2xl transition-all duration-300 border border-white/20 backdrop-blur-sm"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            <span className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Explore All Programs</span>
              <Sparkles className="w-5 h-5" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
