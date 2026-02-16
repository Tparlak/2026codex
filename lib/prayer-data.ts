export type PrayerName = 'İmsak' | 'Güneş' | 'Öğle' | 'İkindi' | 'Akşam' | 'Yatsı';

export type PrayerTime = {
  name: PrayerName;
  time: string;
};

export const CITY_DATA: Record<string, string[]> = {
  İstanbul: ['Fatih', 'Kadıköy', 'Üsküdar', 'Beşiktaş'],
  Ankara: ['Çankaya', 'Keçiören', 'Yenimahalle'],
  İzmir: ['Konak', 'Karşıyaka', 'Bornova'],
  Kocaeli: ['İzmit', 'Gebze', 'Darıca'],
  Bursa: ['Osmangazi', 'Nilüfer', 'Yıldırım']
};

export const defaultPrayerTimes: PrayerTime[] = [
  { name: 'İmsak', time: '05:12' },
  { name: 'Güneş', time: '06:36' },
  { name: 'Öğle', time: '13:08' },
  { name: 'İkindi', time: '16:39' },
  { name: 'Akşam', time: '19:29' },
  { name: 'Yatsı', time: '20:47' }
];
