'use client';

import React from 'react';
import { 
  CheckCircle, Play, Sparkles, BookOpen, 
  Award, ShieldAlert, ArrowRight, Zap, Flame 
} from '@/components/Icons';
import { UserStats, GameSubMode } from '@/data/types';
import { soundManager } from '@/utils/soundEffects';

interface LevelSelectorProps {
  stats: UserStats;
  onSelectLevel: (lvl: number, subMode?: GameSubMode) => void;
  onOpenHandbook: () => void;
  onOpenBadges: () => void;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({
  stats,
  onSelectLevel,
  onOpenHandbook,
  onOpenBadges
}) => {
  return (
    <div className="level-selector-screen">
      {/* Hero Welcome Banner */}
      <section className="welcome-banner">
        <div className="welcome-content">
          <div className="badge-pill">
            <Sparkles size={16} />
            <span>7. osztályos magyar nyelvtan gyakorló</span>
          </div>
          <h2 className="welcome-title">
            Tanulj játszva, sajátítsd el a <em>mondatmagot</em>!
          </h2>
          <p className="welcome-desc">
            Gyakorold az <strong>állítmány</strong> és az <strong>alany</strong> felismerését,
            ismerd meg a fajtáikat alapszinten és <strong>haladó kereső szinten</strong> is,
            és leplezd le a nehéz <em>halmozott</em> és <em>főnévi igenévi</em> csapdákat!
          </p>

          <div className="hero-action-buttons">
            <button
              className="action-btn primary-btn"
              onClick={() => { soundManager.playClick(); onSelectLevel(1); }}
            >
              <Play size={18} />
              <span>Gyakorlás indítása (1. Szint)</span>
            </button>

            <button
              className="action-btn secondary-btn"
              onClick={() => { soundManager.playClick(); onOpenHandbook(); }}
            >
              <BookOpen size={18} />
              <span>Kisokos áttekintése</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Overview Card */}
        <div className="user-overview-card">
          <div className="overview-header">
            <h3>Jelenlegi Eredményeid</h3>
            <span className="overview-badge">7. osztály</span>
          </div>
          <div className="overview-stats-grid">
            <div className="overview-stat-box">
              <span className="stat-num">{stats.xp}</span>
              <span className="stat-label">Összes XP</span>
            </div>
            <div className="overview-stat-box">
              <span className="stat-num fire-num">{stats.streak}</span>
              <span className="stat-label">Sorozat 🔥</span>
            </div>
            <div className="overview-stat-box">
              <span className="stat-num">{stats.unlockedBadges.length} / 10</span>
              <span className="stat-label">Jelvények</span>
            </div>
          </div>
        </div>
      </section>

      {/* Levels Cards Grid */}
      <section className="levels-section">
        <div className="section-header">
          <h3 className="section-title">Válassz gyakorló szintet!</h3>
          <p className="section-subtitle">A 2. és 3. szinten választhatsz Alapszint (kiemelt) és Haladó szint (önálló keresés + fajta) között!</p>
        </div>

        <div className="level-cards-grid">
          {/* Level 1 Card */}
          <div className="level-card level-card-1">
            <div className="card-top-row">
              <div className="level-number-bubble">1. SZINT</div>
              <div className="level-symbol-badge">
                <span className="sym-predicate">══</span>
                <span className="sym-subject">──</span>
              </div>
            </div>

            <h4 className="card-heading">Állítmány és alany felismerése</h4>
            <p className="card-description">
              Kattints a szavakra és húzd alá őket! Dupla vonallal (══) az állítmányt (Mit állítunk?),
              egyetlen vonallal (──) az alanyt (Ki? Mi?).
            </p>

            <div className="card-tags">
              <span className="tag-item">Felismerés</span>
              <span className="tag-item tag-highlight">Halmozott szavak</span>
              <span className="tag-item tag-trap">Igenévi csapdák</span>
            </div>

            <div className="card-footer-action">
              <button
                className="action-btn level-play-btn"
                onClick={() => { soundManager.playClick(); onSelectLevel(1); }}
              >
                <span>1. Szint Indítása</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Level 2 Card */}
          <div className="level-card level-card-2">
            <div className="card-top-row">
              <div className="level-number-bubble bubble-purple">2. SZINT</div>
              <div className="level-symbol-badge">
                <span className="sym-predicate">══</span>
              </div>
            </div>

