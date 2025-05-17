import { useState } from "react";
import BalanceOverview from "./BalanceOverview";
import TokenList from "./TokenList";
import TransactionHistory from "./TransactionHistory";

export default function WalletDashboard({ walletData }) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "tokens", label: "Tokens", icon: "🪙" },
    { id: "transactions", label: "Transactions", icon: "📜" },
  ];

  return (
    <div className="max-w-7xl mx-auto mt-8">
      {/* Header */}
      <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              Wallet Details
            </h3>
            <p className="text-gray-400 font-mono text-sm break-all">
              {walletData.address}
            </p>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(walletData.address)}
            className="flex items-center gap-2 bg-purple-500/20 hover:bg-purple-500/30 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copy Address
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-purple-500/20 overflow-hidden">
        <div className="border-b border-purple-500/20">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm md:text-base whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-purple-500/20 text-white border-b-2 border-blue-500"
                    : "text-gray-400 hover:text-white hover:bg-purple-500/10"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "overview" && (
            <BalanceOverview walletData={walletData} />
          )}
          {activeTab === "tokens" && <TokenList tokens={walletData.tokens} />}
          {activeTab === "transactions" && (
            <TransactionHistory transactions={walletData.transactions} />
          )}
        </div>
      </div>
    </div>
  );
}
