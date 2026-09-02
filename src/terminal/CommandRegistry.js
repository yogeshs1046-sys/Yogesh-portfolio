import { parseCommand } from './CommandParser';
import { handleHelp } from './commands/help';
import { handleAbout } from './commands/about';
import { handleSkills } from './commands/skills';
import { handleProjects } from './commands/projects';
import { handleEducation } from './commands/education';
import { handleExperience } from './commands/experience';
import { handleResume } from './commands/resume';
import { handleContact } from './commands/contact';
import { handleLs } from './commands/ls';
import { handleCd } from './commands/cd';
import { handleCat } from './commands/cat';
import { handleOpen } from './commands/open';
import { handleWhoami } from './commands/whoami';
import { handleNeofetch } from './commands/neofetch';
import { handleSudo } from './commands/sudo';
import { handleClear } from './commands/clear';
import { handleReboot } from './commands/reboot';
import { secretCommandHandlers, isProtectedCommand, handleProtectedCommandCall } from '../easterEggs/EasterEggRegistry';
import { unlockAchievement } from '../easterEggs/EasterEggEngine';

// Track executed command names for Terminal Explorer achievement
const executedCommandsSet = new Set();

const standardRegistry = {
  help: handleHelp,
  about: handleAbout,
  skills: handleSkills,
  projects: handleProjects,
  education: handleEducation,
  experience: handleExperience,
  resume: handleResume,
  contact: handleContact,
  ls: handleLs,
  cd: handleCd,
  cat: handleCat,
  open: handleOpen,
  whoami: handleWhoami,
  neofetch: handleNeofetch,
  sudo: handleSudo,
  clear: handleClear,
  reboot: handleReboot
};

export const commandNames = Object.keys(standardRegistry);

export function executeCommand(rawInput, context) {
  const parsed = parseCommand(rawInput);
  if (!parsed.command) return null;

  // Track unique command executions for achievement
  executedCommandsSet.add(parsed.command);
  if (executedCommandsSet.size >= 8) {
    unlockAchievement('TERMINAL_EXPLORER');
  }

  // Check 1: Protected dangerous-looking commands (rm -rf, shutdown, format, etc.)
  if (isProtectedCommand(parsed.raw)) {
    return handleProtectedCommandCall(parsed.raw, parsed.command);
  }

  // Check 2: Secret commands (matrix, coffee, joke, secret)
  if (secretCommandHandlers[parsed.command]) {
    return secretCommandHandlers[parsed.command]({ ...context, args: parsed.args, raw: parsed.raw });
  }

  // Check 3: Standard registered commands
  const handler = standardRegistry[parsed.command];
  if (!handler) {
    return {
      type: 'error',
      content: `${parsed.command}: command not found\nType 'help' to see available commands.`
    };
  }

  try {
    return handler({ ...context, args: parsed.args, raw: parsed.raw });
  } catch (err) {
    return {
      type: 'error',
      content: `Error executing '${parsed.command}': ${err.message}`
    };
  }
}
