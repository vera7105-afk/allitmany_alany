import { Level3Question, SubjectType } from './types';

const defaultSubjectOptions = [
  {
    type: 'hatarozott' as SubjectType,
    label: 'Határozott alany',
    description: 'Pontosan megnevezett személy vagy dolog (tulajdonnév, határozott névelős főnév, személyes névmás).'
  },
  {
    type: 'hatarozatlan' as SubjectType,
    label: 'Határozatlan alany',
    description: 'Nem tudjuk vagy nem akarjuk pontosan megnevezni (valaki, valami, egy ismeretlen).'
  },
  {
    type: 'altalanos' as SubjectType,
    label: 'Általános alany',
    description: 'Mindenkire, bárkire vagy senkire érvényes megállapítás (mindenki, senki, az ember, közmondások).'
  },
  {
    type: 'rejtett' as SubjectType,
    label: 'Rejtett alany',
    description: 'Nincs külön szóval kitéve, de az ige személyragja pontosan elárulja ([én], [te], [mi]...).'
  },
  {
    type: 'fonevi_igenevi' as SubjectType,
    label: 'Főnévi igenévi alany (⚠️ CSAPDA!)',
    description: 'A mondat alanya egy -ni képzős főnévi igenév (pl. tanulni kell, élni jó).'
  }
];

