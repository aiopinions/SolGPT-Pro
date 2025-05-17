import { useState } from "react";

export default function TokenBalanceSelector({
  selectedToken,
  setSelectedToken,
  tokenBalances,
  solBalance,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Combine SOL and token balances
  const allTokens = [
    {
      type: "sol",
      symbol: "SOL",
      name: "Solana",
      amount: solBalance,
      decimals: 9,
      logoURI:
        "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    },
    ...tokenBalances,
  ];

  const filteredTokens = allTokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (token) => {
    setSelectedToken(token);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-black/40 border border-purple-500/20 text-white p-4 rounded-lg flex items-center justify-between hover:bg-black/60 transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          {selectedToken ? (
            <>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">
                  {selectedToken.symbol.charAt(0)}
                </span>
              </div>
              <div className="text-left">
                <div className="font-medium">{selectedToken.symbol}</div>
                <div className="text-sm text-gray-400">
                  Balance: {selectedToken.amount.toFixed(6)}
                </div>
              </div>
            </>
          ) : (
            <span className="text-gray-400">Select a token</span>
          )}
        </div>
        <svg
          className={`w-5 h-5 transition-transform duration-200 text-gray-400 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-xl rounded-xl border border-purple-500/20 shadow-2xl z-50 max-h-[400px] overflow-hidden">
            <div className="p-3 border-b border-purple-500/20 sticky top-0 bg-black/95 backdrop-blur-sm">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tokens..."
                className="w-full bg-black/60 border border-purple-500/20 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-500"
                autoFocus
              />
            </div>
            <div className="overflow-y-auto max-h-[340px] custom-scrollbar">
              {filteredTokens.length === 0 ? (
                <div className="p-4 text-center text-gray-400 text-sm">
                  No tokens found
                </div>
              ) : (
                filteredTokens.map((token, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(token)}
                    className={`w-full p-4 flex items-center gap-3 hover:bg-purple-500/10 text-left transition-colors ${
                      selectedToken?.symbol === token.symbol
                        ? "bg-blue-500/10"
                        : ""
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">
                        {token.symbol.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-medium text-sm flex items-center gap-2">
                        {token.symbol}
                        {selectedToken?.symbol === token.symbol && (
                          <svg
                            className="w-4 h-4 text-blue-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="text-gray-400 text-xs">
                        {token.name} • Balance: {token.amount.toFixed(6)}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
