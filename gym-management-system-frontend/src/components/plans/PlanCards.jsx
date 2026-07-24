import { CheckCircle } from 'lucide-react';
import Card from '../common/Card.jsx';
import Button from '../common/Button.jsx';
import { plans } from '../../data/gymData.js';
import { money } from '../../utils/format.js';
export default function PlanCards(){return <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">{plans.map(p=><Card key={p.id} className="relative flex flex-col hover:-translate-y-2 transition"><span className="absolute right-5 top-5 rounded-full bg-brand-orange px-3 py-1 text-xs font-black text-black">{p.tag}</span><h3 className="mt-8 text-2xl font-black">{p.name}</h3><p className="mt-2 text-white/50">{p.duration}</p><p className="my-6 text-4xl font-black gradient-text">{money(p.price)}</p><ul className="mb-8 flex-1 space-y-3">{p.features.map(f=><li key={f} className="flex gap-2 text-sm text-white/70"><CheckCircle className="text-brand-yellow" size={18}/>{f}</li>)}</ul><Button to="/contact">Enquire Now</Button></Card>)}</div>}
