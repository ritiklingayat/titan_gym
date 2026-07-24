import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LogIn } from 'lucide-react';
import Card from '../components/common/Card.jsx';
import Button from '../components/common/Button.jsx';
import { loginAdmin, isAdminAuthed } from '../utils/auth.js';

export default function AdminLogin() {
  const nav = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAdminAuthed()) nav('/admin/dashboard');
  }, [nav]);

  const onSubmit = (data) => {
    const ok = loginAdmin(data.email, data.password);
    if (ok) {
      nav('/admin/dashboard');
    } else {
      setError('Incorrect email or password. Please try again.');
    }
  };

  return (
    <section className="grid min-h-screen place-items-center bg-grid px-4">
      <Card className="w-full max-w-md">
        <p className="font-bold text-brand-orange">/admin</p>
        <h1 className="mt-2 text-4xl font-black">Admin Login</h1>
        <p className="mt-2 text-sm text-white/50">Sign in to manage members, fees and payments.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4">
          <input
            {...register('email')}
            type="email"
            required
            placeholder="Admin Email"
            className="rounded-2xl border border-white/10 bg-black/40 p-4"
          />
          <input
            {...register('password')}
            type="password"
            required
            placeholder="Password"
            className="rounded-2xl border border-white/10 bg-black/40 p-4"
          />
          {error && <p className="text-sm font-semibold text-brand-red">{error}</p>}
          <Button className="w-full justify-center">
            <LogIn size={18} /> Login to Admin Panel
          </Button>
        </form>
      </Card>
    </section>
  );
}
