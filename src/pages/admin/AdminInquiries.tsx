import React, { useState } from 'react';
import { Search, Eye, Trash2, MessageSquare, Clock, CheckCircle, XCircle, X } from 'lucide-react';

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
  { id: 'INQ-001', name: 'Anna Williams', email: 'anna@example.com', subject: 'Wedding venue inquiry', message: 'We are looking for a venue for our wedding in March. Can you accommodate 100 guests for a reception?', date: '2025-02-10', status: 'New' },
  { id: 'INQ-002', name: 'Robert Brown', email: 'robert@example.com', subject: 'Group booking for 10 rooms', message: 'Our corporate team needs 10 rooms for a retreat in April. What are your group rates?', date: '2025-02-09', status: 'Read' },
  { id: 'INQ-003', name: 'Lisa Chen', email: 'lisa@example.com', subject: 'Pool access for day visitors', message: 'Can non-guests use the pool facilities? What are the day pass rates?', date: '2025-02-08', status: 'Replied' },
  { id: 'INQ-004', name: 'James Taylor', email: 'james@example.com', subject: 'Airport transfer service', message: 'Do you provide airport transfers? We arrive at 2pm on the 15th.', date: '2025-02-07', status: 'Closed' },
  { id: 'INQ-005', name: 'Maria Garcia', email: 'maria@example.com', subject: 'Dining reservation for 20', message: 'Large group dinner for birthday celebration. Can you arrange a special menu?', date: '2025-02-06', status: 'New' },
];

const statusConfig: Record<string, { icon: React.ElementType; color: string }> = {
  New: { icon: Clock, color: 'bg-blue-500/20 text-blue-600 dark:text-blue-400' },
  Read: { icon: Eye, color: 'bg-amber-500/20 text-amber-600 dark:text-amber-400' },
  Replied: { icon: CheckCircle, color: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' },
  Closed: { icon: XCircle, color: 'bg-gray-500/20 text-gray-600 dark:text-gray-400' },
};

type ModalType = 'view' | 'reply' | 'delete' | null;

export default function AdminInquiries() {
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [replyText, setReplyText] = useState('');

  const filtered = sampleInquiries.filter(inq => {
    const matchesFilter = filter === 'All' || inq.status === filter;
    const matchesSearch = inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.subject.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const openModal = (type: ModalType, inquiry: Inquiry) => {
    setModalType(type);
    setSelectedInquiry(inquiry);
    if (type === 'reply') setReplyText('');
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedInquiry(null);
    setReplyText('');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search inquiries..." className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All', 'New', 'Read', 'Replied', 'Closed'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${filter === f ? 'bg-amber-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-700'}`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              <th className="text-left px-5 py-3 font-medium">ID</th>
              <th className="text-left px-5 py-3 font-medium">Name</th>
              <th className="text-left px-5 py-3 font-medium">Subject</th>
              <th className="text-left px-5 py-3 font-medium">Date</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-right px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filtered.map(inq => {
              const StatusIcon = statusConfig[inq.status].icon;
              return (
                <tr key={inq.id} className="hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-300 font-mono text-xs">{inq.id}</td>
                  <td className="px-5 py-3"><p className="text-gray-900 dark:text-white">{inq.name}</p><p className="text-gray-500 text-xs">{inq.email}</p></td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-300 max-w-xs truncate">{inq.subject}</td>
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{inq.date}</td>
                  <td className="px-5 py-3"><span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[inq.status].color}`}><StatusIcon className="h-3 w-3" />{inq.status}</span></td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => openModal('view', inq)} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"><Eye className="h-4 w-4" /></button>
                    <button onClick={() => openModal('reply', inq)} className="text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ml-1"><MessageSquare className="h-4 w-4" /></button>
                    <button onClick={() => openModal('delete', inq)} className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ml-1"><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="py-12 text-center text-gray-500 text-sm">No inquiries found.</div>}
      </div>

      {modalType === 'view' && selectedInquiry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"><h3 className="text-gray-900 dark:text-white font-semibold">Inquiry Details</h3><button onClick={closeModal} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"><X className="h-5 w-5" /></button></div>
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-start"><div><p className="text-gray-900 dark:text-white font-medium">{selectedInquiry.name}</p><p className="text-gray-500 dark:text-gray-400 text-sm">{selectedInquiry.email}</p></div><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[selectedInquiry.status].color}`}>{selectedInquiry.status}</span></div>
              <div><p className="text-gray-500 text-xs mb-1">Subject</p><p className="text-gray-900 dark:text-white">{selectedInquiry.subject}</p></div>
              <div><p className="text-gray-500 text-xs mb-1">Message</p><div className="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-3"><p className="text-gray-600 dark:text-gray-300 text-sm">{selectedInquiry.message}</p></div></div>
              <p className="text-gray-500 text-xs">Received: {selectedInquiry.date}</p>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-700"><button onClick={closeModal} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-sm font-medium rounded-lg transition-colors">Close</button><button onClick={() => { closeModal(); openModal('reply', selectedInquiry); }} className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors">Reply</button></div>
          </div>
        </div>
      )}

      {modalType === 'reply' && selectedInquiry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"><h3 className="text-gray-900 dark:text-white font-semibold">Reply to Inquiry</h3><button onClick={closeModal} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"><X className="h-5 w-5" /></button></div>
            <div className="p-4 space-y-4">
              <div className="bg-gray-100 dark:bg-gray-700/30 rounded-lg p-3"><div className="flex justify-between items-center mb-2"><span className="text-gray-900 dark:text-white font-medium text-sm">{selectedInquiry.name}</span><span className="text-gray-500 text-xs">{selectedInquiry.date}</span></div><p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{selectedInquiry.subject}</p><p className="text-gray-600 dark:text-gray-300 text-sm">{selectedInquiry.message}</p></div>
              <div><label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">To: {selectedInquiry.email}</label><textarea rows={5} value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Type your reply..." className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none resize-none" /></div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-700"><button onClick={closeModal} className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Cancel</button><button onClick={closeModal} className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors">Send Reply</button></div>
          </div>
        </div>
      )}

      {modalType === 'delete' && selectedInquiry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 w-full max-w-sm">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 className="h-6 w-6 text-red-600 dark:text-red-400" /></div>
              <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-2">Delete Inquiry?</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Are you sure you want to delete inquiry from <span className="text-gray-900 dark:text-white font-medium">{selectedInquiry.name}</span>?</p>
              <div className="flex gap-3 justify-center"><button onClick={closeModal} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-sm font-medium rounded-lg transition-colors">Cancel</button><button onClick={closeModal} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors">Delete</button></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
