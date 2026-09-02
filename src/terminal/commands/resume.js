import { getNodeByPath } from '../VirtualNavigation';

export function handleResume({ fileSystem, onOpenFile }) {
  const resumeNode = getNodeByPath(fileSystem, 'YOGESH/resume.pdf');
  if (resumeNode && onOpenFile) {
    onOpenFile(resumeNode);
    return {
      type: 'success',
      content: `✓ Opening resume.pdf in editor tab...`
    };
  }

  return {
    type: 'output',
    content: `resume.pdf

Resume document viewer loaded in IDE editor.`
  };
}
