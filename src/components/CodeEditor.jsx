import React, { useState, useEffect, lazy, Suspense } from 'react';
import { EditorTabs } from './EditorTabs';
import { ChevronRight, Code2, Loader2 } from 'lucide-react';
import { getFileIcon } from './Explorer';
import { createTypingController } from '../animations/typingEffect';

// Lazy Load PdfViewer module for bundle optimization
const PdfViewer = lazy(() => import('./PdfViewer').then(module => ({ default: module.PdfViewer })));

function SyntaxLine({ line, language }) {
  if (!line && line !== '') return <br />;

  if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*') || line.trim().startsWith('*/')) {
    return <span className="text-[#6B7280] italic">{line}</span>;
  }

  if (language === 'markdown') {
    if (line.startsWith('# ')) {
      return <span className="text-[#38BDF8] font-bold text-base">{line}</span>;
    }
    if (line.startsWith('## ')) {
      return <span className="text-[#FFC700] font-bold text-sm">{line}</span>;
    }
    if (line.startsWith('### ')) {
      return <span className="text-[#FFC700] font-semibold text-sm">{line}</span>;
    }
    if (line.startsWith('> ')) {
      return <span className="text-[#84CC16] italic">{line}</span>;
    }
    if (line.startsWith('- ') || line.startsWith('* ')) {
      return <span className="text-[#E2E8F0]">{line}</span>;
    }
  }

  const tokens = [];
  // Tokenizer regex matching strings, keywords, property keys, numbers, functions, and punctuation
  const regex = /(".*?"|'.*?'|`.*?`|\/\/[^\n]*|\b(?:import|export|default|function|const|let|var|return|from|if|else|switch|case|break|try|catch|async|await|class|extends|new|true|false|null|undefined|interface|type|string|number|boolean|any|void)\b|\b\d+\b|\b[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*:)|[a-zA-Z_$][a-zA-Z0-9_$]*(?=\()|<[^>]+>|[\{\}\(\)\[\];,:\.=\*]|=>)/g;

  let lastIndex = 0;
  let match;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        text: line.substring(lastIndex, match.index),
        type: 'variable'
      });
    }

    const value = match[0];
    let type = 'variable';

    if (value.startsWith('"') || value.startsWith("'") || value.startsWith('`')) {
      type = 'string';
    } else if (/^(import|export|default|function|const|let|var|return|from|if|else|switch|case|break|try|catch|async|await|class|extends|new|true|false|null|undefined|interface|type)$/.test(value)) {
      type = 'keyword';
    } else if (/^(string|number|boolean|any|void)$/.test(value)) {
      type = 'type';
    } else if (/^\d+$/.test(value)) {
      type = 'number';
    } else if (value.startsWith('<') && value.endsWith('>')) {
      type = 'tag';
    } else if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(value) && line[match.index + value.length] === '(') {
      type = 'function';
    } else if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(value) && /^\s*:/.test(line.substring(match.index + value.length))) {
      type = 'property';
    } else if (/^[\{\}\(\)\[\];,:\.=\*]|=>$/.test(value)) {
      type = 'punctuation';
    }

    tokens.push({ text: value, type });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < line.length) {
    tokens.push({
      text: line.substring(lastIndex),
      type: 'variable'
    });
  }

  return (
    <span>
      {tokens.map((token, index) => {
        switch (token.type) {
          case 'keyword':
            return <span key={index} className="text-[#38BDF8] font-medium">{token.text}</span>; // Cyan Blue
          case 'type':
            return <span key={index} className="text-[#38BDF8] font-medium">{token.text}</span>; // Cyan Blue
          case 'string':
            return <span key={index} className="text-[#84CC16]">{token.text}</span>; // Lime Green
          case 'function':
            return <span key={index} className="text-[#FFC700]">{token.text}</span>; // Golden Yellow
          case 'property':
            return <span key={index} className="text-[#F43F5E]">{token.text}</span>; // Crimson Pink Red
          case 'number':
            return <span key={index} className="text-[#F59E0B]">{token.text}</span>; // Amber Yellow
          case 'punctuation':
            return <span key={index} className="text-[#CCCCCC]">{token.text}</span>; // Light Off-White
          case 'tag':
            return <span key={index} className="text-[#38BDF8]">{token.text}</span>;
          default:
            return <span key={index} className="text-[#E2E8F0]">{token.text}</span>; // Light Off-White Variable
        }
      })}
    </span>
  );
}

