"use client";
import { OrbitControls, Sky } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationMixer } from "three";
import SendQuestionDialog from "./send-question-new";
import SendAnsQuesrion from "./send-ansquestion";
import { RecoilRoot, useRecoilState } from "recoil";
import FormDialog from "./setuser";
import { ApiAutoUpdate } from "../func/api";
import {
  parentDiscussionIdAtom,
  parentDiscussionRandomAtom,
  sendAnsQuestionDialogAtom,
} from "../recoil/atom";
import { Pin } from "./pin";

function Scene() {
  const [hovered, setHover] = useState(false);
  // https://sketchfab.com/3d-models/map-pin-667ec99860674e57892823a19a1d8f15
  const gltf = useLoader(GLTFLoader, "/map_pin/scene.gltf");
  gltf.scene.scale.set(0.5, 0.5, 0.5);
  gltf.scene.position.set(0.23, 0.23, 0.23);

  gltf.scene.lookAt(0, 1, 0);
  const [discussionId, setDiscussionId] = useRecoilState(
    parentDiscussionIdAtom
  );
  const [openSendQuestionDialog, setOpenopenSendQuestionDialog] =
    useRecoilState(sendAnsQuestionDialogAtom);
  // gltf.scene.position.set();
  return (
    <primitive
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={() => {
        setDiscussionId(7);
        setOpenopenSendQuestionDialog(true);
      }}
      color={hovered ? "hotpink" : "orange"}
      object={gltf.scene}
    />
  );
}

function TheModel() {
  let mixer: any = null;
  const { scene, animations } = useLoader(GLTFLoader, "/scene.gltf");
  scene.position.set(0, 0, 0);
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
export interface typeRandomPosition {
  gltfRotation: number[];
  nullRotation: number[];
  null2position: number[];
}
export const randomPosition: typeRandomPosition[] = [
  {
    gltfRotation: [-Math.PI / 7, 0, -Math.PI / 11],
    nullRotation: [Math.PI, -Math.PI / 4, -Math.PI / 3.2],
    null2position: [0, 0.36, 0],
  },
  {
    gltfRotation: [Math.PI / 7, 0, 0],
    nullRotation: [Math.PI, -Math.PI / 2.7, -Math.PI / 3.2],
    null2position: [0, 0.34, 0],
  },
  {
    gltfRotation: [Math.PI / 5, 0, Math.PI / 5],
    nullRotation: [Math.PI, -Math.PI / 2.5, -Math.PI / 5.2],
    null2position: [0, 0.34, 0],
  },
  {
    gltfRotation: [Math.PI / 7, 0, 0],
    nullRotation: [Math.PI, -Math.PI / 3, -Math.PI / 4],
    null2position: [0, 0.35, 0],
  },
  {
    gltfRotation: [-Math.PI / 7, 0, 0],
    nullRotation: [Math.PI, -Math.PI / 4.5, -Math.PI / 4],
    null2position: [0, 0.34, 0],
  },
];
export default function App() {
  const [parentDiscussionItems, setParentDiscussionItems] = useRecoilState(
    parentDiscussionRandomAtom
  );

  return (
    <>
      <ApiAutoUpdate />
      <FormDialog />

      <Canvas
        style={{ width: "100vw", height: "100vh" }}
        shadows
        camera={{ fov: 50, zoom: 3 }}
        flat
      >
        <ambientLight intensity={1.5} />
        <directionalLight color="" position={[0, 0, 10]} />
        <directionalLight color="#ffffff" position={[0, 0, -10]} />
        {parentDiscussionItems.slice(0, 5).map((ele, index) => {
          return (
            <Pin
              color="blue"
              key={index}
              randomPositionTmp={randomPosition[Number(index)]}
              item={ele}
            />
          );
        })}
        {/* <Pin key={"4"} randomPositionTmp={randomPosition[4]} /> */}
        <TheModel />
        <Background />
        <OrbitControls enablePan={false}></OrbitControls>
      </Canvas>
      <SendQuestionDialog />
      <SendAnsQuesrion />
    </>
  );
}
