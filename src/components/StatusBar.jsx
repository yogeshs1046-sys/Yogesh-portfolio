import React from 'react';
import { GitBranch, AlertCircle, AlertTriangle, CheckCheck, Bell, Radio } from 'lucide-react';

export function StatusBar({ activeFile, cursorLine, isTerminalOpen, setIsTerminalOpen }) {
  const getLanguageLabel = (file) => {
    if (!file) return 'Plain Text';
    switch (file.language) {
      case 'javascriptreact':
        return 'JavaScript React';
      case 'typescript':
        return 'TypeScript';
      case 'javascript':
        return 'JavaScript';
      case 'css':
        return 'CSS';
      case 'json':
        return 'JSON';
      case 'markdown':
        return 'Markdown';
      default:
        return 'Plain Text';
    }
  };

  return (
    <footer className="h-6 bg-[#101010] text-[#707070] border-t border-white/[0.045] flex items-center justify-between px-3 text-[11px] select-none font-sans z-30 flex-shrink-0">
      {/* Left Items */}
      <div className="flex items-center space-x-3">
        {/* Remote/WS Code Badge */}
        <button
          className="flex items-center space-x-1 hover:bg-[#252525] hover:text-[#B8B8B8] px-1.5 py-0.5 rounded transition-colors"
          title="Source Control Branch"
          aria-label="Git branch main"
        >
          <GitBranch className="w-3.5 h-3.5 text-[#4F8CC9]" />
          <span className="font-semibold text-[#858585]">main*</span>
        </button>

        {/* Sync & Errors */}
        <div className="flex items-center space-x-2 text-[10px]">
          <span className="flex items-center space-x-1 hover:bg-[#252525] hover:text-[#B8B8B8] px-1 py-0.5 rounded cursor-pointer" title="0 Errors">
            <AlertCircle className="w-3 h-3 text-[#707070]" />
            <span>0</span>
          </span>
          <span className="flex items-center space-x-1 hover:bg-[#252525] hover:text-[#B8B8B8] px-1 py-0.5 rounded cursor-pointer" title="0 Warnings">
            <AlertTriangle className="w-3 h-3 text-[#707070]" />
            <span>0</span>
          </span>
        </div>

        {/* Live Broadcast / Environment Indicator */}
        <div className="hidden sm:flex items-center space-x-1 opacity-80 text-[10px]">
          <Radio className="w-3 h-3 text-[#789B78] animate-pulse" />
          <span className="text-[#858585]">Live Studio</span>
        </div>
      </div>

      {/* Right Items */}
      <div className="flex items-center space-x-3">
        {/* Line and Column info */}
        <button className="hover:bg-[#252525] hover:text-[#B8B8B8] px-1.5 py-0.5 rounded transition-colors">
          Ln {cursorLine}, Col 8
        </button>

        {/* Indentation */}
        <button className="hidden sm:inline-block hover:bg-[#252525] hover:text-[#B8B8B8] px-1.5 py-0.5 rounded transition-colors">
          Spaces: 4
        </button>

        {/* Encoding */}
        <button className="hidden md:inline-block hover:bg-[#252525] hover:text-[#B8B8B8] px-1.5 py-0.5 rounded transition-colors">
          UTF-8
        </button>

        {/* EOL */}
        <button className="hidden md:inline-block hover:bg-[#252525] hover:text-[#B8B8B8] px-1.5 py-0.5 rounded transition-colors">
          LF
        </button>

        {/* Language */}
        <button className="hover:bg-[#252525] hover:text-[#B8B8B8] px-1.5 py-0.5 rounded transition-colors font-medium text-[#858585]">
          {getLanguageLabel(activeFile)}
        </button>

        {/* Formatter */}
        <button className="hidden lg:flex items-center space-x-1 hover:bg-[#252525] hover:text-[#B8B8B8] px-1.5 py-0.5 rounded transition-colors" title="Prettier Formatter">
          <CheckCheck className="w-3.5 h-3.5" />
          <span>Prettier</span>
        </button>

        {/* Terminal Toggle Shortcut */}
        <button
          onClick={() => setIsTerminalOpen(!isTerminalOpen)}
          className="hover:bg-[#252525] hover:text-[#B8B8B8] px-1.5 py-0.5 rounded transition-colors flex items-center space-x-1"
          title="Toggle Integrated Terminal"
          aria-label="Toggle Terminal"
        >
          <span>Terminal</span>
        </button>

        {/* Notifications */}
        <button className="hover:bg-[#252525] hover:text-[#B8B8B8] p-1 rounded transition-colors" title="Notifications" aria-label="Notifications">
          <Bell className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
