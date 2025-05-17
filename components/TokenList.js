import { useState, useEffect } from "react";
export default function TokenList({ tokens }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTokens = tokens.filter((token) =>
    token.mint.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (tokens.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg">
          No tokens found in this wallet
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tokens..."
          className="w-full bg-black/40 border border-purple-500/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-500"
        />
        <svg
          className="absolute right-3 top-3.5 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Token List */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-purple-500/20">
              <th className="text-left py-3 px-2 text-gray-400 text-sm font-medium">
                Token
              </th>
              <th className="text-right py-3 px-2 text-gray-400 text-sm font-medium">
                Balance
              </th>
              <th className="text-right py-3 px-2 text-gray-400 text-sm font-medium hidden md:table-cell">
                Value
              </th>
              <th className="text-right py-3 px-2 text-gray-400 text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTokens.map((token, index) => (
              <tr
                key={index}
                className="border-b border-purple-500/10 hover:bg-purple-500/5"
              >
                <td className="py-4 px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0"></div>
                    <div>
                      <div className="text-white font-medium">Token</div>
                      <div className="text-gray-400 text-xs font-mono">
                        {token.mint.slice(0, 8)}...
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2 text-right text-white">
                  {token.balance}
                </td>
                <td className="py-4 px-2 text-right text-gray-400 hidden md:table-cell">
                  ~$0.00
                </td>
                <td className="py-4 px-2 text-right">
                  <button className="bg-purple-500/20 hover:bg-purple-500/30 text-white px-3 py-1 rounded text-sm transition-colors">
                    Swap
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
