export default function Card({ children, className = '' }) {
  return <div className={`glass rounded-3xl p-6 shadow-2xl ${className}`}>{children}</div>;
}
