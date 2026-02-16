'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { CITY_DATA } from '@/lib/prayer-data';
import { usePrayerStore } from '@/store/usePrayerStore';

export function CitySelector({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [search, setSearch] = useState('');
  const selectedCity = usePrayerStore((state) => state.selectedCity);
  const selectedDistrict = usePrayerStore((state) => state.selectedDistrict);
  const setSelectedCity = usePrayerStore((state) => state.setSelectedCity);
  const setSelectedDistrict = usePrayerStore((state) => state.setSelectedDistrict);

  const cities = useMemo(
    () => Object.keys(CITY_DATA).filter((city) => city.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/40 p-4 backdrop-blur-sm">
      <div className="mx-auto mt-12 max-w-md rounded-2xl bg-white p-4 shadow-xl dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-semibold">Şehir Seç</p>
          <button onClick={onClose} className="rounded-xl bg-slate-100 p-2 dark:bg-slate-800">
            <X className="h-4 w-4" />
          </button>
        </div>

        <label className="mb-3 flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 dark:border-slate-700">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Şehir ara"
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>

        <div className="grid max-h-64 grid-cols-2 gap-2 overflow-y-auto">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => {
                setSelectedCity(city);
                setSelectedDistrict(CITY_DATA[city][0]);
              }}
              className={`rounded-xl border px-3 py-2 text-sm ${
                selectedCity === city
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        <p className="mb-2 mt-4 text-xs font-semibold uppercase text-slate-500">İlçe</p>
        <div className="flex flex-wrap gap-2">
          {(CITY_DATA[selectedCity] ?? []).map((district) => (
            <button
              key={district}
              onClick={() => {
                setSelectedDistrict(district);
                onClose();
              }}
              className={`rounded-full px-3 py-1 text-xs ${
                selectedDistrict === district
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800'
              }`}
            >
              {district}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
