import "../styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>SolGPT - Professional Token Trading on Solana</title>
        <meta
          name="description"
          content="Experience the future of DeFi with professional-grade token swapping, wallet & token exploration, and secure transfers on Solana blockchain."
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
