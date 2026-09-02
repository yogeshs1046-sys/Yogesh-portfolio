/**
 * VirtualNavigation.js
 * Traverses and manages virtual file paths against the YOGESH repository.
 */

// Helper to convert internal path (e.g., "YOGESH/projects") to terminal display path (e.g., "~/projects")
export function formatPromptPath(internalPath) {
  if (!internalPath || internalPath === 'YOGESH') return '~';
  if (internalPath.startsWith('YOGESH/')) {
    return '~/' + internalPath.substring(7);
  }
  return internalPath;
}

// Convert display path or target argument into absolute internal file system path
export function resolveInternalPath(currentInternalPath, targetPath) {
  if (!targetPath || targetPath === '~' || targetPath === '/') {
    return 'YOGESH';
  }

  // Handle cd ..
  if (targetPath === '..') {
    if (currentInternalPath === 'YOGESH') return 'YOGESH';
    const parts = currentInternalPath.split('/');
    parts.pop();
    return parts.join('/') || 'YOGESH';
  }

  // If path starts with YOGESH/ or ~/
  if (targetPath.startsWith('~/')) {
    return 'YOGESH/' + targetPath.substring(2);
  }

  if (targetPath.startsWith('YOGESH/')) {
    return targetPath;
  }

  // Relative path
  if (currentInternalPath === 'YOGESH') {
    return `YOGESH/${targetPath}`;
  } else {
    return `${currentInternalPath}/${targetPath}`;
  }
}

// Locate node in tree by internal path
export function getNodeByPath(fileSystem, internalPath) {
  if (internalPath === 'YOGESH') {
    return fileSystem[0];
  }

  const parts = internalPath.split('/');
  let current = fileSystem[0];

  for (let i = 1; i < parts.length; i++) {
    if (!current || !current.children) return null;
    const found = current.children.find(child => child.name === parts[i]);
    if (!found) return null;
    current = found;
  }

  return current;
}

// List directory items
export function listDirectory(fileSystem, internalPath) {
  const node = getNodeByPath(fileSystem, internalPath);
  if (!node) return { error: `No such directory: ${internalPath}` };
  if (node.type !== 'folder') return { error: `Not a directory: ${node.name}` };

  const items = (node.children || []).map(child => ({
    name: child.name + (child.type === 'folder' ? '/' : ''),
    type: child.type,
    rawName: child.name,
    path: child.path
  }));

  return { items };
}
