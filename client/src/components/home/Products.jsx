import { PRODUCTS } from "../../utils/data";
import ProductCard from "../product/ProductCard";

// Skeleton loader for individual card
function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[#ebebeb] overflow-hidden">
      <div className="skeleton h-36 w-full" />
      <div className="p-3 space-y-2">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-1/3" />
        <div className="skeleton h-4 w-1/2 mt-3" />
      </div>
    </div>
  );
}

function Products({ activeCategory, searchQuery, loading = false }) {
  // Filter by category
  let filtered =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  // Filter by search
  if (searchQuery?.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  const title =
    searchQuery?.trim()
      ? `Results for "${searchQuery}"`
      : activeCategory === "All"
      ? "All Products"
      : activeCategory;

  return (
    <section className="max-w-6xl mx-auto px-4 mt-6 pb-12">

      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <h2
          style={{ fontFamily: "Syne, sans-serif" }}
          className="text-lg font-bold text-gray-900"
        >
          {title}
          <span className="text-sm font-normal text-gray-400 ml-2">
            ({filtered.length} items)
          </span>
        </h2>
      </div>

      {/* Skeletons while loading */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {Array(8).fill(0).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        // Empty state
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-5xl">🔍</span>
          <p
            style={{ fontFamily: "Syne, sans-serif" }}
            className="text-lg font-bold text-gray-700 mt-4"
          >
            No products found
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Try a different category or search term
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filtered.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}

    </section>
  );
}

export default Products;
