/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vscode: {
          bg: '#141414',          // Deep dark main editor background
          sidebar: '#101010',     // Explorer sidebar & status
          activity: '#0C0C0C',    // Dark activity bar & title bar
          activityActive: '#38BDF8',
          activityInactive: '#666666',
          title: '#0C0C0C',       // Dark title bar
          tabActive: '#141414',    // Active tab matching editor
          tabInactive: '#101010',  // Inactive tab
          tabHover: '#1c1c1c',
          status: '#101010',      // Bottom status bar
          statusText: '#707070',
          border: 'rgba(255, 255, 255, 0.045)', // Subtle VS Code border
          hover: '#1c1c1c',
          selected: '#222222',    // Subtle selection background
          lineNumber: '#484848',
          activeLine: '#1c1c1c',  // Muted active line highlight
          terminal: '#0F0F0F',    // Darker terminal background
          accent: '#38BDF8',
          accentHover: '#0284c7',
          textPrimary: '#E2E8F0',
          textSecondary: '#84CC16',
          textMuted: '#6B7280',
          textDisabled: '#353535'
        },
        syntax: {
          keyword: '#38BDF8',    // Cyan Blue
          string: '#84CC16',     // Vibrant Lime Green
          function: '#FFC700',   // Warm Golden Yellow
          property: '#F43F5E',   // Crimson Pink Red
          variable: '#E2E8F0',   // Light Off-White
          comment: '#6B7280',    // Muted Slate
          number: '#F59E0B',     // Amber Yellow
          type: '#38BDF8',       // Cyan Blue
          tag: '#38BDF8',        // Cyan Blue
          attr: '#F43F5E',       // Crimson Pink Red
          punctuation: '#CCCCCC'// Light Off-White
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Cascadia Code', 'Fira Code', 'Consolas', 'Courier New', 'monospace'],
        sans: ['Segoe UI', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
