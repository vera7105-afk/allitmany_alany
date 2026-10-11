export interface GrammarSection {
  id: string;
  title: string;
  badge: string;
  iconName: string;
  summary: string;
  questionTip: string;
  markingRule: string;
  subtypes: {
    name: string;
    description: string;
    formula?: string;
    examples: string[];
    importantNote?: string;
  }[];
}

export const GRAMMAR_THEORY: GrammarSection[] = [
  {
    id: 'allitmany',
    title: '1. Az Állítmány (Á)',
    badge: 'Két vonallal aláhúzva ══',
    iconName: 'Sparkles',
    summary: 'A mondat legfontosabb, központi tagja! Azt fejezi ki, hogy az alannyal mi történik, mit csinál, milyen vagy mivel azonos.',
    questionTip: 'Főkérdése: Mit állítunk?',
    markingRule: 'A mondatelemzésben KÉT PÁRHUZAMOS VÍZSZINTES VONALLAL (══) húzzuk alá.',
    subtypes: [
      {
        name: 'Egyszerű állítmány (Igei állítmány)',
        description: 'Egyetlen ragozott ige fejezi ki a cselekvést, történést vagy létezést.',
        formula: 'Szófaja: Ige',
        examples: [
          'A diák számol.',
          'Esik az eső.',
          'A könyv az asztalon van.'
        ]
      },
      {
        name: 'Névszói állítmány (Összetett állítmány A)',
        description: 'Csak kijelentő mód jelen idő harmadik személyben (E/3 és T/3) fordul elő! Ilyenkor a létige (van, vannak) teljesen hiányzik (zéró kopula), maga a névszó hordozza az állítást.',
        formula: 'Szófaja: Névszó (főnév, melléknév, számnév vagy névmás)',
        examples: [
          'A rózsa szép. (melléknév)',
          'János tanár. (főnév)',
          'Az eredmény három. (számnév)'
        ],
        importantNote: 'Figyelem! Ha múlt vagy jövő időbe tesszük: "szép volt", "tanár lesz" -> azonnal névszói-igeivé válik!'
      },
      {
        name: 'Névszói-igei állítmány (Összetett állítmány B)',
        description: 'Minden más időben (múlt, jövő), módban (feltételes, felszólító), valamint 1. és 2. személyben kötelezően kiteszünk egy segédigét vagy létigét.',
        formula: 'Szerkezete: Névszói rész + Igei rész (létige/segédige)',
        examples: [
          'A rózsa szép volt. (a kettőt EGYÜTT húzzuk alá két vonallal!)',
          'A rózsa szép lesz.',
          'Tanár vagyok. (rejtett alany: én)'
        ],
        importantNote: 'A névszói és igei részt EGYETLEN mondatrészként kezeljük, együtt húzzuk alá!'
      },
      {
        name: 'Halmozott állítmány',
        description: 'Olyan szerkezet, amelyben egyetlen alanyhoz több egymással mellérendelt állítás tartozik. Vesszővel vagy kötőszóval kapcsolódnak.',
        examples: [
          'A gyerekek olvasnak, írnak és számolnak. (3 igei állítmány halmozva)',
          'A szoba tiszta és világos. (2 névszói állítmány halmozva)',
          'Veronika fáradt volt, de boldog maradt. (2 névszói-igei állítmány halmozva)'
        ]
      }
    ]
  },
  {
    id: 'alany',
    title: '2. Az Alany (A)',
    badge: 'Egy vonallal aláhúzva ──',
    iconName: 'UserCheck',
    summary: 'Megnevezi azt a személyt, tárgyat vagy fogalmat, akire vagy amire az állítmány vonatkozik.',
    questionTip: 'Kérdései: Ki? Mi? Kik? Mik? + az állítmány',
    markingRule: 'A mondatelemzésben EGYETLEN EGYENES VÍZSZINTES VONALLAL (──) húzzuk alá.',
    subtypes: [
      {
        name: 'Határozott alany',
        description: 'Pontosan tudjuk, kiről vagy miről van szó. Kifejezheti határozott névelős főnév, tulajdonnév vagy személyes névmás.',
        examples: [
          'Péter olvas.',
          'A tanár magyaráz.',
          'Ők elmentek.'
        ]
      },
      {
        name: 'Határozatlan alany',
        description: 'A beszélő nem tudja vagy nem akarja pontosan megnevezni a cselekvőt (valaki, valami, egy ismeretlen).',
        examples: [
          'Valaki zörget az ajtón.',
          'Egy lány sétál a parkban.'
        ]
      },
      {
        name: 'Általános alany',
        description: 'A cselekvés mindenkire, bárkire vagy senkire sem vonatkozik (mindenki, senki, az ember, bárki). Közmondásokban gyakori!',
        examples: [
          'Mindenki megérkezett.',
          'Senki sem maradt le.',
          'Ki mint veti ágyát, úgy alussza álmát.'
        ]
      },
      {
        name: 'Rejtett alany',
        description: 'Nincs konkrét szóval kitéve a mondatban, de az ige személyragja egyértelműen elárulja! Zárójelben jelöljük: [én], [te], [mi]...',
        examples: [
          'Leckét írok. -> Rejtett alany: [Én]',
          'Megérkeztetek. -> Rejtett alany: [Ti]'
        ]
      },
      {
        name: 'Halmozott alany',
        description: 'A mondatban több azonos szerepű alany végzi egyszerre a cselekvést.',
        examples: [
          'Péter és Pál dolgozik a táblánál.',
          'Az asztalon könyv, toll és füzet hevert.',
          'Te és ő egy csoportba kerültök.'
        ]
      },
      {
        name: '⚠️ Főnévi igenévi alany (A LEGNAGYOBB CSAPDA!)',
        description: 'Amikor a mondat alanya nem főnév, hanem egy -ni végződésű főnévi igenév! A diákok gyakran összekeverik az állítmánnyal.',
        formula: 'Varázsszavak mellette: kell, muszáj, lehet, szabad, illik, jó, nehéz...',
        examples: [
          'Tanulni kell. -> Állítmány: kell (Mit állítunk?), Alany: Tanulni (Mi kell?)',
          'Élni jó. -> Állítmány: jó, Alany: Élni (Mi jó?)',
          'Kora reggel felkelni nehéz volt. -> Állítmány: nehéz volt, Alany: felkelni'
        ],
        importantNote: 'Mindig tedd fel a kérdést: "Mi kell?" -> "Tanulni!" Tehát a tanulni az ALANY, a kell az ÁLLÍTMÁNY!'
      }
    ]
  },
  {
    id: 'egyeztetes',
    title: '3. Egyeztetés és Különlegességek',
    badge: 'Nyelvtani aranyszabályok',
    iconName: 'Scale',
    summary: 'Az alanyt és az állítmányt számban, személyben és értelemben össze kell egyeztetni.',
    questionTip: 'Szám, személy és értelmi egyeztetés',
    markingRule: 'Az alany és állítmány egymással szoros szintaktikai viszonyban (predikatív viszony) áll.',
    subtypes: [
      {
        name: 'Számbeli egyeztetés & Mennyiségjelző',
        description: 'Ha az alany előtt mennyiségjelző áll (sok, kevés, tőszámnév), az alany és az állítmány is egyes számban marad!',
        examples: [
          'Helyes: Sok diák érkezett.',
          'Helytelen: Sok diákok érkeztek.'
        ]
      },
      {
        name: 'Személybeli rangsor',
        description: 'Halmozott alanyoknál: 1. személy > 2. személy > 3. személy.',
        examples: [
          'Én és a testvérem moziba megyünk (mi = T/1).',
          'Te és a barátod könyvet olvastok (ti = T/2).'
        ]
      },
      {
        name: 'Értelmi egyeztetés (Címek és gyűjtőnevek)',
        description: 'Többes számú könyvcím egy darab művet jelöl, és a gyűjtőnevek is egyes számú állítmányt kapnak!',
        examples: [
          'A kőszívű ember fiai történelmi regény (egy könyv).',
          'A harmadik osztály kirándulni ment (nem mentek).'
        ]
      }
    ]
  }
];
