import { resolveInternalPath, getNodeByPath } from '../VirtualNavigation';

export function handleCd({ args, fileSystem, currentInternalPath, setCurrentInternalPath }) {
  if (!args || args.length === 0) {
    return { type: 'error', content: `cd: missing directory` };
  }

  const target = args[0];
  const newPath = resolveInternalPath(currentInternalPath, target);
  const targetNode = getNodeByPath(fileSystem, newPath);

  if (!targetNode) {
    return { type: 'error', content: `cd: ${target}: No such directory` };
  }

  if (targetNode.type !== 'folder') {
    return { type: 'error', content: `cd: ${target}: Not a directory` };
  }

  setCurrentInternalPath(newPath);
  return { type: 'output', content: '' };
}
