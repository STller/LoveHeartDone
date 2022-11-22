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

const JumpHeartContainer = styled.div`
    width: 100vw;
    height: 100vh;
`

function Heart() {
    const g = useLoader(OBJLoader, 'https://assets.codepen.io/127738/heart_2.obj')
    const m = g.children[0] as Mesh
    return <group position={[0,0,0]}>
        <primitive object={m} />
    </group>
}

function JumpHeart() {

  return <JumpHeartContainer>
    <Canvas>
        <Heart />
    </Canvas>
  </JumpHeartContainer>
}

export default JumpHeart;
