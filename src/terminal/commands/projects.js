export function handleProjects() {
  return {
    type: 'output',
    content: `PROJECTS

01  floor-planner    2D architectural floor plan editor app
02  cloakroom        Digital luggage check-in & locker system
03  mobile-code      Touch-friendly Android code editor
04  billing-app      Enterprise billing & invoice desktop software

Use:
  open <project-name>

Example:
  open floor-planner`
  };
}
