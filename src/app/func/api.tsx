"use client";
import React, { useEffect } from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import {
  getdiscussionAllDataAtom,
  parentDiscussionIdAtom,
  parentDiscussionIseeLevelAtom,
  parentDiscussionRandomAtom,
  userNameAtom,
} from "../recoil/atom";
import axios from "axios";
import { Button } from "@mui/material";
import { iseeCheck } from "./isee";

export function ApiAutoUpdate() {
  const [userName, setUserName] = useRecoilState(userNameAtom);
  const [discussionId, setDiscussionId] = useRecoilState(
    parentDiscussionIdAtom
  );
  const [discussionAll, setDiscussionAll] = useRecoilState(
    getdiscussionAllDataAtom
  );
  const [discussionLevel, setDiscussionLevel] = useRecoilState(
    parentDiscussionIseeLevelAtom
  );
  const [parentDiscussionItems, setParentDiscussionItems] = useRecoilState(
    parentDiscussionRandomAtom
  );
  // discussionIdに変更があるたびデータを取得し直す
  useEffect(() => {
    (async () => {
      if (discussionId !== null) {
        const getdata = await getDiscussionAll(discussionId);
        setDiscussionAll(getdata);
        // IseeLevelを更新
        setDiscussionLevel(iseeCheck(getdata));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discussionId]);
  useEffect(() => {
    (async () => {
      const getdata = await getDiscussionRandom();
      setParentDiscussionItems(getdata);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}

export async function checkUserName(userName: string) {
  // const checkRequiest = await axios.post(
  //   "https://p2-api.flyanyfree.com/user/check/",
  //   {
  //     user_id: userName,
  //   }
  // );
  return {
    status: "ok",
    userdata: {
      id: "aed79fc2-9a68-11ee-9c0e-0242ac120002",
      user_id: "koo",
      pass_hash: "0000000",
      display_username: "こうさん",
    },
  };
}

export async function createUser(userName: string, dusername: string) {
  // const checkRequiest = await axios.post(
  //   "https://p2-api.flyanyfree.com/user/create/",
  //   {
  //     user_id: userName,
  //     display_username: dusername,
  //   },
  //   {
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //   }
  // );
  return [];
}
export interface formatGetDiscussionItem {
  post_id: string;
  discussion_id: number;
  is_parent: number;
  parent_discussion_id: number;
  user_id: string;
  isee: number;
  bad: number;
  isee_level: number;
  content: string;
  date: string;
}

export async function getDiscussionItem(
  discussion_id: string
): Promise<formatGetDiscussionItem> {
  const getRequest = await axios.get(
    `https://p2-api.flyanyfree.com/discussion/get/item/${discussion_id}`
  );
  return getRequest.data;
}

export async function getDiscussionAll(
  parent_discussion_id: number
): Promise<formatGetDiscussionItem[]> {
  // const getRequest = await axios.get(
  //   `https://p2-api.flyanyfree.com/discussion/get/all/${parent_discussion_id}`
  // );
  return [
    {
      post_id: "52811c57-9a6f-11ee-9c0e-0242ac120002",
      discussion_id: 22,
      is_parent: 0,
      parent_discussion_id: 19,
      user_id: "aff",
      isee: 10,
      bad: 0,
      isee_level: 0,
      content: "レアな時計なら中古品店で売れますよ！",
      date: "2023-12-14T10:55:40",
    },
    {
      post_id: "466e753f-9a6f-11ee-9c0e-0242ac120002",
      discussion_id: 21,
      is_parent: 0,
      parent_discussion_id: 19,
      user_id: "ito",
      isee: 1,
      bad: 0,
      isee_level: 0,
      content: "細かい部品は再利用できます。",
      date: "2023-12-14T10:55:20",
    },
    {
      post_id: "2eaadd5e-9a6f-11ee-9c0e-0242ac120002",
      discussion_id: 20,
      is_parent: 0,
      parent_discussion_id: 19,
      user_id: "asfs",
      isee: 1,
      bad: 0,
      isee_level: 0,
      content: "ケースに入れて飾るのがいいと思う。",
      date: "2023-12-14T10:54:40",
    },
    {
      post_id: "02098301-9a6f-11ee-9c0e-0242ac120002",
      discussion_id: 19,
      is_parent: 1,
      parent_discussion_id: 0,
      user_id: "yamamoto",
      isee: 0,
      bad: 0,
      isee_level: 5,
      content: "壊れた時計の再利用方法教えてください。",
      date: "2023-12-14T10:53:25",
    },
  ];
}
export async function getDiscussionItemsRandom(
  offset: number
): Promise<formatGetDiscussionItem[]> {
  // const getRequest = await axios.get(
  //   `https://p2-api.flyanyfree.com/discussion/get/random/?offset=${offset}`
  // );
  return [];
}

export async function getDiscussionRandom(): Promise<
  formatGetDiscussionItem[]
> {
  // const getRequest = await axios.get(
  //   `https://p2-api.flyanyfree.com/discussion/get/random_normal/`
  // );
  return [
    {
      post_id: "bed64f9c-9a6c-11ee-9c0e-0242ac120002",
      discussion_id: 11,
      is_parent: 1,
      parent_discussion_id: 0,
      user_id: "nakamoto",
      isee: 0,
      bad: 0,
      isee_level: 0,
      content: "ペットボトルのごみの代用方法おしえてください！",
      date: "2023-12-14T10:37:14",
    },
    {
      post_id: "810cf499-9a6f-11ee-9c0e-0242ac120002",
      discussion_id: 23,
      is_parent: 1,
      parent_discussion_id: 0,
      user_id: "jtyk",
      isee: 0,
      bad: 0,
      isee_level: 1,
      content: "よくわからなくてどうしたらいいか、、、、、",
      date: "2023-12-14T10:56:59",
    },
    {
      post_id: "67aab3c3-9a76-11ee-9c0e-0242ac120002",
      discussion_id: 29,
      is_parent: 1,
      parent_discussion_id: 0,
      user_id: "fghj",
      isee: 0,
      bad: 0,
      isee_level: 0,
      content: "スーパーのレジ袋の他の再利用方法って何でしょう。\r\n",
      date: "2023-12-14T11:46:22",
    },
    {
      post_id: "af8c4473-9bfd-11ee-9c0e-0242ac120002",
      discussion_id: 81,
      is_parent: 1,
      parent_discussion_id: 0,
      user_id: "ads",
      isee: 0,
      bad: 0,
      isee_level: 1,
      content: "捨てる牛乳パックの再利用方法を教えて！",
      date: "2023-12-16T10:27:16",
    },
    {
      post_id: "7243c925-9c0e-11ee-9c0e-0242ac120002",
      discussion_id: 83,
      is_parent: 1,
      parent_discussion_id: 0,
      user_id: "asdg",
      isee: 0,
      bad: 0,
      isee_level: 0,
      content:
        "引っ越しの時に大量に大型ごみをすてるのですが再利用できるものはないですかね～。",
      date: "2023-12-16T12:27:15",
    },
    {
      post_id: "d75cb49d-9a6b-11ee-9c0e-0242ac120002",
      discussion_id: 7,
      is_parent: 1,
      parent_discussion_id: 0,
      user_id: "asr",
      isee: 0,
      bad: 0,
      isee_level: 2,
      content: "みかんの皮が余ったのですが何か再利用できませんか？",
      date: "2023-12-14T10:30:45",
    },
    {
      post_id: "8a6cd2fe-9a6d-11ee-9c0e-0242ac120002",
      discussion_id: 15,
      is_parent: 1,
      parent_discussion_id: 0,
      user_id: "satou",
      isee: 0,
      bad: 0,
      isee_level: 5,
      content:
        "破れて売りに出せないような服を再利用したいんですがいい案ないですか？\r\n",
      date: "2023-12-14T10:42:55",
    },
    {
      post_id: "02098301-9a6f-11ee-9c0e-0242ac120002",
      discussion_id: 19,
      is_parent: 1,
      parent_discussion_id: 0,
      user_id: "yamamoto",
      isee: 0,
      bad: 0,
      isee_level: 5,
      content: "壊れた時計の再利用方法教えてください。",
      date: "2023-12-14T10:53:25",
    },
    {
      post_id: "b0972818-9a6f-11ee-9c0e-0242ac120002",
      discussion_id: 24,
      is_parent: 1,
      parent_discussion_id: 0,
      user_id: "sft",
      isee: 0,
      bad: 0,
      isee_level: 5,
      content:
        "バッグが壊れて直せない状態です。思い出のバッグで今後も身につけておきたいです。いい方法ありませんか？",
      date: "2023-12-14T10:58:18",
    },
    {
      post_id: "f2185508-9a75-11ee-9c0e-0242ac120002",
      discussion_id: 26,
      is_parent: 1,
      parent_discussion_id: 0,
      user_id: "chi",
      isee: 0,
      bad: 0,
      isee_level: 4,
      content:
        "もうインクが出ないペン。初めて彼女からもらったもので、まだ使いたいです。どうしたらいいですか？",
      date: "2023-12-14T11:43:05",
    },
  ];
}

export interface propsPostCreateDiscussion {
  user_id: string;
  content: string;
}
export async function postCreateDiscussion(
  props: propsPostCreateDiscussion
): Promise<number> {
  const checkRequiest = await axios.post(
    "https://p2-api.flyanyfree.com/discussion/post/parent",
    {
      user_id: props.user_id,
      content: props.content,
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return checkRequiest.data["LAST_INSERT_ID()"];
}

export interface propsPostCreateChild {
  user_id: string;
  parent_discussion_id: number;
  content: string;
}
export async function postCreateChild(props: propsPostCreateChild) {
  const checkRequiest = await axios.post(
    "https://p2-api.flyanyfree.com/discussion/post/child",
    {
      user_id: props.user_id,
      parent_discussion_id: props.parent_discussion_id,
      content: props.content,
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
}

export interface propsPostUpIsee {
  parent_discussion_id: number;
  discussion_id: number;
  user_id: string;
  count: number;
}
export async function postUpIsee(props: propsPostUpIsee) {
  const checkRequiest = await axios.post(
    "https://p2-api.flyanyfree.com/discussion/post/up_isee",
    {
      parent_discussion_id: props.parent_discussion_id,
      discussion_id: props.discussion_id,
      user_id: props.user_id,
      count: props.count,
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
}
