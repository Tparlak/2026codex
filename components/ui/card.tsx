import * as React from 'react';
import { cn } from '@/lib/utils';

export function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-emerald-100/70 bg-card/90 p-4 text-card-foreground shadow-soft backdrop-blur dark:border-emerald-950/50',
        className,
      )}
      {...props}
    />
  );
}
