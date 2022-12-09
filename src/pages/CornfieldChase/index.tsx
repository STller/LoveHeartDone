import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useState } from "react";
import styled from "styled-components";
import { suspend } from "suspend-react";
import Track from "./components/Track";
import "./style.css";
import createAudio from "./utils/createAudio";
// import Zoom from "./utils/zoom";

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
  background: linear-gradient(
    15deg,
    rgb(82, 81, 88) 0%,
    rgb(255, 247, 248) 100%
  );
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir,
    helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif;
`;
export default function CornfieldChase() {
  const [ready, setReady] = useState(false);
  return (
    <CornfieldChaseContainer>
      {!ready && (
        <div
          style={{ zIndex: 1 }}
          className={`fullscreen ${ready ? "ready" : "notready"} ${
            ready && "clicked"
          }`}
        >
          <div className="stack">
            <button onClick={() => setReady(true)}>▶️</button>
          </div>
        </div>
      )}
      {
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [-1, 1.5, 2], fov: 25 }}
        >
          <spotLight
            position={[-4, 4, -4]}
            angle={0.06}
            penumbra={1}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <Suspense fallback={null}>
            {<Track ready={ready} position-z={0} url={"/CornfieldChase.mp3"} />}
            <Zoom url="/CornfieldChase.mp3" />
          </Suspense>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -0.025, 0]}
          >
            <planeGeometry />
            <shadowMaterial transparent opacity={0.15} />
          </mesh>
        </Canvas>
      }
    </CornfieldChaseContainer>
  );
}

function Zoom({ url }: { url: string }) {
  // This will *not* re-create a new audio source, suspense is always cached,
  // so this will just access (or create and then cache) the source according to the url
  const { avg } = suspend(() => createAudio(url), [url]);
  return useFrame((state) => {
    // Set the cameras field of view according to the frequency average
    (state.camera as any).fov = 25 - avg / 15;
    state.camera.updateProjectionMatrix();
  });
}
