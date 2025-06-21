"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2Icon, XCircleIcon, Loader2Icon, ShieldIcon, ScanIcon, DownloadIcon } from "lucide-react"

type VerificationStage = "idle" | "scanning" | "blockchain" | "biometric" | "quantum" | "verified" | "error"

interface BlockchainBlock {
  id: number
  hash: string
  verified: boolean
  timestamp: number
}

export default function CertificateVerificationSystem() {
  const [stage, setStage] = useState<VerificationStage>("idle")
  const [blocks, setBlocks] = useState<BlockchainBlock[]>([])
  const [progress, setProgress] = useState(0)
  const [certificateId, setCertificateId] = useState("")
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  // Blockchain visualization
  useEffect(() => {
    if (stage === "blockchain") {
      const interval = setInterval(() => {
        setBlocks((prev) => {
          if (prev.length < 5) {
            const newBlock: BlockchainBlock = {
              id: prev.length + 1,
              hash: Math.random().toString(36).substring(2, 15),
              verified: false,
              timestamp: Date.now(),
            }
            return [...prev, newBlock]
          }
          return prev
        })
      }, 800)

      return () => clearInterval(interval)
    }
  }, [stage])

  // Block verification animation
  useEffect(() => {
    if (stage === "blockchain" && blocks.length > 0) {
      const timeout = setTimeout(() => {
        setBlocks((prev) =>
          prev.map((block, index) => (index === prev.length - 1 ? { ...block, verified: true } : block)),
        )
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [blocks.length, stage])

  // Particle system for success
  useEffect(() => {
    if (stage === "verified") {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: ["#00ffff", "#ff00ff", "#ffff00", "#00ff00"][Math.floor(Math.random() * 4)],
      }))
      setParticles(newParticles)
      setShowConfetti(true)

      setTimeout(() => {
        setParticles([])
        setShowConfetti(false)
      }, 3000)
    }
  }, [stage])

  // Canvas animation for quantum scanning
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || stage !== "quantum") return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let animationId: number
    let angle = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Quantum field visualization
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      for (let i = 0; i < 8; i++) {
        const radius = 50 + i * 20
        const x = centerX + Math.cos(angle + i * 0.5) * radius
        const y = centerY + Math.sin(angle + i * 0.5) * radius

        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fillStyle = `hsl(${180 + i * 30}, 100%, 50%)`
        ctx.fill()

        // Connecting lines
        if (i > 0) {
          const prevX = centerX + Math.cos(angle + (i - 1) * 0.5) * (50 + (i - 1) * 20)
          const prevY = centerY + Math.sin(angle + (i - 1) * 0.5) * (50 + (i - 1) * 20)

          ctx.beginPath()
          ctx.moveTo(prevX, prevY)
          ctx.lineTo(x, y)
          ctx.strokeStyle = `hsla(${180 + i * 30}, 100%, 50%, 0.3)`
          ctx.stroke()
        }
      }

      angle += 0.02
      animationId = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animationId)
  }, [stage])

  const startVerification = async () => {
    if (!certificateId.trim()) return

    setProgress(0)
    setBlocks([])

    // Stage 1: Scanning
    setStage("scanning")
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setProgress(25)

    // Stage 2: Blockchain
    setStage("blockchain")
    await new Promise((resolve) => setTimeout(resolve, 4000))
    setProgress(50)

    // Stage 3: Biometric
    setStage("biometric")
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setProgress(75)

    // Stage 4: Quantum
    setStage("quantum")
    await new Promise((resolve) => setTimeout(resolve, 2500))
    setProgress(100)

    // Final: Verified or Error
    const success = Math.random() > 0.1
    setStage(success ? "verified" : "error")
  }

  const reset = () => {
    setStage("idle")
    setProgress(0)
    setBlocks([])
    setParticles([])
    setCertificateId("")
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white overflow-hidden flex items-center justify-center p-6">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] animate-pulse" />
      </div>

      {/* Success particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full animate-bounce pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            animationDelay: `${particle.id * 0.1}s`,
            animationDuration: "2s",
          }}
        />
      ))}

      <div className="relative z-10 max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              QUANTUM CERTIFICATE VERIFICATION
            </h1>
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 to-pink-500/20 blur-xl animate-pulse" />
          </div>
          <p className="text-xl text-gray-300 mt-4">Blockchain-Secured Digital Authentication</p>
        </div>

        {/* Input Section */}
        {stage === "idle" && (
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl" />
              <div className="relative bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                  <ScanIcon size={20} />
                  Certificate ID Scanner
                </h3>
                <Input
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="Enter Certificate ID (e.g., CERT-2024-001)"
                  className="bg-gray-900/50 border-blue-500/30 text-white placeholder-gray-400 h-12 mb-4"
                />
                <Button
                  onClick={startVerification}
                  disabled={!certificateId.trim()}
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-semibold"
                >
                  INITIATE QUANTUM SCAN
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Verification Stages */}
        {stage !== "idle" && (
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Left: Current Stage Visualization */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl" />
              <div className="relative bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 h-96">
                {stage === "scanning" && (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="relative w-32 h-32 mb-6">
                      <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full" />
                      <div className="absolute inset-0 border-4 border-cyan-500 rounded-full border-t-transparent animate-spin" />
                      <ScanIcon size={40} className="absolute inset-0 m-auto text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold text-cyan-400">SCANNING CERTIFICATE</h3>
                    <p className="text-gray-300 text-center">Analyzing digital fingerprint...</p>
                  </div>
                )}

                {stage === "blockchain" && (
                  <div className="h-full">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">BLOCKCHAIN VERIFICATION</h3>
                    <div className="space-y-3">
                      {blocks.map((block, index) => (
                        <div
                          key={block.id}
                          className={`p-3 rounded-lg border transition-all duration-500 ${
                            block.verified
                              ? "bg-green-500/20 border-green-500/50"
                              : "bg-purple-500/20 border-purple-500/50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-sm">Block #{block.id}</span>
                            {block.verified ? (
                              <CheckCircle2Icon size={16} className="text-green-400" />
                            ) : (
                              <Loader2Icon size={16} className="text-purple-400 animate-spin" />
                            )}
                          </div>
                          <div className="text-xs text-gray-400 font-mono">{block.hash}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {stage === "biometric" && (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="relative w-32 h-32 mb-6">
                      <div className="absolute inset-0 border-4 border-orange-500/30 rounded-full animate-pulse" />
                      <ShieldIcon size={40} className="absolute inset-0 m-auto text-orange-400" />
                      <div className="absolute inset-0 border-4 border-orange-500 rounded-full border-r-transparent animate-spin" />
                    </div>
                    <h3 className="text-xl font-bold text-orange-400">BIOMETRIC ANALYSIS</h3>
                    <p className="text-gray-300 text-center">Verifying digital signatures...</p>
                  </div>
                )}

                {stage === "quantum" && (
                  <div className="h-full">
                    <h3 className="text-xl font-bold text-pink-400 mb-4">QUANTUM ENCRYPTION</h3>
                    <canvas ref={canvasRef} className="w-full h-64 rounded-lg bg-black/20" />
                    <p className="text-gray-300 text-center mt-4">Quantum field analysis in progress...</p>
                  </div>
                )}

                {stage === "verified" && (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="relative w-32 h-32 mb-6">
                      <div className="absolute inset-0 bg-green-500/20 rounded-full animate-pulse" />
                      <CheckCircle2Icon size={64} className="absolute inset-0 m-auto text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-400">VERIFICATION COMPLETE</h3>
                    <p className="text-gray-300 text-center">Certificate authenticated successfully!</p>
                  </div>
                )}

                {stage === "error" && (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="relative w-32 h-32 mb-6">
                      <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse" />
                      <XCircleIcon size={64} className="absolute inset-0 m-auto text-red-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-red-400">VERIFICATION FAILED</h3>
                    <p className="text-gray-300 text-center">Certificate could not be authenticated</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Certificate Preview & Progress */}
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl blur-xl" />
                <div className="relative bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-green-400 mb-4">VERIFICATION PROGRESS</h3>
                  <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                    <div
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="text-sm text-gray-300">{progress}% Complete</div>
                </div>
              </div>

              {/* Certificate Preview */}
              {(stage === "verified" || stage === "error") && (
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl" />
                  <div className="relative bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-purple-400 mb-4">CERTIFICATE PREVIEW</h3>
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-600">
                      <div className="text-center">
                        <h4 className="text-xl font-bold text-white mb-2">NeoTech Academy</h4>
                        <p className="text-gray-300 mb-4">Certificate of Completion</p>
                        <div className="border-t border-gray-600 pt-4">
                          <p className="text-lg font-semibold text-cyan-400">John Doe</p>
                          <p className="text-sm text-gray-400">Full-Stack Innovation Program</p>
                          <p className="text-xs text-gray-500 mt-2">ID: {certificateId}</p>
                        </div>
                      </div>
                    </div>

                    {stage === "verified" && (
                      <Button className="w-full mt-4 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500">
                        <DownloadIcon size={16} className="mr-2" />
                        DOWNLOAD CERTIFICATE
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {(stage === "verified" || stage === "error") && (
          <div className="text-center">
            <Button
              onClick={reset}
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600"
            >
              VERIFY ANOTHER CERTIFICATE
            </Button>
          </div>
        )}
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.05}s`,
                animationDuration: "3s",
              }}
            />
          ))}
        </div>
      )}
    </section>
  )
}
