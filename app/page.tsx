'use client';

import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { BottomNavigation } from '@/components/BottomNavigation';
import { CitySelector } from '@/components/CitySelector';
import { Countdown } from '@/components/Countdown';
import { DateSelector } from '@/components/DateSelector';
import { Header } from '@/components/Header';
import { PrayerHighlightCard } from '@/components/PrayerHighlightCard';
import { PrayerList } from '@/components/PrayerList';
import type { PrayerTime } from '@/store/usePrayerStore';
import { usePrayerStore } from '@/store/usePrayerStore';

const DEMO_PRAYERS: PrayerTime[] = [
  { name: 'İmsak', time: '05:15', isRamadan: true },
  { name: 'Güneş', time: '06:31' },
  { name: 'Öğle', time: '12:44' },
  { name: 'İkindi', time: '16:09' },
  { name: 'Akşam', time: '18:57', isRamadan: true },
  { name: 'Yatsı', time: '20:18' },
];

export default function HomePage() {
  const setPrayerTimes = usePrayerStore((state) => state.setPrayerTimes);
  const setLoading = usePrayerStore((state) => state.setLoading);

  const { data, isError } = useQuery({
    queryKey: ['prayer-times-demo'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 700));
      return DEMO_PRAYERS;
    },
    staleTime: Number.POSITIVE_INFINITY,
  });

  useEffect(() => {
    if (data) {
      setPrayerTimes(data);
    }
  }, [data, setPrayerTimes]);

  useEffect(() => {
    if (isError) {
      setLoading(false);
    }
  }, [isError, setLoading]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-amber-50/40 pb-28 dark:from-emerald-950/30 dark:to-zinc-950">
      <Header />
      <main className="mx-auto flex w-full max-w-md flex-col gap-4 px-4 py-4">
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <PrayerHighlightCard />
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Countdown />
        </motion.section>

        <section className="grid gap-3 md:grid-cols-2">
          <CitySelector />
          <DateSelector />
        </section>

        <PrayerList />

        <footer className="pb-8 pt-2 text-center text-xs text-muted-foreground">
          Odaklı ibadet için sade ve huzurlu bir tasarım.
        </footer>
      </main>
      <BottomNavigation />
    </div>
  );
}
