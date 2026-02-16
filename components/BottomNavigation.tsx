'use client';

import { Compass, Home, Settings } from 'lucide-react';

const NAV_ITEMS = [
  { icon: Home, label: 'Ana Sayfa', active: true },
  { icon: Compass, label: 'Kıble' },
  { icon: Settings, label: 'Ayarlar' },
];

export function BottomNavigation() {
  return (
    <nav className="fixed bottom-2 left-1/2 z-40 w-[calc(100%-1rem)] max-w-md -translate-x-1/2 rounded-2xl border border-emerald-100/70 bg-background/90 p-2 shadow-soft backdrop-blur dark:border-emerald-900/60">
      <ul className="flex items-center justify-around">
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
            <button
              className={`flex flex-col items-center gap-1 rounded-xl px-4 py-2 text-xs ${item.active ? 'text-emerald-600 dark:text-emerald-300' : 'text-muted-foreground'}`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
