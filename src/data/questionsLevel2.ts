import { Level2Question, PredicateType } from './types';

const defaultOptions = [
  {
    type: 'igei' as PredicateType,
    label: 'Egyszerű (Igei) állítmány',
    description: 'Egy vagy több ragozott ige fejezi ki a cselekvést, történést vagy létezést.'
  },
  {
    type: 'nevszoi' as PredicateType,
    label: 'Névszói állítmány',
    description: 'Csak jelen idő E/3 és T/3 személyben! Nincs mellette létige (zéró kopula).'
  },
  {
    type: 'nevszoi_igei' as PredicateType,
    label: 'Névszói-igei állítmány',
    description: 'Névszó + segédige / létige összetétele (pl. volt, lesz, vagyok). Együtt húzzuk alá!'
  }
];

// ==========================================
// 1. ALAPSZINTI KÉRDÉSEK (Kiemeléssel)
// ==========================================
export const LEVEL2_BASIC_QUESTIONS: Level2Question[] = [
  {
    id: 'l2_b1',
    sentence: 'A diákok vidáman beszélgettek a szünetben.',
    highlightedWords: ['beszélgettek'],
    words: [
      { text: 'A', isPredicate: false },
      { text: 'diákok', isPredicate: false },
      { text: 'vidáman', isPredicate: false },
      { text: 'beszélgettek', isPredicate: true },
      { text: 'a', isPredicate: false },
      { text: 'szünetben.', isPredicate: false }
    ],
    correctType: 'igei',
    options: defaultOptions,
    explanation: 'A "beszélgettek" egy ragozott ige (múlt idő, T/3), önmagában hordozza a cselekvést és az igei toldalékokat.',
    ruleTip: 'Ha az állítmány egyetlen ragozott ige, akkor egyszerű (igei) állítmányról beszélünk.'
  },
  {
    id: 'l2_b2',
    sentence: 'A tavaszi rózsa csodálatosan szép a kertben.',
    highlightedWords: ['szép'],
    words: [
      { text: 'A', isPredicate: false },
      { text: 'tavaszi', isPredicate: false },
      { text: 'rózsa', isPredicate: false },
      { text: 'csodálatosan', isPredicate: false },
      { text: 'szép', isPredicate: true },
      { text: 'a', isPredicate: false },
      { text: 'kertben.', isPredicate: false }
    ],
    correctType: 'nevszoi',
    options: defaultOptions,
    explanation: 'A "szép" melléknév (névszó). Kijelentő mód jelen idő E/3 személyben a "van" létige nem jelenik meg, így a mondatrész névszói állítmány!',
    ruleTip: 'Aranyszabály: Csak kijelentő mód jelen idő 3. személyben (E/3, T/3) fordul elő, ahol a létige hiányzik!'
  },
  {
    id: 'l2_b3',
    sentence: 'A tegnapi matematika dolgozat meglepően nehéz volt.',
    highlightedWords: ['nehéz', 'volt'],
    words: [
      { text: 'A', isPredicate: false },
      { text: 'tegnapi', isPredicate: false },
      { text: 'matematika', isPredicate: false },
      { text: 'dolgozat', isPredicate: false },
      { text: 'meglepően', isPredicate: false },
      { text: 'nehéz', isPredicate: true },
      { text: 'volt.', isPredicate: true }
    ],
    correctType: 'nevszoi_igei',
    options: defaultOptions,
    explanation: 'A "nehéz" (névszó) mellett ott áll a "volt" (létige múlt időben). A két szó együtt, egyetlen mondatrészként alkotja a névszói-igei állítmányt!',
    ruleTip: 'Múlt vagy jövő időben a névszó mellé kötelező kitenni a létigét: névszó + létige = névszói-igei állítmány.'
  },
  {
    id: 'l2_b4',
    sentence: 'A gyerekek a pályán futnak, ugrálnak és nevetnek.',
    highlightedWords: ['futnak,', 'ugrálnak', 'nevetnek'],
    words: [
      { text: 'A', isPredicate: false },
      { text: 'gyerekek', isPredicate: false },
      { text: 'a', isPredicate: false },
      { text: 'pályán', isPredicate: false },
      { text: 'futnak,', isPredicate: true },
      { text: 'ugrálnak', isPredicate: true },
      { text: 'és', isPredicate: false },
      { text: 'nevetnek.', isPredicate: true }
    ],
    correctType: 'igei',
    isHalmozott: true,
    options: defaultOptions,
    explanation: 'A mondatban három azonos szerepű, mellérendelt ragozott ige kapcsolódik a "gyerekek" alanyhoz (halmozott állítmány). Bár 3 van belőlük, a fajtája egyszerű (igei) állítmány!',
    ruleTip: 'A halmozott igék esetén a mondatrész fajtája változatlanul egyszerű igei állítmány marad.'
  },
  {
    id: 'l2_b5',
    sentence: 'János nagybátyja elismert orvos a megyei kórházban.',
    highlightedWords: ['orvos'],
    words: [
      { text: 'János', isPredicate: false },
      { text: 'nagybátyja', isPredicate: false },
      { text: 'elismert', isPredicate: false },
      { text: 'orvos', isPredicate: true },
      { text: 'a', isPredicate: false },
      { text: 'megyei', isPredicate: false },
      { text: 'kórházban.', isPredicate: false }
    ],
    correctType: 'nevszoi',
    options: defaultOptions,
    explanation: 'Az "orvos" főnév (névszó). Nincs mellette "van", mégis teljes állítást fejez ki jelen idő E/3-ban. Ezért névszói állítmány.',
    ruleTip: 'Főnév is lehet állítmány, ha jelen idő E/3 vagy T/3-ban hiányzik a létige!'
  },
  {
    id: 'l2_b6',
    sentence: 'Büszke tanár vagyok ebben az iskolában.',
    highlightedWords: ['tanár', 'vagyok'],
    words: [
      { text: 'Büszke', isPredicate: false },
      { text: 'tanár', isPredicate: true },
      { text: 'vagyok', isPredicate: true },
      { text: 'ebben', isPredicate: false },
      { text: 'az', isPredicate: false },
      { text: 'iskolában.', isPredicate: false }
    ],
    correctType: 'nevszoi_igei',
    options: defaultOptions,
    explanation: 'A "tanár" névszó, a "vagyok" az 1. személyű létige. Mivel nem 3. személyről van szó, kötelező a létige jelenléte -> névszói-igei állítmány!',
    ruleTip: '1. és 2. személyben (vagyok, vagy, vagyunk, vagytok) mindig kint van a létige, így ezek névszói-igei állítmányok!'
  },
  {
    id: 'l2_b7',
    sentence: 'A könyvtár olvasóterme csendes és tágas volt a délután folyamán.',
    highlightedWords: ['csendes', 'és', 'tágas', 'volt'],
    words: [
      { text: 'A', isPredicate: false },
      { text: 'könyvtár', isPredicate: false },
      { text: 'olvasóterme', isPredicate: false },
      { text: 'csendes', isPredicate: true },
      { text: 'és', isPredicate: false },
      { text: 'tágas', isPredicate: true },
      { text: 'volt', isPredicate: true },
      { text: 'a', isPredicate: false },
      { text: 'délután', isPredicate: false },
      { text: 'folyamán.', isPredicate: false }
    ],
    correctType: 'nevszoi_igei',
    isHalmozott: true,
    options: defaultOptions,
    explanation: 'Itt két névszó (csendes + tágas) kapcsolódik a "volt" létigéhez: névszó + létige szerkezet, így a halmozás ellenére a fajtája névszói-igei állítmány!',
    ruleTip: 'Névszó(k) + létige = névszói-igei állítmány, a névszók halmozásától függetlenül!'
  },
  {
    id: 'l2_b8',
    sentence: 'A villanykörte azonnal kialudt a hirtelen áramszünet miatt.',
    highlightedWords: ['kialudt'],
    words: [
      { text: 'A', isPredicate: false },
      { text: 'villanykörte', isPredicate: false },
      { text: 'azonnal', isPredicate: false },
      { text: 'kialudt', isPredicate: true },
      { text: 'a', isPredicate: false },
      { text: 'hirtelen', isPredicate: false },
      { text: 'áramszünet', isPredicate: false },
      { text: 'miatt.', isPredicate: false }
    ],
    correctType: 'igei',
    options: defaultOptions,
    explanation: 'A "kialudt" igekötős ragozott ige (történés), egyszerű igei állítmány.',
    ruleTip: 'Az igekötős igék is egyszerű igei állítmányok!'
  },
  {
    id: 'l2_b9',
    sentence: 'Az idei nyár sokkal forróbb lesz a tavalyinál.',
    highlightedWords: ['forróbb', 'lesz'],
    words: [
      { text: 'Az', isPredicate: false },
      { text: 'idei', isPredicate: false },
      { text: 'nyár', isPredicate: false },
      { text: 'sokkal', isPredicate: false },
      { text: 'forróbb', isPredicate: true },
      { text: 'lesz', isPredicate: true },
      { text: 'a', isPredicate: false },
      { text: 'tavalyinál.', isPredicate: false }
    ],
    correctType: 'nevszoi_igei',
    options: defaultOptions,
    explanation: 'A "forróbb" középfokú melléknév (névszó), a "lesz" a létige jövő idejű alakja. Együtt alkotják a névszói-igei állítmányt.',
    ruleTip: 'Jövő időben a "lesz" segédige/létige teszi névszói-igeivé a szerkezetet.'
  },
  {
    id: 'l2_b10',
    sentence: 'A matekverseny döntőjében a feladat végeredménye negyvenkettő.',
    highlightedWords: ['negyvenkettő'],
    words: [
      { text: 'A', isPredicate: false },
      { text: 'matekverseny', isPredicate: false },
      { text: 'döntőjében', isPredicate: false },
      { text: 'a', isPredicate: false },
      { text: 'feladat', isPredicate: false },
      { text: 'végeredménye', isPredicate: false },
      { text: 'negyvenkettő.', isPredicate: true }
    ],
    correctType: 'nevszoi',
    options: defaultOptions,
    explanation: 'A "negyvenkettő" számnév (névszó). Jelen idő E/3-ban létige nélkül áll, így tiszta névszói állítmány.',
    ruleTip: 'Számnév is lehet névszói állítmány (pl. "Az eredmény három").'
  },
  {
    id: 'l2_b11',
    sentence: 'A türelmes kertész gondosan megmetszi a gyümölcsfák ágait.',
    highlightedWords: ['megmetszi'],
    words: [
      { text: 'A', isPredicate: false },
      { text: 'türelmes', isPredicate: false },
      { text: 'kertész', isPredicate: false },
      { text: 'gondosan', isPredicate: false },
      { text: 'megmetszi', isPredicate: true },
      { text: 'a', isPredicate: false },
      { text: 'gyümölcsfák', isPredicate: false },
      { text: 'ágait.', isPredicate: false }
    ],
    correctType: 'igei',
    options: defaultOptions,
    explanation: 'A "megmetszi" egy igekötős ragozott ige, önmagában egyszerű igei állítmány.',
    ruleTip: 'Az igekötős igék önállóan egyszerű igei állítmányok.'
  },
  {
    id: 'l2_b12',
    sentence: 'A magas bércek csúcsai télen hófödtek a zord hidegben.',
    highlightedWords: ['hófödtek'],
    words: [
      { text: 'A', isPredicate: false },
      { text: 'magas', isPredicate: false },
      { text: 'bércek', isPredicate: false },
      { text: 'csúcsai', isPredicate: false },
      { text: 'télen', isPredicate: false },
      { text: 'hófödtek', isPredicate: true },
      { text: 'a', isPredicate: false },
      { text: 'zord', isPredicate: false },
      { text: 'hidegben.', isPredicate: false }
    ],
    correctType: 'nevszoi',
    options: defaultOptions,
    explanation: 'A "hófödtek" melléknév (névszó). T/3 személyben jelen időben hiányzik a létige ("vannak"), így tiszta névszói állítmány!',
    ruleTip: 'Többes szám 3. személyben (T/3) is névszói állítmányról beszélünk, ha nincs kitett létige.'
  },
  {
    id: 'l2_b13',
    sentence: 'A bátor tűzoltók fáradhatatlanok maradtak az éjszakai mentés során.',
    highlightedWords: ['fáradhatatlanok', 'maradtak'],
    words: [
      { text: 'A', isPredicate: false },
      { text: 'bátor', isPredicate: false },
      { text: 'tűzoltók', isPredicate: false },
      { text: 'fáradhatatlanok', isPredicate: true },
      { text: 'maradtak', isPredicate: true },
      { text: 'az', isPredicate: false },
      { text: 'éjszakai', isPredicate: false },
      { text: 'mentés', isPredicate: false },
      { text: 'során.', isPredicate: false }
    ],
    correctType: 'nevszoi_igei',
    options: defaultOptions,
    explanation: 'A "fáradhatatlanok" névszó mellett a "maradtak" segédige áll. Együtt alkotják a névszói-igei állítmányt!',
    ruleTip: 'A "marad" és "lesz" segédigék a névszóval összekapcsolódva névszói-igei állítmányt adnak.'
  },
  {
    id: 'l2_b14',
    sentence: 'A kis patak csörgedezett és kanyargott a zöldellő réten.',
    highlightedWords: ['csörgedezett', 'és', 'kanyargott'],
    words: [
      { text: 'A', isPredicate: false },
      { text: 'kis', isPredicate: false },
      { text: 'patak', isPredicate: false },
      { text: 'csörgedezett', isPredicate: true },
      { text: 'és', isPredicate: false },
      { text: 'kanyargott', isPredicate: true },
      { text: 'a', isPredicate: false },
      { text: 'zöldellő', isPredicate: false },
      { text: 'réten.', isPredicate: false }
    ],
    correctType: 'igei',
    isHalmozott: true,
    options: defaultOptions,
    explanation: 'Két mellérendelt ragozott ige (csörgedezett + kanyargott) kapcsolódik a patak alanyhoz. Bár halmozott, a fajtája egyszerű igei állítmány!',
    ruleTip: 'Ha több ragozott ige szerepel halmozva, a mondatrész fajtája egyszerű igei állítmány marad.'
  },
  {
    id: 'l2_b15',
    sentence: 'A holnapi mérkőzés előtt ti is izgatottak vagytok a lelátón.',
    highlightedWords: ['izgatottak', 'vagytok'],
    words: [
      { text: 'A', isPredicate: false },
      { text: 'holnapi', isPredicate: false },
      { text: 'mérkőzés', isPredicate: false },
      { text: 'előtt', isPredicate: false },
      { text: 'ti', isPredicate: false },
      { text: 'is', isPredicate: false },
      { text: 'izgatottak', isPredicate: true },
      { text: 'vagytok', isPredicate: true },
      { text: 'a', isPredicate: false },
      { text: 'lelátón.', isPredicate: false }
    ],
    correctType: 'nevszoi_igei',
    options: defaultOptions,
    explanation: 'A "vagytok" létige T/2-ben kötelező a névszó ("izgatottak") mellett ➔ névszói-igei állítmány!',
    ruleTip: '2. személyben kötelező kitenni a létigét: névszó + vagytok = névszói-igei állítmány.'
  },
  {
    id: 'l2_b16',
    sentence: 'Az erdőben a fák suhogtak, hajladoztak és recsegtek az orkánban.',
    highlightedWords: ['suhogtak,', 'hajladoztak', 'recsegtek'],
    words: [
      { text: 'Az', isPredicate: false },
      { text: 'erdőben', isPredicate: false },
      { text: 'a', isPredicate: false },
      { text: 'fák', isPredicate: false },
      { text: 'suhogtak,', isPredicate: true },
      { text: 'hajladoztak', isPredicate: true },
      { text: 'és', isPredicate: false },
      { text: 'recsegtek', isPredicate: true },
      { text: 'az', isPredicate: false },
      { text: 'orkánban.', isPredicate: false }
    ],
    correctType: 'igei',
    isHalmozott: true,
    options: defaultOptions,
    explanation: 'Három mellérendelt ragozott ige (suhogtak, hajladoztak, recsegtek) tartozik a fák alanyhoz: a halmozás ellenére a fajtája igei állítmány!',
    ruleTip: 'A halmozott igei állítmány szófaji/alaktani fajtája egyszerű igei állítmány.'
  }
];

