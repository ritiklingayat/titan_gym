
import im1 from "../assets/im1.png";
import im2 from "../assets/im2.jpeg";
import image from "../assets/image.png";

import im3 from "../assets/im3.jpeg";
import im4 from "../assets/im4.jpeg";
import im5 from "../assets/im5.jpeg";
import im6 from "../assets/im6.jpeg";
import im7 from "../assets/im7.jpeg";
import im8 from "../assets/im8.jpeg";
import im9 from "../assets/im9.jpeg";
import im10 from "../assets/im10.jpeg";
export const images = {
  hero: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80',
  about: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80',
  gallery: [
    //'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=900&q=80',
    im1,
    image,
    im2,
    im7,
    im5,
    im10,
    im8,
    im9
    // 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
    // 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=80',
    // 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=900&q=80',
    // 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=80',
    // 'https://images.unsplash.com/photo-1605296867424-35fc25c9212a?auto=format&fit=crop&w=900&q=80',
  ],
};

export const plans = [
  // Without Trainer Plans
  {
    id: "monthly_basic",
    name: "1 Month Without Cardio",
    price: 600,
    months: 1,
    duration: "1 Month",
    tag: "Basic",
    type: "regular",
    features: [
      "Gym access",
      "Basic workout chart",
      "Locker support",
      "No cardio access",
    ],
  },
  {
    id: "monthly",
    name: "1 Month With Cardio",
    price: 1399,
    months: 1,
    duration: "1 Month",
    tag: "Starter",
    type: "regular",
    features: [
      "Gym access",
      "Cardio zone",
      "Basic workout chart",
      "Locker support",
    ],
  },
  {
    id: "quarterly",
    name: "3 Month Plan",
    price: 6500,
    months: 3,
    duration: "3 Months",
    tag: "Popular",
    type: "regular",
    features: [
      "Everything monthly",
      "Fitness assessment",
      "Diet consultation",
      "Progress tracking",
    ],
  },
  {
    id: "halfyearly",
    name: "6 Month Plan",
    price: 12000,
    months: 6,
    duration: "6 Months",
    tag: "Value",
    type: "regular",
    features: [
      "Gym access",
      "Fitness assessment",
      "Diet consultation",
      "Progress tracking",
    ],
  },

  // With Trainer Plans
  {
    id: "pt_cardio_monthly",
    name: "1 Month P.T. With Cardio",
    price: 1600,
    months: 1,
    duration: "1 Month",
    tag: "Basic P.T.",
    type: "pt",
    features: [
      "Personal trainer",
      "Gym access",
      "Cardio access",
      "Trainer guidance",
    ],
  },
  {
    id: "pt_monthly",
    name: "One Month General P.T.",
    price: 2399,
    months: 1,
    duration: "1 Month",
    tag: "Starter",
    type: "pt",
    features: [
      "Personal trainer",
      "Gym access",
      "Customized workout plan",
      "Trainer guidance",
    ],
  },
  {
    id: "pt_yearly",
    name: "One Month Premium P.T.",
    price: 5000,
    months: 1,
    duration: "1 Month",
    tag: "Premium",
    type: "pt",
    features: [
      "Premium personal trainer",
      "Customized plan",
      "Full nutrition support",
      "Priority booking",
    ],
  },
];

export const programs = [
  { title: 'Weight Loss Program', price: 2999, icon: 'Flame', desc: 'Fat-loss workouts, cardio schedule, diet guidance and weekly tracking.' },
  { title: 'Muscle Gain Program', price: 3499, icon: 'Dumbbell', desc: 'Strength training, hypertrophy routines, nutrition and trainer supervision.' },
  { title: 'Personal Training', price: 5999, icon: 'UserCheck', desc: '1:1 coaching, custom fitness goals and premium progress tracking.' },
  { title: 'Cardio & Endurance', price: 1999, icon: 'HeartPulse', desc: 'Treadmill, cycling, HIIT and stamina-building workouts.' },
  { title: 'Yoga & Mobility', price: 1799, icon: 'Sparkles', desc: 'Flexibility, posture, breathing and recovery sessions.' },
  { title: 'CrossFit Batch', price: 3999, icon: 'Activity', desc: 'High intensity functional training with group motivation.' },
];

export const trainers = [
  { name: 'Aarav Sharma', role: 'Strength Coach', exp: '8 Years', img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=600&q=80' },
  { name: 'Neha Verma', role: 'Weight Loss Expert', exp: '6 Years', img: 'https://images.unsplash.com/photo-1609899464726-209befaac5bc?auto=format&fit=crop&w=600&q=80' },
  { name: 'Rohan Mehta', role: 'CrossFit Trainer', exp: '7 Years', img: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=600&q=80' },
];
