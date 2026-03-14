import React, { useState } from 'react';
import { Calendar, User, Gift, Bell, Star, MapPin, Clock, ChevronRight, Edit3, LogOut, Trophy, Coffee, Waves } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';

const mockBookings = [
  {
    id: 'BK-2024-001',
    room: 'Deluxe Room',
    checkIn: '2025-02-14',
    checkOut: '2025-02-17',
    guests: 2,
    status: 'confirmed' as const,
    total: 'LKR 52,900',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'BK-2024-002',
    room: 'Family Suite',
    checkIn: '2025-03-20',
    checkOut: '2025-03-25',
    guests: 4,
    status: 'pending' as const,
    total: 'LKR 112,500',
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

const mockNotifications = [
  { id: 1, title: 'Booking Confirmed', message: 'Your booking BK-2024-001 has been confirmed.', time: '2 hours ago', read: false },
  { id: 2, title: 'Special Offer', message: 'Enjoy 20% off on your next stay! Valid until March 31.', time: '1 day ago', read: false },
  { id: 3, title: 'Points Earned', message: 'You earned 530 loyalty points from your recent booking.', time: '3 days ago', read: true },
];

const rewardsOptions = [
  { name: 'Pool Day Pass', points: 200, icon: Waves },
  { name: 'Dining Credit (LKR 2,000)', points: 500, icon: Coffee },
  { name: 'Room Upgrade', points: 1000, icon: Star },
  { name: 'Free Night Stay', points: 3000, icon: Trophy },
];

type TabKey = 'bookings' | 'profile' | 'loyalty' | 'notifications';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('bookings');
  const [profile, setProfile] = useState({
    firstName: 'John', lastName: 'Doe', email: 'john@example.com',
    phone: '+94 77 123 4567', nationality: 'United Kingdom',
    dob: '1990-05-15', preferences: 'Non-smoking, High floor'
  });

  const tabs: { key: TabKey; label: string; icon: React.ElementType }[] = [
    { key: 'bookings', label: 'My Bookings', icon: Calendar },
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'loyalty', label: 'Loyalty', icon: Gift },
    { key: 'notifications', label: 'Notifications', icon: Bell },
  ];

  const statusColors = {
    confirmed: 'bg-green-100 text-green-700',
    pending: 'bg-amber-100 text-amber-700',
    cancelled: 'bg-red-100 text-red-700',
    completed: 'bg-gray-100 text-gray-600',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-amber-50/30">
      {/* Hero Banner */}
      <div className="bg-gradient-dark text-white py-12 px-4">
        <div className="container-luxury">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
                Welcome, {profile.firstName}!
              </h1>
              <p className="text-gray-300 font-body">Manage your bookings and rewards</p>
            </div>
            <div className="hidden md:flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <Gift className="h-8 w-8 text-amber-400" />
              <div>
                <p className="text-sm text-gray-300">Loyalty Points</p>
                <p className="text-2xl font-bold text-amber-400">2,350</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-luxury py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-luxury p-4 sticky top-28">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const unread = tab.key === 'notifications' ? mockNotifications.filter(n => !n.read).length : 0;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-all duration-200 mb-1 ${
                      activeTab === tab.key
                        ? 'bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                    {unread > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unread}
                      </span>
                    )}
                  </button>
                );
              })}
              <hr className="my-3 border-gray-100" />
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium text-red-500 hover:bg-red-50 transition-colors">
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="lg:col-span-3">
            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <ScrollReveal>
                <div className="space-y-6">
                  <SectionHeader title="My Bookings" subtitle="View and manage your reservations" align="left" />
                  {mockBookings.map(booking => (
                    <div key={booking.id} className="bg-white rounded-2xl shadow-luxury overflow-hidden hover:shadow-luxury-lg transition-shadow duration-300">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-48 h-40 md:h-auto">
                          <img src={booking.image} alt={booking.room} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-heading font-bold text-gray-900">{booking.room}</h3>
                              <p className="text-sm text-gray-500">Booking #{booking.id}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[booking.status]}`}>
                              {booking.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {booking.checkIn} → {booking.checkOut}</span>
                            <span className="flex items-center gap-1"><User className="h-4 w-4" /> {booking.guests} Guests</span>
                            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> Amaluna Resort</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-amber-600">{booking.total}</p>
                            <button className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center gap-1">
                              View Details <ChevronRight className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <ScrollReveal>
                <div className="bg-white rounded-2xl shadow-luxury p-8">
                  <div className="flex items-center justify-between mb-8">
                    <SectionHeader title="My Profile" subtitle="Update your personal information" align="left" />
                    <button className="btn-outline text-sm flex items-center gap-2">
                      <Edit3 className="h-4 w-4" /> Edit
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: 'First Name', value: profile.firstName, key: 'firstName' },
                      { label: 'Last Name', value: profile.lastName, key: 'lastName' },
                      { label: 'Email', value: profile.email, key: 'email' },
                      { label: 'Phone', value: profile.phone, key: 'phone' },
                      { label: 'Nationality', value: profile.nationality, key: 'nationality' },
                      { label: 'Date of Birth', value: profile.dob, key: 'dob' },
                    ].map(field => (
                      <div key={field.key}>
                        <label className="block text-sm font-medium text-gray-500 mb-1">{field.label}</label>
                        <input
                          type="text"
                          value={field.value}
                          onChange={e => setProfile(p => ({ ...p, [field.key]: e.target.value }))}
                          className="input-luxury"
                        />
                      </div>
                    ))}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-500 mb-1">Preferences</label>
                      <textarea
                        value={profile.preferences}
                        onChange={e => setProfile(p => ({ ...p, preferences: e.target.value }))}
                        rows={3}
                        className="input-luxury"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button className="btn-primary">Save Changes</button>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Loyalty Tab */}
            {activeTab === 'loyalty' && (
              <ScrollReveal>
                <div className="space-y-6">
                  {/* Points Summary */}
                  <div className="bg-gradient-to-r from-amber-600 to-yellow-500 rounded-2xl p-8 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-amber-100 mb-1">Total Points</p>
                        <p className="text-5xl font-bold">2,350</p>
                        <p className="text-amber-100 mt-2">Gold Member</p>
                      </div>
                      <Trophy className="h-20 w-20 text-white/20" />
                    </div>
                    <div className="mt-6 bg-white/20 rounded-full h-2">
                      <div className="bg-white rounded-full h-2 w-[47%]" />
                    </div>
                    <p className="text-amber-100 text-sm mt-2">2,650 points to Platinum status</p>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-2xl shadow-luxury p-6">
                    <h3 className="text-lg font-heading font-bold text-gray-900 mb-4">Points History</h3>
                    <div className="space-y-3">
                      {[
                        { desc: 'Room Booking BK-2024-001', pts: '+530', date: 'Jan 15, 2025' },
                        { desc: 'Dining - Restaurant', pts: '+120', date: 'Jan 14, 2025' },
                        { desc: 'Pool Day Pass Redeemed', pts: '-200', date: 'Jan 10, 2025' },
                        { desc: 'Sign-up Bonus', pts: '+500', date: 'Dec 1, 2024' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                          <div>
                            <p className="font-medium text-gray-900">{item.desc}</p>
                            <p className="text-sm text-gray-500">{item.date}</p>
                          </div>
                          <span className={`font-bold ${item.pts.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                            {item.pts}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Redeem Options */}
                  <div className="bg-white rounded-2xl shadow-luxury p-6">
                    <h3 className="text-lg font-heading font-bold text-gray-900 mb-4">Redeem Points</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {rewardsOptions.map(reward => {
                        const Icon = reward.icon;
                        const canRedeem = 2350 >= reward.points;
                        return (
                          <div key={reward.name} className={`border rounded-xl p-4 flex items-center gap-4 transition-all ${canRedeem ? 'border-amber-200 hover:border-amber-400 hover:shadow-md' : 'border-gray-100 opacity-60'}`}>
                            <div className="bg-amber-50 rounded-lg p-3">
                              <Icon className="h-6 w-6 text-amber-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{reward.name}</p>
                              <p className="text-sm text-amber-600 font-semibold">{reward.points} pts</p>
                            </div>
                            <button
                              disabled={!canRedeem}
                              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${canRedeem ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                            >
                              Redeem
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <ScrollReveal>
                <div className="bg-white rounded-2xl shadow-luxury p-6">
                  <SectionHeader title="Notifications" subtitle="Stay updated with your latest alerts" align="left" />
                  <div className="space-y-3 mt-6">
                    {mockNotifications.map(notif => (
                      <div
                        key={notif.id}
                        className={`p-4 rounded-xl border transition-all ${
                          notif.read ? 'border-gray-100 bg-white' : 'border-amber-200 bg-amber-50/50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            {!notif.read && <div className="mt-1.5 h-2.5 w-2.5 bg-amber-500 rounded-full flex-shrink-0" />}
                            <div>
                              <h4 className="font-medium text-gray-900">{notif.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-400 flex items-center gap-1 flex-shrink-0 ml-4">
                            <Clock className="h-3 w-3" /> {notif.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
