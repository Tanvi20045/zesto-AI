import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, CreditCard, CheckCircle } from "lucide-react";
import { useCartStore } from "../store/cartStore";

const PAYMENT_METHODS = [
  { id: "upi",    label: "UPI",              icon: "📱" },
  { id: "card",   label: "Credit/Debit Card", icon: "💳" },
  { id: "cod",    label: "Cash on Delivery", icon: "💵" },
];

function CheckoutPage() {
  const { cart, getTotal, clearCart } = useCartStore();
  const [address, setAddress] = useState({
    line1: "", city: "Gurugram", pincode: "", phone: "",
  });
  const [payMethod, setPayMethod] = useState("upi");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const total       = getTotal();
  const deliveryFee = total > 0 && total < 200 ? 25 : 0;
  const platformFee = total > 0 ? 5 : 0;
  const grandTotal  = total + deliveryFee + platformFee;

  function handleChange(e) {
    setAddress((a) => ({ ...a, [e.target.name]: e.target.value }));
  }

  async function handlePlaceOrder() {
    if (!address.line1 || !address.pincode || !address.phone)
      return alert("Please fill all address fields.");
    setLoading(true);

    // TODO: Replace with real API call
    // await api.post("/orders", { items: cart, address, payMethod, total: grandTotal });

    setTimeout(() => {
      clearCart();
      setDone(true);
      setLoading(false);
    }, 1500);
  }

  // Order success screen
  if (done) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 fade-up">
        <div className="text-7xl mb-4">🎉</div>
        <h2
          style={{ fontFamily: "Syne, sans-serif" }}
          className="text-3xl font-black text-gray-900"
        >
          Order Placed!
        </h2>
        <p className="text-gray-400 mt-2 max-w-xs">
          Your order is confirmed. Delivery in <strong className="text-[#ff5722]">10 minutes</strong>.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-8 px-8 py-3 bg-[#ff5722] text-white rounded-2xl font-bold hover:bg-[#e64a19] transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <span className="text-5xl">🛒</span>
        <p className="text-lg font-bold text-gray-700 mt-4">Cart is empty</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2.5 bg-[#ff5722] text-white rounded-xl text-sm font-bold"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 fade-up">
      <h1
        style={{ fontFamily: "Syne, sans-serif" }}
        className="text-2xl font-black text-gray-900 mb-6"
      >
        Checkout
      </h1>

      <div className="grid md:grid-cols-[1fr_360px] gap-6">

        {/* Left col */}
        <div className="space-y-5">

          {/* Delivery address */}
          <div className="bg-white rounded-3xl border border-[#ebebeb] p-5">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={16} className="text-[#ff5722]" />
              <h3 style={{ fontFamily: "Syne, sans-serif" }} className="font-bold text-gray-800">
                Delivery Address
              </h3>
            </div>
            <div className="space-y-3">
              <input
                name="line1"
                value={address.line1}
                onChange={handleChange}
                placeholder="House no., Street, Area"
                className="w-full bg-[#f7f7f5] border border-[#ebebeb] focus:border-[#ff5722] outline-none rounded-xl px-4 py-3 text-sm transition"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  name="city"
                  value={address.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="bg-[#f7f7f5] border border-[#ebebeb] focus:border-[#ff5722] outline-none rounded-xl px-4 py-3 text-sm transition"
                />
                <input
                  name="pincode"
                  value={address.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  className="bg-[#f7f7f5] border border-[#ebebeb] focus:border-[#ff5722] outline-none rounded-xl px-4 py-3 text-sm transition"
                />
              </div>
              <input
                name="phone"
                value={address.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-full bg-[#f7f7f5] border border-[#ebebeb] focus:border-[#ff5722] outline-none rounded-xl px-4 py-3 text-sm transition"
              />
            </div>
          </div>

          {/* Payment method */}
          <div className="bg-white rounded-3xl border border-[#ebebeb] p-5">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard size={16} className="text-[#ff5722]" />
              <h3 style={{ fontFamily: "Syne, sans-serif" }} className="font-bold text-gray-800">
                Payment Method
              </h3>
            </div>
            <div className="space-y-2">
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPayMethod(m.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl border transition text-sm font-medium
                    ${payMethod === m.id
                      ? "border-[#ff5722] bg-orange-50 text-[#ff5722]"
                      : "border-[#ebebeb] text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  <span className="text-xl">{m.icon}</span>
                  {m.label}
                  {payMethod === m.id && (
                    <CheckCircle size={16} className="ml-auto text-[#ff5722]" />
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right col — order summary */}
        <div>
          <div className="bg-white rounded-3xl border border-[#ebebeb] p-5 sticky top-20">
            <h3
              style={{ fontFamily: "Syne, sans-serif" }}
              className="font-bold text-gray-800 mb-4"
            >
              Order Summary
            </h3>

            <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar mb-4">
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between text-sm text-gray-600">
                  <span className="truncate pr-2">{item.name} × {item.qty}</span>
                  <span className="flex-shrink-0 font-medium">₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#ebebeb] pt-3 space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Items total</span><span>₹{total}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Delivery</span>
                {deliveryFee === 0
                  ? <span className="text-green-600 font-medium">FREE</span>
                  : <span>₹{deliveryFee}</span>
                }
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Platform fee</span><span>₹{platformFee}</span>
              </div>
              <div className="flex justify-between font-black text-gray-900 text-base pt-2 border-t border-[#ebebeb]">
                <span>Total</span><span>₹{grandTotal}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="mt-5 w-full bg-[#ff5722] hover:bg-[#e64a19] disabled:opacity-60 text-white py-4 rounded-2xl font-bold text-sm transition"
            >
              {loading ? "Placing order…" : `Pay ₹${grandTotal}`}
            </button>

            <p className="text-center text-xs text-gray-400 mt-3">
              ⚡ Delivery in 10 minutes after payment
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}

export default CheckoutPage;
