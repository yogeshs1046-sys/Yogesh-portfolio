import React, { useState, useEffect } from 'react';
import { Award, X } from 'lucide-react';
import { isReducedMotion } from '../animations/animationConfig';

export function AchievementToast() {
  const [currentToast, setCurrentToast] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleAchievement = (e) => {
      const achievement = e.detail;
      if (!achievement) return;

      setCurrentToast(achievement);
      setIsVisible(true);

      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setCurrentToast(null), 300);
      }, 4000);

      return () => clearTimeout(hideTimer);
    };

    window.addEventListener('achievement-unlocked', handleAchievement);
    return () => window.removeEventListener('achievement-unlocked', handleAchievement);
  }, []);

  if (!currentToast) return null;

  return (
    <div className={`fixed bottom-8 right-6 z-50 transition-all duration-300 select-none ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
    }`}>
      <div className="bg-[#252526] text-white border border-vscode-accent/50 rounded-lg p-4 shadow-2xl flex items-start space-x-3 w-80">
        <div className="p-2 bg-vscode-accent/20 rounded-full text-amber-400 flex-shrink-0">
          <Award className="w-5 h-5 animate-pulse" />
        </div>
        <div className="flex-1">
          <div className="text-[10px] text-vscode-accent uppercase font-bold tracking-wider">
            🏆 Achievement Unlocked
          </div>
          <div className="text-xs font-bold text-white mt-0.5">
            {currentToast.title}
          </div>
          <div className="text-[11px] text-[#cccccc] mt-1 leading-tight">
            {currentToast.description}
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-[#858585] hover:text-white transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
