"use client"

import { useEffect, useRef, useState } from "react"

interface MatrixChar {
  char: string
  x: number
  y: number
  speed: number
  opacity: number
  trail: number
}

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Matrix characters - mix of Japanese katakana, numbers, and symbols
  const matrixChars =
    "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?"

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.width === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: MatrixChar[] = []

    // Initialize drops - reduced count for performance
    for (let i = 0; i < columns; i += 2) {
      // Every 2nd column for performance
      drops.push({
        char: matrixChars[Math.floor(Math.random() * matrixChars.length)],
        x: i * fontSize,
        y: Math.random() * canvas.height,
        speed: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        trail: Math.random() * 20 + 10,
      })
    }

    let animationId: number

    const draw = () => {
      // Create trailing effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px 'Courier New', monospace`

      drops.forEach((drop, index) => {
        // Gradient effect for each character
        const gradient = ctx.createLinearGradient(0, drop.y - drop.trail, 0, drop.y + drop.trail)
        gradient.addColorStop(0, `rgba(0, 255, 0, 0)`)
        gradient.addColorStop(0.5, `rgba(0, 255, 0, ${drop.opacity})`)
        gradient.addColorStop(1, `rgba(0, 255, 0, 0.1)`)

        ctx.fillStyle = gradient
        ctx.fillText(drop.char, drop.x, drop.y)

        // Add bright head
        ctx.fillStyle = `rgba(255, 255, 255, ${drop.opacity * 0.8})`
        ctx.fillText(drop.char, drop.x, drop.y)

        // Update position
        drop.y += drop.speed

        // Reset when off screen
        if (drop.y > canvas.height + 100) {
          drop.y = -100
          drop.char = matrixChars[Math.floor(Math.random() * matrixChars.length)]
          drop.speed = Math.random() * 3 + 1
          drop.opacity = Math.random() * 0.5 + 0.3
        }

        // Randomly change character
        if (Math.random() < 0.01) {
          drop.char = matrixChars[Math.floor(Math.random() * matrixChars.length)]
        }
      })

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [dimensions, matrixChars])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-30"
      style={{
        background: "transparent",
        zIndex: 1,
      }}
    />
  )
}
