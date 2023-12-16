"use client";
import Image from "next/image";
import App from "./components/3dtest";
import Head from "next/head";
import { RecoilRoot } from "recoil";

export default function Home() {
  return (
    <main>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/hao5cgh.css" />
      </Head>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </main>
  );
}
