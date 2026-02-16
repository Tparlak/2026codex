'use client';

import { motion } from 'framer-motion';
import { PrayerRow } from '@/components/PrayerRow';
import type { PrayerName, PrayerTime } from '@/lib/prayer-data';

export function PrayerList({ prayerTimes, currentPrayer }: { prayerTimes: PrayerTime[]; currentPrayer: PrayerName | null }) {
  if (!prayerTimes.length) {
    return (
      <section className="rounded-2xl bg-white p-4 shadow-lg dark:bg-slate-900">
        <p className="py-8 text-center text-sm text-slate-500">Henüz vakit verisi bulunamadı.</p>
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.45 }}
      className="space-y-2 rounded-2xl bg-white p-3 shadow-lg dark:bg-slate-900"
    >
      {prayerTimes.map((prayer) => (
        <PrayerRow key={prayer.name} prayer={prayer} active={currentPrayer === prayer.name} />
      ))}
    </motion.section>
  );
}
