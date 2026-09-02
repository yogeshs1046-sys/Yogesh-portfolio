export function handleHelp() {
  return {
    type: 'output',
    content: `Available commands:

Portfolio Information:
  about       Learn about Yogesh Singh
  skills      View technical skills & stack
  projects    Explore software projects
  education   View academic background
  experience  View experience & development status
  resume      Open / download resume document
  contact     View contact details & social channels

Virtual File System:
  ls          List directory files & folders
  cd <dir>    Change current directory (~, .., /, projects)
  cat <file>  Read content of a virtual file
  open <item> Open project or file in IDE code editor

System:
  whoami      Display developer role summary
  neofetch    Display system & repository information
  sudo <cmd>  Execute elevated portfolio actions
  clear       Clear terminal output
  help        Show this help menu`
  };
}
