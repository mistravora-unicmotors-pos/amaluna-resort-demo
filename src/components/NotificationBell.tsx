import { Bell } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const notifications = [
  { id: 1, title: 'Booking Confirmed', message: 'Your reservation BK-2024-001 is confirmed.', time: '2h ago', read: false },
  { id: 2, title: 'Special Offer', message: '20% off your next stay — limited time!', time: '1d ago', read: false },
  { id: 3, title: 'Points Earned', message: '+530 loyalty points from your last booking.', time: '3d ago', read: true },
];

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-amber-600 transition-colors rounded-lg hover:bg-amber-50"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-luxury-lg border border-gray-100 z-50 animate-fade-in overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h4 className="font-semibold text-gray-900 text-sm">Notifications</h4>
            <span className="text-xs text-amber-600 font-medium">{unreadCount} new</span>
          </div>
          <div className="max-h-72 overflow-y-auto">
            {notifications.map(n => (
              <div
                key={n.id}
                className={`px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer ${
                  !n.read ? 'bg-amber-50/50' : ''
                }`}
              >
                <div className="flex items-start gap-2">
                  {!n.read && <span className="mt-1.5 h-2 w-2 bg-amber-500 rounded-full flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{n.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="block text-center py-3 text-sm text-amber-600 font-medium hover:bg-amber-50 transition-colors border-t border-gray-100"
          >
            View All Notifications
          </Link>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
