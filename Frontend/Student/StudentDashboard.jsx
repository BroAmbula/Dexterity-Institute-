import React from 'react';
import { CheckCircle, ChevronRight } from 'lucide-react';

export default function StudentDashboard({ onNavigate, enrolledCourses = [] }) {
  // Filter courses by status
  const activeCourses = enrolledCourses.filter(c => c.status !== 'COMPLETED');
  const completedCourses = enrolledCourses.filter(c => c.status === 'COMPLETED');

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-950">Welcome back!</h1>
          <p className="text-gray-500">Track your application files and program modules.</p>
        </div>
        <button 
          onClick={() => onNavigate('student-courses')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-2"
        >
          Browse Course Catalog <ChevronRight size={16} />
        </button>
      </div>

      {/* Empty State */}
      {enrolledCourses.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-gray-300">
          <h2 className="text-lg font-bold text-gray-900 mb-2">My Academic Track</h2>
          <p className="text-gray-500 mb-6">You are not currently enrolled in any programs.</p>
          <button 
            onClick={() => onNavigate('student-courses')}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            Apply for your first class now
          </button>
        </div>
      )}

      {/* Active Courses */}
      {activeCourses.length > 0 && (
        <section>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Active Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeCourses.map((course) => (
              <div key={course.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between mb-4">
                  <h3 className="font-black text-gray-900">{course.course_title}</h3>
                  <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-md font-bold uppercase">
                    In Progress
                  </span>
                </div>
                
                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${course.progress || 0}%` }} 
                  />
                </div>
                <p className="text-xs font-bold text-gray-500">{course.progress || 0}% Complete</p>
                
                <button 
                  onClick={() => onNavigate('student-payments', course)}
                  className="mt-4 w-full bg-gray-900 text-white font-bold py-2 rounded-lg text-sm hover:bg-black transition"
                >
                  Continue Learning
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Cleared Courses */}
      {completedCourses.length > 0 && (
        <section>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Cleared Courses</h2>
          <div className="space-y-3">
            {completedCourses.map((course) => (
              <div key={course.id} className="flex items-center gap-4 bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                <div className="bg-emerald-100 p-2 rounded-full text-emerald-600">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{course.course_title}</h3>
                  <p className="text-xs text-emerald-700 font-medium">Completed Successfully</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}