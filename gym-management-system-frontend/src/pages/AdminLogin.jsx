import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LogIn, Eye, EyeOff } from "lucide-react";

import Card from "../components/common/Card.jsx";
import Button from "../components/common/Button.jsx";
import { loginAdmin, isAdminAuthed } from "../utils/auth.js";

// Import your background image
// Change the filename/path according to your project
import loginBg from "../assets/login.jpg";

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
    <section
      className="relative grid min-h-screen place-items-center px-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${loginBg})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/65"></div>

      {/* Login Card */}
      <Card className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-black/50 p-8 backdrop-blur-md">

        {/* Logo */}
        {/* Uncomment if you have a logo */}
        {/* <img src={logo} alt="Gym Logo" className="mx-auto mb-5 h-20 w-20 object-contain" /> */}

        <p className="text-center text-sm font-bold uppercase tracking-[4px] text-brand-orange">
          ADMIN PORTAL
        </p>

        <h1 className="mt-3 text-center text-4xl font-black text-white">
          Admin Login
        </h1>

        <p className="mt-3 text-center text-sm leading-6 text-white/70">
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
            className="w-full rounded-2xl border border-white/20 bg-white/10 p-4 text-white placeholder:text-white/50 outline-none transition-all duration-300 focus:border-brand-orange focus:bg-white/15"
          />

          {/* Password */}
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              className="w-full rounded-2xl border border-white/20 bg-white/10 p-4 pr-14 text-white placeholder:text-white/50 outline-none transition-all duration-300 focus:border-brand-orange focus:bg-white/15"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 transition hover:text-brand-orange"
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
          <Button className="w-full justify-center py-4 text-base font-semibold">
            <LogIn size={18} />
            Login
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 border-t border-white/10 pt-5 text-center">
          <p className="text-xs tracking-wide text-white/50">
            Authorized Personnel Only
          </p>
        </div>
      </Card>
    </section>
  );
}