import { Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

export default function Button({
  children,
  to,
  className = "",
  variant = "primary",
  loading = false,
  loadingText = "Please wait...",
  disabled = false,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition duration-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100";

  const styles =
    variant === "outline"
      ? "border border-white/15 hover:border-brand-orange hover:bg-white/5"
      : "bg-gradient-to-r from-brand-red via-brand-orange to-brand-yellow text-black shadow-glow hover:scale-105";

  if (to) {
    return (
      <Link
        to={to}
        className={`${base} ${styles} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`${base} ${styles} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <LoaderCircle size={18} className="animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}