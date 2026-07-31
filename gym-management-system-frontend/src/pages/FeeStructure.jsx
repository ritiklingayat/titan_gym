import SectionTitle from "../components/common/SectionTitle.jsx";
import Card from "../components/common/Card.jsx";
import { plans, programs } from "../data/gymData.js";
import { money } from "../utils/format.js";

export default function FeeStructure() {
  const regularPlans = plans.filter((plan) => plan.type === "regular");
  const personalTrainingPlans = plans.filter((plan) => plan.type === "pt");

  return (
    <section className="px-4 py-16">
      <SectionTitle
        eyebrow="Fees"
        title="Fee Structure"
      />

      <div className="mx-auto max-w-5xl space-y-10">

        {/* Regular Gym Plans */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-blue-400">
            Regular Gym Membership Plans
          </h2>

          <Card className="overflow-x-auto border border-blue-500/30">
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr className="border-b border-blue-500/30 bg-blue-500/10 text-blue-400">
                  <th className="p-4">Plan</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Benefits</th>
                </tr>
              </thead>

              <tbody>
                {regularPlans.map((plan) => (
                  <tr
                    key={plan.id}
                    className="border-b border-white/10 transition hover:bg-blue-500/10"
                  >
                    <td className="p-4 font-bold">
                      {plan.name}
                    </td>

                    <td className="p-4">
                      {plan.duration}
                    </td>

                    <td className="p-4 font-bold text-blue-400">
                      {money(plan.price)}
                    </td>

                    <td className="p-4">
                      {plan.features.join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Personal Training Plans */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-orange-400">
            Personal Training Plans
          </h2>

          <Card className="overflow-x-auto border border-orange-500/30">
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr className="border-b border-orange-500/30 bg-orange-500/10 text-orange-400">
                  <th className="p-4">Plan</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Benefits</th>
                </tr>
              </thead>

              <tbody>
                {personalTrainingPlans.map((plan) => (
                  <tr
                    key={plan.id}
                    className="border-b border-white/10 transition hover:bg-orange-500/10"
                  >
                    <td className="p-4 font-bold">
                      {plan.name}
                    </td>

                    <td className="p-4">
                      {plan.duration}
                    </td>

                    <td className="p-4 font-bold text-orange-400">
                      {money(plan.price)}
                    </td>

                    <td className="p-4">
                      {plan.features.join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Special Fitness Programs */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-brand-yellow">
            Special Fitness Programs
          </h2>

          <Card className="overflow-x-auto border border-yellow-500/30">
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr className="border-b border-yellow-500/30 bg-yellow-500/10 text-brand-yellow">
                  <th className="p-4">Program</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Benefits</th>
                </tr>
              </thead>

              <tbody>
                {programs.map((program) => (
                  <tr
                    key={program.title}
                    className="border-b border-white/10 transition hover:bg-yellow-500/10"
                  >
                    <td className="p-4 font-bold">
                      {program.title}
                    </td>

                    <td className="p-4">
                      Monthly
                    </td>

                    <td className="p-4 font-bold text-brand-yellow">
                      {money(program.price)}
                    </td>

                    <td className="p-4">
                      {program.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

      </div>
    </section>
  );
}