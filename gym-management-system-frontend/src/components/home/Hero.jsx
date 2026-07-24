import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Star, Users } from "lucide-react";
import Button from "../common/Button.jsx";
import { images } from "../../data/gymData.js";
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-dark/70 to-brand-dark" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 lg:grid-cols-2 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 inline-flex rounded-full border border-brand-orange/40 px-4 py-2 text-sm font-bold text-brand-yellow">
            Premium Gym Management System
          </p>
          <h1 className="text-5xl font-black leading-tight md:text-7xl">
            Transform Your Gym Into a{" "}
            <span className="gradient-text">Digital Fitness Brand</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/70">
            Every Rep brings you closer to the strongest version of yourself.The
            pain you feel today becomes the strength you need tomorrow
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button to="/plans">
              Join Now <ArrowRight size={18} />
            </Button>
            <Button to="/admin" variant="outline">
              Admin Login
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            <div>
              <Users className="mx-auto text-brand-orange" />
              <b className="mt-2 block text-2xl">850+</b>
              <span className="text-sm text-white/50">Members</span>
            </div>
            <div>
              <Star className="mx-auto text-brand-yellow" />
              <b className="mt-2 block text-2xl">4.9</b>
              <span className="text-sm text-white/50">Rating</span>
            </div>
            <div>
              <ShieldCheck className="mx-auto text-brand-red" />
              <b className="mt-2 block text-2xl">100%</b>
              <span className="text-sm text-white/50">Secure UI</span>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <img
            src={images.hero}
            className="h-[560px] w-full rounded-[2rem] object-cover shadow-glow"
          />
          <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-black/70 p-5 backdrop-blur">
            <p className="font-bold">Today’s Batch</p>
            <p className="text-white/60">
              CrossFit • Muscle Gain • Weight Loss • Yoga
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
