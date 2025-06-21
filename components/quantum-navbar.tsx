"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { Home, User, BookOpen, Award, Mail, Menu, X, Zap } from "lucide-react"

interface NavItem {
  id: string
  label: string
  icon: any
  href: string
  color: string
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home, href: "/", color: "#06b6d4" },
  { id: "about", label: "About Us", icon: User, href: "/about-us", color: "#8b5cf6" },
  { id: "programs", label: "Programs", icon: BookOpen, href: "/programs", color: "#f59e0b" },
  { id: "verify", label: "Verify Certificate", icon: Award, href: "/verify", color: "#ef4444" },
  { id: "special", label: "What's Special", icon: Zap, href: "/whats-special", color: "#10b981" },
  { id: "contact", label: "Contact Us", icon: Mail, href: "/contact", color: "#ec4899" },
  { id: "Login", label: "Login", icon: User, href: "/login", color: "#8b5cf6" }
]

const hoverInfo: Record<string, { title: string;  }> = {
  home: {
    title: "Digital Gateway",

  },
  about: {
    title: "Our DNA",
  
  
  },
  programs: {
    title: "Learning Universe",
   
  },
  verify: {
    title: "Blockchain Verification",
   
  },
  special: {
    title: "Quantum Advantage",
  
  },
  contact: {
    title: "Communication Portal",
   
  },
  login: {
    title: "Access Control",

  }
}

