import { unlockAchievement } from '../../easterEggs/EasterEggEngine';
import { getNodeByPath } from '../VirtualNavigation';

export function handleSudo({ args, fileSystem, onOpenFile }) {
  const fullSubcmd = (args || []).join(' ').toLowerCase();

  if (fullSubcmd === 'hire yogesh' || fullSubcmd === 'hire') {
    unlockAchievement('FUTURE_TEAMMATE');

    // Automatically open contact.ts in Code Editor tabs
    const contactFileNode = getNodeByPath(fileSystem, 'YOGESH/contact.ts');
    if (contactFileNode && onOpenFile) {
      onOpenFile(contactFileNode);
    }

    return {
      type: 'success',
      content: `[sudo] checking permissions...

Checking skills............. ✓
Checking projects........... ✓
Checking problem solving.... ✓
Checking motivation......... ✓

Verifying compatibility...
[████████████████████] 100%

ACCESS GRANTED

Permission granted.

> Let's build something together.

Opening contact.ts...`
    };
  }

  return {
    type: 'error',
    content: `sudo: ${fullSubcmd || 'command'}: command not found`
  };
}
