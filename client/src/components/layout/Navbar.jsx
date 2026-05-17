import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, MapPin, Search, User, LogOut, ChevronDown, Package } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";

function Navbar({ searchQuery, setSearchQuery, setActiveCategory }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const openCart = useCartStore((s) => s.openCart);
  const getItemCount = useCartStore((s) => s.getItemCount);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const count = getItemCount();

  function handleSearch(e) {
    setSearchQuery(e.target.value);
    setActiveCategory("All"); // reset category filter on search
  }

  function handleLogout() {
    logout();
    setShowUserMenu(false);
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#ebebeb]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-4">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <span
            style={{ fontFamily: "Syne, sans-serif" }}
            className="text-2xl font-black tracking-tight"
          >
            <span className="text-[#ff5722]">Zesto</span>
            <span className="text-gray-200 text-sm font-medium ml-1">●</span>
          </span>
        </Link>

        {/* Delivery location */}
        <button className="hidden md:flex items-center gap-1.5 text-sm flex-shrink-0 group">
          <MapPin size={14} className="text-[#ff5722]" />
          <div className="text-left">
            <p className="text-[11px] text-gray-400 leading-none">Delivering to</p>
            <p className="font-600 text-gray-800 text-[13px] flex items-center gap-1">
              Sector 29, Gurugram
              <ChevronDown size={12} className="text-gray-400" />
            </p>
          </div>
        </button>

        {/* Search bar */}
        <div className="flex-1 flex items-center gap-2 bg-[#f7f7f5] border border-[#ebebeb] rounded-xl px-3 py-2.5 focus-within:border-[#ff5722] transition-colors">
          <Search size={15} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder='Search "milk, bread, fruits…"'
            className="bg-transparent text-sm outline-none w-full text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 flex-shrink-0">

          {/* User menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu((v) => !v)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition text-sm font-medium text-gray-700"
              >
                <User size={16} />
                <span className="hidden md:block">{user.name?.split(" ")[0]}</span>
                <ChevronDown size={12} className="text-gray-400" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-12 w-44 bg-white border border-[#ebebeb] rounded-2xl shadow-lg overflow-hidden z-50">
                  <Link
                    to="/orders"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    <Package size={15} /> My Orders
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
                    >
                      ⚙️ Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition w-full"
                  >
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-semibold text-[#ff5722] border border-[#ff5722] rounded-xl hover:bg-[#ff5722] hover:text-white transition"
            >
              Login
            </Link>
          )}

          {/* Cart button */}
          <button
            onClick={openCart}
            className="relative p-2.5 bg-[#ff5722] text-white rounded-xl hover:bg-[#e64a19] transition"
            aria-label="Open cart"
          >
            <ShoppingCart size={18} />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-white text-[#ff5722] text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#ff5722]">
                {count}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
}

export default Navbar;
