import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import ParticleBackground from "../components/ParticleBackground";
import ConnectWallet from "../components/ConnectWallet";
import TokenTransfer from "../components/TokenTransfer";

export default function Transfer() {
  const [walletAddress, setWalletAddress] = useState(null);

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

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <ParticleBackground />

      <main className="relative z-10">
        {/* Header */}

        <header className="w-full p-3 md:p-4 lg:p-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <Link href="/">
              <div className="flex items-center gap-2 sm:gap-4 cursor-pointer">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg md:text-xl">
                    <img src="/logo.png" alt="Logo" />
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Token Transfer
                </h1>
              </div>
            </Link>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-3 sm:mt-0">
              <Link href="/swap">
                <button className="bg-black/60 backdrop-blur-md border border-purple-500/20 text-white font-bold py-1.5 px-3 sm:py-2 sm:px-4 md:py-3 md:px-6 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base hover:bg-purple-500/20">
                  Swap
                </button>
              </Link>
              <Link href="/trading">
                <button className="bg-black/60 backdrop-blur-md border border-purple-500/20 text-white font-bold py-1.5 px-3 sm:py-2 sm:px-4 md:py-3 md:px-6 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base hover:bg-purple-500/20">
                  Trading
                </button>
              </Link>
              <Link href="/explorer">
                <button className="bg-black/60 backdrop-blur-md border border-purple-500/20 text-white font-bold py-1.5 px-3 sm:py-2 sm:px-4 md:py-3 md:px-6 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base hover:bg-purple-500/20">
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
          <div className="max-w-4xl mx-auto">
            {walletAddress ? (
              <TokenTransfer walletAddress={walletAddress} />
            ) : (
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
                      d="M17 8l4 4m0 0l-4 4m0-4H3"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">
                  Connect Your Wallet
                </h2>
                <p className="text-gray-400 mb-6">
                  Connect with Phantom wallet to start transferring tokens
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
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
