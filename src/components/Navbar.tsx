'use client';

import React from 'react';
import { Sparkles, Flame, BookOpen, Award, Volume2, VolumeX, RotateCcw } from '@/components/Icons';
import { UserStats } from '@/data/types';
import { soundManager } from '@/utils/soundEffects';

interface NavbarProps {
  stats: UserStats;
  currentLevel: number;
  onSelectLevel: (lvl: number, subMode?: any) => void;
  onOpenHandbook: () => void;
  onOpenBadges: () => void;
  onToggleSound: () => void;
  onResetStats: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  stats,
  currentLevel,
  onSelectLevel,
  onOpenHandbook,
  onOpenBadges,
  onToggleSound,
  onResetStats
}) => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand / Title */}
        <div className="navbar-brand" onClick={() => onSelectLevel(0)} role="button" tabIndex={0}>
          <div className="brand-icon">
            <Sparkles className="icon-pulse" size={24} />
          </div>
          <div className="brand-text">
            <h1 className="brand-title">Mondatmag Mester</h1>
            <span className="brand-subtitle">7. osztály • Állítmány és alany gyakorló</span>
          </div>
        </div>

        {/* Level Navigation Buttons */}
        <nav className="level-nav">
          <button
            className={`nav-btn ${currentLevel === 1 ? 'active' : ''}`}
            onClick={() => { soundManager.playClick(); onSelectLevel(1); }}
            title="1. Szint: Állítmány és alany felismerése"
          >
            <span className="level-badge-num">1</span>
            <span className="level-label">Felismerés</span>
          </button>

          <button
            className={`nav-btn ${currentLevel === 2 ? 'active' : ''}`}
            onClick={() => { soundManager.playClick(); onSelectLevel(2); }}
            title="2. Szint: Állítmány fajtái"
          >
            <span className="level-badge-num">2</span>
            <span className="level-label">Állítmány fajtái</span>
          </button>

          <button
            className={`nav-btn ${currentLevel === 3 ? 'active' : ''}`}
            onClick={() => { soundManager.playClick(); onSelectLevel(3); }}
            title="3. Szint: Alany fajtái"
          >
            <span className="level-badge-num">3</span>
            <span className="level-label">Alany fajtái</span>
          </button>

          <button
            className={`nav-btn nav-btn-special ${currentLevel === 4 ? 'active' : ''}`}
            onClick={() => { soundManager.playClick(); onSelectLevel(4); }}
            title="Villámkvíz: 60 másodperces kihívás"
          >
            <span className="level-badge-num">⚡</span>
            <span className="level-label">Villámkvíz</span>
          </button>
        </nav>

        {/* Gamification Stats & Tools */}
        <div className="navbar-actions">
          {/* XP Pill */}
          <div className="stat-pill xp-pill" title="Összes szerzett tapasztalati pont (XP)">
            <span className="xp-star">⭐</span>
            <span className="stat-value">{stats.xp}</span>
            <span className="stat-unit">XP</span>
          </div>

          {/* Streak Flame */}
          <div
            className={`stat-pill streak-pill ${stats.streak > 0 ? 'streak-active' : ''}`}
            title={`Jelenlegi hibátlan sorozat: ${stats.streak}`}
          >
            <Flame className="streak-icon" size={18} />
            <span className="stat-value">{stats.streak}</span>
          </div>

          {/* Kisokos / Handbook Button */}
          <button
            className="action-icon-btn handbook-btn"
            onClick={() => { soundManager.playClick(); onOpenHandbook(); }}
            title="Nyelvtani Kisokos (Szabályok és trükkök)"
          >
            <BookOpen size={18} />
            <span className="btn-text-desktop">Kisokos</span>
          </button>

          {/* Badges Button */}
          <button
            className="action-icon-btn badge-btn"
            onClick={() => { soundManager.playClick(); onOpenBadges(); }}
            title="Kitüntetések és Jelvények"
          >
            <Award size={18} />
            {stats.unlockedBadges.length > 0 && (
              <span className="badge-count-badge">{stats.unlockedBadges.length}</span>
            )}
          </button>

          {/* Sound Toggle */}
          <button
            className={`action-icon-btn sound-btn ${!stats.soundEnabled ? 'muted' : ''}`}
            onClick={() => {
              onToggleSound();
              soundManager.playClick();
            }}
            title={stats.soundEnabled ? 'Hangok némítása' : 'Hangok bekapcsolása'}
          >
            {stats.soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {/* Reset Stats */}
          <button
            className="action-icon-btn reset-btn"
            onClick={() => {
              if (window.confirm('Biztosan törölni szeretnéd az elért eredményeidet és elölről kezdeni?')) {
                onResetStats();
              }
            }}
            title="Eredmények alaphelyzetbe állítása"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};
