import React, { useState } from 'react';
import { Calendar, Users, Tag, Search } from 'lucide-react';
import BookingModal from './BookingModal';

interface BookingBarProps {
  className?: string;
  prefilledRoom?: string;
}

const BookingBar: React.FC<BookingBarProps> = ({ className = '', prefilledRoom }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    promoCode: '',
    selectedRoom: prefilledRoom || ''
  });

  const handleInputChange = (field: string, value: string | number) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleBookingSubmit = () => {
    setIsBookingOpen(true);
  };

  // Set default dates (today + 1 day for check-in, +2 days for check-out)
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 2);

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  React.useEffect(() => {
    if (!bookingData.checkIn) {
      setBookingData(prev => ({
        ...prev,
        checkIn: formatDate(tomorrow),
        checkOut: formatDate(dayAfter)
      }));
    }
  }, []);

  return (
    <>
      <div className={`bg-white rounded-lg shadow-lg p-4 ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Check-in */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-in
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="date"
                value={bookingData.checkIn}
                onChange={(e) => handleInputChange('checkIn', e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Check-out */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-out
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="date"
                value={bookingData.checkOut}
                onChange={(e) => handleInputChange('checkOut', e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Guests
            </label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={bookingData.adults}
                  onChange={(e) => handleInputChange('adults', parseInt(e.target.value))}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} Adult{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div className="relative flex-1">
                <select
                  value={bookingData.children}
                  onChange={(e) => handleInputChange('children', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none"
                >
                  {[0, 1, 2, 3, 4].map(num => (
                    <option key={num} value={num}>{num} Child{num !== 1 ? 'ren' : ''}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Promo Code */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Promo Code
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Optional"
                value={bookingData.promoCode}
                onChange={(e) => handleInputChange('promoCode', e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              onClick={handleBookingSubmit}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md font-semibold transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        bookingData={bookingData}
      />
    </>
  );
};

export default BookingBar;