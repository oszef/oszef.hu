# SZEFO.hu

Szia! Ez a SZEFO honlapjának a "gépterme" - itt találsz mindent, amiből az
oldal felépül, és pár szót arról is, hogyan kell vele bánni. Igyekeztem
úgy megírni, hogy az is értse, aki nem programozó.

## Miből épül fel az oldal?

A legegyszerűbb technikából: sima HTML, CSS és JavaScript fájlokból, nincs
mögötte adatbázis és nincs "szerver oldali" kód, ami háttérben futna. Ez
a gyakorlatban azt jelenti, hogy amit feltöltünk a tárhelyre, az pontosan
úgy fog megjelenni, ahogy a fájlokban van megírva - nincs köztes gépezet,
ami elromolhatna.

Szándékosan hagytam eszközmentesen (nincs "build lépés", vagyis nem kell
a feltöltés előtt semmit legenerálni vagy lefordítani), hogy programozói
háttér nélkül is módosítható és költségmentesen üzemeltethető legyen.

Nincs közös sablon sem: a fejléc a menüvel és a lábléc **minden oldalon
külön-külön szerepel**. Ha a menün vagy a láblécen változtatsz, mind a 21
oldalon ugyanúgy át kell írni.

## Mi merre található

- `index.html` - a kezdőlap. Ez a gyökérben van, nem a `hu/` mappában.
- `hu/` - az összes többi aloldal, mindegyiknek saját mappája és saját
  `index.html`-je van (pl. `hu/kapcsolat/index.html`). A listát lásd lent.
- `css/` - a kinézetért felelős stíluslapok. A `style.css` a közös, fő
  stíluslap, a többi (`popup.css`, `news_blog.css`, `pdf_style.css`,
  `search_style.css`, `magazin.css`) egy-egy konkrét oldalrészhez
  tartozik. A `css/bootstrap-icons/` a Bootstrap Icons ikonkészlet
  (v1.13.1) helyi másolata - minden oldal betölti, a lábléc közösségi
  ikonjai is ebből jönnek.
- `js/` - amitől "életre kel" az oldal (menü, keresés stb.), lásd
  lentebb részletesen.
- `img/` - a képek, témák szerint almappákba rendezve.
- `doc/` - a letölthető PDF dokumentumok, oldalanként almappákban.
- `robots.txt` és `sitemap.xml` - a keresőmotoroknak szóló technikai
  fájlok: a `robots.txt` szabályozza, mely részeket járhatják be a
  keresőrobotok, a `sitemap.xml` pedig felsorolja, milyen URL-ek
  tartoznak az oldalhoz.
- `.github/workflows/deploy.yml` - az élesítés (feltöltés a tárhelyre),
  lásd lentebb.

## Az oldalak

A felső menü (asztali gépen vízszintes sáv, 1024 px-ig oldalról becsúszó
panel):

- **Kezdőlap** - `index.html`
- **Rólunk** (lenyíló menü):
  - Bemutatkozás - `hu/bemutatkozas/`
  - Történetünk - `hu/tortenetunk/`
  - E-hulladék - `hu/e-hulladek/`
  - Alapítvány - `hu/alapitvany/`
- **Híreink** - `hu/hireink/`
- **Kapcsolat** - `hu/kapcsolat/`
- **Karrier** - `hu/karrier/`
- **Klaszter** - `hu/klaszter/`
- **Keresés** gomb - `hu/kereses/`

A lábléc minden oldalon azonos, három oszlopból áll: cégnév, idézet és
elérhetőségek; a **Céginformációk** aloldalai; a közösségi oldalak
(Facebook, Instagram, TikTok, LinkedIn). A Céginformációk a felső
menüben nem szerepel, csak a láblécben:

- Általános céginformációk - `hu/altalanos_ceginformaciok/`
- Közérdekű adatok - `hu/kozerdeku_adatok/`
- Képző intézmények - `hu/kepzo_intezmenyek/`
- Projektek - `hu/projektek/`
- Minőségpolitika - `hu/minosegpolitika/`
- Partnerek - `hu/partnerek/`
- Adatigénylés rendje - `hu/adatigenyles_rendje/`
- Éves beszámolók - `hu/eves_beszamolok/`
- Archívum - `hu/archivum/`

A kezdőlap blokkjai fentről lefelé:

1. Nyitóképek - automatikusan váltakozó képek szlogenekkel, szünet
   gombbal.
2. Rólunk - rövid bemutatkozás, a gomb a Bemutatkozás oldalra visz
   (mobilon rövidebb szöveggel).
