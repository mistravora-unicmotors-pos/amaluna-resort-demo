
import { CalendarCheck, DollarSign, BedDouble, MessageSquare, TrendingUp, Users, ArrowUpRight, ArrowDownRight, Star } from 'lucide-react';

const stats = [
  { label: 'Total Bookings', value: '156', change: '+12%', up: true, icon: CalendarCheck, color: 'bg-blue-500/20 text-blue-400' },
  { label: 'Revenue (LKR)', value: '2.4M', change: '+8%', up: true, icon: DollarSign, color: 'bg-emerald-500/20 text-emerald-400' },
  { label: 'Occupancy Rate', value: '78%', change: '+5%', up: true, icon: BedDouble, color: 'bg-amber-500/20 text-amber-400' },
  { label: 'New Inquiries', value: '34', change: '-3%', up: false, icon: MessageSquare, color: 'bg-purple-500/20 text-purple-400' },
];

const recentBookings = [
  { id: 'BK-001', guest: 'John Smith', room: 'Deluxe Ocean View', checkIn: '2025-02-15', status: 'Confirmed' },
  { id: 'BK-002', guest: 'Sarah Johnson', room: 'Premium Suite', checkIn: '2025-02-16', status: 'Pending' },
  { id: 'BK-003', guest: 'Michael Chen', room: 'Family Room', checkIn: '2025-02-17', status: 'Confirmed' },
  { id: 'BK-004', guest: 'Emma Wilson', room: 'Standard Double', checkIn: '2025-02-18', status: 'Cancelled' },
  { id: 'BK-005', guest: 'David Lee', room: 'Deluxe Ocean View', checkIn: '2025-02-19', status: 'Confirmed' },
];

const statusColors: Record<string, string> = {
  Confirmed: 'bg-emerald-500/20 text-emerald-400',
  Pending: 'bg-amber-500/20 text-amber-400',
  Cancelled: 'bg-red-500/20 text-red-400',
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="bg-gray-800 rounded-xl p-5 border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-lg ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <span className={`flex items-center text-xs font-medium ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>
                {stat.change}
                {stat.up ? <ArrowUpRight className="h-3 w-3 ml-0.5" /> : <ArrowDownRight className="h-3 w-3 ml-0.5" />}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-500/20">
            <TrendingUp className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Avg. Daily Rate</p>
            <p className="text-xl font-bold text-white">LKR 18,500</p>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-emerald-500/20">
            <Users className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Guests (Month)</p>
            <p className="text-xl font-bold text-white">312</p>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-amber-500/20">
            <Star className="h-6 w-6 text-amber-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Avg. Review Score</p>
            <p className="text-xl font-bold text-white">4.8 / 5</p>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="px-5 py-4 border-b border-gray-700">
          <h2 className="text-white font-heading font-bold">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="text-left px-5 py-3 font-medium">ID</th>
                <th className="text-left px-5 py-3 font-medium">Guest</th>
                <th className="text-left px-5 py-3 font-medium">Room</th>
                <th className="text-left px-5 py-3 font-medium">Check-in</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {recentBookings.map(b => (
                <tr key={b.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-5 py-3 text-gray-300 font-mono text-xs">{b.id}</td>
                  <td className="px-5 py-3 text-white">{b.guest}</td>
                  <td className="px-5 py-3 text-gray-300">{b.room}</td>
                  <td className="px-5 py-3 text-gray-300">{b.checkIn}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[b.status]}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* eZee PMS Integration Notice */}
      <div className="bg-gray-800/50 rounded-xl border border-dashed border-gray-600 p-6 text-center">
        <p className="text-gray-400 text-sm">
          📡 This dashboard will connect to <span className="text-amber-400 font-semibold">eZee PMS</span> for live data.
          Currently showing sample data.
        </p>
      </div>
    </div>
  );
}
