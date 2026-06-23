import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

interface Toast {
  id: number;
  message: string;
}

let toastId = 0;

export function showToast(message: string) {
  window.dispatchEvent(new CustomEvent("poms:toast", { detail: message }));
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    function onToast(e: Event) {
      const message = (e as CustomEvent<string>).detail;
      const id = ++toastId;
      setToasts((prev) => [...prev, { id, message }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    }
    window.addEventListener("poms:toast", onToast);
    return () => window.removeEventListener("poms:toast", onToast);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed right-6 top-6 z-[9999] flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="toast-slide-in flex items-center gap-3 rounded-lg border border-gold/30 bg-luxury-black px-5 py-3.5 text-sm font-medium text-white shadow-xl"
        >
          <CheckCircle className="size-5 shrink-0 text-green-400" />
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
