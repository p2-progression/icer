"use client";

import { Box, OrbitControls, Stage, Sky, Stars } from "@react-three/drei";
import { Canvas, ThreeElements, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import React from "react";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Grid,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationMixer } from "three";
import FullScreenDialog from "./addparents";

function Scene() {
  const [hovered, setHover] = useState(false);
  // https://sketchfab.com/3d-models/map-pin-667ec99860674e57892823a19a1d8f15
  const gltf = useLoader(GLTFLoader, "/map_pin/scene.gltf");
  gltf.scene.scale.set(0.5, 0.5, 0.5);
  gltf.scene.position.set(0.23, 0.23, 0.23);

  gltf.scene.lookAt(0, 1, 0);

  // gltf.scene.position.set();
  return (
    <primitive
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      color={hovered ? "hotpink" : "orange"}
      object={gltf.scene}
    />
  );
}
function TheModel() {
  let mixer: any = null;
  const { scene, animations } = useLoader(GLTFLoader, "/scene.gltf");
  // console.log(scene);
  mixer = new AnimationMixer(scene);
  void mixer.clipAction(animations[0]).play();
  useFrame((state, delta) => {
    mixer.update(delta);
    // console.log(ca);
  });
  return <primitive object={scene} position={[0, 0, 0]} />;
}

function Background() {
  return (
    <>
      <Sky />
      {/* <color args={["#010"]} attach={"background"} /> */}
      {/* <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      /> */}
    </>
  );
}

export default function App() {
  return (
    <main>
      <FullScreenDialog />
      <Canvas
        style={{ width: "100vw", height: "100vh" }}
        shadows
        camera={{ fov: 50, zoom: 3 }}
        flat
      >
        <ambientLight intensity={1.5} />
        {/* <directionalLight color="" position={[0, 0, 10]} /> */}
        <directionalLight color="#ffffff" position={[0, 0, -10]} />
        <Scene />

        <TheModel />

        <Background />

        <OrbitControls></OrbitControls>
      </Canvas>
    </main>
  );
}
