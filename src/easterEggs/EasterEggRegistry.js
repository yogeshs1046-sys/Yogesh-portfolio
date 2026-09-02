import { handleMatrix } from './matrix';
import { handleCoffee } from './coffee';
import { handleJoke } from './joke';
import { handleSecret } from './secret';
import { handleProtectedCommand } from './protectedCommands';

export const secretCommandHandlers = {
  matrix: handleMatrix,
  coffee: handleCoffee,
  joke: handleJoke,
  secret: handleSecret
};

export function isProtectedCommand(rawInput) {
  const lower = rawInput.trim().toLowerCase();
  return (
    lower.startsWith('rm') ||
    lower.startsWith('shutdown') ||
    lower.startsWith('format') ||
    lower.startsWith('del') ||
    lower.startsWith('sudo rm')
  );
}

export function handleProtectedCommandCall(rawInput, command) {
  return handleProtectedCommand({ command, raw: rawInput });
}
