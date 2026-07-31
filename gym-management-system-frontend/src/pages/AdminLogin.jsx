import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LogIn, Eye, EyeOff } from "lucide-react";

import Card from "../components/common/Card.jsx";
import Button from "../components/common/Button.jsx";
import { loginAdmin, isAdminAuthed } from "../utils/auth.js";

export default function AdminLogin() {
  const nav = useNavigate();

  const { register, handleSubmit } = useForm();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAdminAuthed()) {
      nav("/admin/dashboard");
    }
  }, [nav]);

  const onSubmit = (data) => {
    setError("");

    const ok = loginAdmin(data.email, data.password);

    if (ok) {
      nav("/admin/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <section className="grid min-h-screen place-items-center bg-grid px-4">
      <Card className="w-full max-w-md rounded-3xl p-8">

        {/* Logo */}
        {/* Replace with your logo if available */}
        {/* <img src={logo} alt="Gym Logo" className="mx-auto mb-4 h-16 w-16" /> */}

        <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">
          ADMIN PORTAL
        </p>

        <h1 className="mt-2 text-4xl font-black">
          Admin Login
        </h1>

        <p className="mt-3 text-sm leading-6 text-white/60">
          Access the admin dashboard to manage members,
          memberships, attendance and payments.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >
          {/* Email */}
          <input
            {...register("email")}
            type="email"
            required
            placeholder="Email Address"
            className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 outline-none transition focus:border-brand-orange"
          />

          {/* Password */}
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 pr-14 outline-none transition focus:border-brand-orange"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-brand-orange"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400">
              {error}
            </div>
          )}

          {/* Login Button */}
          <Button className="w-full justify-center">
            <LogIn size={18} />
            Login
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 border-t border-white/10 pt-5 text-center">
          <p className="text-xs text-white/40">
            Authorized Personnel Only
          </p>
        </div>
      </Card>
    </section>
  );
}