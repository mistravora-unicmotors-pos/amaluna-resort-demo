import { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, BedDouble, Users, DollarSign } from 'lucide-react';

const reportTypes = [
  { id: 'revenue', label: 'Revenue', icon: DollarSign },
  { id: 'occupancy', label: 'Occupancy', icon: BedDouble },
  { id: 'guests', label: 'Guests', icon: Users },
  { id: 'bookings', label: 'Bookings', icon: TrendingUp },
];

const revenueData = [
  { month: 'Jan', rooms: 18500, dining: 4200, events: 1800, total: 24500 },
  { month: 'Feb', rooms: 21200, dining: 4800, events: 2200, total: 28200 },
  { month: 'Mar', rooms: 24800, dining: 5600, events: 3100, total: 33500 },
  { month: 'Apr', rooms: 19600, dining: 4100, events: 1500, total: 25200 },
  { month: 'May', rooms: 16300, dining: 3400, events: 1200, total: 20900 },
  { month: 'Jun', rooms: 22100, dining: 5200, events: 2800, total: 30100 },
];

const occupancyData = [
  { room: 'Deluxe Double', capacity: 4, occupied: 3, rate: 75 },
  { room: 'Superior Twin', capacity: 3, occupied: 2, rate: 67 },
  { room: 'Family Suite', capacity: 2, occupied: 2, rate: 100 },
  { room: 'Premium King', capacity: 3, occupied: 2, rate: 67 },
  { room: 'Standard Room', capacity: 5, occupied: 3, rate: 60 },
];

const savedReports = [
  { name: 'Monthly Revenue - Q1 2026', date: '2026-03-01', type: 'revenue' },
  { name: 'Occupancy Report - Feb 2026', date: '2026-02-28', type: 'occupancy' },
  { name: 'Guest Demographics - Q4 2025', date: '2025-12-31', type: 'guests' },
];

export default function AdminReports() {
  const [activeReport, setActiveReport] = useState('revenue');
  const [dateRange, setDateRange] = useState('q1-2026');

  const handleExport = () => {
    const headers = activeReport === 'revenue'
      ? ['Month', 'Rooms', 'Dining', 'Events', 'Total']
      : ['Room', 'Capacity', 'Occupied', 'Rate (%)'];
    const rows = activeReport === 'revenue'
      ? revenueData.map(r => [r.month, r.rooms, r.dining, r.events, r.total].join(','))
      : occupancyData.map(r => [r.room, r.capacity, r.occupied, r.rate].join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeReport}-report.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Report Type Selector */}
      <div className="flex flex-wrap gap-3">
        {reportTypes.map(rt => (
          <button
            key={rt.id}
            onClick={() => setActiveReport(rt.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeReport === rt.id
                ? 'bg-amber-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
            }`}
          >
            <rt.icon className="h-4 w-4" />
            {rt.label}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <select
            value={dateRange}
            onChange={e => setDateRange(e.target.value)}
            className="bg-transparent text-white text-sm outline-none"
          >
            <option value="q1-2026">Q1 2026</option>
            <option value="q4-2025">Q4 2025</option>
            <option value="q3-2025">Q3 2025</option>
            <option value="2025">Full Year 2025</option>
          </select>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      {/* Revenue Report */}
      {activeReport === 'revenue' && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-5 border-b border-gray-700">
            <h3 className="text-white font-heading font-bold">Revenue Breakdown</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-400 font-medium px-5 py-3">Month</th>
                  <th className="text-right text-gray-400 font-medium px-5 py-3">Rooms ($)</th>
                  <th className="text-right text-gray-400 font-medium px-5 py-3">Dining ($)</th>
                  <th className="text-right text-gray-400 font-medium px-5 py-3">Events ($)</th>
                  <th className="text-right text-gray-400 font-medium px-5 py-3">Total ($)</th>
                </tr>
              </thead>
              <tbody>
                {revenueData.map(row => (
                  <tr key={row.month} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                    <td className="px-5 py-3 text-white font-medium">{row.month}</td>
                    <td className="px-5 py-3 text-gray-300 text-right">{row.rooms.toLocaleString()}</td>
                    <td className="px-5 py-3 text-gray-300 text-right">{row.dining.toLocaleString()}</td>
                    <td className="px-5 py-3 text-gray-300 text-right">{row.events.toLocaleString()}</td>
                    <td className="px-5 py-3 text-white font-medium text-right">{row.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Occupancy Report */}
      {activeReport === 'occupancy' && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-5 border-b border-gray-700">
            <h3 className="text-white font-heading font-bold">Room Occupancy</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-400 font-medium px-5 py-3">Room Type</th>
                  <th className="text-center text-gray-400 font-medium px-5 py-3">Total</th>
                  <th className="text-center text-gray-400 font-medium px-5 py-3">Occupied</th>
                  <th className="text-right text-gray-400 font-medium px-5 py-3">Rate</th>
                </tr>
              </thead>
              <tbody>
                {occupancyData.map(row => (
                  <tr key={row.room} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                    <td className="px-5 py-3 text-white font-medium">{row.room}</td>
                    <td className="px-5 py-3 text-gray-300 text-center">{row.capacity}</td>
                    <td className="px-5 py-3 text-gray-300 text-center">{row.occupied}</td>
                    <td className="px-5 py-3 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        row.rate >= 80 ? 'bg-emerald-500/20 text-emerald-400' :
                        row.rate >= 60 ? 'bg-amber-500/20 text-amber-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {row.rate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Guests / Bookings placeholder */}
      {(activeReport === 'guests' || activeReport === 'bookings') && (
        <div className="bg-gray-800 rounded-xl border border-dashed border-gray-600 p-10 text-center">
          <FileText className="h-10 w-10 text-gray-500 mx-auto mb-3" />
          <h3 className="text-white font-heading font-bold mb-1">
            {activeReport === 'guests' ? 'Guest Reports' : 'Booking Reports'}
          </h3>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Connect your property management system to generate detailed {activeReport} reports with real guest and reservation data.
          </p>
        </div>
      )}

      {/* Saved Reports */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
        <h3 className="text-white font-heading font-bold mb-4">Saved Reports</h3>
        <div className="space-y-2">
          {savedReports.map(r => (
            <div key={r.name} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-white text-sm font-medium">{r.name}</p>
                  <p className="text-gray-500 text-xs">{r.date}</p>
                </div>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300 capitalize">{r.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
