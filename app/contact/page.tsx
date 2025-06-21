"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; vx: number; vy: number; life: number; color: string }>
  >([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [activeField, setActiveField] = useState("")
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; scale: number }>>([])
  const [textAnimations, setTextAnimations] = useState<
    Array<{ id: number; text: string; x: number; y: number; life: number }>
  >([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particleIdRef = useRef(0)
  const rippleIdRef = useRef(0)
  const textIdRef = useRef(0)

  // Advanced mouse tracking with particle explosion
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })

      // Create multiple particle trails with different colors
      if (Math.random() > 0.5) {
        const colors = ["#00ffff", "#ff00ff", "#ffff00", "#ff6b35", "#00ff88"]
        for (let i = 0; i < 3; i++) {
          const newParticle = {
            id: particleIdRef.current++,
            x: e.clientX + (Math.random() - 0.5) * 20,
            y: e.clientY + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            life: 1,
            color: colors[Math.floor(Math.random() * colors.length)],
          }
          setParticles((prev) => [...prev.slice(-50), newParticle])
        }
      }
    }

    const handleClick = (e: MouseEvent) => {
      // Create ripple effect on click
      const newRipple = {
        id: rippleIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        scale: 0,
      }
      setRipples((prev) => [...prev.slice(-10), newRipple])

      // Create text animation
      const phrases = ["CONNECTING...", "PROCESSING...", "ANALYZING...", "OPTIMIZING..."]
      const newText = {
        id: textIdRef.current++,
        text: phrases[Math.floor(Math.random() * phrases.length)],
        x: e.clientX,
        y: e.clientY,
        life: 1,
      }
      setTextAnimations((prev) => [...prev.slice(-5), newText])
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)
    }
  }, [])

  // Advanced particle animation system
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vx: p.vx * 0.98,
            vy: p.vy * 0.98,
            life: p.life - 0.015,
          }))
          .filter((p) => p.life > 0),
      )

      setRipples((prev) =>
        prev
          .map((r) => ({
            ...r,
            scale: r.scale + 0.1,
          }))
          .filter((r) => r.scale < 3),
      )

      setTextAnimations((prev) =>
        prev
          .map((t) => ({
            ...t,
            y: t.y - 2,
            life: t.life - 0.02,
          }))
          .filter((t) => t.life > 0),
      )
    }, 16)

    return () => clearInterval(interval)
  }, [])

  // Spectacular neural network background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const nodes = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
      pulse: Math.random() * Math.PI * 2,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes with pulsing effect
      nodes.forEach((node, index) => {
        node.x += node.vx
        node.y += node.vy
        node.pulse += 0.05

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        const pulseSize = 2 + Math.sin(node.pulse) * 2
        const distance = Math.sqrt(Math.pow(node.x - mousePos.x, 2) + Math.pow(node.y - mousePos.y, 2))
        const mouseInfluence = Math.max(0, 1 - distance / 200)

        ctx.beginPath()
        ctx.arc(node.x, node.y, pulseSize + mouseInfluence * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${index % 3 === 0 ? "0, 255, 255" : index % 3 === 1 ? "255, 0, 255" : "255, 255, 0"}, ${0.3 + mouseInfluence * 0.7})`
        ctx.fill()

        // Add glow effect
        ctx.shadowBlur = 20
        ctx.shadowColor = `rgba(${index % 3 === 0 ? "0, 255, 255" : index % 3 === 1 ? "255, 0, 255" : "255, 255, 0"}, 0.8)`
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Draw connections with dynamic colors
      nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach((otherNode, j) => {
          const distance = Math.sqrt(Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2))

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            const opacity = 0.3 * (1 - distance / 150)
            const colorIndex = (i + j) % 3
            ctx.strokeStyle = `rgba(${colorIndex === 0 ? "0, 255, 255" : colorIndex === 1 ? "255, 0, 255" : "255, 255, 0"}, ${opacity})`
            ctx.lineWidth = 2
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [mousePos])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Create explosion effect
    for (let i = 0; i < 50; i++) {
      const colors = ["#00ffff", "#ff00ff", "#ffff00", "#ff6b35", "#00ff88"]
      const newParticle = {
        id: particleIdRef.current++,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 20,
        vy: (Math.random() - 0.5) * 20,
        life: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      }
      setParticles((prev) => [...prev, newParticle])
    }

    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsSubmitting(false)
    setSubmitSuccess(true)

    setTimeout(() => {
      setSubmitSuccess(false)
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    }, 4000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Create typing particles
    const colors = ["#00ffff", "#ff00ff", "#ffff00"]
    for (let i = 0; i < 5; i++) {
      const newParticle = {
        id: particleIdRef.current++,
        x: mousePos.x + (Math.random() - 0.5) * 50,
        y: mousePos.y + (Math.random() - 0.5) * 50,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      }
      setParticles((prev) => [...prev, newParticle])
    }
  }

  const contactMethods = [
    {
      icon: "📧",
      title: "Email Support",
      value: "info@inlighntech.com",
      description: "24/7 Email Response",
      color: "from-cyan-400 to-blue-600",
    },
    {
      icon: "📱",
      title: "Phone Support",
      value: "+91-9368842663",
      description: "Mon-Sat 9AM-8PM IST",
      color: "from-purple-400 to-pink-600",
    },
    {
      icon: "💬",
      title: "Visit Our Office",
      value: "Instant Support",
      description: "Corporate Office- Office No: VO-301, WeWork Prestige Central, Ground Floor, 36, Infantry Rd, Tasker Town, Shivaji Nagar, Bengaluru, Karnataka 560001",
      color: "from-green-400 to-emerald-600",
    },
    {
      icon: "🌍",
      title: "Registered Office",
      value: "Inlighn Tech Private Limited",
      description: "Opposite swasti hospital anupam nagar badaun road bareilly uttar pradesh 243001",
      color: "from-orange-400 to-red-600",
    },
  ]

  const faqs = [
    {
      question: "What programs do you offer?",
      answer:
        "We offer comprehensive programs in Cybersecurity, Full Stack Development, Data Science, Cloud Computing, AI/ML, and Digital Marketing. Each program is designed with industry-relevant curriculum and hands-on projects.",
    },
    {
      question: "Are the programs suitable for beginners?",
      answer:
        "Our programs are designed for all skill levels. We start with fundamentals and gradually progress to advanced topics. Our instructors provide personalized support to ensure every student succeeds.",
    },
    {
      question: "What is the duration of the programs?",
      answer:
        "Program durations vary from 3 months to 12 months depending on the course. We offer both intensive bootcamps and comprehensive programs to fit different schedules and learning preferences.",
    },
    {
      question: "Do you provide job placement assistance?",
      answer:
        "Yes! We have a dedicated placement team that works with 500+ hiring partners. We provide resume building, interview preparation, and direct job referrals. Our placement rate is over 85%.",
    },
    {
      question: "Are the programs available online?",
      answer:
        "We offer both online and hybrid learning options. Our online programs feature live interactive sessions, recorded lectures, virtual labs, and 24/7 mentor support.",
    },
    {
      question: "What kind of certification do you provide?",
      answer:
        "Upon successful completion, you receive industry-recognized certificates that are valued by employers globally. We also prepare students for relevant industry certifications.",
    },
  ]

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Advanced Neural Network Background */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />

      {/* Advanced Particle System */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: particle.x - 6,
              top: particle.y - 6,
              backgroundColor: particle.color,
              opacity: particle.life,
              transform: `scale(${particle.life}) rotate(${particle.life * 360}deg)`,
              boxShadow: `0 0 20px ${particle.color}`,
              filter: `blur(${(1 - particle.life) * 2}px)`,
            }}
          />
        ))}

        {/* Ripple Effects */}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute border-2 border-cyan-400 rounded-full pointer-events-none"
            style={{
              left: ripple.x - 25 * ripple.scale,
              top: ripple.y - 25 * ripple.scale,
              width: 50 * ripple.scale,
              height: 50 * ripple.scale,
              opacity: 1 - ripple.scale / 3,
              boxShadow: `0 0 30px rgba(0, 255, 255, ${1 - ripple.scale / 3})`,
            }}
          />
        ))}

        {/* Text Animations */}
        {textAnimations.map((text) => (
          <div
            key={text.id}
            className="absolute text-cyan-400 font-bold text-sm pointer-events-none"
            style={{
              left: text.x - 50,
              top: text.y,
              opacity: text.life,
              transform: `scale(${text.life}) translateY(-${(1 - text.life) * 50}px)`,
              textShadow: `0 0 10px rgba(0, 255, 255, ${text.life})`,
            }}
          >
            {text.text}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Spectacular Hero Section */}
        <div className="text-center mb-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-3xl" />
          <h1 className="text-6xl md:text-9xl font-bold mb-6 relative">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              CONTACT
            </span>
            <br />
            <span
              className="bg-gradient-to-r from-pink-500 via-yellow-500 to-cyan-400 bg-clip-text text-transparent"
              style={{
                animation: "textGlow 2s ease-in-out infinite alternate",
                textShadow: "0 0 50px rgba(255, 255, 255, 0.5)",
              }}
            >
                US
            </span>
          </h1>
          <p className="text-xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            <span className="text-cyan-400 font-bold">Connect</span> with the future.
            <span className="text-purple-400 font-bold"> Transform</span> your career.
            <span className="text-pink-400 font-bold"> Transcend</span> limitations.
          </p>
        </div>

        {/* Revolutionary Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {contactMethods.map((method, index) => (
            <Card
              key={index}
              className="bg-gray-900/30 backdrop-blur-xl border border-gray-700 hover:border-transparent transition-all duration-700 group cursor-pointer relative overflow-hidden"
              style={{
                animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                transform: `perspective(1000px) rotateX(${Math.sin(Date.now() * 0.001 + index) * 5}deg)`,
              }}
              onMouseEnter={() => {
                // Create hover particle explosion
                for (let i = 0; i < 20; i++) {
                  const newParticle = {
                    id: particleIdRef.current++,
                    x: mousePos.x + (Math.random() - 0.5) * 100,
                    y: mousePos.y + (Math.random() - 0.5) * 100,
                    vx: (Math.random() - 0.5) * 10,
                    vy: (Math.random() - 0.5) * 10,
                    life: 1,
                    color: ["#00ffff", "#ff00ff", "#ffff00"][index % 3],
                  }
                  setParticles((prev) => [...prev, newParticle])
                }
              }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
              />
              <CardContent className="p-8 text-center relative z-10">
                <div
                  className="text-6xl mb-6 transition-all duration-500 group-hover:scale-150 group-hover:rotate-12"
                  style={{
                    filter: "drop-shadow(0 0 20px rgba(0, 255, 255, 0.8))",
                    animation: `bounce ${2 + index * 0.3}s ease-in-out infinite`,
                  }}
                >
                  {method.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-all duration-500">
                  {method.title}
                </h3>
                <p className="text-white font-semibold mb-3 text-lg group-hover:scale-110 transition-transform duration-300">
                  {method.value}
                </p>
                <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                  {method.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Spectacular Contact Form */}
        <div className="max-w-5xl mx-auto mb-20">
          <Card className="bg-gray-900/20 backdrop-blur-2xl border border-gray-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-pulse" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 animate-pulse" />
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 animate-pulse" />
              <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-pink-500 via-purple-500 to-cyan-400 animate-pulse" />
            </div>

            <CardContent className="p-12 relative z-10">
              <h2 className="text-5xl font-bold mb-12 text-center">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  CONTACT US!
                </span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group relative">
                    <Input
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      onFocus={() => setActiveField("name")}
                      onBlur={() => setActiveField("")}
                      className="bg-gray-800/30 border-2 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 transition-all duration-500 text-lg p-4 rounded-xl"
                      style={{
                        boxShadow: formData.name ? "0 0 30px rgba(0, 255, 255, 0.5)" : "none",
                        transform: activeField === "name" ? "scale(1.02) translateY(-2px)" : "scale(1)",
                      }}
                    />
                    {activeField === "name" && (
                      <div className="absolute -top-2 -left-2 -right-2 -bottom-2 border-2 border-cyan-400 rounded-xl animate-pulse" />
                    )}
                  </div>

                  <div className="group relative">
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      onFocus={() => setActiveField("email")}
                      onBlur={() => setActiveField("")}
                      className="bg-gray-800/30 border-2 border-gray-600 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-4 focus:ring-purple-400/30 transition-all duration-500 text-lg p-4 rounded-xl"
                      style={{
                        boxShadow: formData.email ? "0 0 30px rgba(128, 0, 255, 0.5)" : "none",
                        transform: activeField === "email" ? "scale(1.02) translateY(-2px)" : "scale(1)",
                      }}
                    />
                    {activeField === "email" && (
                      <div className="absolute -top-2 -left-2 -right-2 -bottom-2 border-2 border-purple-400 rounded-xl animate-pulse" />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group relative">
                    <Input
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      onFocus={() => setActiveField("phone")}
                      onBlur={() => setActiveField("")}
                      className="bg-gray-800/30 border-2 border-gray-600 text-white placeholder-gray-400 focus:border-pink-400 focus:ring-4 focus:ring-pink-400/30 transition-all duration-500 text-lg p-4 rounded-xl"
                      style={{
                        boxShadow: formData.phone ? "0 0 30px rgba(255, 0, 255, 0.5)" : "none",
                        transform: activeField === "phone" ? "scale(1.02) translateY(-2px)" : "scale(1)",
                      }}
                    />
                    {activeField === "phone" && (
                      <div className="absolute -top-2 -left-2 -right-2 -bottom-2 border-2 border-pink-400 rounded-xl animate-pulse" />
                    )}
                  </div>

                  <div className="group relative">
                    <Input
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      onFocus={() => setActiveField("subject")}
                      onBlur={() => setActiveField("")}
                      className="bg-gray-800/30 border-2 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/30 transition-all duration-500 text-lg p-4 rounded-xl"
                      style={{
                        boxShadow: formData.subject ? "0 0 30px rgba(255, 255, 0, 0.5)" : "none",
                        transform: activeField === "subject" ? "scale(1.02) translateY(-2px)" : "scale(1)",
                      }}
                    />
                    {activeField === "subject" && (
                      <div className="absolute -top-2 -left-2 -right-2 -bottom-2 border-2 border-yellow-400 rounded-xl animate-pulse" />
                    )}
                  </div>
                </div>

                <div className="group relative">
                  <Textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    onFocus={() => setActiveField("message")}
                    onBlur={() => setActiveField("")}
                    rows={8}
                    className="bg-gray-800/30 border-2 border-gray-600 text-white placeholder-gray-400 focus:border-green-400 focus:ring-4 focus:ring-green-400/30 transition-all duration-500 text-lg p-4 rounded-xl resize-none"
                    style={{
                      boxShadow: formData.message ? "0 0 30px rgba(0, 255, 0, 0.5)" : "none",
                      transform: activeField === "message" ? "scale(1.01) translateY(-2px)" : "scale(1)",
                    }}
                  />
                  {activeField === "message" && (
                    <div className="absolute -top-2 -left-2 -right-2 -bottom-2 border-2 border-green-400 rounded-xl animate-pulse" />
                  )}
                </div>

                <div className="text-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting || submitSuccess}
                    className={`px-16 py-6 text-xl font-bold rounded-2xl transition-all duration-700 transform hover:scale-110 relative overflow-hidden ${
                      submitSuccess
                        ? "bg-green-500 hover:bg-green-600"
                        : isSubmitting
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 hover:from-cyan-600 hover:via-purple-700 hover:to-pink-700"
                    }`}
                    style={{
                      boxShadow: "0 0 50px rgba(0, 255, 255, 0.8)",
                      animation: isSubmitting ? "pulse 0.5s infinite" : "none",
                    }}
                  >
                    <span className="relative z-10">
                      {submitSuccess ? (
                        <>🎉 MESSAGE TRANSMITTED SUCCESSFULLY! 🎉</>
                      ) : isSubmitting ? (
                        <>🚀 TRANSMITTING TO QUANTUM REALM... 🚀</>
                      ) : (
                        <>LAUNCH MESSAGE INTO CYBERSPACE 🚀</>
                      )}
                    </span>
                    {!submitSuccess && !isSubmitting && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Revolutionary FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="bg-gray-900/30 backdrop-blur-xl border border-gray-700 hover:border-cyan-400 transition-all duration-500 cursor-pointer overflow-hidden"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <CardContent className="p-8">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {faq.question}
                    </h3>
                    <div
                      className={`text-2xl transition-transform duration-500 ${
                        openFaq === index ? "rotate-45 text-cyan-400" : "text-gray-400"
                      }`}
                    >
                      +
                    </div>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      openFaq === index ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-gray-300 leading-relaxed text-lg">{faq.answer}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }
        
        @keyframes textGlow {
          0% { text-shadow: 0 0 20px rgba(0, 255, 255, 0.5); }
          100% { text-shadow: 0 0 40px rgba(255, 0, 255, 0.8), 0 0 60px rgba(255, 255, 0, 0.6); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
      `}</style>
    </div>
  )
}
