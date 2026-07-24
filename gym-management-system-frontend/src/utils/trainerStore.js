// import { trainers as defaultTrainers } from '../data/gymData.js';

// const STORAGE_KEY = 'gms_trainers';

// function getRawList() {
//   const raw = localStorage.getItem(STORAGE_KEY);
//   if (!raw) {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTrainers));
//     return defaultTrainers;
//   }
//   try {
//     const list = JSON.parse(raw);
//     return Array.isArray(list) ? list : [];
//   } catch {
//     return [];
//   }
// }

// export function getTrainers() {
//   return getRawList();
// }

// export function addTrainer(data) {
//   const trainer = {
//     id: `trainer-${Date.now()}`,
//     name: data.name.trim(),
//     mobile: data.mobile.trim(),
//     age: Number(data.age),
//     experience: data.experience.trim(),
//     address: data.address.trim(),
//     img: data.photo || null,
//     role: 'Fitness Trainer',
//   };
//   const list = getRawList();
//   list.push(trainer);
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
//   return trainer;
// }

// export function updateTrainer(identifier, data) {
//   const list = getRawList();
//   const index = list.findIndex((trainer) => (trainer.id || trainer.name) === identifier);
//   if (index === -1) return null;
//   const existing = list[index];
//   list[index] = {
//     ...existing,
//     name: data.name.trim(),
//     mobile: data.mobile.trim(),
//     age: Number(data.age),
//     experience: data.experience.trim(),
//     address: data.address.trim(),
//     img: data.photo || existing.img || null,
//   };
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
//   return list[index];
// }

// export function deleteTrainer(identifier) {
//   const list = getRawList().filter((trainer) => (trainer.id || trainer.name) !== identifier);
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
// }
