import { createNoise4D } from "simplex-noise";
import { Vector3 } from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler";

const pos = new Vector3()
const noise4d = createNoise4D()
class Grass {
    pos = new Vector3();
    scale = 1;
    one = new Vector3();
    two = new Vector3();
    sampler: null | MeshSurfaceSampler = null;
    beat = 1;
    constructor(sampler: MeshSurfaceSampler | null, beat: number) {
        this.beat = beat
        this.sampler = sampler
        this.sampler!.build().sample(pos)
        this.pos = pos.clone()
        this.scale = Math.random() * 0.001 + 0.001
        this.one = new Vector3(0,0,0)
        this.two =  new Vector3(0,0,0)
    }
    update(a:number) {
        const noise = noise4d(
            this.pos.x * 1.5,
            this.pos.y * 1.5,
            this.pos.z * 1.5,
            a * 0.0005,
            ) + 2;
            this.one = this.pos.clone().multiplyScalar(1.21 + noise * 0.15 * this.beat)
            this.two = this.one.clone().add(this.one.clone().setLength(this.scale))
    }
}

export {
    Grass,
}