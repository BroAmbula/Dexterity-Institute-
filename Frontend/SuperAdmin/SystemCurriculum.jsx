import React, { useState } from 'react';

export default function SystemCurriculum() {
  const [exchangeRate, setExchangeRate] = useState(130.00);
  const [isSaving, setIsSaving] = useState(false);
  
  const [courses, setCourses] = useState([
    { id: '1', title: 'CareerCraft Primary', school: 'School of CareerCraft', fee_usd: 40.00, is_active: true },
    { id: '2', title: 'Startup Launch', school: "Eagle's Nest Incubation Hub", fee_usd: 150.00, is_active: true },
    { id: '3', title: 'Foundations of Personal Development', school: 'School of Personal Development', fee_usd: 30.00, is_active: false },
    { id: '4', title: 'Emerging Leaders', school: 'School of Leadership', fee_usd: 50.00, is_active: true }
  ]);

  const handleExchangeRateUpdate = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    // Mimic backend execution:
    setTimeout(() => {
      alert(`Success! Global exchange rate set to KSh ${exchangeRate}`);
      setIsSaving(false);
    }, 1000);
  };

  const toggleCourseStatus = (id) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, is_active: !course.is_active } : course
    ));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Global Exchange Rate Modifier */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-bold text-gray-950 mb-2">Global Currency Switch</h2>
          <p className="text-sm text-gray-400 mb-6">Updates all KES conversions dynamically on checkout.</p>
          
          <form onSubmit={handleExchangeRateUpdate} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">1 USD to KES</label>
              <div className="flex mt-2 rounded-xl shadow-sm">
                <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-gray-500 font-bold">KSh</span>
                <input 
                  type="number" 
                  value={exchangeRate}
                  onChange={(e) => setExchangeRate(parseFloat(e.target.value))}
                  className="w-full border border-gray-200 rounded-r-xl p-3 focus:outline-blue-600 font-semibold"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-xl transition text-sm"
              disabled={isSaving}
            >
              {isSaving ? 'Recalculating...' : 'Apply Rate Globally'}
            </button>
          </form>
        </div>

        {/* Right: Master Course List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-950 mb-6">Academic Offerings & States</h2>
          
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="flex justify-between items-center border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div>
                  <h4 className="font-bold text-gray-900">{course.title}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">{course.school}</p>
                  <p className="text-sm font-bold text-gray-700 mt-1">${course.fee_usd} USD <span className="text-xs text-gray-400 font-normal">(~ KSh {(course.fee_usd * exchangeRate).toLocaleString()})</span></p>
                </div>

                {/* Styled Active/Inactive Toggle Switch */}
                <button 
                  onClick={() => toggleCourseStatus(course.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${course.is_active ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${course.is_active ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}