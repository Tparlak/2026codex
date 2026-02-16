'use client';

import { MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { usePrayerStore } from '@/store/usePrayerStore';
import { shallow } from 'zustand/shallow';

const CITY_OPTIONS: Record<string, string[]> = {
  Istanbul: ['Fatih', 'Kadikoy', 'Uskudar'],
  Ankara: ['Cankaya', 'Kecioren', 'Mamak'],
  Izmir: ['Konak', 'Bornova', 'Buca'],
};

export function CitySelector() {
  const { selectedCity, selectedDistrict, setLocation } = usePrayerStore(
    (state) => ({
      selectedCity: state.selectedCity,
      selectedDistrict: state.selectedDistrict,
      setLocation: state.setLocation,
    }),
    shallow,
  );

  const districts = CITY_OPTIONS[selectedCity] ?? [];

  return (
    <Card className="grid grid-cols-2 gap-3">
      <label className="text-sm">
        <span className="mb-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin size={14} /> Şehir</span>
        <select
          className="w-full rounded-xl border border-border bg-background px-3 py-2"
          value={selectedCity}
          onChange={(event) => setLocation(event.target.value, CITY_OPTIONS[event.target.value][0])}
        >
          {Object.keys(CITY_OPTIONS).map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </label>
      <label className="text-sm">
        <span className="mb-1 block text-xs text-muted-foreground">İlçe</span>
        <select
          className="w-full rounded-xl border border-border bg-background px-3 py-2"
          value={selectedDistrict}
          onChange={(event) => setLocation(selectedCity, event.target.value)}
        >
          {districts.map((district) => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
      </label>
    </Card>
  );
}
