'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { PrayerTime } from '@/store/usePrayerStore';

type PrayerRowProps = {
  prayer: PrayerTime;
  isActive: boolean;
  isToday: boolean;
};

export const PrayerRow = memo(function PrayerRow({ prayer, isActive, isToday }: PrayerRowProps) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        'flex items-center justify-between rounded-2xl border p-3 transition-all',
        isActive
          ? 'border-emerald-300 bg-emerald-50 shadow-soft dark:border-emerald-700 dark:bg-emerald-950/40'
          : 'border-border bg-card',
      )}
    >
      <div className="flex items-center gap-2">
        <p className="font-medium">{prayer.name}</p>
        {isToday ? <Badge variant="muted">Bugün</Badge> : null}
        {prayer.isRamadan ? <Badge variant="amber">Ramazan</Badge> : null}
      </div>
      <p className="font-semibold text-emerald-700 dark:text-emerald-300">{prayer.time}</p>
    </motion.li>
  );
});
