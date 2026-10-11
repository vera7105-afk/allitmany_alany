'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { LevelSelector } from '@/components/LevelSelector';
import { Level1Game } from '@/components/Level1Game';
import { Level2Game } from '@/components/Level2Game';
import { Level3Game } from '@/components/Level3Game';
import { TimeTrialGame } from '@/components/TimeTrialGame';
import { GrammarHandbookModal } from '@/components/GrammarHandbookModal';
import { BadgesModal } from '@/components/BadgesModal';
import { LEVEL1_QUESTIONS } from '@/data/questionsLevel1';
import { LEVEL2_BASIC_QUESTIONS, LEVEL2_ADVANCED_QUESTIONS } from '@/data/questionsLevel2';
import { LEVEL3_BASIC_QUESTIONS, LEVEL3_ADVANCED_QUESTIONS } from '@/data/questionsLevel3';
import { INITIAL_BADGES } from '@/data/badges';
import { UserStats, Badge, GameSubMode } from '@/data/types';
import { soundManager } from '@/utils/soundEffects';
import { triggerGrandConfetti } from '@/utils/confettiHelper';
import { Award } from '@/components/Icons';

const LOCAL_STORAGE_KEY = 'mondatmag_user_stats_v1';

const defaultStats: UserStats = {
  xp: 0,
  streak: 0,
  bestStreak: 0,
  level1Score: 0,
  level2Score: 0,
  level3Score: 0,
  completedQuestions: [],
  unlockedBadges: [],
  soundEnabled: true
};

