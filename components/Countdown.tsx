'use client';

import { cn } from '@/lib/utils';

type CountdownProps = {
  value: string;
  className?: string;
};

export function Countdown({ value, className }: CountdownProps) {
  const [hours, minutes, seconds] = value.split(':');

  return (
    <div className={cn('grid grid-cols-3 gap-3', className)}>
      {[{ label: 'Saat', val: hours }, { label: 'Dakika', val: minutes }, { label: 'Saniye', val: seconds }].map((item) => (
        <div key={item.label} className="rounded-2xl bg-white/15 p-3 text-center backdrop-blur-sm">
          <p className="text-4xl font-bold leading-none tabular-nums">{item.val}</p>
          <p className="mt-2 text-xs uppercase tracking-wide text-emerald-100">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
