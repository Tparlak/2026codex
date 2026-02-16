'use client';

import { CalendarDays, Compass, Home, Settings } from 'lucide-react';

const items = [
  { key: 'home', label: 'Home', icon: Home, active: true },
  { key: 'calendar', label: 'Calendar', icon: CalendarDays },
  { key: 'qibla', label: 'Qibla', icon: Compass },
  { key: 'settings', label: 'Settings', icon: Settings }
];

export function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto grid max-w-md grid-cols-4 px-2 py-2">
        {items.map((item) => (
          <button key={item.key} className="flex flex-col items-center gap-1 rounded-xl py-2 text-xs">
            <item.icon className={`h-4 w-4 ${item.active ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span className={item.active ? 'font-semibold text-emerald-600' : 'text-slate-500'}>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
