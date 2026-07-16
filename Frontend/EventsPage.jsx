import React from 'react';
import { Calendar, MapPin, Video, Award, Clock, ArrowRight } from 'lucide-react';

export default function EventsPage({ onNavigate }) {
  const events = [
    {
      title: "CareerCraft Cohort 04 Kickoff",
      type: "Intake",
      date: "Sept 12, 2026",
      time: "09:00 AM - 12:00 PM",
      location: "Virtual & In-Person Options",
      desc: "The initial launch briefing and mentorship group matching program for admitted Autumn trimester enrollees."
    },
    {
      title: "Youth Psychological Fitness Roundtable",
      type: "Webinar",
      date: "Oct 02, 2026",
      time: "02:00 PM - 04:30 PM",
      location: "Interactive Zoom Platform",
      desc: "An open panel of educational counselors addressing career transition-induced anxiety patterns."
    },
    {
      title: "Eagle's Nest Incubator Annual Pitch",
      type: "Pitch Day",
      date: "Nov 15, 2026",
      time: "08:00 AM - 05:00 PM",
      location: "Dexterity Innovation Hall, Nairobi",
      desc: "Our current incubation cohort pitches scalable, local market solutions directly to impact investors."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <span className="text-red-600 font-bold uppercase tracking-wider text-xs">Institutional Calendar</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Upcoming Trimester Events</h1>
          <p className="text-slate-600">
            Find details on cohort application deadliness, open mental health forums, vocational webinars, and local business networking masterclasses.
          </p>
        </div>

        {/* Lists */}
        <div className="space-y-6">
          {events.map((event, i) => (
            <div 
              key={i} 
              className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 grid md:grid-cols-12 gap-6 items-center shadow-sm hover:shadow-md transition"
            >
              {/* Date Box */}
              <div className="md:col-span-3 flex md:flex-col items-center md:items-start gap-4 md:gap-1 md:border-r border-slate-100 pr-4">
                <span className="text-xl font-bold text-blue-900">{event.date.split(',')[0]}</span>
                <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Year {event.date.split(',')[1]}</span>
                <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-md ml-auto md:ml-0 md:mt-2">
                  {event.type}
                </span>
              </div>

              {/* Event Content Details */}
              <div className="md:col-span-6 space-y-3">
                <h3 className="text-xl font-bold text-slate-900">{event.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{event.desc}</p>
                <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1"><Clock size={14} className="text-blue-900" /> {event.time}</span>
                  <span className="flex items-center gap-1">
                    {event.location.includes("Virtual") || event.location.includes("Zoom") 
                      ? <Video size={14} className="text-red-500" /> 
                      : <MapPin size={14} className="text-red-500" />
                    }
                    {event.location}
                  </span>
                </div>
              </div>

              {/* Interaction Call-To-Action */}
              <div className="md:col-span-3 flex justify-end">
                <button 
                  onClick={() => onNavigate('partner')}
                  className="w-full md:w-auto bg-slate-900 hover:bg-red-600 text-white font-bold text-xs py-3 px-6 rounded-lg shadow-sm transition duration-200 flex items-center justify-center gap-2"
                >
                  Register Seat <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Community Outreach Call */}
        <div className="bg-[#1a1b35] text-white rounded-3xl p-8 sm:p-12 mt-16 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-3 max-w-xl">
            <h3 className="text-2xl font-bold">Want us to host an institutional training?</h3>
            <p className="text-sm text-gray-300">
              We design specialized public speaking workshops, student vocational orientations, and institutional mental health webinars tailored for high schools and universities.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('partner')}
            className="flex-shrink-0 bg-red-600 hover:bg-red-700 text-white px-6 py-3.5 rounded-lg text-sm font-bold transition duration-200"
          >
            Invite Dexterity to Your Venue
          </button>
        </div>

      </div>
    </div>
  );
}