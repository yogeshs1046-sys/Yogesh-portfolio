import { animationConfig, isReducedMotion } from './animationConfig';

/**
 * Creates an animated progress bar string sequence
 * [████████████████████] 100%
 */
export function runProgressBarAnimation(onFrame, onComplete) {
  if (isReducedMotion()) {
    onFrame('[████████████████████] 100%');
    onComplete();
    return () => {};
  }

  const steps = [
    '[--------------------] 0%',
    '[████----------------] 20%',
    '[████████------------] 40%',
    '[████████████--------] 60%',
    '[████████████████----] 80%',
    '[████████████████████] 100%'
  ];

  let stepIdx = 0;
  let timerId = null;
  const delay = Math.floor(animationConfig.commandProgressDuration / steps.length);

  const nextFrame = () => {
    onFrame(steps[stepIdx]);
    stepIdx++;
    if (stepIdx < steps.length) {
      timerId = setTimeout(nextFrame, delay);
    } else {
      onComplete();
    }
  };

  nextFrame();

  return () => {
    if (timerId) clearTimeout(timerId);
  };
}

/**
 * Creates a checklist animation sequence
 */
export function runChecklistAnimation(items, onUpdate, onComplete) {
  if (isReducedMotion()) {
    onUpdate(items.map(item => `✓ ${item}`).join('\n'));
    onComplete();
    return () => {};
  }

  let index = 0;
  let timerId = null;
  const currentLines = [];

  const step = () => {
    currentLines.push(`✓ ${items[index]}`);
    onUpdate(currentLines.join('\n'));
    index++;

    if (index < items.length) {
      timerId = setTimeout(step, 120);
    } else {
      onComplete();
    }
  };

  step();

  return () => {
    if (timerId) clearTimeout(timerId);
  };
}
