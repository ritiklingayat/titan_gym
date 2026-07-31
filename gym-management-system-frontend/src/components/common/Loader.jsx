import { LoaderCircle } from "lucide-react";

export default function Loader({
  text = "Loading...",
  fullPage = false,
  size = 34,
}) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <LoaderCircle
        size={size}
        className="animate-spin text-brand-orange"
      />

      {text && (
        <p className="text-sm font-semibold text-white/60">
          {text}
        </p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-[200] grid place-items-center bg-black/70 backdrop-blur-sm">
        <div className="glass min-w-[220px] rounded-3xl px-8 py-4 shadow-2xl">
          {content}
        </div>
      </div>
    );
  }

  return content;
}