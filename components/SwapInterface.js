import { useState, useEffect } from "react";
import TokenSelector from "./TokenSelector";
import TokenModal from "./TokenModal";
import { Connection, Transaction, VersionedTransaction } from "@solana/web3.js";

export default function SwapInterface({ walletAddress, tokens }) {
  const [fromToken, setFromToken] = useState(null);
  const [toToken, setToToken] = useState(null);
  const [amount, setAmount] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showFromTokenModal, setShowFromTokenModal] = useState(false);
  const [showToTokenModal, setShowToTokenModal] = useState(false);

  // Get quote when amount or tokens change
  useEffect(() => {
    if (fromToken && toToken && amount && parseFloat(amount) > 0) {
      getQuote();
    } else {
      setExpectedOutput("");
    }
  }, [fromToken, toToken, amount]);

  const getQuote = async () => {
    if (!fromToken || !toToken || !amount || parseFloat(amount) <= 0) return;

    setLoading(true);
    setError("");

    try {
      const lamports = Math.floor(
        parseFloat(amount) * Math.pow(10, fromToken.decimals)
      );
      const response = await fetch(
        `https://quote-api.jup.ag/v6/quote?inputMint=${fromToken.address}&outputMint=${toToken.address}&amount=${lamports}&slippageBps=50`
      );

      if (!response.ok) throw new Error("Failed to get quote");

      const quote = await response.json();
      const outAmount = quote.outAmount / Math.pow(10, toToken.decimals);

      setExpectedOutput(outAmount.toFixed(6));
    } catch (err) {
      console.error("Quote error:", err);
      setError("Failed to get quote. Please try again.");
      setExpectedOutput("");
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = async () => {
    if (
      !fromToken ||
      !toToken ||
      !amount ||
      !walletAddress ||
      parseFloat(amount) <= 0
    ) {
      setError("Please fill all fields correctly");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Convert amount to lamports
      const lamports = Math.floor(
        parseFloat(amount) * Math.pow(10, fromToken.decimals)
      );

      // Get quote
      const quoteResponse = await fetch(
        `https://quote-api.jup.ag/v6/quote?inputMint=${fromToken.address}&outputMint=${toToken.address}&amount=${lamports}&slippageBps=50`
      );

      if (!quoteResponse.ok) throw new Error("Failed to get quote");
      const quote = await quoteResponse.json();

      // Get swap transaction
      const swapResponse = await fetch("https://quote-api.jup.ag/v6/swap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quoteResponse: quote,
          userPublicKey: walletAddress,
          wrapAndUnwrapSol: true,
          dynamicComputeUnitLimit: true,
          prioritizationFeeLamports: "auto",
        }),
      });

      if (!swapResponse.ok) throw new Error("Failed to get swap transaction");
      const swapData = await swapResponse.json();

      // Execute transaction
      const { solana } = window;

      // Convert base64 to transaction
      const swapTransactionBuf = Buffer.from(
        swapData.swapTransaction,
        "base64"
      );
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);

      // Sign and send transaction
      const { signature } = await solana.signAndSendTransaction(transaction);

      console.log("Swap successful:", signature);

      // Success animation and reset
      const successDiv = document.createElement("div");
      successDiv.className =
        "fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 animate-slide-in";
      successDiv.innerHTML = `
         <div class="flex items-center gap-2">
           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
           <span>Swap Successful!</span>
         </div>
       `;
      document.body.appendChild(successDiv);
      setTimeout(() => successDiv.remove(), 3000);

      // Reset form
      setAmount("");
      setExpectedOutput("");
    } catch (err) {
      console.error("Swap error:", err);
      setError(`Swap failed: ${err.message || "Please try again."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-[2px] rounded-2xl bg-[linear-gradient(to_right,#3F50E3,#9333EA)] ">
      <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#3F50E3] shadow-xl overflow-hidden ">
        {/* Header */}
        <div className="p-6 border-b border-purple-500/20">
          <h2 className="text-xl font-bold text-white">Swap Tokens</h2>
        </div>

        <div className="p-6 space-y-6">
          {/* From Token Section */}
          <div className="bg-black/40 rounded-xl p-4 border border-purple-500/10">
            <label className="block text-sm font-medium text-gray-400 mb-3">
              From
            </label>
            <div className="flex gap-4">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 bg-transparent text-white text-2xl font-bold outline-none placeholder-gray-600"
                placeholder="0.00"
              />
              <button
                onClick={() => setShowFromTokenModal(true)}
                className="bg-black/60 backdrop-blur-sm border border-purple-500/20 text-white px-3 py-3 rounded-lg flex items-center gap-2 min-w-[120px] justify-between hover:bg-black/80 transition-all duration-200"
              >
                <div className="flex items-center gap-2">
                  {fromToken ? (
                    <>
                      {fromToken.logoURI && (
                        <img
                          src={fromToken.logoURI}
                          alt={fromToken.symbol}
                          className="w-5 h-5 rounded-full"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `data:image/svg+xml,<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="8" fill="%236366F1"/><text x="10" y="13" text-anchor="middle" fill="white" font-size="8" font-family="Arial">${fromToken.symbol.charAt(
                              0
                            )}</text></svg>`;
                          }}
                        />
                      )}
                      <span className="font-medium text-sm">
                        {fromToken.symbol}
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-400 text-sm">Select</span>
                  )}
                </div>
                <svg
                  className="w-4 h-4 text-gray-400"
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
            </div>
          </div>

          {/* Swap Button */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-purple-500/20"></div>
            </div>
            <div className="relative flex justify-center">
              <button
                onClick={() => {
                  setFromToken(toToken);
                  setToToken(fromToken);
                }}
                className="bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 p-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m-3 8l3-3 3 3M17 8v12m-3-8l3 3 3-3"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* To Token Section */}
          <div className="bg-black/40 rounded-xl p-4 border border-purple-500/10">
            <label className="block text-sm font-medium text-gray-400 mb-3">
              To
            </label>
            <div className="flex gap-4">
              <input
                type="text"
                value={expectedOutput}
                readOnly
                className="flex-1 bg-transparent text-white text-2xl font-bold outline-none placeholder-gray-600"
                placeholder={loading ? "Loading..." : "0.00"}
              />
              <button
                onClick={() => setShowToTokenModal(true)}
                className="bg-black/60 backdrop-blur-sm border border-purple-500/20 text-white px-3 py-3 rounded-lg flex items-center gap-2 min-w-[120px] justify-between hover:bg-black/80 transition-all duration-200"
              >
                <div className="flex items-center gap-2">
                  {toToken ? (
                    <>
                      {toToken.logoURI && (
                        <img
                          src={toToken.logoURI}
                          alt={toToken.symbol}
                          className="w-5 h-5 rounded-full"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `data:image/svg+xml,<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="8" fill="%236366F1"/><text x="10" y="13" text-anchor="middle" fill="white" font-size="8" font-family="Arial">${toToken.symbol.charAt(
                              0
                            )}</text></svg>`;
                          }}
                        />
                      )}
                      <span className="font-medium text-sm">
                        {toToken.symbol}
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-400 text-sm">Select</span>
                  )}
                </div>
                <svg
                  className="w-4 h-4 text-gray-400"
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
            </div>
          </div>

          {/* Transaction Details */}
          {expectedOutput && !loading && (
            <div className="bg-black/30 rounded-xl p-4 space-y-2 text-sm border border-purple-500/10">
              <div className="flex justify-between text-gray-400">
                <span>Rate</span>
                <span className="text-white">
                  1 {fromToken?.symbol} ={" "}
                  {(parseFloat(expectedOutput) / parseFloat(amount)).toFixed(6)}{" "}
                  {toToken?.symbol}
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Network Fee</span>
                <span className="text-white">~ 0.001 SOL</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Minimum Received</span>
                <span className="text-white">
                  {(parseFloat(expectedOutput) * 0.995).toFixed(6)}{" "}
                  {toToken?.symbol}
                </span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            disabled={
              loading ||
              !fromToken ||
              !toToken ||
              !amount ||
              parseFloat(amount) <= 0
            }
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-800 text-white font-bold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              "Swap"
            )}
          </button>
        </div>
      </div>
      {/* Token Selection Modals */}
      <TokenModal
        isOpen={showFromTokenModal}
        onClose={() => setShowFromTokenModal(false)}
        tokens={tokens}
        selectedToken={fromToken}
        onSelect={(token) => {
          setFromToken(token);
          setShowFromTokenModal(false);
        }}
        title="Select Token to Swap From"
      />

      <TokenModal
        isOpen={showToTokenModal}
        onClose={() => setShowToTokenModal(false)}
        tokens={tokens}
        selectedToken={toToken}
        onSelect={(token) => {
          setToToken(token);
          setShowToTokenModal(false);
        }}
        title="Select Token to Receive"
      />
    </div>
  );
}
