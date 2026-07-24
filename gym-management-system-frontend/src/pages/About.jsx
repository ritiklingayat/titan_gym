import SectionTitle from "../components/common/SectionTitle.jsx";
import Card from "../components/common/Card.jsx";
import { images } from "../data/gymData.js";
export default function About() {
  return (
    <section className="px-4 py-16">
      <SectionTitle
        eyebrow="About Gym"
        title="A Premium Fitness Club "
      />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
        <img src={images.about} className="rounded-[2rem] object-cover" />
        <div className="grid gap-5">
          <Card>
            <h3 className="text-2xl font-black">Why this system?</h3>
            <p className="mt-3 text-white/65">
              Titan Fitness provides expert trainers, modern equipment, personalized workout programs, and a motivating environment to help members achieve their fitness goals safely and effectively.
            </p>
          </Card>
          <Card>
            <h3 className="text-2xl font-black">Our Facilities</h3>
            <p className="mt-3 text-white/65">
              Enjoy world-class fitness facilities including cardio equipment, free weights, functional training area, locker rooms, steam bath, and customized diet guidance.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
