"use client";
import React from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { userNameAtom } from "../recoil/atom";
import axios from "axios";
// function Api() {
//   const [text, setText] = useRecoilState(userNameAtom);
//   return <></>;
// }

export async function checkUserName(userName: string) {
  const checkRequiest = await axios.post(
    "https://p2-api.flyanyfree.com/user/check/",
    {
      user_id: userName,
    }
  );
  return checkRequiest.data;
}

export async function createUser(userName: string, dusername: string) {
  const checkRequiest = await axios.post(
    "https://p2-api.flyanyfree.com/user/create/",
    {
      user_id: userName,
      display_username: dusername,
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return checkRequiest.data;
}

export async function getDiscussionItem(discussion_id: string) {
  const getRequest = await axios.get(
    `https://p2-api.flyanyfree.com/discussion/get/item/${discussion_id}`
  );
  return getRequest.data;
}

export async function getDiscussionAll(discussion_id: string) {
  const getRequest = await axios.get(
    `https://p2-api.flyanyfree.com/discussion/get/all/${discussion_id}`
  );
  return getRequest.data;
}
