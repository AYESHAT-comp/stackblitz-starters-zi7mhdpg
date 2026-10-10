'use client';

import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function University() {
  const stone = '#ddd5c5';
  const darkStone = '#aaa18f';
  const roof = '#151922';
  const gold = '#d8ad58';
  const windowGlow = '#ffd98a';

  return (
    <group position={[0, -1.8, 0]} scale={0.85}>
      {/* ===== MAIN BUILDING ===== */}
      <mesh position={[0, 1.35, 0]}>
        <boxGeometry args={[6.6, 2.7, 1.8]} />
        <meshStandardMaterial color={stone} roughness={0.7} />
      </mesh>

      {/* LEFT WING */}
      <mesh position={[-4.2, 1.05, 0.2]}>
        <boxGeometry args={[2.2, 2.1, 1.5]} />
        <meshStandardMaterial color={darkStone} roughness={0.75} />
      </mesh>

      {/* RIGHT WING */}
      <mesh position={[4.2, 1.05, 0.2]}>
        <boxGeometry args={[2.2, 2.1, 1.5]} />
        <meshStandardMaterial color={darkStone} roughness={0.75} />
      </mesh>

      {/* ===== ROOF ===== */}
      <mesh position={[0, 2.9, 0]}>
        <boxGeometry args={[7, 0.22, 2.1]} />
        <meshStandardMaterial color={roof} metalness={0.25} roughness={0.35} />
      </mesh>

      {/* GOLD ROOF LINE */}
      <mesh position={[0, 2.78, 1.08]}>
        <boxGeometry args={[7, 0.055, 0.055]} />
        <meshStandardMaterial color={gold} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* ===== TRIANGLE FRONT ===== */}
      <mesh position={[0, 3.25, 0.72]}>
        <coneGeometry args={[1.9, 1.1, 3]} />
        <meshStandardMaterial color={stone} roughness={0.65} />
      </mesh>

      {/* ===== PILLARS ===== */}
      {[-2.1, -1.4, -0.7, 0.7, 1.4, 2.1].map((x) => (
        <group key={x}>
          <mesh position={[x, 1.35, 1.12]}>
            <cylinderGeometry args={[0.16, 0.2, 2.5, 20]} />
            <meshStandardMaterial color="#eee7da" roughness={0.6} />
          </mesh>

          {/* Pillar top */}
          <mesh position={[x, 2.62, 1.12]}>
            <boxGeometry args={[0.42, 0.14, 0.42]} />
            <meshStandardMaterial color={stone} />
          </mesh>

          {/* Pillar base */}
          <mesh position={[x, 0.1, 1.12]}>
            <boxGeometry args={[0.42, 0.14, 0.42]} />
            <meshStandardMaterial color={stone} />
          </mesh>
        </group>
      ))}

      {/* ===== CENTRAL DOOR ===== */}
      <mesh position={[0, 0.72, 1.01]}>
        <boxGeometry args={[1.25, 1.65, 0.08]} />
        <meshPhysicalMaterial
          color="#080a0f"
          metalness={0.3}
          roughness={0.25}
          clearcoat={0.8}
        />
      </mesh>

      {/* Door gold frame */}
      <mesh position={[0, 0.72, 1.065]}>
        <boxGeometry args={[1.42, 1.82, 0.035]} />
        <meshStandardMaterial color={gold} metalness={0.9} roughness={0.18} />
      </mesh>

      {/* Put dark door over centre of frame */}
      <mesh position={[0, 0.72, 1.09]}>
        <boxGeometry args={[1.18, 1.58, 0.04]} />
        <meshStandardMaterial color="#080a0f" />
      </mesh>

      {/* ===== WINDOWS ===== */}

      {[-2.7, -1.9, 1.9, 2.7].map((x) => (
        <mesh key={`top-${x}`} position={[x, 1.85, 0.94]}>
          <boxGeometry args={[0.48, 0.72, 0.06]} />
          <meshStandardMaterial
            color={windowGlow}
            emissive={windowGlow}
            emissiveIntensity={2}
          />
        </mesh>
      ))}

      {[-4.55, -3.85, 3.85, 4.55].map((x) => (
        <mesh key={`wing-${x}`} position={[x, 1.25, 1]}>
          <boxGeometry args={[0.42, 0.65, 0.06]} />
          <meshStandardMaterial
            color={windowGlow}
            emissive={windowGlow}
            emissiveIntensity={1.5}
          />
        </mesh>
      ))}

      {/* ===== STAIRS ===== */}

      <mesh position={[0, -0.25, 1.45]}>
        <boxGeometry args={[3.4, 0.22, 0.7]} />
        <meshStandardMaterial color="#bcb4a4" />
      </mesh>

      <mesh position={[0, -0.48, 1.75]}>
        <boxGeometry args={[4, 0.22, 0.8]} />
        <meshStandardMaterial color="#a9a191" />
      </mesh>

      <mesh position={[0, -0.71, 2.05]}>
        <boxGeometry args={[4.6, 0.22, 0.9]} />
        <meshStandardMaterial color="#938b7e" />
      </mesh>

      {/* ===== UNIVERSITY SIGN ===== */}

      <mesh position={[0, 2.55, 1.16]}>
        <boxGeometry args={[2.5, 0.36, 0.08]} />
        <meshPhysicalMaterial
          color="#11141c"
          metalness={0.45}
          roughness={0.25}
        />
      </mesh>

      {/* ===== LAMPS ===== */}

      {[-3.25, 3.25].map((x) => (
        <group key={`lamp-${x}`} position={[x, -0.25, 1.7]}>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.035, 0.055, 1.2, 12]} />
            <meshStandardMaterial color="#16181e" />
          </mesh>

          <mesh position={[0, 1.1, 0]}>
            <sphereGeometry args={[0.12, 20, 20]} />
            <meshStandardMaterial
              color="#ffe0a0"
              emissive="#ffc65c"
              emissiveIntensity={4}
            />
          </mesh>

          <pointLight
            position={[0, 1.1, 0.2]}
            color="#ffca70"
            intensity={4}
            distance={3}
          />
        </group>
      ))}

      {/* ===== TREES ===== */}

      {[-5.4, 5.4].map((x) => (
        <Float
          key={`tree-${x}`}
          speed={0.6}
          floatIntensity={0.08}
          rotationIntensity={0.02}
        >
          <group position={[x, -0.15, 0.5]}>
            <mesh position={[0, 0.45, 0]}>
              <cylinderGeometry args={[0.09, 0.12, 0.9, 10]} />
              <meshStandardMaterial color="#382a20" />
            </mesh>

            <mesh position={[0, 1.25, 0]}>
              <coneGeometry args={[0.65, 1.5, 14]} />
              <meshStandardMaterial color="#18271f" roughness={0.8} />
            </mesh>
          </group>
        </Float>
      ))}

      {/* ===== ENTRANCE GLOW ===== */}

      <pointLight
        position={[0, 0.8, 2.2]}
        color="#e9b75b"
        intensity={10}
        distance={5}
      />
    </group>
  );
}
