import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Circle } from "lucide-react";

const STEPS = [
  { label: "Order Placed",      sub: "We received your order",         time: "10:02 AM" },
  { label: "Order Confirmed",   sub: "Store confirmed your items",      time: "10:03 AM" },
  { label: "Packed",            sub: "Your order is packed & ready",    time: "10:06 AM" },
  { label: "Out for Delivery",  sub: "Rider is on the way",             time: "10:09 AM" },
  { label: "Delivered",         sub: "Enjoy your order!",               time: "" },
];

function OrderTrackingPage() {
  const { id } = useParams();

  // In real app: fetch order by id from API
  // const [order, setOrder] = useState(null);
  // useEffect(() => { api.get(`/orders/${id}`).then(r => setOrder(r.data)); }, [id]);

  const currentStep = 3; // 0-indexed — change based on real order status

  return (
    <main className="max-w-lg mx-auto px-4 py-8 fade-up">

      <Link
        to="/orders"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#ff5722] transition mb-6"
      >
        <ArrowLeft size={16} /> My Orders
      </Link>

      {/* Header */}
      <div className="bg-white rounded-3xl border border-[#ebebeb] p-5 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Order ID</p>
            <p
              style={{ fontFamily: "Syne, sans-serif" }}
              className="text-xl font-black text-gray-900 mt-0.5"
            >
              {id}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Estimated</p>
            <p className="text-lg font-black text-[#ff5722]">⚡ 10 min</p>
          </div>
        </div>
      </div>

      {/* Tracking steps */}
      <div className="bg-white rounded-3xl border border-[#ebebeb] p-5">
        <h2
          style={{ fontFamily: "Syne, sans-serif" }}
          className="font-bold text-gray-900 mb-5"
        >
          Live Tracking
        </h2>

        <div className="space-y-0">
          {STEPS.map((step, i) => {
            const done    = i <= currentStep;
            const current = i === currentStep;

            return (
              <div key={step.label} className="flex gap-4">
                {/* Icon + line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors
                      ${done
                        ? "bg-[#ff5722] text-white"
                        : "bg-gray-100 text-gray-300"
                      }`}
                  >
                    {done
                      ? <CheckCircle size={16} />
                      : <Circle size={16} />
                    }
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`w-0.5 h-10 mt-1 rounded-full transition-colors ${
                        i < currentStep ? "bg-[#ff5722]" : "bg-gray-100"
                      }`}
                    />
                  )}
                </div>

                {/* Text */}
                <div className="pb-8">
                  <p
                    className={`text-sm font-semibold ${
                      current ? "text-[#ff5722]" : done ? "text-gray-800" : "text-gray-300"
                    }`}
                  >
                    {step.label}
                    {current && (
                      <span className="ml-2 text-xs bg-orange-100 text-[#ff5722] px-2 py-0.5 rounded-full">
                        Now
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{step.sub}</p>
                  {step.time && done && (
                    <p className="text-xs text-gray-300 mt-0.5">{step.time}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delivery partner */}
      <div className="bg-white rounded-3xl border border-[#ebebeb] p-4 mt-4 flex items-center gap-4">
        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
          🛵
        </div>
        <div>
          <p className="text-xs text-gray-400">Delivery Partner</p>
          <p className="text-sm font-bold text-gray-800">Ravi Kumar</p>
          <p className="text-xs text-gray-400">★ 4.8 · 1,240 deliveries</p>
        </div>
        <a
          href="tel:+919999999999"
          className="ml-auto px-4 py-2 bg-[#ff5722] text-white text-xs font-bold rounded-xl hover:bg-[#e64a19] transition"
        >
          Call
        </a>
      </div>

    </main>
  );
}

export default OrderTrackingPage;
