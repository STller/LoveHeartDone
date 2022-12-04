import { useEffect, useRef, useState } from "react";
import { createNoise4D } from "simplex-noise";
import * as THREE from "three";
import { Group, Mesh, Vector3 } from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler";
import { gsap } from "gsap";
// import { Grass } from "./GrassClass";

function JumpHeart() {
  const divRef = useRef(null);
  const grassAmount = 40000;
  const [heart, setHeart] = useState<Mesh | null>(null);

  /**
   * 加载OBJ文件
   * @returns
   */
  function asyncLoader() {
    const objlaoder = new OBJLoader();
    return new Promise((resolve) =>
      resolve(
        objlaoder.loadAsync("https://assets.codepen.io/127738/heart_2.obj")
      )
    );
  }

  /**
   * 初始化OBJ
   */
  async function initOBJ() {
    const h = (await asyncLoader()) as Group;
    setHeart(h.children[0] as Mesh);
  }

  /**
   * 页面初始化
   * 首先初始化获取OBJ
   */
  useEffect(() => {
    initOBJ();
  }, []);

  /**
   * 获取到OBJ后开始渲染
   */
  useEffect(() => {
    if (heart) {
      console.clear();

      /**
       * 生成舞台与相机
       */
      const scene = new THREE.Scene(); // 新建一个舞台
      const camera = new THREE.PerspectiveCamera(
        120, // 可视角度
        window.innerWidth / window.innerHeight, // 实际窗口的纵横比
        0.1,
        1000
      );
      camera.position.z = 1; // 设置相机在三维坐标中的位置 .up设置相机拍摄时，相机头顶的方向 .lookAt设置相机拍摄时指向的方向

      /**
       * 生成渲染器并设置
       */
      const renderer = new THREE.WebGLRenderer({
        antialias: true, // 是否执行抗锯齿
      });
      renderer.setClearColor(0x000000); // 设置舞台背景颜色
      renderer.setSize(window.innerWidth, window.innerHeight); // 设置舞台尺寸

      /**
       * 将舞台插入页面中
       */
      (divRef.current! as HTMLElement).appendChild(renderer.domElement);

      /**
       * 设置轨迹控制球
       */
      const controls = new TrackballControls(camera, renderer.domElement);
      controls.noPan = true; // 是否禁用平移 默认为false
      controls.maxDistance = 5; // 你能将摄像机向外移动多少
      controls.minDistance = 0.7; // 你能将摄像机向内移动多少

      // 绕X轴旋转
      // 缩放
      // 沿Y轴移动
      // 设置材质为基础材质
      // 设置材质颜色
      (heart! as Mesh).geometry.rotateX(-Math.PI * 0.5);
      (heart! as Mesh).geometry.scale(0.04, 0.04, 0.04);
      (heart! as Mesh).geometry.translate(0, -0.4, 0);
      // 设置heart的材质颜色
      (heart! as Mesh).material = new THREE.MeshBasicMaterial({
        color: 0xff3333,
      });

      // 为模型添加采样器
      const sampler = new MeshSurfaceSampler(heart as Mesh).build();
      // 生成spikes
      //   将采样器直接写在内部
      class Grass {
        pos: THREE.Vector3;
        scale: number;
        one: Vector3;
        two: Vector3;
        constructor() {
          sampler!.sample(pos); // 通过采样器随机位置采样 --（x,y,z）单次采样
          this.pos = pos.clone();
          this.scale = Math.random() * 0.001 + 0.001;
          this.one = new Vector3(0, 0, 0);
          this.two = new Vector3(0, 0, 0);
        }
        // 根据a值更新每一个点的位置
        update(a: number) {
          const noise =
            noise4D(
              this.pos.x * 1.5,
              this.pos.y * 1.5,
              this.pos.z * 1.5,
              a * 0.0005
            ) + 2;
          this.one = this.pos
            .clone()
            .multiplyScalar(1.21 + noise * 0.15 * beat.a); // 第一个点的位置
          this.two = this.one
            .clone()
            .add(this.one.clone().setLength(this.scale)); // 第二个点的位置
        }
      }
      //   控制spike跳动的值
      const beat = { a: 0 };
      let positions: any[] = [];
      const spikes: Grass[] = [];
      const pos = new THREE.Vector3();
      //   初始化spike的数量
      function init() {
        positions = [];
        // 草的数量s
        for (let i = 0; i < grassAmount; i++) {
          const g = new Grass(); // 生成Grass的实例
          spikes.push(g); // 将生成的Grass实例保存进spikes数组里
        }
      }
      //   执行初始化spike的数量
      init();

      //  新的分组
      const group = new THREE.Group();
      const geometry = new THREE.BufferGeometry(); // 保存spike
      const material = new THREE.LineBasicMaterial({
        color: 0xf0f0f0,
      });
      const lines = new THREE.LineSegments(geometry, material);

      //   分组添加lines
      group.add(lines);
      //   分组增加爱心
      group.add(heart!);
      // 舞台添加group
      scene.add(group);

      let originHeart: any[] = [];

      const noise4D = createNoise4D();

      // heart的原始位置
      originHeart = Array.from(
        (heart! as Mesh).geometry.attributes.position.array
      );
      renderer.setAnimationLoop(render); // 启动循环渲染

      //   利用gsap动画库控制beat-a值的变化
      // 生成爱心跳动的效果
      gsap
        .timeline({
          repeat: -1,
          repeatDelay: 0.1,
        })
        .to(beat, {
          a: 1.2,
          duration: 0.7,
          ease: "power2.in",
        })
        .to(beat, {
          a: 0.0,
          duration: 0.7,
          ease: "power3.out",
        });
      gsap.to(group.rotation, {
        y: Math.PI * 2,
        duration: 2,
        ease: "power3.out",
        // repeat: -1
      });

      /**
       * 渲染函数
       */
      function render(a: number) {
        // 清空positions数组
        positions = [];
        // 循环遍历spikes
        // 利用新的beat-a值传入spikes内部调用update方法
        // 更新内部的one值
        spikes.forEach((g) => {
          g.update(a);
          positions.push(g.one.x, g.one.y, g.one.z);
          positions.push(g.two.x, g.two.y, g.two.z);
        });
        // 为spikes设置属性position
        geometry.setAttribute(
          "position",
          new THREE.BufferAttribute(new Float32Array(positions), 3)
        );

        // 爱心的position属性 
        // 数组格式
        const vs = (heart! as Mesh).geometry.attributes.position
          .array as Float32Array;
        for (let i = 0; i < vs.length; i += 3) {
          const v = new THREE.Vector3(
            originHeart[i],
            originHeart[i + 1],
            originHeart[i + 2]
          );
          const noise =
            noise4D(
              originHeart[i] * 1.5,
              originHeart[i + 1] * 1.5,
              originHeart[i + 2] * 1.5,
              a * 0.0005
            ) + 1;
        // 加入noise属性会产生随机起伏的效果
          v.multiplyScalar(1 + noise * 0.15 * beat.a);
          vs[i] = v.x;
          vs[i + 1] = v.y;
          vs[i + 2] = v.z;
        }
        (heart! as Mesh).geometry.attributes.position.needsUpdate = true;

        controls.update();
        renderer.render(scene, camera);
      }
    }
  }, [heart]);

  return <div ref={divRef}></div>;
}

export default JumpHeart;
