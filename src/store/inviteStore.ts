import { create } from "zustand";

export interface InviteForm {
  eventName: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location: string;
  description: string;
  ticketCost: string;
  requireApproval: boolean;
  capacity: string;
  publicStatus: string;
  image: string;
  mp4Theme: string;
  mp4Title: string;
}

export interface InviteResponse extends InviteForm {
  id: string;
  created_at: string;
  updated_at: string;
}

interface InviteState {
  form: InviteForm;
  response: InviteResponse | null;
  setForm: (form: Partial<InviteForm>) => void;
  saveResponse: (response: InviteResponse) => void;
  reset: () => void;
}

const initialForm: InviteForm = {
  eventName: "",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  location: "",
  description: "",
  ticketCost: "",
  requireApproval: false,
  capacity: "",
  publicStatus: "Public",
  image: "/ast_image.webp",
  mp4Theme: "/Sample_Theme.mp4",
  mp4Title: "sample.mp4",
};

export const useInviteStore = create<InviteState>((set) => ({
  form: initialForm,
  response: null,
  setForm: (form) => set((state) => ({ form: { ...state.form, ...form } })),
  saveResponse: (response) => set({ response }),
  reset: () => set({ form: initialForm, response: null }),
}));