// ==========================================
// 1. ALAPSZINTI KÉRDÉSEK (Kiemeléssel)
// ==========================================
export const LEVEL3_BASIC_QUESTIONS: Level3Question[] = [
  {
    id: 'l3_b1',
    sentence: 'Péter elmélyülten olvas egy izgalmas kalandregényt.',
    highlightedSubject: 'Péter',
    words: [
      { text: 'Péter', isSubject: true },
      { text: 'elmélyülten', isSubject: false },
      { text: 'olvas', isSubject: false },
      { text: 'egy', isSubject: false },
      { text: 'izgalmas', isSubject: false },
      { text: 'kalandregényt.', isSubject: false }
    ],
    correctType: 'hatarozott',
    options: defaultSubjectOptions,
    explanation: 'A cselekvő pontosan meg van nevezve tulajdonnévvel (Péter). Ezért határozott alany.',
    ruleTip: 'A tulajdonnevek, a határozott névelős főnevek ("a tanár") és a személyes névmások ("ő") határozott alanyok.'
  },
  {
    id: 'l3_b2',
    sentence: 'Valaki halkan zörget az udvari kiskapun.',
    highlightedSubject: 'Valaki',
    words: [
      { text: 'Valaki', isSubject: true },
      { text: 'halkan', isSubject: false },
      { text: 'zörget', isSubject: false },
      { text: 'az', isSubject: false },
      { text: 'udvari', isSubject: false },
      { text: 'kiskapun.', isSubject: false }
    ],
    correctType: 'hatarozatlan',
    options: defaultSubjectOptions,
    explanation: 'A beszélő nem tudja vagy nem nevezi meg pontosan, ki az: a "valaki" határozatlan névmás fejezi ki az alanyt.',
    ruleTip: 'Ha az alany "valaki" vagy "valami", akkor a fajtája határozatlan alany.'
  },
  {
    id: 'l3_b3',
    sentence: 'Mindenki időben megérkezett a színházi előadásra.',
    highlightedSubject: 'Mindenki',
    words: [
      { text: 'Mindenki', isSubject: true },
      { text: 'időben', isSubject: false },
      { text: 'megérkezett', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'színházi', isSubject: false },
      { text: 'előadásra.', isSubject: false }
    ],
    correctType: 'altalanos',
    options: defaultSubjectOptions,
    explanation: 'A "mindenki" általános névmás, ami kivétel nélkül a társaság összes tagjára érvényes állítást tesz.',
    ruleTip: 'Az általános alany kifejezői: mindenki, senki, bárki, akárki vagy az ember.'
  },
  {
    id: 'l3_b4',
    sentence: 'Délután szorgalmasan leckét írok a holnapi órára.',
    hiddenSubjectPronoun: 'én',
    words: [
      { text: 'Délután', isSubject: false },
      { text: 'szorgalmasan', isSubject: false },
      { text: 'leckét', isSubject: false },
      { text: 'írok', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'holnapi', isSubject: false },
      { text: 'órára.', isSubject: false }
    ],
    correctType: 'rejtett',
    options: defaultSubjectOptions,
    explanation: 'A mondatban nem szerepel az "én" szó, de az "írok" ige E/1 személyragja (-ok) egyértelműen utal a cselekvőre: [én]!',
    ruleTip: 'Rejtett alany esetén a mondatban nincs kitett alany, hanem az ige személyragjából következtetünk rá: [én], [te], [mi]...'
  },
  {
    id: 'l3_b5',
    sentence: 'Péter és Pál a táblánál közösen oldja meg a feladatot.',
    highlightedSubject: 'Péter és Pál',
    words: [
      { text: 'Péter', isSubject: true },
      { text: 'és', isSubject: false },
      { text: 'Pál', isSubject: true },
      { text: 'a', isSubject: false },
      { text: 'táblánál', isSubject: false },
      { text: 'közösen', isSubject: false },
      { text: 'oldja', isSubject: false },
      { text: 'meg', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'feladatot.', isSubject: false }
    ],
    correctType: 'hatarozott',
    isHalmozott: true,
    options: defaultSubjectOptions,
    explanation: 'Péter és Pál két tulajdonnévvel pontosan megnevezett személy: mindkettő határozott alany! Bár kettő van belőlük (halmozott alany), a fajtájuk határozott alany marad.',
    ruleTip: 'A tulajdonnevek határozott alanyt képeznek, a halmozottságtól függetlenül!'
  },
  {
    id: 'l3_b6',
    sentence: 'A dolgozat előtt alaposan átismételni kell a tételeket.',
    highlightedSubject: 'átismételni',
    words: [
      { text: 'A', isSubject: false },
      { text: 'dolgozat', isSubject: false },
      { text: 'előtt', isSubject: false },
      { text: 'alaposan', isSubject: false },
      { text: 'átismételni', isSubject: true },
      { text: 'kell', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'tételeket.', isSubject: false }
    ],
    correctType: 'fonevi_igenevi',
    isTrap: true,
    options: defaultSubjectOptions,
    explanation: '⚠️ VIGYÁZAT! Mit állítunk? ➔ kell (állítmány). Mi kell? ➔ átismételni! A főnévi igenév válaszol a "Mi kell?" kérdésre, tehát ez az ALANY!',
    ruleTip: 'A "kell, lehet, muszáj, szabad, illik" mellett álló -ni végű szó MINDIG alany, sosem állítmány!'
  },
  {
    id: 'l3_b7',
    sentence: 'Senki sem maradt le az erdei túra során.',
    highlightedSubject: 'Senki',
    words: [
      { text: 'Senki', isSubject: true },
      { text: 'sem', isSubject: false },
      { text: 'maradt', isSubject: false },
      { text: 'le', isSubject: false },
      { text: 'az', isSubject: false },
      { text: 'erdei', isSubject: false },
      { text: 'túra', isSubject: false },
      { text: 'során.', isSubject: false }
    ],
    correctType: 'altalanos',
    options: defaultSubjectOptions,
    explanation: 'A "senki" tagadó értelmű általános névmás, ami mindenkire kiterjeszti a hiányt ➔ Általános alany.',
    ruleTip: 'A "senki" ugyanúgy általános alany, mint a "mindenki"!'
  },
  {
    id: 'l3_b8',
    sentence: 'Az asztalon a toll, a füzet és a radír hevert rendetlenül.',
    highlightedSubject: 'a toll, a füzet és a radír',
    words: [
      { text: 'Az', isSubject: false },
      { text: 'asztalon', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'toll,', isSubject: true },
      { text: 'a', isSubject: false },
      { text: 'füzet', isSubject: true },
      { text: 'és', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'radír', isSubject: true },
      { text: 'hevert', isSubject: false },
      { text: 'rendetlenül.', isSubject: false }
    ],
    correctType: 'hatarozott',
    isHalmozott: true,
    options: defaultSubjectOptions,
    explanation: 'A határozott névelős főnevek (a toll, a füzet, a radír) határozott alanyok. A halmozás ellenére a mondatrész fajtája határozott alany marad!',
    ruleTip: 'A határozott névelővel ellátott főnevek határozott alanyok, akár egy, akár több van belőlük.'
  },
  {
    id: 'l3_b9',
    sentence: 'Tegnap este sokáig néztétek a csillagos eget.',
    hiddenSubjectPronoun: 'ti',
    words: [
      { text: 'Tegnap', isSubject: false },
      { text: 'este', isSubject: false },
      { text: 'sokáig', isSubject: false },
      { text: 'néztétek', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'csillagos', isSubject: false },
      { text: 'eget.', isSubject: false }
    ],
    correctType: 'rejtett',
    options: defaultSubjectOptions,
    explanation: 'A "néztétek" ige T/2 ragja (-tétek) pontosan mutatja, hogy az alany a [ti], bár a mondatban nincs leírva.',
    ruleTip: 'A rejtett alany a mondat elemzésében mindig zárójelben kap helyet: [Ti].'
  },
  {
    id: 'l3_b10',
    sentence: 'Nyáron a tengerparton pihenni igazán jó volt.',
    highlightedSubject: 'pihenni',
    words: [
      { text: 'Nyáron', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'tengerparton', isSubject: false },
      { text: 'pihenni', isSubject: true },
      { text: 'igazán', isSubject: false },
      { text: 'jó', isSubject: false },
      { text: 'volt.', isSubject: false }
    ],
    correctType: 'fonevi_igenevi',
    isTrap: true,
    options: defaultSubjectOptions,
    explanation: 'Mit állítunk? ➔ jó volt (névszói-igei állítmány). Mi volt jó? ➔ pihenni! Tehát a "pihenni" főnévi igenév a mondat alanya!',
    ruleTip: 'A "jó volt, rossz volt, nehéz volt" mellett a cselekvés megnevezése (-ni) az ALANY!'
  },
  {
    id: 'l3_b11',
    sentence: 'A bölcs öregapó csendesen pipázott a tornác árnyékában.',
    highlightedSubject: 'öregapó',
    words: [
      { text: 'A', isSubject: false },
      { text: 'bölcs', isSubject: false },
      { text: 'öregapó', isSubject: true },
      { text: 'csendesen', isSubject: false },
      { text: 'pipázott', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'tornác', isSubject: false },
      { text: 'árnyékában.', isSubject: false }
    ],
    correctType: 'hatarozott',
    options: defaultSubjectOptions,
    explanation: 'A határozott névelős főnév ("az öregapó") egyértelműen megnevezi a személyt ➔ Határozott alany.',
    ruleTip: 'A határozott névelővel kísért főnevek határozott alanyt képeznek.'
  },
  {
    id: 'l3_b12',
    sentence: 'Valami furcsán megcsillant az erdei avar mélyén.',
    highlightedSubject: 'Valami',
    words: [
      { text: 'Valami', isSubject: true },
      { text: 'furcsán', isSubject: false },
      { text: 'megcsillant', isSubject: false },
      { text: 'az', isSubject: false },
      { text: 'erdei', isSubject: false },
      { text: 'avar', isSubject: false },
      { text: 'mélyén.', isSubject: false }
    ],
    correctType: 'hatarozatlan',
    options: defaultSubjectOptions,
    explanation: 'A cselekvő dolog nincs pontosan megnevezve: a "Valami" határozatlan névmás az alany.',
    ruleTip: 'A "valaki" és "valami" szavak határozatlan alanyt alkotnak.'
  },
  {
    id: 'l3_b13',
    sentence: 'Akárki könnyedén átugorhatja ezt az alacsony sövényt.',
    highlightedSubject: 'Akárki',
    words: [
      { text: 'Akárki', isSubject: true },
      { text: 'könnyedén', isSubject: false },
      { text: 'átugorhatja', isSubject: false },
      { text: 'ezt', isSubject: false },
      { text: 'az', isSubject: false },
      { text: 'alacsony', isSubject: false },
      { text: 'sövényt.', isSubject: false }
    ],
    correctType: 'altalanos',
    options: defaultSubjectOptions,
    explanation: 'Az "akárki" általános névmás, mindenkire, bárkire érvényes állítást fejez ki ➔ Általános alany.',
    ruleTip: 'Az akárki, bárki, mindenki, senki szavak általános alanyt fejeznek ki.'
  },
  {
    id: 'l3_b14',
    sentence: 'Reggel óta türelmesen várjuk a vonat indulását.',
    hiddenSubjectPronoun: 'mi',
    words: [
      { text: 'Reggel', isSubject: false },
      { text: 'óta', isSubject: false },
      { text: 'türelmesen', isSubject: false },
      { text: 'várjuk', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'vonat', isSubject: false },
      { text: 'indulását.', isSubject: false }
    ],
    correctType: 'rejtett',
    options: defaultSubjectOptions,
    explanation: 'Nincs külön szóval kitéve alany, a "várjuk" ige T/1 személyragja (-juk) árulja el: [Mi]! Rejtett alany.',
    ruleTip: 'Ha az alany nincs külön leírva a mondatban, a személyragból zárójelben azonosítjuk: [Mi].'
  },
  {
    id: 'l3_b15',
    sentence: 'A hideg téli estéken korán lefeküdni jólesik a meleg szobában.',
    highlightedSubject: 'lefeküdni',
    words: [
      { text: 'A', isSubject: false },
      { text: 'hideg', isSubject: false },
      { text: 'téli', isSubject: false },
      { text: 'estéken', isSubject: false },
      { text: 'korán', isSubject: false },
      { text: 'lefeküdni', isSubject: true },
      { text: 'jólesik', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'meleg', isSubject: false },
      { text: 'szobában.', isSubject: false }
    ],
    correctType: 'fonevi_igenevi',
    isTrap: true,
    options: defaultSubjectOptions,
    explanation: '⚠️ VIGYÁZAT! Mit állítunk? ➔ jólesik. Mi jólesik? ➔ lefeküdni! A főnévi igenév válaszol a "Mi jólesik?" kérdésre, tehát ez az alany!',
    ruleTip: 'A "jólesik, illik, szabad, tilos" mellett álló -ni végű főnévi igenév az ALANY!'
  },
  {
    id: 'l3_b16',
    sentence: 'A konyhában a tányérok és a bögrék sorakoztak a polcon.',
    highlightedSubject: 'a tányérok és a bögrék',
    words: [
      { text: 'A', isSubject: false },
      { text: 'konyhában', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'tányérok', isSubject: true },
      { text: 'és', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'bögrék', isSubject: true },
      { text: 'sorakoztak', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'polcon.', isSubject: false }
    ],
    correctType: 'hatarozott',
    isHalmozott: true,
    options: defaultSubjectOptions,
    explanation: 'A határozott névelős főnevek (a tányérok, a bögrék) határozott alanyok. Bár kettő van belőlük, a fajtájuk határozott alany marad!',
    ruleTip: 'A határozott alany fajtája a halmozástól nem változik meg.'
  }
];

