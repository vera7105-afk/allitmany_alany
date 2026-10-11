'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Check, X, ArrowRight, Lightbulb, 
  ShieldAlert, HelpCircle, RotateCcw, AlertCircle, Eye
} from '@/components/Icons';
import { Level3Question, SubjectType, GameSubMode } from '@/data/types';
import { LEVEL3_BASIC_QUESTIONS, LEVEL3_ADVANCED_QUESTIONS } from '@/data/questionsLevel3';
import { soundManager } from '@/utils/soundEffects';
import { triggerConfetti } from '@/utils/confettiHelper';

interface Level3GameProps {
  basicQuestions?: Level3Question[];
  advancedQuestions?: Level3Question[];
  questions?: Level3Question[]; // fallback
  initialSubMode?: GameSubMode;
  onCorrectAnswer: (xp: number, isHalmozott?: boolean, isTrap?: boolean) => void;
  onWrongAnswer: () => void;
  onCompleteLevel: () => void;
}

export const Level3Game: React.FC<Level3GameProps> = ({
  basicQuestions = LEVEL3_BASIC_QUESTIONS,
  advancedQuestions = LEVEL3_ADVANCED_QUESTIONS,
  initialSubMode = 'basic',
  onCorrectAnswer,
  onWrongAnswer,
  onCompleteLevel
}) => {
  const [subMode, setSubMode] = useState<GameSubMode>(initialSubMode);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Active question list depending on subMode: basic vs advanced sentences are completely different!
  const currentQuestions = subMode === 'basic' ? basicQuestions : advancedQuestions;

  // Sync subMode if initialSubMode changes from outside
  useEffect(() => {
    setSubMode(initialSubMode);
    setCurrentIndex(0);
    resetQuestionState();
  }, [initialSubMode]);

  // Advanced mode internal state: step 1 = select words or claim rejtett, step 2 = select type
  const [advancedStep, setAdvancedStep] = useState<1 | 2>(1);
  const [selectedWordIndices, setSelectedWordIndices] = useState<number[]>([]);
  const [selectedRejtettClaim, setSelectedRejtettClaim] = useState(false);
  const [wordSelectionSubmitted, setWordSelectionSubmitted] = useState(false);
  const [wordSelectionFeedback, setWordSelectionFeedback] = useState<string>('');

  // Option selection state
  const [selectedType, setSelectedType] = useState<SubjectType | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentQ = currentQuestions[currentIndex % currentQuestions.length];
  const progressPercent = Math.round(((currentIndex + 1) / currentQuestions.length) * 100);

  const resetQuestionState = () => {
    setSelectedType(null);
    setSelectedWordIndices([]);
    setSelectedRejtettClaim(false);
    setAdvancedStep(1);
    setWordSelectionSubmitted(false);
    setWordSelectionFeedback('');
    setIsAnswered(false);
    setIsCorrect(false);
  };

  // Toggle word in advanced step 1
  const handleToggleWord = (index: number) => {
    if (advancedStep !== 1 || isAnswered) return;
    soundManager.playClick();
    setSelectedRejtettClaim(false);

    setSelectedWordIndices(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
    setWordSelectionFeedback('');
  };

  // Toggle rejtett claim button in step 1
  const handleToggleRejtettClaim = () => {
    if (advancedStep !== 1 || isAnswered) return;
    soundManager.playClick();
    setSelectedWordIndices([]);
    setSelectedRejtettClaim(prev => !prev);
    setWordSelectionFeedback('');
  };

  // Check word selection in advanced step 1
  const handleCheckWordSelection = () => {
    soundManager.playClick();
    setWordSelectionSubmitted(true);

    const isActuallyRejtett = currentQ.correctType === 'rejtett';

    if (isActuallyRejtett) {
      if (selectedRejtettClaim && selectedWordIndices.length === 0) {
        // Correctly identified rejtett alany!
        soundManager.playCorrect();
        setWordSelectionFeedback('');
        setAdvancedStep(2);
        return;
      } else {
        soundManager.playWrong();
        setWordSelectionFeedback('Ebben a mondatban nincs külön szóval kitéve az alany, hanem a személyrag utal rá! Keresd a [Rejtett alany] lehetőséget!');
        return;
      }
    }

    // When sentence has an expressed subject
    if (selectedRejtettClaim) {
      soundManager.playWrong();
      setWordSelectionFeedback('Ebben a mondatban VAN kitett alany a szövegben! Kérdezz rá: Ki vagy mi végzi a cselekvést?');
      return;
    }

    const targetIndices = currentQ.words
      .map((w, idx) => (w.isSubject ? idx : -1))
      .filter(idx => idx !== -1);

    const isMissing = targetIndices.some(idx => !selectedWordIndices.includes(idx));
    const hasExtra = selectedWordIndices.some(idx => !targetIndices.includes(idx));

    if (!isMissing && !hasExtra) {
      // Perfect!
      soundManager.playCorrect();
      setWordSelectionFeedback('');
      setAdvancedStep(2);
    } else {
      soundManager.playWrong();
      if (currentQ.isTrap && isMissing) {
        setWordSelectionFeedback('⚠️ Vigyázz! Főnévi igenévi alany csapda! Kérdezz rá: Mi kell / Mi jó? A -ni végű szó az ALANY!');
      } else if (currentQ.isHalmozott && isMissing) {
        setWordSelectionFeedback('Figyelem! Több alany is van a mondatban (halmozott alany)! Jelöld be mindegyiket.');
      } else if (isMissing && hasExtra) {
        setWordSelectionFeedback('Nem pontos a kijelölés. Ki vagy mi végzi a cselekvést?');
      } else if (isMissing) {
        setWordSelectionFeedback('Még hiányzik az alany vagy annak egy része a kijelölésből!');
      } else {
        setWordSelectionFeedback('Olyan szót is megjelöltél, ami nem az alany. Próbáld újra!');
      }
    }
  };

  // Show word selection answer in advanced mode
  const handleShowWordSolution = () => {
    soundManager.playClick();
    if (currentQ.correctType === 'rejtett') {
      setSelectedRejtettClaim(true);
      setSelectedWordIndices([]);
    } else {
      const targetIndices = currentQ.words
        .map((w, idx) => (w.isSubject ? idx : -1))
        .filter(idx => idx !== -1);
      setSelectedWordIndices(targetIndices);
      setSelectedRejtettClaim(false);
    }
    setWordSelectionFeedback('');
    setAdvancedStep(2);
  };

  // Select subject type
  const handleSelectOption = (type: SubjectType) => {
    if (isAnswered) return;

    setSelectedType(type);
    setIsAnswered(true);

    const isMatch = type === currentQ.correctType;
    if (isMatch) {
      setIsCorrect(true);
      soundManager.playCorrect();
      triggerConfetti();

      // Higher XP for advanced mode
      const xpGained = subMode === 'advanced'
        ? 45 + (currentQ.isTrap ? 15 : 0)
        : 30 + (currentQ.isTrap ? 15 : 0);

      onCorrectAnswer(xpGained, currentQ.isHalmozott, currentQ.isTrap);
    } else {
      setIsCorrect(false);
      soundManager.playWrong();
      onWrongAnswer();
    }
  };

  // Next question
  const handleNext = () => {
    soundManager.playClick();
    if (currentIndex + 1 < currentQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      resetQuestionState();
    } else {
      onCompleteLevel();
    }
  };

  // Switch submode
  const handleSwitchSubMode = (newMode: GameSubMode) => {
    if (newMode === subMode) return;
    soundManager.playClick();
    setSubMode(newMode);
    setCurrentIndex(0);
    resetQuestionState();
  };

  // Render sentence in basic mode (already highlighted, WITHOUT ANY SPOILER BADGE!)
  const renderSentenceBasic = () => {
    if (!currentQ.highlightedSubject) {
      // Rejtett alany: NO SPOILER BADGE AT ALL! Just display the sentence naturally.
      return (
        <span className="sentence-text-large">
          „{currentQ.sentence}”
        </span>
      );
    }

    const rawWords = currentQ.sentence.split(' ');
    const targetWords = currentQ.highlightedSubject.split(' ');

    return rawWords.map((word, idx) => {
      const cleanWord = word.replace(/[,.!?]/g, '');
      const isHighlighted = targetWords.some(tw => {
        const cleanTw = tw.replace(/[,.!?]/g, '');
        return cleanWord.toLowerCase() === cleanTw.toLowerCase();
      });

      return (
        <span
          key={idx}
          className={`sentence-render-word ${isHighlighted ? 'subject-underlined' : ''}`}
        >
          {word}
          {isHighlighted && <span className="underline-symbol subject-symbol">──</span>}
        </span>
      );
    });
  };

  return (
    <div className="game-screen level-3-game">
      {/* Game Header Bar */}
      <div className="game-header-bar">
        <div className="level-badge-tag level-3-tag">
          <span className="badge-chip">3. SZINT</span>
          <span className="badge-topic">Az alany fajtái</span>
        </div>

        {/* Submode Switcher Pill */}
        <div className="submode-switcher-pill">
          <button
            className={`submode-btn ${subMode === 'basic' ? 'submode-active' : ''}`}
            onClick={() => handleSwitchSubMode('basic')}
            title="Alapszint: Az alany már alá van húzva (ha ki van téve)"
          >
            <span>🔍 Alapszint</span>
          </button>
          <button
            className={`submode-btn submode-advanced-btn ${subMode === 'advanced' ? 'submode-active' : ''}`}
            onClick={() => handleSwitchSubMode('advanced')}
            title="Haladó szint: Először neked kell megkeresned az alanyt, majd megállapítani a fajtáját!"
          >
            <span>🎯 Haladó szint</span>
          </button>
        </div>

        <div className="question-counter">
          <span>{currentIndex + 1} / {currentQuestions.length}</span>
          <div className="progress-bar-track">
            <div className="progress-bar-fill level-3-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="game-card options-card">
        {currentQ.isTrap && (
          <div className="trap-pill-badge">
            <ShieldAlert size={16} />
            <span>Főnévi igenév veszélyzóna! Ne hagyd magad megtéveszteni!</span>
          </div>
        )}

        {currentQ.isHalmozott && (
          <div className="halmozott-pill-badge">
            <Sparkles size={16} />
            <span>Halmozott alany a fókuszban!</span>
          </div>
        )}

        {/* Instructions & Step Badges */}
        {subMode === 'basic' ? (
          <div className="instruction-box">
            <div className="mode-indicator-tag basic-tag">
              <span>Alapszint: Kiemelt alany ({currentIndex + 1}/{currentQuestions.length})</span>
            </div>
            <p className="instruction-text">
              Figyeld meg a mondatot és az esetlegesen aláhúzott (──) szót! Milyen fajtájú alany van a mondatban?
            </p>
          </div>
        ) : (
          <div className="instruction-box">
            <div className="mode-indicator-tag advanced-tag">
              <span>Haladó szint: Önálló keresés + Fajtamegállapítás ({currentIndex + 1}/{currentQuestions.length})</span>
            </div>
            {advancedStep === 1 ? (
              <div className="advanced-step-banner step-1-active">
                <span className="step-num-badge">1. LÉPÉS</span>
                <p className="instruction-text">
                  Kattints a mondatban az <strong>alany(ok)ra</strong>! Ha nincs kitett alany a mondatban, kattints a lila <strong>Rejtett alany</strong> gombra!
                </p>
              </div>
            ) : (
              <div className="advanced-step-banner step-2-active">
                <span className="step-num-badge step-success-badge">✓ 1. Lépés kész</span>
                <p className="instruction-text">
                  <strong>2. LÉPÉS:</strong> Megtaláltad az alanyt! Most <strong>válaszd ki az alany fajtáját</strong>!
                </p>
              </div>
            )}
          </div>
        )}

        {/* ----------------- SENTENCE DISPLAY ----------------- */}
        {subMode === 'basic' ? (
          /* Basic Mode Sentence Display - NO SPOILERS! */
          <div className="sentence-showcase-box subject-box-theme">
            <div className="sentence-text-large">
              {renderSentenceBasic()}
            </div>
          </div>
        ) : (
          /* Advanced Mode Sentence Display */
          <div className="advanced-sentence-box">
            <div className="words-stream">
              {currentQ.words.map((w, idx) => {
                const isSelected = selectedWordIndices.includes(idx);
                return (
                  <button
                    key={idx}
                    type="button"
                    className={`word-chip ${isSelected ? 'word-subject' : ''}`}
                    onClick={() => handleToggleWord(idx)}
                    disabled={advancedStep === 2}
                  >
                    <span className="word-text">{w.text}</span>
                    {isSelected && (
                      <span className="role-tag-bubble subject-tag">A (──)</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Special Hidden Subject Claim Button */}
            {advancedStep === 1 && (
              <div className="rejtett-claim-wrap">
                <button
                  type="button"
                  className={`rejtett-claim-btn ${selectedRejtettClaim ? 'rejtett-claim-active' : ''}`}
                  onClick={handleToggleRejtettClaim}
                >
                  <span className="claim-icon">{selectedRejtettClaim ? '✓' : '💡'}</span>
                  <span>Ebben a mondatban REJTETT ALANY van (nincs kitett szó)</span>
                </button>
              </div>
            )}

            {/* Step 1 Error Feedback */}
            {wordSelectionFeedback && advancedStep === 1 && (
              <div className="feedback-alert error-alert mt-16">
                <AlertCircle size={20} />
                <p>{wordSelectionFeedback}</p>
              </div>
            )}

            {/* Step 1 Action Buttons */}
            {advancedStep === 1 && (
              <div className="advanced-step1-actions">
                <button
                  className="subtle-btn"
                  onClick={() => { setSelectedWordIndices([]); setSelectedRejtettClaim(false); }}
                  title="Kijelölések törlése"
                >
                  <RotateCcw size={16} />
                  <span>Törlés</span>
                </button>

                {wordSelectionSubmitted && (
                  <button
                    className="subtle-btn solution-trigger-btn"
                    onClick={handleShowWordSolution}
                  >
                    <Eye size={16} />
                    <span>Megoldás</span>
                  </button>
                )}

                <button
                  className="action-btn primary-btn"
                  onClick={handleCheckWordSelection}
                  disabled={selectedWordIndices.length === 0 && !selectedRejtettClaim}
                >
                  <Check size={18} />
                  <span>Alany kijelölve ➔ Tovább a fajtájához</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ----------------- OPTIONS GRID (Available in Basic Mode, or Advanced Step 2) ----------------- */}
        {(subMode === 'basic' || advancedStep === 2) && (
          <div className="options-grid subject-options-grid">
            {currentQ.options.map(opt => {
              const isChosen = selectedType === opt.type;
              const isTarget = currentQ.correctType === opt.type;

              let cardStateClass = '';
              if (isAnswered) {
                if (isTarget) {
                  cardStateClass = 'option-correct';
                } else if (isChosen && !isCorrect) {
                  cardStateClass = 'option-wrong';
                } else {
                  cardStateClass = 'option-muted';
                }
              }

              return (
                <button
                  key={opt.type}
                  className={`option-card ${cardStateClass}`}
                  onClick={() => handleSelectOption(opt.type)}
                  disabled={isAnswered}
                >
                  <div className="option-header">
                    <div className="option-radio-circle subject-circle">
                      {isAnswered && isTarget && <Check size={16} />}
                      {isAnswered && isChosen && !isTarget && <X size={16} />}
                    </div>
                    <h4 className="option-title">{opt.label}</h4>
                  </div>
                  <p className="option-desc">{opt.description}</p>
                </button>
              );
            })}
          </div>
        )}

        {/* Feedback Section (Here and ONLY here is the complete explanation shown!) */}
        {isAnswered && (
          <div className={`feedback-alert ${isCorrect ? 'success-alert' : 'error-alert'}`}>
            <div className="feedback-content-wrap">
              <div className="feedback-title-row">
                {isCorrect ? (
                  <>
                    <Check size={22} className="check-icon" />
                    <h4>Kiváló felismerés! {subMode === 'advanced' ? 'Haladó szint sikeres (+45 XP)!' : 'Bravó!'}</h4>
                  </>
                ) : (
                  <>
                    <X size={22} className="error-icon" />
                    <h4>Nem ez volt a helyes! A helyes alanyfajta: {currentQ.options.find(o => o.type === currentQ.correctType)?.label}</h4>
                  </>
                )}
              </div>

              <p className="feedback-explanation">{currentQ.explanation}</p>

              {currentQ.hiddenSubjectPronoun && (
                <div className="exp-note mt-8 mb-8">
                  👤 <strong>Rejtett alany részletezése:</strong> A mondatban a személyrag erre a személyre utal: <strong>[{currentQ.hiddenSubjectPronoun}]</strong>.
                </div>
              )}

              <div className="rule-tip-box">
                <Lightbulb size={18} />
                <span><strong>Aranyszabály:</strong> {currentQ.ruleTip}</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Next Button */}
        {isAnswered && (
          <div className="game-card-footer justify-end">
            <button className="action-btn next-btn" onClick={handleNext}>
              <span>Következő feladat</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
