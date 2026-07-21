import React, { useState } from 'react';
import { getApiBaseUrl } from '../apiConfig';

export default function AddCourse({ onNavigate }) {
  const [formData, setFormData] = useState({
    title: '',
    school: '',
    description: '',
    duration: '',
    delivery_mode: 'Online',
    eligibility: '',
    fee_usd: '',
    exchange_rate: '130',
    is_active: true,
    pdf_file: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          data.append(key, formData[key]);
        }
      });

      const response = await fetch(`${getApiBaseUrl()}/api/super-admin/courses`, {
        method: 'POST',
        headers: { 
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: data
      });

      if (response.ok) {
        alert("Course Added Successfully!");
        onNavigate('super-admin-dashboard');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to add course'}`);
      }
    } catch (err) {
      alert("Network error: Failed to connect to server");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
      <h2 className="text-2xl font-black mb-6">Add New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-3 border rounded-lg" placeholder="Course Title" required onChange={e => setFormData({...formData, title: e.target.value})} />
        <input className="w-full p-3 border rounded-lg" placeholder="School Name" required onChange={e => setFormData({...formData, school: e.target.value})} />
        <textarea className="w-full p-3 border rounded-lg" placeholder="Description" required onChange={e => setFormData({...formData, description: e.target.value})} />
        <div className="grid grid-cols-2 gap-4">
          <input className="p-3 border rounded-lg" placeholder="Duration (e.g. 12 Weeks)" required onChange={e => setFormData({...formData, duration: e.target.value})} />
          <input className="p-3 border rounded-lg" placeholder="Fee USD" type="number" required onChange={e => setFormData({...formData, fee_usd: e.target.value})} />
        </div>
        <input className="w-full p-3 border rounded-lg" placeholder="Eligibility Requirements" required onChange={e => setFormData({...formData, eligibility: e.target.value})} />
        
        <div>
          <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Course Syllabus (PDF)</label>
          <input 
            type="file" 
            accept="application/pdf"
            onChange={(e) => setFormData({ ...formData, pdf_file: e.target.files[0] })}
            className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700">
          Save Course
        </button>
      </form>
    </div>
  );
}