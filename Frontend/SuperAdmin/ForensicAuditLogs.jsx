import React, { useState } from 'react';

export default function ForensicAuditLogs() {
  const [logs] = useState([
    { id: '1', admin: 'Jane Mwende (ADMIN)', action: 'APPROVED_ENROLLMENT', details: 'Approved enrollment for Student ID 401 on Course: Startup Launch', timestamp: '2026-07-16 11:24:01' },
    { id: '2', admin: 'Alvin Wekesa (SUPER_ADMIN)', action: 'MANUAL_PAYMENT_OVERRIDE', details: 'Manually verified Payment of $150 (KES 19,500). Reason: M-Pesa Callback Timeout.', timestamp: '2026-07-16 10:15:33' },
    { id: '3', admin: 'Jane Mwende (ADMIN)', action: 'EDITED_COURSE', details: 'Updated tagline description for CareerCraft Graduate Launch', timestamp: '2026-07-16 09:12:10' }
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-950">System Audit Trail</h2>
          <p className="text-xs text-gray-400">Chronological list of immutable staff actions and structural updates.</p>
        </div>

        <div className="space-y-4">
          {logs.map((log) => (
            <div key={log.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col md:flex-row justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900 text-sm">{log.admin}</span>
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                    {log.action}
                  </span>
                </div>
                <p className="text-gray-600 text-xs mt-2 font-medium">{log.details}</p>
              </div>

              <div className="text-right text-[11px] text-gray-400 font-semibold md:self-center">
                {log.timestamp}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}