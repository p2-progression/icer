"use client";
import React from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
export const userNameAtom = atom<string | null>({
  key: "userName", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
export const displayUserNameAtom = atom<string | null>({
  key: "displayUserName", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
