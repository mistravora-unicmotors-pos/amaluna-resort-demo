import React, { useState } from 'react';
import { X, Calendar, Users, CreditCard, Shield, Check } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    promoCode: string;
    selectedRoom: string;
  };
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, bookingData }) => {
  const [step, setStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(bookingData.selectedRoom || '');
  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const rooms = [
    {
      id: 'lagoon-view-king',
      name: 'Lagoon View King',
      price: 12500,
      image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=400',
      amenities: ['King bed', 'Lagoon view', 'Balcony', 'AC', 'Wi-Fi']
    },
    {
      id: 'garden-twin',
      name: 'Garden Twin',
      price: 10500,
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400',
      amenities: ['Twin beds', 'Garden view', 'Patio', 'AC', 'Wi-Fi']
    },
    {
      id: 'family-suite',
      name: 'Family Suite',
      price: 18500,
      image: 'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=400',
      amenities: ['King + Twin', 'Two rooms', 'Mini-fridge', 'AC', 'Wi-Fi']
    },
    {
      id: 'poolside-deluxe',
      name: 'Poolside Deluxe',
      price: 14500,
      image: 'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=400',
      amenities: ['King bed', 'Pool access', 'Patio', 'AC', 'Wi-Fi']
    }
  ];

  const calculateNights = () => {
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const selectedRoomData = rooms.find(room => room.id === selectedRoom);
  const nights = calculateNights();
  const subtotal = selectedRoomData ? selectedRoomData.price * nights : 0;
  const taxes = subtotal * 0.15; // 15% tax
  const total = subtotal + taxes;

  const handleGuestInfoChange = (field: string, value: string) => {
    setGuestInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleBookingComplete = () => {
    console.log('Booking submitted:', { selectedRoom, guestInfo, bookingData });
    alert('Booking request submitted! We will contact you within 2 hours to confirm your reservation.');
    onClose();
    setStep(1);
    setSelectedRoom('');
    setGuestInfo({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      specialRequests: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {step === 1 ? 'Select Room' : step === 2 ? 'Guest Information' : 'Confirm Booking'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Booking Summary */}
          <div className="bg-amber-50 rounded-lg p-4 mb-6">
            <div className="flex flex-wrap items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-amber-600 mr-1" />
                  <span>{formatDate(bookingData.checkIn)} - {formatDate(bookingData.checkOut)}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-amber-600 mr-1" />
                  <span>{bookingData.adults} Adult{bookingData.adults > 1 ? 's' : ''}</span>
                  {bookingData.children > 0 && <span>, {bookingData.children} Child{bookingData.children > 1 ? 'ren' : ''}</span>}
                </div>
              </div>
              <div className="font-semibold text-amber-700">
                {nights} night{nights > 1 ? 's' : ''}
              </div>
            </div>
          </div>

          {/* Step 1: Room Selection */}
          {step === 1 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Rooms</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                      selectedRoom === room.id
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 hover:border-amber-300 hover:shadow-md'
                    }`}
                    onClick={() => setSelectedRoom(room.id)}
                  >
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-32 object-cover rounded-md mb-3"
                      loading="lazy"
                    />
                    <h4 className="font-semibold text-gray-900 mb-2">{room.name}</h4>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {room.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          LKR {room.price.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">per night</div>
                      </div>
                      {selectedRoom === room.id && (
                        <Check className="h-5 w-5 text-amber-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedRoom}
                  className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-6 rounded-md font-semibold transition-colors duration-200"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Guest Information */}
          {step === 2 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Guest Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestInfo.firstName}
                    onChange={(e) => handleGuestInfoChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestInfo.lastName}
                    onChange={(e) => handleGuestInfoChange('lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={guestInfo.email}
                    onChange={(e) => handleGuestInfoChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestInfo.phone}
                    onChange={(e) => handleGuestInfoChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special Requests
                </label>
                <textarea
                  rows={3}
                  value={guestInfo.specialRequests}
                  onChange={(e) => handleGuestInfoChange('specialRequests', e.target.value)}
                  placeholder="Any special requirements or requests..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-6 rounded-md font-semibold transition-colors duration-200"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!guestInfo.firstName || !guestInfo.lastName || !guestInfo.email || !guestInfo.phone}
                  className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-6 rounded-md font-semibold transition-colors duration-200"
                >
                  Review Booking
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && selectedRoomData && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={selectedRoomData.image}
                    alt={selectedRoomData.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{selectedRoomData.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {formatDate(bookingData.checkIn)} - {formatDate(bookingData.checkOut)} ({nights} night{nights > 1 ? 's' : ''})
                    </p>
                    <p className="text-sm text-gray-600">
                      {bookingData.adults} Adult{bookingData.adults > 1 ? 's' : ''}
                      {bookingData.children > 0 && `, ${bookingData.children} Child${bookingData.children > 1 ? 'ren' : ''}`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Guest Details</h4>
                <p className="text-sm text-gray-600">
                  {guestInfo.firstName} {guestInfo.lastName}<br />
                  {guestInfo.email}<br />
                  {guestInfo.phone}
                </p>
                {guestInfo.specialRequests && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700">Special Requests:</p>
                    <p className="text-sm text-gray-600">{guestInfo.specialRequests}</p>
                  </div>
                )}
              </div>

              <div className="bg-amber-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Price Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Room rate ({nights} night{nights > 1 ? 's' : ''})</span>
                    <span>LKR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & fees</span>
                    <span>LKR {taxes.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-amber-200 pt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>LKR {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Booking Protection</p>
                    <p>This is a booking request. We will contact you within 2 hours to confirm availability and process payment. No charges will be made until confirmation.</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-6 rounded-md font-semibold transition-colors duration-200"
                >
                  Back
                </button>
                <button
                  onClick={handleBookingComplete}
                  className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-6 rounded-md font-semibold transition-colors duration-200 flex items-center space-x-2"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Submit Booking Request</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;