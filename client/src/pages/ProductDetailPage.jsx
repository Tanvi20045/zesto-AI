import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Zap, Plus, Minus, ShieldCheck } from "lucide-react";
import { PRODUCTS } from "../utils/data";
import { useCartStore } from "../store/cartStore";
import ProductCard from "../components/product/ProductCard";

function ProductDetailPage() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p._id === id);
  const { cart, addToCart, increaseQty, decreaseQty } = useCartStore();
  const cartItem = cart.find((i) => i._id === id);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <span className="text-5xl">😕</span>
        <p className="text-lg font-bold text-gray-700 mt-4">Product not found</p>
        <Link to="/" className="mt-4 text-sm text-[#ff5722] underline">Go back home</Link>
      </div>
    );
  }

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const related = PRODUCTS.filter((p) => p.category === product.category && p._id !== id).slice(0, 4);

  return (
    <main className="max-w-6xl mx-auto px-4 py-6 fade-up">

      {/* Back */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#ff5722] transition mb-6"
      >
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Image */}
        <div className="bg-white rounded-3xl border border-[#ebebeb] overflow-hidden aspect-square flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div>
          <span className="text-xs font-semibold text-[#ff5722] uppercase tracking-wider">
            {product.category}
          </span>
          <h1
            style={{ fontFamily: "Syne, sans-serif" }}
            className="text-3xl font-black text-gray-900 mt-2 leading-tight"
          >
            {product.name}
          </h1>
          <p className="text-sm text-gray-400 mt-1">{product.qty}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1 bg-green-50 border border-green-100 rounded-lg px-2 py-1">
              <Star size={13} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold text-gray-700">{product.rating}</span>
            </div>
            <span className="text-xs text-gray-400">· 240 ratings</span>
          </div>

          {/* Delivery */}
          <div className="mt-4 flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-2xl px-4 py-3">
            <Zap size={15} className="text-[#ff5722] fill-[#ff5722]" />
            <span className="text-sm font-semibold text-gray-700">
              Delivery in <strong className="text-[#ff5722]">10 minutes</strong>
            </span>
          </div>

          {/* Price */}
          <div className="mt-5 flex items-baseline gap-3">
            <span
              style={{ fontFamily: "Syne, sans-serif" }}
              className="text-4xl font-black text-gray-900"
            >
              ₹{product.price}
            </span>
            {product.mrp > product.price && (
              <>
                <span className="text-lg text-gray-400 line-through">₹{product.mrp}</span>
                <span className="bg-green-100 text-green-700 text-sm font-bold px-2 py-0.5 rounded-lg">
                  {discount}% off
                </span>
              </>
            )}
          </div>

          {/* Add to cart */}
          <div className="mt-6">
            {cartItem ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4 bg-[#ff5722] rounded-2xl px-6 py-3">
                  <button onClick={() => decreaseQty(id)} className="text-white">
                    <Minus size={18} />
                  </button>
                  <span className="text-white font-black text-lg">{cartItem.qty}</span>
                  <button onClick={() => increaseQty(id)} className="text-white">
                    <Plus size={18} />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  ₹{product.price * cartItem.qty} total
                </span>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="flex items-center gap-2 bg-[#ff5722] hover:bg-[#e64a19] text-white px-8 py-3.5 rounded-2xl font-bold text-base transition-transform hover:scale-[1.02]"
              >
                <Plus size={18} /> Add to Cart
              </button>
            )}
          </div>

          {/* Trust badges */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {[
              { icon: "🌱", title: "Farm Fresh",    sub: "Sourced directly" },
              { icon: "❄️", title: "Cold Stored",   sub: "Quality preserved" },
              { icon: "✅", title: "FSSAI Approved", sub: "Safe & certified" },
              { icon: "↩️", title: "Easy Returns",  sub: "Within 24 hours" },
            ].map((b) => (
              <div
                key={b.title}
                className="flex items-center gap-2 bg-[#f7f7f5] rounded-2xl p-3"
              >
                <span className="text-xl">{b.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-gray-800">{b.title}</p>
                  <p className="text-[11px] text-gray-400">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2
            style={{ fontFamily: "Syne, sans-serif" }}
            className="text-xl font-bold text-gray-900 mb-4"
          >
            More from {product.category}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {related.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>
      )}

    </main>
  );
}

export default ProductDetailPage;
