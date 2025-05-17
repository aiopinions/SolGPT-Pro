export default function ConnectWallet({ walletAddress, setWalletAddress }) {
  const connectWallet = async () => {
    try {
      const { solana } = window;

      if (!solana) {
        alert("Phantom wallet not found! Get it at https://phantom.app/");
        return;
      }

      if (solana.isPhantom) {
        const response = await solana.connect();
        setWalletAddress(response.publicKey.toString());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const disconnectWallet = async () => {
    try {
      const { solana } = window;
      if (solana && solana.isPhantom) {
        await solana.disconnect();
        setWalletAddress(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {!walletAddress ? (
        <button
          onClick={connectWallet}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="bg-black/60 backdrop-blur-md border border-purple-500/20 px-3 py-2 md:px-4 md:py-3 rounded-full flex items-center gap-3 md:gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white font-mono text-xs md:text-sm">
              {`${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`}
            </span>
          </div>
          <button
            onClick={disconnectWallet}
            className="text-gray-400 hover:text-white transition-colors text-sm"
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
