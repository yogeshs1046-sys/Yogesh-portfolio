import { getNodeByPath } from '../VirtualNavigation';

export function handleAbout({ fileSystem }) {
  const file = getNodeByPath(fileSystem, 'YOGESH/about.ts');
  
  return {
    type: 'output',
    content: `YOGESH SINGH

Computer Science Engineer

Role:
Computer Science Engineer & Full-Stack Developer

Interests:
• Software Development
• Artificial Intelligence
• Product Building
• System Architecture

Mindset:
Build. Learn. Improve.`
  };
}
