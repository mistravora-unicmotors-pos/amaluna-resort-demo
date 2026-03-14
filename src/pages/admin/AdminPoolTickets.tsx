import { useState } from 'react';
import { Search, Download, Edit3, X, Eye, Plus, Waves, Users, DollarSign, Ticket } from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type TicketType = 'Pool Access' | 'Day-Out Package' | 'Pool + Lunch' | 'Pool + Dinner';
type TicketStatus = 'Confirmed' | 'Pending' | 'Used' | 'Cancelled' | 'Expired';

interface PoolTicket {
  id: string;
  guest: string;
  email: string;
  phone: string;
  type: TicketType;
  date: string;
  adults: number;
  children: number;
  total: number;
  status: TicketStatus;
  notes: string;
  createdAt: string;
}

interface PricingTier {
  label: string;
  description: string;
  adultPrice: number;
  childPrice: number;
  icon: string;
}

// ---------------------------------------------------------------------------
// Pricing config — editable in a future settings integration
// ---------------------------------------------------------------------------
const pricingTiers: PricingTier[] = [
  { label: 'Pool Access', description: 'Swimming pool entry (10am – 6pm)', adultPrice: 2500, childPrice: 1500, icon: '🏊' },
  { label: 'Day-Out Package', description: 'Pool + sun lounger + welcome drink', adultPrice: 4500, childPrice: 2500, icon: '☀️' },
  { label: 'Pool + Lunch', description: 'Pool access with buffet lunch', adultPrice: 5500, childPrice: 3000, icon: '🍽️' },
  { label: 'Pool + Dinner', description: 'Pool access with set dinner', adultPrice: 6500, childPrice: 3500, icon: '🌙' },
];

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------
const sampleTickets: PoolTicket[] = [
  { id: 'PT-001', guest: 'Nimal Perera', email: 'nimal@example.com', phone: '+94 77 123 4567', type: 'Day-Out Package', date: '2026-03-15', adults: 2, children: 1, total: 11500, status: 'Confirmed', notes: '', createdAt: '2026-03-14T08:30:00Z' },
  { id: 'PT-002', guest: 'Lisa Anderson', email: 'lisa@example.com', phone: '+44 7700 900002', type: 'Pool Access', date: '2026-03-15', adults: 4, children: 0, total: 10000, status: 'Pending', notes: 'Arriving late morning', createdAt: '2026-03-14T10:15:00Z' },
  { id: 'PT-003', guest: 'Kamal Silva', email: 'kamal@example.com', phone: '+94 71 234 5678', type: 'Pool + Lunch', date: '2026-03-16', adults: 2, children: 2, total: 17000, status: 'Confirmed', notes: 'Vegetarian meals required', createdAt: '2026-03-13T16:45:00Z' },
  { id: 'PT-004', guest: 'Thomas Müller', email: 'thomas@example.com', phone: '+49 170 0000002', type: 'Pool + Dinner', date: '2026-03-14', adults: 2, children: 0, total: 13000, status: 'Used', notes: '', createdAt: '2026-03-12T09:00:00Z' },
  { id: 'PT-005', guest: 'Ruwani Fernando', email: 'ruwani@example.com', phone: '+94 76 321 7654', type: 'Pool Access', date: '2026-03-12', adults: 3, children: 2, total: 10500, status: 'Used', notes: 'Birthday celebration', createdAt: '2026-03-11T11:20:00Z' },
  { id: 'PT-006', guest: 'James Wright', email: 'james@example.com', phone: '+1 555-0202', type: 'Day-Out Package', date: '2026-03-17', adults: 1, children: 0, total: 4500, status: 'Cancelled', notes: 'Weather concerns', createdAt: '2026-03-14T14:10:00Z' },
  { id: 'PT-007', guest: 'Priya Sharma', email: 'priya@example.com', phone: '+91 98765 43211', type: 'Pool + Lunch', date: '2026-03-10', adults: 2, children: 1, total: 14000, status: 'Expired', notes: 'No-show', createdAt: '2026-03-08T07:45:00Z' },
];

