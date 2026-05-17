import { CATEGORIES } from "../../utils/data";

function Categories({ activeCategory, setActiveCategory }) {
  return (
    <section className="max-w-6xl mx-auto px-4 mt-6">

      <h2
        style={{ fontFamily: "Syne, sans-serif" }}
        className="text-lg font-bold text-gray-900 mb-3"
      >
        Shop by Category
      </h2>

      <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex flex-col items-center gap-1.5 px-5 py-3 rounded-2xl border text-sm font-medium transition-all flex-shrink-0
                ${isActive
                  ? "bg-[#ff5722] text-white border-[#ff5722] shadow-md scale-105"
                  : "bg-white text-gray-600 border-[#ebebeb] hover:border-[#ff5722]/40 hover:bg-orange-50"
                }`}
            >
              <span className="text-2xl">{cat.emoji}</span>
              <span className="text-xs">{cat.name}</span>
            </button>
          );
        })}
      </div>

    </section>
  );
}

export default Categories;
