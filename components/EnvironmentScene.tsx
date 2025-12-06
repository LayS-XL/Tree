import React, { useMemo } from 'react';
import { Environment, MeshReflectorMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

const BokehParticles = ({ count = 50 }) => {
  const mesh = React.useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate random positions far in the background
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      // Place them in a cylinder around the scene
      const radius = 20 + Math.random() * 20; 
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 20;
      const scale = Math.random() * 2 + 0.5;
      temp.push({ position: [x, y, z], scale });
    }
    return temp;
  }, [count]);

  React.useLayoutEffect(() => {
    if (mesh.current) {
        particles.forEach((data, i) => {
            dummy.position.set(data.position[0], data.position[1], data.position[2]);
            dummy.scale.set(data.scale, data.scale, data.scale);
            dummy.updateMatrix();
            mesh.current!.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    }
  }, [particles, dummy]);

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#F9E076" transparent opacity={0.3} />
    </instancedMesh>
  );
};

export const EnvironmentScene: React.FC = () => {
  return (
    <>
      <Environment preset="city" />
      
      {/* Cinematic Key Light (Warm Gold) */}
      <spotLight 
        position={[15, 15, 10]} 
        angle={0.3} 
        penumbra={0.5} 
        intensity={3} 
        color="#F9E076"
        castShadow 
        shadow-bias={-0.0001}
      />
      
      {/* Fill Light (Emerald Cool) */}
      <spotLight 
        position={[-15, 5, -10]} 
        angle={0.5} 
        penumbra={1} 
        intensity={2} 
        color="#064e3b" 
      />

      {/* Rim Light for separation */}
      <pointLight position={[0, 10, -10]} intensity={1} color="#ffffff" />

      {/* Reflective Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.5, 0]}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={50}
          roughness={0.8}
          depthScale={1}
          minDepthThreshold={0.5}
          maxDepthThreshold={1.4}
          color="#010a08"
          metalness={0.6}
        />
      </mesh>
      
      {/* Background Ambience */}
      <BokehParticles count={60} />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      
      {/* Deep Atmosphere Fog */}
      <fog attach="fog" args={['#01120e', 8, 35]} />
    </>
  );
};