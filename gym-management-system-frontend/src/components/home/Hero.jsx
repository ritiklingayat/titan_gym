import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

import Button from "../common/Button.jsx";
import { images } from "../../data/gymData.js";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-grid">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-dark/70 to-brand-dark" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-5 inline-flex rounded-full border border-brand-orange/40 bg-brand-orange/5 px-4 py-2 text-sm font-bold text-brand-yellow">
            Strength • Fitness • Wellness
          </p>

          <h1 className="text-5xl font-black leading-tight md:text-6xl lg:text-7xl">
            Transform Your Body Into{" "}
            <span className="gradient-text">
              Your Strongest Version
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-white/70 md:text-lg">
            Every workout brings you one step closer to a stronger and
            healthier life. Train with expert coaches, modern equipment, and a
            motivating fitness community.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Button to="/plans">
              View Membership Plans
              <ArrowRight size={18} />
            </Button>

            <Button to="/contact" variant="outline">
              Book Free Trial
            </Button>
          </div>

          {/* Trust features */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
            <span className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-brand-orange" />
              Certified Trainers
            </span>

            <span className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-brand-orange" />
              Modern Equipment
            </span>

            <span className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-brand-orange" />
              Personal Training
            </span>
          </div>

          {/* Statistics */}
          <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
              <Users className="mx-auto text-brand-orange" size={24} />
              <b className="mt-2 block text-2xl">850+</b>
              <span className="text-xs text-white/50">
                Active Members
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
              <Star className="mx-auto text-brand-yellow" size={24} />
              <b className="mt-2 block text-2xl">4.9</b>
              <span className="text-xs text-white/50">
                Member Rating
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
              <Award className="mx-auto text-brand-red" size={24} />
              <b className="mt-2 block text-2xl">8+</b>
              <span className="text-xs text-white/50">
                Expert Trainers
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
              <ShieldCheck
                className="mx-auto text-brand-orange"
                size={24}
              />
              <b className="mt-2 block text-2xl">6 AM</b>
              <span className="text-xs text-white/50">
                Daily Opening
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-brand-orange/20 to-brand-red/10 blur-2xl" />

          <img
            src={images.hero}
            alt="Gym members training with professional equipment"
            className="relative h-[420px] w-full rounded-[2rem] object-cover shadow-glow sm:h-[500px] lg:h-[560px]"
          />

          <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/10 bg-black/75 p-5 backdrop-blur-md">
            <p className="text-lg font-bold text-white">
              Training Programs
            </p>

            <p className="mt-1 text-sm leading-6 text-white/60">
              Strength Training • Weight Loss • Personal Training • Cardio
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}