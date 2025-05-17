import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import ParticleBackground from "../components/ParticleBackground";
import TradingChart from "../components/TradingChart";
import TransactionHistory from "../components/TransactionHistoryTrading";
import MarketMetrics from "../components/MarketMetrics";
import OrderBook from "../components/OrderBook";
import { motion } from "framer-motion";

export default function Trading() {
  const [mounted, setMounted] = useState(false);
  const [selectedPair, setSelectedPair] = useState({
    base: "SOL",
    quote: "USDC",
    baseAddress: "So11111111111111111111111111111111111111112",
    quoteAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  });

  const [chartData, setChartData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("1h");
  const [error, setError] = useState(null);

  // Ensure component only renders on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch trading data
  useEffect(() => {
    if (!mounted) return;

    fetchTradingData();
    // const interval = setInterval(fetchTradingData, 30000);
    // return () => clearInterval(interval);
  }, [mounted, selectedPair, timeframe]);

  const fetchTradingData = async () => {
    try {
      setLoading(true);

      // Fetch price data
      const priceResponse = await fetch(
        `https://api.jup.ag/price/v2?ids=${selectedPair.baseAddress}&vsToken=${selectedPair.quoteAddress}`
      );
      const priceData = await priceResponse.json();

      // Fetch volume and metrics
      const metricsData = await fetchMarketMetrics(selectedPair);
      const chartData = await fetchChartData(selectedPair, timeframe);
      const transactionData = await fetchRecentTransactions(selectedPair);

      setMetrics(metricsData);
      setChartData(chartData);
      setTransactions(transactionData);
      setError(null);
    } catch (err) {
      console.error("Error fetching trading data:", err);
      setError("Failed to fetch trading data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMarketMetrics = async (pair) => {
    // Fetch real market metrics from Jupiter Aggregator API or another Solana analytics API
    try {
      const response = await fetch(`https://public-api.birdeye.so/public/market_summary?market=${pair.baseAddress}_${pair.quoteAddress}`, {
        headers: {
          'X-API-KEY': process.env.NEXT_PUBLIC_BIRDEYE_API_KEY || ''
        }
      });
      const data = await response.json();
      if (data && data.data) {
        return {
          price: data.data.price,
          change24h: data.data.priceChange24h,
          volume24h: data.data.volume24h,
          high24h: data.data.high24h,
          low24h: data.data.low24h,
          marketCap: data.data.marketCap,
          liquidity: data.data.liquidity,
          holders: data.data.holders,
          likes: data.data.likes || 0,
          orgScore: data.data.orgScore || 0,
          volumeChange: data.data.volumeChange || 0,
          liquidityChange: data.data.liquidityChange || 0,
          holdersChange: data.data.holdersChange || 0,
        };
      }
      return null;
    } catch (err) {
      console.error("Error fetching market metrics:", err);
      return null;
    }
  };

  const fetchChartData = async (pair, timeframe) => {
    // Fetch real candlestick chart data from Birdeye or another Solana analytics API
    try {
      const response = await fetch(`https://public-api.birdeye.so/public/ohlcv?market=${pair.baseAddress}_${pair.quoteAddress}&interval=${timeframe}`,
        { headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_BIRDEYE_API_KEY || '' } });
      const data = await response.json();
      if (data && data.data && Array.isArray(data.data)) {
        return data.data.map(candle => ({
          time: candle.timestamp,
          open: candle.open,
          high: candle.high,
          low: candle.low,
          close: candle.close,
          volume: candle.volume,
        }));
      }
      return [];
    } catch (err) {
      console.error("Error fetching chart data:", err);
      return [];
    }
  };

  const fetchRecentTransactions = async (pair) => {
    // Fetch real recent transactions from Solana explorer API or Birdeye
    try {
      const response = await fetch(`https://public-api.birdeye.so/public/trades?market=${pair.baseAddress}_${pair.quoteAddress}&limit=20`,
        { headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_BIRDEYE_API_KEY || '' } });
      const data = await response.json();
      if (data && data.data && Array.isArray(data.data)) {
        return data.data.map((tx, i) => ({
          id: tx.txHash || `tx_${i}`,
          time: tx.blockTime * 1000,
          type: tx.side === 'buy' ? 'Buy' : 'Sell',
          price: tx.price,
          amount: tx.amount,
          volume: tx.price * tx.amount,
          trader: tx.owner ? tx.owner.slice(0, 4) + '...' + tx.owner.slice(-4) : 'unknown',
        }));
      }
      return [];
    } catch (err) {
      console.error("Error fetching transactions:", err);
      return [];
    }
  };

  // Handle pair change from the TradingChart component
  const handlePairChange = (newPair) => {
    setSelectedPair(newPair);
    // This will trigger the useEffect to fetch new data
  };

  // Return loading state until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <ParticleBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-white text-xl flex items-center gap-3">
            <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <ParticleBackground />

      {/* Navigation */}
      <nav className="relative z-20 w-full p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-4 cursor-pointer">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full  flex items-center justify-center">
                <span className="text-white font-bold text-lg md:text-xl">
                  <img src="/logo.png" alt="" srcset="" />
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white">
                Trading Explorer
              </h1>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/swap">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded-full transition-all duration-300 transform hover:scale-105 text-sm md:text-base">
                Back to Swap
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Trading Interface */}
      <div className="relative z-10 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Error State */}
          {error && (
            <div className="bg-red-900/80 border border-red-500/30 text-red-300 rounded-xl p-4 mb-6 text-center">
              <span className="font-bold">{error}</span>
            </div>
          )}
          {/* Empty State */}
          {!loading && !error && (!chartData || chartData.length === 0) && (
            <div className="bg-black/60 border border-purple-500/20 text-purple-300 rounded-xl p-4 mb-6 text-center">
              <span className="font-bold">Trading Explorer will be live soon.</span>
            </div>
          )}
          {/* Token Pair Selector */}
          <div className="bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-xl p-4 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold">
                    {selectedPair.base}
                  </span>
                </div>
                <span className="text-2xl font-bold text-white">
                  {selectedPair.base}/{selectedPair.quote}
                </span>
                <span className="text-sm text-gray-400 bg-purple-500/20 px-2 py-1 rounded">
                  ${metrics?.price?.toFixed(4) ?? '--'}
                </span>
              </div>

              <div className="flex-1 flex items-center justify-center md:justify-end gap-4">
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="bg-black/40 border border-purple-500/20 text-white px-3 py-2 rounded-lg focus:outline-none"
                >
                  <option value="1m">1m</option>
                  <option value="5m">5m</option>
                  <option value="15m">15m</option>
                  <option value="1h">1h</option>
                  <option value="4h">4h</option>
                  <option value="1d">1d</option>
                </select>

                <button
                  onClick={fetchTradingData}
                  className="bg-purple-500/20 hover:bg-purple-500/30 text-white p-2 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Market Metrics */}
          <MarketMetrics metrics={metrics} loading={loading} />

          {/* Main Trading View */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
            {/* Chart Section */}
            <div className="xl:col-span-2">
              <TradingChart
                data={chartData}
                loading={loading}
                pair={selectedPair}
                timeframe={timeframe}
                onPairChange={handlePairChange}
              />
            </div>

            {/* Trading Panel */}
            <div className="space-y-6">
              {/* Order Form */}
              <div className="bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-xl overflow-hidden">
                <div className="border-b border-purple-500/20">
                  <div className="flex">
                    <button className="flex-1 py-3 bg-purple-500/20 text-purple-400 font-bold">
                      Airdrop
                    </button>
                    <button className="flex-1 py-3 bg-purple-700/20 text-purple-300 font-bold">
                      Rewards
                    </button>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  {/* SVG or Image */}
                  <div className="flex justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="text-purple-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 3v18m9-9H3"
                      />
                    </svg>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-white text-center">
                      Earn Free {selectedPair?.base} Tokens!
                    </h2>
                    <p className="text-sm text-gray-400 text-center">
                      Join our limited-time crypto airdrop and receive exclusive
                      tokens directly to your wallet.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 pt-24 gap-4 text-sm text-gray-300">
                    <div>
                      <p className="text-purple-400">Token</p>
                      <p className="font-bold text-white">
                        {selectedPair?.base}
                      </p>
                    </div>
                    <div>
                      <p className="text-purple-400">Reward Value</p>
                      <p className="font-bold text-white">
                        ${metrics?.price?.toFixed(4) ?? '--'}
                      </p>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white py-3 rounded-lg font-bold hover:brightness-110 transition">
                    <a href="/swap">Claim Now</a>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <TransactionHistory transactions={transactions} loading={loading} />
        </div>
      </div>
    </div>
  );
}
