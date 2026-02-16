'use client';

import { useQuery } from '@tanstack/react-query';
import { defaultPrayerTimes, type PrayerTime } from '@/lib/prayer-data';

type PrayerScheduleResponse = {
  city: string;
  district: string;
  date: string;
  prayerTimes: PrayerTime[];
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function usePrayerSchedule(city: string, district: string, dateKey: string) {
  return useQuery<PrayerScheduleResponse>({
    queryKey: ['prayer-schedule', city, district, dateKey],
    queryFn: async () => {
      await delay(350);
      return {
        city,
        district,
        date: dateKey,
        prayerTimes: defaultPrayerTimes
      };
    },
    staleTime: 60_000,
    gcTime: 5 * 60_000
  });
}
