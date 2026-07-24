import { X } from 'lucide-react';

export default function Modal({ title, onClose, children, wide = false }) {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`glass max-h-[90vh] w-full ${wide ? 'max-w-2xl' : 'max-w-md'} overflow-y-auto rounded-3xl p-6 shadow-2xl`}
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-2xl font-black">{title}</h3>
          <button onClick={onClose} className="rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
