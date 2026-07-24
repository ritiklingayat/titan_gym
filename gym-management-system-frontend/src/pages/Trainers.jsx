import SectionTitle from "../components/common/SectionTitle.jsx";
import Card from "../components/common/Card.jsx";
import { trainers } from "../data/gymData.js";
export default function Trainers() {
  return (
    <section className="px-4 py-16">
      <SectionTitle eyebrow="Team" title="Professional Trainers" />
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
        {trainers.map((t) => (
          <Card key={t.name}>
            <img src={t.img} className="h-80 w-full rounded-2xl object-cover" />
            <h3 className="mt-5 text-2xl font-black">{t.name}</h3>
            <p className="text-brand-yellow">{t.role}</p>
            <p className="text-white/55">{t.exp} experience</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
