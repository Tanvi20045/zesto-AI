import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import api from "../services/api";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.password) return setError("All fields are required.");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", form);
      setAuth(data.user, data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm fade-up">

        {/* Logo */}
        <div className="text-center mb-8">
          <span
            style={{ fontFamily: "Syne, sans-serif" }}
            className="text-4xl font-black text-[#ff5722]"
          >
            Zesto
          </span>
          <p className="text-gray-400 text-sm mt-1">Login to your account</p>
        </div>

        <div className="bg-white rounded-3xl border border-[#ebebeb] p-6 shadow-sm">

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@email.com"
                className="mt-1.5 w-full bg-[#f7f7f5] border border-[#ebebeb] focus:border-[#ff5722] outline-none rounded-xl px-4 py-3 text-sm transition"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</label>
              <div className="relative mt-1.5">
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-[#f7f7f5] border border-[#ebebeb] focus:border-[#ff5722] outline-none rounded-xl px-4 py-3 text-sm transition pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ff5722] hover:bg-[#e64a19] disabled:opacity-60 text-white py-3.5 rounded-xl font-bold text-sm transition"
            >
              {loading ? "Logging in…" : "Login"}
            </button>

          </form>

          <p className="text-center text-sm text-gray-400 mt-5">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#ff5722] font-semibold hover:underline">
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;
