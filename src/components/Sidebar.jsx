import React from 'react';
import { Explorer } from './Explorer';
import { MoreHorizontal, FolderPlus, FilePlus, RefreshCw, GitCommit } from 'lucide-react';

export function Sidebar({ 
  activeTab, 
  fileSystem, 
  activeFileId, 
  onSelectFile, 
  onToggleFolder,
  isOpen 
}) {
  if (!isOpen) return null;

  return (
    <aside className="w-60 md:w-64 bg-[#101010] text-[#B8B8B8] flex flex-col h-full border-r border-white/[0.045] select-none z-10 flex-shrink-0">
      {/* Sidebar Top Title Bar */}
      <div className="h-8 px-4 flex items-center justify-between text-[11px] font-bold text-[#606060] tracking-wider uppercase border-b border-white/[0.03]">
        <span>
          {activeTab === 'explorer' && 'EXPLORER'}
          {activeTab === 'search' && 'SEARCH'}
          {activeTab === 'source-control' && 'SOURCE CONTROL'}
          {activeTab === 'run-debug' && 'RUN & DEBUG'}
          {activeTab === 'extensions' && 'EXTENSIONS'}
        </span>

        {/* Sidebar Context Icons */}
        <div className="flex items-center space-x-2 text-[#606060]">
          {activeTab === 'explorer' && (
            <>
              <button title="New File" aria-label="New File" className="hover:text-[#B8B8B8] transition-colors">
                <FilePlus className="w-3.5 h-3.5" />
              </button>
              <button title="New Folder" aria-label="New Folder" className="hover:text-[#B8B8B8] transition-colors">
                <FolderPlus className="w-3.5 h-3.5" />
              </button>
              <button title="Collapse Folders" aria-label="Collapse Folders" className="hover:text-[#B8B8B8] transition-colors">
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </>
          )}
          <button title="More Actions" aria-label="More Actions" className="hover:text-[#B8B8B8] transition-colors">
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Content Area based on Active Tab */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'explorer' && (
          <Explorer
            fileSystem={fileSystem}
            activeFileId={activeFileId}
            onSelectFile={onSelectFile}
            onToggleFolder={onToggleFolder}
          />
        )}

        {activeTab === 'search' && (
          <div className="p-4 space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-[11px] text-[#606060]">Search Files</label>
              <input
                type="text"
                placeholder="Search symbol or text..."
                className="w-full bg-[#141414] border border-white/[0.045] rounded px-2 py-1 text-[#B8B8B8] focus:outline-none focus:border-[#4F8CC9] text-xs"
              />
            </div>
            <div className="text-[#606060] text-[11px]">
              Type a term to search across Yogesh's portfolio codebase...
            </div>
          </div>
        )}

        {activeTab === 'source-control' && (
          <div className="p-4 space-y-3 text-xs">
            <div className="flex items-center justify-between text-[#606060] text-[11px] uppercase font-bold">
              <span>CHANGES</span>
              <span>1</span>
            </div>
            <div className="flex items-center space-x-2 text-xs py-1 px-2 rounded hover:bg-[#252525]">
              <GitCommit className="w-4 h-4 text-[#4F8CC9]" />
              <div className="flex-1 truncate">
                <div className="text-[#B8B8B8]">about.ts</div>
                <div className="text-[10px] text-[#606060]">Modified • Working Tree</div>
              </div>
              <span className="text-amber-400 font-bold text-[10px]">M</span>
            </div>
          </div>
        )}

        {activeTab === 'run-debug' && (
          <div className="p-4 space-y-3 text-xs text-center text-[#606060]">
            <p>Run & Debug configurations ready.</p>
            <button className="w-full bg-[#4F8CC9] hover:bg-[#3b72aa] text-white py-1.5 px-3 rounded font-medium transition-colors">
              Run Portfolio App
            </button>
          </div>
        )}

        {activeTab === 'extensions' && (
          <div className="p-4 space-y-3 text-xs">
            <input
              type="text"
              placeholder="Search Extensions in Marketplace..."
              className="w-full bg-[#141414] border border-white/[0.045] rounded px-2 py-1 text-[#B8B8B8] focus:outline-none focus:border-[#4F8CC9] text-xs"
            />
            <div className="space-y-2 pt-2">
              <div className="p-2 bg-[#141414] rounded border border-white/[0.045]">
                <div className="font-medium text-[#B8B8B8]">Prettier - Code formatter</div>
                <div className="text-[11px] text-[#606060]">v10.4.0 • Enabled</div>
              </div>
              <div className="p-2 bg-[#141414] rounded border border-white/[0.045]">
                <div className="font-medium text-[#B8B8B8]">Tailwind CSS IntelliSense</div>
                <div className="text-[11px] text-[#606060]">v0.9.1 • Enabled</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
