import React, { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, Sparkles, Instance, Instances } from '@react-three/drei';

// --- Materials ---

const GOLD_MATERIAL = new THREE.MeshStandardMaterial({
  color: "#FFD700",
  roughness: 0.1,
  metalness: 1.0,
  envMapIntensity: 1.5,
});

const CRYSTAL_MATERIAL = new THREE.MeshPhysicalMaterial({
  color: "#004225", // Deep Emerald
  emissive: "#001a0f",
  emissiveIntensity: 0.2,
  roughness: 0.05,
  metalness: 0.2,
  transmission: 0.7,
  thickness: 3,
  ior: 1.7,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
});

const RIBBON_GOLD_MATERIAL = new THREE.MeshStandardMaterial({
  color: "#D4AF37",
  roughness: 0.2,
  metalness: 1.0,
  side: THREE.DoubleSide,
});

const FAIRY_LIGHT_MATERIAL = new THREE.MeshStandardMaterial({
  color: "#ffaa33",
  emissive: "#ffaa33",
  emissiveIntensity: 2,
  toneMapped: false,
});

const BOX_MAT_1 = new THREE.MeshStandardMaterial({ color: "#022c22", roughness: 0.2 });
const BOX_MAT_2 = new THREE.MeshStandardMaterial({ color: "#064e3b", roughness: 0.2 });
const BOX_RIBBON_MAT = new THREE.MeshStandardMaterial({ color: "#D4AF37", metalness: 1, roughness: 0.2 });

// --- Helper Components ---

const SpiralRibbon = ({ radius, height, rotations, material, tubularSegments = 100, radiusThickness = 0.1, phase = 0 }) => {
  const curve = useMemo(() => {
    const points = [];
    for (let i = 0; i <= tubularSegments; i++) {
      const t = i / tubularSegments;
      const angle = (t * Math.PI * 2 * rotations) + phase;
      const r = (1 - t) * radius; // Taper to top
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const y = (t * height) - (height / 2);
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points);
  }, [radius, height, rotations, tubularSegments, phase]);

  return (
    <mesh>
      <tubeGeometry args={[curve, tubularSegments, radiusThickness, 8, false]} />
      <primitive object={material} />
    </mesh>
  );
};

const GiftBox = ({ position, rotation, scale = 1, colorVariant }) => {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh material={colorVariant === 0 ? BOX_MAT_1 : BOX_MAT_2}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
      {/* Ribbons on box */}
      <mesh material={BOX_RIBBON_MAT} position={[0, 0, 0]} scale={[1.02, 1.02, 0.2]}>
         <boxGeometry args={[1, 1, 1]} />
      </mesh>
      <mesh material={BOX_RIBBON_MAT} position={[0, 0, 0]} scale={[0.2, 1.02, 1.02]}>
         <boxGeometry args={[1, 1, 1]} />
      </mesh>
    </group>
  )
}

// --- Main Component ---

