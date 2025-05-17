import { useState } from "react";

export default function TokenSelector({
  tokens,
  selectedToken,
  setSelectedToken,
  otherToken,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tokens safely
  const filteredTokens =
    tokens && tokens.length > 0
      ? tokens.filter(
          (token) =>
            (token.symbol &&
              token.symbol.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (token.name &&
              token.name.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      : [];

  const handleSelect = (token) => {
    if (token.address !== otherToken?.address) {
      setSelectedToken(token);
      setIsOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/60 backdrop-blur-sm border border-purple-500/20 text-white px-3 py-3 rounded-lg flex items-center gap-2 min-w-[120px] justify-between hover:bg-black/80 transition-all duration-200"
      >
        <div className="flex items-center gap-2">
          {selectedToken ? (
            <>
              {selectedToken.logoURI && (
                <img
                  src={selectedToken.logoURI}
                  alt={selectedToken.symbol}
                  className="w-5 h-5 rounded-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `data:image/svg+xml,<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="8" fill="%236366F1"/><text x="10" y="13" text-anchor="middle" fill="white" font-size="8" font-family="Arial">${selectedToken.symbol.charAt(
                      0
                    )}</text></svg>`;
                  }}
                />
              )}
              <span className="font-medium text-sm">
                {selectedToken.symbol}
              </span>
            </>
          ) : (
            <span className="text-gray-400 text-sm">Select</span>
          )}
        </div>
        <svg
          className={`w-4 h-4 transition-transform duration-200 text-gray-400 ${
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
          <div className="absolute top-full right-0 mt-1 w-80 bg-black/95 backdrop-blur-xl rounded-xl border border-purple-500/20 shadow-2xl z-50 max-h-[400px] overflow-hidden">
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
                  {tokens.length === 0
                    ? "Loading tokens..."
                    : "No tokens found"}
                </div>
              ) : (
                filteredTokens.map((token) => (
                  <button
                    key={token.address}
                    onClick={() => handleSelect(token)}
                    disabled={token.address === otherToken?.address}
                    className={`w-full p-3 flex items-center gap-3 hover:bg-purple-500/10 text-left disabled:opacity-30 disabled:cursor-not-allowed transition-colors ${
                      selectedToken?.address === token.address
                        ? "bg-blue-500/10"
                        : ""
                    }`}
                  >
                    {token.logoURI && (
                      <img
                        src={token.logoURI}
                        alt={token.symbol}
                        className="w-8 h-8 rounded-full flex-shrink-0"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `data:image/svg+xml,<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="14" fill="%236366F1"/><text x="16" y="20" text-anchor="middle" fill="white" font-size="12" font-family="Arial">${token.symbol.charAt(
                            0
                          )}</text></svg>`;
                        }}
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-medium text-sm flex items-center gap-2">
                        {token.symbol}
                        {selectedToken?.address === token.address && (
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
                      <div className="text-gray-400 text-xs truncate">
                        {token.name}
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
