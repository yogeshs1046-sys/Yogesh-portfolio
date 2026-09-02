import { unlockAchievement } from './EasterEggEngine';

export function handleSecret() {
  unlockAchievement('CURIOUS_DEVELOPER');

  return {
    type: 'success',
    content: `Searching for secrets...

[████████████████████] 100%

Accessing hidden directory...

✓ Secret found.

You wasn't supposed to find this.

But since you're here...
Nice work, developer! 👀

Hint: Try typing 'ls -a' to see hidden dotfiles.`
  };
}