// ==========================================
// 2. HALADÓ SZINTI KÉRDÉSEK (Önálló keresés + fajta)
// Teljesen új mondatok!
// ==========================================
export const LEVEL2_ADVANCED_QUESTIONS: Level2Question[] = [
  {
    id: 'l2_a1',
    sentence: 'A fürge mókus gyorsan felmászott a magas fenyőfára.',
    highlightedWords: ['felmászott'],
    words: [
      { text: 'A', isPredicate: false },
      { text: 'fürge', isPredicate: false },
      { text: 'mókus', isPredicate: false },
      { text: 'gyorsan', isPredicate: false },
      { text: 'felmászott', isPredicate: true },
      { text: 'a', isPredicate: false },
      { text: 'magas', isPredicate: false },
      { text: 'fenyőfára.', isPredicate: false }
    ],
    correctType: 'igei',
    options: defaultOptions,
    explanation: 'A "felmászott" egy igekötős ragozott ige, önállóan hordozza a cselekvést: egyszerű igei állítmány!',
    ruleTip: 'Az egyetlen ragozott igéből álló mondatmag mindig egyszerű igei állítmány.'
  },
  {
    id: 'l2_a2',
    sentence: 'A hegyi patak vize kristálytiszta és hűvös a forrásnál.',
    highlightedWords: ['kristálytiszta', 'és', 'hűvös'],
    words: [
      { text: 'A', isPredicate: false },
      { text: 'hegyi', isPredicate: false },
      { text: 'patak', isPredicate: false },
      { text: 'vize', isPredicate: false },
      { text: 'kristálytiszta', isPredicate: true },
      { text: 'és', isPredicate: false },
      { text: 'hűvös', isPredicate: true },
      { text: 'a', isPredicate: false },
      { text: 'forrásnál.', isPredicate: false }
    ],
    correctType: 'nevszoi',
    isHalmozott: true,
    options: defaultOptions,
    explanation: 'Két névszó ("kristálytiszta" + "hűvös") hordozza az állítást jelen idő E/3 személyben zéró létigével. Bár halmozottak, a fajtájuk tiszta névszói állítmány!',
    ruleTip: 'Ha létige nélküli névszók halmozódnak jelen idő E/3-ban, a mondatrész fajtája névszói állítmány marad!'
  },
  {
    id: 'l2_a3',
    sentence: 'A régészcsoport vezetője tapasztalt kutató már évtizedek óta.',
    highlightedWords: ['kutató'],
    words: [
      { text: 'A', isPredicate: false },
      { text: 'régészcsoport', isPredicate: false },
      { text: 'vezetője', isPredicate: false },
      { text: 'tapasztalt', isPredicate: false },
      { text: 'kutató', isPredicate: true },
      { text: 'már', isPredicate: false },
      { text: 'évtizedek', isPredicate: false },
      { text: 'óta.', isPredicate: false }
    ],
    correctType: 'nevszoi',
    options: defaultOptions,
    explanation: 'A "kutató" főnév. Jelen idő E/3-ban nincs mellette "van" létige, maga a főnév az állítmány ➔ névszói állítmány!',
    ruleTip: 'Kijelentő mód jelen idő E/3-ban hiányzik a létige, így tiszta névszói állítmányról beszélünk.'
  },
  {
    id: 'l2_a4',
    sentence: 'A döntő mérkőzés után a játékosok nagyon kimerültek voltak.',
    highlightedWords: ['kimerültek', 'voltak'],
    words: [
      { text: 'A', isPredicate: false },
      { text: 'döntő', isPredicate: false },
      { text: 'mérkőzés', isPredicate: false },
      { text: 'után', isPredicate: false },
      { text: 'a', isPredicate: false },
      { text: 'játékosok', isPredicate: false },
      { text: 'nagyon', isPredicate: false },
      { text: 'kimerültek', isPredicate: true },
      { text: 'voltak.', isPredicate: true }
    ],
    correctType: 'nevszoi_igei',
    options: defaultOptions,
    explanation: 'A "kimerültek" névszó (melléknév) mellett ott a "voltak" létige. Együtt, egyetlen mondatrészként húzzuk alá őket két vonallal: névszói-igei állítmány!',
    ruleTip: 'Múlt időben kötelező kitenni a létigét: névszó + létige = névszói-igei állítmány.'
  },
  {
    id: 'l2_a5',
    sentence: 'A zenészek hegedültek, fuvoláztak és doboltak az ünnepségen.',
    highlightedWords: ['hegedültek,', 'fuvoláztak', 'doboltak'],
    words: [
      { text: 'A', isPredicate: false },
      { text: 'zenészek', isPredicate: false },
      { text: 'hegedültek,', isPredicate: true },
      { text: 'fuvoláztak', isPredicate: true },
      { text: 'és', isPredicate: false },
      { text: 'doboltak', isPredicate: true },
      { text: 'az', isPredicate: false },
      { text: 'ünnepségen.', isPredicate: false }
    ],
    correctType: 'igei',
    isHalmozott: true,
    options: defaultOptions,
    explanation: 'Három ragozott ige (hegedültek, fuvoláztak, doboltak) kapcsolódik a "zenészek" alanyhoz: a fajtája egyszerű igei állítmány!',
    ruleTip: 'A halmozott igei állítmány faji besorolása egyszerű igei állítmány.'
  },
  {
    id: 'l2_a6',
    sentence: 'A kisbaba békésen szundikál a meleg babakocsiban.',
    highlightedWords: ['szundikál'],
    words: [
      { text: 'A', isPredicate: false },
      { text: 'kisbaba', isPredicate: false },
      { text: 'békésen', isPredicate: false },
      { text: 'szundikál', isPredicate: true },
      { text: 'a', isPredicate: false },
      { text: 'meleg', isPredicate: false },
      { text: 'babakocsiban.', isPredicate: false }
    ],
    correctType: 'igei',
    options: defaultOptions,
    explanation: 'A "szundikál" ragozott ige (cselekvés/állapot), egyszerű igei állítmány.',
    ruleTip: 'Az egyetlen ragozott ige önmagában egyszerű igei állítmány.'
  },
  {
    id: 'l2_a7',
    sentence: 'Az erdő fái sárgák és aranylóak lettek az őszi hűvösben.',
    highlightedWords: ['sárgák', 'és', 'aranylóak', 'lettek'],
    words: [
      { text: 'Az', isPredicate: false },
      { text: 'erdő', isPredicate: false },
      { text: 'fái', isPredicate: false },
      { text: 'sárgák', isPredicate: true },
      { text: 'és', isPredicate: false },
      { text: 'aranylóak', isPredicate: true },
      { text: 'lettek', isPredicate: true },
      { text: 'az', isPredicate: false },
      { text: 'őszi', isPredicate: false },
      { text: 'hűvösben.', isPredicate: false }
    ],
    correctType: 'nevszoi_igei',
    isHalmozott: true,
    options: defaultOptions,
    explanation: 'A "sárgák és aranylóak" névszók mellett a "lettek" segédige áll: névszó(k) + segédige, ezért a fajtája névszói-igei állítmány!',
    ruleTip: 'A "lett, maradt, volt" segédigék a névszókkal névszói-igei állítmányt alkotnak, halmozás esetén is.'
  },
  {
    id: 'l2_a8',
    sentence: 'Nagyon hálásak leszünk a segítségetekért a költözéskor.',
    highlightedWords: ['hálásak', 'leszünk'],
    words: [
      { text: 'Nagyon', isPredicate: false },
      { text: 'hálásak', isPredicate: true },
      { text: 'leszünk', isPredicate: true },
      { text: 'a', isPredicate: false },
      { text: 'segítségetekért', isPredicate: false },
      { text: 'a', isPredicate: false },
      { text: 'költözéskor.', isPredicate: false }
    ],
    correctType: 'nevszoi_igei',
    options: defaultOptions,
    explanation: 'A "hálásak" névszó, a "leszünk" a létige jövő idejű T/1 alakja. Együtt alkotják a névszói-igei állítmányt!',
    ruleTip: 'Jövő időben a "lesz / leszünk" alak teszi névszói-igeivé az állítmányt.'
  },
  {
    id: 'l2_a9',
    sentence: 'A múzeum belépőjegye a diákok számára ezer forint.',
    highlightedWords: ['ezer', 'forint'],
    words: [
      { text: 'A', isPredicate: false },
      { text: 'múzeum', isPredicate: false },
      { text: 'belépőjegye', isPredicate: false },
      { text: 'a', isPredicate: false },
      { text: 'diákok', isPredicate: false },
      { text: 'számára', isPredicate: false },
      { text: 'ezer', isPredicate: true },
      { text: 'forint.', isPredicate: true }
    ],
    correctType: 'nevszoi',
    options: defaultOptions,
    explanation: 'Az "ezer forint" névszói szerkezet (számnév + főnév). Jelen idő E/3-ban nincs mellette létige: névszói állítmány!',
    ruleTip: 'Számnév vagy összetett névszói érték is lehet névszói állítmány zéró kopulával.'
  },
  {
    id: 'l2_a10',
    sentence: 'A kirándulók végig vidámak maradtak a hirtelen zápor ellenére is.',
    highlightedWords: ['vidámak', 'maradtak'],
    words: [
      { text: 'A', isPredicate: false },
      { text: 'kirándulók', isPredicate: false },
      { text: 'végig', isPredicate: false },
      { text: 'vidámak', isPredicate: true },
      { text: 'maradtak', isPredicate: true },
      { text: 'a', isPredicate: false },
      { text: 'hirtelen', isPredicate: false },
      { text: 'zápor', isPredicate: false },
      { text: 'ellenére', isPredicate: false },
      { text: 'is.', isPredicate: false }
    ],
    correctType: 'nevszoi_igei',
    options: defaultOptions,
    explanation: 'A "vidámak" (névszó) mellett a "maradtak" segédige áll: névszói-igei állítmány!',
    ruleTip: 'A "marad" és "lesz" igék névszóval összekapcsolódva névszói-igei állítmányt képeznek.'
  },
  {
    id: 'l2_a11',
    sentence: 'A postás délben becsúsztatta a vastag levelet a postaládába.',
    highlightedWords: ['becsúsztatta'],
    words: [
      { text: 'A', isPredicate: false },
      { text: 'postás', isPredicate: false },
      { text: 'délben', isPredicate: false },
      { text: 'becsúsztatta', isPredicate: true },
      { text: 'a', isPredicate: false },
      { text: 'vastag', isPredicate: false },
      { text: 'levelet', isPredicate: false },
      { text: 'a', isPredicate: false },
      { text: 'postaládába.', isPredicate: false }
    ],
    correctType: 'igei',
    options: defaultOptions,
    explanation: 'A "becsúsztatta" egy igekötős ragozott ige, önálló cselekvést fejez ki: egyszerű igei állítmány!',
    ruleTip: 'Az egyetlen ragozott igéből álló mondatmag egyszerű igei állítmány.'
  },
  {
    id: 'l2_a12',
    sentence: 'A szomszéd bácsi híres mesemondó a környékbeli falvakban.',
    highlightedWords: ['mesemondó'],
    words: [
      { text: 'A', isPredicate: false },
      { text: 'szomszéd', isPredicate: false },
      { text: 'bácsi', isPredicate: false },
      { text: 'híres', isPredicate: false },
      { text: 'mesemondó', isPredicate: true },
      { text: 'a', isPredicate: false },
      { text: 'környékbeli', isPredicate: false },
      { text: 'falvakban.', isPredicate: false }
    ],
    correctType: 'nevszoi',
    options: defaultOptions,
    explanation: 'A "mesemondó" főnév. Jelen idő E/3-ban nincs kitéve létige, önmagában alkot állítmányt: tiszta névszói állítmány!',
    ruleTip: 'Főnév is betöltheti az állítmány szerepét létige nélkül E/3-ban.'
  },
  {
    id: 'l2_a13',
    sentence: 'Az új sportcsarnok rendkívül korszerű lett az átépítés után.',
    highlightedWords: ['korszerű', 'lett'],
    words: [
      { text: 'Az', isPredicate: false },
      { text: 'új', isPredicate: false },
      { text: 'sportcsarnok', isPredicate: false },
      { text: 'rendkívül', isPredicate: false },
      { text: 'korszerű', isPredicate: true },
      { text: 'lett', isPredicate: true },
      { text: 'az', isPredicate: false },
      { text: 'átépítés', isPredicate: false },
      { text: 'után.', isPredicate: false }
    ],
    correctType: 'nevszoi_igei',
    options: defaultOptions,
    explanation: 'A "korszerű" névszó és a "lett" segédige együtt képezi az állítmányt: névszói-igei állítmány!',
    ruleTip: 'A "lett" segédige a névszóval összekapcsolódva névszói-igei állítmányt alkot.'
  },
  {
    id: 'l2_a14',
    sentence: 'A viharban a villámok fényesen cikáztak és sűrűn csapkodtak a falu felett.',
    highlightedWords: ['cikáztak', 'csapkodtak'],
    words: [
      { text: 'A', isPredicate: false },
      { text: 'viharban', isPredicate: false },
      { text: 'a', isPredicate: false },
      { text: 'villámok', isPredicate: false },
      { text: 'fényesen', isPredicate: false },
      { text: 'cikáztak', isPredicate: true },
      { text: 'és', isPredicate: false },
      { text: 'sűrűn', isPredicate: false },
      { text: 'csapkodtak', isPredicate: true },
      { text: 'a', isPredicate: false },
      { text: 'falu', isPredicate: false },
      { text: 'felett.', isPredicate: false }
    ],
    correctType: 'igei',
    isHalmozott: true,
    options: defaultOptions,
    explanation: 'Két ragozott ige (cikáztak + csapkodtak) kapcsolódik mellérendelve a villámok alanyhoz: a fajtája egyszerű igei állítmány!',
    ruleTip: 'Két egyenrangú ige esetén a mondatrész fajtája egyszerű igei állítmány marad.'
  },
  {
    id: 'l2_a15',
    sentence: 'A kirándulás mai útvonala tizenöt kilométer a hegyi terepen.',
    highlightedWords: ['tizenöt', 'kilométer'],
    words: [
      { text: 'A', isPredicate: false },
      { text: 'kirándulás', isPredicate: false },
      { text: 'mai', isPredicate: false },
      { text: 'útvonala', isPredicate: false },
      { text: 'tizenöt', isPredicate: true },
      { text: 'kilométer', isPredicate: true },
      { text: 'a', isPredicate: false },
      { text: 'hegyi', isPredicate: false },
      { text: 'terepen.', isPredicate: false }
    ],
    correctType: 'nevszoi',
    options: defaultOptions,
    explanation: 'A "tizenöt kilométer" mennyiséget jelölő névszói szerkezet. Jelen idő E/3 személyben zéró kopulával áll: névszói állítmány!',
    ruleTip: 'Számnév és mértékegység együtt is lehet névszói állítmány.'
  },
  {
    id: 'l2_a16',
    sentence: 'A bajnoki győzelem pillanatában végtelenül büszkék voltunk rátok.',
    highlightedWords: ['büszkék', 'voltunk'],
    words: [
      { text: 'A', isPredicate: false },
      { text: 'bajnoki', isPredicate: false },
      { text: 'győzelem', isPredicate: false },
      { text: 'pillanatában', isPredicate: false },
      { text: 'végtelenül', isPredicate: false },
      { text: 'büszkék', isPredicate: true },
      { text: 'voltunk', isPredicate: true },
      { text: 'rátok.', isPredicate: false }
    ],
    correctType: 'nevszoi_igei',
    options: defaultOptions,
    explanation: 'A "büszkék" névszó mellett a múlt idejű "voltunk" létige áll T/1 személyben: névszói-igei állítmány!',
    ruleTip: 'Múlt időben a létige kötelező a névszó mellett, így névszói-igei állítmány jön létre.'
  }
];

// For backwards compatibility
export const LEVEL2_QUESTIONS: Level2Question[] = LEVEL2_BASIC_QUESTIONS;
