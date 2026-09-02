import React from 'react';
import { Code2, Minus, Square, X } from 'lucide-react';

export function TitleBar({ title = "Yogesh Singh — Developer Portfolio", onToggleSidebar, isSidebarOpen }) {
  const menuItems = ['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'];

  return (
    <header className="h-8 bg-[#0C0C0C] text-[#777777] flex items-center justify-between px-3 text-xs select-none border-b border-white/[0.045] z-30 flex-shrink-0">
      {/* Left section: Logo & Menus */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1.5 text-[#4F8CC9]">
          <Code2 className="w-4 h-4 text-[#4F8CC9]" />
        </div>
        
        {/* Top Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-0.5 text-[#666666]">
          {menuItems.map((item) => (
            <button
              key={item}
              aria-label={`Menu ${item}`}
              className="px-2 py-0.5 rounded text-[12px] hover:bg-[#252525] hover:text-[#B8B8B8] transition-colors focus:outline-none"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* Center section: Document / Portfolio Title */}
      <div className="flex-1 text-center font-normal text-[#777777] text-[12px] truncate px-4">
        <span>{title}</span>
      </div>

      {/* Right section: Window Controls */}
      <div className="flex items-center h-full -mr-3 text-[#666666]">
        <button
          title="Minimize"
          aria-label="Minimize Window"
          className="h-8 px-3 flex items-center justify-center hover:bg-[#252525] hover:text-[#B8B8B8] transition-colors focus:outline-none"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <button
          title="Maximize"
          aria-label="Maximize Window"
          className="h-8 px-3 flex items-center justify-center hover:bg-[#252525] hover:text-[#B8B8B8] transition-colors focus:outline-none"
        >
          <Square className="w-3 h-3" />
        </button>
        <button
          title="Close"
          aria-label="Close Window"
          className="h-8 px-3.5 flex items-center justify-center hover:bg-[#e81123] hover:text-white transition-colors focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
