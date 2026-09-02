import { listDirectory } from '../VirtualNavigation';

export function handleLs({ args, fileSystem, currentInternalPath }) {
  const showHidden = (args || []).some(arg => arg === '-a' || arg === '-la' || arg === '-al' || arg === '--all');
  
  const result = listDirectory(fileSystem, currentInternalPath);
  if (result.error) {
    return { type: 'error', content: `ls: ${result.error}` };
  }

  let items = result.items;
  if (!showHidden) {
    items = items.filter(item => !item.rawName.startsWith('.'));
  } else {
    items = [{ name: '.', type: 'folder' }, { name: '..', type: 'folder' }, ...items];
  }

  const output = items.map(item => item.name).join('  ');

  return {
    type: 'output',
    content: output || '(empty directory)'
  };
}
