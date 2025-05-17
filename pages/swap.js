import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import SwapInterface from "../components/SwapInterface";
import ConnectWallet from "../components/ConnectWallet";
import ParticleBackground from "../components/ParticleBackground";
import tokenList from "../data/tokens";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load tokens from local file
  useEffect(() => {
    setTimeout(() => {
      setTokens(tokenList);
      setLoading(false);
    }, 100);
  }, []);

  // Check if Phantom wallet is already connected
  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      try {
        const { solana } = window;
        if (solana && solana.isPhantom) {
          const response = await solana.connect({ onlyIfTrusted: true });
          if (response.publicKey) {
            setWalletAddress(response.publicKey.toString());
          }
        }
      } catch (err) {
        console.error("Wallet connection check error:", err);
      }
    };

    if (typeof window !== "undefined") {
      if (window.solana) {
        checkIfWalletIsConnected();
      } else {
        window.addEventListener("load", checkIfWalletIsConnected);
        return () =>
          window.removeEventListener("load", checkIfWalletIsConnected);
      }
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* 3D Particle Background */}
      <ParticleBackground />

      <main className="relative z-10">
        {/* Header */}

        <header className="w-full p-4 md:p-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg md:text-xl">
                  <img src="/logo.png" alt="Logo" />
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white">
                {" "}
                <a href="/">SolGPT Pro</a>{" "}
              </h1>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end gap-2 md:gap-4">
              <Link href="/trading">
                <button className="bg-black/60 backdrop-blur-md border border-purple-500/20 text-white font-bold py-1.5 px-3 md:py-2 md:px-4 lg:py-3 lg:px-6 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base hover:bg-purple-500/20">
                  Trading
                </button>
              </Link>
              <Link href="/transfer">
                <button className="bg-black/60 backdrop-blur-md border border-purple-500/20 text-white font-bold py-1.5 px-3 md:py-2 md:px-4 lg:py-3 lg:px-6 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base hover:bg-purple-500/20">
                  Transfer
                </button>
              </Link>
              <Link href="/explorer">
                <button className="bg-black/60 backdrop-blur-md border border-purple-500/20 text-white font-bold py-1.5 px-3 md:py-2 md:px-4 lg:py-3 lg:px-6 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base hover:bg-purple-500/20">
                  Explorer
                </button>
              </Link>
              <ConnectWallet
                walletAddress={walletAddress}
                setWalletAddress={setWalletAddress}
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-xl mx-auto">
            {/* Stats Bar */}
      

            {walletAddress ? (
              <SwapInterface walletAddress={walletAddress} tokens={tokens} />
            ) : (
              <div className="p-[2px] rounded-2xl bg-[linear-gradient(to_right,#3F50E3,#9333EA)] ">
                <div className="bg-black/60 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">
                    Connect Your Wallet
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Connect with Phantom wallet to start swapping tokens
                  </p>
                  <button
                    onClick={async () => {
                      try {
                        const { solana } = window;
                        if (!solana) {
                          window.open("https://phantom.app/", "_blank");
                          return;
                        }
                        if (solana.isPhantom) {
                          const response = await solana.connect();
                          setWalletAddress(response.publicKey.toString());
                        }
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    Get Phantom Wallet
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="py-8 text-center text-gray-400">
          <p>© 2025 SolGPT Pro. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
