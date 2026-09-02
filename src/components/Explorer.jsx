import React from 'react';
import { 
  ChevronRight, 
  Folder, 
  FolderOpen, 
  FileCode, 
  FileJson, 
  FileText, 
  File,
  Code
} from 'lucide-react';

export function getFileIcon(iconType, name) {
  if (name.endsWith('.ts')) {
    return <FileCode className="w-[18px] h-[18px] text-[#4F8CC9] flex-shrink-0" />;
  }
  if (name.endsWith('.pdf')) {
    return <File className="w-[18px] h-[18px] text-[#f43f5e] flex-shrink-0" />;
  }
  if (name.endsWith('.jsx') || name.endsWith('.tsx')) {
    return <Code className="w-[18px] h-[18px] text-[#38bdf8] flex-shrink-0" />;
  }
  if (name.endsWith('.js')) {
    return <FileCode className="w-[18px] h-[18px] text-[#eab308] flex-shrink-0" />;
  }
  if (name.endsWith('.css')) {
    return <FileCode className="w-[18px] h-[18px] text-[#38bdf8] flex-shrink-0" />;
  }
  if (name.endsWith('.json')) {
    return <FileJson className="w-[18px] h-[18px] text-[#eab308] flex-shrink-0" />;
  }
  if (name.endsWith('.md')) {
    return <FileText className="w-[18px] h-[18px] text-[#4F8CC9] flex-shrink-0" />;
  }
  return <FileText className="w-[18px] h-[18px] text-[#9ca3af] flex-shrink-0" />;
}

function TreeItem({ node, activeFileId, onSelectFile, onToggleFolder, level = 0 }) {
  const isFolder = node.type === 'folder';
  const isActive = activeFileId === node.id;
  const paddingLeft = `${level * 16 + 12}px`;

  return (
    <div>
      <div
        onClick={() => {
          if (isFolder) {
            onToggleFolder(node.id);
          } else {
            onSelectFile(node);
          }
        }}
        style={{ paddingLeft }}
        className={`relative flex items-center space-x-2 py-1.5 text-[13.5px] cursor-pointer hover:bg-[#1c1c1c] select-none transition-colors duration-150 group ${
          isActive 
            ? 'bg-[#252525] text-[#ffffff] font-medium' 
            : isFolder 
              ? 'text-[#cccccc] font-medium' 
              : 'text-[#cccccc]'
        }`}
      >
        {/* Left active indicator */}
        {isActive && !isFolder && (
          <div className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-[#007acc] transition-all duration-150" />
        )}

        {/* Expand/Collapse Chevron */}
        {isFolder ? (
          <span className={`text-[#858585] transition-transform duration-200 ${node.isOpen ? 'rotate-90' : ''}`}>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        ) : (
          <span className="w-3.5" />
        )}

        {/* Folder / File Icon */}
        {isFolder ? (
          node.isOpen ? (
            <FolderOpen className="w-[18px] h-[18px] text-[#eab308] flex-shrink-0 transition-transform group-hover:scale-105" />
          ) : (
            <Folder className="w-[18px] h-[18px] text-[#eab308] flex-shrink-0 transition-transform group-hover:scale-105" />
          )
        ) : (
          <span className="transition-transform group-hover:scale-105">
            {getFileIcon(node.icon, node.name)}
          </span>
        )}

        <span className="truncate flex-1 group-hover:text-[#ffffff] transition-colors">{node.name}</span>
      </div>

      {/* Render children if folder is open */}
      {isFolder && node.isOpen && node.children && (
        <div className="transition-all duration-200">
          {node.children.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              activeFileId={activeFileId}
              onSelectFile={onSelectFile}
              onToggleFolder={onToggleFolder}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Explorer({ fileSystem, activeFileId, onSelectFile, onToggleFolder }) {
  return (
    <div className="flex-1 overflow-y-auto py-1.5 bg-[#101010]">
      {fileSystem.map((node) => (
        <TreeItem
          key={node.id}
          node={node}
          activeFileId={activeFileId}
          onSelectFile={onSelectFile}
          onToggleFolder={onToggleFolder}
          level={0}
        />
      ))}
    </div>
  );
}
