import React from 'react';
import { Layers } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-zinc-200 z-50 h-16 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white shadow-lg shadow-zinc-900/20">
          <Layers className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-base font-bold text-zinc-900 tracking-tight leading-none">ProPRD</h1>
          <p className="text-[10px] text-zinc-500 font-medium tracking-wide uppercase mt-0.5">Generator</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="px-3 py-1 bg-zinc-50 rounded-full border border-zinc-200 flex items-center shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
            <span className="text-xs font-semibold text-zinc-600">Gemini 3.0 Pro</span>
        </div>
      </div>
    </header>
  );
};

export default Header;