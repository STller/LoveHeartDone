import { useEffect, useRef, useState } from "react";
import { createNoise4D } from "simplex-noise";
import * as THREE from "three";
import { Group, Mesh, ObjectLoader, Vector3 } from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler";
import { gsap } from "gsap";
import { Canvas, GroupProps, useFrame, useLoader } from "@react-three/fiber";
import styled from "styled-components";
import { Environment, OrbitControls } from "@react-three/drei";

const JumpHeartContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

export type HeartType = {
  scale?: number;
};
/**
 * 导入模型
 * @returns
 */
function Heart(props: HeartType) {
  const { scale = 0.8 } = props;
  const scaleRatio = 1.5;
  const scaleRef = useRef({ scale: scale });
  const meshRef = useRef<Mesh>(null!);
  const groupRef = useRef<Group>(null!);
  const g = useLoader(
    OBJLoader,
    "https://assets.codepen.io/127738/heart_2.obj"
  );
  const m = g.children[0] as Mesh;

  useFrame((state, delta) => {
    // groupRef.current.rotateY(delta * 1);
    groupRef.current.scale.set(
      scaleRef.current.scale!,
      scaleRef.current.scale!,
      scaleRef.current.scale!
    );
  });

  gsap
    .timeline({
      repeat: -1,
      repeatDelay: 0.1,
    })
    .to(scaleRef.current, {
      scale: scaleRef.current.scale * scaleRatio,
      duration: 0.7,
      ease: "power2.in",
    })
    .to(scaleRef.current, {
      scale: scale,
      duration: 0.7,
      ease: "power3.out",
    });

  return (
    <group ref={groupRef}>
      <mesh
        scale={0.04}
        ref={meshRef}
        geometry={m.geometry}
        rotation={[-Math.PI * 0.5, 0, 0]}
        position={[0, -0.4, 0]}
      >
        <meshBasicMaterial color={0xff0000} />
      </mesh>
      <Environment background preset="sunset" />
    </group>
  );
}

/**
 *
 * @returns
 */
function JumpHeart() {
  return (
    <JumpHeartContainer>
      <Canvas camera={{ fov: 120, position: [0, 0, 1], near: 0.1, far: 1000 }}>
        <Heart />
        <OrbitControls />
      </Canvas>
    </JumpHeartContainer>
  );
}

export default JumpHeart;
