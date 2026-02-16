'use client';

import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/tr';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

dayjs.locale('tr');

function toHijriString(date: Date) {
  return new Intl.DateTimeFormat('tr-TR-u-ca-islamic', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

export function DateSelector({ value, onChange }: { value: Dayjs; onChange: (value: Dayjs) => void }) {
  const isToday = value.isSame(dayjs(), 'day');
  const hijriDate = toHijriString(value.toDate());

  return (
    <section className="rounded-2xl bg-white p-4 shadow-lg dark:bg-slate-900">
      <div className="flex items-center justify-between gap-3">
        <button onClick={() => onChange(value.subtract(1, 'day'))} className="rounded-xl bg-slate-100 p-2 dark:bg-slate-800">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="text-center">
          <p className="text-sm font-semibold">{value.format('D MMMM YYYY')}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{hijriDate}</p>
        </div>
        <button onClick={() => onChange(value.add(1, 'day'))} className="rounded-xl bg-slate-100 p-2 dark:bg-slate-800">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-3 flex items-center justify-center gap-2">
        <button onClick={() => onChange(dayjs())} className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white">
          Bugün
        </button>
        {isToday && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
            <Sparkles className="h-3 w-3" />
            Today
          </span>
        )}
        {hijriDate.toLowerCase().includes('ramazan') && (
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
            Ramazan
          </span>
        )}
      </div>
    </section>
  );
}
