import { useState, useEffect } from "react";
import TokenBalanceSelector from "./TokenBalanceSelector";
import {
  Connection,
  Transaction,
  PublicKey,
  clusterApiUrl,
  SystemProgram,
} from "@solana/web3.js";
import {
  createTransferInstruction,
  getOrCreateAssociatedTokenAccount,
  getAccount,
} from "@solana/spl-token";

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

export default function TokenTransfer({ walletAddress }) {
  const [selectedToken, setSelectedToken] = useState(null);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [tokenBalances, setTokenBalances] = useState([]);
  const [solBalance, setSolBalance] = useState(0);

  // Fetch wallet balances
  useEffect(() => {
    if (walletAddress) {
      fetchBalances();
    }
  }, [walletAddress]);

  const fetchBalances = async () => {
    try {
      const RPC_URL =
        process.env.NEXT_PUBLIC_RPC_URL ||
        "https://api.mainnet-beta.solana.com";
      const connection = new Connection(RPC_URL);

      // Fetch SOL balance
      const balance = await connection.getBalance(new PublicKey(walletAddress));
      setSolBalance(balance / 1e9);

      // Fetch token balances
      const response = await fetch(RPC_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "getTokenAccountsByOwner",
          params: [
            walletAddress,
            { programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" },
            { encoding: "jsonParsed" },
          ],
        }),
      });

      const data = await response.json();
      if (data.result) {
        // Fetch token metadata for each token
        const tokens = await Promise.all(
          data.result.value
            .map(async (account) => {
              const info = account.account.data.parsed.info;

              // Fetch token metadata
              let metadata = {
                symbol: "Unknown",
                name: "Unknown Token",
                logoURI: null,
              };

              try {
                // Try to fetch metadata from token list
                const metadataResponse = await fetch(
                  `https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json`
                );
                const tokenList = await metadataResponse.json();
                const tokenMetadata = tokenList.tokens.find(
                  (token) => token.address === info.mint
                );

                if (tokenMetadata) {
                  metadata = {
                    symbol: tokenMetadata.symbol,
                    name: tokenMetadata.name,
                    logoURI: tokenMetadata.logoURI,
                  };
                }
              } catch (metadataError) {
                console.warn(
                  `Failed to fetch metadata for ${info.mint}:`,
                  metadataError
                );
              }

              return {
                mint: info.mint,
                amount: info.tokenAmount.uiAmount || 0,
                decimals: info.tokenAmount.decimals,
                address: account.pubkey,
                symbol: metadata.symbol,
                name: metadata.name,
                logoURI: metadata.logoURI,
              };
            })
            .filter((token) => {
              // Only process tokens with balance
              const info = data.result.value.find(
                (acc) => acc.pubkey === token.address
              );
              return (
                info && info.account.data.parsed.info.tokenAmount.uiAmount > 0
              );
            })
        );

        setTokenBalances(tokens);
      }
    } catch (err) {
      console.error("Error fetching balances:", err);
      // Set default values on error
      setSolBalance(0);
      setTokenBalances([]);
    }
  };

  const handleTransfer = async () => {
    if (
      !selectedToken ||
      !recipientAddress ||
      !amount ||
      parseFloat(amount) <= 0
    ) {
      setError("Please fill all fields correctly");
      return;
    }

    // Validate recipient address
    try {
      new PublicKey(recipientAddress);
    } catch (err) {
      setError("Invalid recipient address");
      return;
    }

    if (parseFloat(amount) > selectedToken.amount) {
      setError("Insufficient balance");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { solana } = window;
      const connection = new Connection(clusterApiUrl("mainnet-beta"));

      if (selectedToken.type === "sol") {
        // Transfer SOL
        const transaction = new Transaction();

        // Get recent blockhash
        const recentBlockhash = await connection.getRecentBlockhash();
        transaction.recentBlockhash = recentBlockhash.blockhash;
        transaction.feePayer = new PublicKey(walletAddress);

        // Fix: Use SystemProgram.transfer as a static method, not a constructor
        const instruction = SystemProgram.transfer({
          fromPubkey: new PublicKey(walletAddress),
          toPubkey: new PublicKey(recipientAddress),
          lamports: Math.floor(parseFloat(amount) * 1e9),
        });

        transaction.add(instruction);

        const { signature } = await solana.signAndSendTransaction(transaction);
        setSuccess(`SOL transfer successful! Transaction: ${signature}`);
      } else {
        // Transfer SPL Token
        const fromTokenAccount = await getAccount(
          connection,
          new PublicKey(selectedToken.address)
        );

        const toTokenAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          walletAddress, // payer
          new PublicKey(selectedToken.mint),
          new PublicKey(recipientAddress)
        );

        const transaction = new Transaction();
        const instruction = createTransferInstruction(
          fromTokenAccount.address,
          toTokenAccount.address,
          new PublicKey(walletAddress),
          Math.floor(parseFloat(amount) * Math.pow(10, selectedToken.decimals))
        );

        transaction.add(instruction);

        const { signature } = await solana.signAndSendTransaction(transaction);
        setSuccess(`Token transfer successful! Transaction: ${signature}`);
      }

      // Reset form
      setAmount("");
      setRecipientAddress("");

      // Refresh balances
      await fetchBalances();
    } catch (err) {
      console.error("Transfer error:", err);
      setError(`Transfer failed: ${err.message || "Please try again."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Token Balance Display */}
      <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6">
        <h2 className="text-xl font-bold text-white mb-4">
          Your Token Balances
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* SOL Balance */}
          <div className="bg-black/40 rounded-lg p-4 border border-purple-500/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold">◎</span>
              </div>
              <div>
                <div className="text-white font-medium">SOL</div>
                <div className="text-gray-400 text-sm">
                  {solBalance.toFixed(4)} SOL
                </div>
              </div>
            </div>
          </div>

          {/* Token Balances */}
          {tokenBalances.map((token, index) => (
            <div
              key={index}
              className="bg-black/40 rounded-lg p-4 border border-purple-500/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <span className="text-white font-bold">
                    {token.symbol.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-white font-medium">{token.symbol}</div>
                  <div className="text-gray-400 text-sm">
                    {token.amount.toFixed(6)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transfer Form */}
      <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-purple-500/20 overflow-hidden">
        <div className="p-6 border-b border-purple-500/20">
          <h2 className="text-xl font-bold text-white">
            Transfer Fee Calculate
          </h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Token Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3">
              Select Token
            </label>
            <TokenBalanceSelector
              selectedToken={selectedToken}
              setSelectedToken={setSelectedToken}
              tokenBalances={tokenBalances}
              solBalance={solBalance}
            />
          </div>

          {/* Recipient Address */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3">
              Recipient Address
            </label>
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className="w-full bg-black/40 border border-purple-500/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-500"
              placeholder="Enter Solana wallet address..."
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3">
              Amount
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-black/40 border border-purple-500/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-500"
                placeholder="0.00"
              />
              {selectedToken && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <span className="text-gray-400">{selectedToken.symbol}</span>
                  <button
                    onClick={() => setAmount(selectedToken.amount.toString())}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    MAX
                  </button>
                </div>
              )}
            </div>
            {selectedToken && (
              <div className="mt-2 text-sm text-gray-400">
                Available: {selectedToken.amount} {selectedToken.symbol}
              </div>
            )}
          </div>

          {/* Transaction Fee Estimate */}
          {amount && selectedToken && (
            <div className="bg-black/30 rounded-lg p-4 border border-purple-500/10">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Network Fee</span>
                <span className="text-white">~0.00001 SOL</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-400">You will send</span>
                <span className="text-white">
                  {amount} {selectedToken.symbol}
                </span>
              </div>
            </div>
          )}

          {/* Success/Error Messages */}
          {success && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-green-400 text-sm">
              {success}
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
