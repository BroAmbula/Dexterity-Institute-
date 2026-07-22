import React, { useState, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { getApiBaseUrl } from './apiConfig';

// Public & Auth Imports
import LandingPage from './LandingPage';
import AboutPage from './AboutPage';
import CoursePage from './CoursePage';
import BlogsPage from './BlogsPage';
import EventsPage from './EventsPage';
import PartnerWithUs from './PartnerWithUs';
import ContactPage from './ContactPage';
import FAQPage from './FAQPage';
import Register from './Register';
import { StudentLogin, AdminLogin, SuperAdminLogin } from './AuthPages';

// Student Imports
import StudentDashboard from './Student/StudentDashboard';
import CourseCatalog from './Student/CourseCatalog';
import PaymentPortal from './Student/PaymentPortal';

// Admin Imports
import AdminDashboard from './Admin/AdminDashboard';

// Super Admin Imports
import SuperAdminDashboard from './SuperAdmin/SuperAdminDashboard';
import AddCourse from './SuperAdmin/AddCourse';
import StaffAccess from './SuperAdmin/StaffAccess';

export default function App() {
  const [currentView, setCurrentView] = useState(() => localStorage.getItem('currentView') || 'home');
  const [userRole, setUserRole] = useState(() => localStorage.getItem('user_role') || null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Fetch student tracks
  useEffect(() => {
    if (userRole === 'student') {
      const fetchTracks = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`${getApiBaseUrl()}/api/student/my-tracks`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await response.json();
          if (response.ok) setEnrolledCourses(data);
        } catch (err) { console.error("Error fetching tracks", err); }
      };
      fetchTracks();
    }
  }, [userRole]);

  // Navigation Links based on authentication status & role
  const publicLinks = [
    { label: 'Home', id: 'home' }, { label: 'About Us', id: 'about' },
    { label: 'Courses', id: 'courses' }, { label: 'Publications', id: 'blogs' },
    { label: 'Events', id: 'events' }, { label: 'Partner', id: 'partner' },
    { label: 'Contact', id: 'contact' }, { label: 'FAQs', id: 'faq' }
  ];

  const studentLinks = [
    { label: 'Dashboard', id: 'student-dashboard' },
    { label: 'Course Catalog', id: 'student-courses' },
    { label: 'Payment Portal', id: 'student-payments' }
  ];

  const superAdminLinks = [
    { label: 'Command Center', id: 'super-admin-dashboard' },
    { label: 'Add Course', id: 'add-course' },
    { label: 'Staff Access', id: 'staff-access' }
  ];

  const adminLinks = [
    { label: 'Dashboard', id: 'admin-dashboard' }
  ];

  const getActiveLinks = () => {
    if (!userRole) return publicLinks;
    if (userRole === 'student') return studentLinks;
    if (userRole === 'admin') return adminLinks;
    if (userRole === 'super-admin') return superAdminLinks;
    return publicLinks;
  };

  // Smart Logo / Home click redirects to dashboard if logged in
  const handleHomeClick = () => {
    if (!userRole) {
      handleNavigation('home');
    } else if (userRole === 'student') {
      handleNavigation('student-dashboard');
    } else if (userRole === 'admin') {
      handleNavigation('admin-dashboard');
    } else if (userRole === 'super-admin') {
      handleNavigation('super-admin-dashboard');
    }
  };

  const handleNavigation = (viewId, data = null) => {
    if (data) setSelectedCourse(data);

    // Define protected routes
    const protectedRoutes = [
      { id: 'student-dashboard', role: 'student' },
      { id: 'student-courses', role: 'student' },
      { id: 'student-payments', role: 'student' },
      { id: 'admin-dashboard', role: 'admin' },
      { id: 'admin-enrollments', role: 'admin' },
      { id: 'application-review', role: 'admin' },
      { id: 'super-admin-dashboard', role: 'super-admin' },
      { id: 'add-course', role: 'super-admin' },
      { id: 'staff-access', role: 'super-admin' }
    ];

    const restrictedView = protectedRoutes.find(route => route.id === viewId);

    // Enforce role check silently without triggering annoying alerts
    if (restrictedView && userRole !== restrictedView.role) {
      return; 
    }

    localStorage.setItem('currentView', viewId);
    setCurrentView(viewId);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (role) => {
    setUserRole(role);
    localStorage.setItem('user_role', role); 
    if (role === 'student') handleNavigation('student-dashboard');
    else if (role === 'admin') handleNavigation('admin-dashboard');
    else if (role === 'super-admin') handleNavigation('super-admin-dashboard');
    else handleNavigation('home');
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserRole(null);
    handleNavigation('home');
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
      case 'register': return <Register onNavigate={handleNavigation} onRegisterSuccess={() => handleNavigation('student-login')} />;
      
      // Student Views
      case 'student-dashboard': return <StudentDashboard onNavigate={handleNavigation} enrolledCourses={enrolledCourses} />;
      case 'student-courses': return <CourseCatalog onNavigate={handleNavigation} />;
      case 'student-payments': return <PaymentPortal onNavigate={handleNavigation} course={selectedCourse} />;
      case 'student-login': return <StudentLogin onNavigate={handleNavigation} onLogin={handleLogin} />;
      
      // Admin Views
      case 'admin-dashboard': return <AdminDashboard onNavigate={handleNavigation} />;
      
      // Super Admin Views
      case 'super-admin-dashboard': return <SuperAdminDashboard onNavigate={handleNavigation} />;
      case 'super-admin-login': return <SuperAdminLogin onNavigate={handleNavigation} onLogin={handleLogin} />;
      case 'add-course': return <AddCourse onNavigate={handleNavigation} />;
      case 'staff-access': return <StaffAccess onNavigate={handleNavigation} />;

      default: return <LandingPage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-slate-800 antialiased">
      <header className="bg-white border-b sticky top-0 z-50 px-6 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleHomeClick}>
          <img src="/logo.png" alt="Dexterity Initiative" className="h-8 w-auto" />
          <span className="font-black text-lg text-blue-900 tracking-tight">
            {userRole ? `${userRole.replace('-', ' ').toUpperCase()} PORTAL` : 'Dexterity Initiative'}
          </span>
        </div>

        {!userRole && (
          <div className="hidden lg:flex relative max-w-xs w-full mx-6">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 rounded-full border border-slate-200 bg-slate-50 text-xs focus:ring-2 focus:ring-blue-500 outline-none transition" />
          </div>
        )}

        <div className="hidden xl:flex items-center space-x-6 text-xs font-bold uppercase tracking-wider">
          {getActiveLinks().map(l => (
            <button key={l.id} onClick={() => handleNavigation(l.id)} className={`transition ${currentView === l.id ? 'text-red-600 border-b-2 border-red-600 pb-1' : 'text-slate-600 hover:text-blue-900'}`}>
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {!userRole && (
            <>
              <button 
                onClick={() => handleNavigation('super-admin-login')} 
                className="text-xs text-slate-400 hover:text-blue-600 font-bold uppercase mr-2"
              >
                Admin Login
              </button>

              <button onClick={() => handleNavigation('partner')} className="bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-700 transition shadow-xs">
                Partner With Us
              </button>

              <button onClick={() => handleNavigation('student-login')} className="text-slate-700 border border-slate-300 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition">
                Portal Logins
              </button>
            </>
          )}

          {userRole && (
            <button onClick={handleLogout} className="text-red-600 border border-red-300 px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-50 transition">
              Logout
            </button>
          )}
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="xl:hidden text-slate-700">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {mobileOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b shadow-xl p-6 flex flex-col gap-3 xl:hidden">
            {getActiveLinks().map(l => (
              <button key={l.id} onClick={() => handleNavigation(l.id)} className="text-left py-2 text-sm font-bold border-b border-slate-50 text-slate-800">
                {l.label}
              </button>
            ))}
            {userRole && (
              <button onClick={handleLogout} className="text-left py-2 text-sm font-bold text-red-600 mt-2">
                Logout
              </button>
            )}
          </div>
        )}
      </header>

      <main className="flex-grow">{renderActiveView()}</main>

      <footer className="bg-[#0a0b14] text-slate-400 py-16 px-6 sm:px-8 border-t border-slate-950">
        <div className="max-w-7xl mx-auto text-center text-xs">
          <p>© 2026 Dexterity Initiative. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}