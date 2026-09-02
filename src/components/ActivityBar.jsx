import React from 'react';
import { Files, Search, GitBranch, Play, Blocks, Settings, User } from 'lucide-react';

export function ActivityBar({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) {
  const topNavItems = [
    { id: 'explorer', icon: Files, title: 'Explorer (Ctrl+Shift+E)' },
    { id: 'search', icon: Search, title: 'Search (Ctrl+Shift+F)' },
    { id: 'source-control', icon: GitBranch, title: 'Source Control (Ctrl+Shift+G)', badge: '1' },
    { id: 'run-debug', icon: Play, title: 'Run and Debug (Ctrl+Shift+D)' },
    { id: 'extensions', icon: Blocks, title: 'Extensions (Ctrl+Shift+X)' },
  ];

  const handleIconClick = (id) => {
    if (activeTab === id) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setActiveTab(id);
      setIsSidebarOpen(true);
    }
  };

  return (
    <aside className="w-12 bg-[#0C0C0C] flex flex-col justify-between items-center py-2 z-20 flex-shrink-0 select-none border-r border-white/[0.045]">
      {/* Top Icons */}
      <div className="flex flex-col items-center w-full space-y-1">
        {topNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id && isSidebarOpen;

          return (
            <button
              key={item.id}
              onClick={() => handleIconClick(item.id)}
              title={item.title}
              aria-label={item.title}
              className={`relative w-full h-12 flex items-center justify-center transition-colors group focus:outline-none ${
                isActive ? 'text-[#A0A0A0]' : 'text-[#666666] hover:text-[#A0A0A0]'
              }`}
            >
              {/* Active Indicator Bar on left */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#A0A0A0]" />
              )}
              
              <Icon className={`w-6 h-6 transition-transform group-hover:scale-105 ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`} />

              {/* Badge indicator if exists */}
              {item.badge && (
                <span className="absolute top-2 right-2 bg-[#4F8CC9] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full leading-tight min-w-[16px] text-center">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Icons */}
      <div className="flex flex-col items-center w-full space-y-1">
        <button
          title="Account"
          aria-label="User Account"
          className="w-full h-12 flex items-center justify-center text-[#666666] hover:text-[#A0A0A0] transition-colors focus:outline-none"
        >
          <User className="w-5 h-5 opacity-70 hover:opacity-100" />
        </button>
        <button
          title="Manage & Settings"
          aria-label="Settings"
          className="w-full h-12 flex items-center justify-center text-[#666666] hover:text-[#A0A0A0] transition-colors focus:outline-none"
        >
          <Settings className="w-5 h-5 opacity-70 hover:opacity-100" />
        </button>
      </div>
    </aside>
  );
}
