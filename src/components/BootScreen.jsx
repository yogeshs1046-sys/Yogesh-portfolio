import React, { useState, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { isReducedMotion } from '../animations/animationConfig';

export function BootScreen({ onBootComplete }) {
  const [bootLines, setBootLines] = useState([]);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (isReducedMotion()) {
      onBootComplete();
      return;
    }

    const lines = [
      'Initializing YOGESH-IDE v3.0.0...',
      'Loading portfolio content............... ✓',
      'Loading virtual filesystem.............. ✓',
      'Loading projects & documentation........ ✓',
      'Loading developer skills................ ✓',
      'System ready.'
    ];

    let current = 0;
    const interval = setInterval(() => {
      current++;
      setBootLines(lines.slice(0, current));

      if (current >= lines.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            onBootComplete();
          }, 300);
        }, 500);
      }
    }, 280);

    return () => clearInterval(interval);
  }, [onBootComplete]);

  return (
    <div className={`fixed inset-0 bg-[#181818] text-white flex flex-col items-center justify-center z-50 font-mono select-none transition-opacity duration-300 ${
      isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      <div className="w-full max-w-xl bg-[#1e1e1e] border border-vscode-border rounded-lg shadow-2xl p-6 space-y-6">
        {/* Boot Screen Header */}
        <div className="flex items-center space-x-3 border-b border-vscode-border pb-4">
          <TerminalIcon className="w-5 h-5 text-vscode-accent" />
          <span className="font-bold text-sm tracking-wider text-[#cccccc] uppercase">
            YOGESH DEVELOPMENT ENVIRONMENT
          </span>
        </div>

        {/* Boot Output Sequence */}
        <div className="space-y-2 text-xs text-[#cccccc] min-h-[160px]">
          {bootLines.map((line, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <span className={line.includes('✓') ? 'text-emerald-400 font-bold' : line.includes('System ready') ? 'text-vscode-accent font-bold' : 'text-[#cccccc]'}>
                {line}
              </span>
            </div>
          ))}
          {bootLines.length < 6 && (
            <div className="flex items-center space-x-2">
              <span className="inline-block w-2 h-4 bg-vscode-accent animate-pulse" />
            </div>
          )}
        </div>

        {/* Boot Prompt */}
        {bootLines.length >= 6 && (
          <div className="pt-2 border-t border-vscode-border/50 text-xs text-vscode-accent font-semibold flex items-center space-x-2">
            <span>yogesh@portfolio:~$</span>
            <span className="inline-block w-2 h-4 bg-white animate-cursor-blink" />
          </div>
        )}
      </div>
    </div>
  );
}
