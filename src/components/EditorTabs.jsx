import React from 'react';
import { X } from 'lucide-react';
import { getFileIcon } from './Explorer';

export function EditorTabs({ openTabs, activeFileId, onSelectTab, onCloseTab }) {
  if (!openTabs || openTabs.length === 0) return null;

  return (
    <div className="h-9 bg-[#101010] border-b border-white/[0.045] flex items-center overflow-x-auto select-none no-scrollbar flex-shrink-0">
      {openTabs.map((tab) => {
        const isActive = tab.id === activeFileId;

        return (
          <div
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`group h-full flex items-center space-x-2 px-3.5 border-r border-white/[0.045] text-[13px] cursor-pointer transition-colors relative flex-shrink-0 ${
              isActive
                ? 'bg-[#141414] text-[#B0B0B0] font-medium'
                : 'bg-[#101010] text-[#686868] hover:bg-[#1c1c1c] hover:text-[#B0B0B0]'
            }`}
          >
            {/* Top Active Tab Accent Line */}
            {isActive && (
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#4F8CC9]" />
            )}

            {/* File Icon */}
            {getFileIcon(tab.icon, tab.name)}

            {/* File Name */}
            <span className="truncate max-w-[140px]">{tab.name}</span>

            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCloseTab(tab.id);
              }}
              title="Close Tab"
              aria-label={`Close ${tab.name} tab`}
              className={`p-0.5 rounded hover:bg-[#252525] transition-colors focus:outline-none ${
                isActive ? 'text-[#606060] hover:text-[#909090] opacity-100' : 'text-[#606060] opacity-0 group-hover:opacity-100'
              }`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
