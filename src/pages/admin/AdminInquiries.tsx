import React, { useState } from 'react';
import { Search, Eye, Trash2, MessageSquare, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'New' | 'Read' | 'Replied' | 'Closed';
}

const sampleInquiries: Inquiry[] = [
  { id: 'INQ-001', name: 'Anna Williams', email: 'anna@example.com', subject: 'Wedding venue inquiry', message: 'We are looking or a venue for our wedding in March...', date: '2025-02-10', status: 'New' },
  { id: 'INQ-002', name: 'Robert Brown', email: 'robert@example.com', subject: 'Group booking for 10 rooms', message: 'Our corporate team needs 10 rooms for a retreat...', date: '2025-02-09', status: 'Read' },
  { id: 'INQ-003', name: 'Lisa Chen', email: 'lisa@example.com', subject: 'Pool access for day visitors', message: 'Can non-guests use the pool facilities?', date: '2025-02-08', status: 'Replied' },
  { id: 'INQ-004', name: 'James Taylor', email: 'james@example.com', subject: 'Airport transfer service', message: 'Do you provide airport transfers?', date: '2025-02-07', status: 'Closed' },
  { id: 'INQ-005', name: 'Maria Garcia', email: 'maria@example.com', subject: 'Dining reservation for 20', message: 'Large group dinner for birthday celebration...', date: '2025-02-06', status: 'New' },
];

const statusConfig: Record<string, { icon: React.ElementType; color: string }> = {
  New: { icon: Clock, color: 'bg-blue-500/20 text-blue-400' },
  Read: { icon: Eye, color: 'bg-amber-500/20 text-amber-400' },
  Replied: { icon: CheckCircle, color: 'bg-emerald-500/20 text-emerald-400' },
  Closed: { icon: XCircle, color: 'bg-gray-500/20 text-gray-400' },
};

export default function AdminInquiries() {
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filtered = sampleInquiries.filter(inq => {
    const matchesFilter = filter === 'All' || inq.status === filter;
    const matchesSearch = inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.subject.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search inquiries..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All', 'New', 'Read', 'Replied', 'Closed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                filter === f ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="text-left px-5 py-3 font-medium">ID</th>
              <th className="text-left px-5 py-3 font-medium">Name</th>
              <th className="text-left px-5 py-3 font-medium">Subject</th>
              <th className="text-left px-5 py-3 font-medium">Date</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-right px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filtered.map(inq => {
              const StatusIcon = statusConfig[inq.status].icon;
              return (
                <tr key={inq.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-5 py-3 text-gray-300 font-mono text-xs">{inq.id}</td>
                  <td className="px-5 py-3">
                    <p className="text-white">{inq.name}</p>
                    <p className="text-gray-500 text-xs">{inq.email}</p>
                  </td>
                  <td className="px-5 py-3 text-gray-300 max-w-xs truncate">{inq.subject}</td>
                  <td className="px-5 py-3 text-gray-400">{inq.date}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[inq.status].color}`}>
                      <StatusIcon className="h-3 w-3" />
                      {inq.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-amber-400 p-1.5 rounded-lg hover:bg-gray-700 transition-colors ml-1">
                      <MessageSquare className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-gray-700 transition-colors ml-1">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-gray-500 text-sm">No inquiries found.</div>
        )}
      </div>
    </div>
  );
}
