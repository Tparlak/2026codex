'use client';

import dayjs from 'dayjs';
import { MoonStar, SunMedium } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { usePrayerStore } from '@/store/usePrayerStore';

export function Header() {
  const [now, setNow] = useState(dayjs());
  const toggleDarkMode = usePrayerStore((state) => state.toggleDarkMode);
  const isDarkMode = usePrayerStore((state) => state.isDarkMode);

  useEffect(() => {
    const timer = setInterval(() => setNow(dayjs()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-white/30 bg-background/70 px-4 py-3 backdrop-blur-xl dark:border-emerald-900/40">
      <div className="mx-auto flex w-full max-w-md items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Namaz Vakitleri</p>
          <p className="text-xs text-muted-foreground">{now.format('dddd, DD MMM YYYY')}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-900/50 dark:text-amber-200">
            {now.format('HH:mm:ss')}
          </span>
          <Button size="icon" variant="ghost" aria-label="Karanlık modu değiştir" title="Karanlık modu değiştir" onClick={toggleDarkMode}>
            {isDarkMode ? <SunMedium size={18} /> : <MoonStar size={18} />}
          </Button>
        </div>
      </div>
    </header>
  );
}
