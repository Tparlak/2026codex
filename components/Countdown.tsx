'use client';

import dayjs from 'dayjs';
import { Clock3 } from 'lucide-react';
import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { usePrayerStore } from '@/store/usePrayerStore';
import { shallow } from 'zustand/shallow';

export function Countdown() {
  const { nextPrayer, countdown, computePrayerStatus, isLoading } = usePrayerStore(
    (state) => ({
      nextPrayer: state.nextPrayer,
      countdown: state.countdown,
      computePrayerStatus: state.computePrayerStatus,
      isLoading: state.isLoading,
    }),
    shallow,
  );

  useEffect(() => {
    computePrayerStatus(dayjs());
    const timer = setInterval(() => computePrayerStatus(dayjs()), 1000);
    return () => clearInterval(timer);
  }, [computePrayerStatus]);

  if (isLoading) {
    return <Skeleton className="h-20 w-full" />;
  }

  return (
    <Card className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Clock3 className="text-emerald-600" size={18} />
        <p className="text-sm text-muted-foreground">{nextPrayer?.name ?? 'sonraki vakit'} vaktine kalan</p>
      </div>
      <p className="font-mono text-xl font-bold text-amber-600 dark:text-amber-300">{countdown}</p>
    </Card>
  );
}
