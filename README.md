# 🌟 Mondatmag Mester | 7. osztályos nyelvtan gyakorló

Interaktív, játékos oktató webalkalmazás 7. osztályos általános iskolás diákoknak a magyar mondattan alappilléreinek (az **állítmány** és az **alany**) gyakorlására és elmélyítésére.

---

## 🎯 Játékmódok és tananyag

1. **1. Szint: Állítmány és alany felismerése**
   - Állítmány keresése (*Mit állítunk?* – kettős aláhúzás: `══`)
   - Alany keresése (*Ki? Mi?* – egyes aláhúzás: `──`)
   - Halmozott mondatrészek és főnévi igenévi alanyok (*Tanulni kell*, *Élni jó*) felismerése.

2. **2. Szint: Állítmány fajtái**
   - **Alapszint:** Az állítmány már aláhúzva látható, a feladat a pontos típus megállapítása.
   - **Haladó szint:** A diáknak magának kell rákattintania az állítmány(ok)ra, majd kiválasztani a fajtáját.
   - Kategóriák: *Egyszerű (igei) állítmány*, *Névszói állítmány (zéró létige E/3 és T/3)*, *Névszói-igei állítmány*.

3. **3. Szint: Alany fajtái**
   - **Alapszint:** Kiemelt alany alapján fajtamegállapítás.
   - **Haladó szint:** Önálló szókeresés vagy a „Rejtett alany” gomb használata, majd típusválasztás.
   - Kategóriák: *Határozott alany*, *Határozatlan alany*, *Általános alany*, *Rejtett alany*, *Főnévi igenévi alany (⚠️ Csapda!)*.

4. **⚡ Villámkvíz (60 másodperces kihívás)**
   - Pörgős gyorsasági feladatsor kevert válaszlehetőségekkel a tudás ellenőrzésére.

5. **📖 Nyelvtani Kisokos (Tudástár)**
   - Beépített, illusztrált elméleti segédlet szabályokkal, kérdésekkel, vizuális példákkal és csapdamondatokkal.

---

## 🚀 Fejlesztés és futtatás helyben

### Követelmények:
- Node.js (v18+)
- npm vagy yarn

### Telepítés:
```bash
npm install
```

### Fejlesztői szerver indítása:
```bash
npm run dev
```
Nyisd meg a böngészőben: [http://localhost:3000](http://localhost:3000)

### Építés (Production build):
```bash
npm run build
npm run start
```

---

## 🛠️ Felhasznált technológiák
- **Next.js 15 (App Router)**
- **React 19 & TypeScript**
- **Modern Vanilla CSS & Glassmorphism design**
- **Web Audio API** (beépített szintetizált hangeffektek)
- **Canvas Confetti** (sikeres szintek ünneplése)
