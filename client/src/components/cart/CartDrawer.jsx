import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { X, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "../../store/cartStore";

function CartDrawer() {
  const { cart, isOpen, closeCart, increaseQty, decreaseQty, removeFromCart, getTotal } =
    useCartStore();
  const drawerRef = useRef();

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        closeCart();
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, closeCart]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const total = getTotal();
  const deliveryFee = total > 0 && total < 200 ? 25 : 0;
  const platformFee = total > 0 ? 5 : 0;
  const grandTotal = total + deliveryFee + platformFee;

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl"
        style={{ animation: "slideIn 0.3s ease" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#ebebeb]">
          <div>
            <h2 style={{ fontFamily: "Syne, sans-serif" }} className="text-lg font-bold">
              My Cart
            </h2>
            {cart.length > 0 && (
              <p className="text-xs text-gray-400 mt-0.5">
                ⚡ Delivery in 10 minutes
              </p>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-xl hover:bg-gray-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Empty state */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="text-6xl">🛒</div>
            <p style={{ fontFamily: "Syne, sans-serif" }} className="text-lg font-bold text-gray-800">
              Your cart is empty
            </p>
            <p className="text-sm text-gray-400">
              Add items to get started. Delivery in 10 mins!
            </p>
            <button
              onClick={closeCart}
              className="mt-2 px-6 py-3 bg-[#ff5722] text-white text-sm font-semibold rounded-xl hover:bg-[#e64a19] transition"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3 bg-[#f7f7f5] rounded-2xl p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400">{item.qty}</p>
                    <p className="text-sm font-bold text-[#ff5722] mt-1">
                      ₹{item.price * item.qty}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {/* Qty controls */}
                    <div className="flex items-center gap-2 bg-white border border-[#ebebeb] rounded-xl px-2 py-1">
                      <button
                        onClick={() => decreaseQty(item._id)}
                        className="text-[#ff5722] hover:scale-110 transition"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => increaseQty(item._id)}
                        className="text-[#ff5722] hover:scale-110 transition"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-gray-300 hover:text-red-400 transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Savings nudge */}
              {total < 200 && (
                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-3 text-center">
                  <p className="text-xs text-orange-600 font-medium">
                    Add ₹{200 - total} more for free delivery 🎉
                  </p>
                </div>
              )}
            </div>

            {/* Bill summary */}
            <div className="border-t border-[#ebebeb] px-5 py-4 space-y-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Bill Summary
              </p>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Items total</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery fee</span>
                {deliveryFee === 0 ? (
                  <span className="text-green-600 font-medium">FREE</span>
                ) : (
                  <span>₹{deliveryFee}</span>
                )}
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Platform fee</span>
                <span>₹{platformFee}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-[#ebebeb]">
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>

              <Link
                to="/checkout"
                onClick={closeCart}
                className="mt-3 w-full flex items-center justify-between bg-[#ff5722] hover:bg-[#e64a19] text-white px-5 py-3.5 rounded-2xl font-semibold text-sm transition"
              >
                <span>Proceed to Checkout</span>
                <span>₹{grandTotal} →</span>
              </Link>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}

export default CartDrawer;
