import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Wifi, Coffee, Tv, Wind, Bath, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import OptimizedImage from '../components/OptimizedImage';
import SectionHeader from '../components/SectionHeader';
import BookingModal from '../components/BookingModal';
import { rooms as allRooms } from '../services/bookingService';

const Rooms = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingRoom, setBookingRoom] = useState('');

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);
  const defaultCheckIn = tomorrow.toISOString().split('T')[0];
  const defaultCheckOut = dayAfter.toISOString().split('T')[0];

  const iconMap: Record<string, React.ReactNode> = {
    'King bed': <Users key="users" />,
    'Twin beds': <Users key="users" />,
    'King + Twin': <Users key="users" />,
    'Air conditioning': <Wind key="ac" />,
    'Private ensuite bathroom': <Bath key="bath" />,
    'Complimentary Wi-Fi': <Wifi key="wifi" />,
    'Tea & coffee making facilities': <Coffee key="coffee" />,
    'Tea & coffee facilities': <Coffee key="coffee" />,
    'Flat-screen TV': <Tv key="tv" />,
  };

  const rooms = allRooms.map(r => ({
    ...r,
    icons: r.amenities.filter(a => iconMap[a]).map(a => iconMap[a]),
  }));

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <OptimizedImage
          src="https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg"
          alt="Amaluna Rooms"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={600}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">Our Rooms</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-body">
            Comfortable retreats with modern amenities and beautiful views
          </p>
        </div>
      </section>

      <div className="container-luxury section-padding">
        {/* Rooms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {rooms.map((room) => (
            <ScrollReveal
              key={room.id}
              direction="up"
              delay={rooms.indexOf(room) * 100}
            >
              <div className="bg-white rounded-2xl shadow-luxury hover:shadow-luxury-lg transition-all duration-300 overflow-hidden group hover:-translate-y-1">
              <div className="relative overflow-hidden">
                <OptimizedImage
                  src={room.image}
                  alt={room.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  width={600}
                  height={256}
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-semibold text-amber-700 flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" /> {room.occupancy}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                  {room.name}
                </h3>
                
                <p className="text-gray-600 mb-4 font-body">
                  {room.description}
                </p>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.slice(0, 7).map((amenity, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 text-xs bg-amber-50 text-amber-700 rounded-full font-medium"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xl font-bold text-gray-900">LKR {room.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500 ml-1">/ night</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to={`/rooms/${room.id}`}
                    className="flex-1 btn-outline text-center flex items-center justify-center gap-2"
                  >
                    View Details <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button 
                    onClick={() => {
                      setBookingRoom(room.id);
                      setBookingOpen(true);
                    }}
                    className="flex-1 btn-primary text-center"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Call to Action */}
        <ScrollReveal>
          <div className="text-center bg-gradient-to-r from-amber-50 to-yellow-50 rounded-3xl p-10 border border-amber-100">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-4">
              Need Help Choosing?
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto font-body">
              Our team is happy to help you find the perfect room for your stay.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+94770557257"
                className="btn-primary"
              >
                Call Now
              </a>
              <a 
                href="https://wa.me/94770557257?text=Hello%20Amaluna%2C%20I%27d%20like%20to%20enquire%20about%20rooms"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        bookingData={{
          checkIn: defaultCheckIn,
          checkOut: defaultCheckOut,
          adults: 2,
          children: 0,
          promoCode: '',
          selectedRoom: bookingRoom,
        }}
      />
    </div>
  );
};

export default Rooms;