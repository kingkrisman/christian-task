import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Text,
  OrbitControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "../contexts/ThemeContext";

interface TaskProgress3DProps {
  taskCounts: {
    todo: number;
    inprogress: number;
    done: number;
  };
  className?: string;
}

interface ProgressBarProps {
  position: [number, number, number];
  height: number;
  color: string;
  label: string;
  count: number;
  maxHeight: number;
}

const AnimatedBar: React.FC<ProgressBarProps> = ({
  position,
  height,
  color,
  label,
  count,
  maxHeight,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Animate the bar height and hover effects
  useFrame((state) => {
    if (meshRef.current) {
      const targetHeight = (height / maxHeight) * 4 + 0.5; // Scale to reasonable 3D height
      const currentHeight = meshRef.current.scale.y;
      meshRef.current.scale.y = THREE.MathUtils.lerp(
        currentHeight,
        targetHeight,
        0.05,
      );

      // Hover animation
      const targetScale = hovered ? 1.1 : 1;
      meshRef.current.scale.x = THREE.MathUtils.lerp(
        meshRef.current.scale.x,
        targetScale,
        0.1,
      );
      meshRef.current.scale.z = THREE.MathUtils.lerp(
        meshRef.current.scale.z,
        targetScale,
        0.1,
      );

      // Click animation
      if (clicked) {
        meshRef.current.rotation.y += 0.05;
      }

      // Subtle floating animation
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.1}
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.1 : 0}
        />
      </mesh>

      {/* Text label */}
      <Text
        position={[0, -1, 0]}
        fontSize={0.3}
        color="#666666"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {label}
      </Text>

      {/* Count text */}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.4}
        color="#333333"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {count}
      </Text>

      {/* Floating info text when hovered */}
      {hovered && (
        <Text
          position={[0, 3, 0]}
          fontSize={0.25}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          backgroundColor="#000000"
          backgroundOpacity={0.8}
          backgroundRadius={0.2}
          backgroundPadding={0.1}
        >
          {`${count} ${label.toLowerCase()} tasks`}
        </Text>
      )}
    </group>
  );
};

const ParticleSystem: React.FC<{ count: number }> = ({ count }) => {
  const points = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const particleCount = Math.min(count * 5, 100); // Limit particles for performance
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = Math.random() * 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#4F46E5" opacity={0.6} transparent />
    </points>
  );
};

const Scene3D: React.FC<{ taskCounts: TaskProgress3DProps["taskCounts"] }> = ({
  taskCounts,
}) => {
  const { isDark } = useTheme();

  const maxCount = Math.max(
    taskCounts.todo,
    taskCounts.inprogress,
    taskCounts.done,
    1,
  );

  const barData = [
    {
      position: [-2, 0, 0] as [number, number, number],
      height: taskCounts.todo,
      color: "#3B82F6", // Blue for todo
      label: "To Do",
      count: taskCounts.todo,
    },
    {
      position: [0, 0, 0] as [number, number, number],
      height: taskCounts.inprogress,
      color: "#F59E0B", // Orange for in progress
      label: "In Progress",
      count: taskCounts.inprogress,
    },
    {
      position: [2, 0, 0] as [number, number, number],
      height: taskCounts.done,
      color: "#10B981", // Green for done
      label: "Done",
      count: taskCounts.done,
    },
  ];

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.3} color="#4F46E5" />

      {/* Environment */}
      <Environment preset="city" />

      {/* Ground plane */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={isDark ? "#1F2937" : "#F3F4F6"} />
      </mesh>

      {/* Progress bars */}
      {barData.map((bar, index) => (
        <AnimatedBar
          key={index}
          position={bar.position}
          height={bar.height}
          color={bar.color}
          label={bar.label}
          count={bar.count}
          maxHeight={maxCount}
        />
      ))}

      {/* Particle system for completed tasks */}
      <ParticleSystem count={taskCounts.done} />

      {/* Contact shadows for better ground contact */}
      <ContactShadows
        position={[0, -1.99, 0]}
        opacity={0.3}
        scale={8}
        blur={2}
        far={2}
      />

      {/* Camera controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={15}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </>
  );
};

export const TaskProgress3D: React.FC<TaskProgress3DProps> = ({
  taskCounts,
  className = "",
}) => {
  const { isDark } = useTheme();

  return (
    <div className={`w-full h-64 lg:h-80 ${className}`}>
      <div
        className={`w-full h-full rounded-lg overflow-hidden ${
          isDark ? "bg-dark-card" : "bg-white"
        } shadow-lg border ${
          isDark ? "border-dark-border" : "border-brand-gray-200"
        }`}
      >
        <div
          className={`p-4 border-b ${
            isDark ? "border-dark-border" : "border-brand-gray-200"
          }`}
        >
          <h3
            className={`text-lg font-semibold ${
              isDark ? "text-dark-text" : "text-brand-dark"
            }`}
          >
            Task Progress Overview
          </h3>
          <p
            className={`text-sm ${
              isDark ? "text-dark-text-secondary" : "text-brand-dark/60"
            }`}
          >
            Interactive 3D visualization of your task progress
          </p>
        </div>

        <div className="w-full h-full p-2">
          <Canvas
            shadows
            camera={{ position: [5, 5, 5], fov: 50 }}
            style={{ width: "100%", height: "100%" }}
          >
            <Scene3D taskCounts={taskCounts} />
          </Canvas>
        </div>

        {/* Legend */}
        <div
          className={`absolute bottom-4 left-4 right-4 flex justify-center space-x-4 text-xs ${
            isDark ? "text-dark-text-secondary" : "text-brand-dark/60"
          }`}
        >
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>To Do</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span>In Progress</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Done</span>
          </div>
        </div>
      </div>

      {/* Controls hint */}
      <div
        className={`mt-2 text-center text-xs ${
          isDark ? "text-dark-text-secondary" : "text-brand-dark/60"
        }`}
      >
        Click and drag to rotate • Scroll to zoom • Click bars for details
      </div>
    </div>
  );
};
