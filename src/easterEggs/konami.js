import { unlockAchievement } from './EasterEggEngine';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight', 
  'KeyB', 'KeyA'
];

let konamiIndex = 0;

export function initKonamiListener() {
  if (typeof window === 'undefined') return;

  const handleKeyDown = (e) => {
    const targetKey = KONAMI_CODE[konamiIndex];
    if (e.code === targetKey || e.key === targetKey) {
      konamiIndex++;
      if (konamiIndex === KONAMI_CODE.length) {
        unlockAchievement('KONAMI_MASTER');
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}
