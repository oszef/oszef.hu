# SZEFO.hu

Szia! Ez a SZEFO honlapjának a "gépterme" - itt találsz mindent, amiből az
oldal felépül, és pár szót arról is, hogyan kell vele bánni. Igyekeztem
úgy megírni, hogy az is értse, aki nem programozó.

## Miből épül fel az oldal?!

A legegyszerűbb technikából: sima HTML, CSS és JavaScript fájlokból, nincs
mögötte adatbázis és nincs "szerver oldali" kód, ami háttérben futna. Ez
a gyakorlatban azt jelenti, hogy amit feltöltünk a tárhelyre, az pontosan
úgy fog megjelenni, ahogy a fájlokban van megírva - nincs köztes gépezet,
ami elromolhatna.

Szándékosan hagytam eszközmentesen (nincs "build lépés", vagyis nem kell
a feltöltés előtt semmit legenerálni vagy lefordítani), hogy programozói
háttér nélkül is módosítható és költségmentesen üzemeltethető legyen.

## Mi merre található

- `index.html` - a kezdőlap. Ez a gyökérben van, nem a `hu/` mappában.
- `hu/` - az összes többi aloldal, mindegyiknek saját mappája és saját
  `index.html`-je van (pl. `hu/kapcsolat/index.html`).
- `css/` - a kinézetért felelős stíluslapok. A `style.css` a közös, fő
  stíluslap, a többi (`popup.css`, `news_blog.css`, `pdf_style.css`,
  `search_style.css`, `magazin.css`) egy-egy konkrét oldalrészhez
  tartozik.
- `js/` - amitől "életre kel" az oldal (menü, popup, keresés stb.), lásd
  lentebb részletesen.
- `img/` - a képek, témák szerint almappákba rendezve, webp formátumban
  (ez egy tömörebb, gyorsabban betöltődő képformátum).
- `doc/` - a letölthető PDF dokumentumok.

## A JavaScript fájlok, dióhéjban

- `script.js` - a közös logika: a kihúzható (offcanvas) menü, a kezdőlapi
  és ISO képváltogató (carousel), az idővonal, az üzletági és karrieres
  felugró ablakok (modálok), a galériák.
- `news_blog.js` - a Hírek/Blog oldal, benne magával a cikkek szövegével
  is.
- `search.js` - a keresőoldal logikája.
- `search_data.js` - a keresés "adatbázisa" (egy egyszerű lista a
  kereshető oldalakról). Ennek a `search.js` előtt kell betöltődnie.
- `downloader.js` - ez intézi a PDF-letöltéseket a dokumentumos oldalakon.
- `popup.js` - a kezdőlapon felugró ablak időzítését végzi.

## Hogyan nézheted meg a saját gépeden

Ha csak simán duplán kattintasz az `index.html`-re, a legtöbb minden
működik, DE a Keresés és a Hírek/Blog oldal nem fog - ezekhez egy kis
helyi kiszolgálóra (local szerver) van szükség. Ez nem bonyolult, csak
egy parancs a projekt mappájából:

```bash
npx --yes http-server . -p 8000 -c-1
```

Ha inkább Python van a gépeden:

```bash
python -m http.server 8000
```

Utána a böngészőben: `http://localhost:8000/`

