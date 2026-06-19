export type RoomKey = "entire" | "suite" | "long";

export const ROOMS: Record<
  RoomKey,
  { label: string; rate: number; unit: "night" | "month"; blurb: string }
> = {
  entire: { label: "Entire Penthouse", rate: 189, unit: "night", blurb: "Full 3-bed penthouse" },
  suite: { label: "Master Suite Only", rate: 110, unit: "night", blurb: "King bed + private bath" },
  long: { label: "Long Stay", rate: 3900, unit: "month", blurb: "30 days+ · best for remote work" },
};

export const ADDONS = [
  { key: "airport", label: "Airport Pickup", price: 25, perNight: false },
  { key: "chef", label: "Private Chef (1 evening)", price: 60, perNight: false },
  { key: "cleaning", label: "Daily Cleaning", price: 15, perNight: true },
  { key: "trek", label: "Trek Guide Day", price: 45, perNight: false },
] as const;

export type AddonKey = (typeof ADDONS)[number]["key"];

export function calcPrice(opts: {
  room: RoomKey;
  nights: number;
  addons: Record<AddonKey, boolean>;
}) {
  const room = ROOMS[opts.room];
  const isLong = opts.room === "long";
  const units = isLong ? Math.max(1, Math.ceil(opts.nights / 30)) : opts.nights;
  const base = room.rate * units;
  const cleaningFee = isLong ? 0 : 45;
  const serviceFeeRate = 0.08;

  const addonsTotal = ADDONS.reduce((sum, a) => {
    if (!opts.addons[a.key]) return sum;
    const qty = a.perNight ? (isLong ? 30 : opts.nights) : 1;
    return sum + a.price * qty;
  }, 0);

  const subtotal = base + cleaningFee + addonsTotal;
  const serviceFee = Math.round(subtotal * serviceFeeRate);
  const total = subtotal + serviceFee;

  return { room, units, base, cleaningFee, addonsTotal, subtotal, serviceFee, total, isLong };
}
