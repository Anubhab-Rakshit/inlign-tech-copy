"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import TechHeroSection from "./components/tech-hero-section"
import NeuralFeedbackMatrix from "./components/neural-feedback-matrix"
import CyberChallengeArena from "./components/challenge-arena"
import ProjectShowcase from "./components/project-showcase"
import ParticipationPortal from "./components/participation-portal"
import PerksGalaxy from "./components/perks-galaxy"
import TechFloatingParticles from "./components/tech-floating-particles"
import MatrixRain from "./components/matrix-rain"
import DataStreamBackground from "./components/data-stream-background"

export default function WhatsSpecialPage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const glitchIntensity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 0.1, 0, 0.15, 0, 0.2])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Quantum Navigation */}

      {/* Matrix Rain Background */}
      <MatrixRain />

      {/* Data Stream Background */}
      <DataStreamBackground scrollProgress={scrollYProgress} />

      {/* Tech Floating Particles */}
      <TechFloatingParticles />

      {/* Parallax Background */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          y: backgroundY,
          filter: `hue-rotate(${useTransform(scrollYProgress, [0, 1], [0, 360])}deg)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-800" />
      </motion.div>

      {/* Glitch Effect Overlay */}
      <motion.div
        className="fixed inset-0 z-10 pointer-events-none mix-blend-screen"
        style={{
          opacity: glitchIntensity,
          background: `
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(255, 0, 0, 0.03) 2px,
            rgba(255, 0, 0, 0.03) 4px,
            transparent 4px,
            transparent 6px,
            rgba(0, 255, 0, 0.03) 6px,
            rgba(0, 255, 0, 0.03) 8px
          )
        `,
        }}
      />

      {/* Main Content */}
      <div className="relative z-20">
        <TechHeroSection />
       
        <CyberChallengeArena />
        <ProjectShowcase />
        <ParticipationPortal />
        <PerksGalaxy />
      </div>
    </div>
  )
}
