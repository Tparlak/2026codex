import { cn } from '@/lib/utils';

export function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('animate-pulse rounded-xl bg-emerald-100/80 dark:bg-emerald-900/40', className)} {...props} />;
}
