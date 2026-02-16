'use client';

import dayjs from 'dayjs';
import { CalendarDays } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';

export function DateSelector() {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const readable = useMemo(() => dayjs(date).format('dddd, DD MMMM YYYY'), [date]);

  return (
    <Card className="space-y-2">
      <label className="text-xs text-muted-foreground">Tarih</label>
      <div className="flex items-center gap-2">
        <CalendarDays size={18} className="text-emerald-600" />
        <input
          className="w-full rounded-xl border border-border bg-background px-3 py-2"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>
      <p className="text-xs text-muted-foreground">{readable}</p>
    </Card>
  );
}
