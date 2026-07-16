import React, { useState } from 'react';
import { Phone, Mail, MapPin,Clock, CheckCircle2, Send } from 'lucide-react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });

  const handleSendMessage = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' }); }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-start">
        
        {/* Contact Info Column */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <span className="text-red-600 font-bold uppercase tracking-wider text-xs">Direct Support Desk</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Get In Touch</h1>
            <p className="text-slate-600 text-sm leading-relaxed">
              Have questions regarding specific trimester enrollment availability, organizational training integration, or corporate research access? Reach our coordination desk.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-slate-200 p-5 rounded-xl flex items-center gap-4 shadow-2xs">
              <div className="p-3 bg-blue-50 text-blue-900 rounded-lg"><Phone size={20} /></div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Call or WhatsApp</p>
                <p className="text-base font-bold text-slate-900 mt-0.5">+254 726 503 062</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-xl flex items-center gap-4 shadow-2xs">
              <div className="p-3 bg-red-50 text-red-600 rounded-lg"><Mail size={20} /></div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Communication</p>
                <p className="text-base font-bold text-slate-900 mt-0.5">info@dexterityinitiative.org</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-xl flex items-center gap-4 shadow-2xs">
              <div className="p-3 bg-blue-50 text-blue-900 rounded-lg"><MapPin size={20} /></div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Headquarters Base</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">Nairobi, Kenya</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messaging Interface Frame */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 border border-slate-200 rounded-2xl shadow-sm">
          <h3 className="text-xl font-bold text-slate-950 mb-6">Submit an Instant Message</h3>
          
          {sent ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-xl text-center space-y-2 animate-fade-in">
              <CheckCircle2 size={28} className="mx-auto text-emerald-600" />
              <h4 className="font-bold">Message Forwarded Successfully</h4>
              <p className="text-xs text-slate-600">Our administrative desk will reply via your provided address within 24 operational hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Your Name</label>
                  <input 
                    type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Jane Doe" className="w-full border border-slate-200 rounded-lg px-4 py-3 text-xs bg-slate-50 focus:outline-none focus:border-blue-900 focus:bg-white text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Email Address</label>
                  <input 
                    type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="jane@example.com" className="w-full border border-slate-200 rounded-lg px-4 py-3 text-xs bg-slate-50 focus:outline-none focus:border-blue-900 focus:bg-white text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Inquiry Target Classification</label>
                <select 
                  value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-xs bg-slate-50 focus:outline-none focus:border-blue-900 focus:bg-white text-slate-800"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Course Registration Help">Course Registration Help</option>
                  <option value="Technical Learning Portal Issue">Technical Learning Portal Issue</option>
                  <option value="Research Paper Access">Research Paper Access</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Detailed Message Brief</label>
                <textarea 
                  rows="5" required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Elaborate on your inquiry..." className="w-full border border-slate-200 rounded-lg px-4 py-3 text-xs bg-slate-50 focus:outline-none focus:border-blue-900 focus:bg-white text-slate-800 resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-900 hover:bg-red-600 text-white font-bold py-3.5 rounded-xl text-xs transition duration-200 shadow-sm flex items-center justify-center gap-2"
              >
                Send Message Desk <Send size={14} />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}