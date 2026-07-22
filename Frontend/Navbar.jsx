import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
        {/* Logo Area */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Dexterity Initiative" className="h-8 w-auto" />
          <span className="text-xl font-bold text-blue-900">Dexterity Initiative</span>
        </div>

        {/* Persistent Search Bar (Desktop) */}
        <div className="hidden md:flex relative w-full max-w-sm mx-4">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-700 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" onClick={() => setIsOpen(false)}>
          <div 
            className="absolute right-0 top-0 bottom-0 w-3/4 max-w-sm bg-white shadow-xl p-6 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-bold text-blue-900">Menu</span>
                <button onClick={() => setIsOpen(false)} className="text-slate-500">
                  <X size={24} />
                </button>
              </div>

              {/* Search Bar in Mobile Drawer */}
              <div className="relative w-full mb-6">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-4 text-slate-700 font-medium">
                <a href="/" onClick={() => setIsOpen(false)} className="hover:text-blue-900">Home</a>
                <a href="/about" onClick={() => setIsOpen(false)} className="hover:text-blue-900">About Us</a>
                <a href="/courses" onClick={() => setIsOpen(false)} className="hover:text-blue-900">Courses</a>
                <a href="/publications" onClick={() => setIsOpen(false)} className="hover:text-blue-900">Publications</a>
                <a href="/events" onClick={() => setIsOpen(false)} className="hover:text-blue-900">Events</a>
                <a href="/partner" onClick={() => setIsOpen(false)} className="hover:text-blue-900">Partner</a>
                <a href="/contact" onClick={() => setIsOpen(false)} className="hover:text-blue-900">Contact</a>
                <a href="/faqs" onClick={() => setIsOpen(false)} className="hover:text-blue-900">FAQs</a>
              </div>
            </div>

            {/* Login Buttons Added to Mobile Drawer */}
            <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col gap-3">
              <a 
                href="/login" 
                className="w-full text-center py-2 px-4 rounded-lg bg-gray-100 text-gray-800 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Portal Logins
              </a>
              <a 
                href="/admin-login" 
                className="w-full text-center py-2 px-4 rounded-lg bg-red-800 text-white font-medium"
                onClick={() => setIsOpen(false)}
              >
                Admin Login
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}