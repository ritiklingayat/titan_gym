// import { plans } from '../data/gymData.js';

// const STORAGE_KEY = 'gms_members';

// function planById(id) {
//   return plans.find((p) => p.id === id) || plans[0];
// }

// function addMonths(dateStr, months) {
//   const d = new Date(dateStr);
//   d.setMonth(d.getMonth() + Number(months || 0));
//   return d.toISOString().slice(0, 10);
// }

// function todayStr() {
//   return new Date().toISOString().slice(0, 10);
// }

// function seedRaw() {
//   return [
//     {
//       id: 'seed-1', name: 'Piyush Badjate', mobile: '9876543210', age: 24,
//       address: 'Nandanvan Colony, Chh. Sambhajinagar', photo: null,
//       planId: 'quarterly', joinDate: '2026-07-05', paidAmount: 3999,
//       payments: [{ id: 'p1', date: '2026-07-05', amount: 3999, mode: 'UPI' }],
//     },
//     {
//       id: 'seed-2', name: 'Ritik Patil', mobile: '9876500001', age: 21,
//       address: 'Vishnugiri Apartment, Nandanvan Colony', photo: null,
//       planId: 'monthly', joinDate: '2026-07-01', paidAmount: 0, payments: [],
//     },
//     {
//       id: 'seed-3', name: 'Aniket More', mobile: '9876511112', age: 27,
//       address: 'MG Road, Sambhajinagar', photo: null,
//       planId: 'yearly', joinDate: '2026-06-20', paidAmount: 11999,
//       payments: [{ id: 'p2', date: '2026-06-20', amount: 11999, mode: 'Card' }],
//     },
//     {
//       id: 'seed-4', name: 'Sneha Kale', mobile: '9876522223', age: 30,
//       address: 'Station Road, Sambhajinagar', photo: null,
//       planId: 'halfyearly', joinDate: '2026-01-12', paidAmount: 0, payments: [],
//     },
//   ];
// }

// function getRawList() {
//   const raw = localStorage.getItem(STORAGE_KEY);
//   if (!raw) {
//     const seeded = seedRaw();
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
//     return seeded;
//   }
//   try {
//     const list = JSON.parse(raw);
//     return Array.isArray(list) ? list : [];
//   } catch {
//     return [];
//   }
// }

// function saveRawList(list) {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
// }

// // Turns a stored "raw" member into a full member object with all
// // derived fields (total fee, balance, expiry date, status) computed fresh.
// function build(raw) {
//   const plan = planById(raw.planId);
//   const totalFee = plan.price;
//   const paidAmount = Number(raw.paidAmount) || 0;
//   const balance = Math.max(totalFee - paidAmount, 0);
//   const expiryDate = addMonths(raw.joinDate, plan.months);
//   const today = todayStr();
//   let status = 'Active';
//   if (balance > 0) status = 'Pending';
//   else if (expiryDate < today) status = 'Expired';

//   return {
//     id: raw.id,
//     name: raw.name,
//     mobile: raw.mobile,
//     age: raw.age,
//     address: raw.address,
//     photo: raw.photo || null,
//     gender: raw.gender || '',
//     trainer: raw.trainer || 'without',
//     trainerId: raw.trainerId || '',
//     planId: plan.id,
//     planName: plan.name,
//     joinDate: raw.joinDate,
//     expiryDate,
//     totalFee,
//     paidAmount,
//     balance,
//     status,
//     payments: raw.payments || [],
//   };
// }

// export function getMembers() {
//   return getRawList()
//     .map(build)
//     .sort((a, b) => (b.joinDate || '').localeCompare(a.joinDate || ''));
// }

// export function getMember(id) {
//   const raw = getRawList().find((m) => m.id === id);
//   return raw ? build(raw) : null;
// }

// export function addMember(data) {
//   const list = getRawList();
//   const id = 'm-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
//   const paidAmount = Number(data.paidAmount) || 0;
//   const payments = paidAmount > 0
//     ? [{ id: 'p-' + Date.now(), date: data.joinDate || todayStr(), amount: paidAmount, mode: data.mode || 'Cash' }]
//     : [];
//   const raw = {
//     id,
//     name: data.name,
//     mobile: data.mobile,
//     age: data.age ? Number(data.age) : '',
//     address: data.address || '',
//     photo: data.photo || null,
//     gender: data.gender || '',
//     trainer: data.trainer || 'without',
//     trainerId: data.trainerId || '',
//     planId: data.planId,
//     joinDate: data.joinDate || todayStr(),
//     paidAmount,
//     payments,
//   };
//   list.push(raw);
//   saveRawList(list);
//   return build(raw);
// }

// export function updateMember(id, patch) {
//   const list = getRawList();
//   const idx = list.findIndex((m) => m.id === id);
//   if (idx === -1) return null;
//   list[idx] = { ...list[idx], ...patch };
//   saveRawList(list);
//   return build(list[idx]);
// }

// export function deleteMember(id) {
//   const list = getRawList().filter((m) => m.id !== id);
//   saveRawList(list);
// }

// // Record a new fee payment against a member (adds to payment history and paid total).
// export function recordPayment(id, amount, mode = 'Cash', date = todayStr()) {
//   const list = getRawList();
//   const idx = list.findIndex((m) => m.id === id);
//   if (idx === -1) return null;
//   const amt = Number(amount) || 0;
//   const payments = [...(list[idx].payments || []), { id: 'p-' + Date.now(), date, amount: amt, mode }];
//   list[idx] = { ...list[idx], paidAmount: (Number(list[idx].paidAmount) || 0) + amt, payments };
//   saveRawList(list);
//   return build(list[idx]);
// }

// // Directly correct a member's total paid amount (e.g. fixing a data-entry mistake).
// export function setPaidAmount(id, newPaidAmount, note = 'Manual correction') {
//   const list = getRawList();
//   const idx = list.findIndex((m) => m.id === id);
//   if (idx === -1) return null;
//   const amt = Number(newPaidAmount) || 0;
//   const payments = [...(list[idx].payments || []), { id: 'p-' + Date.now(), date: todayStr(), amount: amt - (Number(list[idx].paidAmount) || 0), mode: note }];
//   list[idx] = { ...list[idx], paidAmount: amt, payments };
//   saveRawList(list);
//   return build(list[idx]);
// }
