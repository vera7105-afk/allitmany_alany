'use client';

import React, { useState, useEffect } from 'react';
import { 
  Zap, Timer, Check, X, ArrowRight, RotateCcw, Award, Sparkles 
} from '@/components/Icons';
import { soundManager } from '@/utils/soundEffects';
import { triggerGrandConfetti } from '@/utils/confettiHelper';
import { shuffleArray } from '@/utils/shuffle';

interface QuickQuestion {
  id: string;
  sentence: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const RAW_QUICK_QUESTIONS: QuickQuestion[] = [
  {
    id: 'q1',
    sentence: '„Tanulni kell a dolgozatra.”',
    prompt: 'Mi a mondat ALANYA?',
    options: ['Tanulni', 'kell', 'dolgozatra', 'rejtett [én]'],
    correctAnswer: 'Tanulni',
    explanation: 'A kell az állítmány! Mi kell? -> Tanulni = főnévi igenévi alany!'
  },
  {
    id: 'q2',
    sentence: '„A szoba tiszta és világos.”',
    prompt: 'Milyen fajtájú állítmány van a mondatban?',
    options: ['Névszói állítmány', 'Egyszerű igei állítmány', 'Névszói-igei állítmány', 'Nincs állítmány'],
    correctAnswer: 'Névszói állítmány',
    explanation: 'Két névszó (tiszta, világos) zéró létigével jelen idő E/3-ban. A halmozás ellenére a fajtája: névszói állítmány!'
  },
  {
    id: 'q3',
    sentence: '„Valaki bekopogott a tanáriba.”',
    prompt: 'Milyen fajtájú alany a „Valaki”?',
    options: ['Határozatlan alany', 'Határozott alany', 'Általános alany', 'Rejtett alany'],
    correctAnswer: 'Határozatlan alany',
    explanation: 'A valaki határozatlan névmás, a cselekvő ismeretlen.'
  },
  {
    id: 'q4',
    sentence: '„Péter és Pál a táblánál dolgozik.”',
    prompt: 'Milyen fajtájú alany a „Péter és Pál”?',
    options: ['Határozott alany', 'Határozatlan alany', 'Általános alany', 'Rejtett alany'],
    correctAnswer: 'Határozott alany',
    explanation: 'Péter és Pál tulajdonnevek, pontosan meg vannak nevezve: határozott alany (halmozva)!'
  },
  {
    id: 'q5',
    sentence: '„A tegnapi meccs izgalmas volt.”',
    prompt: 'Milyen fajtájú állítmány az „izgalmas volt”?',
    options: ['Névszói-igei állítmány', 'Névszói állítmány', 'Egyszerű igei állítmány', 'Csak alany van'],
    correctAnswer: 'Névszói-igei állítmány',
    explanation: 'Névszó (izgalmas) + létige múlt időben (volt) = névszói-igei állítmány!'
  },
  {
    id: 'q6',
    sentence: '„Mindenki megértette a tananyagot.”',
    prompt: 'Milyen fajtájú alany a „Mindenki”?',
    options: ['Általános alany', 'Határozott alany', 'Határozatlan alany', 'Rejtett alany'],
    correctAnswer: 'Általános alany',
    explanation: 'A mindenki mindenkire érvényes állítást tesz: általános alany.'
  },
  {
    id: 'q7',
    sentence: '„Délután a réten futkároztunk.”',
    prompt: 'Milyen alany van a mondatban?',
    options: ['Rejtett alany: [Mi]', 'Rejtett alany: [Ti]', 'Rejtett alany: [Ők]', 'Határozott alany'],
    correctAnswer: 'Rejtett alany: [Mi]',
    explanation: 'A -unk személyrag a [mi] rejtett alanyra utal.'
  },
  {
    id: 'q8',
    sentence: '„Élni jó.”',
    prompt: 'Mi a mondat ÁLLÍTMÁNYA?',
    options: ['jó', 'Élni', 'rejtett van', 'élni jó együtt'],
    correctAnswer: 'jó',
    explanation: 'Mit állítunk? -> jó! (Mi jó? -> élni = alany).'
  },
  {
    id: 'q9',
    sentence: '„A diákok énekeltek és táncoltak.”',
    prompt: 'Milyen fajtájú állítmány az „énekeltek és táncoltak”?',
    options: ['Egyszerű igei állítmány', 'Névszói állítmány', 'Névszói-igei állítmány', 'Rejtett állítmány'],
    correctAnswer: 'Egyszerű igei állítmány',
    explanation: 'Mindkettő ragozott ige: a halmozás ellenére a fajtájuk egyszerű igei állítmány!'
  },
  {
    id: 'q10',
    sentence: '„Hány vonallal húzzuk alá az Állítmányt?”',
    prompt: 'Írásos elemzés szabálya:',
    options: ['Két párhuzamos vonallal (══)', 'Egyetlen vonallal (──)', 'Hullámos vonallal', 'Szaggatott vonallal'],
    correctAnswer: 'Két párhuzamos vonallal (══)',
    explanation: 'Az állítmányt mindig KÉT párhuzamos egyenes vonallal jelöljük!'
  },
  {
    id: 'q11',
    sentence: '„Hány vonallal húzzuk alá az Alanyt?”',
    prompt: 'Írásos elemzés szabálya:',
    options: ['Egyetlen egyenes vonallal (──)', 'Két párhuzamos vonallal (══)', 'Három vonallal', 'Nem húzzuk alá'],
    correctAnswer: 'Egyetlen egyenes vonallal (──)',
    explanation: 'Az alanyt egyetlen egyenes vízszintes vonallal jelöljük!'
  },
  {
    id: 'q12',
    sentence: '„János tanár.”',
    prompt: 'Milyen fajtájú állítmány a „tanár”?',
    options: ['Névszói állítmány', 'Egyszerű igei állítmány', 'Névszói-igei állítmány', 'Rejtett állítmány'],
    correctAnswer: 'Névszói állítmány',
    explanation: 'Kijelentő mód jelen idő E/3-ban hiányzik a létige, a tanár főnév az állítmány!'
  },
  {
    id: 'q13',
    sentence: '„Senki sem maradt le a kiránduláson.”',
    prompt: 'Milyen fajtájú alany a „Senki”?',
    options: ['Általános alany', 'Határozatlan alany', 'Határozott alany', 'Rejtett alany'],
    correctAnswer: 'Általános alany',
    explanation: 'A tagadó értelmű senki általános alany!'
  },
  {
    id: 'q14',
    sentence: '„Kora reggel felkelni nehéz volt.”',
    prompt: 'Mi a mondat ÁLLÍTMÁNYA?',
    options: ['nehéz volt', 'felkelni', 'reggel', 'kora reggel'],
    correctAnswer: 'nehéz volt',
    explanation: 'Mit állítunk? -> nehéz volt (névszói-igei Á)! A felkelni az alany!'
  },
  {
    id: 'q15',
    sentence: '„A kerti virágok illatosak.”',
    prompt: 'Milyen fajtájú állítmány az „illatosak”?',
    options: ['Névszói állítmány', 'Egyszerű igei állítmány', 'Névszói-igei állítmány', 'Rejtett állítmány'],
    correctAnswer: 'Névszói állítmány',
    explanation: 'Többes szám 3. személyben (T/3) jelen időben nincs kitéve a létige: tiszta névszói állítmány!'
  },
  {
    id: 'q16',
    sentence: '„Valaki kopogott az ablakon.”',
    prompt: 'Mi a mondat ALANYA?',
    options: ['Valaki', 'kopogott', 'ablakon', 'rejtett [ő]'],
    correctAnswer: 'Valaki',
    explanation: 'Ki kopogott? -> Valaki! Határozatlan névmási alany.'
  },
  {
    id: 'q17',
    sentence: '„Holnap mindannyian elutazunk.”',
    prompt: 'Milyen alany a „mindannyian”?',
    options: ['Általános alany', 'Határozatlan alany', 'Rejtett alany', 'Főnévi igenévi alany'],
    correctAnswer: 'Általános alany',
    explanation: 'A mindannyian minden érintettre kiterjed: általános alany!'
  },
  {
    id: 'q18',
    sentence: '„A szél zúgott és süvített a viharban.”',
    prompt: 'Milyen fajtájú állítmány a „zúgott és süvített”?',
    options: ['Egyszerű igei állítmány', 'Névszói állítmány', 'Névszói-igei állítmány', 'Általános állítmány'],
    correctAnswer: 'Egyszerű igei állítmány',
    explanation: 'Két ragozott ige alkot halmozott állítmányt, fajtája szerint egyszerű igei állítmány!'
  },
  {
    id: 'q19',
    sentence: '„A bátor katona hős maradt mindvégig.”',
    prompt: 'Milyen fajtájú állítmány a „hős maradt”?',
    options: ['Névszói-igei állítmány', 'Névszói állítmány', 'Egyszerű igei állítmány', 'Csak alany van'],
    correctAnswer: 'Névszói-igei állítmány',
    explanation: 'Névszó (hős) + segédige (maradt) = névszói-igei állítmány!'
  },
  {
    id: 'q20',
    sentence: '„Kati, Zoli és Bence közösen táncolt.”',
    prompt: 'Milyen fajtájú alany a „Kati, Zoli és Bence”?',
    options: ['Határozott alany', 'Határozatlan alany', 'Általános alany', 'Rejtett alany'],
    correctAnswer: 'Határozott alany',
    explanation: 'Tulajdonnevek, pontosan megnevezett személyek: határozott alany (hármas halmozással)!'
  }
];

interface TimeTrialGameProps {
  onAddXp: (amount: number) => void;
  onExit: () => void;
}

export const TimeTrialGame: React.FC<TimeTrialGameProps> = ({ onAddXp, onExit }) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [questions, setQuestions] = useState<QuickQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Helper to prepare randomized questions with shuffled options
  const prepareRandomizedQuestions = () => {
    const randomized = RAW_QUICK_QUESTIONS.map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    return shuffleArray(randomized);
  };

  // Timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setIsGameOver(true);
      soundManager.playFanfare();
      triggerGrandConfetti();
      onAddXp(score * 15);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, score, onAddXp]);

  const handleStart = () => {
    soundManager.playStreak();
    const randomizedQuestions = prepareRandomizedQuestions();
    setQuestions(randomizedQuestions);
    setIsRunning(true);
    setIsGameOver(false);
    setTimeLeft(60);
    setScore(0);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const handleSelectAnswer = (ans: string) => {
    if (isAnswered || !isRunning || questions.length === 0) return;

    setSelectedAnswer(ans);
    setIsAnswered(true);

    const q = questions[currentIndex % questions.length];
    if (ans === q.correctAnswer) {
      soundManager.playCorrect();
      setScore(s => s + 1);
    } else {
      soundManager.playWrong();
    }

    // Auto advance after 650ms
    setTimeout(() => {
      setSelectedAnswer(null);
      setIsAnswered(false);
      setCurrentIndex(i => i + 1);
    }, 650);
  };

  const currentQ = questions.length > 0 ? questions[currentIndex % questions.length] : null;

  return (
    <div className="game-screen time-trial-game">
      {/* Header */}
      <div className="game-header-bar">
        <div className="level-badge-tag trial-tag">
          <Zap size={18} />
          <span className="badge-chip">VILLÁMKVÍZ</span>
          <span className="badge-topic">60 Másodperces Pörgős Kihívás</span>
        </div>

        <div className="time-score-group">
          <div className={`time-badge ${timeLeft <= 10 ? 'time-danger' : ''}`}>
            <Timer size={18} />
            <span>{timeLeft} mp</span>
          </div>

          <div className="score-badge">
            <Award size={18} />
            <span>{score} pont</span>
          </div>
        </div>
      </div>

      {!isRunning && !isGameOver && (
        <div className="game-card intro-trial-card">
          <div className="intro-icon">⚡</div>
          <h2>Készen állsz a Villámkvízre?</h2>
          <p>
            Válaszolj minél több kérdésre <strong>60 másodperc alatt</strong>!
            A válaszlehetőségek minden játékban <strong>véletlenszerűen meg vannak keverve</strong>!
          </p>
          <div className="trial-features">
            <div>✓ Állítmány és alany felismerés</div>
            <div>✓ Fajták villámkérdései (igei, névszói, névszói-igei)</div>
            <div>✓ Halmozott és főnévi igenévi csapdamondatok</div>
            <div>✓ Véletlenszerű válaszsorrend minden körben</div>
          </div>
          <button className="action-btn trial-start-btn" onClick={handleStart}>
            <Zap size={20} />
            <span>Start! Induljon az óra!</span>
          </button>
        </div>
      )}

      {isRunning && currentQ && (
        <div className="game-card trial-card">
          <div className="trial-sentence-box">
            <div className="trial-sentence">{currentQ.sentence}</div>
            <div className="trial-prompt">{currentQ.prompt}</div>
          </div>

          <div className="trial-options-grid">
            {currentQ.options.map((opt, idx) => {
              let optClass = '';
              if (isAnswered) {
                if (opt === currentQ.correctAnswer) {
                  optClass = 'option-correct';
                } else if (opt === selectedAnswer) {
                  optClass = 'option-wrong';
                }
              }

              return (
                <button
                  key={idx}
                  className={`trial-opt-btn ${optClass}`}
                  onClick={() => handleSelectAnswer(opt)}
                  disabled={isAnswered}
                >
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {isGameOver && (
        <div className="game-card game-over-card">
          <div className="trophy-icon">🏆</div>
          <h2>Lejárt az idő! Szép munka!</h2>
          <p className="final-score-text">
            Végeredményed: <strong>{score}</strong> helyes válasz!
          </p>
          <div className="xp-gain-badge">
            <Sparkles size={18} />
            <span>+{score * 15} XP jóváírva!</span>
          </div>

          <div className="game-over-actions">
            <button className="action-btn primary-btn" onClick={handleStart}>
              <RotateCcw size={18} />
              <span>Újrapróbálkozom</span>
            </button>
            <button className="action-btn secondary-btn" onClick={onExit}>
              <span>Vissza a szintekhez</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
