/**
 * Autocomplete.js
 * Provides Tab completion for terminal commands and path arguments.
 */
import { getNodeByPath } from './VirtualNavigation';

export function getAutocomplete(rawInput, commandNames, fileSystem, currentInternalPath) {
  const trimmed = rawInput.trimStart();
  const parts = trimmed.split(/\s+/);

  // Autocomplete command name
  if (parts.length === 1) {
    const query = parts[0].toLowerCase();
    const matches = commandNames.filter(cmd => cmd.startsWith(query));
    if (matches.length === 1) {
      return matches[0] + ' ';
    }
    return null;
  }

  // Autocomplete arguments for cd, cat, open
  const cmd = parts[0].toLowerCase();
  const lastArg = parts[parts.length - 1];

  if (['cd', 'cat', 'open'].includes(cmd)) {
    const currentNode = getNodeByPath(fileSystem, currentInternalPath);
    if (!currentNode || !currentNode.children) return null;

    const children = currentNode.children.map(c => c.name + (c.type === 'folder' ? '/' : ''));
    const matches = children.filter(name => name.toLowerCase().startsWith(lastArg.toLowerCase()));

    if (matches.length === 1) {
      const completedArg = matches[0];
      const prefix = parts.slice(0, parts.length - 1).join(' ');
      return `${prefix} ${completedArg}`;
    }
  }

  return null;
}
