'use client';

import dayjs from 'dayjs';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { PrayerName, PrayerTime } from '@/lib/prayer-data';

export type PrayerState = {
  selectedCity: string;
  selectedDistrict: string;
  prayerTimes: PrayerTime[];
  currentPrayer: PrayerName | null;
  nextPrayer: PrayerTime | null;
  countdown: string;
  darkMode: boolean;
  setSelectedCity: (city: string) => void;
  setSelectedDistrict: (district: string) => void;
  setPrayerTimes: (times: PrayerTime[]) => void;
  refreshTimingState: () => void;
  setDarkMode: (enabled: boolean) => void;
};

function parseTime(time: string) {
  const [hour, minute] = time.split(':').map(Number);
  return dayjs().hour(hour).minute(minute).second(0);
}

function getCountdown(nextTime: dayjs.Dayjs) {
  const diff = nextTime.diff(dayjs(), 'second');
  if (diff <= 0) return '00:00:00';
  const h = Math.floor(diff / 3600)
    .toString()
    .padStart(2, '0');
  const m = Math.floor((diff % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(diff % 60)
    .toString()
    .padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export const usePrayerStore = create<PrayerState>()(
  persist(
    (set, get) => ({
      selectedCity: 'İstanbul',
      selectedDistrict: 'Fatih',
      prayerTimes: [],
      currentPrayer: null,
      nextPrayer: null,
      countdown: '00:00:00',
      darkMode: false,
      setSelectedCity: (selectedCity) => set({ selectedCity }),
      setSelectedDistrict: (selectedDistrict) => set({ selectedDistrict }),
      setPrayerTimes: (prayerTimes) => {
        set({ prayerTimes });
        get().refreshTimingState();
      },
      refreshTimingState: () => {
        const { prayerTimes } = get();
        if (!prayerTimes.length) return;

        const now = dayjs();
        const upcoming = prayerTimes.find((prayer) => parseTime(prayer.time).isAfter(now));

        if (upcoming) {
          const upcomingIndex = prayerTimes.findIndex((item) => item.name === upcoming.name);
          const current = upcomingIndex > 0 ? prayerTimes[upcomingIndex - 1] : prayerTimes[prayerTimes.length - 1];
          set({
            currentPrayer: current?.name ?? null,
            nextPrayer: upcoming,
            countdown: getCountdown(parseTime(upcoming.time))
          });
          return;
        }

        const firstTomorrow = parseTime(prayerTimes[0].time).add(1, 'day');
        set({
          currentPrayer: prayerTimes[prayerTimes.length - 1].name,
          nextPrayer: prayerTimes[0],
          countdown: getCountdown(firstTomorrow)
        });
      },
      setDarkMode: (darkMode) => set({ darkMode })
    }),
    {
      name: 'imsakiye-2026-store',
      partialize: (state) => ({
        selectedCity: state.selectedCity,
        selectedDistrict: state.selectedDistrict,
        darkMode: state.darkMode
      }),
      storage: createJSONStorage(() => localStorage)
    }
  )
);
