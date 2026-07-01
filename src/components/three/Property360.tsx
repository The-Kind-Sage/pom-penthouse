import { Suspense, useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import { motion } from "framer-motion";
import { RotateCcw, Maximize2 } from "lucide-react";
import * as THREE from "three";

function RotatingPenthouse() {
  const groupRef = useRef<THREE.Group>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  const goldMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#c9a86c"),
    metalness: 0.9,
    roughness: 0.15,
  });

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#1a1a2e"),
    metalness: 0.3,
    roughness: 0.05,
    transmission: 0.6,
    thickness: 0.5,
    transparent: true,
    opacity: 0.85,
  });

  const concreteMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#f5f0e8"),
    metalness: 0.05,
    roughness: 0.8,
  });

  const darkMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#2a2a3a"),
    metalness: 0.1,
    roughness: 0.6,
  });

  useFrame((state) => {
    if (!groupRef.current) return;
    if (autoRotate) {
      groupRef.current.rotation.y += 0.003;
    }
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Base */}
      <mesh position={[0, -0.1, 0]} material={darkMaterial}>
        <boxGeometry args={[4.5, 0.15, 3.2]} />
      </mesh>

      {/* Main structure */}
      <mesh position={[0, 0.6, 0]} material={concreteMaterial}>
        <boxGeometry args={[4, 1.2, 2.8]} />
      </mesh>

      {/* Glass */}
      <mesh position={[0, 0.6, 1.41]} material={glassMaterial}>
        <planeGeometry args={[3.6, 1]} />
      </mesh>

      {/* Gold trim */}
      <mesh position={[0, 1.2, 0]} material={goldMaterial}>
        <boxGeometry args={[4.1, 0.05, 2.9]} />
      </mesh>

      {/* Second floor */}
      <mesh position={[0, 1.65, 0]} material={concreteMaterial}>
        <boxGeometry args={[3.8, 1, 2.6]} />
      </mesh>

      <mesh position={[0, 1.65, 1.31]} material={glassMaterial}>
        <planeGeometry args={[3.4, 0.85]} />
      </mesh>

      <mesh position={[0, 2.18, 0]} material={goldMaterial}>
        <boxGeometry args={[3.9, 0.05, 2.7]} />
      </mesh>

      {/* Penthouse */}
      <mesh position={[0, 2.6, 0]} material={concreteMaterial}>
        <boxGeometry args={[3.5, 0.7, 2.4]} />
      </mesh>

      <mesh position={[0, 2.6, 1.21]} material={glassMaterial}>
        <planeGeometry args={[3.2, 0.55]} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 3.0, 0]} material={darkMaterial}>
        <boxGeometry args={[3.7, 0.06, 2.5]} />
      </mesh>
      <mesh position={[0, 3.0, 0]} material={goldMaterial}>
        <boxGeometry args={[3.75, 0.02, 2.55]} />
      </mesh>

      {/* Railings */}
      {[-1.6, -0.8, 0, 0.8, 1.6].map((x) => (
        <mesh key={`r-${x}`} position={[x, 3.2, 1.25]} material={goldMaterial}>
          <boxGeometry args={[0.02, 0.25, 0.02]} />
        </mesh>
      ))}
      <mesh position={[0, 3.32, 1.25]} material={goldMaterial}>
        <boxGeometry args={[3.3, 0.02, 0.02]} />
      </mesh>

      {/* Interior glow */}
      <pointLight position={[0, 1, 0]} color="#ffd700" intensity={0.8} distance={5} decay={2} />
    </group>
  );
}

function Property360() {
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-gold">
            <span className="h-px w-8 bg-gold/50" />
            Interactive Preview
            <span className="h-px w-8 bg-gold/50" />
          </span>
          <h2 className="mt-4 font-display text-4xl font-medium text-luxury-black dark:text-white sm:text-5xl">
            360° Property View
          </h2>
          <p className="mt-4 text-muted-foreground">
            Drag to rotate • Scroll to zoom • Explore every detail
          </p>
        </div>

        {/* 3D Viewer */}
        <div className="relative mx-auto aspect-video max-w-4xl overflow-hidden rounded-3xl border border-border bg-luxury-black/5">
          <Canvas
            camera={{ position: [0, 1.5, 6], fov: 40 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 8, 5]} intensity={1} color="#fff5e6" />
              <directionalLight position={[-3, 4, -2]} intensity={0.3} color="#c9a86c" />
              <pointLight position={[0, 3, 2]} intensity={0.6} color="#ffd700" distance={8} decay={2} />

              <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1}>
                <RotatingPenthouse />
              </Float>

              <ContactShadows
                position={[0, -0.6, 0]}
                opacity={0.3}
                scale={10}
                blur={2}
                far={4}
                color="#1a1a2e"
              />

              <Environment preset="city" environmentIntensity={0.4} />
            </Suspense>
          </Canvas>

          {/* Controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium uppercase tracking-wider backdrop-blur-md transition-all duration-300 ${
                autoRotate
                  ? "bg-gold/20 text-gold border border-gold/30"
                  : "bg-white/10 text-white/60 border border-white/10 hover:bg-white/20"
              }`}
            >
              <RotateCcw className="size-3.5" />
              {autoRotate ? "Auto Rotating" : "Paused"}
            </button>
          </div>

          {/* Corner decorations */}
          <div className="absolute left-4 top-4 h-6 w-6 border-l border-t border-gold/30" />
          <div className="absolute right-4 top-4 h-6 w-6 border-r border-t border-gold/30" />
          <div className="absolute bottom-4 left-4 h-6 w-6 border-l border-b border-gold/30" />
          <div className="absolute bottom-4 right-4 h-6 w-6 border-r border-b border-gold/30" />
        </div>

        {/* Feature cards below */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { icon: "🏔️", title: "Panoramic Views", desc: "360° mountain and lake views" },
            { icon: "✨", title: "Premium Finishes", desc: "Italian marble & gold accents" },
            { icon: "🌙", title: "Rooftop Terrace", desc: "Private outdoor entertaining" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group rounded-2xl border border-border bg-background/50 p-6 text-center backdrop-blur-sm transition-all duration-500 hover:border-gold/30 hover:shadow-[0_20px_60px_-20px_rgba(201,168,108,0.15)]"
            >
              <span className="text-3xl">{item.icon}</span>
              <h3 className="mt-3 font-display text-lg font-medium text-luxury-black dark:text-white">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Property360 };
