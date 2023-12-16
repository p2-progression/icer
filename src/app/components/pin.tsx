"use client";
import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  parentDiscussionIdAtom,
  sendAnsQuestionDialogAtom,
} from "../recoil/atom";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { formatGetDiscussionItem } from "../func/api";
import { useGLTF } from "@react-three/drei";
export interface typeRandomPosition {
  gltfRotation: number[];
  nullRotation: number[];
  null2position: number[];
}
export const blueRandomPosition: typeRandomPosition[] = [
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

export const redRandomPosition: typeRandomPosition[] = [
  {
    gltfRotation: [Math.PI / 4, 0, 0],
    nullRotation: [0, -Math.PI / 3.6, -Math.PI / 3.2],
    null2position: [0, 0.37, 0],
  },
  {
    gltfRotation: [-Math.PI / 7, 0, 0],
    nullRotation: [0.2, -Math.PI / 7, -Math.PI / 3.8],
    null2position: [0, 0.38, 0],
  },
  {
    gltfRotation: [Math.PI / 4, 0, 0],
    nullRotation: [0.5, -Math.PI / 7, -Math.PI / 3.8],
    null2position: [0, 0.38, 0],
  },
  {
    gltfRotation: [Math.PI / 8, -Math.PI / 5, Math.PI / 4],
    nullRotation: [-1, -Math.PI / 4.0, -Math.PI / 2.8],
    null2position: [0, 0.4, 0],
  },
  {
    gltfRotation: [Math.PI / 8, -Math.PI / 5, Math.PI / 4],
    nullRotation: [-1, -Math.PI / 2.5, -Math.PI / 2.9],
    null2position: [0, 0.42, 0],
  },
  {
    gltfRotation: [Math.PI / 3, -Math.PI / 3, Math.PI / 4],
    nullRotation: [-0.5, -Math.PI / 3.2, -Math.PI / 2.9],
    null2position: [0, 0.465, 0],
  },

  {
    gltfRotation: [Math.PI / 7, -Math.PI / 5, Math.PI / 4],
    nullRotation: [-0.8, -Math.PI / 1.7, -Math.PI / 2.9],
    null2position: [0, 0.39, 0],
  },
  {
    gltfRotation: [Math.PI / 7, -Math.PI / 5, Math.PI / 4],
    nullRotation: [-1.2, -Math.PI / 1.44, -Math.PI / 2.9],
    null2position: [0, 0.36, 0],
  },

  {
    gltfRotation: [-Math.PI / 6, -Math.PI / 5, -Math.PI / 5],
    nullRotation: [-1.6, -Math.PI / 1.7, -Math.PI / 2.9],
    null2position: [0, 0.39, 0],
  },
  {
    gltfRotation: [Math.PI / 4, -Math.PI / 3, Math.PI / 10],
    nullRotation: [-2, -Math.PI / 1.7, -Math.PI / 2.9],
    null2position: [0, 0.39, 0],
  },

  {
    gltfRotation: [Math.PI / 4, -Math.PI / 3, Math.PI / 10],
    nullRotation: [-1.7, -Math.PI / 1.5, -Math.PI / 2.9],
    null2position: [0, 0.39, 0],
  },
  // ↑小さな島のピン
  {
    gltfRotation: [Math.PI / 4, -Math.PI / 3, Math.PI / 10],
    nullRotation: [-2.3, -Math.PI / 12, -Math.PI / 2.9],
    null2position: [0, 0.39, 0],
  },
  {
    gltfRotation: [-Math.PI / 7, -Math.PI / 6, Math.PI / 8],
    nullRotation: [-3.3, -Math.PI / 10, -Math.PI / 1.9],
    null2position: [0, 0.39, 0],
  },
  {
    gltfRotation: [Math.PI / 7, Math.PI / 6, -Math.PI / 5],
    nullRotation: [-3.9, -Math.PI / 4, -Math.PI / 1.9],
    null2position: [0, 0.37, 0],
  },
  // ↑小さな島
  {
    gltfRotation: [Math.PI / 5, Math.PI / 6, -Math.PI / 5],
    nullRotation: [-3.2, -Math.PI / 4.45, -Math.PI / 1.89],
    null2position: [0, 0.37, 0],
  },
  // ↑船のピン
  {
    gltfRotation: [Math.PI / 7, -Math.PI / 2, -Math.PI / 9],
    nullRotation: [-3.48, -Math.PI / 1.95, -Math.PI / 1.35],
    null2position: [0, 0.37, 0],
  },
  // ↑船のピン
  {
    gltfRotation: [-Math.PI / 10, Math.PI / 2, -Math.PI / 9],
    nullRotation: [-3.4, -Math.PI / 1.15, -Math.PI / 1.35],
    null2position: [0, 0.37, 0],
  },
  {
    gltfRotation: [-Math.PI / 10, Math.PI / 7, -Math.PI / 9],
    nullRotation: [-3, -Math.PI / 1.15, -Math.PI / 1.35],
    null2position: [0, 0.37, 0],
  },
  {
    gltfRotation: [-Math.PI / 10, Math.PI / 7, -Math.PI / 9],
    nullRotation: [-2.5, -Math.PI / 1.15, -Math.PI / 1.35],
    null2position: [0, 0.37, 0],
  },
  {
    gltfRotation: [Math.PI / 4, Math.PI / 7, -Math.PI / 9],
    nullRotation: [-2.5, -Math.PI / 1, -Math.PI / 1.35],
    null2position: [0, 0.39, 0],
  },
  {
    gltfRotation: [-Math.PI / 6, Math.PI / 7, -Math.PI / 9],
    nullRotation: [-4, -Math.PI / 1, -Math.PI / 3],
    null2position: [0, 0.35, 0],
  },
  {
    gltfRotation: [Math.PI / 5, Math.PI / 9, -Math.PI / 9],
    nullRotation: [-7.7, -Math.PI / 1, -Math.PI / 2.35],
    null2position: [0, 0.35, 0],
  },
  {
    gltfRotation: [Math.PI / 5, Math.PI / 5, -Math.PI / 9],
    nullRotation: [-7.7, -Math.PI / 0.75, -Math.PI / 2.5],
    null2position: [0, 0.35, 0],
  },
  {
    gltfRotation: [Math.PI / 5, Math.PI / 3, -Math.PI / 3],
    nullRotation: [-7.7, -Math.PI / 0.88, -Math.PI / 2.7],
    null2position: [0, 0.37, 0],
  },
  {
    gltfRotation: [Math.PI / 5, Math.PI / 3, -Math.PI / 3],
    nullRotation: [-7.9, -Math.PI / 0.8, -Math.PI / 2.9],
    null2position: [0, 0.35, 0],
  },
  {
    gltfRotation: [Math.PI / 6, -Math.PI / 7, -Math.PI / 9],
    nullRotation: [-3.9, -Math.PI / 1, -Math.PI / 8],
    null2position: [0, 0.32, 0],
  },
  {
    gltfRotation: [Math.PI / 6, -Math.PI / 7, -Math.PI / 9],
    nullRotation: [-4.7, -Math.PI / 0.8, -Math.PI / 8.5],
    null2position: [0, 0.35, 0],
  },
  {
    gltfRotation: [-Math.PI / 8, -Math.PI / 3, -Math.PI / 9],
    nullRotation: [-5, -Math.PI / 1, -Math.PI / 3],
    null2position: [0, 0.36, 0],
  },
  {
    gltfRotation: [Math.PI / 7, -Math.PI / 3, -Math.PI / 9],
    nullRotation: [-5.8, -Math.PI / 0.9, -Math.PI / 2.3],
    null2position: [0, 0.36, 0],
  },
  {
    gltfRotation: [-Math.PI / 7, Math.PI / 3, -Math.PI / 9],
    nullRotation: [-5.8, -Math.PI / 1, -Math.PI / 2.3],
    null2position: [0, 0.36, 0],
  },
  {
    gltfRotation: [-Math.PI / 7, Math.PI / 3, Math.PI / 4],
    nullRotation: [-6.8, -Math.PI / 1.19, -Math.PI / 2.5],
    null2position: [0, 0.4, 0],
  },
  {
    gltfRotation: [-Math.PI / 7, Math.PI / 3, Math.PI / 4],
    nullRotation: [-6.8, -Math.PI / 1.4, -Math.PI / 1.45],
    null2position: [0, 0.34, 0],
  },
  // ↑大きな大陸
  {
    gltfRotation: [Math.PI / 7, Math.PI / 6, Math.PI / 7],
    nullRotation: [-6.5, -Math.PI / 1.7, -Math.PI / 1.45],
    null2position: [0, 0.34, 0],
  },
  {
    gltfRotation: [-Math.PI / 7, 0, 0],
    nullRotation: [Math.PI + 6, -Math.PI / 8, -Math.PI / 7],
    null2position: [0, 0.35, 0],
  },
  {
    gltfRotation: [-Math.PI / 7, 0, 0],
    nullRotation: [Math.PI + 5.7, -Math.PI / 4, -Math.PI / 10],
    null2position: [0, 0.35, 0],
  },
  {
    gltfRotation: [Math.PI / 100, -Math.PI / 5, -Math.PI / 5],
    nullRotation: [Math.PI + 5.9, -Math.PI / 2, -Math.PI / 10],
    null2position: [0, 0.35, 0],
  },
  // ↑島々たち
];
export function Pin(props: {
  color: "orange" | "blue";
  randomPositionTmp: typeRandomPosition;
  item: formatGetDiscussionItem;
}) {
  const [hovered, setHover] = useState(false);
  // https://sketchfab.com/3d-models/object10-push-pin-81aadd826c85488180fa3fa2d5f7a0aa
  const gltf = useGLTF(
    (props.color == "blue" && "/push_pin_fix/scene.gltf") ||
      "/push_pin_fix_orange/scene.gltf"
  );
  const cloneedCeane = gltf.scene.clone();
  cloneedCeane.scale.set(0.03, 0.03, 0.03);
  // gltf.scene.position.set(0, 0, 0.2);
  cloneedCeane.rotation.set(
    props.randomPositionTmp.gltfRotation[0],
    props.randomPositionTmp.gltfRotation[1],
    props.randomPositionTmp.gltfRotation[2]
  );

  // gltf.scene.lookAt(0, 0, 0);
  const [discussionId, setDiscussionId] = useRecoilState(
    parentDiscussionIdAtom
  );
  const [openSendQuestionDialog, setOpenopenSendQuestionDialog] =
    useRecoilState(sendAnsQuestionDialogAtom);
  // gltf.scene.position.set();
  return (
    // <TransformControls>
    <mesh
      position={[0, 0, 0]}
      rotation={[
        props.randomPositionTmp.nullRotation[0],
        props.randomPositionTmp.nullRotation[1],
        props.randomPositionTmp.nullRotation[2],
      ]}
    >
      <mesh
        position={[
          props.randomPositionTmp.null2position[0],
          props.randomPositionTmp.null2position[1],
          props.randomPositionTmp.null2position[2],
        ]}
        rotation={[0, 0, 0]}
      >
        <primitive
          position={[0, 0, 0]}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
          onClick={() => {
            setDiscussionId(props.item.discussion_id);
            setOpenopenSendQuestionDialog(true);
          }}
          color={hovered ? "hotpink" : "orange"}
          object={cloneedCeane}
        />
      </mesh>
    </mesh>
    // </TransformControls>
  );
}
