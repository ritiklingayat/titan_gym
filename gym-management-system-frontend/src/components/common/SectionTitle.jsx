export default function SectionTitle({ eyebrow, title, text }) {
  return <div className="mx-auto mb-10 max-w-3xl text-center">
    <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-brand-orange">{eyebrow}</p>
    <h2 className="text-3xl font-black md:text-5xl">{title}</h2>
    {text && <p className="mt-4 text-white/65">{text}</p>}
  </div>;
}
