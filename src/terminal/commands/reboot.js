export function handleReboot({ triggerReboot }) {
  if (triggerReboot) {
    triggerReboot();
    return {
      type: 'system',
      content: 'Rebooting YOGESH-IDE environment...'
    };
  }
  return {
    type: 'output',
    content: 'Reboot system command initiated.'
  };
}
