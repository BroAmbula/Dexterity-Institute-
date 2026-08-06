import React, { useState, useEffect } from 'react';
import { ChevronLeft, CheckCircle, Circle, PlayCircle } from 'lucide-react';
import { getApiBaseUrl } from '../apiConfig';

export default function LessonViewer({ onNavigate, course }) {
  const [data, setData] = useState(null);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toggling, setToggling] = useState(null);

  const token = () => localStorage.getItem('token') || localStorage.getItem('auth_token') || localStorage.getItem('dex_token');

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/student/courses/${course.course_id || course.id}/lessons`, {
        headers: { 'Authorization': `Bearer ${token()}`, 'Accept': 'application/json' }
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to load lessons.');
      setData(json);
      if (json.lessons?.length > 0 && !activeLessonId) {
        setActiveLessonId(json.lessons[0].id);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const toggleComplete = async (lessonId) => {
    setToggling(lessonId);
    try {
      await fetch(`${getApiBaseUrl()}/api/student/lessons/${lessonId}/toggle-complete`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token()}`, 'Accept': 'application/json' }
      });
      await load();
    } catch (err) {
      alert('Failed to update lesson status.');
    } finally {
      setToggling(null);
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-gray-400 font-bold">Loading course content...</div>;
  }

  if (error || !data) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-600 font-bold mb-4">{error || 'Unable to load this course.'}</p>
        <button onClick={() => onNavigate('student-dashboard')} className="text-blue-600 font-bold underline">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const activeLesson = data.lessons.find(l => l.id === activeLessonId);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={() => onNavigate('student-dashboard')}
        className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-gray-900 mb-6"
      >
        <ChevronLeft size={14} /> Back to Dashboard
      </button>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-950">{data.course.title}</h1>
          <p className="text-sm text-gray-500 mt-1">{data.progress_percent}% complete</p>
        </div>
        <div className="w-40 h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 transition-all" style={{ width: `${data.progress_percent}%` }} />
        </div>
      </div>

      {data.lessons.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl border border-dashed border-gray-300 text-center">
          <p className="text-gray-500 font-bold">No lessons have been added to this course yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Lesson list */}
          <div className="md:col-span-1 space-y-2">
            {data.lessons.map((lesson, i) => (
              <button
                key={lesson.id}
                onClick={() => setActiveLessonId(lesson.id)}
                className={`w-full text-left flex items-center gap-3 p-3 rounded-xl border transition ${
                  activeLessonId === lesson.id ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-100 hover:bg-gray-50'
                }`}
              >
                {lesson.completed
                  ? <CheckCircle size={18} className="text-emerald-500 flex-shrink-0" />
                  : <Circle size={18} className="text-gray-300 flex-shrink-0" />}
                <span className="text-sm font-bold text-gray-800">{i + 1}. {lesson.title}</span>
              </button>
            ))}
          </div>

          {/* Active lesson content */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            {activeLesson && (
              <>
                <h2 className="text-xl font-black text-gray-950 mb-4">{activeLesson.title}</h2>

                {activeLesson.video_url && (
                  
                    href={activeLesson.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-4 hover:underline"
                  >
                    <PlayCircle size={18} /> Watch lesson video
                  </a>
                )}

                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap mb-8">
                  {activeLesson.content || 'No written content for this lesson yet.'}
                </p>

                <button
                  onClick={() => toggleComplete(activeLesson.id)}
                  disabled={toggling === activeLesson.id}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm transition disabled:opacity-50 ${
                    activeLesson.completed
                      ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  {toggling === activeLesson.id
                    ? 'Updating...'
                    : activeLesson.completed
                      ? '✓ Marked Complete — Click to Undo'
                      : 'Mark as Complete'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}