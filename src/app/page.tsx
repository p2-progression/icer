import Image from "next/image";
import App from "./components/3dtest";
import Head from "next/head";

export default function Home() {
  return (
    <main>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/hao5cgh.css" />
      </Head>
      <App />
    </main>
  );
}
