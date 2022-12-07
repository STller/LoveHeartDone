import { useFrame } from "@react-three/fiber";
import { suspend } from "suspend-react";
import createAudio from "./createAudio";

export default function Zoom ({ url }: { url: string }) {
    const { avg } = suspend(() => createAudio(url), [url])
    return useFrame((state) => {
        (state.camera as any).fov = 25 - avg / 15
        state.camera.updateProjectionMatrix()
    })
}