// ==========================================
// 2. HALADÓ SZINTI KÉRDÉSEK (Önálló keresés + fajta)
// Teljesen új mondatok!
// ==========================================
export const LEVEL3_ADVANCED_QUESTIONS: Level3Question[] = [
  {
    id: 'l3_a1',
    sentence: 'A szorgalmas hangyák egész nyáron élelmet gyűjtenek a bolynak.',
    highlightedSubject: 'hangyák',
    words: [
      { text: 'A', isSubject: false },
      { text: 'szorgalmas', isSubject: false },
      { text: 'hangyák', isSubject: true },
      { text: 'egész', isSubject: false },
      { text: 'nyáron', isSubject: false },
      { text: 'élelmet', isSubject: false },
      { text: 'gyűjtenek', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'bolynak.', isSubject: false }
    ],
    correctType: 'hatarozott',
    options: defaultSubjectOptions,
    explanation: 'A cselekvő határozott névelős főnév ("a hangyák"), pontosan meg van nevezve: Határozott alany.',
    ruleTip: 'A határozott névelővel ellátott főnevek határozott alanyt alkotnak.'
  },
  {
    id: 'l3_a2',
    sentence: 'Valami különösen zörög a sötét padlás sarkában.',
    highlightedSubject: 'Valami',
    words: [
      { text: 'Valami', isSubject: true },
      { text: 'különösen', isSubject: false },
      { text: 'zörög', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'sötét', isSubject: false },
      { text: 'padlás', isSubject: false },
      { text: 'sarkában.', isSubject: false }
    ],
    correctType: 'hatarozatlan',
    options: defaultSubjectOptions,
    explanation: 'A beszélő nem tudja pontosan megnevezni a dolgot: a "valami" határozatlan névmás az alany.',
    ruleTip: 'A valaki és valami szavak határozatlan alanyt fejeznek ki.'
  },
  {
    id: 'l3_a3',
    sentence: 'Bárki beléphet a tornaterembe tiszta váltócipőben.',
    highlightedSubject: 'Bárki',
    words: [
      { text: 'Bárki', isSubject: true },
      { text: 'beléphet', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'tornaterembe', isSubject: false },
      { text: 'tiszta', isSubject: false },
      { text: 'váltócipőben.', isSubject: false }
    ],
    correctType: 'altalanos',
    options: defaultSubjectOptions,
    explanation: 'A "bárki" általános névmás, kivétel nélkül mindenkire érvényes a lehetőség: Általános alany.',
    ruleTip: 'Az általános alany kifejezői a mindenki, senki, bárki, akárki.'
  },
  {
    id: 'l3_a4',
    sentence: 'Hajnalban vidáman útnak indultunk a magas hegycsúcs felé.',
    hiddenSubjectPronoun: 'mi',
    words: [
      { text: 'Hajnalban', isSubject: false },
      { text: 'vidáman', isSubject: false },
      { text: 'útnak', isSubject: false },
      { text: 'indultunk', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'magas', isSubject: false },
      { text: 'hegycsúcs', isSubject: false },
      { text: 'felé.', isSubject: false }
    ],
    correctType: 'rejtett',
    options: defaultSubjectOptions,
    explanation: 'Nincs külön szó az alanyra a mondatban, de az "indultunk" T/1 személyragja (-unk) pontosan megadja: [Mi]!',
    ruleTip: 'Amikor nincs kitéve az alany, a személyragból zárójelben azonosítjuk: [Mi].'
  },
  {
    id: 'l3_a5',
    sentence: 'Kati, Zoli és Bence közösen készítette el az ünnepi plakátot.',
    highlightedSubject: 'Kati, Zoli és Bence',
    words: [
      { text: 'Kati,', isSubject: true },
      { text: 'Zoli', isSubject: true },
      { text: 'és', isSubject: false },
      { text: 'Bence', isSubject: true },
      { text: 'közösen', isSubject: false },
      { text: 'készítette', isSubject: false },
      { text: 'el', isSubject: false },
      { text: 'az', isSubject: false },
      { text: 'ünnepi', isSubject: false },
      { text: 'plakátot.', isSubject: false }
    ],
    correctType: 'hatarozott',
    isHalmozott: true,
    options: defaultSubjectOptions,
    explanation: 'Három tulajdonnév (Kati, Zoli, Bence) pontosan megnevezi az alanyokat: halmozottan is határozott alanyok maradnak!',
    ruleTip: 'A tulajdonnevek mindig határozott alanyt alkotnak, függetlenül attól, hogy hányan vannak.'
  },
  {
    id: 'l3_a6',
    sentence: 'Verseny előtt sokat gyakorolni muszáj a sikerhez.',
    highlightedSubject: 'gyakorolni',
    words: [
      { text: 'Verseny', isSubject: false },
      { text: 'előtt', isSubject: false },
      { text: 'sokat', isSubject: false },
      { text: 'gyakorolni', isSubject: true },
      { text: 'muszáj', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'sikerhez.', isSubject: false }
    ],
    correctType: 'fonevi_igenevi',
    isTrap: true,
    options: defaultSubjectOptions,
    explanation: '⚠️ VIGYÁZAT! Mit állítunk? ➔ muszáj (állítmány). Mi muszáj? ➔ gyakorolni! A főnévi igenév az ALANY!',
    ruleTip: 'A muszáj, kell, lehet, szabad mellett álló -ni végű szó az ALANY!'
  },
  {
    id: 'l3_a7',
    sentence: 'Az osztályfőnök részletesen ismertette a hétvégi kirándulás programját.',
    highlightedSubject: 'osztályfőnök',
    words: [
      { text: 'Az', isSubject: false },
      { text: 'osztályfőnök', isSubject: true },
      { text: 'részletesen', isSubject: false },
      { text: 'ismertette', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'hétvégi', isSubject: false },
      { text: 'kirándulás', isSubject: false },
      { text: 'programját.', isSubject: false }
    ],
    correctType: 'hatarozott',
    options: defaultSubjectOptions,
    explanation: 'A cselekvő ("az osztályfőnök") pontosan meg van határozva: Határozott alany.',
    ruleTip: 'A határozott névelős főnév határozott alanyt jelent.'
  },
  {
    id: 'l3_a8',
    sentence: 'Egy idegen udvariasan érdeklődött a múzeum címe után.',
    highlightedSubject: 'idegen',
    words: [
      { text: 'Egy', isSubject: false },
      { text: 'idegen', isSubject: true },
      { text: 'udvariasan', isSubject: false },
      { text: 'érdeklődött', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'múzeum', isSubject: false },
      { text: 'címe', isSubject: false },
      { text: 'után.', isSubject: false }
    ],
    correctType: 'hatarozatlan',
    options: defaultSubjectOptions,
    explanation: 'A határozatlan névelő ("egy idegen") mutatja, hogy ismeretlen személyről van szó: Határozatlan alany.',
    ruleTip: 'A határozatlan névelős főnév ("egy ember", "egy fiú") határozatlan alany.'
  },
  {
    id: 'l3_a9',
    sentence: 'A folyosón a kabátok, a sálak és a sapkák lógtak a fogasokon.',
    highlightedSubject: 'a kabátok, a sálak és a sapkák',
    words: [
      { text: 'A', isSubject: false },
      { text: 'folyosón', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'kabátok,', isSubject: true },
      { text: 'a', isSubject: false },
      { text: 'sálak', isSubject: true },
      { text: 'és', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'sapkák', isSubject: true },
      { text: 'lógtak', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'fogasokon.', isSubject: false }
    ],
    correctType: 'hatarozott',
    isHalmozott: true,
    options: defaultSubjectOptions,
    explanation: 'A határozott névelős főnevek határozott alanyok: a halmozás ellenére a fajtájuk határozott alany!',
    ruleTip: 'A határozott névelővel megnevezett alanyok fajtája határozott alany.'
  },
  {
    id: 'l3_a10',
    sentence: 'Végül sikeresen megoldottátok az egész egyenletet.',
    hiddenSubjectPronoun: 'ti',
    words: [
      { text: 'Végül', isSubject: false },
      { text: 'sikeresen', isSubject: false },
      { text: 'megoldottátok', isSubject: false },
      { text: 'az', isSubject: false },
      { text: 'egész', isSubject: false },
      { text: 'egyenletet.', isSubject: false }
    ],
    correctType: 'rejtett',
    options: defaultSubjectOptions,
    explanation: 'A "megoldottátok" ige T/2 személyragja (-átok) egyértelműen utal a cselekvőre: [Ti]! Nincs kitett szó a mondatban: Rejtett alany.',
    ruleTip: 'Rejtett alanynál az ige ragja árulja el az alanyt: [Ti].'
  },
  {
    id: 'l3_a11',
    sentence: 'A világítótorony éjszaka messzire elvilágít a viharos tengeren.',
    highlightedSubject: 'világítótorony',
    words: [
      { text: 'A', isSubject: false },
      { text: 'világítótorony', isSubject: true },
      { text: 'éjszaka', isSubject: false },
      { text: 'messzire', isSubject: false },
      { text: 'elvilágít', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'viharos', isSubject: false },
      { text: 'tengeren.', isSubject: false }
    ],
    correctType: 'hatarozott',
    options: defaultSubjectOptions,
    explanation: 'A határozott névelős főnév ("a világítótorony") pontosan megnevezi a cselekvőt: Határozott alany.',
    ruleTip: 'Határozott névelős főnév határozott alanyt képez.'
  },
  {
    id: 'l3_a12',
    sentence: 'Valaki elveszítette a piros tolltartóját a földszinti folyosón.',
    highlightedSubject: 'Valaki',
    words: [
      { text: 'Valaki', isSubject: true },
      { text: 'elveszítette', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'piros', isSubject: false },
      { text: 'tolltartóját', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'földszinti', isSubject: false },
      { text: 'folyosón.', isSubject: false }
    ],
    correctType: 'hatarozatlan',
    options: defaultSubjectOptions,
    explanation: 'A "Valaki" határozatlan névmás, nem ismerjük a személyt: Határozatlan alany.',
    ruleTip: 'A valaki és valami szavak határozatlan alanyként szerepelnek.'
  },
  {
    id: 'l3_a13',
    sentence: 'Senki sem beszélhet a teremben az írásbeli vizsga alatt.',
    highlightedSubject: 'Senki',
    words: [
      { text: 'Senki', isSubject: true },
      { text: 'sem', isSubject: false },
      { text: 'beszélhet', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'teremben', isSubject: false },
      { text: 'az', isSubject: false },
      { text: 'írásbeli', isSubject: false },
      { text: 'vizsga', isSubject: false },
      { text: 'alatt.', isSubject: false }
    ],
    correctType: 'altalanos',
    options: defaultSubjectOptions,
    explanation: 'A "Senki" tagadó általános névmás, minden egyes személyre vonatkozik: Általános alany.',
    ruleTip: 'A senki tagadó alakú általános alany.'
  },
  {
    id: 'l3_a14',
    sentence: 'Gyorsan elolvasom ezt az izgalmas fejezetet a könyvből.',
    hiddenSubjectPronoun: 'én',
    words: [
      { text: 'Gyorsan', isSubject: false },
      { text: 'elolvasom', isSubject: false },
      { text: 'ezt', isSubject: false },
      { text: 'az', isSubject: false },
      { text: 'izgalmas', isSubject: false },
      { text: 'fejezetet', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'könyvből.', isSubject: false }
    ],
    correctType: 'rejtett',
    options: defaultSubjectOptions,
    explanation: 'Nincs kifejezett alanyi szó a mondatban, az "elolvasom" ige ragja mutatja: [Én]! Rejtett alany.',
    ruleTip: 'Rejtett alany esetén a személyrag alapján találjuk ki az alanyt: [Én].'
  },
  {
    id: 'l3_a15',
    sentence: 'A piacon friss gyümölcsöt vásárolni érdemes a hétvégi napokon.',
    highlightedSubject: 'vásárolni',
    words: [
      { text: 'A', isSubject: false },
      { text: 'piacon', isSubject: false },
      { text: 'friss', isSubject: false },
      { text: 'gyümölcsöt', isSubject: false },
      { text: 'vásárolni', isSubject: true },
      { text: 'érdemes', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'hétvégi', isSubject: false },
      { text: 'napokon.', isSubject: false }
    ],
    correctType: 'fonevi_igenevi',
    isTrap: true,
    options: defaultSubjectOptions,
    explanation: '⚠️ VIGYÁZAT! Mit állítunk? ➔ érdemes (állítmány). Mi érdemes? ➔ vásárolni! A főnévi igenév a mondat alanya!',
    ruleTip: 'Az "érdemes, muszáj, kell" mellett álló -ni képzős szó az alany!'
  },
  {
    id: 'l3_a16',
    sentence: 'A virágoskertben a rózsák és a tulipánok pompáztak a tavaszi napsütésben.',
    highlightedSubject: 'a rózsák és a tulipánok',
    words: [
      { text: 'A', isSubject: false },
      { text: 'virágoskertben', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'rózsák', isSubject: true },
      { text: 'és', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'tulipánok', isSubject: true },
      { text: 'pompáztak', isSubject: false },
      { text: 'a', isSubject: false },
      { text: 'tavaszi', isSubject: false },
      { text: 'napsütésben.', isSubject: false }
    ],
    correctType: 'hatarozott',
    isHalmozott: true,
    options: defaultSubjectOptions,
    explanation: 'A határozott névelős alanyok (a rózsák és a tulipánok) pontosan meg vannak határozva: halmozottan is határozott alanyok maradnak!',
    ruleTip: 'A halmozott alanyok faji besorolása nem különül el, a típusuk határozott alany.'
  }
];

// For backwards compatibility
export const LEVEL3_QUESTIONS: Level3Question[] = LEVEL3_BASIC_QUESTIONS;
