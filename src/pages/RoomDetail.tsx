import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, Wifi, Coffee, Tv, Wind, Bath, ChevronLeft, ChevronRight, X } from 'lucide-react';
import BookingBar from '../components/BookingBar';
import OptimizedImage from '../components/OptimizedImage';
import ScrollReveal from '../components/ScrollReveal';
import FAQAccordion from '../components/FAQAccordion';
import { getRoomById } from '../services/bookingService';

const RoomDetail = () => {
  const { roomId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Get room data from centralized service
  const serviceRoom = getRoomById(roomId || '');

  // Policies & FAQs per room (page-level detail — not needed in booking service)
  const roomExtras: { [key: string]: { policies: string[]; faqs: { question: string; answer: string }[] } } = {
    'lagoon-view-king': {
      policies: ['Check-in: 2:00 PM', 'Check-out: 11:00 AM', 'No smoking in rooms', 'Pets not permitted', 'Maximum occupancy strictly enforced'],
      faqs: [
        { question: 'Does the room have air conditioning?', answer: 'Yes, all our rooms feature individual air conditioning units with temperature control.' },
        { question: 'Is Wi-Fi included?', answer: 'Complimentary high-speed Wi-Fi is available throughout the room and resort.' },
        { question: 'What view does the balcony offer?', answer: 'The private balcony offers direct views of the peaceful lagoon and surrounding tropical gardens.' },
      ],
    },
    'garden-twin': {
      policies: ['Check-in: 2:00 PM', 'Check-out: 11:00 AM', 'Child bed available on request', 'No smoking in rooms', 'Ground floor access'],
      faqs: [
        { question: 'Can this room accommodate a child?', answer: 'Yes, the room can accommodate 2 adults plus 1 child. A rollaway bed can be provided on request.' },
        { question: 'Is the room suitable for guests with mobility issues?', answer: "Yes, as a ground-floor room with patio access, it's easily accessible." },
      ],
    },
    'family-suite': {
      policies: ['Check-in: 2:00 PM', 'Check-out: 11:00 AM', 'Maximum 4 guests', 'No smoking in rooms', 'Extra towels and amenities provided'],
      faqs: [
        { question: 'How are the bedrooms configured?', answer: 'The suite has one king bedroom and one twin bedroom, plus a shared living area with seating.' },
        { question: 'Is there a kitchenette?', answer: 'The suite includes a mini-fridge and tea/coffee facilities, but no full kitchen.' },
      ],
    },
    'poolside-deluxe': {
      policies: ['Check-in: 2:00 PM', 'Check-out: 11:00 AM', 'Pool access 6 AM - 10 PM', 'No smoking in rooms', 'Extra bed available on request'],
      faqs: [
        { question: 'How close is the room to the pool?', answer: 'The room is located directly poolside - you can walk from your patio to the pool in under 30 seconds.' },
        { question: 'Are pool towels provided?', answer: 'Yes, complimentary pool towels are provided and can be exchanged at the pool area.' },
      ],
    },
  };

  const extras = roomExtras[roomId || ''];

  const room = serviceRoom
    ? {
        name: serviceRoom.name,
        description: serviceRoom.description,
        images: serviceRoom.images,
        amenities: serviceRoom.amenities,
        occupancy: serviceRoom.occupancy,
        price: serviceRoom.price,
        policies: extras?.policies || [],
        faqs: extras?.faqs || [],
      }
    : null;

  if (!room) {
    return (
      <div className="py-20 text-center container-luxury">
        <h1 className="text-2xl font-heading font-bold text-gray-900 mb-4">Room not found</h1>
        <Link to="/rooms" className="text-amber-600 hover:text-amber-700 font-medium">
          ← Back to Rooms
        </Link>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  return (
    <div>
      <div className="container-luxury section-padding">
        {/* Back button */}
        <Link 
          to="/rooms" 
          className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-6 transition-colors duration-200 font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Rooms
        </Link>

        {/* Room Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4">
            {room.name}
          </h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center mr-3">
                <Users className="h-4 w-4 text-amber-600" />
              </div>
              <span className="text-lg text-gray-600 font-body">{room.occupancy}</span>
            </div>
            <div className="text-lg font-body">
              <span className="font-bold text-gray-900">LKR {room.price.toLocaleString()}</span>
              <span className="text-gray-500 ml-1">/ night</span>
            </div>
          </div>
        </div>

        {/* Booking Bar */}
        <div className="mb-12">
          <BookingBar prefilledRoom={roomId} />
        </div>

        {/* Image Gallery */}
        <div className="mb-12">
          <div className="relative">
            <OptimizedImage
              src={room.images[currentImageIndex]}
              alt={`${room.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-96 md:h-[500px] object-cover rounded-2xl cursor-pointer shadow-luxury"
              onClick={() => setLightboxOpen(true)}
              width={1200}
              height={500}
              priority={true}
            />
            
            {room.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail strip */}
          {room.images.length > 1 && (
            <div className="flex space-x-2 mt-4 overflow-x-auto">
              {room.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === currentImageIndex ? 'border-amber-600' : 'border-transparent'
                  }`}
                >
                  <OptimizedImage
                    src={image}
                    alt={`${room.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={80}
                    height={64}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <ScrollReveal>
            <div className="mb-10">
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">About This Room</h2>
              <p className="text-gray-600 text-lg leading-relaxed font-body">
                {room.description}
              </p>
            </div>
            </ScrollReveal>

            {/* Amenities */}
            <ScrollReveal>
            <div className="mb-10">
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {room.amenities.map((amenity: string, index: number) => (
                  <div key={index} className="flex items-center bg-amber-50/50 rounded-xl px-4 py-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 font-body">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            </ScrollReveal>

            {/* FAQs */}
            <ScrollReveal>
            <div className="mb-10">
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <FAQAccordion items={room.faqs.map((faq: any) => ({ question: faq.question, answer: faq.answer }))} />
            </div>
            </ScrollReveal>

            {/* Policies */}
            <ScrollReveal>
            <div>
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">Room Policies</h2>
              <ul className="space-y-2">
                {room.policies.map((policy: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600 font-body">{policy}</span>
                  </li>
                ))}
              </ul>
            </div>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 mb-6 border border-amber-100 shadow-luxury">
                <div className="mb-4">
                  <span className="text-2xl font-bold text-gray-900">LKR {room.price.toLocaleString()}</span>
                  <span className="text-gray-500 ml-1">/ night</span>
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">Ready to Book?</h3>
                <p className="text-gray-600 mb-6 font-body">
                  Select your dates above or contact us directly to make your reservation.
                </p>
                
                <div className="space-y-3">
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="block w-full btn-primary text-center"
                  >
                    Book Now
                  </button>
                  <a 
                    href={`https://wa.me/94770557257?text=Hello%20Amaluna%2C%20I%27d%20like%20to%20book%20the%20${encodeURIComponent(room.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-full font-semibold text-center transition-colors duration-200"
                  >
                    WhatsApp
                  </a>
                  <a 
                    href="tel:+94770557257"
                    className="block w-full btn-outline text-center"
                  >
                    Call Now
                  </a>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-2xl shadow-luxury p-6">
                <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">Need Help?</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">Phone:</span>
                    <p className="text-gray-600">077 055 7257</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Email:</span>
                    <p className="text-gray-600">reservations@amalunaresorts.com</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Hours:</span>
                    <p className="text-gray-600">24/7 WhatsApp support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X className="h-8 w-8" />
          </button>
          
          <div className="relative max-w-4xl max-h-full p-4">
            <OptimizedImage
              src={room.images[currentImageIndex]}
              alt={`${room.name} - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              width={1200}
              height={800}
            />
            
            {room.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Mobile Sticky Action Bar */}
      <div className="lg:hidden fixed bottom-20 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg z-40">
        <div className="px-4 py-3">
          <div className="flex space-x-3">
            <a 
              href="tel:+94770557257"
              className="flex-1 btn-outline text-center text-sm"
            >
              Call
            </a>
            <a 
              href={`https://wa.me/94770557257?text=Hello%20Amaluna%2C%20I%27d%20like%20to%20enquire%20about%20the%20${encodeURIComponent(room.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-full font-semibold text-center transition-colors duration-200 text-sm"
            >
              WhatsApp
            </a>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex-1 btn-primary text-center text-sm"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;