// Particle Trail Component
function ParticleTrail({ isActive, color }: { isActive: boolean; color: string }) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    if (!isActive) {
      setParticles([])
      return
    }

    const interval = setInterval(() => {
      const newParticle = {
        id: Date.now() + Math.random(),
        x: Math.random() * 20 - 10,
        y: Math.random() * 20 - 10,
      }
      setParticles((prev) => [...prev.slice(-8), newParticle])
    }, 100)

    return () => clearInterval(interval)
  }, [isActive])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full"
          style={{ backgroundColor: color }}
          initial={{
            x: particle.x,
            y: particle.y,
            scale: 0,
            opacity: 1,
          }}
          animate={{
            x: particle.x + (Math.random() - 0.5) * 40,
            y: particle.y + (Math.random() - 0.5) * 40,
            scale: [0, 1, 0],
            opacity: [1, 0.5, 0],
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}

// Sound Wave Visualization
function SoundWave({ isActive, color }: { isActive: boolean; color: string }) {
  return (
    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-0.5 bg-current rounded-full"
          style={{ color }}
          animate={
            isActive
              ? {
                  height: [2, 8, 2],
                  opacity: [0.3, 1, 0.3],
                }
              : {
                  height: 2,
                  opacity: 0.3,
                }
          }
          transition={{
            duration: 0.4,
            repeat: isActive ? Number.POSITIVE_INFINITY : 0,
            delay: i * 0.05,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Hover Information Overlay
function HoverOverlay({ item, isVisible }: { item: NavItem; isVisible: boolean }) {
  const info = hoverInfo[item.id]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-64 p-4 bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-50"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: 0.15, type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Glowing border */}
          <div className="absolute inset-0 rounded-2xl opacity-50 blur-sm" style={{ backgroundColor: item.color }} />

          {/* Content */}
          <div className="relative">
            <div className="flex items-center space-x-2 mb-2">
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${item.color}30` }}
              >
                <item.icon className="w-3 h-3" style={{ color: item.color }} />
              </div>
             
            </div>


          
          </div>

          {/* Arrow pointer */}
          <div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 border-r border-b border-white/20"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Magnetic Bubble Navigation Item
function MagneticBubble({
  item,
  isActive,
  onHover,
  onLeave,
}: {
  item: NavItem
  isActive: boolean
  onHover: () => void
  onLeave: () => void
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isMagnetic, setIsMagnetic] = useState(false)
  const bubbleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bubbleRef.current) return

      const rect = bubbleRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2))

      // Magnetic effect within 30px
      if (distance < 30 && !isHovered) {
        setIsMagnetic(true)
        const pullStrength = Math.max(0, (30 - distance) / 30)
        const pullX = (e.clientX - centerX) * pullStrength * 0.2
        const pullY = (e.clientY - centerY) * pullStrength * 0.2
        setMousePosition({ x: pullX, y: pullY })
      } else if (distance >= 30) {
        setIsMagnetic(false)
        setMousePosition({ x: 0, y: 0 })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isHovered])

  const springX = useSpring(mousePosition.x, { stiffness: 200, damping: 20 })
  const springY = useSpring(mousePosition.y, { stiffness: 200, damping: 20 })

  return (
    <motion.div
      ref={bubbleRef}
      className="relative"
      style={{
        x: springX,
        y: springY,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <motion.a
        href={item.href}
        className="relative flex flex-col items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full backdrop-blur-xl border border-white/20 transition-all duration-200 group overflow-hidden"
        style={{
          background:
            isActive || isHovered
              ? `linear-gradient(135deg, ${item.color}20, ${item.color}10)`
              : "rgba(255, 255, 255, 0.05)",
          boxShadow:
            isActive || isHovered
              ? `0 8px 32px ${item.color}40, inset 0 1px 0 rgba(255, 255, 255, 0.2)`
              : "0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        }}
        onMouseEnter={() => {
          setIsHovered(true)
          onHover()
        }}
        onMouseLeave={() => {
          setIsHovered(false)
          onLeave()
        }}
        animate={{
          borderColor: isActive || isHovered ? `${item.color}60` : "rgba(255, 255, 255, 0.2)",
        }}
        transition={{ duration: 0.15 }}
      >
        {/* Particle Trail */}
        <ParticleTrail isActive={isHovered} color={item.color} />

        {/* Icon */}
        <motion.div
          animate={{
            color: isActive || isHovered ? item.color : "rgba(255, 255, 255, 0.7)",
            scale: isActive || isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.15 }}
        >
          <item.icon className="w-4 h-4 md:w-5 md:h-5" />
        </motion.div>

        {/* Sound Wave Visualization */}
        <SoundWave isActive={isHovered} color={item.color} />

        {/* Ripple Effect */}
        {(isHovered || isMagnetic) && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 opacity-30"
            style={{ borderColor: item.color }}
            initial={{ scale: 1, opacity: 0.3 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
          />
        )}

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-md"
          style={{ backgroundColor: item.color }}
          animate={{
            opacity: isActive || isHovered ? 0.2 : 0,
            scale: isActive || isHovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.a>

      {/* Label */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/80 backdrop-blur-sm rounded-md text-xs text-white whitespace-nowrap"
            initial={{ opacity: 0, y: -5, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover Information Overlay */}
      <HoverOverlay item={item} isVisible={isHovered} />
    </motion.div>
  )
}

// Morphing Hamburger Menu
function MorphingHamburger({
  scrollY,
  isOpen,
  onClick,
}: {
  scrollY: number
  isOpen: boolean
  onClick: () => void
}) {
  // Three states based on scroll position
  const getMenuState = () => {
    if (scrollY < 100) return "bars" // Traditional bars
    if (scrollY < 500) return "dots" // Dots
    return "waves" // Wave pattern
  }

  const menuState = getMenuState()

  const renderMenuIcon = () => {
    if (isOpen) {
      return <X className="w-5 h-5 text-white" />
    }

    switch (menuState) {
      case "bars":
        return (
          <div className="flex flex-col space-y-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-5 h-0.5 bg-white rounded-full"
                animate={{
                  scaleX: i === 1 ? 0.7 : 1,
                  originX: i === 1 ? 1 : 0.5,
                }}
                transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 25 }}
              />
            ))}
          </div>
        )
      case "dots":
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 bg-white rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
        )
      case "waves":
        return (
          <div className="flex space-x-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-0.5 bg-white rounded-full"
                animate={{
                  height: [6, 12, 6],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.08,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )
      default:
        return <Menu className="w-5 h-5 text-white" />
    }
  }

  return (
    <motion.button
      className="relative w-12 h-12 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      animate={{
        backgroundColor: isOpen ? "rgba(139, 92, 246, 0.2)" : "rgba(255, 255, 255, 0.1)",
        borderColor: isOpen ? "rgba(139, 92, 246, 0.4)" : "rgba(255, 255, 255, 0.2)",
      }}
    >
      {renderMenuIcon()}

      {/* Pulse effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-purple-400"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </motion.button>
  )
}

// Mobile Quantum Menu
function MobileQuantumMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            className="fixed top-20 right-4 left-4 sm:left-auto sm:w-80 bg-black/20 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 z-50 max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {/* Floating Bubbles Background */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, Math.random() * 20 - 10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Menu Items */}
            <div className="relative space-y-3">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  className="flex items-center space-x-4 p-4 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 group"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, type: "spring", stiffness: 400, damping: 25 }}
                  onClick={onClose}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div className="flex-1">
                    <span className="text-white font-medium text-sm">{item.label}</span>
                   
                  </div>

                  {/* Hover Effect */}
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.15 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Bottom Decoration */}
            <motion.div
              className="mt-6 pt-4 border-t border-white/10 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function QuantumNavbar() {
  const [activeItem, setActiveItem] = useState("home")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState("home")
  const [scrollYValue, setScrollYValue] = useState(0)

  const { scrollY } = useScroll()

  // Track scroll position safely
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => setScrollYValue(latest))
    return () => unsubscribe()
  }, [scrollY])

  // Navbar background opacity based on scroll
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95])
  const navbarBlur = useTransform(scrollY, [0, 100], [8, 20])

  // Detect current section safely
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return

      const sections = ["home", "about", "programs", "verify", "special", "contact"]
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section)
            setActiveItem(section)
            break
          }
        }
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Shape-shifting based on current section
  const getNavbarShape = () => {
    switch (currentSection) {
      case "home":
        return "rounded-full"
      case "about":
        return "rounded-3xl"
      case "programs":
        return "rounded-2xl"
      case "verify":
        return "rounded-xl"
      case "special":
        return "rounded-lg"
      case "contact":
        return "rounded-md"
      default:
        return "rounded-full"
    }
  }

  return (
    <>
      {/* Desktop Quantum Navbar */}
      <motion.nav
        className={`fixed top-4 md:top-6 left-1/2 transform -translate-x-1/2 z-50 hidden md:flex items-center space-x-2 lg:space-x-4 px-4 lg:px-6 py-3 transition-all duration-300 ${getNavbarShape()}`}
        style={{
          backgroundColor: `rgba(0, 0, 0, ${navbarOpacity.get()})`,
          backdropFilter: `blur(${navbarBlur.get()}px)`,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {/* Logo */}
        <motion.div className="flex items-center space-x-2 mr-4 lg:mr-8" whileHover={{ scale: 1.05 }}>
          <motion.div
            className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <Zap className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
          </motion.div>
          <span className="text-white font-bold text-sm lg:text-lg">Inlighn</span>
        </motion.div>

        {/* Navigation Bubbles */}
        <div className="flex items-center space-x-2 lg:space-x-3">
          {navItems.map((item) => (
            <MagneticBubble
              key={item.id}
              item={item}
              isActive={activeItem === item.id}
              onHover={() => setHoveredItem(item.id)}
              onLeave={() => setHoveredItem(null)}
            />
          ))}
        </div>

        {/* Quantum Energy Indicator */}
        <motion.div
          className="ml-4 lg:ml-6 w-8 h-4 lg:w-12 lg:h-6 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20 border border-white/20 flex items-center justify-center overflow-hidden"
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            className="w-full h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.nav>

      {/* Mobile Navbar */}
      <motion.nav
        className="fixed top-4 right-4 z-50 md:hidden"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <MorphingHamburger
          scrollY={scrollYValue}
          isOpen={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
      </motion.nav>

      {/* Mobile Quantum Menu */}
      <MobileQuantumMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  )
}
