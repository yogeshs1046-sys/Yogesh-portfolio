import React, { useState, useRef, useEffect } from 'react';
import { Trash2, ChevronUp, ChevronDown, X } from 'lucide-react';
import { executeCommand, commandNames } from '../terminal/CommandRegistry';
import { formatPromptPath } from '../terminal/VirtualNavigation';
import { getAutocomplete } from '../terminal/Autocomplete';
import { runProgressBarAnimation, runChecklistAnimation } from '../animations/commandAnimation';

const MAX_TERMINAL_ENTRIES = 100;

export function Terminal({ 
  isTerminalOpen, 
  setIsTerminalOpen, 
  isTerminalMaximized, 
  setIsTerminalMaximized,
  fileSystem,
  onOpenFile,
  currentInternalPath,
  setCurrentInternalPath,
  triggerReboot
}) {
  const [activeTab, setActiveTab] = useState('terminal');
  const [inputVal, setInputVal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isErrorShake, setIsErrorShake] = useState(false);
  
  const [history, setHistory] = useState([
    { id: 1, text: 'PortfolioOS Terminal v6.0.0 [Yogesh Singh Developer IDE]', type: 'system' },
    { id: 2, text: 'System ready. Type "help" to explore portfolio commands.', type: 'info' }
  ]);

  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const activeCancelRef = useRef(null);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const appendHistory = (newEntry) => {
    setHistory(prev => {
      const updated = [...prev, newEntry];
      if (updated.length > MAX_TERMINAL_ENTRIES) {
        return updated.slice(updated.length - MAX_TERMINAL_ENTRIES);
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const raw = inputVal;
    const trimmed = raw.trim();
    if (!trimmed || isProcessing) return;

    if (activeCancelRef.current) {
      activeCancelRef.current();
      activeCancelRef.current = null;
    }

    const displayPrompt = `yogesh@portfolio:${formatPromptPath(currentInternalPath)}$ ${raw}`;
    const entryId = Date.now();
    const promptEntry = { id: entryId, text: displayPrompt, type: 'input' };

    appendHistory(promptEntry);
    setCommandHistory(prev => [raw, ...prev]);
    setHistoryIndex(-1);
    setInputVal('');

    const context = {
      fileSystem,
      currentInternalPath,
      setCurrentInternalPath,
      onOpenFile,
      setHistory,
      triggerReboot
    };

    const lower = trimmed.toLowerCase();

    if (lower === 'projects') {
      setIsProcessing(true);
      const progressEntryId = Date.now() + 1;
      appendHistory({ id: progressEntryId, text: 'Scanning /projects...\n[--------------------] 0%', type: 'info' });

      activeCancelRef.current = runProgressBarAnimation(
        (barText) => {
          setHistory(prev => prev.map(item => item.id === progressEntryId ? { ...item, text: `Scanning /projects...\n${barText}` } : item));
        },
        () => {
          setIsProcessing(false);
          const result = executeCommand(raw, context);
          if (result) {
            appendHistory({ id: Date.now() + 2, text: result.content, type: result.type });
          }
        }
      );
      return;
    }

    if (lower.startsWith('open ')) {
      setIsProcessing(true);
      const mountEntryId = Date.now() + 1;
      const items = ['Reading project metadata', 'Loading project files', 'Loading documentation', 'Project loaded'];

      appendHistory({ id: mountEntryId, text: 'Mounting project...', type: 'info' });

      activeCancelRef.current = runChecklistAnimation(
        items,
        (checklistText) => {
          setHistory(prev => prev.map(item => item.id === mountEntryId ? { ...item, text: `Mounting project...\n${checklistText}` } : item));
        },
        () => {
          setIsProcessing(false);
          const result = executeCommand(raw, context);
          if (result) {
            appendHistory({ id: Date.now() + 2, text: result.content, type: result.type });
          }
        }
      );
      return;
    }

    if (lower === 'sudo hire yogesh' || lower === 'sudo hire') {
      setIsProcessing(true);
      const sudoEntryId = Date.now() + 1;
      const checks = ['Checking skills', 'Checking projects', 'Checking problem solving', 'Checking motivation'];

      appendHistory({ id: sudoEntryId, text: '[sudo] checking permissions...', type: 'info' });

      activeCancelRef.current = runChecklistAnimation(
        checks,
        (checkText) => {
          setHistory(prev => prev.map(item => item.id === sudoEntryId ? { ...item, text: `[sudo] checking permissions...\n${checkText}` } : item));
        },
        () => {
          setIsProcessing(false);
          appendHistory({ 
            id: Date.now() + 2, 
            text: '\nACCESS GRANTED\n\nPermission granted.\n\n> Let\'s build something together.\n\nOpening contact.ts...', 
            type: 'success' 
          });
          const result = executeCommand(raw, context);
        }
      );
      return;
    }

    const result = executeCommand(raw, context);
    if (result) {
      if (result.type === 'error') {
        setIsErrorShake(true);
        setTimeout(() => setIsErrorShake(false), 400);
      }
      appendHistory({ id: Date.now() + 1, text: result.content, type: result.type });
    }
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      setHistory([]);
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const completion = getAutocomplete(inputVal, commandNames, fileSystem, currentInternalPath);
      if (completion) {
        setInputVal(completion);
      }
    }
  };

  if (!isTerminalOpen) return null;

  const promptText = `yogesh@portfolio:${formatPromptPath(currentInternalPath)}$`;

  return (
    <div
      className={`bg-[#0F0F0F] text-[#999999] flex flex-col border-t border-white/[0.045] z-10 transition-all select-none ${
        isTerminalMaximized ? 'h-full' : 'h-52 md:h-60'
      } ${isErrorShake ? 'animate-pulse border-rose-500/50' : ''}`}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Header */}
      <div className="h-8 bg-[#101010] border-b border-white/[0.045] flex items-center justify-between px-3 text-xs flex-shrink-0">
        <div className="flex items-center space-x-4">
          {['PROBLEMS', 'OUTPUT', 'DEBUG CONSOLE', 'TERMINAL', 'PORTS'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
              aria-label={`View ${tab} panel`}
              className={`py-1 text-[11px] font-semibold tracking-wider transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#4F8CC9] ${
                activeTab === tab.toLowerCase().replace(' ', '-')
                  ? 'text-[#B8B8B8] border-b-2 border-[#4F8CC9]'
                  : 'text-[#606060] hover:text-[#B8B8B8]'
              }`}
            >
              {tab}
              {tab === 'PROBLEMS' && <span className="ml-1 bg-[#252525] text-[10px] px-1 rounded">0</span>}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2 text-[#606060]">
          <button
            onClick={() => setHistory([])}
            title="Clear Terminal (Ctrl+L)"
            aria-label="Clear Terminal Output"
            className="hover:text-[#B8B8B8] transition-colors p-1 rounded focus:outline-none"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsTerminalMaximized(!isTerminalMaximized)}
            title={isTerminalMaximized ? 'Restore Size' : 'Maximize Panel'}
            aria-label={isTerminalMaximized ? 'Restore Terminal Size' : 'Maximize Terminal Size'}
            className="hover:text-[#B8B8B8] transition-colors p-1 rounded focus:outline-none"
          >
            {isTerminalMaximized ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setIsTerminalOpen(false)}
            title="Close Terminal Panel"
            aria-label="Close Terminal Panel"
            className="hover:text-[#B8B8B8] transition-colors p-1 rounded focus:outline-none"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Output Screen */}
      <div className="flex-1 p-3.5 font-mono text-[14px] overflow-y-auto space-y-1.5 select-text">
        {history.map((item) => (
          <div key={item.id} className="whitespace-pre-wrap leading-relaxed">
            {item.type === 'input' && (
              <span className="text-[#B0B0B0] font-semibold">{item.text}</span>
            )}
            {item.type === 'system' && (
              <span className="text-[#606060]">{item.text}</span>
            )}
            {item.type === 'info' && (
              <span className="text-[#7FA7C7]">{item.text}</span>
            )}
            {item.type === 'output' && (
              <span className="text-[#999999]">{item.text}</span>
            )}
            {item.type === 'success' && (
              <span className="text-[#789B78] font-semibold">{item.text}</span>
            )}
            {item.type === 'error' && (
              <span className="text-[#A87878] font-semibold">{item.text}</span>
            )}
          </div>
        ))}

        {/* Input Prompt */}
        <form onSubmit={handleSubmit} className="flex items-center space-x-2 pt-1 relative">
          <span className="text-[#666666] font-bold select-none flex-shrink-0">
            {promptText}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
            aria-label="Terminal Command Prompt Input"
            className="flex-1 bg-transparent border-none text-[#B0B0B0] focus:outline-none font-mono text-[14px] leading-none disabled:opacity-50"
            spellCheck="false"
            autoComplete="off"
            placeholder={inputVal ? '' : 'Try: help, projects, open cloakroom, neofetch, sudo hire yogesh...'}
          />
        </form>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}
