import { useNavigate } from "react-router-dom";
import { Package, ChevronRight } from "lucide-react";

const MOCK_ORDERS = [
  {
    id: "ORD001",
    date: "16 May 2026",
    status: "Delivered",
    items: ["Amul Milk x2", "Banana x1"],
    total: 91,
  },
  {
    id: "ORD002",
    date: "15 May 2026",
    status: "Out for Delivery",
    items: ["Apple Shimla x1", "Eggs x1"],
    total: 192,
  },
  {
    id: "ORD003",
    date: "13 May 2026",
    status: "Delivered",
    items: ["Coca-Cola x2", "Chips x3"],
    total: 140,
  },
];

const STATUS_COLORS = {
  "Delivered":        "bg-green-100 text-green-700",
  "Out for Delivery": "bg-blue-100 text-blue-700",
  "Processing":       "bg-yellow-100 text-yellow-700",
  "Cancelled":        "bg-red-100 text-red-700",
};

function OrdersPage() {
  const navigate = useNavigate();

  return (
    <main className="max-w-2xl mx-auto px-4 py-8 fade-up">
      <h1
        style={{ fontFamily: "Syne, sans-serif" }}
        className="text-2xl font-black text-gray-900 mb-6"
      >
        My Orders
      </h1>

      {MOCK_ORDERS.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Package size={48} className="text-gray-200" />
          <p className="text-lg font-bold text-gray-500 mt-4">No orders yet</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2.5 bg-[#ff5722] text-white rounded-xl text-sm font-bold"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {MOCK_ORDERS.map((order) => (
            <div
              key={order.id}
              onClick={() => navigate(`/orders/${order.id}`)}
              className="bg-white border border-[#ebebeb] rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition"
            >
              <div className="bg-orange-50 p-3 rounded-xl">
                <Package size={20} className="text-[#ff5722]" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-gray-800">{order.id}</p>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${
                      STATUS_COLORS[order.status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
                <p className="text-xs text-gray-500 mt-1 truncate">
                  {order.items.join(", ")}
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-gray-900">₹{order.total}</p>
                <ChevronRight size={16} className="text-gray-300 mt-1 ml-auto" />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default OrdersPage;
