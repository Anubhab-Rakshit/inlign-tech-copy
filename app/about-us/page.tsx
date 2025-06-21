"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

import AboutHeroSection from "./components/about-hero-section"
import VisionMissionSection from "./components/vision-mission-section"
import CompanyStorySection from "./components/company-story-section"
import BenefitsSection from "./components/benefits-section"
import AchievementsSection from "./components/achievements-section"
import TeamLeadershipSection from "./components/team-leadership-section"
import InternshipJourneySection from "./components/internship-journey-section"
import TechFloatingParticles from "./components/tech-floating-particles"
import MatrixRain from "./components/matrix-rain"

export default function AboutUsPage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const glitchIntensity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 0.02, 0, 0.03])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Quantum Navigation */}
      {/* Matrix Rain Background */}
      <MatrixRain />

      {/* Tech Floating Particles */}
      <TechFloatingParticles />

      {/* Parallax Background */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          filter: `hue-rotate(${useTransform(scrollYProgress, [0, 1], [0, 180])}deg)`,
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
            transparent 4px,
            rgba(0, 255, 255, 0.01) 4px,
            rgba(0, 255, 255, 0.01) 6px,
            transparent 6px,
            transparent 8px,
            rgba(147, 51, 234, 0.01) 8px,
            rgba(147, 51, 234, 0.01) 10px
          )
        `,
        }}
      />

      {/* Main Content */}
      <div className="relative z-20">
        <AboutHeroSection />
        <VisionMissionSection />
        <CompanyStorySection />
        <BenefitsSection />
        <InternshipJourneySection />
        <AchievementsSection />
        <TeamLeadershipSection />
      </div>
    </div>
  )
}
