import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Wifi, Coffee, Tv, Wind, Bath } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import OptimizedImage from '../components/OptimizedImage';

const Rooms = () => {
  const rooms = [
    {
      id: 'lagoon-view-king',
      name: 'Lagoon View King',
      description: 'A bright king room with tranquil lagoon views and a private balcony.',
      image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
      amenities: ['King bed', 'AC', 'Ensuite', 'Balcony', 'Wi-Fi', 'Tea/Coffee', 'TV'],
      occupancy: '2 adults',
      icons: [<Users key="users" />, <Wind key="ac" />, <Bath key="bath" />, <Wifi key="wifi" />, <Coffee key="coffee" />, <Tv key="tv" />]
    },
    {
      id: 'garden-twin',
      name: 'Garden Twin',
      description: 'Ground-floor twin room opening to leafy garden paths.',
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      amenities: ['Twin beds', 'AC', 'Ensuite', 'Patio', 'Wi-Fi', 'TV'],
      occupancy: '2 adults / 2+1 child',
      icons: [<Users key="users" />, <Wind key="ac" />, <Bath key="bath" />, <Wifi key="wifi" />, <Tv key="tv" />]
    },
    {
      id: 'family-suite',
      name: 'Family Suite',
      description: 'Two rooms and extra space—ideal for families.',
      image: 'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg',
      amenities: ['King + Twin', 'AC', 'Ensuite', 'Mini-fridge', 'Wi-Fi', 'TV'],
      occupancy: '4 guests',
      icons: [<Users key="users" />, <Wind key="ac" />, <Bath key="bath" />, <Wifi key="wifi" />, <Tv key="tv" />]
    },
    {
      id: 'poolside-deluxe',
      name: 'Poolside Deluxe',
      description: 'A few steps from the resort\'s large pool and loungers.',
      image: 'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg',
      amenities: ['King bed', 'AC', 'Ensuite', 'Patio', 'Wi-Fi', 'TV'],
      occupancy: '2–3 guests',
      icons: [<Users key="users" />, <Wind key="ac" />, <Bath key="bath" />, <Wifi key="wifi" />, <Tv key="tv" />]
    }
  ];

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Rooms
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our selection of comfortable, well-appointed rooms, each designed 
            to provide a peaceful retreat with modern amenities and beautiful views.
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {rooms.map((room) => (
            <ScrollReveal
              key={room.id}
              direction="up"
              delay={rooms.indexOf(room) * 100}
            >
              <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:scale-105">
              <div className="aspect-w-16 aspect-h-10">
                <OptimizedImage
                  src={room.image}
                  alt={room.name}
                  className="w-full h-64 object-cover"
                  width={600}
                  height={256}
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {room.name}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {room.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Occupancy:</h4>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800">
                    <Users className="h-4 w-4 mr-1" />
                    {room.occupancy}
                  </span>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Amenities:</h4>
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map((amenity, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to={`/rooms/${room.id}`}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-lg font-semibold text-center transition-colors duration-200"
                  >
                    View Details
                  </Link>
                  <button 
                    onClick={() => {
                      const enquiryBtn = document.querySelector('#enquiry-btn') as HTMLButtonElement;
                      if (enquiryBtn) enquiryBtn.click();
                    }}
                    className="flex-1 border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-amber-50 rounded-2xl p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Our team is happy to help you find the perfect room for your stay. 
            Get in touch to discuss your requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+94770557257"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Call Now
            </a>
            <a 
              href="https://wa.me/94770557257?text=Hello%20Amaluna%2C%20I%27d%20like%20to%20enquire%20about%20rooms"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;