export function CodeEditor({ 
  openTabs, 
  activeFile, 
  activeFileId, 
  onSelectTab, 
  onCloseTab,
  cursorLine,
  setCursorLine
}) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTypingActive, setIsTypingActive] = useState(false);

  const isPdf = activeFile && (activeFile.language === 'pdf' || activeFile.name.endsWith('.pdf'));
  const pathParts = activeFile ? activeFile.path.split('/') : [];

  useEffect(() => {
    if (!activeFile || isPdf) {
      setDisplayedContent(activeFile?.content || '');
      setIsTypingActive(false);
      return;
    }

    setIsTypingActive(true);
    const controller = createTypingController(
      activeFile.content || '',
      activeFile.id,
      (partialText) => setDisplayedContent(partialText),
      () => setIsTypingActive(false)
    );

    return () => {
      controller.cancel();
    };
  }, [activeFile?.id, activeFile?.content, isPdf]);

  const lines = displayedContent ? displayedContent.split('\n') : [];
  const currentTypedLineCount = lines.length;

  return (
    <div className="flex-1 bg-[#141414] text-[#E2E8F0] flex flex-col h-full overflow-hidden select-text transition-opacity duration-150">
      <EditorTabs
        openTabs={openTabs}
        activeFileId={activeFileId}
        onSelectTab={onSelectTab}
        onCloseTab={onCloseTab}
      />

      {activeFile ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Breadcrumbs Navigation Bar */}
          <div className="h-7 bg-[#141414] border-b border-white/[0.045] px-4 flex items-center space-x-1.5 text-[13px] text-[#808080] select-none flex-shrink-0">
            {pathParts.map((part, index) => (
              <React.Fragment key={index}>
                {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#555555]" />}
                <span className={`flex items-center space-x-1 ${index === pathParts.length - 1 ? 'text-[#E2E8F0] font-medium' : 'hover:text-[#cccccc]'}`}>
                  {index === pathParts.length - 1 && getFileIcon(activeFile.icon, activeFile.name)}
                  <span>{part}</span>
                </span>
              </React.Fragment>
            ))}
          </div>

          {isPdf ? (
            <Suspense fallback={
              <div className="flex-1 flex items-center justify-center text-[#6B7280] space-x-2 font-mono text-xs">
                <Loader2 className="w-5 h-5 animate-spin text-[#38BDF8]" />
                <span>Loading Resume Document Viewer...</span>
              </div>
            }>
              <PdfViewer file={activeFile} />
            </Suspense>
          ) : (
            /* Code Canvas with exact resolution syntax colors */
            <div className="flex-1 overflow-auto font-mono text-[14px] leading-6 py-2.5">
              <div className="min-w-full inline-block">
                {lines.map((lineContent, idx) => {
                  const lineNumber = idx + 1;
                  const isLastLine = lineNumber === currentTypedLineCount;
                  const isActiveLine = lineNumber === cursorLine || (isTypingActive && isLastLine);

                  return (
                    <div
                      key={idx}
                      onClick={() => setCursorLine(lineNumber)}
                      className={`flex items-center group cursor-text transition-colors duration-100 ${
                        isActiveLine ? 'bg-[#1c1c1c]' : 'hover:bg-[#1c1c1c]/40'
                      }`}
                    >
                      <div
                        className={`w-14 px-3 text-right select-none flex-shrink-0 font-mono text-[12.5px] ${
                          isActiveLine ? 'text-[#ffffff] font-bold' : 'text-[#656565]'
                        }`}
                      >
                        {lineNumber}
                      </div>

                      <div className="flex-1 pr-6 pl-2.5 whitespace-pre font-mono relative text-[#E2E8F0]">
                        <SyntaxLine line={lineContent} language={activeFile.language} />

                        {isActiveLine && (
                          <span className="inline-block w-[2px] h-[16px] bg-white align-middle -ml-[1px] animate-cursor-blink" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-[#6B7280] select-none space-y-4">
          <Code2 className="w-16 h-16 text-[#2D2D2D]" />
          <div className="text-center space-y-1">
            <h2 className="text-xl font-medium text-[#E2E8F0]">YOGESH Repository Workspace</h2>
            <p className="text-sm text-[#6B7280]">Select a file from the explorer to start exploring.</p>
          </div>
          <div className="flex flex-col space-y-2 text-xs text-[#6B7280] pt-4">
            <div className="flex items-center justify-between w-64">
              <span>Show All Commands</span>
              <kbd className="px-1.5 py-0.5 bg-[#252525] rounded text-[10px] text-[#E2E8F0]">Ctrl+Shift+P</kbd>
            </div>
            <div className="flex items-center justify-between w-64">
              <span>Go to File</span>
              <kbd className="px-1.5 py-0.5 bg-[#252525] rounded text-[10px] text-[#E2E8F0]">Ctrl+P</kbd>
            </div>
            <div className="flex items-center justify-between w-64">
              <span>Toggle Terminal</span>
              <kbd className="px-1.5 py-0.5 bg-[#252525] rounded text-[10px] text-[#E2E8F0]">Ctrl+`</kbd>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
