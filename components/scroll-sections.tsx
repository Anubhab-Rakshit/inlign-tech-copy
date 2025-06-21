"use client"

import { useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Float, OrbitControls } from "@react-three/drei"
import { useInView } from "framer-motion"
import { motion } from "framer-motion"

function Floating3DElements() {
  return (
    <group>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-3, 2, 0]}>
          <dodecahedronGeometry args={[0.8]} />
          <meshStandardMaterial color="#4f46e5" emissive="#1e40af" emissiveIntensity={0.3} />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[3, -1, 0]}>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial color="#7c3aed" emissive="#4c1d95" emissiveIntensity={0.3} />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={2.5}>
        <mesh position={[0, -3, -2]}>
          <icosahedronGeometry args={[0.6]} />
          <meshStandardMaterial color="#06b6d4" emissive="#0891b2" emissiveIntensity={0.3} />
        </mesh>
      </Float>
    </group>
  )
}

export default function ScrollSections() {
  const section1Ref = useRef(null)
  const section2Ref = useRef(null)
  const section3Ref = useRef(null)

  const section1InView = useInView(section1Ref, { once: true, margin: "-100px" })
  const section2InView = useInView(section2Ref, { once: true, margin: "-100px" })
  const section3InView = useInView(section3Ref, { once: true, margin: "-100px" })

  return (
    <>
      {/* Section 1 - About */}
      <motion.section
        ref={section1Ref}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={section1InView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={section1InView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Innovation
              </span>{" "}
              Meets Education
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              We're revolutionizing the way technology education is delivered, creating immersive learning experiences
              that prepare students for the future.
            </p>
          </motion.div>

          <motion.div
            className="h-96"
            initial={{ x: 100, opacity: 0 }}
            animate={section1InView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Canvas camera={{ position: [0, 0, 8] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Floating3DElements />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
            </Canvas>
          </motion.div>
        </div>
      </motion.section>

      {/* Section 2 - Features */}
      <motion.section
        ref={section2Ref}
        className="min-h-screen flex items-center justify-center relative"
        initial={{ opacity: 0 }}
        animate={section2InView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            className="text-5xl font-bold text-white mb-12"
            initial={{ y: 50, opacity: 0 }}
            animate={section2InView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Features</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "AI-Powered Learning", desc: "Personalized curriculum adaptation" },
              { title: "3D Simulations", desc: "Immersive hands-on experiences" },
              { title: "Real-time Collaboration", desc: "Connect with peers globally" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700"
                initial={{ y: 100, opacity: 0 }}
                animate={section2InView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section 3 - CTA */}
      <motion.section
        ref={section3Ref}
        className="min-h-screen flex items-center justify-center relative"
        initial={{ opacity: 0 }}
        animate={section3InView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-900/20 to-black"></div>

        <div className="relative z-10 text-center">
          <motion.h2
            className="text-6xl font-bold text-white mb-8"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={section3InView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
            transition={{ duration: 1, type: "spring" }}
          >
            Ready to{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Transform</span>
            ?
          </motion.h2>

          <motion.button
            className="px-12 py-4 text-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
            initial={{ y: 50, opacity: 0 }}
            animate={section3InView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join the Revolution
          </motion.button>
        </div>
      </motion.section>
    </>
  )
}
