"use client";

import { create } from "zustand";
import { LessonType, Transmission, TimeSlot } from "../types";

interface StudentDetails {
  name: string;
  email: string;
  phone: string;
  postcode: string;
  notes: string;
}

interface BookingStore {
  instructorId: string | null;
  lessonType: LessonType | null;
  transmission: Transmission | null;
  selectedDate: string | null;
  selectedSlot: TimeSlot | null;
  durationHours: number;
  studentDetails: StudentDetails | null;
  totalPriceInPence: number;
  currentStep: number;
  bookingRef: string | null;

  setInstructor: (id: string) => void;
  setLessonDetails: (type: LessonType, transmission: Transmission, duration: number, price: number) => void;
  setDateTime: (date: string, slot: TimeSlot) => void;
  setStudentDetails: (details: StudentDetails) => void;
  setStep: (step: number) => void;
  confirmBooking: () => Promise<string>;
  reset: () => void;
}

const initialState = {
  instructorId: null,
  lessonType: null,
  transmission: null,
  selectedDate: null,
  selectedSlot: null,
  durationHours: 1,
  studentDetails: null,
  totalPriceInPence: 0,
  currentStep: 1,
  bookingRef: null,
};

export const useBookingStore = create<BookingStore>((set, get) => ({
  ...initialState,

  setInstructor: (id) => set({ instructorId: id }),

  setLessonDetails: (type, transmission, duration, price) =>
    set({ lessonType: type, transmission, durationHours: duration, totalPriceInPence: price }),

  setDateTime: (date, slot) => set({ selectedDate: date, selectedSlot: slot }),

  setStudentDetails: (details) => set({ studentDetails: details }),

  setStep: (step) => set({ currentStep: step }),

  confirmBooking: async () => {
    await new Promise((r) => setTimeout(r, 1500));
    const ref = `DRV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    set({ bookingRef: ref, currentStep: 4 });
    return ref;
  },

  reset: () => set(initialState),
}));
