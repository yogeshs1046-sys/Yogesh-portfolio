/**
 * EasterEggEngine.js
 * Manages achievement unlocks, localStorage persistence, and toast notifications.
 */

const STORAGE_KEY = 'yogesh_ide_achievements';

export const ALL_ACHIEVEMENTS = {
  CURIOUS_DEVELOPER: {
    id: 'CURIOUS_DEVELOPER',
    title: 'Curious Developer',
    description: 'Found your first secret command.'
  },
  CODE_ARCHAEOLOGIST: {
    id: 'CODE_ARCHAEOLOGIST',
    title: 'Code Archaeologist',
    description: 'Discovered the hidden .secret file.'
  },
  COFFEE_POWERED: {
    id: 'COFFEE_POWERED',
    title: 'Coffee Powered',
    description: 'Brewed terminal coffee.'
  },
  MATRIX_AWAKENED: {
    id: 'MATRIX_AWAKENED',
    title: 'Matrix Awakened',
    description: 'Entered the digital rain matrix.'
  },
  FUTURE_TEAMMATE: {
    id: 'FUTURE_TEAMMATE',
    title: 'Future Teammate',
    description: 'Ran sudo hire yogesh.'
  },
  KONAMI_MASTER: {
    id: 'KONAMI_MASTER',
    title: 'Konami Master',
    description: 'Unlocked secret Konami Code mode.'
  }
};

// Retrieve unlocked achievements from localStorage
export function getUnlockedAchievements() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

// Unlock achievement and trigger toast event
export function unlockAchievement(achievementKey) {
  const achievement = ALL_ACHIEVEMENTS[achievementKey];
  if (!achievement) return;

  const unlocked = getUnlockedAchievements();
  if (unlocked.includes(achievement.id)) return; // Already unlocked

  const updated = [...unlocked, achievement.id];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    // Ignore storage errors
  }

  // Dispatch custom DOM event for Achievement Toast Popup
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('achievement-unlocked', {
      detail: achievement
    }));
  }
}
