import { useState } from 'react';
import { Search, Download, Edit3, X, Eye, CreditCard, DollarSign, CalendarCheck, AlertCircle } from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type BookingStatus = 'Confirmed' | 'Pending' | 'Checked In' | 'Checked Out' | 'Cancelled';
type PaymentStatus = 'Pending' | 'Received' | 'Partial' | 'Overdue' | 'Refunded';

interface Booking {
  id: string;
  guest: string;
  email: string;
  phone: string;
  country: string;
  idPassport: string;
  room: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  arrivalTime: string;
  specialRequests: string;
  total: number;
  advanceAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Sample data — will be replaced by eZee PMS / localStorage data
// ---------------------------------------------------------------------------
const sampleBookings: Booking[] = [
  { id: 'BK-7H4KP', guest: 'John Smith', email: 'john@example.com', phone: '+44 7700 900001', country: 'United Kingdom', idPassport: 'GB123456789', room: 'Lagoon View King', checkIn: '2026-03-15', checkOut: '2026-03-18', nights: 3, arrivalTime: '14:00–16:00', specialRequests: 'Late check-out if possible', total: 43125, advanceAmount: 12938, status: 'Confirmed', paymentStatus: 'Received', createdAt: '2026-03-01T10:30:00Z' },
  { id: 'BK-9M2NR', guest: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1 555-0101', country: 'USA', idPassport: 'US987654321', room: 'Family Suite', checkIn: '2026-03-16', checkOut: '2026-03-20', nights: 4, arrivalTime: '16:00–18:00', specialRequests: 'Extra bed for child', total: 85100, advanceAmount: 25530, status: 'Pending', paymentStatus: 'Pending', createdAt: '2026-03-02T14:15:00Z' },
  { id: 'BK-3F8QT', guest: 'Michael Chen', email: 'michael@example.com', phone: '+86 138-0000-0001', country: 'China', idPassport: 'CN456789012', room: 'Garden Twin', checkIn: '2026-03-14', checkOut: '2026-03-17', nights: 3, arrivalTime: '14:00–16:00', specialRequests: '', total: 36225, advanceAmount: 10868, status: 'Checked In', paymentStatus: 'Received', createdAt: '2026-02-28T09:45:00Z' },
  { id: 'BK-5W1YL', guest: 'Emma Wilson', email: 'emma@example.com', phone: '+61 400 000 001', country: 'Australia', idPassport: 'AU321654987', room: 'Poolside Deluxe', checkIn: '2026-03-10', checkOut: '2026-03-12', nights: 2, arrivalTime: '18:00–20:00', specialRequests: 'Vegetarian meal options', total: 33350, advanceAmount: 10005, status: 'Checked Out', paymentStatus: 'Received', createdAt: '2026-02-25T16:20:00Z' },
  { id: 'BK-6P4ZD', guest: 'David Lee', email: 'david@example.com', phone: '+65 9000 0001', country: 'Singapore', idPassport: 'SG654321098', room: 'Lagoon View King', checkIn: '2026-03-19', checkOut: '2026-03-22', nights: 3, arrivalTime: '14:00–16:00', specialRequests: '', total: 43125, advanceAmount: 12938, status: 'Cancelled', paymentStatus: 'Refunded', createdAt: '2026-03-03T11:00:00Z' },
  { id: 'BK-2K7VB', guest: 'Sophie Martin', email: 'sophie@example.com', phone: '+33 6 00 00 00 01', country: 'France', idPassport: 'FR789012345', room: 'Family Suite', checkIn: '2026-03-20', checkOut: '2026-03-25', nights: 5, arrivalTime: '20:00+', specialRequests: 'Airport transfer needed', total: 106375, advanceAmount: 31913, status: 'Confirmed', paymentStatus: 'Partial', createdAt: '2026-03-04T08:10:00Z' },
  { id: 'BK-8J3XC', guest: 'Raj Patel', email: 'raj.patel@example.com', phone: '+91 98765 43210', country: 'India', idPassport: 'IN543210987', room: 'Garden Twin', checkIn: '2026-03-22', checkOut: '2026-03-24', nights: 2, arrivalTime: '12:00–14:00', specialRequests: 'Early check-in', total: 24150, advanceAmount: 7245, status: 'Pending', paymentStatus: 'Overdue', createdAt: '2026-02-20T13:40:00Z' },
  { id: 'BK-4R9GA', guest: 'Anna Müller', email: 'anna.m@example.com', phone: '+49 170 0000001', country: 'Germany', idPassport: 'DE876543210', room: 'Poolside Deluxe', checkIn: '2026-03-25', checkOut: '2026-03-29', nights: 4, arrivalTime: '14:00–16:00', specialRequests: 'Honeymoon decoration', total: 66700, advanceAmount: 20010, status: 'Confirmed', paymentStatus: 'Received', createdAt: '2026-03-05T19:55:00Z' },
];

// ---------------------------------------------------------------------------
// Status colour maps
// ---------------------------------------------------------------------------
const statusColors: Record<string, string> = {
  Confirmed: 'bg-emerald-500/20 text-emerald-400',
  Pending: 'bg-amber-500/20 text-amber-400',
  'Checked In': 'bg-blue-500/20 text-blue-400',
  'Checked Out': 'bg-gray-500/20 text-gray-400',
  Cancelled: 'bg-red-500/20 text-red-400',
};

const paymentColors: Record<string, string> = {
  Received: 'bg-emerald-500/20 text-emerald-400',
  Pending: 'bg-amber-500/20 text-amber-400',
  Partial: 'bg-blue-500/20 text-blue-400',
  Overdue: 'bg-red-500/20 text-red-400',
  Refunded: 'bg-purple-500/20 text-purple-400',
};

const fmt = (n: number) => `LKR ${n.toLocaleString()}`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function AdminBookings() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [bookings, setBookings] = useState<Booking[]>(sampleBookings);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [viewingBooking, setViewingBooking] = useState<Booking | null>(null);

  // ── Derived stats ──
  const totalRevenue = bookings.reduce((s, b) => b.status !== 'Cancelled' ? s + b.total : s, 0);
  const totalAdvanceReceived = bookings.reduce((s, b) => b.paymentStatus === 'Received' || b.paymentStatus === 'Partial' ? s + b.advanceAmount : s, 0);
  const pendingPayments = bookings.filter(b => b.paymentStatus === 'Pending' || b.paymentStatus === 'Overdue').length;

  // ── Filters ──
  const filtered = bookings.filter(b => {
    const q = search.toLowerCase();
    const matchesSearch = b.guest.toLowerCase().includes(q) || b.id.toLowerCase().includes(q) || b.email.toLowerCase().includes(q) || b.phone.includes(q);
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    const matchesPayment = paymentFilter === 'All' || b.paymentStatus === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  // ── Handlers ──
  const handleStatusChange = (id: string, newStatus: BookingStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const handlePaymentChange = (id: string, newPayment: PaymentStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, paymentStatus: newPayment } : b));
  };

  const exportCSV = () => {
    const headers = ['Booking Ref', 'Guest', 'Email', 'Phone', 'Country', 'ID/Passport', 'Room', 'Check-in', 'Check-out', 'Nights', 'Arrival Time', 'Total (LKR)', 'Advance (LKR)', 'Booking Status', 'Payment Status', 'Special Requests', 'Created'];
    const rows = filtered.map(b => [b.id, b.guest, b.email, b.phone, b.country, b.idPassport, b.room, b.checkIn, b.checkOut, b.nights, b.arrivalTime, b.total, b.advanceAmount, b.status, b.paymentStatus, b.specialRequests, b.createdAt]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-500/20"><CalendarCheck className="h-5 w-5 text-blue-400" /></div>
            <div><p className="text-2xl font-bold text-white">{bookings.length}</p><p className="text-xs text-gray-400">Total Bookings</p></div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-500/20"><DollarSign className="h-5 w-5 text-emerald-400" /></div>
            <div><p className="text-2xl font-bold text-white">{fmt(totalRevenue)}</p><p className="text-xs text-gray-400">Total Revenue</p></div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/20"><CreditCard className="h-5 w-5 text-amber-400" /></div>
            <div><p className="text-2xl font-bold text-white">{fmt(totalAdvanceReceived)}</p><p className="text-xs text-gray-400">Advance Collected</p></div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-red-500/20"><AlertCircle className="h-5 w-5 text-red-400" /></div>
            <div><p className="text-2xl font-bold text-white">{pendingPayments}</p><p className="text-xs text-gray-400">Payments Due</p></div>
          </div>
        </div>
      </div>

      {/* ── Search & Filters ── */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, ref, email, phone…" className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
          </div>
          <button onClick={exportCSV} className="px-3 py-2 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition-colors">
            <Download className="h-3.5 w-3.5" /> Export CSV
          </button>
        </div>

        {/* Booking status filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-gray-500 mr-1">Booking:</span>
          {['All', 'Confirmed', 'Pending', 'Checked In', 'Checked Out', 'Cancelled'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${statusFilter === s ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'}`}>{s}</button>
          ))}
        </div>

        {/* Payment status filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-gray-500 mr-1">Payment:</span>
          {['All', 'Received', 'Pending', 'Partial', 'Overdue', 'Refunded'].map(s => (
            <button key={s} onClick={() => setPaymentFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${paymentFilter === s ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-x-auto">
        <table className="w-full text-sm min-w-[1000px]">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="text-left px-4 py-3 font-medium">Ref</th>
              <th className="text-left px-4 py-3 font-medium">Guest</th>
              <th className="text-left px-4 py-3 font-medium">Room</th>
              <th className="text-left px-4 py-3 font-medium">Check-in</th>
              <th className="text-left px-4 py-3 font-medium">Check-out</th>
              <th className="text-center px-4 py-3 font-medium">Nights</th>
              <th className="text-right px-4 py-3 font-medium">Total</th>
              <th className="text-right px-4 py-3 font-medium">Advance</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-left px-4 py-3 font-medium">Payment</th>
              <th className="text-center px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filtered.map(b => (
              <tr key={b.id} className="hover:bg-gray-700/30 transition-colors">
                <td className="px-4 py-3 text-amber-400 font-mono text-xs">{b.id}</td>
                <td className="px-4 py-3">
                  <p className="text-white">{b.guest}</p>
                  <p className="text-gray-500 text-xs">{b.email}</p>
                </td>
                <td className="px-4 py-3 text-gray-300">{b.room}</td>
                <td className="px-4 py-3 text-gray-300">{b.checkIn}</td>
                <td className="px-4 py-3 text-gray-300">{b.checkOut}</td>
                <td className="px-4 py-3 text-gray-300 text-center">{b.nights}</td>
                <td className="px-4 py-3 text-white font-medium text-right">{fmt(b.total)}</td>
                <td className="px-4 py-3 text-gray-300 text-right">{fmt(b.advanceAmount)}</td>
                <td className="px-4 py-3"><span className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusColors[b.status]}`}>{b.status}</span></td>
                <td className="px-4 py-3"><span className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${paymentColors[b.paymentStatus]}`}>{b.paymentStatus}</span></td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1.5">
                    <button onClick={() => setViewingBooking(b)} className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors" aria-label={`View booking ${b.id}`}><Eye className="h-3.5 w-3.5" /></button>
                    <button onClick={() => setEditingBooking(b)} className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors" aria-label={`Edit booking ${b.id}`}><Edit3 className="h-3.5 w-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="py-12 text-center text-gray-500 text-sm">No bookings match your filters.</div>}
      </div>

      <p className="text-xs text-gray-600 text-right">{filtered.length} of {bookings.length} bookings shown</p>

      {/* ── View Booking Detail Modal ── */}
      {viewingBooking && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl max-w-lg w-full border border-gray-700 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-700 flex justify-between items-center sticky top-0 bg-gray-800 rounded-t-2xl z-10">
              <h3 className="text-lg font-bold text-white">Booking {viewingBooking.id}</h3>
              <button onClick={() => setViewingBooking(null)} className="text-gray-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-500 mb-0.5">Guest</p><p className="text-white text-sm">{viewingBooking.guest}</p></div>
                <div><p className="text-xs text-gray-500 mb-0.5">Country</p><p className="text-white text-sm">{viewingBooking.country}</p></div>
                <div><p className="text-xs text-gray-500 mb-0.5">Email</p><p className="text-white text-sm break-all">{viewingBooking.email}</p></div>
                <div><p className="text-xs text-gray-500 mb-0.5">Phone</p><p className="text-white text-sm">{viewingBooking.phone}</p></div>
                <div><p className="text-xs text-gray-500 mb-0.5">ID / Passport</p><p className="text-white text-sm">{viewingBooking.idPassport || '—'}</p></div>
                <div><p className="text-xs text-gray-500 mb-0.5">Arrival Time</p><p className="text-white text-sm">{viewingBooking.arrivalTime || '—'}</p></div>
              </div>

              <div className="border-t border-gray-700 pt-4 grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-500 mb-0.5">Room</p><p className="text-white text-sm">{viewingBooking.room}</p></div>
                <div><p className="text-xs text-gray-500 mb-0.5">Dates</p><p className="text-white text-sm">{viewingBooking.checkIn} → {viewingBooking.checkOut}</p></div>
                <div><p className="text-xs text-gray-500 mb-0.5">Nights</p><p className="text-white text-sm">{viewingBooking.nights}</p></div>
                <div><p className="text-xs text-gray-500 mb-0.5">Booked On</p><p className="text-white text-sm">{new Date(viewingBooking.createdAt).toLocaleDateString()}</p></div>
              </div>

              <div className="border-t border-gray-700 pt-4 grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-500 mb-0.5">Total</p><p className="text-white text-sm font-bold">{fmt(viewingBooking.total)}</p></div>
                <div><p className="text-xs text-gray-500 mb-0.5">Advance (30%)</p><p className="text-amber-400 text-sm font-bold">{fmt(viewingBooking.advanceAmount)}</p></div>
                <div><p className="text-xs text-gray-500 mb-0.5">Balance Due</p><p className="text-white text-sm">{fmt(viewingBooking.total - viewingBooking.advanceAmount)}</p></div>
              </div>

              <div className="border-t border-gray-700 pt-4 flex gap-3">
                <div><p className="text-xs text-gray-500 mb-1">Booking Status</p><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[viewingBooking.status]}`}>{viewingBooking.status}</span></div>
                <div><p className="text-xs text-gray-500 mb-1">Payment Status</p><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${paymentColors[viewingBooking.paymentStatus]}`}>{viewingBooking.paymentStatus}</span></div>
              </div>

              {viewingBooking.specialRequests && (
                <div className="border-t border-gray-700 pt-4">
                  <p className="text-xs text-gray-500 mb-1">Special Requests</p>
                  <p className="text-gray-300 text-sm bg-gray-700/50 rounded-lg p-3">{viewingBooking.specialRequests}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Booking Modal ── */}
      {editingBooking && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl max-w-md w-full border border-gray-700 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-700 flex justify-between items-center sticky top-0 bg-gray-800 rounded-t-2xl z-10">
              <h3 className="text-lg font-bold text-white">Edit {editingBooking.id}</h3>
              <button onClick={() => setEditingBooking(null)} className="text-gray-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-5 space-y-5">
              {/* Summary */}
              <div className="bg-gray-700/40 rounded-xl p-4 space-y-1 text-sm">
                <p className="text-white font-medium">{editingBooking.guest} · {editingBooking.country}</p>
                <p className="text-gray-400">{editingBooking.room} · {editingBooking.checkIn} → {editingBooking.checkOut} ({editingBooking.nights}N)</p>
                <p className="text-gray-400">{editingBooking.email} · {editingBooking.phone}</p>
                <p className="text-amber-400 font-medium">{fmt(editingBooking.total)} total · {fmt(editingBooking.advanceAmount)} advance</p>
              </div>

              {/* Booking Status */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Booking Status</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Confirmed', 'Pending', 'Checked In', 'Checked Out', 'Cancelled'] as BookingStatus[]).map(s => (
                    <button key={s} onClick={() => { handleStatusChange(editingBooking.id, s); setEditingBooking({ ...editingBooking, status: s }); }} className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${editingBooking.status === s ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'}`}>{s}</button>
                  ))}
                </div>
              </div>

              {/* Payment Status */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Payment Status</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Pending', 'Received', 'Partial', 'Overdue', 'Refunded'] as PaymentStatus[]).map(s => (
                    <button key={s} onClick={() => { handlePaymentChange(editingBooking.id, s); setEditingBooking({ ...editingBooking, paymentStatus: s }); }} className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${editingBooking.paymentStatus === s ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'}`}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
