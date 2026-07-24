import SectionTitle from "../components/common/SectionTitle.jsx";
import Card from "../components/common/Card.jsx";
import { plans, programs } from "../data/gymData.js";
import { money } from "../utils/format.js";
export default function FeeStructure() {
  return (
    <section className="px-4 py-16">
      <SectionTitle
        eyebrow="Fees"
        title="Fee Structure"
        
      />
      <Card className="mx-auto max-w-5xl overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead>
            <tr className="border-b border-white/10 text-brand-yellow">
              <th className="p-4">Plan</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Benefits</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((p) => (
              <tr key={p.id} className="border-b border-white/10">
                <td className="p-4 font-bold">{p.name}</td>
                <td>{p.duration}</td>
                <td>{money(p.price)}</td>
                <td>{p.features.slice(0, 2).join(", ")}</td>
              </tr>
            ))}
            {programs.map((p) => (
              <tr key={p.title} className="border-b border-white/10">
                <td className="p-4 font-bold">{p.title}</td>
                <td>Monthly</td>
                <td>{money(p.price)}</td>
                <td>{p.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </section>
  );
}
