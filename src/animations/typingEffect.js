import { animationConfig, isReducedMotion } from './animationConfig';

// Track files that have already played the typing animation
const animatedFilesSet = new Set();

/**
 * Creates a cancellable typing animation controller
 * @param {string} fullText - The full content of the file
 * @param {string} fileId - Unique ID of the file
 * @param {function} onUpdate - Callback with currently typed text
 * @param {function} onComplete - Callback when typing completes
 */
export function createTypingController(fullText, fileId, onUpdate, onComplete) {
  // If reduced motion enabled or already animated, display full text immediately
  if (isReducedMotion() || animatedFilesSet.has(fileId) || !fullText) {
    onUpdate(fullText);
    onComplete();
    return { cancel: () => {} };
  }

  animatedFilesSet.add(fileId);

  let currentIndex = 0;
  let timerId = null;
  let isCancelled = false;

  // Calculate dynamic char delay for fast execution (<1.5s total)
  const totalLength = fullText.length;
  const speed = Math.max(5, Math.min(animationConfig.typingSpeed, Math.floor(animationConfig.maxTypingDuration / Math.max(totalLength, 1))));

  const step = () => {
    if (isCancelled) return;

    // Type in chunks of characters for fast feel
    const chunkSize = totalLength > 400 ? 5 : totalLength > 150 ? 2 : 1;
    currentIndex = Math.min(totalLength, currentIndex + chunkSize);

    onUpdate(fullText.substring(0, currentIndex));

    if (currentIndex < totalLength) {
      timerId = setTimeout(step, speed);
    } else {
      onComplete();
    }
  };

  timerId = setTimeout(step, speed);

  return {
    cancel: () => {
      isCancelled = true;
      if (timerId) clearTimeout(timerId);
    }
  };
}
