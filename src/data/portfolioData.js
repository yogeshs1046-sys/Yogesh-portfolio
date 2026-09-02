/**
 * Single Source of Truth for Yogesh Singh's Portfolio Data
 */

export const portfolioData = {
  developer: {
    name: "Yogesh Singh",
    title: "Computer Science Engineer",
    role: "Full-Stack Web Developer & Software Engineer",
    location: "India",
    email: "yogesh.singh.dev@example.com",
    github: "https://github.com/yogesh-singh",
    linkedin: "https://linkedin.com/in/yogesh-singh",
    twitter: "@yogesh_dev",
    status: "Building next-gen web applications 🚀",
    mindset: "Build. Learn. Improve.",
    interests: [
      "Software Development",
      "Artificial Intelligence",
      "Product Building",
      "System Architecture"
    ],
    bio: "Passionate Computer Science student and developer driven by creating clean, scalable software solutions. Focused on full-stack web development, software engineering best practices, and building developer-focused products."
  },

  education: {
    degree: "B.Tech",
    field: "Computer Science and Engineering",
    institution: "Global Institute of Engineering and Technology",
    status: "Currently pursuing"
  },

  skills: {
    languages: ["Java", "JavaScript", "TypeScript", "Kotlin"],
    frontend: ["React", "HTML", "CSS", "Tailwind CSS"],
    backend: ["Node.js", "Express"],
    databases: ["SQLite", "MySQL"],
    tools: ["Git", "GitHub", "Android Studio", "Vite"]
  },

  projects: [
    {
      id: "floor-planner",
      name: "Floor Planner",
      category: "Architectural & CAD Tool",
      description: "An interactive web application for creating and designing 2D architectural floor plans.",
      techStack: ["React", "HTML5 Canvas", "TypeScript", "Tailwind CSS"],
      features: [
        "2D floor plan editor canvas",
        "Walls and room creation tools",
        "Interactive doors and windows placement",
        "Furniture layout & interior arrangement",
        "Accurate room measurements",
        "Real-time surface area calculations"
      ]
    },
    {
      id: "cloakroom",
      name: "Cloakroom System",
      category: "Inventory & Service Software",
      description: "A digital luggage and cloakroom management software designed to streamline item check-ins and tag assignments.",
      techStack: ["Node.js", "Express", "SQLite", "JavaScript"],
      features: [
        "Fast check-in and luggage tagging",
        "Barcode/QR ticket generation",
        "Real-time storage locker allocation",
        "Automated fee calculation & receipts"
      ]
    },
    {
      id: "mobile-code",
      name: "Mobile Code Editor",
      category: "Developer Tools & Mobile App",
      description: "A lightweight mobile-optimized code editor and syntax runner designed for smartphones and tablets.",
      techStack: ["Kotlin", "Android SDK", "Java"],
      features: [
        "Touch-friendly syntax highlight editor",
        "Quick code snippet snippets & auto-indent",
        "Support for JavaScript, HTML, and CSS sandbox execution",
        "Offline local file storage"
      ]
    },
    {
      id: "billing-app",
      name: "Billing & Invoicing App",
      category: "Finance & Enterprise",
      description: "A desktop & web billing application for managing client invoices, tax breakdowns, and payment history.",
      techStack: ["Java", "MySQL", "Swing / JavaFX"],
      features: [
        "Customized PDF invoice generation",
        "Product & inventory pricing catalog",
        "Tax breakdown calculation (GST/VAT)",
        "Financial overview & sales reports"
      ]
    }
  ]
};
