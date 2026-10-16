"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// Intelligence core: glass shell, brushed-metal lattice, orbiting connected nodes.
function Core({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Group>(null);

  const { nodePositions, linePositions } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const n = 18;
    for (let i = 0; i < n; i++) {
      // Fibonacci sphere — evenly spread, deterministic.
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = i * 2.399963;
      pts.push(new THREE.Vector3(Math.cos(t) * r, y, Math.sin(t) * r).multiplyScalar(1.85));
    }
    const lines: number[] = [];
    pts.forEach((a, i) =>
      pts.slice(i + 1).forEach((b) => {
        if (a.distanceTo(b) < 1.45) lines.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }),
    );
    return { nodePositions: pts, linePositions: new Float32Array(lines) };
  }, []);

  useFrame((state, dt) => {
    if (!group.current || !inner.current || !ring.current) return;
    const p = pointer.current ?? { x: 0, y: 0 };
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, p.x * 0.5 + state.clock.elapsedTime * 0.12, 3, dt);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -p.y * 0.3, 3, dt);
    inner.current.rotation.x += dt * 0.25;
    inner.current.rotation.z += dt * 0.18;
    ring.current.rotation.y -= dt * 0.08;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshPhysicalMaterial transparent opacity={0.24} roughness={0.05} metalness={0.1} clearcoat={1} color="#E4D7FF" envMapIntensity={1.4} flatShading depthWrite={false} />
      </mesh>
      <mesh ref={inner}>
        <torusKnotGeometry args={[0.52, 0.14, 180, 24]} />
        <meshStandardMaterial metalness={0.85} roughness={0.2} color="#C9B6F2" />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial emissive="#A78BFA" emissiveIntensity={2.2} color="#A78BFA" />
      </mesh>
      <group ref={ring}>
        {nodePositions.map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[i % 4 === 0 ? 0.065 : 0.045, 16, 16]} />
            <meshStandardMaterial color={i % 3 === 0 ? "#D8B4FE" : "#8B5CF6"} emissive={i % 3 === 0 ? "#D8B4FE" : "#8B5CF6"} emissiveIntensity={0.6} />
          </mesh>
        ))}
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#A78BFA" transparent opacity={0.28} />
        </lineSegments>
      </group>
    </group>
  );
}

export default function HeroCore3D({ active, pointer }: { active: boolean; pointer: React.RefObject<{ x: number; y: number }> }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 3]} intensity={1.6} />
      <pointLight position={[-3, -2, 2]} intensity={12} color="#D8B4FE" />
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.7}>
        <Core pointer={pointer} />
      </Float>
      {/* Local lightformers — no network HDR fetch */}
      <Environment resolution={256}>
        <color attach="background" args={["#1c1430"]} />
        <Lightformer form="rect" intensity={3} position={[0, 4, -4]} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={2} color="#B69CFF" position={[-5, 0, -2]} scale={[2, 8, 1]} />
        <Lightformer form="rect" intensity={2} color="#F0ABFC" position={[5, -1, -2]} scale={[2, 8, 1]} />
        <Lightformer form="ring" intensity={1.5} position={[0, 0, 5]} scale={4} />
      </Environment>
    </Canvas>
  );
}
