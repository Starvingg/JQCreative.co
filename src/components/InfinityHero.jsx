"use client"
import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Constants for Figure8Particles
const PARTICLE_COUNT = 9000;
const CURVE_SEGMENTS = 64;
const THICKNESS = 2.5;
const LERP_FACTOR = 0.01;

// Helper function to get a point on the tube's surface
function getPointOnTube(curve, t, radius) {
  const position = new THREE.Vector3();
  const normal = new THREE.Vector3();
  curve.getPointAt(t, position);
  curve.getTangentAt(t, normal);
  const up = new THREE.Vector3(0, 1, 0);
  const axis = new THREE.Vector3().crossVectors(up, normal).normalize();
  const radialAngle = Math.random() * Math.PI * 2;
  const binormal = new THREE.Vector3().crossVectors(normal, axis);
  const radialVector = new THREE.Vector3()
    .addScaledVector(axis, Math.cos(radialAngle))
    .addScaledVector(binormal, Math.sin(radialAngle));
  position.add(radialVector.multiplyScalar(radius));
  return { position, normal: radialVector };
}

// Figure8Particles component
const Figure8Particles = () => {
  const instancedMesh = useRef(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const clock = useRef(new THREE.Clock());
  
  const particlePositions = useMemo(() => new Array(PARTICLE_COUNT).fill(0).map(() => new THREE.Vector3()), []);
  const targetPositions = useMemo(() => new Array(PARTICLE_COUNT).fill(0).map(() => new THREE.Vector3()), []);
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      Array(CURVE_SEGMENTS).fill(0).map((_, i) => {
        const t = i / CURVE_SEGMENTS;
        const x = Math.sin(t * Math.PI * 2) * 2;
        const y = Math.sin(t * Math.PI * 4);
        const z = Math.cos(t * Math.PI * 2);
        return new THREE.Vector3(x, y, z);
      }),
      true
    );
  }, []);
  const radius = THICKNESS / 2;

  useFrame(() => {
    if (instancedMesh.current) {
      const time = clock.current.getElapsedTime();
      
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const t = (i / PARTICLE_COUNT + time * 0.1) % 1;
        const { position, normal } = getPointOnTube(curve, t, radius);
        
        targetPositions[i].copy(position).add(normal.multiplyScalar(Math.random() * radius));
        particlePositions[i].lerp(targetPositions[i], LERP_FACTOR);
        dummy.position.copy(particlePositions[i]);
        dummy.scale.setScalar(0.005);
        dummy.updateMatrix();
        instancedMesh.current.setMatrixAt(i, dummy.matrix);
      }
      
      instancedMesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={instancedMesh} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color="#ffffff" />
    </instancedMesh>
  );
};

// FloatingParticles component
const FloatingParticles = () => {
  // Placeholder for FloatingParticles implementation
  return null;
};

// Overlay component
const Overlay = () => {
  return (
    <div className="fixed z-10 text-white inset-0 blur-[0.5px] flex items-center justify-end p-6 gap-2 flex-col pointer-events-none">
      <h5 className="text-2xl">Collective patience</h5>
      <p className="text-xs text-center opacity-70 max-w-xs">
        Time is an infinite field. Millions and millions of interlocking wheels. We have to be patient to be victorious.
        <br />
        <br />
        Our mistake in all of our thinking is that we each believe ourselves to be an independent entity; one self beside countless other selves. While in reality, we're all just small fractions of an infinite whole."
      </p>
    </div>   
  );
};

// Main component
const InfinityHero = () => {
  return (
    <div className="fixed w-full border-red-500 border-4 inset-0">
      <div className="fixed w-full top-0 left-0 right-0 bottom-0">
        <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
          <color attach="background" args={["black"]} />
          <fog attach="fog" args={['#000000', 2, 3]} />
          <Figure8Particles />
          <FloatingParticles />
          <OrbitControls />
        </Canvas>
      </div>
      <Overlay />
    </div>
  );
};

export default InfinityHero;