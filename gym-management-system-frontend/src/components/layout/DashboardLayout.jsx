import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CreditCard, LogOut, Users, UserCog, MessageSquare } from 'lucide-react';
import { logoutAdmin } from '../../utils/auth.js';

export default function DashboardLayout({ children }) {
  const nav = useNavigate();
  const links = [
    ['/admin/dashboard', 'Dashboard', LayoutDashboard],
    ['/admin/members', 'Members', Users],
    ['/admin/payments', 'Payments', CreditCard],
    ['/admin/enquiries', 'Enquiries', MessageSquare],
    ['/admin/trainers', 'Trainers', UserCog],
  ];

  const handleLogout = () => {
    logoutAdmin();
    nav('/admin');
  };

  return (
    <div className="min-h-screen bg-brand-dark">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-white/10 bg-black/60 p-6 lg:block">
        <h2 className="text-2xl font-black gradient-text">Admin Panel</h2>
        <div className="mt-8 space-y-2">
          {links.map(([to, label, Icon]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold ${isActive ? 'bg-brand-orange text-black' : 'text-white/70 hover:bg-white/5'}`
              }
            >
              <Icon size={18} />{label}
            </NavLink>
          ))}
        </div>
        <button onClick={handleLogout} className="absolute bottom-6 flex items-center gap-3 text-white/50 hover:text-white">
          <LogOut size={18} /> Logout
        </button>
      </aside>
      <main className="p-4 lg:ml-72 lg:p-8">{children}</main>
    </div>
  );
}
