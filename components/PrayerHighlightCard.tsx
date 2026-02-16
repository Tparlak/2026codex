'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { usePrayerStore } from '@/store/usePrayerStore';
import { shallow } from 'zustand/shallow';

export function PrayerHighlightCard() {
  const { currentPrayer, nextPrayer, isLoading } = usePrayerStore(
    (state) => ({
      currentPrayer: state.currentPrayer,
      nextPrayer: state.nextPrayer,
      isLoading: state.isLoading,
    }),
    shallow,
  );

  if (isLoading) {
    return (
      <Card>
        <Skeleton className="mb-4 h-4 w-32" />
        <Skeleton className="mb-2 h-8 w-44" />
        <Skeleton className="h-4 w-56" />
      </Card>
    );
  }

  if (!currentPrayer) {
    return (
      <Card className="text-center">
        <p className="text-sm text-muted-foreground">Henüz namaz verisi bulunmuyor.</p>
      </Card>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="overflow-hidden bg-gradient-to-br from-emerald-500/15 via-card to-amber-400/10">
        <div className="mb-4 flex items-center justify-between">
          <Badge>Şu Anki Vakit</Badge>
          {currentPrayer.isRamadan ? <Badge variant="amber">Ramazan</Badge> : null}
        </div>
        <h2 className="text-3xl font-bold tracking-tight">{currentPrayer.name}</h2>
        <p className="mt-1 text-lg text-emerald-700 dark:text-emerald-300">{currentPrayer.time}</p>
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles size={16} />
          <span>Sonraki: {nextPrayer?.name} - {nextPrayer?.time}</span>
        </div>
      </Card>
    </motion.div>
  );
}