3. Főbb adatok - három fő terület, számlálók és egy kördiagram.
4. Tevékenységek és üzletágak - három kártya, a "Részletek" gomb felugró
   ablakban mutatja a teljes leírást.
5. Üzemegységek - nyolc kártya ugyanígy.
6. Vezérigazgatói köszöntő - a "Bővebben" gomb ugyanitt nyitja ki a
   teljes szöveget.
7. ISO tanúsítványaink - három logó, mindegyik alatt a tanúsítvány
   PDF-je.

Menüből nem, csak egy másik oldalról elérhető:

- Pályázat (NEAO-KP-1-2022/8-000016) - `hu/palyazat/`, az Alapítvány
  oldal dokumentumai közül.
- SZEFO Magazin - `hu/szefo_magazin/`, a Híreink oldalról.

## A JavaScript fájlok, dióhéjban

- `script.js` - a közös működés: a menü (asztali gépen felső sáv, 1024
  px-ig oldalról becsúszó panel), a kezdőlap képváltója, a számlálók, a
  Történetünk idővonala, az üzletági és a karrieres felugró ablakok, a
  galériák.
- `news_blog.js` - a Hírek/Blog oldal, benne magával a cikkek szövegével
  is.
- `search.js` - a keresőoldal logikája.
- `search_data.js` - a keresés "adatbázisa" (egy egyszerű lista a
  kereshető oldalakról). Ennek a `search.js` előtt kell betöltődnie.
- `downloader.js` - ez intézi a PDF-letöltéseket a dokumentumos oldalakon.
- `popup.js` - a kezdőlapon felugró álláshirdetés időzítését végezné.
  **Jelenleg ki van kapcsolva**, mert nincs aktuális állásajánlat: a
  fájl teljes kódja megjegyzésben (`/* ... */`) van. Visszakapcsolás: a
  fájl elején a `/*`, a végén a `*/` sort kell törölni. A popup HTML-je
  az `index.html`-ben, a stílusa a `css/popup.css`-ben megmaradt.
- `company_inf_filter.js` - **ideiglenes** szűrő, amíg a Céginformációk
  adatai frissülnek: a látogató a 9 Céginformációk-aloldalon a
  "Tartalmaink frissítés alatt" értesítést látja a tartalom helyett. Csak
  megjelenítési szűrő, a lapok a szerveren továbbra is elérhetők, ezért
  bizalmas adat nem kerülhet rájuk. Minden oldal `<head>` része betölti.
  Kikapcsolás: a fájl törlése, és mind a 21 oldal `<head>`-jéből a rá
  mutató két sor (megjegyzés + `<script>`) törlése.

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

Helyi gépen (`localhost`, `127.0.0.1`, dupla kattintás) a Céginformációk
szűrője nem kapcsol be, ott minden tartalom látszik. A látogatói nézet
így nézhető meg: a cím végére `?fejleszto=0` (vissza: `?fejleszto=1`) -
a böngésző megjegyzi a választást.

## Hogyan kerül fel élesbe

Az élesítést a GitHub Actions végzi, a `.github/workflows/deploy.yml`
alapján: a fájlokat FTPS-en (titkosított FTP-n) tölti fel a tárhelyre.

- **Kézzel kell indítani**: a GitHub oldalán az *Actions* fül → *Deploy
  (FTPS)* → *Run workflow*. Automatikusan, egy feltöltés (push) után nem
  indul el (az automatikus indítás a fájlban megjegyzésbe van téve,
  később bekapcsolható).
- Indításkor a **Próbafutás** pipa alapból be van jelölve: ilyenkor csak
  kiírja, mit töltene fel vagy törölne, de nem módosít semmit. Valódi
  feltöltéshez ki kell venni a pipát.
- Csak a megváltozott fájlokat tölti fel, és **amit a tárolóból (repó)
  törölsz, azt a szerverről is törli** - kézzel semmit nem kell törölni.
- Nem tölti fel (és a szerveren nem is törli) a következőket: a `.git`
  fájlokat, a `.github/` és a `.claude/` mappát, a `README.md`-t, a
  `.well-known/` mappát és a `.ftpquota` fájlt.
- A belépési adatok a GitHub tároló titkos beállításai (*Secrets*)
  között vannak, a fájlokban sehol nem szerepelnek, és ne is kerüljenek
  oda.

A korábbi cPanel-es telepítés (`.cpanel.yml`) 2026. október 15-én
megszűnt, a fájl már nincs a repóban. `.htaccess` fájl sincs.

