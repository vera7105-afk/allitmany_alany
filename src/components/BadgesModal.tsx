'use client';

import React from 'react';
import { X, Award, CheckCircle, Lock } from '@/components/Icons';
import { Badge } from '@/data/types';
import { soundManager } from '@/utils/soundEffects';

interface BadgesModalProps {
  isOpen: boolean;
  badges: Badge[];
  unlockedIds: string[];
  onClose: () => void;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({
  isOpen,
  badges,
  unlockedIds,
  onClose
}) => {
  if (!isOpen) return null;

  const totalCount = badges.length;
  const unlockedCount = unlockedIds.length;
  const percent = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container badges-modal" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge badge-color">
              <Award size={24} />
            </div>
            <div>
              <h2 className="modal-title">Kitüntetések & Jelvények</h2>
              <p className="modal-subtitle">
                Feloldva: <strong>{unlockedCount} / {totalCount}</strong> ({percent}%)
              </p>
            </div>
          </div>
          <button
            className="modal-close-btn"
            onClick={() => { soundManager.playClick(); onClose(); }}
            title="Bezárás"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="badges-progress-wrap">
          <div className="badges-progress-bar" style={{ width: `${percent}%` }}></div>
        </div>

        {/* Badges Grid */}
        <div className="badges-grid">
          {badges.map(badge => {
            const isUnlocked = unlockedIds.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`badge-card ${isUnlocked ? 'badge-unlocked' : 'badge-locked'}`}
              >
                <div className="badge-card-icon">
                  {isUnlocked ? (
                    <span className="badge-emoji">{badge.icon}</span>
                  ) : (
                    <Lock size={28} className="lock-icon" />
                  )}
                </div>

                <div className="badge-card-body">
                  <div className="badge-card-title-row">
                    <h3 className="badge-card-title">{badge.title}</h3>
                    {isUnlocked && <CheckCircle size={16} className="unlocked-check" />}
                  </div>
                  <p className="badge-card-desc">{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button
            className="action-btn secondary-btn"
            onClick={() => { soundManager.playClick(); onClose(); }}
          >
            Bezárás
          </button>
        </div>
      </div>
    </div>
  );
};
