import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

function Particles() {
  const particlesRef = useRef();

  useEffect(() => {
    gsap.to(particlesRef.current.rotation, {
      duration: 20, 
      y: Math.PI * 2,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  
  const particles = new Float32Array(10000 * 4).map(() => (Math.random() - 0.5) * 50);

  return (
    <group ref={particlesRef}>
      <Points positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="black" 
          size={0.1}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function AnimatedBackground() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 10], fov: 75 }} 
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "#6D9B73" 
      }}
    >
      <ambientLight intensity={0.3} />
      <Particles />
    </Canvas>
  );
}