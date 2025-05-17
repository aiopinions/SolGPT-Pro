import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import tokenList from "../data/tokens.js";

export default function TradingChart({
  data,
  loading,
  pair,
  timeframe,
  onPairChange,
}) {
  const chartContainerRef = useRef();
  const chartRef = useRef();
  const [showTokenSelector, setShowTokenSelector] = useState(false);
  const [selectorType, setSelectorType] = useState(""); // "base" or "quote"
  const [searchTerm, setSearchTerm] = useState("");

  // Filter tokens based on search term
  const filteredTokens = tokenList.filter(
    (token) =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!chartContainerRef.current || loading) return;

    // Create new chart
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { type: "solid", color: "#000000" },
        textColor: "#d1d5db",
      },
      grid: {
        vertLines: { color: "#374151" },
        horzLines: { color: "#374151" },
      },
      crosshair: {
        mode: 1,
      },
      rightPriceScale: {
        borderColor: "#374151",
      },
      timeScale: {
        borderColor: "#374151",
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderDownColor: "#ef4444",
      borderUpColor: "#22c55e",
      wickDownColor: "#ef4444",
      wickUpColor: "#22c55e",
    });

    const volumeSeries = chart.addHistogramSeries({
      color: "#6b7280",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    if (data && data.length > 0) {
      candlestickSeries.setData(data);
      volumeSeries.setData(
        data.map((d) => ({
          time: d.time,
          value: d.volume,
          color: d.close >= d.open ? "#22c55e40" : "#ef444440",
        }))
      );
    }

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    chartRef.current = chart;

    return () => {
      window.removeEventListener("resize", handleResize);
      // Safe cleanup to prevent "Object is disposed" error
      if (chartRef.current) {
        try {
          chartRef.current.remove();
        } catch (e) {
          console.warn("Chart already disposed");
        }
        chartRef.current = null;
      }
    };
  }, [data, loading]);

  const handleTokenClick = (token, type) => {
    // Update the trading pair
    const newPair = {
      ...pair,
      [type]: token.symbol,
      [`${type}Address`]: token.address,
    };

    // Call the parent component's onPairChange function with the new pair
    if (onPairChange) {
      onPairChange(newPair);
    }

    // Close the token selector
    setShowTokenSelector(false);
  };

  const openTokenSelector = (type) => {
    setSelectorType(type);
    setShowTokenSelector(true);
    setSearchTerm("");
  };

  if (loading) {
    return (
      <div className="bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-xl h-[400px] flex items-center justify-center">
        <div className="text-white flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          Loading chart...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-xl p-4">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="text-white font-bold">
            <button
              onClick={() => openTokenSelector("base")}
              className="px-2 py-1 bg-purple-500/20 rounded hover:bg-purple-500/30 transition-colors"
            >
              {pair.base}
            </button>
            /
            <button
              onClick={() => openTokenSelector("quote")}
              className="px-2 py-1 bg-purple-500/20 rounded hover:bg-purple-500/30 transition-colors"
            >
              {pair.quote}
            </button>{" "}
            Chart
          </h3>
        </div>
        <div className="flex gap-2">
          <button className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded text-sm">
            Price
          </button>
          <button className="bg-black/40 text-gray-400 px-3 py-1 rounded text-sm">
            Depth
          </button>
        </div>
      </div>

      {/* Token Selector Modal */}
      {showTokenSelector && (
        <div className="absolute z-50 top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center">
          <div className="bg-gray-900 border border-purple-500/30 rounded-xl p-4 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold text-lg">
                Select {selectorType === "base" ? "Base" : "Quote"} Token
              </h3>
              <button
                onClick={() => setShowTokenSelector(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Search tokens..."
                className="w-full bg-black/60 border border-purple-500/20 rounded-lg p-3 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="max-h-96 overflow-y-auto">
              {filteredTokens.map((token) => (
                <div
                  key={token.address}
                  onClick={() => handleTokenClick(token, selectorType)}
                  className="flex items-center gap-3 p-3 hover:bg-purple-500/10 rounded-lg cursor-pointer transition-colors"
                >
                  {token.logoURI && (
                    <img
                      src={token.logoURI}
                      alt={token.symbol}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div>
                    <div className="text-white font-medium">{token.symbol}</div>
                    <div className="text-gray-400 text-sm">{token.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div ref={chartContainerRef} className="w-full h-[400px]" />
    </div>
  );
}