Feltöltés után érdemes a böngészőben gyorsítótár nélkül frissíteni
(Ctrl+F5), nehogy a régi CSS maradjon betöltve.

## Ha módosítani szeretnél valamit

**Színek, méretek, sarokkerekítés, árnyékok, listák.** Ezek nincsenek
szétszórva a fájlban, hanem egy helyen, a `style.css` legelején, a
`:root` blokkban vannak összegyűjtve (a tartalmi listák nyíl jelölője is).
Ha egy színt vagy méretet módosítasz, mindig itt tedd, ne az egyes
szabályoknál külön-külön - így egyszerre, egységesen változik az egész
oldalon.

**Gombok és kártyák.** A `style.css`-ben van egy "Gombok és kártyák -
közös alap" szakasz, ide vannak összegyűjtve a közös tulajdonságok, és a
régebbi osztálynevek is ehhez vannak kötve. Ha új gombot vagy kártyát
adsz hozzá, inkább ehhez a listához vedd fel az osztálynevét, minthogy
újra lemásold a teljes stílust.

**Töréspontok** (vagyis hogy hány pixelnél vált át az oldal mobil
nézetre). A fő méretek: 1024px (tablet), 768px (mobil) és 420px (kis
mobil); 1025px felett jelenik meg az asztali menüsáv. Néhány elemnek van
saját, finomhangoló töréspontja is (480, 600, 640, 1199 és 1240px). Új
szabályt lehetőleg a három fő mérethez igazíts.

**Képek.** A képek webp formátumúak; kivétel a böngészőfül ikonja
(`img/fav/szefo_fav.PNG`), a Karrier oldal videója (mp4) és egy nem
használt png az `img/palyazat/` mappában. Az elérési útjuk mindig ahhoz a
HTML fájlhoz képest relatív, amelyikben szerepelnek: a gyökérből
`./img/...`, egy `hu/valami/index.html`-ből pedig `../../img/...`. Új
képnél tegyél rá `loading="lazy"` attribútumot, hogy csak akkor
töltődjön be, amikor a látogató tényleg odagörget (kivéve, ha a kép az
oldal tetején, azonnal látszik). A `width` és a `height` mindig a kép
valódi mérete legyen: ebből tudja a böngésző előre a kép arányát, így az
oldal nem ugrik meg, amikor a kép betöltődik.

A tartalmi fotók (pl. a Történetünk idővonalán) mindig teljes egészükben
látszanak, nem vágjuk le őket. A Történetünk képei 1040 px szélesek; a
kis felbontású régi fotók egy részét mesterséges intelligenciás
nagyítóval (Real-ESRGAN) élesítettük. Ez a program nincs a tárolóban.

**Új oldal felvétele** - ezekre kell figyelni:

1. Új mappa a `hu/` alatt, benne `index.html` (érdemes egy hasonló
   meglévő oldalt lemásolni).
2. A menübe és (ha kell) a láblécbe mind a 21 oldalon fel kell venni.
3. `search_data.js` - különben a keresőben nem jön elő. Az URL-ek a
   `hu/kereses/index.html`-hez képest relatívak.
4. `sitemap.xml` - új `<url>` sor, a mai dátummal.

## Akadálymentesség (WCAG)

Igyekeztem odafigyelni arra, hogy az oldalt azok is tudják használni,
akik például billentyűzettel navigálnak, képernyőolvasót használnak,
vagy érzékenyek a villódzó/mozgó elemekre. Ez a WCAG (a nemzetközi
akadálymentességi irányelvek) 2.2-es, A és AA szintű ajánlásai mentén
készült, az utolsó teljes ellenőrzés 2026. október 1-jén volt - nem egy
hivatalos, auditált tanúsítvány, de a fontosabb szempontokat lefedi:

- A menü és a felugró ablakok billentyűzetről is teljesen kezelhetők,
  a fókusz nem "szökik ki" belőlük, és Escape-re bezáródnak. Az asztali
  menüsávban az Escape a nyitott lenyílót zárja, és visszaadja a fókuszt
  annak a gombjára.
- Zárt menüre nem lehet rátabolni. Mobilon ezt az `inert` attribútum
  intézi, asztalon pedig a `visibility: hidden` a zárt lenyílókon - a
  védelem ugyanaz, csak más eszközzel, mert az asztali sáv maga végig
  látható marad.
- A menü egy `<nav aria-label="Fő navigáció">` elemen belül van. Ez az
  oldal egyik "tájékozódási pontja" (landmark), így képernyőolvasóval egy
  lépésben oda lehet ugrani.
