import React, { useEffect, useState } from 'react';
import { Download, Mail, ShieldCheck, BookOpen } from 'lucide-react';
import { getApiBaseUrl } from './apiConfig';

export default function FreeDownloadsPage() {
  const [downloads, setDownloads] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const loadDownloads = async () => {
      try {
        const res = await fetch(`${getApiBaseUrl()}/api/free-downloads`);
        const data = await res.json();
        if (res.ok) {
          setDownloads(data);
          setSelectedId(data[0]?.id ?? null);
        } else {
          throw new Error(data.message || 'Unable to load download resources.');
        }
      } catch (err) {
        setStatus({ type: 'error', message: err.message || 'Failed to fetch downloads.' });
      } finally {
        setLoading(false);
      }
    };
    loadDownloads();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedId) {
      setStatus({ type: 'error', message: 'Please select a document first.' });
      return;
    }
    setSending(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${getApiBaseUrl()}/api/free-downloads/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email, download_id: selectedId }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Could not send the download email.');
      }

      setStatus({ type: 'success', message: result.message });
      setEmail('');
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Unable to send email.' });
    } finally {
      setSending(false);
    }
  };

  const selectedDownload = downloads.find((item) => item.id === selectedId);

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
                  <Download size={24} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400 font-bold">Free Downloads</p>
                  <h1 className="text-3xl font-extrabold text-slate-900">Get PDF resources straight to your inbox.</h1>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed">Submit your email address and we will send the document directly to you. These resources are always free and ready for download.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {loading ? (
                <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-400 font-bold">Loading documents...</div>
              ) : downloads.length === 0 ? (
                <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-400 font-bold">No free downloads are available yet.</div>
              ) : (
                downloads.map((download) => (
                  <button
                    key={download.id}
                    type="button"
                    onClick={() => setSelectedId(download.id)}
                    className={`rounded-3xl border p-6 text-left transition ${selectedId === download.id ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div>
                        <p className="text-sm font-bold text-slate-900">{download.title}</p>
                      </div>
                      <div className="rounded-full bg-slate-100 p-2">
                        <BookOpen size={18} className={selectedId === download.id ? 'text-blue-600' : 'text-slate-400'} />
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600">{download.description}</p>
                  </button>
                ))
              )}
            </div>
          </section>

          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400 font-bold">Email delivery</p>
                  <h2 className="text-2xl font-black text-slate-900">Send the selected PDF directly to your inbox.</h2>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700">Selected Document</label>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                    {selectedDownload ? selectedDownload.title : 'Choose a document from the list.'}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {status.message && (
                  <div className={`rounded-2xl border px-4 py-3 text-sm ${status.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-rose-200 bg-rose-50 text-rose-800'}`}>
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending || !selectedId}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? 'Sending...' : 'Send download email'}
                </button>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2 font-bold text-slate-900 mb-2"><ShieldCheck size={16} /> Privacy first</div>
                  We will only use your email to send the selected resource. Your address will not be shared.
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
