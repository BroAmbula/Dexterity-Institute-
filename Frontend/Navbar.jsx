import React from 'react';
import { Search } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
      {/* Logo Area */}
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Dexterity Initiative" className="h-8 w-auto" />
        <span className="text-xl font-bold text-blue-900">Dexterity Initiative</span>
      </div>

      {/* Persistent Search Bar */}
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
      </div>
    </nav>
  );
}