import Hero from "../components/home/Hero.jsx";
import SectionTitle from "../components/common/SectionTitle.jsx";
import Card from "../components/common/Card.jsx";
import PlanCards from "../components/plans/PlanCards.jsx";
import { images, programs, trainers } from "../data/gymData.js";
import * as Icons from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Membership */}
      <section className="px-4 py-20">
        <SectionTitle
          eyebrow="Membership"
          title="Choose Your Fitness Plan"
          text="Flexible pricing cards that can be edited after you share the real fee structure photo."
        />

        <div className="mx-auto max-w-7xl">
          <PlanCards />
        </div>
      </section>

      {/* About */}
      <section className="bg-black/40 px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <img
            src={images.about}
            alt="About Gym"
            className="h-full min-h-[420px] rounded-[2rem] object-cover"
          />

          <div>
            <SectionTitle
              eyebrow="About"
              title="Modern Gym Experience"
              text="Built for premium gyms that need online enquiries, payments, customer dashboard and admin control."
            />

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Certified Trainers",
                "Steam & Locker",
                "Cardio Zone",
                "Strength Area",
              ].map((x) => (
                <Card key={x}>
                  <h3 className="font-bold">{x}</h3>
                  <p className="mt-2 text-sm text-white/55">
                    Professional facility module ready for client customization.
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="px-4 py-20">
        <SectionTitle
          eyebrow="Programs"
          title="Courses & Training Modules"
        />

        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => {
            const Icon = Icons[p.icon] || Icons.Dumbbell;

            return (
              <Card key={p.title} className="hover:border-brand-orange/60">
                <Icon className="text-brand-orange" />

                <h3 className="mt-4 text-xl font-black">
                  {p.title}
                </h3>

                <p className="mt-2 text-white/60">
                  {p.desc}
                </p>

                <p className="mt-4 font-black text-brand-yellow">
                  ₹{p.price}/month
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Trainers */}
      <section className="bg-black/40 px-4 py-20">
        <SectionTitle
          eyebrow="Experts"
          title="Meet Our Trainers"
        />

        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {trainers.map((t) => (
            <Card key={t.name}>
              <img
                src={t.img}
                alt={t.name}
                className="h-72 w-full rounded-2xl object-cover"
              />

              <h3 className="mt-5 text-xl font-black">
                {t.name}
              </h3>

              <p className="text-brand-yellow">
                {t.role}
              </p>

              <p className="text-white/50">
                Experience: {t.exp}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Floating Social Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">

        {/* Instagram */}
        <a
          href="https://www.instagram.com/titan.gym._13?igsh=Znl5NWhmaTNsZzJs"
          target="_blank"
          rel="noopener noreferrer"
          title="Follow us on Instagram"
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-6"
        >
          <FaInstagram
            size={28}
            className="text-white"
          />
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/917218885074"
          target="_blank"
          rel="noopener noreferrer"
          title="Chat with us on WhatsApp"
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-6"
        >
          <FaWhatsapp
            size={30}
            className="text-white"
          />
        </a>

      </div>
    </>
  );
}