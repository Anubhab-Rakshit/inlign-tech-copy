"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text3D, Float } from "@react-three/drei"
import type * as THREE from "three"

export default function Floating3DLogo() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.5
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef} position={[0, 0, -5]}>
        <Text3D
          font="/fonts/Inter_Bold.json"
          size={1.5}
          height={0.3}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          position={[-2, 0, 0]}
        >
          I
          <meshStandardMaterial
            color="#4f46e5"
            emissive="#1e40af"
            emissiveIntensity={0.3}
            roughness={0.3}
            metalness={0.7}
          />
        </Text3D>

        {/* Floating geometric elements around the logo */}
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <mesh position={[2, 1, 0]}>
            <tetrahedronGeometry args={[0.3]} />
            <meshStandardMaterial color="#7c3aed" emissive="#4c1d95" emissiveIntensity={0.4} />
          </mesh>
        </Float>

        <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.5}>
          <mesh position={[-3, -1, 1]}>
            <octahedronGeometry args={[0.25]} />
            <meshStandardMaterial color="#06b6d4" emissive="#0891b2" emissiveIntensity={0.4} />
          </mesh>
        </Float>

        <Float speed={2.2} rotationIntensity={0.8} floatIntensity={2.2}>
          <mesh position={[1, -2, -1]}>
            <dodecahedronGeometry args={[0.2]} />
            <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.4} />
          </mesh>
        </Float>
      </group>
    </Float>
  )
}
