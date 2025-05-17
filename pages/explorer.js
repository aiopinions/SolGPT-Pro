import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import ParticleBackground from "../components/ParticleBackground";
import WalletSearch from "../components/WalletSearch";
import WalletDashboard from "../components/WalletDashboard";

export default function Explorer() {
  const [searchAddress, setSearchAddress] = useState("");
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (address) => {
    if (!address || address.length < 32) {
      setError("Please enter a valid Solana wallet address");
      return;
    }

    setLoading(true);
    setError("");
    setWalletData(null);

    try {
      // Fetch wallet data from multiple sources
      const [balance, tokens, transactions, nfts] = await Promise.all([
        fetchWalletBalance(address),
        fetchTokenBalances(address),
        fetchTransactionHistory(address),
      ]);

      setWalletData({
        address,
        balance,
        tokens,
        transactions,
        nfts,
        timestamp: Date.now(),
      });
    } catch (err) {
      console.error("Error fetching wallet data:", err);
      setError("Failed to fetch wallet data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if address is in URL
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const address = urlParams.get("address");
      if (address) {
        setSearchAddress(address);
        handleSearch(address);
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
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl">
                    S
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white whitespace-nowrap">
                  Wallet Explorer
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
              <Link href="/transfer">
                <button className="bg-black/60 backdrop-blur-md border border-purple-500/20 text-white font-bold py-1.5 px-3 sm:py-2 sm:px-4 md:py-3 md:px-6 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base hover:bg-purple-500/20">
                  Transfer
                </button>
              </Link>
            </div>
          </div>
        </header>

        {/* Search Section */}
        <div className="container mx-auto px-4 py-8">
          <WalletSearch
            searchAddress={searchAddress}
            setSearchAddress={setSearchAddress}
            onSearch={handleSearch}
            loading={loading}
            error={error}
          />

          {/* Results Section */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="text-white text-xl flex items-center gap-3">
                <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                Loading wallet data...
              </div>
            </div>
          )}

          {error && (
            <div className="max-w-4xl mx-auto mt-8">
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-center">
                {error}
              </div>
            </div>
          )}

          {walletData && !loading && !error && (
            <WalletDashboard walletData={walletData} />
          )}
        </div>
      </main>
    </div>
  );
}

// Helper functions for fetching wallet data
async function fetchWalletBalance(address) {
  const response = await fetch(process.env.NEXT_PUBLIC_RPC_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "getBalance",
      params: [address],
    }),
  });

  const data = await response.json();
  return data.result ? data.result.value / 1e9 : 0;
}

async function fetchTokenBalances(address) {
  const response = await fetch(process.env.NEXT_PUBLIC_RPC_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "getTokenAccountsByOwner",
      params: [
        address,
        { programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" },
        { encoding: "jsonParsed" },
      ],
    }),
  });

  const data = await response.json();
  return data.result ? parseTokenAccounts(data.result.value) : [];
}

async function fetchTransactionHistory(address) {
  const response = await fetch(process.env.NEXT_PUBLIC_RPC_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "getSignaturesForAddress",
      params: [address, { limit: 20 }],
    }),
  });

  const data = await response.json();
  return data.result || [];
}

function parseTokenAccounts(accounts) {
  return accounts
    .map((account) => {
      const info = account.account.data.parsed.info;
      return {
        mint: info.mint,
        amount: info.tokenAmount.uiAmount,
        decimals: info.tokenAmount.decimals,
        balance: (info.tokenAmount.uiAmount || 0).toFixed(6),
      };
    })
    .filter((token) => token.amount > 0);
}
