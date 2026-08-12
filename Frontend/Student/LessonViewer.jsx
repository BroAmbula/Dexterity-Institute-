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
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          <aside className="lg:sticky lg:top-6 self-start bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400 font-bold">Class Outline</p>
              <h2 className="mt-3 text-xl font-black text-slate-950">{data.course.title}</h2>
              <p className="mt-2 text-sm text-slate-500">{data.progress_percent}% complete</p>
            </div>

            <div className="space-y-3">
              {data.lessons.map((lesson, i) => (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLessonId(lesson.id)}
                  className={`w-full text-left rounded-3xl p-4 border transition duration-200 ${
                    activeLessonId === lesson.id
                      ? 'bg-blue-900 border-blue-900 text-white'
                      : 'bg-white border-gray-200 text-slate-700 hover:border-blue-200 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold">{i + 1}. {lesson.title}</span>
                    {lesson.completed ? (
                      <CheckCircle size={18} className={activeLessonId === lesson.id ? 'text-white' : 'text-emerald-500'} />
                    ) : (
                      <Circle size={18} className={activeLessonId === lesson.id ? 'text-slate-200' : 'text-gray-300'} />
                    )}
                  </div>
                  <p className="text-xs mt-2 text-slate-400">{lesson.completed ? 'Completed' : 'Pending'}</p>
                </button>
              ))}
            </div>
          </aside>

          <main className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
            {activeLesson && (
              <>
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 items-center text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">
                    <span className="bg-slate-100 px-3 py-1 rounded-full">Lesson</span>
                    <span className="bg-slate-100 px-3 py-1 rounded-full">{activeLesson.completed ? 'Completed' : 'In Progress'}</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-950 mb-3">{activeLesson.title}</h2>
                  <p className="text-sm text-slate-500">{activeLesson.content?.slice(0, 120) || 'This lesson contains the next unit for your course.'}</p>
                </div>

                {activeLesson.video_url && (
                  <a
                    href={activeLesson.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm mb-6 hover:text-blue-800"
                  >
                    <PlayCircle size={18} /> Watch lesson video
                  </a>
                )}

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 mb-8">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{activeLesson.content || 'No written content for this lesson yet.'}</p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <button
                    onClick={() => toggleComplete(activeLesson.id)}
                    disabled={toggling === activeLesson.id}
                    className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-bold text-sm transition disabled:opacity-50 ${
                      activeLesson.completed
                        ? 'bg-gray-200 text-slate-700 hover:bg-gray-300'
                        : 'bg-blue-900 text-white hover:bg-blue-800'
                    }`}
                  >
                    {toggling === activeLesson.id
                      ? 'Updating...'
                      : activeLesson.completed
                        ? '✓ Marked Complete — Click to Undo'
                        : 'Mark as Complete'}
                  </button>
                  <div className="text-xs text-slate-500">Tip: Navigate lessons from the left menu like a learning portal.</div>
                </div>
              </>
            )}
          </main>
        </div>
      )}
    </div>
  );
}