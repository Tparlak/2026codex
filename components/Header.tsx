'use client';

import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import { useEffect, useMemo, useState } from 'react';
import { MapPin, MoonStar, Settings, SunMedium } from 'lucide-react';
import { usePrayerStore } from '@/store/usePrayerStore';

dayjs.locale('tr');

export function Header({ onCityOpen }: { onCityOpen: () => void }) {
  const [clock, setClock] = useState(() => dayjs());
  const darkMode = usePrayerStore((state) => state.darkMode);
  const setDarkMode = usePrayerStore((state) => state.setDarkMode);
  const selectedCity = usePrayerStore((state) => state.selectedCity);

  useEffect(() => {
    const timer = setInterval(() => setClock(dayjs()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatted = useMemo(() => clock.format('HH:mm:ss'), [clock]);

  return (
    <header className="sticky top-0 z-30 mb-4 rounded-b-2xl border-b border-slate-200/70 bg-white/75 px-4 py-3 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-md items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-emerald-600">🕌 İmsakiye 2026</p>
          <p className="text-sm font-semibold tabular-nums">{formatted}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onCityOpen}
            className="inline-flex items-center gap-1 rounded-xl bg-slate-100 px-3 py-2 text-xs font-medium dark:bg-slate-800"
          >
            <MapPin className="h-3 w-3" />
            {selectedCity}
          </button>
          <button
            aria-label="Tema"
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-xl bg-slate-100 p-2 dark:bg-slate-800"
          >
            {darkMode ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
          </button>
          <button aria-label="Ayarlar" className="rounded-xl bg-slate-100 p-2 dark:bg-slate-800">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
