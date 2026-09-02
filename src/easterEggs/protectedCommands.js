/**
 * Pure browser-safe fake system protection against destructive-looking commands.
 */

export function handleProtectedCommand({ command, raw }) {
  const lower = raw.trim().toLowerCase();

  if (lower.startsWith('rm -rf') || lower.startsWith('rm -f') || lower === 'rm') {
    return {
      type: 'error',
      content: `Deleting portfolio...

[████████████████████] 100%

...

Nice try 😏

This portfolio is protected against destructive operations.
Nothing was deleted.`
    };
  }

  if (lower.startsWith('sudo rm')) {
    return {
      type: 'error',
      content: `Permission denied.

Portfolio protection system activated.
Your chaos has been contained safely in the browser. 😎`
    };
  }

  if (lower === 'shutdown' || lower.startsWith('shutdown')) {
    return {
      type: 'error',
      content: `Nice try.

YOGESH-IDE refuses to shut down. 😎`
    };
  }

  if (lower === 'format' || lower.startsWith('format')) {
    return {
      type: 'error',
      content: `Format drive operation intercepted.

Virtual filesystem write-locks active.`
    };
  }

  if (lower.startsWith('del ') || lower === 'del') {
    return {
      type: 'error',
      content: `del: operation protected.

All portfolio files are immutable.`
    };
  }

  return {
    type: 'error',
    content: `${command}: command protected by YOGESH-IDE.`
  };
}
