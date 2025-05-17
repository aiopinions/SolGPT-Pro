import { useState } from "react";

export default function WalletSearch({
  searchAddress,
  setSearchAddress,
  onSearch,
  loading,
  error,
}) {
  const [inputValue, setInputValue] = useState(searchAddress);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchAddress(inputValue);
    onSearch(inputValue);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Explore Solana Wallet
        </h2>

        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter Solana wallet address..."
            className="w-full bg-black/40 border border-purple-500/20 text-white px-6 py-4 rounded-xl text-lg focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !inputValue}
            className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-800 text-white font-bold px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {loading ? "Searching..." : "Explore"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Enter any Solana wallet address to view its balance, tokens,
            transactions, and NFTs
          </p>
        </div>
      </div>
    </div>
  );
}
