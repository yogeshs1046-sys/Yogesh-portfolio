import React, { useState, useEffect } from 'react';
import { initialFileSystem, findFileById } from './data/fileSystem';
import { TitleBar } from './components/TitleBar';
import { ActivityBar } from './components/ActivityBar';
import { Sidebar } from './components/Sidebar';
import { CodeEditor } from './components/CodeEditor';
import { Terminal } from './components/Terminal';
import { StatusBar } from './components/StatusBar';
import { BootScreen } from './components/BootScreen';
import { AchievementToast } from './components/AchievementToast';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MobileView } from './components/MobileView';
import { initKonamiListener } from './easterEggs/konami';

export default function App() {
  const [fileSystem, setFileSystem] = useState(initialFileSystem);
  const [activeActivityTab, setActiveActivityTab] = useState('explorer');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Responsive screen breakpoint detection (< 768px is Mobile)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  // Session persistence for Boot Screen animation
  const [hasBooted, setHasBooted] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('yogesh_ide_has_booted') === 'true';
    }
    return false;
  });

  const [showBootScreen, setShowBootScreen] = useState(!hasBooted);
  const [currentInternalPath, setCurrentInternalPath] = useState('YOGESH');

  // Initial open tabs: README.md, about.ts, skills.ts
  const defaultReadmeFile = findFileById(initialFileSystem, 'readme-md');
  const defaultAboutFile = findFileById(initialFileSystem, 'about-ts');
  const defaultSkillsFile = findFileById(initialFileSystem, 'skills-ts');

  const [openTabs, setOpenTabs] = useState([
    defaultReadmeFile,
    defaultAboutFile,
    defaultSkillsFile
  ].filter(Boolean));

  const [activeFileId, setActiveFileId] = useState('readme-md');
  const [cursorLine, setCursorLine] = useState(1);

  // Terminal States
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [isTerminalMaximized, setIsTerminalMaximized] = useState(false);

  // Handle responsive resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize Konami Listener & DevTools Console Greeting
  useEffect(() => {
    const cleanupKonami = initKonamiListener();

    if (typeof window !== 'undefined') {
      console.log(
        '%c👀 You opened DevTools!\n%cRespect. Try exploring the terminal commands inside the portfolio instead.',
        'color: #007acc; font-size: 16px; font-weight: bold;',
        'color: #4ec9b0; font-size: 12px;'
      );
    }

    return () => {
      if (cleanupKonami) cleanupKonami();
    };
  }, []);

  const handleBootComplete = () => {
    setHasBooted(true);
    setShowBootScreen(false);
    sessionStorage.setItem('yogesh_ide_has_booted', 'true');
  };

  const triggerReboot = () => {
    setShowBootScreen(true);
  };

  const handleSelectFile = (file) => {
    if (!file || file.type !== 'file') return;

    if (!openTabs.some((tab) => tab.id === file.id)) {
      setOpenTabs((prev) => [...prev, file]);
    }
    setActiveFileId(file.id);
  };

  const handleCloseTab = (tabId) => {
    const updatedTabs = openTabs.filter((tab) => tab.id !== tabId);
    setOpenTabs(updatedTabs);

    if (activeFileId === tabId) {
      if (updatedTabs.length > 0) {
        setActiveFileId(updatedTabs[updatedTabs.length - 1].id);
      } else {
        setActiveFileId(null);
      }
    }
  };

  const handleToggleFolder = (folderId) => {
    const toggleNode = (nodes) => {
      return nodes.map((node) => {
        if (node.id === folderId) {
          return { ...node, isOpen: !node.isOpen };
        }
        if (node.children) {
          return { ...node, children: toggleNode(node.children) };
        }
        return node;
      });
    };
    setFileSystem(toggleNode(fileSystem));
  };

  const activeFile = activeFileId ? findFileById(fileSystem, activeFileId) : null;

  return (
    <ErrorBoundary>
      <div className="flex flex-col h-screen w-screen bg-vscode-bg text-[#cccccc] overflow-hidden select-none font-sans relative">
        {/* 0. IDE Terminal Boot Animation Screen */}
        {showBootScreen && (
          <BootScreen onBootComplete={handleBootComplete} />
        )}

        {/* Achievement Unlocked Toast Notification */}
        <AchievementToast />

        {/* Mobile View (< 768px) vs Desktop IDE (>= 768px) */}
        {isMobile ? (
          <MobileView
            fileSystem={fileSystem}
            onOpenFile={handleSelectFile}
            activeFile={activeFile}
          />
        ) : (
          <>
            {/* 1. Top Title Bar */}
            <TitleBar 
              title="Yogesh Singh — Developer Portfolio" 
              onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              isSidebarOpen={isSidebarOpen}
            />

            {/* Main Workspace (Activity Bar + Sidebar + Main Editor Area + Terminal) */}
            <div className="flex-1 flex overflow-hidden relative">
              {/* 2. Activity Bar (Left vertical icons) */}
              <ActivityBar
                activeTab={activeActivityTab}
                setActiveTab={setActiveActivityTab}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
              />

              {/* 3. Explorer / Sidebar Panel */}
              <Sidebar
                activeTab={activeActivityTab}
                fileSystem={fileSystem}
                activeFileId={activeFileId}
                onSelectFile={handleSelectFile}
                onToggleFolder={handleToggleFolder}
                isOpen={isSidebarOpen}
              />

              {/* Center Editor Area + Terminal Column */}
              <main className="flex-1 flex flex-col h-full overflow-hidden bg-vscode-bg">
                {/* 4. Code Editor Canvas */}
                <CodeEditor
                  openTabs={openTabs}
                  activeFile={activeFile}
                  activeFileId={activeFileId}
                  onSelectTab={setActiveFileId}
                  onCloseTab={handleCloseTab}
                  cursorLine={cursorLine}
                  setCursorLine={setCursorLine}
                />

                {/* 5. Terminal Panel */}
                <Terminal
                  isTerminalOpen={isTerminalOpen}
                  setIsTerminalOpen={setIsTerminalOpen}
                  isTerminalMaximized={isTerminalMaximized}
                  setIsTerminalMaximized={setIsTerminalMaximized}
                  fileSystem={fileSystem}
                  onOpenFile={handleSelectFile}
                  currentInternalPath={currentInternalPath}
                  setCurrentInternalPath={setCurrentInternalPath}
                  triggerReboot={triggerReboot}
                />
              </main>
            </div>

            {/* 6. Status Bar (Fixed at bottom) */}
            <StatusBar
              activeFile={activeFile}
              cursorLine={cursorLine}
              isTerminalOpen={isTerminalOpen}
              setIsTerminalOpen={setIsTerminalOpen}
            />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}
