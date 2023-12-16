"use client";
import Image from "next/image";
import App from "./components/3dtest";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import CSR from "./csr/CSR";

export default function Home() {
  return (
    <main>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <link rel="stylesheet" href="https://use.typekit.net/hao5cgh.css" />
      </Head>
      <CSR>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </CSR>
    </main>
  );
}
