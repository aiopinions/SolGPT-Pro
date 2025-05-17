export default function TransactionHistoryTrading({ transactions, loading }) {
  if (loading) {
    return (
      <div className="bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-xl p-4 mt-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between">
              <div className="h-4 bg-gray-700 rounded w-16"></div>
              <div className="h-4 bg-gray-700 rounded w-20"></div>
              <div className="h-4 bg-gray-700 rounded w-24"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-xl overflow-hidden mt-6">
      <div className="p-4 border-b border-purple-500/20">
        <h3 className="text-white font-bold">Recent Transactions</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-purple-500/20">
              <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                Time
              </th>
              <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                Type
              </th>
              <th className="text-right py-3 px-4 text-gray-400 text-sm font-medium">
                Price
              </th>
              <th className="text-right py-3 px-4 text-gray-400 text-sm font-medium">
                Amount
              </th>
              <th className="text-right py-3 px-4 text-gray-400 text-sm font-medium">
                Volume
              </th>
              <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                Trader
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr
                key={tx.id}
                className="border-b border-purple-500/10 hover:bg-purple-500/5"
              >
                <td className="py-3 px-4 text-gray-400 text-sm">
                  {new Date(tx.time).toLocaleTimeString()}
                </td>
                <td className="py-3 px-4 text-sm">
                  <span
                    className={`${
                      tx.type === "Buy" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {tx.type}
                  </span>
                </td>
                <td className="py-3 px-4 text-right text-white text-sm">
                  ${tx.price}
                </td>
                <td className="py-3 px-4 text-right text-white text-sm">
                  {tx.amount}
                </td>
                <td className="py-3 px-4 text-right text-white text-sm">
                  ${tx.volume}
                </td>
                <td className="py-3 px-4 text-sm">
                  <a
                    href="#"
                    className="text-purple-400 hover:text-purple-300 font-mono"
                  >
                    {tx.trader}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
