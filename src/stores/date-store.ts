import { formatDate } from "@/lib/utils/formatDate";
import { create } from "zustand";

interface StoreProps {
  dateParam?: Date;
  dateFormated?: string;
  setDateParam: (incomingDate?: Date) => void;
}

export const useDateStore = create<StoreProps>((set) => ({
  dateParam: undefined,
  dateFormated: undefined,
  setDateParam: (incomingDate?: Date) => {
    set(() => ({ dateParam: incomingDate }));
    set(() => ({ dateFormated: formatDate(incomingDate) }));
  },
}));
