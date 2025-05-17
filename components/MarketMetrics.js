export default function MarketMetrics({ metrics, loading }) {
  if (loading || !metrics) {
    return (
      <div className="bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-xl p-4 mb-6">
        <div className="animate-pulse flex space-x-4">
          <div className="h-4 bg-gray-700 rounded w-20"></div>
          <div className="h-4 bg-gray-700 rounded w-16"></div>
          <div className="h-4 bg-gray-700 rounded w-24"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
      <div className="bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-lg p-3">
        <div className="text-gray-400 text-sm">Price</div>
        <div className="text-white font-bold">${metrics.price.toFixed(4)}</div>
        <div
          className={`text-sm ${
            metrics.change24h >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          {metrics.change24h >= 0 ? "+" : ""}
          {metrics.change24h.toFixed(2)}%
        </div>
      </div>

      <div className="bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-lg p-3">
        <div className="text-gray-400 text-sm">24h Volume</div>
        <div className="text-white font-bold">
          ${(metrics.volume24h / 1000000).toFixed(2)}M
        </div>
        <div
          className={`text-sm ${
            metrics.volumeChange >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          {metrics.volumeChange >= 0 ? "+" : ""}
          {metrics.volumeChange.toFixed(1)}%
        </div>
      </div>

      <div className="bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-lg p-3">
        <div className="text-gray-400 text-sm">Market Cap</div>
        <div className="text-white font-bold">
          ${(metrics.marketCap / 1000000000).toFixed(2)}B
        </div>
      </div>

      <div className="bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-lg p-3">
        <div className="text-gray-400 text-sm">Liquidity</div>
        <div className="text-white font-bold">
          ${(metrics.liquidity / 1000000).toFixed(1)}M
        </div>
        <div
          className={`text-sm ${
            metrics.liquidityChange >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          {metrics.liquidityChange >= 0 ? "+" : ""}
          {metrics.liquidityChange.toFixed(2)}%
        </div>
      </div>

      <div className="bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-lg p-3">
        <div className="text-gray-400 text-sm">Holders</div>
        <div className="text-white font-bold">
          {(metrics.holders / 1000000).toFixed(1)}M
        </div>
        <div
          className={`text-sm ${
            metrics.holdersChange >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          {metrics.holdersChange >= 0 ? "+" : ""}
          {metrics.holdersChange.toFixed(1)}%
        </div>
      </div>

      <div className="bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-lg p-3">
        <div className="text-gray-400 text-sm">Likes</div>
        <div className="text-white font-bold">{metrics.likes}</div>
      </div>

      <div className="bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-lg p-3">
        <div className="text-gray-400 text-sm">Org Score</div>
        <div className="text-white font-bold">{metrics.orgScore}</div>
      </div>

      <div className="bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-lg p-3">
        <div className="text-gray-400 text-sm">24h High</div>
        <div className="text-white font-bold">
          ${metrics.high24h.toFixed(4)}
        </div>
      </div>
    </div>
  );
}
