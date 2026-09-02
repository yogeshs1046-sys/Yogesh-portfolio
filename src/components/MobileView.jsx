import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, FileText, ChevronRight, X, Sparkles, Folder, Play } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { executeCommand, commandNames } from '../terminal/CommandRegistry';

export function MobileView({ fileSystem, onOpenFile, activeFile }) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { id: 1, text: 'YOGESH-IDE Mobile Terminal v6.0.0', type: 'system' },
    { id: 2, text: 'Tap a quick command button below or type to explore.', type: 'info' }
  ]);
  const [isEditorDrawerOpen, setIsEditorDrawerOpen] = useState(false);

  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  useEffect(() => {
    if (activeFile) {
      setIsEditorDrawerOpen(true);
    }
  }, [activeFile]);

  const handleCommand = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const displayPrompt = `yogesh@portfolio:~$ ${raw}`;
    const newEntries = [
      ...history,
      { id: Date.now(), text: displayPrompt, type: 'input' }
    ];

    const context = {
      fileSystem,
      currentInternalPath: 'YOGESH',
      setCurrentInternalPath: () => {},
      onOpenFile: (file) => {
        onOpenFile(file);
        setIsEditorDrawerOpen(true);
      },
      setHistory
    };

    const result = executeCommand(raw, context);
    if (result) {
      newEntries.push({
        id: Date.now() + 1,
        text: result.content,
        type: result.type
      });
    }

    setHistory(newEntries);
    setInputVal('');
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#181818] text-[#cccccc] font-sans select-none overflow-hidden">
      {/* Mobile Top Header */}
      <header className="h-12 bg-vscode-title px-4 flex items-center justify-between border-b border-vscode-border flex-shrink-0">
        <div className="flex items-center space-x-2 font-bold text-sm text-white">
          <TerminalIcon className="w-5 h-5 text-vscode-accent" />
          <span>YOGESH-IDE</span>
        </div>
        <div className="flex items-center space-x-2">
          {activeFile && (
            <button
              onClick={() => setIsEditorDrawerOpen(true)}
              className="flex items-center space-x-1 min-h-[44px] px-3 bg-vscode-accent/20 text-vscode-accent rounded text-xs font-semibold"
            >
              <FileText className="w-4 h-4" />
              <span className="truncate max-w-[100px]">{activeFile.name}</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Mobile Content (Terminal Scroll Canvas) */}
      <main className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-3 select-text">
        {history.map((item) => (
          <div key={item.id} className="whitespace-pre-wrap leading-relaxed">
            {item.type === 'input' && (
              <span className="text-white font-medium">{item.text}</span>
            )}
            {item.type === 'system' && (
              <span className="text-[#858585]">{item.text}</span>
            )}
            {item.type === 'info' && (
              <span className="text-[#38bdf8]">{item.text}</span>
            )}
            {item.type === 'output' && (
              <span className="text-[#cccccc]">{item.text}</span>
            )}
            {item.type === 'success' && (
              <span className="text-[#4ec9b0] font-medium">{item.text}</span>
            )}
            {item.type === 'error' && (
              <span className="text-rose-400 font-medium">{item.text}</span>
            )}
          </div>
        ))}

        {/* Interactive Prompt Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(inputVal);
          }}
          className="flex items-center space-x-2 pt-2"
        >
          <span className="text-[#38bdf8] font-bold select-none">
            yogesh@portfolio:~$
          </span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 bg-transparent border-none text-white focus:outline-none font-mono text-xs min-h-[44px]"
            placeholder="Type command..."
            spellCheck="false"
          />
        </form>
        <div ref={terminalEndRef} />
      </main>

      {/* Mobile Touch Command Shortcuts Bar (Touch targets ≥ 44px) */}
      <footer className="p-3 bg-vscode-sidebar border-t border-vscode-border space-y-2 flex-shrink-0">
        <div className="text-[10px] text-[#858585] font-semibold uppercase tracking-wider">
          Quick Actions & Projects
        </div>
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => handleCommand('projects')}
            className="min-h-[44px] px-3 bg-[#3c3c3c] hover:bg-vscode-accent text-white rounded text-xs font-medium flex items-center space-x-1.5 flex-shrink-0"
          >
            <Folder className="w-4 h-4 text-amber-400" />
            <span>projects</span>
          </button>

          {portfolioData.projects.map((proj) => (
            <button
              key={proj.id}
              onClick={() => handleCommand(`open ${proj.id}`)}
              className="min-h-[44px] px-3 bg-[#3c3c3c] hover:bg-vscode-accent text-white rounded text-xs font-medium flex items-center space-x-1.5 flex-shrink-0"
            >
              <Play className="w-3.5 h-3.5 text-vscode-accent" />
              <span>{proj.id}</span>
            </button>
          ))}

          <button
            onClick={() => handleCommand('neofetch')}
            className="min-h-[44px] px-3 bg-[#3c3c3c] hover:bg-vscode-accent text-white rounded text-xs font-medium flex items-center space-x-1.5 flex-shrink-0"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>neofetch</span>
          </button>

          <button
            onClick={() => handleCommand('sudo hire yogesh')}
            className="min-h-[44px] px-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-xs font-bold flex items-center space-x-1.5 flex-shrink-0"
          >
            <span>sudo hire yogesh</span>
          </button>
        </div>
      </footer>

      {/* Mobile Editor Drawer Modal */}
      {isEditorDrawerOpen && activeFile && (
        <div className="fixed inset-0 bg-black/80 z-50 flex flex-col justify-end">
          <div className="bg-vscode-bg h-[80vh] w-full rounded-t-2xl flex flex-col overflow-hidden border-t border-vscode-border">
            {/* Drawer Header */}
            <div className="h-12 bg-vscode-title px-4 flex items-center justify-between border-b border-vscode-border flex-shrink-0">
              <div className="flex items-center space-x-2 text-xs text-white font-medium">
                <FileText className="w-4 h-4 text-vscode-accent" />
                <span>{activeFile.name}</span>
              </div>
              <button
                onClick={() => setIsEditorDrawerOpen(false)}
                className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#cccccc] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto whitespace-pre-wrap leading-relaxed select-text text-[#cccccc]">
              {activeFile.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
