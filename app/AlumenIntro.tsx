'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Float, Text3D, Environment } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';

function AlumenText() {
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!group.current) return;

    // Start far away and tiny
    group.current.position.z = -12;
    group.current.rotation.x = -1.2;
    group.current.rotation.y = 0.8;
    group.current.scale.set(0.05, 0.05, 0.05);

    const timeline = gsap.timeline({
      delay: 0.25,
    });

    // ALUMEN shoots toward the viewer
    timeline.to(group.current.position, {
      z: 0,
      duration: 1.25,
      ease: 'power4.out',
    });

    // Grow with an overshoot
    timeline.to(
      group.current.scale,
      {
        x: 1.15,
        y: 1.15,
        z: 1.15,
        duration: 1.15,
        ease: 'back.out(2.2)',
      },
      0.25
    );

    // Rotate into place
    timeline.to(
      group.current.rotation,
      {
        x: 0,
        y: 0,
        duration: 1.3,
        ease: 'power3.out',
      },
      0.15
    );

    // Small final bounce
    timeline.to(group.current.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.35,
      ease: 'bounce.out',
    });

    return () => {
      timeline.kill();
    };
  }, []);

  useFrame((state) => {
    if (!group.current) return;

    // Follow the mouse after entering
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * 0.12,
      0.035
    );

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.06,
      0.035
    );
  });

  return (
    <group ref={group}>
      <Float speed={1.7} rotationIntensity={0.08} floatIntensity={0.25}>
        <Center>
          <Text3D
            font="/fonts/helvetiker_bold.typeface.json"
            size={1.15}
            height={0.32}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.045}
            bevelSize={0.03}
            bevelSegments={5}
          >
            ALUMEN
            <meshStandardMaterial
              color="#f5f5f0"
              metalness={0.45}
              roughness={0.18}
            />
          </Text3D>
        </Center>
      </Float>
    </group>
  );
}

function GraduationCap() {
  const cap = useRef<THREE.Group>(null);
  const tassel = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!cap.current) return;

    // Start very close to camera and off-screen
    cap.current.position.set(-8, 5, 6);
    cap.current.rotation.set(-1.5, -2, 1.2);
    cap.current.scale.set(2.4, 2.4, 2.4);

    const tl = gsap.timeline({ delay: 0.45 });

    // Fly dramatically across camera
    tl.to(cap.current.position, {
      x: -2,
      y: 0.5,
      z: 1.5,
      duration: 0.65,
      ease: 'power3.inOut',
    });

    // Spin while flying
    tl.to(
      cap.current.rotation,
      {
        x: Math.PI * 1.5,
        y: Math.PI * 2,
        z: Math.PI * 1.2,
        duration: 0.9,
        ease: 'power2.out',
      },
      0
    );

    // Shrink into its final position
    tl.to(
      cap.current.scale,
      {
        x: 0.9,
        y: 0.9,
        z: 0.9,
        duration: 0.8,
        ease: 'back.out(2)',
      },
      0.2
    );

    // Settle beside ALUMEN
    tl.to(
      cap.current.position,
      {
        x: -3.7,
        y: 2,
        z: 0.3,
        duration: 0.65,
        ease: 'back.out(1.8)',
      },
      0.6
    );

    tl.to(
      cap.current.rotation,
      {
        x: -0.15,
        y: 0.45,
        z: -0.2,
        duration: 0.7,
        ease: 'power3.out',
      },
      0.6
    );

    return () => {
      tl.kill();
    };
  }, []);

  // Continuous tassel movement
  useFrame((state) => {
    if (!tassel.current) return;

    tassel.current.rotation.z = Math.sin(state.clock.elapsedTime * 4) * 0.16;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.45}>
      <group ref={cap}>
        {/* CAP BOARD */}
        <mesh rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[1.55, 0.09, 1.55]} />
          <meshPhysicalMaterial
            color="#101522"
            metalness={0.35}
            roughness={0.18}
            clearcoat={1}
            clearcoatRoughness={0.12}
          />
        </mesh>

        {/* GOLD TRIM */}
        <mesh position={[0, -0.075, 0]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[1.6, 0.035, 1.6]} />
          <meshStandardMaterial
            color="#d6a84b"
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>

        {/* HEAD SECTION */}
        <mesh position={[0, -0.27, 0]}>
          <cylinderGeometry args={[0.42, 0.5, 0.42, 32]} />
          <meshPhysicalMaterial
            color="#0b0f19"
            roughness={0.25}
            clearcoat={0.8}
          />
        </mesh>

        {/* GOLD BUTTON */}
        <mesh position={[0, 0.105, 0]}>
          <sphereGeometry args={[0.085, 32, 32]} />
          <meshStandardMaterial color="#f2c15b" metalness={1} roughness={0.1} />
        </mesh>

        {/* ANIMATED TASSEL */}
        <group ref={tassel} position={[0.45, 0.04, 0.42]}>
          <mesh position={[0.18, -0.43, 0]} rotation={[0, 0, -0.35]}>
            <cylinderGeometry args={[0.018, 0.018, 0.9, 12]} />
            <meshStandardMaterial
              color="#e8b84f"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>

          <mesh position={[0.33, -0.88, 0]}>
            <coneGeometry args={[0.11, 0.38, 20]} />
            <meshStandardMaterial
              color="#e8b84f"
              metalness={0.7}
              roughness={0.25}
            />
          </mesh>
        </group>

        <pointLight
          position={[0, -0.7, 0]}
          intensity={8}
          distance={3}
          color="#e0ad45"
        />
      </group>
    </Float>
  );
}

