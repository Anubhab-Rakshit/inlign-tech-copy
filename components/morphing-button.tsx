"use client"

import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Text, RoundedBox } from "@react-three/drei"
import { useSpring, animated } from "@react-spring/three"

function Button3D({ isHovered }: { isHovered: boolean }) {
  const { scale, rotation } = useSpring({
    scale: isHovered ? [1.1, 1.1, 0.3] : [1, 1, 0.1],
    rotation: isHovered ? [0, 0, 0] : [0, 0, 0],
    config: { tension: 300, friction: 10 },
  })

  return (
    <animated.group scale={scale} rotation={rotation}>
      <RoundedBox args={[3, 1, 0.2]} radius={0.1}>
        <meshStandardMaterial
          color={isHovered ? "#4f46e5" : "#1e40af"}
          emissive={isHovered ? "#1e40af" : "#0f172a"}
          emissiveIntensity={0.3}
          roughness={0.3}
          metalness={0.7}
        />
      </RoundedBox>
      <Text
        position={[0, 0, 0.11]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        Get Started
      </Text>
    </animated.group>
  )
}

export default function MorphingButton() {
  const [isHovered, setIsHovered] = useState(false)
  const [is3D, setIs3D] = useState(false)

  return (
    <div className="relative">
      {/* 2D Button */}
      <button
        className={`
          relative px-8 py-4 text-lg font-semibold text-white rounded-lg
          transition-all duration-300 ease-out transform
          ${isHovered ? "scale-105 opacity-0" : "scale-100 opacity-100"}
          ${is3D ? "pointer-events-none" : "pointer-events-auto"}
          bg-gradient-to-r from-blue-600 to-purple-600
          hover:from-blue-500 hover:to-purple-500
          shadow-lg hover:shadow-xl
          border border-blue-400/30
        `}
        onMouseEnter={() => {
          setIsHovered(true)
          setTimeout(() => setIs3D(true), 150)
        }}
        onMouseLeave={() => {
          setIsHovered(false)
          setIs3D(false)
        }}
      >
        Get Started
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg blur-xl"></div>
      </button>

      {/* 3D Button */}
      {is3D && (
        <div
          className="absolute inset-0 w-full h-full cursor-pointer"
          onMouseLeave={() => {
            setIsHovered(false)
            setIs3D(false)
          }}
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Button3D isHovered={isHovered} />
          </Canvas>
        </div>
      )}
    </div>
  )
}
