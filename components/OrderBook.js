const OrderBook = ({ metrics }) => {
  const orderBookData = [];

  // Generate deterministic order book data
  if (metrics) {
    for (let i = 0; i < 10; i++) {
      const offset = (i - 5) * 0.1;
      const price = metrics.price + offset;
      const amount = 5 + (i % 3) * 2;
      const isBid = i >= 5;

      orderBookData.push({
        price: price.toFixed(4),
        amount: amount.toFixed(2),
        isBid,
      });
    }
  }

  return (
    <div className="bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-xl p-4">
      <h3 className="text-white font-bold mb-4">Order Book</h3>
      <div className="space-y-1 text-sm">
        {orderBookData.map((order, i) => (
          <div key={i} className="flex justify-between">
            <span className={order.isBid ? "text-green-400" : "text-red-400"}>
              {order.price}
            </span>
            <span className="text-gray-400">{order.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
