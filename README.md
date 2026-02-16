# Namaz Vakitleri Premium

Bu repo iki çalışma yolunu içerir:

1. **Next.js uygulaması** (`app/`, `components/`, `store/`)
2. **Bağımsız HTML alternatifi** (`standalone/index.html`) — npm gerektirmez

## Standalone HTML (önerilen - bu ortam için)

```bash
cd standalone
python3 -m http.server 8080
```

Ardından tarayıcıda açın: `http://127.0.0.1:8080`

## Next.js (bağımlılıklar erişilebiliyorsa)

```bash
npm install
npm run dev
```