export default function Home() {
  const [stats, setStats] = useState<UserStats>(defaultStats);
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [subModeLevel2, setSubModeLevel2] = useState<GameSubMode>('basic');
  const [subModeLevel3, setSubModeLevel3] = useState<GameSubMode>('basic');
  const [isHandbookOpen, setIsHandbookOpen] = useState(false);
  const [isBadgesOpen, setIsBadgesOpen] = useState(false);
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [recentBadgeToast, setRecentBadgeToast] = useState<Badge | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Counter metrics for badges
  const [predicatesFound, setPredicatesFound] = useState(0);
  const [subjectsFound, setSubjectsFound] = useState(0);
  const [halmozottSolved, setHalmozottSolved] = useState(0);

  // Load stats from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setStats(prev => ({ ...prev, ...parsed }));
        soundManager.enabled = parsed.soundEnabled ?? true;
      }
    } catch {}
    setIsLoaded(true);
  }, []);

  // Save stats to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stats));
    } catch {}
  }, [stats, isLoaded]);

  // Check and unlock badge helper
  const unlockBadge = (badgeId: string) => {
    if (stats.unlockedBadges.includes(badgeId)) return;

    const targetBadge = badges.find(b => b.id === badgeId);
    if (!targetBadge) return;

    setStats(prev => ({
      ...prev,
      unlockedBadges: [...prev.unlockedBadges, badgeId],
      xp: prev.xp + 50 // bonus XP for unlocking a badge!
    }));

    setRecentBadgeToast(targetBadge);
    soundManager.playStreak();
    triggerGrandConfetti();

    setTimeout(() => {
      setRecentBadgeToast(null);
    }, 4500);
  };

  // Handler for selecting levels with optional submode
  const handleSelectLevel = (lvl: number, subMode?: GameSubMode) => {
    setCurrentLevel(lvl);
    if (lvl === 2 && subMode) {
      setSubModeLevel2(subMode);
    }
    if (lvl === 3 && subMode) {
      setSubModeLevel3(subMode);
    }
  };

  // Handler for correct answer
  const handleCorrectAnswer = (xpGained: number, isHalmozott?: boolean, isTrap?: boolean) => {
    setStats(prev => {
      const newStreak = prev.streak + 1;
      const best = Math.max(prev.bestStreak, newStreak);
      const newXp = prev.xp + xpGained;

      return {
        ...prev,
        xp: newXp,
        streak: newStreak,
        bestStreak: best
      };
    });

    // Check first correct badge
    unlockBadge('first_correct');

    // Halmozott badge
    if (isHalmozott) {
      setHalmozottSolved(prev => {
        const next = prev + 1;
        if (next >= 3) unlockBadge('halmozott_hero');
        return next;
      });
    }

    // Trap buster badge
    if (isTrap) {
      unlockBadge('trap_buster');
    }

    // Streak badge
    if (stats.streak + 1 >= 5) {
      unlockBadge('streak_5');
    }

    // Grand master badge
    if (stats.xp + xpGained >= 400) {
      unlockBadge('grand_master');
    }
  };

  // Handler for wrong answer
  const handleWrongAnswer = () => {
    setStats(prev => ({
      ...prev,
      streak: 0
    }));
  };

  // Handler for level completion
  const handleLevelComplete = (lvl: number) => {
    soundManager.playFanfare();
    triggerGrandConfetti();

    if (lvl === 1) unlockBadge('level1_cleared');
    if (lvl === 2) unlockBadge('level2_cleared');
    if (lvl === 3) unlockBadge('level3_cleared');

    // Return to level selector
    setTimeout(() => {
      setCurrentLevel(0);
    }, 2000);
  };

  // Toggle sound
  const handleToggleSound = () => {
    setStats(prev => {
      const nextVal = !prev.soundEnabled;
      soundManager.enabled = nextVal;
      return { ...prev, soundEnabled: nextVal };
    });
  };

  // Reset stats
  const handleResetStats = () => {
    setStats(defaultStats);
    setPredicatesFound(0);
    setSubjectsFound(0);
    setHalmozottSolved(0);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    soundManager.playClick();
  };

  return (
    <div className="app-layout">
      {/* Navbar */}
      <Navbar
        stats={stats}
        currentLevel={currentLevel}
        onSelectLevel={handleSelectLevel}
        onOpenHandbook={() => setIsHandbookOpen(true)}
        onOpenBadges={() => setIsBadgesOpen(true)}
        onToggleSound={handleToggleSound}
        onResetStats={handleResetStats}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {currentLevel === 0 && (
          <LevelSelector
            stats={stats}
            onSelectLevel={handleSelectLevel}
            onOpenHandbook={() => setIsHandbookOpen(true)}
            onOpenBadges={() => setIsBadgesOpen(true)}
          />
        )}

        {currentLevel === 1 && (
          <Level1Game
            questions={LEVEL1_QUESTIONS}
            onCorrectAnswer={(xp, halmozott, trap) => {
              handleCorrectAnswer(xp, halmozott, trap);
              setPredicatesFound(p => {
                const next = p + 1;
                if (next >= 5) unlockBadge('predicate_master');
                return next;
              });
              setSubjectsFound(s => {
                const next = s + 1;
                if (next >= 5) unlockBadge('subject_scout');
                return next;
              });
            }}
            onWrongAnswer={handleWrongAnswer}
            onCompleteLevel={() => handleLevelComplete(1)}
          />
        )}

        {currentLevel === 2 && (
          <Level2Game
            basicQuestions={LEVEL2_BASIC_QUESTIONS}
            advancedQuestions={LEVEL2_ADVANCED_QUESTIONS}
            initialSubMode={subModeLevel2}
            onCorrectAnswer={(xp, halmozott) => handleCorrectAnswer(xp, halmozott)}
            onWrongAnswer={handleWrongAnswer}
            onCompleteLevel={() => handleLevelComplete(2)}
          />
        )}

        {currentLevel === 3 && (
          <Level3Game
            basicQuestions={LEVEL3_BASIC_QUESTIONS}
            advancedQuestions={LEVEL3_ADVANCED_QUESTIONS}
            initialSubMode={subModeLevel3}
            onCorrectAnswer={(xp, halmozott, trap) => handleCorrectAnswer(xp, halmozott, trap)}
            onWrongAnswer={handleWrongAnswer}
            onCompleteLevel={() => handleLevelComplete(3)}
          />
        )}

        {currentLevel === 4 && (
          <TimeTrialGame
            onAddXp={xp => {
              setStats(prev => ({ ...prev, xp: prev.xp + xp }));
            }}
            onExit={() => setCurrentLevel(0)}
          />
        )}
      </main>

      {/* Modals */}
      <GrammarHandbookModal
        isOpen={isHandbookOpen}
        onClose={() => setIsHandbookOpen(false)}
      />

      <BadgesModal
        isOpen={isBadgesOpen}
        badges={badges}
        unlockedIds={stats.unlockedBadges}
        onClose={() => setIsBadgesOpen(false)}
      />

      {/* Toast Notification when a Badge is Unlocked */}
      {recentBadgeToast && (
        <div className="badge-unlock-toast">
          <div className="toast-icon-wrap">
            <Award size={28} />
          </div>
          <div className="toast-text-wrap">
            <span className="toast-tag">ÚJ KITÜNTETÉS FELOLDVA!</span>
            <h4 className="toast-title">{recentBadgeToast.title}</h4>
            <p className="toast-desc">{recentBadgeToast.description}</p>
          </div>
          <span className="toast-bonus">+50 XP</span>
        </div>
      )}
    </div>
  );
}
