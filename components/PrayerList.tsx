'use client';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PrayerRow } from '@/components/PrayerRow';
import { usePrayerStore } from '@/store/usePrayerStore';
import { shallow } from 'zustand/shallow';

export function PrayerList() {
  const { prayerTimes, currentPrayer, isLoading } = usePrayerStore(
    (state) => ({
      prayerTimes: state.prayerTimes,
      currentPrayer: state.currentPrayer,
      isLoading: state.isLoading,
    }),
    shallow,
  );

  if (isLoading) {
    return (
      <Card className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton className="h-14 w-full" key={index} />
        ))}
      </Card>
    );
  }

  if (!prayerTimes.length) {
    return (
      <Card className="text-center text-sm text-muted-foreground">
        Namaz çizelgesi yüklenemedi. Lütfen başka bir şehir seçin.
      </Card>
    );
  }

  return (
    <Card>
      <ul className="space-y-2">
        {prayerTimes.map((prayer) => (
          <PrayerRow
            key={`${prayer.name}-${prayer.time}`}
            prayer={prayer}
            isActive={currentPrayer?.name === prayer.name}
            isToday={currentPrayer?.name === prayer.name}
          />
        ))}
      </ul>
    </Card>
  );
}
