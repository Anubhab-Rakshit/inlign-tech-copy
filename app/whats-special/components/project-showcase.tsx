"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Shield, Database, Brain, ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Port Hunter: TCP Scanning with Nmap and Metasploit",
    category: "Cybersecurity",
    author: "Ayush Nithin",
    course: "Cyber Security",
    date: "19-05-2025",
    description:
      "This project, Port Hunter, presents a comprehensive framework for network reconnaissance and exploitation, aimed at identifying and leveraging vulnerabilities within a target system. At its core lies a custom-developed Python-based TCP port scanner capable of probing a wide range of ports on a specified IP address.",
    tech: ["Python", "Nmap", "Metasploit", "Network Security"],
    icon: Shield,
    color: "#ef4444",
    image: "/placeholder.svg?height=400&width=600",
    complexity: "Advanced",
    duration: "3 months",
  },
  {
    id: 2,
    title: "Subdomain Enumeration Tool",
    category: "Cybersecurity",
    author: "Shiva Kiran",
    course: "Python Programming",
    date: "03-03-2025",
    description:
      "A comprehensive Python-based tool for discovering subdomains of target domains. This project implements multiple enumeration techniques including DNS brute-forcing, certificate transparency logs, and API integrations.",
    tech: ["Python", "DNS", "API Integration", "Security Testing"],
    icon: Code,
    color: "#10b981",
    image: "/placeholder.svg?height=400&width=600",
    complexity: "Intermediate",
    duration: "2 months",
  },
  {
    id: 3,
    title: "Data Analytics Dashboard",
    category: "Data Science",
    author: "Garima Patel",
    course: "Data Analytics",
    date: "15-04-2025",
    description:
      "Interactive dashboard built with Power BI for comprehensive data analysis and visualization. Features real-time data processing and advanced analytics capabilities.",
    tech: ["Power BI", "Python", "SQL", "Data Visualization"],
    icon: Database,
    color: "#8b5cf6",
    image: "/placeholder.svg?height=400&width=600",
    complexity: "Intermediate",
    duration: "2.5 months",
  },
  {
    id: 4,
    title: "AI-Powered Chatbot",
    category: "Machine Learning",
    author: "Niha Anjum",
    course: "AI/ML Development",
    date: "28-03-2025",
    description:
      "Intelligent chatbot using natural language processing and machine learning algorithms. Implements sentiment analysis and context-aware responses.",
    tech: ["Python", "TensorFlow", "NLP", "Machine Learning"],
    icon: Brain,
    color: "#f59e0b",
    image: "/placeholder.svg?height=400&width=600",
    complexity: "Advanced",
    duration: "4 months",
  },
]

function ProjectCard({ project, isActive, onClick }: any) {
  return (
    <motion.div
      className={`relative p-6 rounded-3xl backdrop-blur-xl border cursor-pointer transition-all duration-500 ${
        isActive
          ? "border-white/30 bg-white/10 scale-105"
          : "border-white/10 bg-black/20 hover:border-white/20 hover:bg-white/5"
      }`}
      onClick={onClick}
      whileHover={{ y: -5 }}
      layout
    >
      {/* Holographic Effect */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: `conic-gradient(from 0deg, ${project.color}, transparent, ${project.color})`,
            filter: "blur(20px)",
            opacity: 0.3,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <motion.div
            className="p-3 rounded-xl"
            style={{ background: `${project.color}20` }}
            animate={{
              rotate: isActive ? [0, 5, -5, 0] : 0,
            }}
            transition={{
              duration: 2,
              repeat: isActive ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
            }}
          >
            <project.icon className="w-6 h-6" style={{ color: project.color }} />
          </motion.div>

          <div className="text-right">
            <div className="text-xs text-white/60">{project.date}</div>
            <div className="text-xs text-white/60">{project.duration}</div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{project.title}</h3>

        {/* Author & Course */}
        <div className="mb-3">
          <p className="text-sm" style={{ color: project.color }}>
            {project.author}
          </p>
          <p className="text-xs text-white/60">{project.course}</p>
        </div>

        {/* Category & Complexity */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80">{project.category}</span>
          <span
            className="px-2 py-1 rounded-full text-xs font-medium"
            style={{
              background: `${project.color}20`,
              color: project.color,
            }}
          >
            {project.complexity}
          </span>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tech.slice(0, 3).map((tech, index) => (
            <span key={index} className="px-2 py-1 bg-black/40 rounded text-xs text-white/70">
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="px-2 py-1 bg-black/40 rounded text-xs text-white/70">+{project.tech.length - 3}</span>
          )}
        </div>

        {/* Description Preview */}
        <p className="text-white/60 text-sm line-clamp-2">{project.description}</p>
      </div>
    </motion.div>
  )
}

export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState(projects[0])
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextProject = () => {
    const nextIndex = (currentIndex + 1) % projects.length
    setCurrentIndex(nextIndex)
    setSelectedProject(projects[nextIndex])
  }

  const prevProject = () => {
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length
    setCurrentIndex(prevIndex)
    setSelectedProject(projects[prevIndex])
  }

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 mb-6 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-sm"
            animate={{
              boxShadow: [
                "0 0 20px rgba(16, 185, 129, 0.3)",
                "0 0 40px rgba(16, 185, 129, 0.5)",
                "0 0 20px rgba(16, 185, 129, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Code className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">PROJECT NEXUS</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Our Interns' Projects
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Witness the extraordinary creations from our quantum-enhanced learning environment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard
                    project={project}
                    isActive={selectedProject.id === project.id}
                    onClick={() => {
                      setSelectedProject(project)
                      setCurrentIndex(index)
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Detailed View */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject.id}
                className="sticky top-8 rounded-3xl backdrop-blur-xl border border-white/10 bg-black/20 overflow-hidden"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                style={{
                  boxShadow: `0 0 50px ${selectedProject.color}40`,
                }}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
                    style={{
                      background: `linear-gradient(to top, ${selectedProject.color}40, transparent)`,
                    }}
                  />

                  {/* Navigation */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <motion.button
                      className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
                      onClick={prevProject}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
                      onClick={nextProject}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Title & Author */}
                  <h3 className="text-white font-bold text-xl mb-2">{selectedProject.title}</h3>
                  <p className="text-white/70 mb-4">
                    by <span style={{ color: selectedProject.color }}>{selectedProject.author}</span>
                  </p>

                  {/* Description */}
                  <p className="text-white/70 text-sm leading-relaxed mb-6">{selectedProject.description}</p>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            background: `${selectedProject.color}20`,
                            color: selectedProject.color,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <motion.button
                      className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl backdrop-blur-sm border text-white font-medium transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${selectedProject.color}30, ${selectedProject.color}20)`,
                        borderColor: `${selectedProject.color}60`,
                      }}
                      whileHover={{
                        scale: 1.02,
                        background: `linear-gradient(135deg, ${selectedProject.color}40, ${selectedProject.color}30)`,
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View</span>
                    </motion.button>
                    <motion.button
                      className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github className="w-4 h-4 text-white" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
