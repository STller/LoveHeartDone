import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import styled from "styled-components";
import Track from "./components/Track";
import './style.css'
import Zoom from "./utils/zoom";

const GalaxyContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #000;
`;
const CornfieldChaseContainer = styled.div`
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: linear-gradient(15deg, rgb(82, 81, 88) 0%, rgb(255, 247, 248) 100%);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif;
`
export default function CornfieldChase() {
    const [ready, setReady] = useState(false)
  return (
    <CornfieldChaseContainer>
        {
            !ready && (
                <div className={`fullscreen bg ${ready ? 'ready' : 'notready'} ${ready && 'clicked'}`}>
                    <div className="stack">
                        <button onClick={() => setReady(true)}>▶️</button>
                    </div>
                </div>
            )
        }
        {
            ready && (
                <Canvas shadows dpr={[1, 2]} camera={{ position: [-1, 1.5, 2], fov: 25 }}>
                    <spotLight position={[-4, 4, -4]} angle={0.06} penumbra={1} castShadow shadow-mapSize={[2048, 2048]} />
                    <Suspense fallback={null}>
                        <Track position-z={0} url={'/CornfieldChase.mp3'} />
                        <Zoom url="/CornfieldChase.mp3" />
                    </Suspense>
                    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.025, 0]}>
                        <planeGeometry />
                        <shadowMaterial transparent opacity={0.15} />
                    </mesh>
                </Canvas>
            )
        }
    </CornfieldChaseContainer>
  )
}