- Minden kattintható elemen jól látható fókuszgyűrű jelenik meg, amikor
  billentyűzettel állsz rá.
- A vezérlők állapotát (nyitva/zárva, kiválasztva stb.) a képernyőolvasók
  is érzékelik (`aria-expanded`, `aria-pressed`, `aria-selected`,
  `aria-hidden`).
- Ha valaki a rendszerében a "csökkentett mozgás" beállítást
  kérte, nálunk az animációk és a képváltogatók is leállnak. A kezdőlapi
  képváltogatónak szünet gombja is van.
- Minden oldalon van "ugrás a tartalomra" link, és be van állítva, hogy
  az oldal nyelve magyar (`lang="hu"`).
- Minden képnek van szöveges leírása (`alt` attribútum).

Tudott, vállalt hiányosság: a Karrier oldal videójához nincs felirat.

Ha új elemet adsz a laphoz, ezeket tartsd szem előtt:

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
becsúszó menü zárt állapotban is az oldal része marad (csak nem látszik),
ezért a `script.js` `inert` jelzőt tesz rá: ez a billentyűzet és a
képernyőolvasó számára is kikapcsolja (a `style.css` pedig `visibility:
hidden`-t, a régebbi böngészők kedvéért). Fontos, hogy a billentyűzetes
kijelölést (fókuszt) mindig előbb hozzuk ki a panelből, és csak utána
állítsuk be az `inert`-et.

Az `inert` viszont **csak 1024 px-ig** kerül fel, mert afölött a menü
vízszintes sávban ül és végig látható - ott az `inert` épp a billentyűzetes
használatot lehetetlenítené el. A töréspont két helyen szerepel, és a
kettőnek együtt kell mozognia:

- `css/style.css` - `@media (min-width: 1025px)`
- `js/script.js` - `ASZTALI_MENU_TORESPONT`

**4. A csökkentett mozgás a késleltetésre is vonatkozik.** A globális
`prefers-reduced-motion` szabály csak a `transition-duration`-t nullázza,
a `transition-delay`-t nem. Ha egy elem késleltetéssel rejtőzik el (mint
az asztali lenyílók `visibility`-je), akkor azt külön ki kell kapcsolni,
különben csökkentett mozgásnál láthatatlanul, de fókuszálhatóan
bennragadna a tabsorrendben.

## Kommentek a kódban

A fájlokban lévő megjegyzések (kommentek) magyarul, közérthetően
készülnek, úgy, hogy az is értse, aki nem programozó:

- Természetes mondatokban írjuk, úgy, ahogy egy kolléga elmagyarázná.
- Azt mondják el, mire jó az adott rész, és miért van így megoldva, nem a
  kódot ismétlik meg szavakkal.
- Szakszót csak akkor használunk, ha muszáj, és akkor pár szóval meg is
  magyarázzuk, pl. "inert jelző (a billentyűzet és a képernyőolvasó
  számára kikapcsolja az elemet)".
- Ha egy rész megváltozik, a hozzá tartozó kommentet is frissíteni kell,
  hogy ne maradjon benne elavult információ.

## Amit még érdemes tudni

- Nincs benne semmilyen build eszköz vagy csomagkezelő - ahogy fentebb
  írtam, ez tudatos döntés volt.
- Van `sitemap.xml` és `robots.txt` a gyökérben, a keresőmotoroknak. A
  Klaszter oldal szándékosan `noindex` (a keresők nem veszik fel), ezért
  a sitemapben sem szerepel.
- Az oldal egynyelvű (magyar). A `hu/` mappaszerkezet elvben lehetővé
  tenné más nyelvek felvételét is, de ahhoz a menüt is bővíteni kellene.
- A pdf dokumentumok egy része nem értelmezhető a képernyőolvasóknak.
- A `hu/szefo_magazin/` a SZEFO Magazin korábbi lapszámainak archívuma.
  A régi WordPress oldal `szefo-magazin` aloldalát váltja ki, a
  lapszámokat megőrzési kötelezettség miatt tartjuk elérhetőn. A borítók
  (`img/szefo_magazin/`) a PDF-ek első oldalából készültek. **A nyolc
  PDF-nek a `doc/szefo_magazin/` mappában kellene lennie, de ez a mappa
  jelenleg nincs a repóban**, így a magazinoldal Megnyitás/Letöltés
  gombjai addig nem működnek, amíg a PDF-ek fel nem kerülnek.
