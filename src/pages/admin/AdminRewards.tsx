import { useState } from 'react';
import { Search, Download, Edit3, X, Gift, TrendingUp, Users, Star, Eye, Plus, Minus } from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type MemberTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
type TransactionType = 'Earned' | 'Redeemed' | 'Expired' | 'Bonus' | 'Adjusted';

interface RewardMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: MemberTier;
  totalPoints: number;
  availablePoints: number;
  lifetimePoints: number;
  totalStays: number;
  joinedAt: string;
}

interface PointTransaction {
  id: string;
  memberId: string;
  memberName: string;
  type: TransactionType;
  points: number;
  description: string;
  date: string;
}

interface EarningRule {
  label: string;
  description: string;
  points: string;
  icon: string;
}

// ---------------------------------------------------------------------------
// Config — earning rules display
// ---------------------------------------------------------------------------
const earningRules: EarningRule[] = [
  { label: 'Room Booking', description: '1 point per LKR 100 spent on room bookings', points: '1pt / LKR 100', icon: '🛏️' },
  { label: 'Restaurant', description: '1 point per LKR 200 spent at restaurant', points: '1pt / LKR 200', icon: '🍽️' },
  { label: 'Pool Day-Out', description: '50 bonus points per pool/day-out ticket', points: '50pts flat', icon: '🏊' },
  { label: 'Referral Bonus', description: '500 points when a referred guest completes a stay', points: '500pts', icon: '🤝' },
  { label: 'Birthday Bonus', description: 'Double points on bookings during birthday month', points: '2× points', icon: '🎂' },
  { label: 'Review Bonus', description: '100 points for verified review on Google / TripAdvisor', points: '100pts', icon: '⭐' },
];

