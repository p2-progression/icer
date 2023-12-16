"use client";
import { OrbitControls, Sky } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useState } from "react";
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
import { Pin, randomPosition } from "./pin";

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

export default function App() {
  const [parentDiscussionItems, setParentDiscussionItems] = useRecoilState(
    parentDiscussionRandomAtom
  );
  return (
    <>
      <ApiAutoUpdate />
      <FormDialog />
      <SendQuestionDialog />
      <SendAnsQuesrion />
      <Canvas
        style={{ width: "100vw", height: "100vh" }}
        shadows
        camera={{ fov: 50, zoom: 3 }}
        flat
      >
        <ambientLight intensity={1.5} />
        <directionalLight color="" position={[0, 0, 10]} />
        <directionalLight color="#ffffff" position={[0, 0, -10]} />
        {parentDiscussionItems.map((ele, index) => {
          return (
            <Pin
              color="blue"
              key={index}
              randomPositionTmp={randomPosition[index]}
              item={ele}
            />
          );
        })}
        {/* <Pin key={"4"} randomPositionTmp={randomPosition[4]} /> */}
        <TheModel />
        <Background />
        <OrbitControls enablePan={false}></OrbitControls>
      </Canvas>
    </>
  );
}
