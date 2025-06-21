"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MailIcon, PhoneIcon, MapPinIcon, LinkedinIcon, GithubIcon, TwitterIcon, InstagramIcon } from "lucide-react"

export default function UndergroundTechFooter() {
  const [activePortal, setActivePortal] = useState<string | null>(null)
  const [messageParticles, setMessageParticles] = useState<Array<{ id: number; x: number; y: number; text: string }>>(
    [],
  )
  const [inputMessage, setInputMessage] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Circuit board animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const circuits: Array<{ x: number; y: number; width: number; height: number; active: boolean }> = []

    // Generate circuit paths (reduced for mobile)
    const circuitCount = window.innerWidth < 768 ? 25 : 50
    for (let i = 0; i < circuitCount; i++) {
      circuits.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: Math.random() * 200 + 50,
        height: 2,
        active: Math.random() > 0.7,
      })
    }

    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      circuits.forEach((circuit, index) => {
        if (circuit.active) {
          const gradient = ctx.createLinearGradient(circuit.x, circuit.y, circuit.x + circuit.width, circuit.y)
          gradient.addColorStop(0, "transparent")
          gradient.addColorStop(0.5, "#00ffff")
          gradient.addColorStop(1, "transparent")

          ctx.fillStyle = gradient
          ctx.fillRect(circuit.x, circuit.y, circuit.width, circuit.height)

          // Randomly deactivate
          if (Math.random() > 0.99) {
            circuit.active = false
            setTimeout(() => {
              circuit.active = true
            }, Math.random() * 3000)
          }
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animationId)
  }, [])

  // Mouse tracking for holographic effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Message particle system
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setInputMessage(value)

    if (value.length > inputMessage.length) {
      const newParticle = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        text: value.slice(-1),
      }
      setMessageParticles((prev) => [...prev.slice(-20), newParticle])

      setTimeout(() => {
        setMessageParticles((prev) => prev.filter((p) => p.id !== newParticle.id))
      }, 3000)
    }
  }

  const socialPortals = [
    { name: "linkedin", icon: LinkedinIcon, color: "#0077b5", url: "#" },
    { name: "github", icon: GithubIcon, color: "#333", url: "#" },
    { name: "twitter", icon: TwitterIcon, color: "#1da1f2", url: "#" },
    { name: "instagram", icon: InstagramIcon, color: "#e4405f", url: "#" },
  ]

  return (
    <footer
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(0,255,255,0.1) 0%, transparent 50%),
          linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)
        `,
      }}
    >
      {/* Animated Circuit Board Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Floating Message Particles */}
      {messageParticles.map((particle) => (
        <div
          key={particle.id}
          className="absolute pointer-events-none text-cyan-400 font-mono text-sm animate-bounce"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `floatUp 3s ease-out forwards`,
          }}
        >
          {particle.text}
        </div>
      ))}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Underground Facility Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight">
              UNDERGROUND TECH FACILITY
            </h2>
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 blur-xl animate-pulse" />
          </div>
          <p className="text-lg sm:text-xl text-gray-300 mt-4 px-4">Access Level: CLASSIFIED</p>
        </div>

        {/* Mobile-First Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Holographic Contact Form */}
          <div className="lg:col-span-2 order-1">
            <div className="relative">
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl" />
              <div className="relative bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-4 sm:p-6 lg:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-4 sm:mb-6 flex items-center gap-3">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="text-sm sm:text-base lg:text-xl">SECURE COMMUNICATION CHANNEL</span>
                </h3>

                <form className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="relative group">
                      <Input
                        placeholder="Agent Name"
                        className="bg-gray-900/50 border-cyan-500/30 text-white placeholder-gray-400 h-12 sm:h-14 text-base focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300 focus:scale-105"
                      />
                      <div className="absolute inset-0 bg-cyan-400/5 rounded-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="relative group">
                      <Input
                        type="email"
                        placeholder="Secure Channel"
                        className="bg-gray-900/50 border-cyan-500/30 text-white placeholder-gray-400 h-12 sm:h-14 text-base focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300 focus:scale-105"
                      />
                      <div className="absolute inset-0 bg-cyan-400/5 rounded-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>

                  <div className="relative group">
                    <Textarea
                      placeholder="Encrypted Message..."
                      value={inputMessage}
                      onChange={handleMessageChange}
                      className="bg-gray-900/50 border-cyan-500/30 text-white placeholder-gray-400 min-h-32 text-base focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300 focus:scale-105 resize-none"
                    />
                    <div className="absolute inset-0 bg-cyan-400/5 rounded-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  </div>

                  <Button className="w-full h-12 sm:h-14 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25">
                    TRANSMIT MESSAGE
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Mobile-Optimized Sidebar */}
          <div className="space-y-6 sm:space-y-8 order-2">
            {/* 3D Office Building Model */}
            <div className="relative">
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl" />
              <div className="relative bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-purple-400 mb-4">FACILITY LOCATION</h3>
                <div className="relative h-32 sm:h-48 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg overflow-hidden">
                  {/* 3D Building Simulation */}
                  <div className="absolute inset-0 flex items-end justify-center">
                    <div className="relative">
                      {/* Building layers */}
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-gradient-to-t from-cyan-600/80 to-cyan-400/60 border border-cyan-400/30 mb-1 transition-all duration-300 hover:scale-110 hover:bg-cyan-400/80"
                          style={{
                            width: `${40 - i * 6}px`,
                            height: `${15 + i * 4}px`,
                            marginLeft: `${i * 3}px`,
                          }}
                        />
                      ))}
                      {/* Windows */}
                      <div className="absolute inset-0">
                        {[...Array(15)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-yellow-400 animate-pulse"
                            style={{
                              left: `${8 + (i % 3) * 6}px`,
                              top: `${15 + Math.floor(i / 3) * 12}px`,
                              animationDelay: `${i * 0.2}s`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-xs sm:text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <MapPinIcon size={14} className="text-purple-400 flex-shrink-0" />
                    <span className="break-words">221B Quantum Lane, Silicon City</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneIcon size={14} className="text-purple-400 flex-shrink-0" />
                    <span>+1 555 CYBER-TECH</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MailIcon size={14} className="text-purple-400 flex-shrink-0" />
                    <span className="break-all">facility@neotech.underground</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="relative">
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl" />
              <div className="relative bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-2xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-green-400 mb-4">CLASSIFIED UPDATES</h3>
                <p className="text-gray-300 text-xs sm:text-sm mb-4">
                  Join 10,000+ agents receiving encrypted intelligence
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="email"
                    placeholder="Agent ID"
                    className="bg-gray-900/50 border-green-500/30 text-white placeholder-gray-400 h-12 text-base focus:border-green-400 flex-1"
                  />
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 h-12 px-6 whitespace-nowrap">
                    ENCRYPT
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Dimensional Portals */}
        <div className="mt-12 sm:mt-16">
          <h3 className="text-xl sm:text-2xl font-bold text-center text-white mb-6 sm:mb-8">DIMENSIONAL PORTALS</h3>
          <div className="flex justify-center gap-4 sm:gap-6 lg:gap-8 flex-wrap">
            {socialPortals.map((portal) => {
              const IconComponent = portal.icon
              return (
                <div
                  key={portal.name}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setActivePortal(portal.name)}
                  onMouseLeave={() => setActivePortal(null)}
                >
                  <div
                    className="absolute -inset-3 sm:-inset-4 rounded-full blur-xl transition-all duration-300 group-hover:scale-150"
                    style={{ backgroundColor: `${portal.color}20` }}
                  />
                  <div
                    className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                    style={{
                      borderColor: portal.color,
                      backgroundColor: activePortal === portal.name ? `${portal.color}20` : "transparent",
                    }}
                  >
                    <IconComponent
                      size={window.innerWidth < 640 ? 20 : 24}
                      style={{ color: portal.color }}
                      className="transition-all duration-300 group-hover:scale-125"
                    />
                  </div>
                  {activePortal === portal.name && (
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/80 px-2 py-1 rounded whitespace-nowrap">
                      {portal.name.toUpperCase()}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Holographic Company Info */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="relative inline-block">
            <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-r from-cyan-400/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl animate-pulse" />
            <div className="relative bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 mx-4">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-4">
                NEOTECH ACADEMY
              </h2>
              <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Underground facility dedicated to training the next generation of cyber warriors and digital architects.
                Our classified programs prepare agents for the technological battlefield of tomorrow.
              </p>
              <div className="mt-6 text-xs sm:text-sm text-gray-400">
                © 2024 NeoTech Underground Facility. All transmissions encrypted.
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) scale(0.5);
          }
        }
      `}</style>
    </footer>
  )
}
