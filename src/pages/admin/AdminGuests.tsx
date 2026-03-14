import { useState } from 'react';
import { Search, UserPlus, Mail, Phone, MapPin, Download } from 'lucide-react';

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  visits: number;
  lastVisit: string;
  totalSpent: string;
  vip: boolean;
}

const sampleGuests: Guest[] = [
  { id: 'G-001', name: 'John Smith', email: 'john@example.com', phone: '+1 555-0101', country: 'USA', visits: 3, lastVisit: '2025-02-15', totalSpent: 'LKR 166,500', vip: true },
  { id: 'G-002', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+44 7700 900001', country: 'UK', visits: 1, lastVisit: '2025-02-16', totalSpent: 'LKR 98,000', vip: false },
  { id: 'G-003', name: 'Michael Chen', email: 'michael@example.com', phone: '+86 138-0000-0001', country: 'China', visits: 2, lastVisit: '2025-02-14', totalSpent: 'LKR 135,000', vip: true },
  { id: 'G-004', name: 'Emma Wilson', email: 'emma@example.com', phone: '+61 400 000 001', country: 'Australia', visits: 1, lastVisit: '2025-02-10', totalSpent: 'LKR 25,000', vip: false },
  { id: 'G-005', name: 'David Lee', email: 'david@example.com', phone: '+65 9000 0001', country: 'Singapore', visits: 5, lastVisit: '2025-02-19', totalSpent: 'LKR 277,500', vip: true },
  { id: 'G-006', name: 'Sophie Martin', email: 'sophie@example.com', phone: '+33 6 00 00 00 01', country: 'France', visits: 2, lastVisit: '2025-02-20', totalSpent: 'LKR 245,000', vip: false },
];

export default function AdminGuests() {
  const [search, setSearch] = useState('');

  const filtered = sampleGuests.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase()) || g.email.toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Country', 'Visits', 'Last Visit', 'Total Spent', 'VIP'];
    const rows = filtered.map(g => [g.id, g.name, g.email, g.phone, g.country, g.visits, g.lastVisit, g.totalSpent, g.vip ? 'Yes' : 'No']);
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'guests.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search guests..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
          <button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
            <UserPlus className="h-4 w-4" /> Add Guest
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-x-auto">
        <table className="w-full text-sm min-w-[750px]">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="text-left px-5 py-3 font-medium">Guest</th>
              <th className="text-left px-5 py-3 font-medium">Contact</th>
              <th className="text-left px-5 py-3 font-medium">Country</th>
              <th className="text-left px-5 py-3 font-medium">Visits</th>
              <th className="text-left px-5 py-3 font-medium">Last Visit</th>
              <th className="text-left px-5 py-3 font-medium">Total Spent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filtered.map(g => (
              <tr key={g.id} className="hover:bg-gray-700/30 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 bg-gray-700 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {g.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-white font-medium flex items-center gap-2">
                        {g.name}
                        {g.vip && <span className="bg-amber-500/20 text-amber-400 text-[10px] px-1.5 py-0.5 rounded font-bold">VIP</span>}
                      </p>
                      <p className="text-gray-500 text-xs font-mono">{g.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <p className="text-gray-300 flex items-center gap-1.5 text-xs"><Mail className="h-3 w-3 text-gray-500" /> {g.email}</p>
                  <p className="text-gray-400 flex items-center gap-1.5 text-xs mt-1"><Phone className="h-3 w-3 text-gray-500" /> {g.phone}</p>
                </td>
                <td className="px-5 py-3">
                  <span className="text-gray-300 flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-gray-500" /> {g.country}</span>
                </td>
                <td className="px-5 py-3 text-gray-300 text-center">{g.visits}</td>
                <td className="px-5 py-3 text-gray-400">{g.lastVisit}</td>
                <td className="px-5 py-3 text-white font-medium">{g.totalSpent}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-gray-500 text-sm">No guests found.</div>
        )}
      </div>
    </div>
  );
}
