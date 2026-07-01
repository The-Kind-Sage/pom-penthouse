import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function PenthouseBuilding({ mouse }: { mouse: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const glassRef = useRef<THREE.Mesh>(null);

  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#c9a86c"),
        metalness: 0.9,
        roughness: 0.15,
        envMapIntensity: 1.5,
      }),
    []
  );

  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#1a1a2e"),
        metalness: 0.3,
        roughness: 0.05,
        transmission: 0.6,
        thickness: 0.5,
        transparent: true,
        opacity: 0.85,
        envMapIntensity: 2,
      }),
    []
  );

  const concreteMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#f5f0e8"),
        metalness: 0.05,
        roughness: 0.8,
      }),
    []
  );

  const darkConcreteMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#2a2a3a"),
        metalness: 0.1,
        roughness: 0.6,
      }),
    []
  );

  useFrame(() => {
    if (!groupRef.current) return;
    const targetRotY = mouse.x * 0.15;
    const targetRotX = mouse.y * 0.08;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.03);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.03);
  });

  return (
    <group ref={groupRef} position={[0, -1.5, 0]}>
      {/* Base platform */}
      <mesh position={[0, -0.1, 0]} material={darkConcreteMaterial}>
        <boxGeometry args={[4.5, 0.2, 3.2]} />
      </mesh>

      {/* Ground floor - main structure */}
      <mesh position={[0, 0.6, 0]} material={concreteMaterial}>
        <boxGeometry args={[4, 1.2, 2.8]} />
      </mesh>

      {/* Glass panels - ground floor */}
      <mesh ref={glassRef} position={[0, 0.6, 1.41]} material={glassMaterial}>
        <planeGeometry args={[3.6, 1]} />
      </mesh>
      <mesh position={[0, 0.6, -1.41]} material={glassMaterial}>
        <planeGeometry args={[3.6, 1]} />
      </mesh>

      {/* Gold trim - ground floor */}
      <mesh position={[0, 1.2, 0]} material={goldMaterial}>
        <boxGeometry args={[4.1, 0.06, 2.9]} />
      </mesh>

      {/* Second floor */}
      <mesh position={[0, 1.65, 0]} material={concreteMaterial}>
        <boxGeometry args={[3.8, 1, 2.6]} />
      </mesh>

      {/* Glass panels - second floor */}
      <mesh position={[0, 1.65, 1.31]} material={glassMaterial}>
        <planeGeometry args={[3.4, 0.85]} />
      </mesh>
      <mesh position={[0, 1.65, -1.31]} material={glassMaterial}>
        <planeGeometry args={[3.4, 0.85]} />
      </mesh>

      {/* Gold trim - second floor */}
      <mesh position={[0, 2.18, 0]} material={goldMaterial}>
        <boxGeometry args={[3.9, 0.06, 2.7]} />
      </mesh>

      {/* Penthouse level */}
      <mesh position={[0, 2.6, 0]} material={concreteMaterial}>
        <boxGeometry args={[3.5, 0.7, 2.4]} />
      </mesh>

      {/* Penthouse glass */}
      <mesh position={[0, 2.6, 1.21]} material={glassMaterial}>
        <planeGeometry args={[3.2, 0.55]} />
      </mesh>
      <mesh position={[0, 2.6, -1.21]} material={glassMaterial}>
        <planeGeometry args={[3.2, 0.55]} />
      </mesh>

      {/* Penthouse roof with gold edge */}
      <mesh position={[0, 3.0, 0]} material={darkConcreteMaterial}>
        <boxGeometry args={[3.7, 0.08, 2.5]} />
      </mesh>
      <mesh position={[0, 3.0, 0]} material={goldMaterial}>
        <boxGeometry args={[3.75, 0.03, 2.55]} />
      </mesh>

      {/* Rooftop terrace railings - gold */}
      {[-1.6, -0.8, 0, 0.8, 1.6].map((x) => (
        <mesh key={`rail-front-${x}`} position={[x, 3.2, 1.25]} material={goldMaterial}>
          <boxGeometry args={[0.02, 0.3, 0.02]} />
        </mesh>
      ))}
      {[-1.6, -0.8, 0, 0.8, 1.6].map((x) => (
        <mesh key={`rail-back-${x}`} position={[x, 3.2, -1.25]} material={goldMaterial}>
          <boxGeometry args={[0.02, 0.3, 0.02]} />
        </mesh>
      ))}

      {/* Railing top bar */}
      <mesh position={[0, 3.35, 1.25]} material={goldMaterial}>
        <boxGeometry args={[3.3, 0.025, 0.025]} />
      </mesh>
      <mesh position={[0, 3.35, -1.25]} material={goldMaterial}>
        <boxGeometry args={[3.3, 0.025, 0.025]} />
      </mesh>

      {/* Side accents - vertical gold strips */}
      <mesh position={[-2.02, 1.5, 0]} material={goldMaterial}>
        <boxGeometry args={[0.04, 2.8, 0.04]} />
      </mesh>
      <mesh position={[2.02, 1.5, 0]} material={goldMaterial}>
        <boxGeometry args={[0.04, 2.8, 0.04]} />
      </mesh>

      {/* Interior glow lights */}
      {[0.6, 1.65, 2.6].map((y, i) => (
        <pointLight
          key={`light-${i}`}
          position={[0, y, 0]}
          color="#ffd700"
          intensity={0.5}
          distance={4}
          decay={2}
        />
      ))}

      {/* Balcony platforms */}
      <mesh position={[0, 1.2, 1.6]} material={darkConcreteMaterial}>
        <boxGeometry args={[3.6, 0.06, 0.5]} />
      </mesh>
      <mesh position={[0, 2.18, 1.5]} material={darkConcreteMaterial}>
        <boxGeometry args={[3.2, 0.06, 0.4]} />
      </mesh>

      {/* Small decorative elements - penthouse crown */}
      <mesh position={[-1.4, 3.1, 0]} material={goldMaterial}>
        <boxGeometry args={[0.3, 0.15, 0.15]} />
      </mesh>
      <mesh position={[1.4, 3.1, 0]} material={goldMaterial}>
        <boxGeometry args={[0.3, 0.15, 0.15]} />
      </mesh>
    </group>
  );
}

export { PenthouseBuilding };
