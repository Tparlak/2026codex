'use client';

import { motion } from 'framer-motion';
import { Timer } from 'lucide-react';
import { Countdown } from '@/components/Countdown';
import type { PrayerTime } from '@/lib/prayer-data';

type PrayerHighlightCardProps = {
  countdown: string;
  nextPrayer: PrayerTime | null;
};

export function PrayerHighlightCard({ countdown, nextPrayer }: PrayerHighlightCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-5 text-white shadow-xl"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-200/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-8 left-6 h-24 w-24 rounded-full bg-amber-300/20 blur-2xl" />

      <div className="relative space-y-4">
        <div className="flex items-center gap-2 text-sm text-emerald-50">
          <Timer className="h-4 w-4" />
          <span>İFTARA KALAN SÜRE</span>
        </div>
        <Countdown value={countdown} />
        <p className="text-sm text-emerald-100">{nextPrayer ? `${nextPrayer.name} — ${nextPrayer.time}` : 'Sonraki vakit hesaplanıyor'}</p>
      </div>
    </motion.section>
  );
}
