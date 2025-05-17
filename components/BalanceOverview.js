export default function BalanceOverview({ walletData }) {
  const totalTokenValue = walletData.tokens.reduce((acc, token) => {
    // This would normally use real-time prices
    return acc + token.amount * 1; // Placeholder
  }, 0);

  const stats = [
    {
      label: "SOL Balance",
      value: `${walletData.balance.toFixed(4)} SOL`,
      subValue: `~$${(walletData.balance * 100).toFixed(2)}`, // Placeholder price
      color: "text-blue-400",
    },
    {
      label: "Token Holdings",
      value: `${walletData.tokens.length} Tokens`,
      subValue: `${
        walletData.tokens.filter((t) => t.amount > 0).length
      } with balance`,
      color: "text-purple-400",
    },
    {
      label: "Recent Activity",
      value: `${walletData.transactions.length} Transactions`,
      subValue: "Last 30 days",
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-black/40 rounded-xl p-4 border border-purple-500/10"
          >
            <div className="text-gray-400 text-sm mb-1">{stat.label}</div>
            <div className={`text-xl font-bold ${stat.color} mb-1`}>
              {stat.value}
            </div>
            <div className="text-gray-500 text-sm">{stat.subValue}</div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="bg-black/40 rounded-xl p-6 border border-purple-500/10">
        <h4 className="text-white font-bold mb-4">Quick Actions</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center gap-2 p-4 bg-purple-500/10 rounded-lg hover:bg-purple-500/20 transition-colors">
            <span className="text-2xl">💰</span>
            <span className="text-sm text-gray-300">Send SOL</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-purple-500/10 rounded-lg hover:bg-purple-500/20 transition-colors">
            <span className="text-2xl">🪙</span>
            <span className="text-sm text-gray-300">Swap Tokens</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-purple-500/10 rounded-lg hover:bg-purple-500/20 transition-colors">
            <span className="text-2xl">🌾</span>
            <span className="text-sm text-gray-300">Stake SOL</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-purple-500/10 rounded-lg hover:bg-purple-500/20 transition-colors">
            <span className="text-2xl">📊</span>
            <span className="text-sm text-gray-300">Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
}
