import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "What is the operational structure between the Dexterity Initiative and the Lifeskills Institute?",
      a: "Dexterity Initiative functions as the overarching public-facing entity of Dexterity Lifeskills Initiative CLG (a non-profit firm registered in Kenya). The Dexterity Lifeskills Institute represents its commercial development and practical training wing, directly holding, managing, and executing all underlying program intellectual property."
    },
    {
      q: "Why are course tuition prices hidden from the primary catalog views?",
      a: "Per institutional policy, prices are excluded from general overview lists to emphasize program requirements and stage fit first. Clicking 'Learn More' on any course triggers a full modal summary detailing duration, delivery setup, target eligibility parameters, and corresponding USD/KES costs."
    },
    {
      q: "Can Kenyan users pay program registrations natively via local mobile channels?",
      a: "Yes. While standard curriculum fees are benchmarked inside the portal using US Dollars (USD), our application framework supports localized detection. Users inside Kenya can toggle the view to see the equivalent in KES and clear payments directly using standard M-Pesa channels."
    },
    {
      q: "How does the School of CareerCraft structure differentiate its programs?",
      a: "Our CareerCraft tracks deliver highly segregated psychological interventions across 8 specific lifecycle stages—ranging from foundational discovery in CareerCraft Primary up through advanced organizational alignment inside CareerCraft Peak Performance."
    },
    {
      q: "What targets does the Eagle's Nest Incubation Hub focus on?",
      a: "The hub maps a clear business path divided into 5 critical operational phases: Startup Launch, Business Growth, Business Expansion, Business Excellence, and Business Turnaround."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        
        <div className="text-center space-y-3">
          <span className="text-red-600 font-bold uppercase tracking-wider text-xs">Help Infrastructure</span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Frequently Answered Queries</h1>
          <p className="text-slate-600 text-sm">
            Review clarification metrics covering our legal framework, currency processing protocols, and pedagogical school paths.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs transition">
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-slate-900 hover:bg-slate-50 transition gap-4"
                >
                  <span className="flex items-center gap-2"><HelpCircle size={16} className="text-blue-900 flex-shrink-0" /> {faq.q}</span>
                  {isOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="p-5 bg-slate-50/50 border-t border-slate-100 text-xs text-slate-600 leading-relaxed text-justify">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}