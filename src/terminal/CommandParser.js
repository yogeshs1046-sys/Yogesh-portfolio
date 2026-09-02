/**
 * CommandParser.js
 * Parses raw input string into command name and arguments list.
 */
export function parseCommand(rawInput) {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { command: '', args: [], raw: rawInput };
  }

  // Tokenize taking double quotes into account
  const regex = /[^\s"]+|"[^"]*"/g;
  const matches = trimmed.match(regex) || [];

  const tokens = matches.map(token => {
    if (token.startsWith('"') && token.endsWith('"')) {
      return token.slice(1, -1);
    }
    return token;
  });

  const command = tokens[0] ? tokens[0].toLowerCase() : '';
  const args = tokens.slice(1);

  return {
    command,
    args,
    raw: rawInput
  };
}
