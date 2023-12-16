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
interface typeRandomPosition {
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
