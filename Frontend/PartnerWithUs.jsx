import React, { useState } from 'react';
import { 
  Handshake, CheckCircle2, Phone, Mail, Building2, 
  Users, LineChart, ShieldCheck, ArrowRight, MessageSquare 
} from 'lucide-react';

export default function PartnerWithUs() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    partnershipType: 'corporate',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Partnership Inquiry:', formData);
    setSubmitted(true);
    // Reset form after a delay
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', organization: '', email: '', phone: '', partnershipType: 'corporate', message: '' });
    }, 4000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const benefits = [
    {
      title: "Direct Access to Job-Ready Talent",
      description: "Tap into a vetted pipeline of young professionals equipped with critical career-readiness, public speaking, and mental resilience skills through our CareerCraft programs.",
      icon: <Users className="text-blue-600" size={28} />
    },
    {
      title: "Corporate Social Responsibility (CSR) Impact",
      description: "Align your brand with scalable, measurable, and highly impactful initiatives targeting youth mental health, entrepreneurship support, and life skills coaching.",
      icon: <LineChart className="text-red-600" size={28} />
    },
    {
      title: "Evidence-Based Collaborations",
      description: "Leverage our extensive academic research and psychological insights to co-design customized wellness, training, or development programs for your institution.",
      icon: <ShieldCheck className="text-blue-600" size={28} />
    },
    {
      title: "Eagle's Nest Incubator Synergy",
      description: "Provide mentorship, funding, or market-access channels to high-potential startups and micro-enterprises currently incubating under our business hub.",
      icon: <Building2 className="text-red-600" size={28} />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* SECTION 1: Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 md:py-28 px-6 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(220,38,38,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(30,58,138,0.3),transparent)]" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center max-w-3xl">
          <span className="text-red-500 font-bold uppercase tracking-widest text-xs sm:text-sm px-3 py-1 bg-white/5 rounded-full border border-white/10">
            Collaborate With Us
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mt-6 leading-tight">
            Co-Creating Real <span className="text-blue-400">Systemic Impact</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mt-6 leading-relaxed">
            We partner with academic institutions, corporate brands, NGOs, and government agencies to unlock human potential, promote mental health, and transform career landscapes.
          </p>
        </div>
      </section>

      {/* SECTION 2: Benefits of Partnering */}
      <section className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-red-600 font-bold uppercase tracking-wider text-xs">Mutual Value</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Why Partner With Dexterity?
          </h2>
          <p className="text-gray-600 mt-4">
            A partnership with us is built on shared goals, rigorous data evaluation, and practical outcomes that leave individuals and communities stronger.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition duration-300 flex gap-6"
            >
              <div className="flex-shrink-0 p-4 bg-slate-50 rounded-xl h-fit border border-slate-100">
                {benefit.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">{benefit.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: Main Collaboration Layout (Form + Quick Contacts) */}
      <section className="py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-slate-950/50 p-8 sm:p-10 rounded-3xl border border-white/5 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-2">Send a Partnership Proposal</h3>
            <p className="text-gray-400 text-sm mb-8">
              Fill out this quick brief and our team will get back to you within 48 hours to schedule an introductory call.
            </p>

            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-6 rounded-xl text-center">
                <CheckCircle2 size={32} className="mx-auto mb-3" />
                <h4 className="font-bold text-lg">Inquiry Successfully Sent!</h4>
                <p className="text-sm text-gray-300 mt-1">Thank you for reaching out. We look forward to exploring possibilities with you.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Your Name</label>
                    <input 
                      type="text" required name="name" value={formData.name} onChange={handleChange}
                      placeholder="e.g., Jane Doe"
                      className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-500 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Organization</label>
                    <input 
                      type="text" required name="organization" value={formData.organization} onChange={handleChange}
                      placeholder="e.g., Horizon Corp"
                      className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-500 text-white"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Email Address</label>
                    <input 
                      type="email" required name="email" value={formData.email} onChange={handleChange}
                      placeholder="e.g., partnerships@horizon.com"
                      className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-500 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Phone Number</label>
                    <input 
                      type="tel" required name="phone" value={formData.phone} onChange={handleChange}
                      placeholder="e.g., +254 700 000 000"
                      className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-500 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">How Would You Like To Partner?</label>
                  <select 
                    name="partnershipType" value={formData.partnershipType} onChange={handleChange}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-500 text-white"
                  >
                    <option value="corporate">Corporate CSR / Sponsorship</option>
                    <option value="academic">Academic & School Integration</option>
                    <option value="incubation">Eagle's Nest Incubator Mentor / Sponsor</option>
                    <option value="advocacy">Research & Mental Health Program Synergy</option>
                    <option value="other">Other Collaboration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Message or Collaboration Idea</label>
                  <textarea 
                    rows="4" required name="message" value={formData.message} onChange={handleChange}
                    placeholder="Briefly tell us how you would like to collaborate..."
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-500 text-white resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-lg text-sm font-bold transition duration-200"
                >
                  Submit Partner Request <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Contact Info (Phone & Email from Video/Footer) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            <div className="space-y-4">
              <span className="text-red-500 font-bold uppercase tracking-wider text-xs">Reach Out Directly</span>
              <h3 className="text-3xl font-extrabold text-white">Let's Connect</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Prefer a quick call, a face-to-face meet, or an email instead of filling out a form? Reach out directly using our official details below. Our development directors are ready to co-design custom partnerships.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              <a 
                href="tel:+254726503062" 
                className="flex items-center gap-5 bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition duration-250 group"
              >
                <div className="p-3.5 bg-blue-600/20 text-blue-400 rounded-xl group-hover:scale-105 transition">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">Call or WhatsApp</p>
                  <p className="text-lg font-bold text-white mt-1">+254 726 503 062</p>
                </div>
              </a>

              <a 
                href="mailto:info@dexterityinitiative.org" 
                className="flex items-center gap-5 bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition duration-250 group"
              >
                <div className="p-3.5 bg-red-600/20 text-red-400 rounded-xl group-hover:scale-105 transition">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">Email Our Team</p>
                  <p className="text-lg font-bold text-white mt-1">info@dexterityinitiative.org</p>
                </div>
              </a>
            </div>

            {/* Extra assurance badge */}
            <div className="p-5 bg-blue-950/40 rounded-2xl border border-blue-900/40 flex items-start gap-4">
              <MessageSquare className="text-blue-400 mt-1 flex-shrink-0" size={20} />
              <div className="text-xs text-gray-300 leading-relaxed">
                <p className="font-bold text-white">Non-Profit Status:</p>
                A programme of Dexterity Lifeskills Initiative CLG, a non-profit organization focused on research-backed education, life skills, and mental well-being initiatives.
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}