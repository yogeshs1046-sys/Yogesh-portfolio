import { resolveInternalPath, getNodeByPath } from '../VirtualNavigation';

export function handleOpen({ args, fileSystem, currentInternalPath, onOpenFile }) {
  if (!args || args.length === 0) {
    return { type: 'error', content: `open: missing project or file operand` };
  }

  const query = args[0];

  // Check 1: Direct match for project name inside YOGESH/projects/
  const projectFolderPath = `YOGESH/projects/${query}`;
  const projectFolderNode = getNodeByPath(fileSystem, projectFolderPath);

  if (projectFolderNode && projectFolderNode.children) {
    const readmeFile = projectFolderNode.children.find(c => c.name === 'README.md') || projectFolderNode.children[0];
    if (readmeFile && onOpenFile) {
      onOpenFile(readmeFile);
      return {
        type: 'success',
        content: `Opening project: ${query}...\n\n✓ Project loaded\n✓ ${readmeFile.name} opened`
      };
    }
  }

  // Check 2: Relative or absolute path in virtual file system
  const filePath = resolveInternalPath(currentInternalPath, query);
  const fileNode = getNodeByPath(fileSystem, filePath);

  if (fileNode) {
    if (fileNode.type === 'folder') {
      const firstChild = (fileNode.children || [])[0];
      if (firstChild && onOpenFile) {
        onOpenFile(firstChild);
        return {
          type: 'success',
          content: `Opening folder ${query}...\n✓ Opened ${firstChild.name}`
        };
      }
    } else if (onOpenFile) {
      onOpenFile(fileNode);
      return {
        type: 'success',
        content: `✓ ${fileNode.name} opened in editor`
      };
    }
  }

  return {
    type: 'error',
    content: `open: project or file '${query}' not found`
  };
}
