'use client';

import dayjs from 'dayjs';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type PrayerTime = {
  name: string;
  time: string;
  isRamadan?: boolean;
};

type PrayerStore = {
  selectedCity: string;
  selectedDistrict: string;
  prayerTimes: PrayerTime[];
  currentPrayer: PrayerTime | null;
  nextPrayer: PrayerTime | null;
  countdown: string;
  isDarkMode: boolean;
  isLoading: boolean;
  setLocation: (city: string, district: string) => void;
  setPrayerTimes: (times: PrayerTime[]) => void;
  computePrayerStatus: (now?: dayjs.Dayjs) => void;
  toggleDarkMode: () => void;
  setLoading: (loading: boolean) => void;
};

const defaultTimes: PrayerTime[] = [
  { name: 'İmsak', time: '05:15', isRamadan: true },
  { name: 'Güneş', time: '06:31' },
  { name: 'Öğle', time: '12:44' },
  { name: 'İkindi', time: '16:09' },
  { name: 'Akşam', time: '18:57', isRamadan: true },
  { name: 'Yatsı', time: '20:18' },
];

function formatCountdown(target: dayjs.Dayjs, now: dayjs.Dayjs) {
  const diff = target.diff(now, 'second');
  const seconds = Math.max(0, diff);
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return [hrs, mins, secs].map((item) => String(item).padStart(2, '0')).join(':');
}

function getPrayerMoment(base: dayjs.Dayjs, prayerTime: string) {
  const [h, m] = prayerTime.split(':').map(Number);
  return base.hour(h).minute(m).second(0).millisecond(0);
}

export const usePrayerStore = create<PrayerStore>()(
  persist(
    (set, get) => ({
      selectedCity: 'Istanbul',
      selectedDistrict: 'Fatih',
      prayerTimes: defaultTimes,
      currentPrayer: null,
      nextPrayer: null,
      countdown: '00:00:00',
      isDarkMode: false,
      isLoading: true,
      setLocation: (city, district) => set({ selectedCity: city, selectedDistrict: district }),
      setPrayerTimes: (times) => {
        set({ prayerTimes: times, isLoading: false });
        get().computePrayerStatus();
      },
      setLoading: (loading) => set({ isLoading: loading }),
      computePrayerStatus: (now = dayjs()) => {
        const times = get().prayerTimes;
        if (!times.length) {
          set({ currentPrayer: null, nextPrayer: null, countdown: '00:00:00' });
          return;
        }

        const schedule = times.map((prayer) => ({ prayer, moment: getPrayerMoment(now, prayer.time) }));
        const upcoming = schedule.find((slot) => slot.moment.isAfter(now));
        const currentIndex = upcoming ? Math.max(0, schedule.indexOf(upcoming) - 1) : schedule.length - 1;
        const currentPrayer = schedule[currentIndex]?.prayer ?? null;

        const nextPrayer = upcoming?.prayer ?? schedule[0].prayer;
        const target = upcoming?.moment ?? schedule[0].moment.add(1, 'day');

        set({
          currentPrayer,
          nextPrayer,
          countdown: formatCountdown(target, now),
        });
      },
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'prayer-app-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        selectedCity: state.selectedCity,
        selectedDistrict: state.selectedDistrict,
        isDarkMode: state.isDarkMode,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setLoading(false);
          state.computePrayerStatus();
        }
      },
    },
  ),
);
