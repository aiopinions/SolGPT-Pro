import { useState } from "react";

export default function TokenModal({
  isOpen,
  onClose,
  tokens,
  selectedToken,
  onSelect,
  title,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const filteredTokens = tokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-black/90 backdrop-blur-xl rounded-2xl border border-purple-500/20 max-w-md w-full max-h-[80vh] overflow-hidden shadow-2xl">
          {/* Modal Header */}
          <div className="p-4 border-b border-purple-500/20 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Search Box */}
          <div className="p-4 border-b border-purple-500/20">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tokens..."
              className="w-full bg-black/50 border border-purple-500/20 text-white px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-500"
              autoFocus
            />
          </div>

          {/* Token List */}
          <div className="overflow-y-auto max-h-[60vh] custom-scrollbar">
            {filteredTokens.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                No tokens found
              </div>
            ) : (
              filteredTokens.map((token) => (
                <button
                  key={token.address}
                  onClick={() => onSelect(token)}
                  className={`w-full p-4 flex items-center gap-4 hover:bg-purple-500/5 transition-colors ${
                    selectedToken?.address === token.address
                      ? "bg-blue-500/10"
                      : ""
                  }`}
                >
                  <img
                    src={token.logoURI}
                    alt={token.symbol}
                    className="w-10 h-10 rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `data:image/svg+xml,<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18" fill="%236366F1"/><text x="20" y="26" text-anchor="middle" fill="white" font-size="14" font-family="Arial">${token.symbol.charAt(
                        0
                      )}</text></svg>`;
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium flex items-center gap-2">
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
                    <div className="text-gray-400 text-sm truncate">
                      {token.name}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
