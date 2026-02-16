'use client';

import { Moon, Sunrise, Sun, Sunset } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PrayerTime } from '@/lib/prayer-data';

const iconMap = {
  İmsak: Moon,
  Güneş: Sunrise,
  Öğle: Sun,
  İkindi: Sun,
  Akşam: Sunset,
  Yatsı: Moon
};

export function PrayerRow({ prayer, active }: { prayer: PrayerTime; active: boolean }) {
  const Icon = iconMap[prayer.name];

  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-2xl px-4 py-3 transition hover:bg-slate-100 dark:hover:bg-slate-800/80',
        active && 'bg-emerald-100 dark:bg-emerald-900/60'
      )}
    >
      <div className="flex items-center gap-3">
        <span className="rounded-xl bg-slate-100 p-2 text-emerald-600 dark:bg-slate-800">
          <Icon className="h-4 w-4" />
        </span>
        <span className="font-medium">{prayer.name}</span>
      </div>
      <span className="font-semibold tabular-nums">{prayer.time}</span>
    </div>
  );
}
