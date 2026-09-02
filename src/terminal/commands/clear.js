export function handleClear({ setHistory }) {
  if (setHistory) {
    setHistory([]);
  }
  return null;
}
