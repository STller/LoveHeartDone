import { useEffect, useRef, useState } from "react";
import { createNoise4D } from "simplex-noise";
import * as THREE from "three";
import { Group, Mesh, ObjectLoader, Vector3 } from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler";
import { gsap } from "gsap";
import { Canvas, useLoader } from "@react-three/fiber";
import styled from "styled-components";
import { Environment, OrbitControls } from "@react-three/drei";

const JumpHeartContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

function Heart() {
  const g = useLoader(
    OBJLoader,
    "https://assets.codepen.io/127738/heart_2.obj"
  );
  const m = g.children[0] as Mesh;
  return (
    <group position={[0, 0, 0]} scale={0.04} rotation={[-Math.PI * 0.5, 0, 0]}>
      <primitive object={m} />
      <Environment background preset="sunset" />
    </group>
  );
}

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
