import { Badge } from './types';

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'first_correct',
    title: 'Első Siker',
    description: 'Oldj meg helyesen legalább egy nyelvtani feladványt!',
    icon: '🎯',
    unlocked: false
  },
  {
    id: 'predicate_master',
    title: 'Kettős Aláhúzó Bajnok',
    description: 'Sikeresen azonosíts 5 állítmányt (dupla vonallal ══)!',
    icon: '⚡',
    unlocked: false,
    progress: 0,
    maxProgress: 5
  },
  {
    id: 'subject_scout',
    title: 'Egyvonalas Zseni',
    description: 'Találj meg 5 alanyt (egy vonallal ──)!',
    icon: '🔍',
    unlocked: false,
    progress: 0,
    maxProgress: 5
  },
  {
    id: 'halmozott_hero',
    title: 'Halmozó Hős',
    description: 'Oldj meg 3 halmozott mondatrészes feladványt hiba nélkül!',
    icon: '🌟',
    unlocked: false,
    progress: 0,
    maxProgress: 3
  },
  {
    id: 'trap_buster',
    title: 'Csapda-elhárító',
    description: 'Ismerd fel a főnévi igenévi alanyt ("Tanulni kell / Élni jó")!',
    icon: '🛡️',
    unlocked: false
  },
  {
    id: 'streak_5',
    title: 'Tűzszéria',
    description: 'Érj el legalább 5 egymást követő hibátlan megoldást!',
    icon: '🔥',
    unlocked: false
  },
  {
    id: 'level1_cleared',
    title: 'Mondatmag Felfedező',
    description: 'Szerezz legalább 100 pontot az 1. szinten!',
    icon: '🏆',
    unlocked: false
  },
  {
    id: 'level2_cleared',
    title: 'Állítmány Fajták Mestere',
    description: 'Szerezz legalább 100 pontot a 2. szinten!',
    icon: '👑',
    unlocked: false
  },
  {
    id: 'level3_cleared',
    title: 'Alany Fajták Szakértője',
    description: 'Szerezz legalább 100 pontot a 3. szinten!',
    icon: '💎',
    unlocked: false
  },
  {
    id: 'grand_master',
    title: 'Grammatika Nagymester',
    description: 'Gyűjts össze legalább 400 XP pontot a gyakorlás során!',
    icon: '🧙‍♂️',
    unlocked: false
  }
];
