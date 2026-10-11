export type WordRole = 'none' | 'predicate' | 'subject';

export type GameSubMode = 'basic' | 'advanced';

export interface SentenceWord {
  id: string;
  text: string;
  cleanText: string;
  role?: 'predicate' | 'subject' | 'other';
  isPunctuation?: boolean;
}

export type PredicateType = 
  | 'igei'               // Egyszerű állítmány (igei állítmány): fut, esik, írnak és olvasnak
  | 'nevszoi'            // Névszói állítmány: jelen idő E/3, T/3, nincs létige: szép, tanár, tiszta és világos
  | 'nevszoi_igei';      // Névszói-igei állítmány: szép volt, orvos lesz, fáradt volt és éhes maradt

export type SubjectType =
  | 'hatarozott'         // Határozott alany: Péter, a tanár, ők, Péter és Pál
  | 'hatarozatlan'       // Határozatlan alany: valaki, egy lány, valaki vagy valami
  | 'altalanos'          // Általános alany: mindenki, senki, az ember, bárki
  | 'rejtett'            // Rejtett alany: pl. [én], [mi], [ők]
  | 'fonevi_igenevi';    // Főnévi igenévi alany (csapda!): Tanulni kell -> alany: tanulni; Élni jó -> alany: élni

export interface Level1Question {
  id: string;
  sentence: string;
  words: {
    text: string;
    role: 'predicate' | 'subject' | 'other';
  }[];
  explanation: {
    predicateQuestion: string; // pl. "Mit állítunk? -> futnak és játszanak"
    subjectQuestion: string;    // pl. "Kik futnak és játszanak? -> a gyerekek"
    notes?: string;
  };
  isHalmozottPredicate?: boolean;
  isHalmozottSubject?: boolean;
  isTrap?: boolean; // pl. főnévi igenév mint alany
  trapHint?: string;
}

export interface Level2Question {
  id: string;
  sentence: string;
  highlightedWords: string[]; // for basic mode: words already highlighted
  words: {
    text: string;
    isPredicate: boolean;
  }[]; // for advanced mode: student clicks on words
  correctType: PredicateType;
  options: {
    type: PredicateType;
    label: string;
    description: string;
  }[];
  explanation: string;
  ruleTip: string;
  isHalmozott?: boolean;
}

export interface Level3Question {
  id: string;
  sentence: string;
  highlightedSubject?: string;
  hiddenSubjectPronoun?: string;
  words: {
    text: string;
    isSubject: boolean;
  }[]; // for advanced mode: student clicks on words (or picks 'rejtett alany')
  correctType: SubjectType;
  options: {
    type: SubjectType;
    label: string;
    description: string;
  }[];
  explanation: string;
  ruleTip: string;
  isHalmozott?: boolean;
  isTrap?: boolean;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

export interface UserStats {
  xp: number;
  streak: number;
  bestStreak: number;
  level1Score: number;
  level2Score: number;
  level3Score: number;
  completedQuestions: string[];
  unlockedBadges: string[];
  soundEnabled: boolean;
}
