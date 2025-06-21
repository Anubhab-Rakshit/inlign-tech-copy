"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
}

interface NetworkNode {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  connections: number[]
}

export default function VerifyPage() {
  const [internId, setInternId] = useState("")
  const [verificationStage, setVerificationStage] = useState(0)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [networkNodes, setNetworkNodes] = useState<NetworkNode[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particleIdRef = useRef(0)

  // Initialize network nodes
  useEffect(() => {
    const nodes: NetworkNode[] = []
    for (let i = 0; i < 50; i++) {
      nodes.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: [],
      })
    }

    // Create connections
    nodes.forEach((node) => {
      const nearbyNodes = nodes.filter((other) => {
        const distance = Math.sqrt((node.x - other.x) ** 2 + (node.y - other.y) ** 2)
        return distance < 150 && other.id !== node.id
      })
      node.connections = nearbyNodes.slice(0, 3).map((n) => n.id)
    })

    setNetworkNodes(nodes)
  }, [])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })

      // Create particle trail
      if (Math.random() < 0.3) {
        const newParticle: Particle = {
          id: particleIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 60,
          maxLife: 60,
          color: `hsl(${180 + Math.random() * 60}, 70%, 60%)`,
        }
        setParticles((prev) => [...prev.slice(-20), newParticle])
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Animate particles and network
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 1,
          }))
          .filter((p) => p.life > 0),
      )

      setNetworkNodes((prev) =>
        prev.map((node) => ({
          ...node,
          x: node.x + node.vx,
          y: node.y + node.vy,
          vx: node.x < 0 || node.x > window.innerWidth ? -node.vx : node.vx,
          vy: node.y < 0 || node.y > window.innerHeight ? -node.vy : node.vy,
        })),
      )
    }, 16)

    return () => clearInterval(interval)
  }, [])

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw network connections
      ctx.strokeStyle = "rgba(0, 255, 255, 0.1)"
      ctx.lineWidth = 1
      networkNodes.forEach((node) => {
        node.connections.forEach((connId) => {
          const connNode = networkNodes.find((n) => n.id === connId)
          if (connNode) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(connNode.x, connNode.y)
            ctx.stroke()
          }
        })
      })

      // Draw network nodes
      networkNodes.forEach((node) => {
        const distance = Math.sqrt((node.x - mousePos.x) ** 2 + (node.y - mousePos.y) ** 2)
        const intensity = Math.max(0, 1 - distance / 200)

        ctx.beginPath()
        ctx.arc(node.x, node.y, 2 + intensity * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 255, ${0.3 + intensity * 0.7})`
        ctx.fill()
      })

      // Draw particles
      particles.forEach((particle) => {
        const alpha = particle.life / particle.maxLife
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace("60%)", `60%, ${alpha})`)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }
    animate()
  }, [networkNodes, particles, mousePos])

  const handleVerify = async () => {
    if (!internId.trim()) return

    setIsVerifying(true)
    setVerificationStage(0)

    // Stage 1: Scanning
    setTimeout(() => setVerificationStage(1), 500)

    // Stage 2: Blockchain verification
    setTimeout(() => setVerificationStage(2), 1500)

    // Stage 3: Biometric analysis
    setTimeout(() => setVerificationStage(3), 2500)

    // Stage 4: Quantum verification
    setTimeout(() => setVerificationStage(4), 3500)

    // Stage 5: Complete
    setTimeout(() => {
      setVerificationStage(5)
      setIsVerifying(false)

      // Mock verification result
      setVerificationResult({
        valid: true,
        studentName: "John Doe",
        program: "Full Stack Development",
        completionDate: "2024-06-15",
        certificateId: internId,
        skills: ["React", "Node.js", "MongoDB", "Express"],
        grade: "A+",
        duration: "6 months",
      })

      // Create success particles
      for (let i = 0; i < 50; i++) {
        setTimeout(() => {
          const newParticle: Particle = {
            id: particleIdRef.current++,
            x: window.innerWidth / 2 + (Math.random() - 0.5) * 100,
            y: window.innerHeight / 2 + (Math.random() - 0.5) * 100,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            life: 120,
            maxLife: 120,
            color: `hsl(${120 + Math.random() * 60}, 80%, 60%)`,
          }
          setParticles((prev) => [...prev, newParticle])
        }, i * 20)
      }
    }, 4500)
  }

  const getStageText = () => {
    switch (verificationStage) {
      case 1:
        return "Scanning Certificate Database..."
      case 2:
        return "Verifying Blockchain Signature..."
      case 3:
        return "Analyzing Biometric Data..."
      case 4:
        return "Quantum Encryption Verification..."
      case 5:
        return "Verification Complete!"
      default:
        return "Ready to Verify"
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 py-40">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 200%",
              filter: "drop-shadow(0 0 20px rgba(0, 255, 255, 0.5))",
            }}
          >
            Certificate Verification
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Advanced certificate authentication system
          </motion.p>
        </motion.div>

        {/* Verification Interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="w-full max-w-2xl"
        >
          {/* Input Section */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 mb-8 relative overflow-hidden">
            {/* Holographic overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent transform -skew-x-12 animate-pulse" />

            <div className="relative z-10">
              <label className="block text-cyan-400 text-lg font-semibold mb-4">Enter Intern ID:</label>

              <div className="flex gap-4">
                <motion.input
                  type="text"
                  value={internId}
                  onChange={(e) => setInternId(e.target.value)}
                  placeholder="e.g., ITID000"
                  className="flex-1 bg-black/50 border-2 border-cyan-500/50 rounded-xl px-6 py-4 text-white text-lg focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300"
                  whileFocus={{
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(0, 255, 255, 0.3)",
                  }}
                />

                <motion.button
                  onClick={handleVerify}
                  disabled={isVerifying || !internId.trim()}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">{isVerifying ? "Verifying..." : "Verify"}</span>
                  {isVerifying && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    />
                  )}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Verification Progress */}
          <AnimatePresence>
            {isVerifying && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gray-900/50 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 mb-8"
              >
                <div className="text-center">
                  <motion.div
                    className="w-32 h-32 mx-auto mb-6 relative"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    {/* DNA Helix Animation */}
                    <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full" />
                    <div
                      className="absolute inset-2 border-4 border-purple-500/30 rounded-full animate-spin"
                      style={{ animationDirection: "reverse" }}
                    />
                    <div className="absolute inset-4 border-4 border-blue-500/30 rounded-full animate-pulse" />

                    {/* Center Progress */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-cyan-400">
                        {Math.round((verificationStage / 5) * 100)}%
                      </span>
                    </div>
                  </motion.div>

                  <motion.p
                    key={verificationStage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg text-cyan-400 font-semibold"
                  >
                    {getStageText()}
                  </motion.p>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                    <motion.div
                      className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(verificationStage / 5) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Verification Result */}
          <AnimatePresence>
            {verificationResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1, type: "spring" }}
                className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 backdrop-blur-xl border border-green-500/50 rounded-2xl p-8 relative overflow-hidden"
              >
                {/* Success particles overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-green-400 rounded-full"
                      initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        scale: 0,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        y: [Math.random() * 100 + "%", "0%"],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.1,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 3,
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <motion.div
                      className="w-20 h-20 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.div>

                    <h2 className="text-3xl font-bold text-green-400 mb-2">Certificate Verified!</h2>
                    <p className="text-green-300">Quantum authentication successful</p>
                  </div>

                  {/* Certificate Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-green-400 font-semibold">Student Name:</label>
                        <p className="text-white text-lg">{verificationResult.studentName}</p>
                      </div>

                      <div>
                        <label className="text-green-400 font-semibold">Program:</label>
                        <p className="text-white text-lg">{verificationResult.program}</p>
                      </div>

                      <div>
                        <label className="text-green-400 font-semibold">Completion Date:</label>
                        <p className="text-white text-lg">{verificationResult.completionDate}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-green-400 font-semibold">Certificate ID:</label>
                        <p className="text-white text-lg font-mono">{verificationResult.certificateId}</p>
                      </div>

                      <div>
                        <label className="text-green-400 font-semibold">Grade:</label>
                        <p className="text-white text-lg">{verificationResult.grade}</p>
                      </div>

                      <div>
                        <label className="text-green-400 font-semibold">Duration:</label>
                        <p className="text-white text-lg">{verificationResult.duration}</p>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mt-6">
                    <label className="text-green-400 font-semibold mb-3 block">Skills Acquired:</label>
                    <div className="flex flex-wrap gap-2">
                      {verificationResult.skills.map((skill: string, index: number) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-green-300 text-sm"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Download Button */}
                  <motion.button
                    className="w-full mt-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-semibold text-lg relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">Download Certificate</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-center mt-12 max-w-3xl"
        >
          <p className="text-gray-400 text-lg leading-relaxed">
            Enter your Intern ID (e.g., ITID000) in the field above to verify your internship certificate. You can find
            your Intern ID on your offer letter or experience letter.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
