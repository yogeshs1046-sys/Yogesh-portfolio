import { portfolioData } from './portfolioData';

// Virtual Portfolio File System generated from Single Source of Truth
export const initialFileSystem = [
  {
    id: 'yogesh-root',
    name: 'YOGESH',
    type: 'folder',
    isOpen: true,
    path: 'YOGESH',
    children: [
      {
        id: 'readme-md',
        name: 'README.md',
        type: 'file',
        language: 'markdown',
        icon: 'markdown',
        path: 'YOGESH/README.md',
        content: `# ${portfolioData.developer.name}

> ${portfolioData.developer.title} & ${portfolioData.developer.role}

Welcome to my digital workspace!

Explore the files and folders in the left sidebar to learn about me, my technical skills, education, projects, and professional background.

---

### 📂 Quick Navigation Guide

- 📄 **about.ts**: Personal background, engineering mindset, and interests.
- 📄 **skills.ts**: Technical skills, programming languages, and frameworks.
- 📄 **education.ts**: Academic qualifications and degree details.
- 📁 **projects/**: Code repositories for ${portfolioData.projects.length} software projects.
- 📁 **experience/**: Career growth and development experience.
- 📄 **resume.pdf**: View and download my professional resume.
- 📄 **contact.ts**: Social channels, email, and contact details.

> 💡 **Tip**: Open the \`projects\` folder to explore my work!`
      },
      {
        id: 'about-ts',
        name: 'about.ts',
        type: 'file',
        language: 'typescript',
        icon: 'typescript',
        path: 'YOGESH/about.ts',
        content: `export interface DeveloperProfile {
  name: string;
  title: string;
  location: string;
  interests: string[];
  mindset: string;
  bio: string;
}

const yogesh: DeveloperProfile = {
  name: "${portfolioData.developer.name}",
  title: "${portfolioData.developer.title}",
  location: "${portfolioData.developer.location}",

  interests: ${JSON.stringify(portfolioData.developer.interests, null, 2)},

  mindset: "${portfolioData.developer.mindset}",

  bio: \`${portfolioData.developer.bio}\`
};

export default yogesh;`
      },
      {
        id: 'skills-ts',
        name: 'skills.ts',
        type: 'file',
        language: 'typescript',
        icon: 'typescript',
        path: 'YOGESH/skills.ts',
        content: `export interface TechnicalSkills {
  languages: string[];
  frontend: string[];
  backend: string[];
  databases: string[];
  tools: string[];
}

const skills: TechnicalSkills = ${JSON.stringify(portfolioData.skills, null, 2)};

export default skills;`
      },
      {
        id: 'education-ts',
        name: 'education.ts',
        type: 'file',
        language: 'typescript',
        icon: 'typescript',
        path: 'YOGESH/education.ts',
        content: `export interface EducationDetails {
  degree: string;
  field: string;
  institution: string;
  status: string;
}

const education: EducationDetails = ${JSON.stringify(portfolioData.education, null, 2)};

export default education;`
      },
      {
        id: 'projects-folder',
        name: 'projects',
        type: 'folder',
        isOpen: true,
        path: 'YOGESH/projects',
        children: portfolioData.projects.map((proj) => ({
          id: `${proj.id}-folder`,
          name: proj.id,
          type: 'folder',
          isOpen: false,
          path: `YOGESH/projects/${proj.id}`,
          children: [
            {
              id: `${proj.id}-readme`,
              name: 'README.md',
              type: 'file',
              language: 'markdown',
              icon: 'markdown',
              path: `YOGESH/projects/${proj.id}/README.md`,
              content: `# ${proj.name}\n\n${proj.description}\n\n## Features\n\n${proj.features.map(f => `- ${f}`).join('\n')}`
            },
            {
              id: `${proj.id}-ts`,
              name: 'project.ts',
              type: 'file',
              language: 'typescript',
              icon: 'typescript',
              path: `YOGESH/projects/${proj.id}/project.ts`,
              content: `export const ${proj.id.replace(/-([a-z])/g, g => g[1].toUpperCase())}Project = ${JSON.stringify({
                id: proj.id,
                name: proj.name,
                category: proj.category,
                techStack: proj.techStack
              }, null, 2)};`
            }
          ]
        }))
      },
      {
        id: 'experience-folder',
        name: 'experience',
        type: 'folder',
        isOpen: false,
        path: 'YOGESH/experience',
        children: [
          {
            id: 'experience-readme',
            name: 'README.md',
            type: 'file',
            language: 'markdown',
            icon: 'markdown',
            path: 'YOGESH/experience/README.md',
            content: `# Experience\n\nCurrently building projects, experimenting with software development, and exploring AI-powered products.\n\nProfessional experience details and internships will be updated here.`
          }
        ]
      },
      {
        id: 'resume-pdf',
        name: 'resume.pdf',
        type: 'file',
        language: 'pdf',
        icon: 'pdf',
        path: 'YOGESH/resume.pdf',
        content: `${portfolioData.developer.name} — Professional Resume Document`
      },
      {
        id: 'contact-ts',
        name: 'contact.ts',
        type: 'file',
        language: 'typescript',
        icon: 'typescript',
        path: 'YOGESH/contact.ts',
        content: `export interface ContactInformation {
  email: string;
  social: {
    github: string;
    linkedin: string;
  };
}

const contact: ContactInformation = {
  email: "${portfolioData.developer.email}",

  social: {
    github: "${portfolioData.developer.github}",
    linkedin: "${portfolioData.developer.linkedin}"
  }
};

export default contact;`
      },
      {
        id: 'secret-file',
        name: '.secret',
        type: 'file',
        language: 'markdown',
        icon: 'markdown',
        path: 'YOGESH/.secret',
        isDotFile: true,
        content: `# ACCESSING .secret...\n\nYou found the hidden file! 🔓\n\nThere are probably more secrets around here...\nTry typing 'matrix', 'coffee', 'joke', or 'sudo hire yogesh' in the terminal.\n\nNice work, code archaeologist! 👀`
      }
    ]
  }
];

export function findFileById(nodes, id) {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findFileById(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

export function findFileByPath(nodes, path) {
  for (const node of nodes) {
    if (node.path === path) return node;
    if (node.children) {
      const found = findFileByPath(node.children, path);
      if (found) return found;
    }
  }
  return null;
}
