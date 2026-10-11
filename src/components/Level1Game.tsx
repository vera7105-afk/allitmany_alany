'use client';

import React, { useState } from 'react';
import { 
  Sparkles, Check, AlertCircle, ArrowRight, HelpCircle, 
  RotateCcw, Eye, ShieldAlert, Award
} from '@/components/Icons';
import { Level1Question } from '@/data/types';
import { soundManager } from '@/utils/soundEffects';
import { triggerConfetti } from '@/utils/confettiHelper';

interface Level1GameProps {
  questions: Level1Question[];
  onCorrectAnswer: (xp: number, isHalmozott?: boolean, isTrap?: boolean) => void;
  onWrongAnswer: () => void;
  onCompleteLevel: () => void;
}

export const Level1Game: React.FC<Level1GameProps> = ({
  questions,
  onCorrectAnswer,
  onWrongAnswer,
  onCompleteLevel
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTool, setActiveTool] = useState<'predicate' | 'subject' | 'erase'>('predicate');
  const [selectedWordRoles, setSelectedWordRoles] = useState<{ [wordIndex: number]: 'predicate' | 'subject' | 'other' }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [mistakeFeedback, setMistakeFeedback] = useState<string>('');

  const currentQ = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  // Handle word click
  const handleWordClick = (index: number) => {
    if (isSubmitted && isCorrect) return; // locked after solved

    soundManager.playClick();
    const currentRole = selectedWordRoles[index] || 'other';

    setSelectedWordRoles(prev => {
      const next = { ...prev };
      if (activeTool === 'erase') {
        delete next[index];
      } else if (activeTool === 'predicate') {
        next[index] = currentRole === 'predicate' ? 'other' : 'predicate';
      } else if (activeTool === 'subject') {
        next[index] = currentRole === 'subject' ? 'other' : 'subject';
      }
      return next;
    });
  };

  // Check the answer
  const handleCheckAnswer = () => {
    let hasMistake = false;
    let missingPredicates = 0;
    let missingSubjects = 0;
    let wrongPredicates = 0;
    let wrongSubjects = 0;

    currentQ.words.forEach((w, idx) => {
      const chosenRole = selectedWordRoles[idx] || 'other';
      if (w.role === 'predicate') {
        if (chosenRole !== 'predicate') {
          hasMistake = true;
          missingPredicates++;
        }
      } else if (w.role === 'subject') {
        if (chosenRole !== 'subject') {
          hasMistake = true;
          missingSubjects++;
        }
      } else {
        if (chosenRole === 'predicate') {
          hasMistake = true;
          wrongPredicates++;
        }
        if (chosenRole === 'subject') {
          hasMistake = true;
          wrongSubjects++;
        }
      }
    });

    setIsSubmitted(true);

    if (!hasMistake) {
      // Perfect!
      setIsCorrect(true);
      setShowExplanation(true);
      soundManager.playCorrect();
      triggerConfetti();

      const xp = (currentQ.isHalmozottPredicate || currentQ.isHalmozottSubject ? 40 : 30) + (currentQ.isTrap ? 15 : 0);
      onCorrectAnswer(
        xp, 
        currentQ.isHalmozottPredicate || currentQ.isHalmozottSubject, 
        currentQ.isTrap
      );
    } else {
      // Diagnostic hints
      setIsCorrect(false);
      soundManager.playWrong();
      onWrongAnswer();

      let msg = '';
      if (currentQ.isTrap && missingSubjects > 0) {
        msg = '⚠️ Vigyázz, csapda mondat! Kérdezz rá: Mi kell / Mi jó? A főnévi igenév az ALANY!';
      } else if ((currentQ.isHalmozottPredicate && missingPredicates > 0) || (currentQ.isHalmozottSubject && missingSubjects > 0)) {
        msg = 'Figyelem! Ebben a mondatban halmozott mondatrész van (több állítmány vagy több alany)!';
      } else if (missingPredicates > 0 && missingSubjects > 0) {
        msg = 'Még hiányzik az állítmány és az alany is! Próbáld feltenni a főkérdéseket.';
      } else if (missingPredicates > 0) {
        msg = 'Keresd meg az állítmányt: Mit állítunk a mondatban? (Két vonallal aláhúzva)';
      } else if (missingSubjects > 0) {
        msg = 'Keresd meg az alanyt: Ki vagy mi végzi a cselekvést? (Egy vonallal aláhúzva)';
      } else if (wrongPredicates > 0 || wrongSubjects > 0) {
        msg = 'Olyan szót is megjelöltél, ami nem alany és nem állítmány. Nézd át újra!';
      } else {
        msg = 'Nézd át újra figyelmesen a mondat szavait!';
      }
      setMistakeFeedback(msg);
    }
  };

  // Show correct solution
  const handleShowSolution = () => {
    soundManager.playClick();
    const solution: { [idx: number]: 'predicate' | 'subject' | 'other' } = {};
    currentQ.words.forEach((w, idx) => {
      solution[idx] = w.role;
    });
    setSelectedWordRoles(solution);
    setShowExplanation(true);
    setIsCorrect(true);
  };

  // Next question
  const handleNextQuestion = () => {
    soundManager.playClick();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedWordRoles({});
      setIsSubmitted(false);
      setIsCorrect(false);
      setShowExplanation(false);
      setShowHint(false);
      setMistakeFeedback('');
    } else {
      onCompleteLevel();
    }
  };

  // Reset current markings
  const handleResetCurrent = () => {
    soundManager.playClick();
    setSelectedWordRoles({});
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowExplanation(false);
    setMistakeFeedback('');
  };

  return (
    <div className="game-screen level-1-game">
      {/* Game Header Bar */}
      <div className="game-header-bar">
        <div className="level-badge-tag">
          <span className="badge-chip">1. SZINT</span>
          <span className="badge-topic">Állítmány és Alany felismerése</span>
        </div>

        <div className="question-counter">
          <span>{currentIndex + 1} / {questions.length}</span>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
      </div>

      {/* Main Interactive Card */}
      <div className="game-card sentence-card">
        {/* Trap Banner if applicable */}
        {currentQ.isTrap && (
          <div className="trap-pill-badge">
            <ShieldAlert size={16} />
            <span>Különleges csapdamondat! Figyelj az igenévre!</span>
          </div>
        )}

        {/* Halmozott Banner */}
        {(currentQ.isHalmozottPredicate || currentQ.isHalmozottSubject) && (
          <div className="halmozott-pill-badge">
            <Sparkles size={16} />
            <span>Halmozott mondatrészes feladat! Több szót is meg kell jelölnöd!</span>
          </div>
        )}

        <div className="instruction-box">
          <p className="instruction-text">
            Kattints a megfelelő szavakra a mondatban! Jelöld be az <strong>állítmányt</strong> (két vonal) és az <strong>alanyt</strong> (egy vonal)!
          </p>
        </div>

        {/* Marking Tools Palette */}
        <div className="marking-tools-palette">
          <button
            className={`tool-btn predicate-tool ${activeTool === 'predicate' ? 'active-tool' : ''}`}
            onClick={() => { soundManager.playClick(); setActiveTool('predicate'); }}
          >
            <span className="tool-symbol">══</span>
            <span className="tool-name">Állítmány (Á)</span>
            <span className="tool-helper">Mit állítunk?</span>
          </button>

          <button
            className={`tool-btn subject-tool ${activeTool === 'subject' ? 'active-tool' : ''}`}
            onClick={() => { soundManager.playClick(); setActiveTool('subject'); }}
          >
            <span className="tool-symbol">──</span>
            <span className="tool-name">Alany (A)</span>
            <span className="tool-helper">Ki? Mi? Kik? Mik?</span>
          </button>

          <button
            className={`tool-btn erase-tool ${activeTool === 'erase' ? 'active-tool' : ''}`}
            onClick={() => { soundManager.playClick(); setActiveTool('erase'); }}
            title="Kattints a szóra a megjelölés visszavonásához"
          >
            <span className="tool-symbol">✕</span>
            <span className="tool-name">Törlés</span>
          </button>
        </div>

        {/* Interactive Sentence Word Chips */}
        <div className="sentence-display-area">
          <div className="words-stream">
            {currentQ.words.map((w, idx) => {
              const role = selectedWordRoles[idx] || 'other';

              return (
                <button
                  key={idx}
                  type="button"
                  className={`word-chip ${
                    role === 'predicate' ? 'word-predicate' : ''
                  } ${
                    role === 'subject' ? 'word-subject' : ''
                  }`}
                  onClick={() => handleWordClick(idx)}
                >
                  <span className="word-text">{w.text}</span>
                  {role === 'predicate' && (
                    <span className="role-tag-bubble predicate-tag">Á (══)</span>
                  )}
                  {role === 'subject' && (
                    <span className="role-tag-bubble subject-tag">A (──)</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend / Feedback Note */}
        {mistakeFeedback && !isCorrect && (
          <div className="feedback-alert error-alert">
            <AlertCircle size={20} />
            <p>{mistakeFeedback}</p>
          </div>
        )}

        {/* Hint toggle */}
        {currentQ.trapHint && showHint && (
          <div className="hint-card">
            <HelpCircle size={18} />
            <p>{currentQ.trapHint}</p>
          </div>
        )}

        {/* Success Explanation Box */}
        {showExplanation && (
          <div className="feedback-alert success-alert">
            <div className="success-header">
              <Check size={22} className="check-icon" />
              <h4>Pompás elemzés! Pontos találat!</h4>
            </div>

            <div className="explanation-details">
              <div className="exp-row">
                <span className="exp-label predicate-color">🔴 Állítmány:</span>
                <span className="exp-content">{currentQ.explanation.predicateQuestion}</span>
              </div>
              <div className="exp-row">
                <span className="exp-label subject-color">🔵 Alany:</span>
                <span className="exp-content">{currentQ.explanation.subjectQuestion}</span>
              </div>
              {currentQ.explanation.notes && (
                <div className="exp-note">
                  💡 <strong>Nyelvtani magyarázat:</strong> {currentQ.explanation.notes}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Controls Footer */}
        <div className="game-card-footer">
          <div className="footer-left-actions">
            {!isCorrect && (
              <button
                className="subtle-btn"
                onClick={handleResetCurrent}
                title="Megjelölések törlése"
              >
                <RotateCcw size={16} />
                <span>Újrakezd</span>
              </button>
            )}

            {currentQ.trapHint && !showHint && !isCorrect && (
              <button
                className="subtle-btn hint-trigger-btn"
                onClick={() => { soundManager.playClick(); setShowHint(true); }}
              >
                <HelpCircle size={16} />
                <span>Tipp</span>
              </button>
            )}

            {isSubmitted && !isCorrect && (
              <button
                className="subtle-btn solution-trigger-btn"
                onClick={handleShowSolution}
              >
                <Eye size={16} />
                <span>Megoldás mutatása</span>
              </button>
            )}
          </div>

          <div className="footer-right-actions">
            {!isCorrect ? (
              <button
                className="action-btn primary-btn check-btn"
                onClick={handleCheckAnswer}
              >
                <Check size={18} />
                <span>Ellenőrzés</span>
              </button>
            ) : (
              <button
                className="action-btn next-btn"
                onClick={handleNextQuestion}
              >
                <span>Következő feladat</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
