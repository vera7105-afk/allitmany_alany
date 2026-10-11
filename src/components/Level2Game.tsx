'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Check, X, ArrowRight, Lightbulb, 
  HelpCircle, RotateCcw, AlertCircle, Eye
} from '@/components/Icons';
import { Level2Question, PredicateType, GameSubMode } from '@/data/types';
import { LEVEL2_BASIC_QUESTIONS, LEVEL2_ADVANCED_QUESTIONS } from '@/data/questionsLevel2';
import { soundManager } from '@/utils/soundEffects';
import { triggerConfetti } from '@/utils/confettiHelper';

interface Level2GameProps {
  basicQuestions?: Level2Question[];
  advancedQuestions?: Level2Question[];
  questions?: Level2Question[]; // fallback
  initialSubMode?: GameSubMode;
  onCorrectAnswer: (xp: number, isHalmozott?: boolean) => void;
  onWrongAnswer: () => void;
  onCompleteLevel: () => void;
}

export const Level2Game: React.FC<Level2GameProps> = ({
  basicQuestions = LEVEL2_BASIC_QUESTIONS,
  advancedQuestions = LEVEL2_ADVANCED_QUESTIONS,
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

  // Advanced mode internal state: step 1 = select words, step 2 = select type
  const [advancedStep, setAdvancedStep] = useState<1 | 2>(1);
  const [selectedWordIndices, setSelectedWordIndices] = useState<number[]>([]);
  const [wordSelectionSubmitted, setWordSelectionSubmitted] = useState(false);
  const [wordSelectionFeedback, setWordSelectionFeedback] = useState<string>('');

  // Option selection state
  const [selectedType, setSelectedType] = useState<PredicateType | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentQ = currentQuestions[currentIndex % currentQuestions.length];
  const progressPercent = Math.round(((currentIndex + 1) / currentQuestions.length) * 100);

  const resetQuestionState = () => {
    setSelectedType(null);
    setSelectedWordIndices([]);
    setAdvancedStep(1);
    setWordSelectionSubmitted(false);
    setWordSelectionFeedback('');
    setIsAnswered(false);
    setIsCorrect(false);
  };

  // Toggle word selection in advanced mode step 1
  const handleToggleWord = (index: number) => {
    if (advancedStep !== 1 || isAnswered) return;
    soundManager.playClick();

    setSelectedWordIndices(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
    setWordSelectionFeedback('');
  };

  // Check word selection in advanced mode step 1
  const handleCheckWordSelection = () => {
    soundManager.playClick();
    setWordSelectionSubmitted(true);

    const targetIndices = currentQ.words
      .map((w, idx) => (w.isPredicate ? idx : -1))
      .filter(idx => idx !== -1);

    const isMissing = targetIndices.some(idx => !selectedWordIndices.includes(idx));
    const hasExtra = selectedWordIndices.some(idx => !targetIndices.includes(idx));

    if (!isMissing && !hasExtra) {
      // Perfect selection! Advance to step 2
      soundManager.playCorrect();
      setWordSelectionFeedback('');
      setAdvancedStep(2);
    } else {
      soundManager.playWrong();
      if (currentQ.isHalmozott && isMissing) {
        setWordSelectionFeedback('Figyelem! Ebben a mondatban halmozott állítmány van (több szót kell megjelölnöd)!');
      } else if (isMissing && hasExtra) {
        setWordSelectionFeedback('Nem pontos a kijelölés. Kérdezz rá: Mit állítunk a mondatban?');
      } else if (isMissing) {
        setWordSelectionFeedback('Még nem jelölted meg az állítmány minden részét! Keresd meg a cselekvést vagy a névszót.');
      } else {
        setWordSelectionFeedback('Olyan szót is megjelöltél, ami nem tartozik az állítmányhoz. Próbáld újra!');
      }
    }
  };

  // Show word selection answer in advanced mode
  const handleShowWordSolution = () => {
    soundManager.playClick();
    const targetIndices = currentQ.words
      .map((w, idx) => (w.isPredicate ? idx : -1))
      .filter(idx => idx !== -1);
    setSelectedWordIndices(targetIndices);
    setWordSelectionFeedback('');
    setAdvancedStep(2);
  };

  // Select predicate type
  const handleSelectOption = (type: PredicateType) => {
    if (isAnswered) return;

    setSelectedType(type);
    setIsAnswered(true);

    if (type === currentQ.correctType) {
      setIsCorrect(true);
      soundManager.playCorrect();
      triggerConfetti();

      // Higher XP for advanced mode
      const xpGained = subMode === 'advanced'
        ? 45 + (currentQ.isHalmozott ? 10 : 0)
        : 30 + (currentQ.isHalmozott ? 10 : 0);

      onCorrectAnswer(xpGained, currentQ.isHalmozott);
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

  // Render sentence in basic mode (already highlighted)
  const renderSentenceBasic = () => {
    const rawWords = currentQ.sentence.split(' ');
    return rawWords.map((word, idx) => {
      const cleanWord = word.replace(/[,.!?]/g, '');
      const isHighlighted = currentQ.highlightedWords.some(hw => {
        const cleanHw = hw.replace(/[,.!?]/g, '');
        return cleanWord === cleanHw || word === hw;
      });

      return (
        <span
          key={idx}
          className={`sentence-render-word ${isHighlighted ? 'predicate-underlined' : ''}`}
        >
          {word}
          {isHighlighted && <span className="underline-symbol">══</span>}
        </span>
      );
    });
  };

  return (
    <div className="game-screen level-2-game">
      {/* Game Header Bar */}
      <div className="game-header-bar">
        <div className="level-badge-tag level-2-tag">
          <span className="badge-chip">2. SZINT</span>
          <span className="badge-topic">Az állítmány fajtái</span>
        </div>

        {/* Submode Switcher Pill */}
        <div className="submode-switcher-pill">
          <button
            className={`submode-btn ${subMode === 'basic' ? 'submode-active' : ''}`}
            onClick={() => handleSwitchSubMode('basic')}
            title="Alapszint: Az állítmány már alá van húzva"
          >
            <span>🔍 Alapszint</span>
          </button>
          <button
            className={`submode-btn submode-advanced-btn ${subMode === 'advanced' ? 'submode-active' : ''}`}
            onClick={() => handleSwitchSubMode('advanced')}
            title="Haladó szint: Először neked kell megkeresned az állítmányt, majd megállapítani a fajtáját!"
          >
            <span>🎯 Haladó szint</span>
          </button>
        </div>

        <div className="question-counter">
          <span>{currentIndex + 1} / {currentQuestions.length}</span>
          <div className="progress-bar-track">
            <div className="progress-bar-fill level-2-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="game-card options-card">
        {/* Halmozott Banner */}
        {currentQ.isHalmozott && (
          <div className="halmozott-pill-badge">
            <Sparkles size={16} />
            <span>Halmozott mondatrész a fókuszban!</span>
          </div>
        )}

        {/* Instructions & Step Badges */}
        {subMode === 'basic' ? (
          <div className="instruction-box">
            <div className="mode-indicator-tag basic-tag">
              <span>Alapszint: Kiemelt állítmány ({currentIndex + 1}/{currentQuestions.length})</span>
            </div>
            <p className="instruction-text">
              Figyeld meg a két vonallal (══) aláhúzott <strong>állítmányt</strong> a mondatban! Milyen fajtájú?
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
                  Kattints a mondatban az <strong>állítmány(ok)ra</strong>! (Ha halmozott, jelöld be mindegyiket!)
                </p>
              </div>
            ) : (
              <div className="advanced-step-banner step-2-active">
                <span className="step-num-badge step-success-badge">✓ 1. Lépés kész</span>
                <p className="instruction-text">
                  <strong>2. LÉPÉS:</strong> Megtaláltad az állítmányt! Most <strong>válaszd ki a fajtáját</strong>!
                </p>
              </div>
            )}
          </div>
        )}

        {/* ----------------- SENTENCE DISPLAY ----------------- */}
        {subMode === 'basic' ? (
          /* Basic Mode Sentence Display */
          <div className="sentence-showcase-box">
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
                    className={`word-chip ${isSelected ? 'word-predicate' : ''}`}
                    onClick={() => handleToggleWord(idx)}
                    disabled={advancedStep === 2}
                  >
                    <span className="word-text">{w.text}</span>
                    {isSelected && (
                      <span className="role-tag-bubble predicate-tag">Á (══)</span>
                    )}
                  </button>
                );
              })}
            </div>

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
                  onClick={() => setSelectedWordIndices([])}
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
                  disabled={selectedWordIndices.length === 0}
                >
                  <Check size={18} />
                  <span>Állítmány kijelölve ➔ Tovább a fajtájához</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ----------------- OPTIONS GRID (Available in Basic Mode, or Advanced Step 2) ----------------- */}
        {(subMode === 'basic' || advancedStep === 2) && (
          <div className="options-grid">
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
                    <div className="option-radio-circle">
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

        {/* Feedback Section */}
        {isAnswered && (
          <div className={`feedback-alert ${isCorrect ? 'success-alert' : 'error-alert'}`}>
            <div className="feedback-content-wrap">
              <div className="feedback-title-row">
                {isCorrect ? (
                  <>
                    <Check size={22} className="check-icon" />
                    <h4>Helyes válasz! {subMode === 'advanced' ? 'Mesteri felismerés (+45 XP)!' : 'Bravó!'}</h4>
                  </>
                ) : (
                  <>
                    <X size={22} className="error-icon" />
                    <h4>Nem egészen! A helyes: {currentQ.options.find(o => o.type === currentQ.correctType)?.label}</h4>
                  </>
                )}
              </div>

              <p className="feedback-explanation">{currentQ.explanation}</p>

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
