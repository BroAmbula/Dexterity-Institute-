import React, { useState, useEffect } from 'react';
import { Search, Clock, BarChart, GraduationCap, ChevronRight, Filter, ShieldCheck, X, DollarSign, Smartphone } from 'lucide-react';
import { getApiBaseUrl } from './apiConfig';

export default function CoursePage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currencyInKES, setCurrencyInKES] = useState(true);
  const [liveCourses, setLiveCourses] = useState([]);

  // Pull in courses created by the Super Admin so they show up here too
  useEffect(() => {
    const loadLiveCourses = async () => {
      try {
        const res = await fetch(`${getApiBaseUrl()}/api/courses`);
        if (!res.ok) return;
        const data = await res.json();
        setLiveCourses(data.map((c) => ({
          id: `live-${c.id}`,
          title: c.title,
          school: c.school,
          tagline: c.description,
          duration: c.duration,
          deliveryMode: c.delivery_mode,
          eligibility: c.eligibility,
          feeUSD: Number(c.fee_usd),
          exchangeRate: Number(c.exchange_rate),
          description: c.description,
        })));
      } catch (err) {
        console.error('Failed to load live courses', err);
      }
    };
    loadLiveCourses();
  }, []);