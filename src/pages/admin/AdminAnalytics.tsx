
import { TrendingUp, Users, Eye, Clock, Monitor, Smartphone, Tablet, Globe } from 'lucide-react';

const trafficStats = [
  { label: 'Page Views', value: '12,847', change: '+18.2%', icon: Eye, up: true },
  { label: 'Unique Visitors', value: '3,421', change: '+12.5%', icon: Users, up: true },
  { label: 'Avg. Session', value: '4m 32s', change: '+8.1%', icon: Clock, up: true },
  { label: 'Bounce Rate', value: '34.2%', change: '-5.3%', icon: TrendingUp, up: false },
];

const topPages = [
  { page: '/', label: 'Home', views: 4210, pct: 100 },
  { page: '/rooms', label: 'Rooms', views: 2835, pct: 67 },
  { page: '/dining', label: 'Dining', views: 1620, pct: 38 },
  { page: '/offers', label: 'Offers', views: 1340, pct: 32 },
  { page: '/gallery', label: 'Gallery', views: 980, pct: 23 },
  { page: '/contact', label: 'Contact', views: 870, pct: 21 },
  { page: '/location', label: 'Location', views: 540, pct: 13 },
  { page: '/about', label: 'About', views: 452, pct: 11 },
];

const devices = [
  { label: 'Desktop', pct: 42, icon: Monitor, color: 'bg-blue-500' },
  { label: 'Mobile', pct: 48, icon: Smartphone, color: 'bg-emerald-500' },
  { label: 'Tablet', pct: 10, icon: Tablet, color: 'bg-amber-500' },
];

const trafficSources = [
  { source: 'Organic Search', sessions: 1420, pct: 41 },
  { source: 'Direct', sessions: 890, pct: 26 },
  { source: 'Social Media', sessions: 560, pct: 16 },
  { source: 'Referral', sessions: 340, pct: 10 },
  { source: 'Email', sessions: 211, pct: 6 },
];

const conversionFunnel = [
  { step: 'Website Visit', value: 3421, pct: 100 },
  { step: 'Room Page Viewed', value: 2835, pct: 83 },
  { step: 'Booking Started', value: 412, pct: 12 },
  { step: 'Booking Completed', value: 87, pct: 2.5 },
];

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      {/* Traffic Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {trafficStats.map(stat => (
          <div key={stat.label} className="bg-gray-800 rounded-xl p-5 border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="h-5 w-5 text-gray-400" />
              <span className={`text-xs font-medium ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>{stat.change}</span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Pages */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 p-5">
          <h3 className="text-white font-heading font-bold mb-4">Top Pages</h3>
          <div className="space-y-3">
            {topPages.map(p => (
              <div key={p.page} className="flex items-center gap-3">
                <span className="text-gray-400 text-sm w-28 truncate">{p.label}</span>
                <div className="flex-1 bg-gray-700 rounded-full h-2.5">
                  <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${p.pct}%` }} />
                </div>
                <span className="text-white text-sm font-medium w-16 text-right">{p.views.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
          <h3 className="text-white font-heading font-bold mb-4">Devices</h3>
          <div className="space-y-4">
            {devices.map(d => (
              <div key={d.label} className="flex items-center gap-3">
                <d.icon className="h-5 w-5 text-gray-400" />
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{d.label}</span>
                    <span className="text-white font-medium">{d.pct}%</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-2">
                    <div className={`${d.color} h-2 rounded-full`} style={{ width: `${d.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
          <h3 className="text-white font-heading font-bold mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-gray-400" /> Traffic Sources
          </h3>
          <div className="space-y-3">
            {trafficSources.map(s => (
              <div key={s.source} className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">{s.source}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${s.pct}%` }} />
                  </div>
                  <span className="text-white text-sm font-medium w-12 text-right">{s.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Conversion Funnel */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
          <h3 className="text-white font-heading font-bold mb-4">Booking Funnel</h3>
          <div className="space-y-3">
            {conversionFunnel.map((step) => (
              <div key={step.step} className="relative">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{step.step}</span>
                  <span className="text-white font-medium">{step.value.toLocaleString()}</span>
                </div>
                <div className="bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full transition-all"
                    style={{ width: `${step.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Google Analytics Notice */}
      <div className="bg-gray-800 rounded-xl border border-dashed border-gray-600 p-6 text-center">
        <TrendingUp className="h-10 w-10 text-gray-500 mx-auto mb-3" />
        <h3 className="text-white font-heading font-bold mb-1">Google Analytics Integration</h3>
        <p className="text-gray-400 text-sm max-w-md mx-auto">
          Connect your Google Analytics 4 property to view real-time visitor data, acquisition reports, and behaviour flow directly in this dashboard.
        </p>
        <button className="mt-4 px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium transition-colors">
          Connect GA4
        </button>
      </div>
    </div>
  );
}
