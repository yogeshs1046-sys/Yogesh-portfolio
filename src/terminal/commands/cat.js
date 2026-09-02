import { resolveInternalPath, getNodeByPath } from '../VirtualNavigation';
import { unlockAchievement } from '../../easterEggs/EasterEggEngine';

export function handleCat({ args, fileSystem, currentInternalPath }) {
  if (!args || args.length === 0) {
    return { type: 'error', content: `cat: missing file operand` };
  }

  const filename = args[0];
  const filePath = resolveInternalPath(currentInternalPath, filename);
  const fileNode = getNodeByPath(fileSystem, filePath);

  if (!fileNode) {
    return { type: 'error', content: `cat: ${filename}: No such file` };
  }

  if (fileNode.type === 'folder') {
    return { type: 'error', content: `cat: ${filename}: Is a directory` };
  }

  if (fileNode.name === '.secret') {
    unlockAchievement('CODE_ARCHAEOLOGIST');
  }

  return {
    type: 'output',
    content: fileNode.content || ''
  };
}
