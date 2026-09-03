"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useWebglHealth } from "@/lib/use-webgl-health";

/**
 * El Togary's signature piece: the badge.
 *
 * Their own emblem is a circular badge on every plate holder — which makes
 * a coin the honest shape for what this account actually is: two
 * businesses sharing one wall. One face carries the showroom, spoken in
 * English with a single phone line; the other carries the finance desk,
 * spoken in Arabic with fourteen. Flipping it is the whole interaction —
 * there is no third state, because there isn't one in their account either.
 */

function Face({ src, front, radius }: { src: string; front: boolean; radius: number }) {
  const tex = useTexture(src);
  return (
    <group rotation={[0, front ? 0 : Math.PI, 0]}>
      <mesh position={[0, 0, 0.041]}>
        <circleGeometry args={[radius, 64]} />
        <meshBasicMaterial map={tex} map-colorSpace={THREE.SRGBColorSpace} toneMapped={false} />
      </mesh>
      {/* A dark rim so the photo reads as set into a coin, not floating. */}
      <mesh position={[0, 0, 0.038]}>
        <ringGeometry args={[radius, radius * 1.08, 64]} />
        <meshBasicMaterial color="#141210" toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, 0.042]} rotation={[0, 0, 0]}>
        <ringGeometry args={[radius * 1.08, radius * 1.11, 64]} />
        <meshBasicMaterial color="#b9bcbe" toneMapped={false} />
      </mesh>
    </group>
  );
}

function Coin({
  showroomSrc,
  financeSrc,
  showFinance,
}: {
  showroomSrc: string;
  financeSrc: string;
  showFinance: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const angle = useRef(0);
  const target = useRef(0);
  // Derived from the real frustum at z=0 (r3f keeps this in sync with the
  // canvas's actual pixel size) rather than a guessed constant — a fixed
  // radius left the coin visibly smaller than a square container whose
  // real aspect didn't match the assumption baked into that guess.
  const viewport = useThree((s) => s.viewport);
  const radius = Math.min(viewport.width, viewport.height) * 0.46;
  const edgeRadius = radius * 1.11;

  useEffect(() => {
    target.current = showFinance ? Math.PI : 0;
  }, [showFinance]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    // The shortest way round, so a rapid double-toggle never spins twice.
    let diff = target.current - angle.current;
    diff = ((diff + Math.PI) % (Math.PI * 2)) - Math.PI;
    angle.current += diff * (1 - Math.pow(0.001, dt));
    const g = group.current;
    if (!g) return;
    g.rotation.y = angle.current;
    // A coin does not spin flat — it tips slightly as it turns.
    g.rotation.x = Math.sin(angle.current) * 0.12;
    g.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.015;
  });

  return (
    <group ref={group}>
      {/* The coin's edge. */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[edgeRadius, edgeRadius, 0.08, 64, 1, true]} />
        <meshStandardMaterial color="#8a8d90" roughness={0.35} metalness={0.5} side={THREE.DoubleSide} />
      </mesh>
      <Suspense fallback={null}>
        <Face src={showroomSrc} front radius={radius} />
        <Face src={financeSrc} front={false} radius={radius} />
      </Suspense>
    </group>
  );
}

function canRenderWebgl() {
  try {
    const c = document.createElement("canvas");
    return Boolean(
      c.getContext("webgl2") ?? c.getContext("webgl") ?? c.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

export function Badge({
  showroomSrc,
  financeSrc,
  showFinance,
  alt,
  className,
}: {
  showroomSrc: string;
  financeSrc: string;
  showFinance: boolean;
  alt: string;
  className?: string;
}) {
  const { lost, bind } = useWebglHealth();
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(canRenderWebgl());
  }, []);

  if (lost || supported !== true) {
    return (
      <div className={className}>
        <img
          src={showFinance ? financeSrc : showroomSrc}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={className} role="img" aria-label={alt}>
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 0, 5.4], fov: 34 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => bind(gl.domElement)}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[2, 3, 4]} intensity={0.7} />
        <Coin showroomSrc={showroomSrc} financeSrc={financeSrc} showFinance={showFinance} />
      </Canvas>
    </div>
  );
}