function FloatingObjects() {
  const objects = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!objects.current) return;

    // Objects begin hidden near the logo
    objects.current.scale.set(0.01, 0.01, 0.01);

    gsap.to(objects.current.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 1.4,
      delay: 0.8,
      ease: 'elastic.out(1, 0.55)',
    });
  }, []);

  useFrame((state) => {
    if (!objects.current) return;

    objects.current.rotation.y = THREE.MathUtils.lerp(
      objects.current.rotation.y,
      state.pointer.x * 0.08,
      0.025
    );

    objects.current.rotation.x = THREE.MathUtils.lerp(
      objects.current.rotation.x,
      -state.pointer.y * 0.05,
      0.025
    );
  });

  return (
    <group ref={objects}>
      {/* GRADUATION CAP */}

      {/* BOOKS */}
      <Float speed={1.7} rotationIntensity={0.7} floatIntensity={0.8}>
        <group position={[3.8, 2, -0.4]} rotation={[0.2, -0.4, 0.18]}>
          <mesh>
            <boxGeometry args={[1.25, 0.25, 0.85]} />
            <meshStandardMaterial color="#ff6b8a" />
          </mesh>

          <mesh position={[0.1, 0.32, 0]} rotation={[0, 0, -0.08]}>
            <boxGeometry args={[1.2, 0.25, 0.82]} />
            <meshStandardMaterial color="#ffd166" />
          </mesh>

          <mesh position={[-0.05, 0.64, 0]} rotation={[0, 0, 0.06]}>
            <boxGeometry args={[1.15, 0.25, 0.8]} />
            <meshStandardMaterial color="#62d6a7" />
          </mesh>
        </group>
      </Float>

      {/* CHAT BUBBLE */}
      <Float speed={2.2} rotationIntensity={0.6} floatIntensity={1.2}>
        <group position={[-3.6, -2, -0.2]}>
          <mesh>
            <boxGeometry args={[1.35, 0.9, 0.25]} />
            <meshStandardMaterial
              color="#9b7cff"
              metalness={0.2}
              roughness={0.25}
            />
          </mesh>

          <mesh position={[-0.38, -0.55, 0]}>
            <coneGeometry args={[0.25, 0.5, 3]} />
            <meshStandardMaterial color="#9b7cff" />
          </mesh>

          {[-0.35, 0, 0.35].map((x, i) => (
            <mesh key={i} position={[x, 0, 0.16]}>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
          ))}
        </group>
      </Float>

      {/* CAREER BRIEFCASE */}
      <Float speed={1.6} rotationIntensity={0.7} floatIntensity={0.9}>
        <group position={[3.6, -2, -0.5]} rotation={[0.1, 0.35, -0.15]}>
          <mesh>
            <boxGeometry args={[1.35, 0.9, 0.38]} />
            <meshStandardMaterial
              color="#ff985c"
              metalness={0.3}
              roughness={0.25}
            />
          </mesh>

          <mesh position={[0, 0.58, 0]}>
            <torusGeometry args={[0.32, 0.07, 12, 30, Math.PI]} />
            <meshStandardMaterial color="#ffd1b8" />
          </mesh>

          <mesh position={[0, 0, 0.22]}>
            <boxGeometry args={[0.18, 0.2, 0.08]} />
            <meshStandardMaterial color="#ffe0a3" />
          </mesh>
        </group>
      </Float>

      {/* SMALL ORBITING SPHERES */}
      <Float speed={3} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[-2, 3, -2]}>
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshStandardMaterial
            color="#ffdd67"
            emissive="#ffb800"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[2.2, -3, -1]}>
          <sphereGeometry args={[0.2, 24, 24]} />
          <meshStandardMaterial
            color="#6fe7c8"
            emissive="#2ecfa8"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function AlumenIntro({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!introRef.current) return;

      gsap.to(introRef.current, {
        scale: 1.4,
        opacity: 0,
        filter: 'blur(20px)',
        duration: 0.9,
        ease: 'power4.inOut',
        onComplete,
      });
    }, 3800);

    return () => clearTimeout(timer);
  }, [onComplete]);
  return (
    <div
      ref={introRef}
      className="fixed inset-0 z-50 h-screen w-full overflow-hidden bg-[#050505]"
    >
      {/* LIVE CAMPUS BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/alumen-campus.webp"
          alt="Özyeğin University Campus"
          className="h-full w-full object-cover"
        />
      </div>
      <Canvas
        className="relative z-10"
        gl={{ alpha: true }}
        camera={{
          position: [0, 0, 8],
          fov: 45,
        }}
      >
        <ambientLight intensity={1.3} />

        <directionalLight position={[5, 5, 5]} intensity={4} />

        <pointLight position={[-5, -2, 4]} intensity={20} color="#4776ff" />

        <AlumenText />

        <FloatingObjects />

        <Environment preset="city" />
      </Canvas>
      {/* <AlumenText /> */}
      {/* <FloatingObjects /> */}

      <div className="pointer-events-none absolute bottom-12 left-0 w-full text-center">
        <p className="text-xs uppercase tracking-[0.45em] text-white/50">
          Experience passed forward
        </p>
      </div>
    </div>
  );
}
