"use client";
import React from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { formatGetDiscussionItem } from "../func/api";
export const userNameAtom = atom<string | null>({
  key: "userName", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
export const displayUserNameAtom = atom<string | null>({
  key: "displayUserName", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

/**
 * 親discussionのIDを管理
 */
export const parentDiscussionId = atom<number | null>({
  key: "parentDiscussionId", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

/**
 * 選択されているDiscussionを表示
 */
export const getdiscussionAllDataAtom = atom<formatGetDiscussionItem[]>({
  key: "getdiscussionAllData", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
/**
 * 選択されているDiscussionを表示
 */
export const sendQuestionDialogAtom = atom<boolean>({
  key: "sendQuestionDialogAtom", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
export const sendAnsQuestionDialogAtom = atom<boolean>({
  key: "sendAnsQuestionDialogAtom", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
