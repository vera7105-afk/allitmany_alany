import { Level1Question } from './types';

export const LEVEL1_QUESTIONS: Level1Question[] = [
  {
    id: 'l1_1',
    sentence: 'A szorgalmas diák matematikát tanul a szobájában.',
    words: [
      { text: 'A', role: 'other' },
      { text: 'szorgalmas', role: 'other' },
      { text: 'diák', role: 'subject' },
      { text: 'matematikát', role: 'other' },
      { text: 'tanul', role: 'predicate' },
      { text: 'a', role: 'other' },
      { text: 'szobájában.', role: 'other' }
    ],
    explanation: {
      predicateQuestion: 'Mit állítunk? ➔ tanul (két vonallal: ══)',
      subjectQuestion: 'Ki tanul? ➔ a diák (egy vonallal: ──)',
      notes: 'Az állítmány (tanul) ige, az alany (diák) főnév.'
    }
  },
  {
    id: 'l1_2',
    sentence: 'Péter és Pál a táblánál szorgalmasan dolgozik.',
    words: [
      { text: 'Péter', role: 'subject' },
      { text: 'és', role: 'other' },
      { text: 'Pál', role: 'subject' },
      { text: 'a', role: 'other' },
      { text: 'táblánál', role: 'other' },
      { text: 'szorgalmasan', role: 'other' },
      { text: 'dolgozik.', role: 'predicate' }
    ],
    isHalmozottSubject: true,
    explanation: {
      predicateQuestion: 'Mit állítunk? ➔ dolgozik (két vonallal: ══)',
      subjectQuestion: 'Kik dolgoznak? ➔ Péter és Pál (HALMOZOTT ALANY! Mindkettőt egy vonallal: ──)',
      notes: 'Több azonos szerepű alany kapcsolódik a mondatban: Péter és Pál.'
    }
  },
  {
    id: 'l1_3',
    sentence: 'A gyerekek olvasnak, írnak és számolnak az órán.',
    words: [
      { text: 'A', role: 'other' },
      { text: 'gyerekek', role: 'subject' },
      { text: 'olvasnak,', role: 'predicate' },
      { text: 'írnak', role: 'predicate' },
      { text: 'és', role: 'other' },
      { text: 'számolnak', role: 'predicate' },
      { text: 'az', role: 'other' },
      { text: 'órán.', role: 'other' }
    ],
    isHalmozottPredicate: true,
    explanation: {
      predicateQuestion: 'Mit állítunk a gyerekekről? ➔ olvasnak, írnak és számolnak (HALMOZOTT ÁLLÍTMÁNY! Mindegyik két vonallal: ══)',
      subjectQuestion: 'Kik olvasnak, írnak és számolnak? ➔ a gyerekek (egy vonallal: ──)',
      notes: 'Egyetlen alanyhoz három mellérendelt igei állítmány kapcsolódik.'
    }
  },
  {
    id: 'l1_4',
    sentence: 'A kerti rózsa csodálatosan szép a reggeli fényben.',
    words: [
      { text: 'A', role: 'other' },
      { text: 'kerti', role: 'other' },
      { text: 'rózsa', role: 'subject' },
      { text: 'csodálatosan', role: 'other' },
      { text: 'szép', role: 'predicate' },
      { text: 'a', role: 'other' },
      { text: 'reggeli', role: 'other' },
      { text: 'fényben.', role: 'other' }
    ],
    explanation: {
      predicateQuestion: 'Mit állítunk a rózsáról? ➔ szép (két vonallal: ══, NÉVSZÓI ÁLLÍTMÁNY, nincs létige)',
      subjectQuestion: 'Mi szép? ➔ a rózsa (egy vonallal: ──)',
      notes: 'Kijelentő mód jelen idő E/3-ban a "van" létige hiányzik, maga a "szép" melléknév az állítmány!'
    }
  },
  {
    id: 'l1_5',
    sentence: 'Tanulni kell a holnapi dolgozatra.',
    words: [
      { text: 'Tanulni', role: 'subject' },
      { text: 'kell', role: 'predicate' },
      { text: 'a', role: 'other' },
      { text: 'holnapi', role: 'other' },
      { text: 'dolgozatra.', role: 'other' }
    ],
    isTrap: true,
    trapHint: '⚠️ CSAPDA! A "kell" az állítmány! Kérdezz rá: Mi kell? ➔ Tanulni!',
    explanation: {
      predicateQuestion: 'Mit állítunk? ➔ kell (két vonallal: ══)',
      subjectQuestion: 'Mi kell? ➔ Tanulni (főnévi igenévi alany, egy vonallal: ──)',
      notes: 'A "kell" mellett álló főnévi igenév (tanulni) az ALANY! Ne keverd össze az állítmánnyal!'
    }
  },
  {
    id: 'l1_6',
    sentence: 'Az asztalon könyv, toll és füzet hevert tegnap.',
    words: [
      { text: 'Az', role: 'other' },
      { text: 'asztalon', role: 'other' },
      { text: 'könyv,', role: 'subject' },
      { text: 'toll', role: 'subject' },
      { text: 'és', role: 'other' },
      { text: 'füzet', role: 'subject' },
      { text: 'hevert', role: 'predicate' },
      { text: 'tegnap.', role: 'other' }
    ],
    isHalmozottSubject: true,
    explanation: {
      predicateQuestion: 'Mit állítunk? ➔ hevert (két vonallal: ══)',
      subjectQuestion: 'Mik hevertek? ➔ könyv, toll és füzet (HÁRMAS HALMOZOTT ALANY! Mindegyik egy vonallal: ──)',
      notes: 'Három alany kapcsolódik egyetlen közös állítmányhoz.'
    }
  },
  {
    id: 'l1_7',
    sentence: 'A diákok és a tanárok énekeltek és táncoltak a tanévzárón.',
    words: [
      { text: 'A', role: 'other' },
      { text: 'diákok', role: 'subject' },
      { text: 'és', role: 'other' },
      { text: 'a', role: 'other' },
      { text: 'tanárok', role: 'subject' },
      { text: 'énekeltek', role: 'predicate' },
      { text: 'és', role: 'other' },
      { text: 'táncoltak', role: 'predicate' },
      { text: 'a', role: 'other' },
      { text: 'tanévzárón.', role: 'other' }
    ],
    isHalmozottPredicate: true,
    isHalmozottSubject: true,
    explanation: {
      predicateQuestion: 'Mit állítunk róluk? ➔ énekeltek és táncoltak (HALMOZOTT ÁLLÍTMÁNY: ══ mindkettő)',
      subjectQuestion: 'Kik énekeltek és táncoltak? ➔ diákok és tanárok (HALMOZOTT ALANY: ── mindkettő)',
      notes: 'Kettős halmozás! Egyszerre halmozott az alany (diákok, tanárok) és az állítmány (énekeltek, táncoltak).'
    }
  },
  {
    id: 'l1_8',
    sentence: 'Élni jó ezen a csodás tavaszi napon.',
    words: [
      { text: 'Élni', role: 'subject' },
      { text: 'jó', role: 'predicate' },
      { text: 'ezen', role: 'other' },
      { text: 'a', role: 'other' },
      { text: 'csodás', role: 'other' },
      { text: 'tavaszi', role: 'other' },
      { text: 'napon.', role: 'other' }
    ],
    isTrap: true,
    trapHint: '⚠️ Főnévi igenév mint alany! Mit állítunk? -> jó. Mi jó? -> Élni!',
    explanation: {
      predicateQuestion: 'Mit állítunk? ➔ jó (névszói állítmány: ══)',
      subjectQuestion: 'Mi jó? ➔ Élni (főnévi igenévi alany: ──)',
      notes: 'Az "élni" cselekvést fejez ki ugyan, de mondattani szerepe szerint itt ALANY!'
    }
  },
  {
    id: 'l1_9',
    sentence: 'A tegnapi kirándulás izgalmas volt a gyerekeknek.',
    words: [
      { text: 'A', role: 'other' },
      { text: 'tegnapi', role: 'other' },
      { text: 'kirándulás', role: 'subject' },
      { text: 'izgalmas', role: 'predicate' },
      { text: 'volt', role: 'predicate' },
      { text: 'a', role: 'other' },
      { text: 'gyerekeknek.', role: 'other' }
    ],
    explanation: {
      predicateQuestion: 'Mit állítunk a kirándulásról? ➔ izgalmas volt (NÉVSZÓI-IGEI ÁLLÍTMÁNY: mindkét szót EGYÜTT húzzuk alá két vonallal: ══)',
      subjectQuestion: 'Mi volt izgalmas? ➔ a kirándulás (egy vonallal: ──)',
      notes: 'A "névszó + létige" szerkezet egyetlen összetett mondatrészt alkot!'
    }
  },
  {
    id: 'l1_10',
    sentence: 'Kora reggel felkelni nehéz volt a hideg szobában.',
    words: [
      { text: 'Kora', role: 'other' },
      { text: 'reggel', role: 'other' },
      { text: 'felkelni', role: 'subject' },
      { text: 'nehéz', role: 'predicate' },
      { text: 'volt', role: 'predicate' },
      { text: 'a', role: 'other' },
      { text: 'hideg', role: 'other' },
      { text: 'szobában.', role: 'other' }
    ],
    isTrap: true,
    trapHint: '⚠️ Mi volt nehéz? ➔ felkelni! (Alany)',
    explanation: {
      predicateQuestion: 'Mit állítunk? ➔ nehéz volt (névszói-igei állítmány, ══ mindkét szó)',
      subjectQuestion: 'Mi volt nehéz? ➔ felkelni (főnévi igenévi alany, ──)',
      notes: 'A felkelni alany, a nehéz volt az összetett névszói-igei állítmány!'
    }
  },
  {
    id: 'l1_11',
    sentence: 'A nappali tiszta és világos volt a tavaszi takarítás után.',
    words: [
      { text: 'A', role: 'other' },
      { text: 'nappali', role: 'subject' },
      { text: 'tiszta', role: 'predicate' },
      { text: 'és', role: 'other' },
      { text: 'világos', role: 'predicate' },
      { text: 'volt', role: 'predicate' },
      { text: 'a', role: 'other' },
      { text: 'tavaszi', role: 'other' },
      { text: 'takarítás', role: 'other' },
      { text: 'után.', role: 'other' }
    ],
    isHalmozottPredicate: true,
    explanation: {
      predicateQuestion: 'Mit állítunk a nappaliról? ➔ tiszta és világos volt (HALMOZOTT NÉVSZÓI-IGEI ÁLLÍTMÁNY: ══)',
      subjectQuestion: 'Mi volt tiszta és világos? ➔ a nappali (egy vonallal: ──)',
      notes: 'Két névszói minőség kapcsolódik a létezéshez (tiszta és világos volt).'
    }
  },
  {
    id: 'l1_12',
    sentence: 'A kutya és a macska békésen alszanak a puha szőnyegen.',
    words: [
      { text: 'A', role: 'other' },
      { text: 'kutya', role: 'subject' },
      { text: 'és', role: 'other' },
      { text: 'a', role: 'other' },
      { text: 'macska', role: 'subject' },
      { text: 'békésen', role: 'other' },
      { text: 'alszanak', role: 'predicate' },
      { text: 'a', role: 'other' },
      { text: 'puha', role: 'other' },
      { text: 'szőnyegen.', role: 'other' }
    ],
    isHalmozottSubject: true,
    explanation: {
      predicateQuestion: 'Mit állítunk róluk? ➔ alszanak (két vonallal: ══)',
      subjectQuestion: 'Kik alszanak? ➔ a kutya és a macska (HALMOZOTT ALANY: mindkettő egy vonallal: ──)',
      notes: 'Két állat végzi egyszerre az alvást.'
    }
  },
  {
    id: 'l1_13',
    sentence: 'A csillagok ragyognak és tündökölnek a tiszta éjszakai égbolton.',
    words: [
      { text: 'A', role: 'other' },
      { text: 'csillagok', role: 'subject' },
      { text: 'ragyognak', role: 'predicate' },
      { text: 'és', role: 'other' },
      { text: 'tündökölnek', role: 'predicate' },
      { text: 'a', role: 'other' },
      { text: 'tiszta', role: 'other' },
      { text: 'éjszakai', role: 'other' },
      { text: 'égbolton.', role: 'other' }
    ],
    isHalmozottPredicate: true,
    explanation: {
      predicateQuestion: 'Mit állítunk a csillagokról? ➔ ragyognak és tündökölnek (HALMOZOTT ÁLLÍTMÁNY: ══ mindkettő)',
      subjectQuestion: 'Mik ragyognak és tündökölnek? ➔ a csillagok (egy vonallal: ──)',
      notes: 'Egyetlen alanyhoz két egymással mellérendelt igei állítmány tartozik.'
    }
  },
  {
    id: 'l1_14',
    sentence: 'Kati és Dóri rajzoltak, festettek és alkottak a szakkörön.',
    words: [
      { text: 'Kati', role: 'subject' },
      { text: 'és', role: 'other' },
      { text: 'Dóri', role: 'subject' },
      { text: 'rajzoltak,', role: 'predicate' },
      { text: 'festettek', role: 'predicate' },
      { text: 'és', role: 'other' },
      { text: 'alkottak', role: 'predicate' },
      { text: 'a', role: 'other' },
      { text: 'szakkörön.', role: 'other' }
    ],
    isHalmozottPredicate: true,
    isHalmozottSubject: true,
    explanation: {
      predicateQuestion: 'Mit állítunk róluk? ➔ rajzoltak, festettek és alkottak (HALMOZOTT ÁLLÍTMÁNY: ══ mindhárom)',
      subjectQuestion: 'Kik rajzoltak, festettek és alkottak? ➔ Kati és Dóri (HALMOZOTT ALANY: ── mindkettő)',
      notes: 'Kettős halmozás: halmozott alany (Kati, Dóri) és hármas halmozott állítmány!'
    }
  },
  {
    id: 'l1_15',
    sentence: 'Sokat olvasni nagyon hasznos a szókincs bővítéséhez.',
    words: [
      { text: 'Sokat', role: 'other' },
      { text: 'olvasni', role: 'subject' },
      { text: 'nagyon', role: 'other' },
      { text: 'hasznos', role: 'predicate' },
      { text: 'a', role: 'other' },
      { text: 'szókincs', role: 'other' },
      { text: 'bővítéséhez.', role: 'other' }
    ],
    isTrap: true,
    trapHint: '⚠️ CSAPDA! Mit állítunk? ➔ hasznos. Mi hasznos? ➔ olvasni!',
    explanation: {
      predicateQuestion: 'Mit állítunk? ➔ hasznos (névszói állítmány: ══)',
      subjectQuestion: 'Mi hasznos? ➔ olvasni (főnévi igenévi alany: ──)',
      notes: 'A "hasznos" névszói állítmány, a "hasznos" dolog maga az olvasás (-ni = alany)!'
    }
  },
  {
    id: 'l1_16',
    sentence: 'A tavaszi szél hűvös volt a kora reggeli órákban.',
    words: [
      { text: 'A', role: 'other' },
      { text: 'tavaszi', role: 'other' },
      { text: 'szél', role: 'subject' },
      { text: 'hűvös', role: 'predicate' },
      { text: 'volt', role: 'predicate' },
      { text: 'a', role: 'other' },
      { text: 'kora', role: 'other' },
      { text: 'reggeli', role: 'other' },
      { text: 'órákban.', role: 'other' }
    ],
    explanation: {
      predicateQuestion: 'Mit állítunk a szélről? ➔ hűvös volt (névszói-igei állítmány, ══ mindkét szó együtt)',
      subjectQuestion: 'Mi volt hűvös? ➔ a szél (egy vonallal: ──)',
      notes: 'A névszói és igei részt közösen, egyetlen mondatrészként húzzuk alá két vonallal.'
    }
  },
  {
    id: 'l1_17',
    sentence: 'Az orvos, a nővér és a mentős sietett a beteghez.',
    words: [
      { text: 'Az', role: 'other' },
      { text: 'orvos,', role: 'subject' },
      { text: 'a', role: 'other' },
      { text: 'nővér', role: 'subject' },
      { text: 'és', role: 'other' },
      { text: 'a', role: 'other' },
      { text: 'mentős', role: 'subject' },
      { text: 'sietett', role: 'predicate' },
      { text: 'a', role: 'other' },
      { text: 'beteghez.', role: 'other' }
    ],
    isHalmozottSubject: true,
    explanation: {
      predicateQuestion: 'Mit állítunk róluk? ➔ sietett (két vonallal: ══)',
      subjectQuestion: 'Kik siettek? ➔ orvos, nővér és mentős (HÁRMAS HALMOZOTT ALANY: ── mindhárom)',
      notes: 'Három egyenrangú alany kapcsolódik az állítmányhoz.'
    }
  },
  {
    id: 'l1_18',
    sentence: 'Időben elindulni muszáj a reggeli vonat eléréséhez.',
    words: [
      { text: 'Időben', role: 'other' },
      { text: 'elindulni', role: 'subject' },
      { text: 'muszáj', role: 'predicate' },
      { text: 'a', role: 'other' },
      { text: 'reggeli', role: 'other' },
      { text: 'vonat', role: 'other' },
      { text: 'eléréséhez.', role: 'other' }
    ],
    isTrap: true,
    trapHint: '⚠️ Mi muszáj? ➔ elindulni! (Alany)',
    explanation: {
      predicateQuestion: 'Mit állítunk? ➔ muszáj (két vonallal: ══)',
      subjectQuestion: 'Mi muszáj? ➔ elindulni (főnévi igenévi alany, egy vonallal: ──)',
      notes: 'A "muszáj" mellett a főnévi igenév (elindulni) a mondat alanya!'
    }
  }
];

