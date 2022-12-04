import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import styled from "styled-components";

const GalaxyContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #000;
`;
export default function CornfieldChase() {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [-1, 1.5, 2], fov: 25 }}>
        <spotLight position={[-4, 4, -4]} angle={0.06} penumbra={1} castShadow shadow-mapSize={[2048, 2048]} />
        <Suspense fallback={null}>

        </Suspense>
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.025, 0]}>
            <planeGeometry />
            <shadowMaterial transparent opacity={0.15} />
        </mesh>
    </Canvas>
  )
}
