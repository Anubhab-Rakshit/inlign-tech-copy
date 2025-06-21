"use client"

import { useRef, useMemo, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface ParticleSystemProps {
  mousePosition: { x: number; y: number }
}

export default function ParticleSystem({ mousePosition }: ParticleSystemProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const trailsRef = useRef<THREE.InstancedMesh>(null)
  const particleCount = 250
  const trailLength = 5

  // Create particle data with trails
  const particleData = useMemo(() => {
    const data = []
    for (let i = 0; i < particleCount; i++) {
      data.push({
        position: new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
        ),
        originalPosition: new THREE.Vector3(),
        scale: Math.random() * 0.5 + 0.5,
        color: new THREE.Color().setHSL(0.6 + Math.random() * 0.2, 0.8, 0.6 + Math.random() * 0.4),
        trail: Array(trailLength)
          .fill(null)
          .map(() => new THREE.Vector3()),
        trailIndex: 0,
      })
    }

    // Create logo formation (enhanced "I" shape)
    const logoParticles = Math.floor(particleCount * 0.4)
    for (let i = 0; i < logoParticles; i++) {
      const t = i / logoParticles
      if (i < logoParticles / 4) {
        // Top horizontal line
        data[i].originalPosition.set((t * 4 - 2) * 3, 4, 0)
      } else if (i < (logoParticles * 3) / 4) {
        // Vertical line
        data[i].originalPosition.set(0, (t - 0.25) * 8 - 2, 0)
      } else {
        // Bottom horizontal line
        data[i].originalPosition.set((t * 4 - 2) * 3, -4, 0)
      }
    }

    return data
  }, [particleCount])

  // Initialize instances
  useEffect(() => {
    if (!meshRef.current || !trailsRef.current) return

    const dummy = new THREE.Object3D()

    // Initialize main particles
    for (let i = 0; i < particleCount; i++) {
      const particle = particleData[i]
      dummy.position.copy(particle.position)
      dummy.scale.setScalar(particle.scale)
      dummy.updateMatrix()

      meshRef.current.setMatrixAt(i, dummy.matrix)
      meshRef.current.setColorAt(i, particle.color)
    }

    // Initialize trails
    for (let i = 0; i < particleCount * trailLength; i++) {
      const particleIndex = Math.floor(i / trailLength)
      const trailIndex = i % trailLength
      const particle = particleData[particleIndex]

      dummy.position.copy(particle.position)
      dummy.scale.setScalar(particle.scale * (1 - trailIndex / trailLength) * 0.5)
      dummy.updateMatrix()

      trailsRef.current.setMatrixAt(i, dummy.matrix)

      const trailColor = particle.color.clone()
      trailColor.multiplyScalar(1 - trailIndex / trailLength)
      trailsRef.current.setColorAt(i, trailColor)
    }

    meshRef.current.instanceMatrix.needsUpdate = true
    trailsRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true
    if (trailsRef.current.instanceColor) trailsRef.current.instanceColor.needsUpdate = true
  }, [particleData, particleCount, trailLength])

  // Animation loop with trails
  useFrame((state) => {
    if (!meshRef.current || !trailsRef.current) return

    const dummy = new THREE.Object3D()
    const mouse3D = new THREE.Vector3(mousePosition.x * 10, mousePosition.y * 10, 0)
    const time = state.clock.elapsedTime

    for (let i = 0; i < particleCount; i++) {
      const particle = particleData[i]

      // Update trail
      particle.trail[particle.trailIndex].copy(particle.position)
      particle.trailIndex = (particle.trailIndex + 1) % trailLength

      // Mouse attraction effect
      const mouseDistance = particle.position.distanceTo(mouse3D)
      if (mouseDistance < 5) {
        const attraction = mouse3D.clone().sub(particle.position).normalize().multiplyScalar(0.015)
        particle.velocity.add(attraction)
      }

      // Logo formation attraction
      if (particle.originalPosition.length() > 0) {
        const logoAttraction = particle.originalPosition
          .clone()
          .sub(particle.position)
          .normalize()
          .multiplyScalar(0.008)
        particle.velocity.add(logoAttraction)
      }

      // Apply velocity with damping
      particle.position.add(particle.velocity)
      particle.velocity.multiplyScalar(0.98)

      // Floating animation
      particle.position.y += Math.sin(time + i * 0.1) * 0.002
      particle.position.x += Math.cos(time * 0.5 + i * 0.05) * 0.002

      // Update main particle
      dummy.position.copy(particle.position)
      dummy.scale.setScalar(particle.scale * (1 + Math.sin(time + i) * 0.2))
      dummy.rotation.z = time * 0.5 + i
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)

      // Update trail particles
      for (let j = 0; j < trailLength; j++) {
        const trailIndex = i * trailLength + j
        const trailPos = particle.trail[(particle.trailIndex + j) % trailLength]

        dummy.position.copy(trailPos)
        dummy.scale.setScalar(particle.scale * (1 - j / trailLength) * 0.6)
        dummy.updateMatrix()

        trailsRef.current.setMatrixAt(trailIndex, dummy.matrix)

        const trailColor = particle.color.clone()
        trailColor.multiplyScalar((1 - j / trailLength) * 0.7)
        trailsRef.current.setColorAt(trailIndex, trailColor)
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true
    trailsRef.current.instanceMatrix.needsUpdate = true
    if (trailsRef.current.instanceColor) trailsRef.current.instanceColor.needsUpdate = true
  })

  return (
    <group>
      {/* Main particles */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, particleCount]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial
          transparent
          opacity={0.9}
          emissive="#1e40af"
          emissiveIntensity={0.3}
          roughness={0.3}
          metalness={0.7}
        />
      </instancedMesh>

      {/* Trail particles */}
      <instancedMesh ref={trailsRef} args={[undefined, undefined, particleCount * trailLength]}>
        <sphereGeometry args={[0.03, 6, 6]} />
        <meshStandardMaterial transparent opacity={0.6} emissive="#4f46e5" emissiveIntensity={0.2} />
      </instancedMesh>
    </group>
  )
}
