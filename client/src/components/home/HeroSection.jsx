import { useState, useEffect } from "react";
import { Zap } from "lucide-react";

const BANNERS = [
  {
    id: 1,
    tag: "Fresh Deal",
    title: "Fruits & Veggies",
    subtitle: "Up to 40% off · Farm fresh daily",
    cta: "Shop Now",
    emoji: "🥗",
    bg: "from-green-500 to-emerald-600",
    light: "bg-green-400/20",
  },
  {
    id: 2,
    tag: "Daily Staples",
    title: "Dairy & Eggs",
    subtitle: "Free delivery on orders above ₹200",
    cta: "Order Now",
    emoji: "🥛",
    bg: "from-blue-500 to-indigo-600",
    light: "bg-blue-400/20",
  },
  {
    id: 3,
    tag: "Weekend Special",
    title: "Snacks & Drinks",
    subtitle: "Buy 2 get 1 free on all beverages",
    cta: "Grab Deal",
    emoji: "🍿",
    bg: "from-[#ff5722] to-[#ff8a65]",
    light: "bg-orange-400/20",
  },
];

function HeroSection() {
  const [active, setActive] = useState(0);

  // Auto-rotate banners
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((v) => (v + 1) % BANNERS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const banner = BANNERS[active];

  return (
    <section className="max-w-6xl mx-auto px-4 pt-5 pb-2">

      {/* Delivery speed bar */}
      <div className="flex items-center gap-2 mb-4 bg-orange-50 border border-orange-100 rounded-2xl px-4 py-2.5">
        <Zap size={14} className="text-[#ff5722] fill-[#ff5722]" />
        <span className="text-sm font-medium text-gray-700">
          Delivering in <strong className="text-[#ff5722]">10 minutes</strong> to Sector 29, Gurugram
        </span>
        <span className="ml-auto text-xs text-gray-400 border border-gray-200 rounded-lg px-2 py-0.5">
          Change
        </span>
      </div>

      {/* Main banner */}
      <div
        className={`relative bg-gradient-to-r ${banner.bg} rounded-3xl overflow-hidden h-44 md:h-52 transition-all duration-500`}
      >
        {/* Background decoration */}
        <div className={`absolute top-0 right-0 w-64 h-64 ${banner.light} rounded-full translate-x-16 -translate-y-16`} />
        <div className={`absolute bottom-0 left-32 w-32 h-32 ${banner.light} rounded-full translate-y-8`} />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center px-7 justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-white/70">
              {banner.tag}
            </span>
            <h2
              style={{ fontFamily: "Syne, sans-serif" }}
              className="text-3xl md:text-4xl font-black text-white mt-1 leading-tight"
            >
              {banner.title}
            </h2>
            <p className="text-sm text-white/80 mt-1">{banner.subtitle}</p>
            <button className="mt-4 px-5 py-2 bg-white text-gray-900 text-sm font-bold rounded-xl hover:scale-105 transition-transform">
              {banner.cta} →
            </button>
          </div>

          <div className="text-7xl md:text-8xl select-none">{banner.emoji}</div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-7 flex gap-1.5">
          {BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mini promo cards */}
      <div className="grid grid-cols-3 gap-3 mt-3">
        {[
          { emoji: "⚡", label: "10-min delivery",    color: "bg-yellow-50 border-yellow-100" },
          { emoji: "🔒", label: "100% secure pay",    color: "bg-blue-50 border-blue-100" },
          { emoji: "↩️", label: "Easy returns",       color: "bg-green-50 border-green-100" },
        ].map((item) => (
          <div
            key={item.label}
            className={`${item.color} border rounded-2xl px-3 py-2.5 flex items-center gap-2`}
          >
            <span className="text-lg">{item.emoji}</span>
            <span className="text-xs font-medium text-gray-700 leading-tight">{item.label}</span>
          </div>
        ))}
      </div>

    </section>
  );
}

export default HeroSection;