            <h4 className="card-heading">Állítmány fajtái</h4>
            <p className="card-description">
              Egyszerű igei, névszói (zéró létige E/3) és névszói-igei (volt, lesz) állítmányok, halmozott mondatokkal.
            </p>

            <div className="card-tags">
              <span className="tag-item">Igei</span>
              <span className="tag-item">Névszói</span>
              <span className="tag-item">Névszói-igei</span>
              <span className="tag-item tag-highlight">+ Halmozások</span>
            </div>

            <div className="card-footer-action dual-level-actions">
              <button
                className="action-btn level-play-btn btn-purple-outline"
                onClick={() => { soundManager.playClick(); onSelectLevel(2, 'basic'); }}
                title="Az állítmány már alá van húzva"
              >
                <span>🔍 Alapszint (Kiemeléssel)</span>
              </button>

              <button
                className="action-btn level-play-btn btn-purple"
                onClick={() => { soundManager.playClick(); onSelectLevel(2, 'advanced'); }}
                title="Neked kell először rákattintani az állítmányra, majd megadni a fajtáját!"
              >
                <span>🎯 Haladó (Keresés + Fajta)</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Level 3 Card */}
          <div className="level-card level-card-3">
            <div className="card-top-row">
              <div className="level-number-bubble bubble-cyan">3. SZINT</div>
              <div className="level-symbol-badge">
                <span className="sym-subject">──</span>
              </div>
            </div>

            <h4 className="card-heading">Alany fajtái</h4>
            <p className="card-description">
              Határozott, határozatlan, általános és rejtett alanyok. Főnévi igenévi alanyok és halmozott mondatok.
            </p>

            <div className="card-tags">
              <span className="tag-item">Határozott / Általános</span>
              <span className="tag-item">Rejtett [én, mi...]</span>
              <span className="tag-item tag-trap">Főnévi igenév</span>
              <span className="tag-item tag-highlight">+ Halmozások</span>
            </div>

            <div className="card-footer-action dual-level-actions">
              <button
                className="action-btn level-play-btn btn-cyan-outline"
                onClick={() => { soundManager.playClick(); onSelectLevel(3, 'basic'); }}
                title="Az alany már alá van húzva"
              >
                <span>🔍 Alapszint (Kiemeléssel)</span>
              </button>

              <button
                className="action-btn level-play-btn btn-cyan"
                onClick={() => { soundManager.playClick(); onSelectLevel(3, 'advanced'); }}
                title="Neked kell először rákattintani az alanyra, majd megadni a fajtáját!"
              >
                <span>🎯 Haladó (Keresés + Fajta)</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Bonus Time Trial Card */}
          <div className="level-card level-card-bonus">
            <div className="card-top-row">
              <div className="level-number-bubble bubble-amber">⚡ EXTRA</div>
              <div className="level-symbol-badge">
                <span>⏱️ 60 mp</span>
              </div>
            </div>

            <h4 className="card-heading">Villámkvíz Kihívás</h4>
            <p className="card-description">
              Pörgős 60 másodperces gyorsasági teszt véletlenszerűen megkevert válaszsorrenddel!
            </p>

            <div className="card-tags">
              <span className="tag-item">60 mp stopper</span>
              <span className="tag-item">Megkevert válaszok 🔀</span>
              <span className="tag-item tag-highlight">Dicsőségtábla</span>
            </div>

            <div className="card-footer-action">
              <button
                className="action-btn level-play-btn btn-amber"
                onClick={() => { soundManager.playClick(); onSelectLevel(4); }}
              >
                <span>Villámkvíz Indítása</span>
                <Zap size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