export const LuxuryTree: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // -- Procedural Generation Data --

  // Ornaments Data
  const ornamentData = useMemo(() => {
    const items = [];
    const count = 300;
    const height = 9;
    const baseRadius = 3.5;
    
    for (let i = 0; i < count; i++) {
      const t = i / count;
      // Randomized spiral placement
      const angle = t * Math.PI * 2 * 15 + (Math.random() * 0.5); 
      const r = (1 - t) * baseRadius + (Math.random() * 0.5);
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const y = (t * height) - (height / 2) + (Math.random() * 0.5);
      
      const scale = Math.random() * 0.2 + 0.1;
      items.push({ position: [x, y, z], scale, rotation: [Math.random()*Math.PI, Math.random()*Math.PI, 0] });
    }
    return items;
  }, []);

  // Fairy Lights Data (Dense strand)
  const fairyLightsData = useMemo(() => {
    const items = [];
    const count = 400;
    const height = 9.5;
    const baseRadius = 3.8; // Slightly outside
    
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 2 * 20; // More rotations for lights
      const r = (1 - t) * baseRadius;
      // Add some noise
      const x = Math.cos(angle) * r + (Math.random() - 0.5) * 0.2;
      const z = Math.sin(angle) * r + (Math.random() - 0.5) * 0.2;
      const y = (t * height) - (height / 2) + (Math.random() - 0.5) * 0.2;
      
      items.push({ position: [x, y, z], scale: 0.05 });
    }
    return items;
  }, []);

  // Gift Boxes Data
  const giftsData = useMemo(() => {
    const items = [];
    for (let i = 0; i < 12; i++) {
       const angle = (i / 12) * Math.PI * 2;
       const radius = 3.5 + Math.random() * 2;
       const x = Math.cos(angle) * radius;
       const z = Math.sin(angle) * radius;
       const scale = 0.5 + Math.random() * 0.8;
       items.push({
         position: [x, -4.5 + (scale*0.5), z],
         rotation: [0, Math.random() * Math.PI, 0],
         scale,
         variant: i % 2
       });
    }
    return items;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = t * 0.05; // Very slow majestic rotation
    }
  });

  return (
    <group ref={groupRef}>
      
      {/* 1. Emerald Crystal Ribbons */}
      <SpiralRibbon radius={3} height={9} rotations={4} material={CRYSTAL_MATERIAL} radiusThickness={0.4} phase={0} />
      <SpiralRibbon radius={3} height={9} rotations={4} material={CRYSTAL_MATERIAL} radiusThickness={0.3} phase={Math.PI} />

      {/* 2. Thin Golden Wire Ribbons */}
      <SpiralRibbon radius={3.2} height={9} rotations={5} material={RIBBON_GOLD_MATERIAL} radiusThickness={0.05} phase={Math.PI / 2} />
      <SpiralRibbon radius={3.2} height={9} rotations={5} material={RIBBON_GOLD_MATERIAL} radiusThickness={0.05} phase={Math.PI * 1.5} />

      {/* 3. Golden Ornaments */}
      <Instances range={ornamentData.length} material={GOLD_MATERIAL}>
        <sphereGeometry args={[1, 32, 32]} />
        {ornamentData.map((data, i) => (
          <Instance
            key={`ornament-${i}`}
            position={data.position as [number, number, number]}
            scale={data.scale}
            rotation={data.rotation as [number, number, number]}
          />
        ))}
      </Instances>

      {/* 4. Fairy Lights */}
      <Instances range={fairyLightsData.length} material={FAIRY_LIGHT_MATERIAL}>
        <sphereGeometry args={[1, 16, 16]} />
        {fairyLightsData.map((data, i) => (
          <Instance
            key={`light-${i}`}
            position={data.position as [number, number, number]}
            scale={data.scale}
          />
        ))}
      </Instances>

      {/* 5. Gift Boxes at base */}
      {giftsData.map((data, i) => (
        <GiftBox 
          key={`gift-${i}`}
          position={data.position as [number, number, number]} 
          rotation={data.rotation as [number, number, number]}
          scale={data.scale}
          colorVariant={data.variant}
        />
      ))}

      {/* 6. The Topper Star */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <group position={[0, 4.8, 0]}>
           {/* Center Core */}
           <mesh>
             <octahedronGeometry args={[0.6, 0]} />
             <meshStandardMaterial color="#FFF" emissive="#FFD700" emissiveIntensity={2} toneMapped={false} />
           </mesh>
           {/* Rays */}
           <mesh rotation={[0,0,Math.PI/4]}>
             <octahedronGeometry args={[1.2, 0]} />
             <meshBasicMaterial color="#FFD700" wireframe />
           </mesh>
           <pointLight intensity={3} distance={8} color="#FFD700" decay={2} />
        </group>
      </Float>

      {/* 7. Inner Tree Glow */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#064e3b" distance={8} />
      <pointLight position={[0, -2, 0]} intensity={2} color="#D4AF37" distance={8} />

      {/* 8. Floating Magic Particles */}
      <Sparkles 
        count={200} 
        scale={[10, 12, 10]} 
        size={6} 
        speed={0.2} 
        opacity={0.8} 
        color="#F9E076"
      />
    </group>
  );
};