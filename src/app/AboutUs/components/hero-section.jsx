'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Configuration object for easy customization
const config = {
  scene: {
    background: 0xFFFFFF,
    fogColor: 0x000000,
    fogNear: 1,
    fogFar: 11,
  },
  camera: {
    fov: 85,
    near: .1,
    far: 1000,
    position: { x: -2.3, y: 0, z: 10 },
  },
  controls: {
    enableDamping: true,
    dampingFactor: 0.05,
    autoRotate: true,
    autoRotateSpeed: 0.5,
    enableZoom: false,
  },
  pyramid: {
    color: 0x000000,
    wireframeColor: 0xFFFFFF,
    height: 0.5,
  },
  cubes: {
    count: 20,
    size: 0.2,
    color: 0x000000,
    wireframeColor: 0xFFFFFF,
    minDistance: 1, // Minimum distance from the pyramid
    maxDistance: 2.35, // Maximum distance from the pyramid
    minHeight: -1, // Minimum height for cube placement
    maxHeight: 2.35, // Maximum height for cube placement
    radius: 3, // Radius of the sphere
  },
  animation: {
    rotationSpeed: 0.005,
    initialZoom: 10,
    targetZoom: 2.7,
    zoomDuration: 2000,
  },
}

function createScene(config) {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(config.scene.background)
  scene.fog = new THREE.Fog(config.scene.fogColor, config.scene.fogNear, config.scene.fogFar)
  return scene
}

function createCamera(config, aspect) {
  const camera = new THREE.PerspectiveCamera(config.camera.fov, aspect, config.camera.near, config.camera.far)
  camera.position.set(config.camera.position.x, config.camera.position.y, config.camera.position.z)
  return camera
}

function createPyramid(config) {
  const pyramidGeometry = new THREE.BufferGeometry()
  const reducedHeight = config.pyramid.height * 0.97 * 0.97
  const vertices = new Float32Array([
    -0.5, -0.5, 0.5,
    0.5, -0.5, 0.5,
    0, reducedHeight, 0,
    0.5, -0.5, 0.5,
    0.5, -0.5, -0.5,
    0, reducedHeight, 0,
    0.5, -0.5, -0.5,
    -0.5, -0.5, -0.5,
    0, reducedHeight, 0,
    -0.5, -0.5, -0.5,
    -0.5, -0.5, 0.5,
    0, reducedHeight, 0,
    -0.5, -0.5, 0.5,
    0.5, -0.5, 0.5,
    0.5, -0.5, -0.5,
    -0.5, -0.5, -0.5,
  ])
  const indices = new Uint16Array([
    0, 1, 2,
    3, 4, 5,
    6, 7, 8,
    9, 10, 11,
    12, 13, 14, 12, 14, 15
  ])
  pyramidGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
  pyramidGeometry.setIndex(new THREE.BufferAttribute(indices, 1))
  pyramidGeometry.computeVertexNormals()

  const faceMaterial = new THREE.MeshBasicMaterial({ 
    color: config.pyramid.color,
    side: THREE.DoubleSide,
  })

  const pyramid = new THREE.Mesh(pyramidGeometry, faceMaterial)
  
  const pyramidEdges = new THREE.EdgesGeometry(pyramidGeometry)
  const pyramidLineMaterial = new THREE.LineBasicMaterial({ color: config.pyramid.wireframeColor })
  const pyramidWireframe = new THREE.LineSegments(pyramidEdges, pyramidLineMaterial)
  pyramid.add(pyramidWireframe)

  return pyramid
}

function createCubes(config) {
  const cubes = []
  const cubeGeometry = new THREE.BoxGeometry(config.cubes.size, config.cubes.size, config.cubes.size)
  const cubeMaterial = new THREE.MeshBasicMaterial({ color: config.cubes.color })
  const cubeEdges = new THREE.EdgesGeometry(cubeGeometry)
  const cubeLineMaterial = new THREE.LineBasicMaterial({ color: config.cubes.wireframeColor })

  for (let i = 0; i < config.cubes.count; i++) {
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    const cubeWireframe = new THREE.LineSegments(cubeEdges, cubeLineMaterial)
    
    // Generate random spherical coordinates
    const theta = Math.random() * Math.PI * 2 // Azimuthal angle
    const phi = Math.acos(2 * Math.random() - 1) // Polar angle
    
    // Generate random distance within the specified range
    const distance = config.cubes.minDistance + Math.random() * (config.cubes.maxDistance - config.cubes.minDistance)
    
    // Calculate x, y, and z positions based on spherical coordinates
    cube.position.x = distance * Math.sin(phi) * Math.cos(theta)
    cube.position.y = distance * Math.sin(phi) * Math.sin(theta)
    cube.position.z = distance * Math.cos(phi)
    
    cube.rotation.x = Math.random() * Math.PI
    cube.rotation.y = Math.random() * Math.PI
    cube.rotation.z = Math.random() * Math.PI
    
    cube.add(cubeWireframe)
    cubes.push(cube)
  }

  return cubes
}

export function HeroSection() {
  const mountRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = createScene(config)
    const camera = createCamera(config, mountRef.current.clientWidth / mountRef.current.clientHeight)
    
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    mountRef.current.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    Object.assign(controls, config.controls)

    const group = new THREE.Group()
    scene.add(group)

    const pyramid = createPyramid(config)
    group.add(pyramid)

    const cubes = createCubes(config)
    cubes.forEach(cube => group.add(cube))

    let currentZoom = config.animation.initialZoom
    const startTime = Date.now()

    function animate() {
      requestAnimationFrame(animate)

      group.rotation.y += config.animation.rotationSpeed

      const elapsedTime = Date.now() - startTime
      if (elapsedTime < config.animation.zoomDuration) {
        const progress = elapsedTime / config.animation.zoomDuration
        currentZoom = config.animation.initialZoom - (config.animation.initialZoom - config.animation.targetZoom) * easeOutCubic(progress)
        camera.position.z = currentZoom
      }

      controls.update()
      renderer.render(scene, camera)
    }

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3)
    }

    animate()

    const handleResize = () => {
      if (!mountRef.current) return
      const width = mountRef.current.clientWidth
      const height = mountRef.current.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <section className="container mx-auto px-4 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.h1 
            className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-accent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Redefining Digital Landscapes
          </motion.h1>
          <motion.p 
            className="text-xl text-muted mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We're not just another software agency. We're the architects of your digital future.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg" className="mr-4 bg-primary text-light hover:bg-secondary">
              Our Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-darker">
              Meet the Team
            </Button>
          </motion.div>
        </div>
        <div className="relative h-[400px]">
          <div ref={mountRef} className="absolute inset-0" />
        </div>
      </div>
    </section>
  )
}


