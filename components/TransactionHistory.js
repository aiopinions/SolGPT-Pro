export default function TransactionHistory({ transactions }) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg">
          No transaction history found
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-purple-500/20">
              <th className="text-left py-3 px-2 text-gray-400 text-sm font-medium">
                Signature
              </th>
              <th className="text-left py-3 px-2 text-gray-400 text-sm font-medium">
                Status
              </th>
              <th className="text-left py-3 px-2 text-gray-400 text-sm font-medium hidden md:table-cell">
                Time
              </th>
              <th className="text-right py-3 px-2 text-gray-400 text-sm font-medium">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr
                key={index}
                className="border-b border-purple-500/10 hover:bg-purple-500/5"
              >
                <td className="py-4 px-2">
                  <div className="font-mono text-white text-sm">
                    {tx.signature?.slice(0, 8)}...{tx.signature?.slice(-8)}
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs ${
                      tx.err
                        ? "bg-red-500/20 text-red-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {tx.err ? "Failed" : "Success"}
                  </span>
                </td>
                <td className="py-4 px-2 text-gray-400 text-sm hidden md:table-cell">
                  {new Date(tx.blockTime * 1000).toLocaleString()}
                </td>
                <td className="py-4 px-2 text-right">
                  <a
                    href={`https://solscan.io/tx/${tx.signature}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    View →
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
