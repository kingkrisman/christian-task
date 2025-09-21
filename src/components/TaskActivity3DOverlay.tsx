import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Text, Sparkles } from "@react-three/drei";
import * as THREE from "three";

interface OverlayProps {
  mode: "loading" | "success";
  isDark?: boolean;
  onDone?: () => void;
}

const SpinnerMesh: React.FC = () => {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 1.2;
      mesh.current.rotation.y += delta * 0.9;
    }
  });
  return (
    <mesh ref={mesh} position={[0, 0, 0]} castShadow receiveShadow>
      <icosahedronGeometry args={[0.9, 1]} />
      <meshStandardMaterial color="#60A5FA" metalness={0.3} roughness={0.2} />
    </mesh>
  );
};

const SuccessScene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 3, 2]} intensity={0.8} castShadow />
      <Sparkles
        count={80}
        scale={[4, 2, 2]}
        size={4}
        speed={1.2}
        color="#78D700"
      />
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.35}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        Task added
      </Text>
      <Environment preset="city" />
    </>
  );
};

const LoadingScene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[2, 3, 2]} intensity={0.6} color="#93C5FD" />
      <SpinnerMesh />
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.28}
        color="#E5E7EB"
        anchorX="center"
        anchorY="middle"
      >
        Adding task…
      </Text>
      <Environment preset="city" />
    </>
  );
};

export const TaskActivity3DOverlay: React.FC<OverlayProps> = ({
  mode,
  isDark = false,
  onDone,
}) => {
  useEffect(() => {
    if (mode === "success" && onDone) {
      const t = setTimeout(onDone, 1200);
      return () => clearTimeout(t);
    }
  }, [mode, onDone]);

  return (
    <div
      className={`absolute inset-0 z-50 flex items-center justify-center ${isDark ? "bg-black/50" : "bg-white/50"} backdrop-blur-xs`}
    >
      <div
        className={`w-72 h-48 rounded-xl shadow-card border ${isDark ? "bg-dark-card border-dark-border" : "bg-white border-brand-gray-200"}`}
      >
        <Canvas
          camera={{ position: [0, 0, 4], fov: 55 }}
          style={{ width: "100%", height: "100%" }}
        >
          {mode === "loading" ? <LoadingScene /> : <SuccessScene />}
        </Canvas>
      </div>
    </div>
  );
};

export default TaskActivity3DOverlay;
