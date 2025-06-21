"use client"

import type React from "react"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Suspense, useState } from "react"
import ParticleSystem from "./particle-system"
import MorphingButton from "./morphing-button"


export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((event.clientY - rect.top) / rect.height) * 2 + 1,
    })
  }

  return (
    <div className="relative w-full h-screen overflow-hidden" onMouseMove={handleMouseMove}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        className="absolute inset-0"
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4f46e5" />

          {/* Environment */}
          <Environment preset="night" />

          {/* Particle System */}
          <ParticleSystem mousePosition={mousePosition} />

          {/* Floating 3D Logo */}

          {/* Camera Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none">
        <div className="max-w-4xl mx-auto px-6">
          {/* Hero Title with Animations */}
          <div className="overflow-hidden mb-6">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight animate-slide-up">
              <span className="inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                Inlighn
              </span>
              <span className="inline-block text-white ml-4 animate-glow">Tech</span>
            </h1>
          </div>

          {/* Subtitle with Typewriter Effect */}
          <div className="overflow-hidden mb-12">
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed animate-typewriter">
              <span className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                Next-Gen Tech Education
              </span>
              <span className="block text-lg text-gray-400 mt-2 animate-fade-in-up" style={{ animationDelay: "1s" }}>
                Transforming Learning Through Innovation
              </span>
            </p>
          </div>

          {/* CTA Button */}
          
        </div>
      </div>

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none"></div>
    </div>
  )
}