A `-c-1` azért kell, hogy a böngésző ne gyorsítótárazza (ne "jegyezze
meg") a fájlokat - enélkül előfordulhat, hogy egy CSS vagy JS módosítás
után is még a régi változatot látod.

## Hogyan kerül fel élesbe

Az oldal csak fájlokból áll, úgyhogy bármilyen tárhelyre feltölthető
FTP-vel vagy SFTP-vel, nincs semmilyen külön "build" lépés - amit
feltöltesz, az fog futni. Feltöltés után érdemes a böngészőben
gyorsítótár nélkül frissíteni (Ctrl+F5), nehogy a régi CSS maradjon
betöltve.

## Ha módosítani szeretnél valamit

**Színek, sarokkerekítés, árnyékok.** Ezek nincsenek szétszórva a
fájlban, hanem egy helyen, a `style.css` legelején, a `:root` blokkban
vannak összegyűjtve. Ha egy színt vagy méretet módosítasz, mindig itt
tedd, ne az egyes szabályoknál külön-külön - így egyszerre, egységesen
változik az egész oldalon.

**Gombok és kártyák.** A `style.css`-ben van egy "Gombok és kártyák -
közös alap" szakasz, ide vannak összegyűjtve a közös tulajdonságok, és a
régebbi osztálynevek is ehhez vannak kötve. Ha új gombot vagy kártyát
adsz hozzá, inkább ehhez a listához vedd fel az osztálynevét, minthogy
újra lemásold a teljes stílust.

**Töréspontok** (vagyis hogy hány pixelnél vált át az oldal mobil
nézetre). A ténylegesen használt méretek: 1024px, 768px és 420px. Új
szabályt ezekhez igazíts, ne vezess be egy negyediket.

**Képek.** Minden kép webp formátumú. Az elérési útjuk mindig ahhoz a
HTML fájlhoz képest relatív, amelyikben szerepelnek: a gyökérből
`./img/...`, egy `hu/valami/index.html`-ből pedig `../../img/...`. Új
képnél tegyél rá `loading="lazy"` attribútumot, hogy csak akkor
töltődjön be, amikor a látogató tényleg odagörget.

**Keresés.** A `search_data.js` kézzel karbantartott lista. Ha új oldalt
veszel fel a honlapra, ide is fel kell venni, különben a keresőben nem
fog előjönni. Az URL-ek a `hu/kereses/index.html`-hez képest relatívak.

## Akadálymentesség (WCAG)

Igyekeztem odafigyelni arra, hogy az oldalt azok is tudják használni,
akik például billentyűzettel navigálnak, képernyőolvasót használnak,
vagy érzékenyek a villódzó/mozgó elemekre. Ez a WCAG (a nemzetközi
akadálymentességi irányelvek) 2.1-es, AA szintű ajánlásai mentén készült
- nem egy hivatalos, auditált tanúsítvány, de a fontosabb szempontokat
lefedi:

- A kihúzható menü és a felugró ablakok billentyűzetről is teljesen
  kezelhetők, a fókusz nem "szökik ki" belőlük, és Escape-re bezáródnak.
- Amikor a menü zárva van, `inert` állapotba kerül, így véletlenül sem
  lehet rátabolni.
- Minden kattintható elemen jól látható fókuszgyűrű jelenik meg, amikor
  billentyűzettel állsz rá.
- A vezérlők állapotát (nyitva/zárva, kiválasztva stb.) a képernyőolvasók
  is érzékelik (`aria-expanded`, `aria-pressed`, `aria-selected`,
  `aria-hidden`).
- Ha valaki a rendszerében a "csökkentett mozgás" beállítást
  kérte, nálunk az animációk és a képváltogatók is leállnak.
- Minden oldalon van "ugrás a tartalomra" link, és be van állítva, hogy
  az oldal nyelve magyar (`lang="hu"`).
- Minden képnek van szöveges leírása (`alt` attribútum).

Ha új elemet adsz a laphoz, három dolgot tarts szem előtt:

**1. A fókuszgyűrű legyen jól látható**, ne egy alig észrevehető,
áttetsző karika. Erre már van kész megoldás:

```css
outline: var(--focus-ring);
outline-offset: var(--focus-ring-offset);
```

**2. A kattintható felület legalább 24x24 pixel legyen**, még akkor is,
ha a látvány (egy vékony vonal, egy pötty) ennél kisebb. Ilyenkor a gomb
mérete legyen 24px, a látható, kisebb elemet pedig egy `::before` rajzolja
bele:

```css
.valami-apro-gomb {
  width: var(--hit-target);
  height: var(--hit-target);
  display: grid;
  place-items: center;
  background: transparent;
  border: none;
}

.valami-apro-gomb::before {
  content: "";
  width: 9px;
  height: 9px;
  background: rgba(0, 63, 125, 0.55);
}
```

Ez a minta már használatban van a `.timeline-tick` elemnél, onnan
lehet ellesni.

**3. Ami kicsúszik a képernyőről, azt `inert`-té kell tenni.** A
kihúzható menü zárt állapotban is a DOM-ban marad, ezért a `script.js`
`inert` attribútumot tesz rá (a `style.css` pedig `visibility: hidden`-t,
a régebbi böngészők kedvéért). Fontos, hogy a fókuszt mindig előbb hozzuk
ki a panelből, és csak utána állítsuk be az `inert`-et.

## Amit még érdemes tudni

- Nincs benne semmilyen build eszköz vagy csomagkezelő - ahogy fentebb
  írtam, ez tudatos döntés volt.
- Nincs `sitemap.xml` és `robots.txt`.
- Az oldal egynyelvű (magyar). A `hu/` mappaszerkezet elvben lehetővé
  tenné más nyelvek felvételét is, de ahhoz a menüt is bővíteni kellene.
- A pdf dokumentumok egy része nem értelmezhető a képernyőfelovasoknak.
- A `hu/szefo_magazin/` a SZEFO Magazin korábbi lapszámainak archívuma.
  A régi WordPress oldal `szefo-magazin` aloldalát váltja ki, a
  lapszámokat megőrzési kötelezettség miatt tartjuk elérhetőn. A nyolc
  PDF a `doc/szefo_magazin/` mappában van, együtt kb. 139 MB - ez a
  repó legnagyobb tétele, feltöltésnél és klónozásnál érdemes számolni
  vele. A borítók (`img/szefo_magazin/`) a PDF-ek első oldalából
  készültek, ezért nem a régi oldal gyenge minőségű képei.
- A kezdőlapi Termékfejlesztés modálban lévő kép aránya/minősége nem
  túl szerencsés, ezt is érdemes lesz még javítani.
