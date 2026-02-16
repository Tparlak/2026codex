'use client';

import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { BottomNavigation } from '@/components/BottomNavigation';
import { CitySelector } from '@/components/CitySelector';
import { DateSelector } from '@/components/DateSelector';
import { Header } from '@/components/Header';
import { PrayerHighlightCard } from '@/components/PrayerHighlightCard';
import { PrayerList } from '@/components/PrayerList';
import { SkeletonCards } from '@/components/SkeletonCards';
import { usePrayerSchedule } from '@/hooks/usePrayerSchedule';
import { usePrayerStore } from '@/store/usePrayerStore';

export default function HomePage() {
  const [isCityModalOpen, setCityModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const selectedCity = usePrayerStore((state) => state.selectedCity);
  const selectedDistrict = usePrayerStore((state) => state.selectedDistrict);
  const prayerTimes = usePrayerStore((state) => state.prayerTimes);
  const currentPrayer = usePrayerStore((state) => state.currentPrayer);
  const nextPrayer = usePrayerStore((state) => state.nextPrayer);
  const countdown = usePrayerStore((state) => state.countdown);
  const setPrayerTimes = usePrayerStore((state) => state.setPrayerTimes);
  const refreshTimingState = usePrayerStore((state) => state.refreshTimingState);

  const dateKey = useMemo(() => selectedDate.format('YYYY-MM-DD'), [selectedDate]);
  const { data, isLoading } = usePrayerSchedule(selectedCity, selectedDistrict, dateKey);

  useEffect(() => {
    if (data?.prayerTimes?.length) {
      setPrayerTimes(data.prayerTimes);
    }
  }, [data, setPrayerTimes]);

  useEffect(() => {
    const timer = setInterval(() => refreshTimingState(), 1000);
    return () => clearInterval(timer);
  }, [refreshTimingState]);

  return (
    <>
      <Header onCityOpen={() => setCityModalOpen(true)} />
      <main className="mx-auto min-h-screen max-w-md space-y-4 px-4 pb-28">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <DateSelector value={selectedDate} onChange={setSelectedDate} />
        </motion.div>

        {isLoading ? (
          <SkeletonCards />
        ) : (
          <>
            <PrayerHighlightCard countdown={countdown} nextPrayer={nextPrayer} />
            <PrayerList prayerTimes={prayerTimes} currentPrayer={currentPrayer} />
          </>
        )}

        <footer className="pb-6 pt-2 text-center text-xs text-slate-500 dark:text-slate-400">
          {selectedCity} / {selectedDistrict} • İmsakiye 2026
        </footer>
      </main>

      <BottomNavigation />
      <CitySelector open={isCityModalOpen} onClose={() => setCityModalOpen(false)} />
    </>
  );
}
