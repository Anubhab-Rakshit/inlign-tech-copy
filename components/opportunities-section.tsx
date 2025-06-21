"use client"

import { FluidFormationSystem } from "./fluid-formation-system"

const programs = [
  {
    id: 1,
    title: "Cybersecurity Mastery",
    duration: "12 months intensive",
    particleColor: "#00ff88",
    description:
      "Master digital defense in an interconnected world. Learn ethical hacking, network security, and advanced threat detection.",
    skills: ["Ethical Hacking", "Network Security", "Threat Detection", "Penetration Testing", "Security Auditing"],
    level: "Advanced",
  },
  {
    id: 2,
    title: "Full Stack Innovation",
    duration: "18 months comprehensive",
    particleColor: "#ff6b35",
    description:
      "Build complete digital solutions from ground up. Master React, Node.js, databases, and cloud deployment.",
    skills: ["React", "Node.js", "MongoDB", "AWS", "Docker", "GraphQL"],
    level: "Intermediate",
  },
  {
    id: 3,
    title: "AI & Machine Learning",
    duration: "15 months advanced",
    particleColor: "#8b5cf6",
    description: "Dive deep into artificial intelligence, neural networks, and predictive modeling for the future.",
    skills: ["Python", "TensorFlow", "Neural Networks", "Deep Learning", "Computer Vision"],
    level: "Expert",
  },
  {
    id: 4,
    title: "Cloud Architecture",
    duration: "10 months specialized",
    particleColor: "#06b6d4",
    description: "Design scalable cloud solutions with AWS, Azure, and modern DevOps practices.",
    skills: ["AWS", "Azure", "Kubernetes", "Terraform", "CI/CD", "Microservices"],
    level: "Advanced",
  },
  {
    id: 5,
    title: "Data Science Mastery",
    duration: "14 months intensive",
    particleColor: "#f59e0b",
    description: "Transform raw data into actionable insights using Python, R, and advanced analytics.",
    skills: ["Python", "R", "SQL", "Tableau", "Machine Learning", "Statistics"],
    level: "Intermediate",
  },
  {
    id: 6,
    title: "Mobile Development",
    duration: "12 months focused",
    particleColor: "#ef4444",
    description: "Create stunning mobile experiences with React Native, Flutter, and native development.",
    skills: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "App Store"],
    level: "Intermediate",
  },
]

export default function OpportunitiesSection() {
  return (
    <section className="min-h-screen relative">
      {/* Liquid header */}
      <div className="absolute top-0 left-0 right-0 z-40 text-center pt-12">
        <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold mb-4">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 bg-clip-text text-transparent">
        
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-400 bg-clip-text text-transparent">
            
          </span>
        </h2>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
      
        </p>
      </div>

      <FluidFormationSystem programs={programs} />
    </section>
  )
}
