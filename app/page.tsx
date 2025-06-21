"use client"

import HeroSection from "@/components/hero-section"
import CardsShowcase from "@/components/cards-showcase"
import AboutSection from "@/components/about-page"
import OpportunitiesSection from "@/components/opportunities-section"
export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800">
      
        <HeroSection />
        <OpportunitiesSection />
        <CardsShowcase />
        <AboutSection />
    </div>
  )
}
