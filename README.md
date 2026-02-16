# İmsakiye 2026 (HTML)

Bu sürüm **saf HTML + CSS + JavaScript** ile çalışır.

## Çalıştırma

```bash
python3 -m http.server 8080
```

Ardından:
- `http://localhost:8080`

## Dosya Yapısı

- `index.html` → Ana arayüz
- `styles.css` → Tasarım sistemi ve responsive stiller
- `app.js` → Sayaç, şehir seçici, tarih geçişi, tema ve namaz vakitleri mantığı

## Canlıya Alma (Vercel)

Bu repo static site olarak deploy edilir, build gerekmez.

1. Repo'yu GitHub'a push et.
2. Vercel > Add New Project > repo'yu seç.
3. Framework Preset: **Other** (veya auto)
4. Deploy et.

Alternatif CLI:

```bash
npm i -g vercel
vercel --prod
```