const tierConfig: Record<MemberTier, { min: number; color: string; bg: string }> = {
  Bronze: { min: 0, color: 'text-orange-400', bg: 'bg-orange-500/20' },
  Silver: { min: 1000, color: 'text-gray-300', bg: 'bg-gray-500/20' },
  Gold: { min: 5000, color: 'text-amber-400', bg: 'bg-amber-500/20' },
  Platinum: { min: 15000, color: 'text-purple-400', bg: 'bg-purple-500/20' },
};

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------
const sampleMembers: RewardMember[] = [
  { id: 'RM-001', name: 'John Smith', email: 'john@example.com', phone: '+44 7700 900001', tier: 'Gold', totalPoints: 7250, availablePoints: 5200, lifetimePoints: 12400, totalStays: 8, joinedAt: '2024-06-15' },
  { id: 'RM-002', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1 555-0101', tier: 'Platinum', totalPoints: 18300, availablePoints: 12100, lifetimePoints: 28500, totalStays: 15, joinedAt: '2023-11-20' },
  { id: 'RM-003', name: 'Nimal Perera', email: 'nimal@example.com', phone: '+94 77 123 4567', tier: 'Silver', totalPoints: 2800, availablePoints: 2100, lifetimePoints: 4200, totalStays: 4, joinedAt: '2025-02-10' },
  { id: 'RM-004', name: 'Emma Wilson', email: 'emma@example.com', phone: '+61 400 000 001', tier: 'Gold', totalPoints: 6100, availablePoints: 3900, lifetimePoints: 10800, totalStays: 6, joinedAt: '2024-08-05' },
  { id: 'RM-005', name: 'Raj Patel', email: 'raj.patel@example.com', phone: '+91 98765 43210', tier: 'Bronze', totalPoints: 450, availablePoints: 450, lifetimePoints: 450, totalStays: 1, joinedAt: '2026-01-20' },
  { id: 'RM-006', name: 'Sophie Martin', email: 'sophie@example.com', phone: '+33 6 00 00 00 01', tier: 'Silver', totalPoints: 3400, availablePoints: 1800, lifetimePoints: 5600, totalStays: 5, joinedAt: '2024-12-01' },
];

const sampleTransactions: PointTransaction[] = [
  { id: 'TX-001', memberId: 'RM-001', memberName: 'John Smith', type: 'Earned', points: 430, description: 'Room Booking BK-7H4KP', date: '2026-03-15' },
  { id: 'TX-002', memberId: 'RM-002', memberName: 'Sarah Johnson', type: 'Redeemed', points: 2000, description: 'Room upgrade redemption', date: '2026-03-14' },
  { id: 'TX-003', memberId: 'RM-003', memberName: 'Nimal Perera', type: 'Earned', points: 50, description: 'Pool Day-Out PT-001', date: '2026-03-15' },
  { id: 'TX-004', memberId: 'RM-004', memberName: 'Emma Wilson', type: 'Bonus', points: 500, description: 'Referral bonus — new guest booking', date: '2026-03-13' },
  { id: 'TX-005', memberId: 'RM-001', memberName: 'John Smith', type: 'Earned', points: 100, description: 'Google review bonus', date: '2026-03-10' },
  { id: 'TX-006', memberId: 'RM-006', memberName: 'Sophie Martin', type: 'Expired', points: 200, description: 'Points expired (12-month policy)', date: '2026-03-01' },
  { id: 'TX-007', memberId: 'RM-002', memberName: 'Sarah Johnson', type: 'Earned', points: 850, description: 'Room Booking BK-9M2NR', date: '2026-03-16' },
  { id: 'TX-008', memberId: 'RM-005', memberName: 'Raj Patel', type: 'Earned', points: 240, description: 'Room Booking BK-8J3XC', date: '2026-03-22' },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const txColors: Record<string, string> = {
  Earned: 'bg-emerald-500/20 text-emerald-400',
  Redeemed: 'bg-blue-500/20 text-blue-400',
  Expired: 'bg-red-500/20 text-red-400',
  Bonus: 'bg-purple-500/20 text-purple-400',
  Adjusted: 'bg-gray-500/20 text-gray-400',
};

const txSign: Record<string, string> = {
  Earned: '+', Redeemed: '−', Expired: '−', Bonus: '+', Adjusted: '±',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function AdminRewards() {
  const [tab, setTab] = useState<'members' | 'transactions' | 'rules'>('members');
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('All');
  const [members, setMembers] = useState<RewardMember[]>(sampleMembers);
  const [transactions] = useState<PointTransaction[]>(sampleTransactions);
  const [viewingMember, setViewingMember] = useState<RewardMember | null>(null);
  const [adjustingMember, setAdjustingMember] = useState<RewardMember | null>(null);
  const [adjustPoints, setAdjustPoints] = useState(0);
  const [adjustReason, setAdjustReason] = useState('');

  // Stats
  const totalMembers = members.length;
  const totalPointsCirculating = members.reduce((s, m) => s + m.availablePoints, 0);
  const avgPoints = totalMembers > 0 ? Math.round(totalPointsCirculating / totalMembers) : 0;

  // Filters
  const filteredMembers = members.filter(m => {
    const q = search.toLowerCase();
    const matchesSearch = m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q) || m.email.toLowerCase().includes(q);
    const matchesTier = tierFilter === 'All' || m.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const filteredTx = transactions.filter(t => {
    const q = search.toLowerCase();
    return t.memberName.toLowerCase().includes(q) || t.id.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
  });

  const handleAdjust = () => {
    if (!adjustingMember || adjustPoints === 0) return;
    setMembers(prev => prev.map(m => {
      if (m.id !== adjustingMember.id) return m;
      return {
        ...m,
        availablePoints: m.availablePoints + adjustPoints,
        totalPoints: m.totalPoints + adjustPoints,
        lifetimePoints: adjustPoints > 0 ? m.lifetimePoints + adjustPoints : m.lifetimePoints,
      };
    }));
    setAdjustingMember(null);
    setAdjustPoints(0);
    setAdjustReason('');
  };

  const exportCSV = () => {
    const headers = ['Member ID', 'Name', 'Email', 'Phone', 'Tier', 'Available Points', 'Lifetime Points', 'Total Stays', 'Joined'];
    const rows = filteredMembers.map(m => [m.id, m.name, m.email, m.phone, m.tier, m.availablePoints, m.lifetimePoints, m.totalStays, m.joinedAt]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rewards-members-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-500/20"><Users className="h-5 w-5 text-blue-400" /></div>
            <div><p className="text-2xl font-bold text-white">{totalMembers}</p><p className="text-xs text-gray-400">Total Members</p></div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/20"><Star className="h-5 w-5 text-amber-400" /></div>
            <div><p className="text-2xl font-bold text-white">{totalPointsCirculating.toLocaleString()}</p><p className="text-xs text-gray-400">Points in Circulation</p></div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-500/20"><TrendingUp className="h-5 w-5 text-emerald-400" /></div>
            <div><p className="text-2xl font-bold text-white">{avgPoints.toLocaleString()}</p><p className="text-xs text-gray-400">Avg Points / Member</p></div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-purple-500/20"><Gift className="h-5 w-5 text-purple-400" /></div>
            <div><p className="text-2xl font-bold text-white">{members.filter(m => m.tier === 'Gold' || m.tier === 'Platinum').length}</p><p className="text-xs text-gray-400">Gold+ Members</p></div>
          </div>
        </div>
      </div>

      {/* ── Tab Switch ── */}
      <div className="flex gap-2 border-b border-gray-700 pb-0">
        {(['members', 'transactions', 'rules'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px capitalize ${tab === t ? 'border-amber-500 text-amber-400' : 'border-transparent text-gray-400 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {/* ═══════════════════════ MEMBERS TAB ═══════════════════════ */}
      {tab === 'members' && (
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search members…" className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
            </div>
            <button onClick={exportCSV} className="px-3 py-2 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition-colors"><Download className="h-3.5 w-3.5" /> Export CSV</button>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-gray-500 mr-1">Tier:</span>
            {['All', 'Bronze', 'Silver', 'Gold', 'Platinum'].map(s => (
              <button key={s} onClick={() => setTierFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${tierFilter === s ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'}`}>{s}</button>
            ))}
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-x-auto">
            <table className="w-full text-sm min-w-[800px]">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="text-left px-4 py-3 font-medium">Member</th>
                  <th className="text-left px-4 py-3 font-medium">Tier</th>
                  <th className="text-right px-4 py-3 font-medium">Available</th>
                  <th className="text-right px-4 py-3 font-medium">Lifetime</th>
                  <th className="text-center px-4 py-3 font-medium">Stays</th>
                  <th className="text-left px-4 py-3 font-medium">Joined</th>
                  <th className="text-center px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredMembers.map(m => (
                  <tr key={m.id} className="hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-white">{m.name}</p>
                      <p className="text-gray-500 text-xs">{m.email}</p>
                    </td>
                    <td className="px-4 py-3"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${tierConfig[m.tier].bg} ${tierConfig[m.tier].color}`}>{m.tier}</span></td>
                    <td className="px-4 py-3 text-amber-400 font-medium text-right">{m.availablePoints.toLocaleString()}</td>
                    <td className="px-4 py-3 text-gray-300 text-right">{m.lifetimePoints.toLocaleString()}</td>
                    <td className="px-4 py-3 text-gray-300 text-center">{m.totalStays}</td>
                    <td className="px-4 py-3 text-gray-300">{m.joinedAt}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1.5">
                        <button onClick={() => setViewingMember(m)} className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"><Eye className="h-3.5 w-3.5" /></button>
                        <button onClick={() => setAdjustingMember(m)} className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"><Edit3 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredMembers.length === 0 && <div className="py-12 text-center text-gray-500 text-sm">No members match your filters.</div>}
          </div>
        </div>
      )}

      {/* ═══════════════════════ TRANSACTIONS TAB ═══════════════════════ */}
      {tab === 'transactions' && (
        <div className="space-y-3">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search transactions…" className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="text-left px-4 py-3 font-medium">ID</th>
                  <th className="text-left px-4 py-3 font-medium">Member</th>
                  <th className="text-left px-4 py-3 font-medium">Type</th>
                  <th className="text-right px-4 py-3 font-medium">Points</th>
                  <th className="text-left px-4 py-3 font-medium">Description</th>
                  <th className="text-left px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredTx.map(t => (
                  <tr key={t.id} className="hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-3 text-amber-400 font-mono text-xs">{t.id}</td>
                    <td className="px-4 py-3 text-white">{t.memberName}</td>
                    <td className="px-4 py-3"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${txColors[t.type]}`}>{t.type}</span></td>
                    <td className="px-4 py-3 text-right font-medium">
                      <span className={t.type === 'Earned' || t.type === 'Bonus' ? 'text-emerald-400' : 'text-red-400'}>{txSign[t.type]}{t.points.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-300 text-sm">{t.description}</td>
                    <td className="px-4 py-3 text-gray-300">{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredTx.length === 0 && <div className="py-12 text-center text-gray-500 text-sm">No transactions found.</div>}
          </div>
        </div>
      )}

      {/* ═══════════════════════ RULES TAB ═══════════════════════ */}
      {tab === 'rules' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Earning Rules</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {earningRules.map(r => (
                <div key={r.label} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <p className="text-lg mb-1">{r.icon}</p>
                  <p className="text-white font-semibold text-sm">{r.label}</p>
                  <p className="text-gray-500 text-xs mb-2">{r.description}</p>
                  <p className="text-amber-400 text-xs font-medium">{r.points}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Tier Thresholds</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {(Object.keys(tierConfig) as MemberTier[]).map(tier => (
                <div key={tier} className={`rounded-xl p-4 border border-gray-700 ${tierConfig[tier].bg}`}>
                  <p className={`font-bold text-sm ${tierConfig[tier].color}`}>{tier}</p>
                  <p className="text-gray-300 text-xs">{tierConfig[tier].min.toLocaleString()}+ lifetime points</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Redemption Options</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {[
                { label: 'Room Night Discount', points: '2,000 pts', value: 'LKR 5,000 off', icon: '🛏️' },
                { label: 'Free Pool Day-Out', points: '1,000 pts', value: 'Pool + Lunch package', icon: '🏊' },
                { label: 'Room Upgrade', points: '3,000 pts', value: 'Next-tier room upgrade', icon: '⬆️' },
                { label: 'Spa Treatment', points: '1,500 pts', value: '60-min treatment', icon: '💆' },
                { label: 'Restaurant Voucher', points: '500 pts', value: 'LKR 2,500 dining credit', icon: '🍽️' },
                { label: 'Airport Transfer', points: '2,500 pts', value: 'Round-trip transfer', icon: '🚗' },
              ].map(r => (
                <div key={r.label} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <p className="text-lg mb-1">{r.icon}</p>
                  <p className="text-white font-semibold text-sm">{r.label}</p>
                  <p className="text-amber-400 text-xs font-medium">{r.points}</p>
                  <p className="text-gray-500 text-xs">{r.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── View Member Modal ── */}
      {viewingMember && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl max-w-md w-full border border-gray-700 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-700 flex justify-between items-center sticky top-0 bg-gray-800 rounded-t-2xl z-10">
              <h3 className="text-lg font-bold text-white">{viewingMember.name}</h3>
              <button onClick={() => setViewingMember(null)} className="text-gray-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-500 mb-0.5">Member ID</p><p className="text-white text-sm font-mono">{viewingMember.id}</p></div>
                <div><p className="text-xs text-gray-500 mb-0.5">Tier</p><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${tierConfig[viewingMember.tier].bg} ${tierConfig[viewingMember.tier].color}`}>{viewingMember.tier}</span></div>
                <div><p className="text-xs text-gray-500 mb-0.5">Email</p><p className="text-white text-sm break-all">{viewingMember.email}</p></div>
                <div><p className="text-xs text-gray-500 mb-0.5">Phone</p><p className="text-white text-sm">{viewingMember.phone}</p></div>
              </div>
              <div className="border-t border-gray-700 pt-4 grid grid-cols-3 gap-4 text-center">
                <div><p className="text-xs text-gray-500 mb-0.5">Available</p><p className="text-amber-400 font-bold">{viewingMember.availablePoints.toLocaleString()}</p></div>
                <div><p className="text-xs text-gray-500 mb-0.5">Lifetime</p><p className="text-white font-bold">{viewingMember.lifetimePoints.toLocaleString()}</p></div>
                <div><p className="text-xs text-gray-500 mb-0.5">Stays</p><p className="text-white font-bold">{viewingMember.totalStays}</p></div>
              </div>
              <div className="border-t border-gray-700 pt-4">
                <p className="text-xs text-gray-500 mb-0.5">Member Since</p>
                <p className="text-white text-sm">{viewingMember.joinedAt}</p>
              </div>
              {/* Recent transactions for this member */}
              <div className="border-t border-gray-700 pt-4">
                <p className="text-xs text-gray-500 mb-2">Recent Transactions</p>
                <div className="space-y-2">
                  {transactions.filter(t => t.memberId === viewingMember.id).slice(0, 5).map(t => (
                    <div key={t.id} className="flex justify-between items-center bg-gray-700/40 rounded-lg p-2.5">
                      <div>
                        <p className="text-white text-xs">{t.description}</p>
                        <p className="text-gray-500 text-xs">{t.date}</p>
                      </div>
                      <span className={`text-xs font-medium ${t.type === 'Earned' || t.type === 'Bonus' ? 'text-emerald-400' : 'text-red-400'}`}>{txSign[t.type]}{t.points}</span>
                    </div>
                  ))}
                  {transactions.filter(t => t.memberId === viewingMember.id).length === 0 && <p className="text-gray-500 text-xs">No transactions yet.</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Adjust Points Modal ── */}
      {adjustingMember && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl max-w-sm w-full border border-gray-700 shadow-xl">
            <div className="p-5 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Adjust Points</h3>
              <button onClick={() => { setAdjustingMember(null); setAdjustPoints(0); setAdjustReason(''); }} className="text-gray-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="bg-gray-700/40 rounded-xl p-4 text-sm">
                <p className="text-white font-medium">{adjustingMember.name}</p>
                <p className="text-gray-400">{adjustingMember.tier} · {adjustingMember.availablePoints.toLocaleString()} available pts</p>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Points (+/−)</label>
                <div className="flex gap-2">
                  <button onClick={() => setAdjustPoints(p => p - 100)} className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-colors"><Minus className="h-4 w-4" /></button>
                  <input type="number" value={adjustPoints} onChange={e => setAdjustPoints(parseInt(e.target.value) || 0)} className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm text-center focus:ring-2 focus:ring-amber-500 outline-none" />
                  <button onClick={() => setAdjustPoints(p => p + 100)} className="p-2 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 transition-colors"><Plus className="h-4 w-4" /></button>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Reason</label>
                <input type="text" value={adjustReason} onChange={e => setAdjustReason(e.target.value)} placeholder="e.g. Compensation, Correction…" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
              </div>
              <div className="bg-gray-700/40 rounded-lg p-3 text-sm text-center">
                <span className="text-gray-400">New balance: </span>
                <span className="text-amber-400 font-bold">{(adjustingMember.availablePoints + adjustPoints).toLocaleString()} pts</span>
              </div>
              <button onClick={handleAdjust} disabled={adjustPoints === 0 || !adjustReason.trim()} className="w-full py-3 rounded-xl text-sm font-semibold bg-amber-600 hover:bg-amber-700 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed">Apply Adjustment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