// ---------------------------------------------------------------------------
// Status colours
// ---------------------------------------------------------------------------
const statusColors: Record<string, string> = {
  Confirmed: 'bg-emerald-500/20 text-emerald-400',
  Pending: 'bg-amber-500/20 text-amber-400',
  Used: 'bg-blue-500/20 text-blue-400',
  Cancelled: 'bg-red-500/20 text-red-400',
  Expired: 'bg-gray-500/20 text-gray-400',
};

const fmt = (n: number) => `LKR ${n.toLocaleString()}`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function AdminPoolTickets() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [tickets, setTickets] = useState<PoolTicket[]>(sampleTickets);
  const [viewingTicket, setViewingTicket] = useState<PoolTicket | null>(null);
  const [editingTicket, setEditingTicket] = useState<PoolTicket | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTicket, setNewTicket] = useState({ guest: '', email: '', phone: '', type: 'Pool Access' as TicketType, date: '', adults: 1, children: 0, notes: '' });

  // Derived stats
  const todayStr = new Date().toISOString().split('T')[0];
  const todayTickets = tickets.filter(t => t.date === todayStr && t.status !== 'Cancelled').length;
  const todayGuests = tickets.filter(t => t.date === todayStr && t.status !== 'Cancelled').reduce((s, t) => s + t.adults + t.children, 0);
  const totalRevenue = tickets.filter(t => t.status !== 'Cancelled').reduce((s, t) => s + t.total, 0);

  // Filters
  const filtered = tickets.filter(t => {
    const q = search.toLowerCase();
    const matchesSearch = t.guest.toLowerCase().includes(q) || t.id.toLowerCase().includes(q) || t.email.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchesType = typeFilter === 'All' || t.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleStatusChange = (id: string, newStatus: TicketStatus) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const handleAddTicket = () => {
    const tier = pricingTiers.find(p => p.label === newTicket.type)!;
    const total = (newTicket.adults * tier.adultPrice) + (newTicket.children * tier.childPrice);
    const ticket: PoolTicket = {
      id: `PT-${String(tickets.length + 1).padStart(3, '0')}`,
      guest: newTicket.guest,
      email: newTicket.email,
      phone: newTicket.phone,
      type: newTicket.type,
      date: newTicket.date,
      adults: newTicket.adults,
      children: newTicket.children,
      total,
      status: 'Confirmed',
      notes: newTicket.notes,
      createdAt: new Date().toISOString(),
    };
    setTickets(prev => [ticket, ...prev]);
    setShowAddModal(false);
    setNewTicket({ guest: '', email: '', phone: '', type: 'Pool Access', date: '', adults: 1, children: 0, notes: '' });
  };

  const exportCSV = () => {
    const headers = ['Ticket ID', 'Guest', 'Email', 'Phone', 'Type', 'Date', 'Adults', 'Children', 'Total (LKR)', 'Status', 'Notes', 'Created'];
    const rows = filtered.map(t => [t.id, t.guest, t.email, t.phone, t.type, t.date, t.adults, t.children, t.total, t.status, t.notes, t.createdAt]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pool-tickets-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* ── Pricing Tiers ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {pricingTiers.map(tier => (
          <div key={tier.label} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-lg mb-1">{tier.icon}</p>
            <p className="text-white font-semibold text-sm">{tier.label}</p>
            <p className="text-gray-500 text-xs mb-2">{tier.description}</p>
            <div className="flex gap-3 text-xs">
              <span className="text-amber-400">Adult: {fmt(tier.adultPrice)}</span>
              <span className="text-gray-400">Child: {fmt(tier.childPrice)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Summary Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-500/20"><Ticket className="h-5 w-5 text-blue-400" /></div>
            <div><p className="text-2xl font-bold text-white">{todayTickets}</p><p className="text-xs text-gray-400">Today's Tickets</p></div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/20"><Users className="h-5 w-5 text-amber-400" /></div>
            <div><p className="text-2xl font-bold text-white">{todayGuests}</p><p className="text-xs text-gray-400">Today's Guests</p></div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-500/20"><DollarSign className="h-5 w-5 text-emerald-400" /></div>
            <div><p className="text-2xl font-bold text-white">{fmt(totalRevenue)}</p><p className="text-xs text-gray-400">Total Revenue</p></div>
          </div>
        </div>
      </div>

      {/* ── Search, Filters & Actions ── */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, ID, email…" className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowAddModal(true)} className="px-3 py-2 rounded-lg text-xs font-medium bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1.5 transition-colors"><Plus className="h-3.5 w-3.5" /> New Ticket</button>
            <button onClick={exportCSV} className="px-3 py-2 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition-colors"><Download className="h-3.5 w-3.5" /> Export CSV</button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-gray-500 mr-1">Status:</span>
          {['All', 'Confirmed', 'Pending', 'Used', 'Cancelled', 'Expired'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${statusFilter === s ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'}`}>{s}</button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-gray-500 mr-1">Type:</span>
          {['All', 'Pool Access', 'Day-Out Package', 'Pool + Lunch', 'Pool + Dinner'].map(s => (
            <button key={s} onClick={() => setTypeFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${typeFilter === s ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="text-left px-4 py-3 font-medium">ID</th>
              <th className="text-left px-4 py-3 font-medium">Guest</th>
              <th className="text-left px-4 py-3 font-medium">Type</th>
              <th className="text-left px-4 py-3 font-medium">Date</th>
              <th className="text-center px-4 py-3 font-medium">Adults</th>
              <th className="text-center px-4 py-3 font-medium">Children</th>
              <th className="text-right px-4 py-3 font-medium">Total</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-center px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filtered.map(t => (
              <tr key={t.id} className="hover:bg-gray-700/30 transition-colors">
                <td className="px-4 py-3 text-amber-400 font-mono text-xs">{t.id}</td>
                <td className="px-4 py-3">
                  <p className="text-white">{t.guest}</p>
                  <p className="text-gray-500 text-xs">{t.phone}</p>
                </td>
                <td className="px-4 py-3 text-gray-300">{t.type}</td>
                <td className="px-4 py-3 text-gray-300">{t.date}</td>
                <td className="px-4 py-3 text-gray-300 text-center">{t.adults}</td>
                <td className="px-4 py-3 text-gray-300 text-center">{t.children}</td>
                <td className="px-4 py-3 text-white font-medium text-right">{fmt(t.total)}</td>
                <td className="px-4 py-3"><span className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusColors[t.status]}`}>{t.status}</span></td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1.5">
                    <button onClick={() => setViewingTicket(t)} className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors" aria-label={`View ticket ${t.id}`}><Eye className="h-3.5 w-3.5" /></button>
                    <button onClick={() => setEditingTicket(t)} className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors" aria-label={`Edit ticket ${t.id}`}><Edit3 className="h-3.5 w-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="py-12 text-center text-gray-500 text-sm">No tickets match your filters.</div>}
      </div>

      <p className="text-xs text-gray-600 text-right">{filtered.length} of {tickets.length} tickets shown</p>

      {/* ── View Ticket Modal ── */}
      {viewingTicket && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl max-w-md w-full border border-gray-700 shadow-xl">
            <div className="p-5 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Ticket {viewingTicket.id}</h3>
              <button onClick={() => setViewingTicket(null)} className="text-gray-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-500 mb-0.5">Guest</p><p className="text-white text-sm">{viewingTicket.guest}</p></div>
                <div><p className="text-xs text-gray-500 mb-0.5">Email</p><p className="text-white text-sm break-all">{viewingTicket.email}</p></div>
                <div><p className="text-xs text-gray-500 mb-0.5">Phone</p><p className="text-white text-sm">{viewingTicket.phone}</p></div>
                <div><p className="text-xs text-gray-500 mb-0.5">Type</p><p className="text-white text-sm">{viewingTicket.type}</p></div>
                <div><p className="text-xs text-gray-500 mb-0.5">Date</p><p className="text-white text-sm">{viewingTicket.date}</p></div>
                <div><p className="text-xs text-gray-500 mb-0.5">Guests</p><p className="text-white text-sm">{viewingTicket.adults} Adults, {viewingTicket.children} Children</p></div>
              </div>
              <div className="border-t border-gray-700 pt-4 flex justify-between items-center">
                <div><p className="text-xs text-gray-500 mb-0.5">Total</p><p className="text-amber-400 text-sm font-bold">{fmt(viewingTicket.total)}</p></div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[viewingTicket.status]}`}>{viewingTicket.status}</span>
              </div>
              {viewingTicket.notes && (
                <div className="border-t border-gray-700 pt-4"><p className="text-xs text-gray-500 mb-1">Notes</p><p className="text-gray-300 text-sm bg-gray-700/50 rounded-lg p-3">{viewingTicket.notes}</p></div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Ticket Modal ── */}
      {editingTicket && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl max-w-md w-full border border-gray-700 shadow-xl">
            <div className="p-5 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Edit {editingTicket.id}</h3>
              <button onClick={() => setEditingTicket(null)} className="text-gray-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-5 space-y-5">
              <div className="bg-gray-700/40 rounded-xl p-4 space-y-1 text-sm">
                <p className="text-white font-medium">{editingTicket.guest}</p>
                <p className="text-gray-400">{editingTicket.type} · {editingTicket.date} · {editingTicket.adults}A {editingTicket.children}C</p>
                <p className="text-amber-400 font-medium">{fmt(editingTicket.total)}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Change Status</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Confirmed', 'Pending', 'Used', 'Cancelled', 'Expired'] as TicketStatus[]).map(s => (
                    <button key={s} onClick={() => { handleStatusChange(editingTicket.id, s); setEditingTicket({ ...editingTicket, status: s }); }} className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${editingTicket.status === s ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'}`}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Ticket Modal ── */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl max-w-md w-full border border-gray-700 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-700 flex justify-between items-center sticky top-0 bg-gray-800 rounded-t-2xl z-10">
              <h3 className="text-lg font-bold text-white">New Pool Ticket</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Guest Name *</label>
                <input type="text" value={newTicket.guest} onChange={e => setNewTicket(p => ({ ...p, guest: e.target.value }))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Email *</label>
                  <input type="email" value={newTicket.email} onChange={e => setNewTicket(p => ({ ...p, email: e.target.value }))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Phone *</label>
                  <input type="tel" value={newTicket.phone} onChange={e => setNewTicket(p => ({ ...p, phone: e.target.value }))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Package Type *</label>
                  <select value={newTicket.type} onChange={e => setNewTicket(p => ({ ...p, type: e.target.value as TicketType }))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none">
                    {pricingTiers.map(t => <option key={t.label} value={t.label}>{t.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Date *</label>
                  <input type="date" value={newTicket.date} onChange={e => setNewTicket(p => ({ ...p, date: e.target.value }))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Adults</label>
                  <input type="number" min={1} max={20} value={newTicket.adults} onChange={e => setNewTicket(p => ({ ...p, adults: parseInt(e.target.value) || 1 }))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Children</label>
                  <input type="number" min={0} max={20} value={newTicket.children} onChange={e => setNewTicket(p => ({ ...p, children: parseInt(e.target.value) || 0 }))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Notes</label>
                <textarea value={newTicket.notes} onChange={e => setNewTicket(p => ({ ...p, notes: e.target.value }))} rows={2} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none resize-none" />
              </div>
              {/* Live Price Preview */}
              {(() => {
                const tier = pricingTiers.find(p => p.label === newTicket.type);
                const total = tier ? (newTicket.adults * tier.adultPrice) + (newTicket.children * tier.childPrice) : 0;
                return (
                  <div className="bg-gray-700/40 rounded-lg p-3 text-sm">
                    <p className="text-gray-400">Estimated Total: <span className="text-amber-400 font-bold">{fmt(total)}</span></p>
                  </div>
                );
              })()}
              <button onClick={handleAddTicket} disabled={!newTicket.guest || !newTicket.email || !newTicket.date} className="w-full py-3 rounded-xl text-sm font-semibold bg-amber-600 hover:bg-amber-700 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed">Create Ticket</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
