import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { suspend } from "suspend-react";
import { InstancedMesh, Mesh, Object3D } from "three";
import createAudio from "../utils/createAudio";

interface propsType {
    url: string;
    y?: number;
    space?: number;
    width?: number;
    height?: number;
    obj?: Object3D;
    [key: string]: any;
}
export default function Track ({url, y = 2500, space = 1.8, width = 0.01, height = 0.05, obj = new Object3D(), ...props}: propsType) {
    const ref = useRef<InstancedMesh>(null!)
    const { gain, context, update, data, source } = suspend(() => createAudio(url), [url])
    useEffect(() => {
        // source.start(0)
        gain.connect(context.destination)
        return () => gain.disconnect()
    }, [gain, context])
    useFrame(() => {
        let avg = update()
        for (let i = 0; i < data.length; i++) {
            obj.position.set(i * width * space - (data.length * width * space) / 2, data[i] / y, 0)
            obj.updateMatrix();
            (ref.current as any).setMatrixAt(i, obj.matrix)
        }
        (ref.current.material as any).color.setHSL(avg / 500, 0.75, 0.75)
        ref.current.instanceMatrix.needsUpdate = true
    })
    return (
        <instancedMesh castShadow ref={ref} args={[undefined, undefined, data.length]} {...props}>
            <planeGeometry args={[width, height]} /> 
            <meshBasicMaterial toneMapped={false} />
        </instancedMesh>
    )
}