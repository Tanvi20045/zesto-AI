import { Link } from "react-router-dom";
import { Star, Plus, Minus } from "lucide-react";
import { useCartStore } from "../../store/cartStore";

function ProductCard({ product }) {
  const { cart, addToCart, increaseQty, decreaseQty } = useCartStore();
  const cartItem = cart.find((i) => i._id === product._id);

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="bg-white rounded-2xl border border-[#ebebeb] overflow-hidden hover:shadow-md transition-shadow group">

      {/* Image */}
      <Link to={`/product/${product._id}`}>
        <div className="relative bg-[#f7f7f5] h-36 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">
              {discount}% OFF
            </span>
          )}
        </div>
      </Link>

      <div className="p-3">
        {/* Name & qty */}
        <Link to={`/product/${product._id}`}>
          <p className="text-sm font-semibold text-gray-800 leading-tight hover:text-[#ff5722] transition-colors line-clamp-2">
            {product.name}
          </p>
        </Link>
        <p className="text-xs text-gray-400 mt-0.5">{product.qty}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1.5">
          <Star size={11} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-gray-500">{product.rating}</span>
        </div>

        {/* Price + Add button */}
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
            {product.mrp > product.price && (
              <span className="text-xs text-gray-400 line-through ml-1.5">₹{product.mrp}</span>
            )}
          </div>

          {cartItem ? (
            // Qty controller — shown when item is in cart
            <div className="flex items-center gap-1.5 bg-[#ff5722] rounded-xl px-2 py-1">
              <button
                onClick={() => decreaseQty(product._id)}
                className="text-white hover:scale-110 transition"
              >
                <Minus size={13} />
              </button>
              <span className="text-white text-sm font-bold w-4 text-center">
                {cartItem.qty}
              </span>
              <button
                onClick={() => increaseQty(product._id)}
                className="text-white hover:scale-110 transition"
              >
                <Plus size={13} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="flex items-center gap-1 bg-[#ff5722] hover:bg-[#e64a19] text-white px-3 py-1.5 rounded-xl text-xs font-bold transition"
            >
              <Plus size={13} /> Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
