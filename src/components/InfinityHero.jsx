"use client"

import React, { useRef, useMemo, useEffect, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"

// Adjustable parameters
const PARAMS = {
  PARTICLE_COUNT: 9000,
  CURVE_SEGMENTS: 64,
  THICKNESS: 3.5,
  LERP_FACTOR: 0.01,
  INITIAL_CAMERA_DISTANCE: 2.75,
  MAX_CAMERA_DISTANCE: 5,
  MAX_SCROLL: 1000,
  FOG_NEAR_FACTOR: 0.1,
  FOG_FAR_FACTOR: 0.5,
  FOG_DENSITY: 0.75,
}

function getPointOnTube(curve, t, radius) {
  const position = new THREE.Vector3()
  const normal = new THREE.Vector3()
  curve.getPointAt(t, position)
  curve.getTangentAt(t, normal)
  const up = new THREE.Vector3(0, 1, 0)
  const axis = new THREE.Vector3().crossVectors(up, normal).normalize()
  const radialAngle = Math.random() * Math.PI * 2
  const binormal = new THREE.Vector3().crossVectors(normal, axis)
  const radialVector = new THREE.Vector3()
    .addScaledVector(axis, Math.cos(radialAngle))
    .addScaledVector(binormal, Math.sin(radialAngle))
  position.add(radialVector.multiplyScalar(radius))
  return { position, normal: radialVector }
}

const Figure8Particles = () => {
  const instancedMesh = useRef(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const clock = useRef(new THREE.Clock())
  
  const particlePositions = useMemo(() => new Array(PARAMS.PARTICLE_COUNT).fill(0).map(() => new THREE.Vector3()), [])
  const targetPositions = useMemo(() => new Array(PARAMS.PARTICLE_COUNT).fill(0).map(() => new THREE.Vector3()), [])
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      Array(PARAMS.CURVE_SEGMENTS).fill(0).map((_, i) => {
        const t = i / PARAMS.CURVE_SEGMENTS
        const x = Math.sin(t * Math.PI * 2) * 3
        const y = Math.sin(t * Math.PI * 4) * 1.5
        const z = Math.cos(t * Math.PI * 2) * 1.5
        return new THREE.Vector3(x, y, z)
      }),
      true
    )
  }, [])
  const radius = PARAMS.THICKNESS / 2

  useFrame(() => {
    if (instancedMesh.current) {
      const time = clock.current.getElapsedTime()
      
      for (let i = 0; i < PARAMS.PARTICLE_COUNT; i++) {
        const t = (i / PARAMS.PARTICLE_COUNT + time * 0.1) % 1
        const { position, normal } = getPointOnTube(curve, t, radius)
        
        targetPositions[i].copy(position).add(normal.multiplyScalar(Math.random() * radius))
        particlePositions[i].lerp(targetPositions[i], PARAMS.LERP_FACTOR)
        dummy.position.copy(particlePositions[i])
        dummy.scale.setScalar(0.01)
        dummy.updateMatrix()
        instancedMesh.current.setMatrixAt(i, dummy.matrix)
      }
      
      instancedMesh.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <instancedMesh ref={instancedMesh} args={[null, null, PARAMS.PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color="#ffffff" />
    </instancedMesh>
  )
}

const Rig = ({ scroll }) => {
  const { scene, camera } = useThree()
  
  useFrame(() => {
    if (camera && scene) {
      const normalizedScroll = Math.min(scroll / PARAMS.MAX_SCROLL, 1)
      const currentCameraDistance = THREE.MathUtils.lerp(
        PARAMS.INITIAL_CAMERA_DISTANCE,
        PARAMS.MAX_CAMERA_DISTANCE,
        normalizedScroll
      )
      
      camera.position.setLength(currentCameraDistance)
      
      const fogDensity = THREE.MathUtils.lerp(0, PARAMS.FOG_DENSITY, normalizedScroll)
      scene.fog = new THREE.FogExp2(0x000000, fogDensity)
    }
  })
  
  return null
}

const Scene = ({ scroll }) => {
  const controlsRef = useRef()
  const [lastInteraction, setLastInteraction] = useState(0)
  const { camera } = useThree()
  
  useEffect(() => {
    if (controlsRef.current && camera) {
      camera.position.set(0, 0, PARAMS.INITIAL_CAMERA_DISTANCE)
      controlsRef.current.update()
    }
  }, [camera])

  useFrame(({ clock }) => {
    if (!controlsRef.current || !camera) return
    
    const timeSinceInteraction = clock.getElapsedTime() - lastInteraction
    const scrollFactor = Math.min(scroll / PARAMS.MAX_SCROLL, 1)

    if (timeSinceInteraction > 3 || scrollFactor > 0) {
      const resetFactor = Math.max(timeSinceInteraction > 3 ? 0.05 : 0, scrollFactor * 0.1)
      const targetPosition = new THREE.Vector3(0, 0, PARAMS.INITIAL_CAMERA_DISTANCE)
      camera.position.lerp(targetPosition, resetFactor)
      controlsRef.current.update()
    }
  })

  const handleInteraction = () => {
    setLastInteraction(Date.now() / 1000)
  }

  return (
    <>
      <Figure8Particles />
      <OrbitControls 
        ref={controlsRef}
        enableZoom={false} 
        enablePan={false} 
        target={[0, 0, 0]}
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
        onChange={handleInteraction}
      />
      <Rig scroll={scroll} />
    </>
  )
}

const Overlay = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-end p-6 pointer-events-none">
      <div className="text-white text-right">
        <h5 className="text-2xl mb-2">Collective patience</h5>
        <p className="text-xs opacity-70 max-w-xs">
          Time is an infinite field. Millions and millions of interlocking wheels. We have to be patient to be victorious.
          <br />
          <br />
          Our mistake in all of our thinking is that we each believe ourselves to be an independent entity; one self beside countless other selves. While in reality, we're all just small fractions of an infinite whole.
        </p>
      </div>
    </div>   
  )
}

const InfinityHero = () => {
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative bg-black text-white">
      <div className="h-screen sticky top-0 w-full">
        <Canvas style={{ width: '100%', height: '100%' }}>
          <PerspectiveCamera makeDefault position={[0, 0, PARAMS.INITIAL_CAMERA_DISTANCE]} fov={75} />
          <color attach="background" args={["black"]} />
          <Scene scroll={scroll} />
        </Canvas>
        <Overlay />
      </div>
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-4">Scroll Down Content</h2>
          <p className="mb-2">This is the main content of the webpage.</p>
          <p className="mb-2">As you scroll, the figure eight animation will quickly disappear into black fog.</p>
          <p className="mb-2">The camera orbits around the figure eight, which maintains its position.</p>
          <p className="mb-2">The camera view will return to its default position 3 seconds after interaction or as you scroll.</p>
        </div>
        {[...Array(10)].map((_, index) => (
          <div key={index} className="container mx-auto px-4 py-16">
            <h3 className="text-2xl font-bold mb-4">Section {index + 1}</h3>
            <p className="mb-2">This is additional content to demonstrate scrolling.</p>
            <p className="mb-2">As you scroll, the Three.js animation will quickly disappear into the black fog.</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InfinityHero