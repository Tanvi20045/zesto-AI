import { useState } from "react";
import { Package, ShoppingBag, Users, TrendingUp, Plus, Trash2 } from "lucide-react";
import { PRODUCTS } from "../utils/data";

const STATS = [
  { label: "Total Orders",   value: "1,284", icon: ShoppingBag, color: "bg-blue-50 text-blue-600" },
  { label: "Total Products", value: "48",    icon: Package,     color: "bg-green-50 text-green-600" },
  { label: "Total Users",    value: "5,210", icon: Users,       color: "bg-purple-50 text-purple-600" },
  { label: "Revenue",        value: "₹2.4L", icon: TrendingUp,  color: "bg-orange-50 text-[#ff5722]" },
];

function AdminPage() {
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState(PRODUCTS);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", category: "", price: "", mrp: "", qty: "", image: "" });

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleAdd() {
    if (!form.name || !form.price) return alert("Name and price are required.");
    const newProduct = {
      ...form,
      _id: Date.now().toString(),
      price: Number(form.price),
      mrp: Number(form.mrp) || Number(form.price),
      rating: 4.5,
    };
    setProducts((p) => [newProduct, ...p]);
    setForm({ name: "", category: "", price: "", mrp: "", qty: "", image: "" });
    setShowAdd(false);
    // TODO: await api.post("/products", newProduct);
  }

  function handleDelete(id) {
    if (!window.confirm("Delete this product?")) return;
    setProducts((p) => p.filter((item) => item._id !== id));
    // TODO: await api.delete(`/products/${id}`);
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 fade-up">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 style={{ fontFamily: "Syne, sans-serif" }} className="text-2xl font-black text-gray-900">
          Admin Panel
        </h1>
        <span className="bg-orange-100 text-[#ff5722] text-xs font-bold px-3 py-1.5 rounded-full">
          ⚙️ Admin
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-[#ebebeb] p-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon size={18} />
            </div>
            <p style={{ fontFamily: "Syne, sans-serif" }} className="text-2xl font-black text-gray-900">
              {s.value}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 border-b border-[#ebebeb] pb-0">
        {["products", "orders"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-semibold capitalize border-b-2 transition -mb-px ${
              tab === t
                ? "border-[#ff5722] text-[#ff5722]"
                : "border-transparent text-gray-400 hover:text-gray-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "products" && (
        <>
          {/* Add product button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowAdd((v) => !v)}
              className="flex items-center gap-2 bg-[#ff5722] hover:bg-[#e64a19] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition"
            >
              <Plus size={16} /> Add Product
            </button>
          </div>

          {/* Add product form */}
          {showAdd && (
            <div className="bg-white border border-[#ebebeb] rounded-2xl p-5 mb-5 grid sm:grid-cols-3 gap-3">
              {[
                { name: "name",     placeholder: "Product name" },
                { name: "category", placeholder: "Category" },
                { name: "price",    placeholder: "Price (₹)" },
                { name: "mrp",      placeholder: "MRP (₹)" },
                { name: "qty",      placeholder: "Qty label (e.g. 500g)" },
                { name: "image",    placeholder: "Image URL" },
              ].map((field) => (
                <input
                  key={field.name}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="bg-[#f7f7f5] border border-[#ebebeb] focus:border-[#ff5722] outline-none rounded-xl px-4 py-2.5 text-sm transition"
                />
              ))}
              <button
                onClick={handleAdd}
                className="sm:col-span-3 bg-[#ff5722] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-[#e64a19] transition"
              >
                Save Product
              </button>
            </div>
          )}

          {/* Products table */}
          <div className="bg-white rounded-2xl border border-[#ebebeb] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#ebebeb] bg-[#f7f7f5]">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Product</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Price</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Rating</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border-b border-[#ebebeb] hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-xl object-cover border border-[#ebebeb]"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">{p.name}</p>
                          <p className="text-xs text-gray-400">{p.qty}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{p.category}</td>
                    <td className="px-4 py-3 font-bold text-gray-800">₹{p.price}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="bg-green-50 text-green-700 text-xs font-bold px-2 py-0.5 rounded-lg">
                        ★ {p.rating}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="text-gray-300 hover:text-red-500 transition"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === "orders" && (
        <div className="bg-white rounded-2xl border border-[#ebebeb] p-8 text-center text-gray-400">
          <p className="text-4xl mb-3">📦</p>
          <p className="font-semibold">Orders will appear here once backend is connected</p>
          <p className="text-sm mt-1">Connect to <code className="bg-gray-100 px-1 rounded">GET /api/orders</code></p>
        </div>
      )}

    </main>
  );
}

export default AdminPage;
