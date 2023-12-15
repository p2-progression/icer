import { useState } from "react";
import { useRecoilState } from "recoil";
import { parentDiscussionId, sendAnsQuestionDialogAtom } from "../recoil/atom";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { formatGetDiscussionItem } from "../func/api";

export function Pin(props: { item: formatGetDiscussionItem }) {
  const [hovered, setHover] = useState(false);
  // https://sketchfab.com/3d-models/object10-push-pin-81aadd826c85488180fa3fa2d5f7a0aa
  const gltf = useLoader(GLTFLoader, "/push_pin_fix/scene.gltf");
  gltf.scene.scale.set(0.03, 0.03, 0.03);
  // gltf.scene.position.set(0, 0, 0.2);
  //   gltf.scene.rotation.set(Math.PI, 0, 0);

  // gltf.scene.lookAt(0, 0, 0);
  const [discussionId, setDiscussionId] = useRecoilState(parentDiscussionId);
  const [openSendQuestionDialog, setOpenopenSendQuestionDialog] =
    useRecoilState(sendAnsQuestionDialogAtom);
  // gltf.scene.position.set();
  return (
    // <TransformControls>
    <mesh
      position={[0, 0, 0]}
      rotation={[Math.PI, -Math.PI / 4, -Math.PI / 3.2]}
    >
      <mesh position={[0, 0.35, 0]} rotation={[0, 0, 0]}>
        <primitive
          position={[0, 0, 0]}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
          // onClick={() => {
          //   setDiscussionId(7);
          //   setOpenopenSendQuestionDialog(true);
          // }}
          color={hovered ? "hotpink" : "orange"}
          object={gltf.scene}
        />
      </mesh>
    </mesh>
    // </TransformControls>
  );
}
