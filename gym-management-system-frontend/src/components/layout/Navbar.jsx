import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Dumbbell, Menu, X } from "lucide-react";
import Button from "../common/Button.jsx";
const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/plans", "Plans"],
  ["/fee-structure", "Fees"],
  ["/programs", "Programs"],
  ["/trainers", "Trainers"],
  ["/gallery", "Gallery"],
  ["/contact", "Contact"],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const item = "text-sm font-semibold text-white/75 hover:text-brand-yellow";
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-dark/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-3 text-xl font-black">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-brand-red to-brand-yellow text-black">
            <Dumbbell />
          </span>
          Titan<span className="gradient-text">Fitness</span>
        </Link>
        <div className="hidden items-center gap-6 lg:flex">
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${item} ${isActive ? "text-brand-yellow" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
          <Button to="/admin" variant="outline">
            Admin Login
          </Button>
        </div>
        <button className="lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-white/10 px-4 pb-4 lg:hidden">
          {links.map(([to, label]) => (
            <NavLink
              onClick={() => setOpen(false)}
              key={to}
              to={to}
              className="block py-3 text-white/80"
            >
              {label}
            </NavLink>
          ))}
          <div className="flex gap-3 pt-3">
            <Button to="/admin" variant="outline">
              Admin Login
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
