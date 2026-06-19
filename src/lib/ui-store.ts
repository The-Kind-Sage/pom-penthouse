// Tiny module-level store for UI overlays (booking modal, lightbox)
import { useSyncExternalStore } from "react";

type UIState = {
  bookingOpen: boolean;
  lightboxIndex: number | null;
};

let state: UIState = { bookingOpen: false, lightboxIndex: null };
const listeners = new Set<() => void>();
function emit() {
  listeners.forEach((l) => l());
}
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
function getSnapshot() {
  return state;
}
function getServerSnapshot() {
  return state;
}

export const ui = {
  openBooking() {
    state = { ...state, bookingOpen: true };
    emit();
  },
  closeBooking() {
    state = { ...state, bookingOpen: false };
    emit();
  },
  openLightbox(i: number) {
    state = { ...state, lightboxIndex: i };
    emit();
  },
  closeLightbox() {
    state = { ...state, lightboxIndex: null };
    emit();
  },
  setLightbox(i: number | null) {
    state = { ...state, lightboxIndex: i };
    emit();
  },
};

export function useUI() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
