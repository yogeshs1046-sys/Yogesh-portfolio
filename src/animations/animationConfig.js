/**
 * Centralized Animation Configuration for Yogesh IDE
 */

export const animationConfig = {
  bootDuration: 2200,          // Total boot animation duration (ms)
  bootLineDelay: 350,          // Delay between boot lines (ms)
  typingSpeed: 20,             // Char typing speed (ms/char)
  maxTypingDuration: 1500,     // Max total typing time for long files (ms)
  tabTransition: 150,          // Tab switch duration (ms)
  explorerTransition: 180,     // Folder chevron rotation speed (ms)
  commandProgressDuration: 600 // Command progress bar duration (ms)
};

// Respect user accessibility settings for reduced motion
export function isReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
