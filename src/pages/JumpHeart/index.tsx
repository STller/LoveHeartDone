import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import styled from "styled-components";
import { Environment, OrbitControls, Sampler } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler";
import {
  Group,
  Mesh,
  MeshBasicMaterial,
  LineBasicMaterial,
  Vector3,
  BufferGeometry,
  LineSegments,
  BufferAttribute,
} from "three";
import { createNoise4D, NoiseFunction4D } from "simplex-noise";
import { gsap } from "gsap";
import Heart from "../Heart";

const JumpHeartContainer = styled.div`
  width: 100%;
  height: 100%;
`;

class Grass {
  pos: any;
  scale: number;
  one: any;
  two: any;
  beat: { a: number };
  sampler: any;
  noise4D: any;
  constructor(sampler: any, pos: Vector3, beat: { a: number }, noise4D: any) {
    this.pos = pos.clone();
    this.scale = Math.random() * 0.001 + 0.001;
    this.one = null;
    this.two = null;
    this.beat = { a: 0 };
    this.sampler = sampler;
    this.noise4D = noise4D;
  }

  update(a: number) {
    const noise =
      this.noise4D(
        this.pos.x * 1.5,
        this.pos.y * 1.5,
        this.pos.z * 1.5,
        a * 0.0005
      ) + 2;
    this.one = this.pos
      .clone()
      .multiplyScalar(1.21 + noise * 0.15 * this.beat.a); // 第一个点的位置
    this.two = this.one.clone().add(this.one.clone().setLength(this.scale)); // 第二个点的位置
  }
}

/**
 * 🫀心脏跳动
 * @returns
 */
export default function JumpHeart() {
  const noise4d = createNoise4D();
  const obj = useLoader(
    OBJLoader,
    "https://assets.codepen.io/127738/heart_2.obj"
  ); // 获取模型obj
  console.log(obj);
  const pos = new Vector3();

  (obj.children[0] as Mesh).material = new MeshBasicMaterial({
    color: 0xff0000,
  });

  const Scene = ({
    itemObj,
    noise4d,
  }: {
    itemObj: Group;
    noise4d: NoiseFunction4D;
  }) => {
    const geometry = new BufferGeometry();
    const material = new LineBasicMaterial({
      color: 0xf0f0f0,
    });
    const lines = new LineSegments(geometry, material);
    itemObj.add(lines);

    let grassAmount = 200; // Grass数量
    let positions: any[] = []; // 位置
    const spkies: Grass[] = []; // Grass的实例存放
    const beat = { a: 0 };
    let sampler: MeshSurfaceSampler | null = null; // 采样器
    let originHeart: (number | undefined)[] = [];
    function init() {
      positions = [];
      for (let i = 0; i < grassAmount; i++) {
        const g = new Grass(sampler, pos, beat, noise4d);
        spkies.push(g);
      }
    }

    init();
    originHeart = Array.from(
      (itemObj.children[0] as Mesh).geometry.attributes.position.array
    );
    sampler = new MeshSurfaceSampler(itemObj.children[0] as Mesh).build(); // 为模型添加采样器

    gsap
      .timeline({
        repeat: -1,
        repeatDelay: 0.1,
      })
      .to(beat, {
        a: 1.2,
        duration: 1,
        ease: "power2.in",
      })
      .to(beat, {
        a: 0.0,
        duration: 1,
        ease: "power3.out",
      });

    function render(timestamp: number) {
      positions = [];
      spkies.forEach((g) => {
        g.update(timestamp);
        positions.push(g.one.x, g.one.y, g.one.z);
        positions.push(g.two.x, g.two.y, g.two.z);
      });
    //   geometry.setAttribute(
    //     "position",
    //     new BufferAttribute(new Float32Array(positions), 3)
    //   );

      const vs = (itemObj.children[0] as Mesh).geometry.attributes.position
        .array as any;

      for (let i = 0; i < vs.length; i += 3) {
        const v = new Vector3(
          originHeart[i],
          originHeart[i + 1],
          originHeart[i + 2]
        );
        const noise =
          noise4d(
            originHeart[i]! * 1.5,
            originHeart[i + 1]! * 1.5,
            originHeart[i + 2]! * 1.5,
            timestamp * 0.0005
          ) + 1;
        v.multiplyScalar(1 + noise * 0.02 * beat.a);
        vs[i] = v.x;
        vs[i + 1] = v.y;
        vs[i + 2] = v.z;
      }

      (itemObj.children[0] as Mesh).geometry.attributes.position.needsUpdate =
        true;

      window.requestAnimationFrame(render);
    }

    window.requestAnimationFrame(render);

    useFrame((state, delta) => {});
    return (
      <primitive
        object={itemObj}
        scale={0.04}
        position={[0, -0.4, 0]}
        rotation={[-Math.PI * 0.5, 0, 0]}
      />
    );
  };
  return (
    <JumpHeartContainer>
      <Canvas
        camera={{ fov: 120, position: [0, 0.4, 1], near: 0.1, far: 1000 }}
      >
        <Scene itemObj={obj} noise4d={noise4d} />
        <meshStandardMaterial color={"hotpink"} />
        <OrbitControls maxDistance={3} minDistance={0.7} />
        {/* <Environment preset="sunset" background /> */}
      </Canvas>
    </JumpHeartContainer>
  );
}
