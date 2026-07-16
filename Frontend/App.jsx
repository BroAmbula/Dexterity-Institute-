import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

// Decoupled Front-end Sub-page imports
import LandingPage from './LandingPage';
import AboutPage from './AboutPage';
import CoursePage from './CoursePage';
import BlogsPage from './BlogsPage';
import EventsPage from './EventsPage';
import PartnerWithUs from './PartnerWithUs';
import ContactPage from './ContactPage';
import FAQPage from './FAQPage';
import { StudentLogin, AdminLogin, SuperAdminLogin } from './AuthPages';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: 'Home', id: 'home' },
    { label: 'About Us', id: 'about' },
    { label: 'Courses', id: 'courses' },
    { label: 'Publications', id: 'blogs' },
    { label: 'Events', id: 'events' },
    { label: 'Partner', id: 'partner' },
    { label: 'Contact', id: 'contact' },
    { label: 'FAQs', id: 'faq' }
  ];

  const handleNavigation = (viewId) => {
    setCurrentView(viewId);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveView = () => {
    switch (currentView) {
      case 'home': return <LandingPage onNavigate={handleNavigation} />;
      case 'about': return <AboutPage onNavigate={handleNavigation} />;
      case 'courses': return <CoursePage onNavigate={handleNavigation} />;
      case 'blogs': return <BlogsPage onNavigate={handleNavigation} />;
      case 'events': return <EventsPage onNavigate={handleNavigation} />;
      case 'partner': return <PartnerWithUs onNavigate={handleNavigation} />;
      case 'contact': return <ContactPage onNavigate={handleNavigation} />;
      case 'faq': return <FAQPage onNavigate={handleNavigation} />;
      case 'student-login': return <StudentLogin onNavigate={handleNavigation} />;
      case 'admin-login': return <AdminLogin onNavigate={handleNavigation} />;
      case 'super-admin-login': return <SuperAdminLogin onNavigate={handleNavigation} />;
      default: return <LandingPage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-slate-800 antialiased">
      
      {/* Dynamic Navigation Header */}
      <header className="bg-white border-b sticky top-0 z-50 px-6 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigation('home')}>
          <div className="w-8 h-8 bg-blue-900 rounded-xl flex items-center justify-center text-white font-black text-sm">D</div>
          <span className="font-black text-lg text-blue-900 tracking-tight">Dexterity Initiative</span>
        </div>

        <div className="hidden xl:flex items-center space-x-6 text-xs font-bold uppercase tracking-wider">
          {links.map(l => (
            <button key={l.id} onClick={() => handleNavigation(l.id)} className={`transition ${currentView === l.id ? 'text-red-600 border-b-2 border-red-600 pb-1' : 'text-slate-600 hover:text-blue-900'}`}>
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={() => handleNavigation('partner')} className="bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-700 transition shadow-xs">
            Partner With Us
          </button>
          <button onClick={() => handleNavigation('student-login')} className="text-slate-700 border border-slate-300 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition">
            Portal Logins
          </button>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="xl:hidden text-slate-700">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {mobileOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b shadow-xl p-6 flex flex-col gap-3 xl:hidden">
            {links.map(l => (
              <button key={l.id} onClick={() => handleNavigation(l.id)} className="text-left py-2 text-sm font-bold border-b border-slate-50 text-slate-800">
                {l.label}
              </button>
            ))}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <button onClick={() => handleNavigation('partner')} className="bg-red-600 text-white py-2.5 rounded-lg text-xs font-bold text-center">Partner</button>
              <button onClick={() => handleNavigation('student-login')} className="border text-slate-700 py-2.5 rounded-lg text-xs font-bold text-center">Portals</button>
            </div>
          </div>
        )}
      </header>

      {/* Main Container Render Slot */}
      <main className="flex-grow">
        {renderActiveView()}
      </main>

      {/* Core Footer Segment with Mandatory Statement */}
      <footer className="bg-[#0a0b14] text-slate-400 py-16 px-6 sm:px-8 border-t border-slate-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-sm">
          <div className="space-y-4">
            <h3 className="text-white font-extrabold text-base">Dexterity Initiative</h3>
            <div className="text-xs space-y-1.5 font-medium">
              <p className="flex items-center gap-2"><Phone size={14} className="text-red-500" /> +254 726 503 062</p>
              <p className="flex items-center gap-2"><Mail size={14} className="text-red-500" /> info@dexterityinitiative.org</p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Navigation Links</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => handleNavigation('about')} className="hover:text-white transition">Faculty Team</button></li>
              <li><button onClick={() => handleNavigation('courses')} className="hover:text-white transition">Course Catalogs</button></li>
              <li><button onClick={() => handleNavigation('faq')} className="hover:text-white transition">Help Desk & FAQs</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Secure Entry Portals</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => handleNavigation('student-login')} className="hover:text-white transition">Student Portal</button></li>
              <li><button onClick={() => handleNavigation('admin-login')} className="hover:text-white transition">Staff Management Console</button></li>
              <li><button onClick={() => handleNavigation('super-admin-login')} className="hover:text-white transition">Super Override Admin</button></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Institution Trimester</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Coordinate localized training models or process curriculum onboarding with our directors.</p>
            <button onClick={() => handleNavigation('partner')} className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 rounded-lg transition shadow-md">Partner Action Form</button>
          </div>
        </div>

        {/* MANDATORY LEGAL DISCLOSURE FOOTER STATEMENT */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900/60 space-y-4">
          <p className="text-xs text-slate-500 font-medium leading-relaxed text-justify">
            Dexterity Initiative is the public-facing name of Dexterity Lifeskills Initiative CLG, a non-profit company registered in Kenya. Dexterity Lifeskills Institute is its training and commercial arm, responsible for developing, publishing, and managing the intellectual property used in its training programmes, publications, and educational resources.
          </p>
          <div className="text-[10px] text-slate-600 flex flex-col sm:flex-row justify-between items-center pt-2">
            <p>© 2026 Dexterity Initiative. All operational rights reserved.</p>
            <p className="tracking-wide">System Deployment Status: Production Frontend Complete</p>
          </div>
        </div>
      </footer>

    </div>
  );
}