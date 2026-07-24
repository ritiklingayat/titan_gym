export const money = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
export const makeInvoiceNumber = () => `GMS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
