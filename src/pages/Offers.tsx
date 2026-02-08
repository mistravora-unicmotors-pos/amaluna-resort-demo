import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Gift, Users, Star } from 'lucide-react';

const Offers = () => {
  const offers = [
    {
      id: 'weekend-escape',
      name: 'Weekend Escape',
      tagline: 'Unwind by the lagoon',
      description: 'Perfect for a romantic getaway or peaceful retreat. Enjoy extended checkout time and welcome refreshments.',
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
      inclusions: [
        'Late checkout until 2:00 PM',
        'Welcome drink on arrival',
        'Complimentary Wi-Fi',
        'Pool and lagoon access'
      ],
      validity: '15 September - 31 October 2024',
      terms: [
        'Minimum 2-night stay required',
        'Subject to room availability',
        'Cannot be combined with other offers',
        'Advance booking required'
      ],
      highlight: false,
      icon: <Star className="h-6 w-6" />
    },
    {
      id: 'family-stay',
      name: 'Family Stay Package',
      tagline: 'Creating memories together',
      description: 'Ideal for families exploring Sri Lanka. Special rates for children and family-friendly amenities.',
      image: 'https://images.pexels.com/photos/1598073/pexels-photo-1598073.jpeg',
      inclusions: [
        'Children under 12 stay free',
        'Kids meal discounts',
        'Family pool games',
        'Extra bed setup available',
        'Local tour recommendations'
      ],
      validity: '1 October - 15 December 2024',
      terms: [
        'Valid for families with children under 12',
        'Maximum 2 children per room',
        'Extra bed charges apply for adults',
        '7-day advance booking required'
      ],
      highlight: true,
      icon: <Users className="h-6 w-6" />
    },
    {
      id: 'early-bird',
      name: 'Early Bird Special',
      tagline: 'Plan ahead and save',
      description: 'Book your stay 30 days in advance and enjoy special rates with flexible cancellation.',
      image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
      inclusions: [
        'Up to 15% off room rates',
        'Free cancellation up to 7 days',
        'Complimentary airport pickup',
        'Pool towel service'
      ],
      validity: 'Ongoing offer',
      terms: [
        'Must be booked 30+ days in advance',
        'Full payment required at booking',
        'Valid for stays until March 2025',
        'Cannot be combined with other promotions'
      ],
      highlight: false,
      icon: <Gift className="h-6 w-6" />
    }
  ];

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Special Offers
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover exceptional value with our carefully crafted packages. From romantic escapes 
            to family adventures, find the perfect offer for your Amaluna experience.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {offers.map((offer) => (
            <div 
              key={offer.id}
              className={`bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden ${
                offer.highlight ? 'ring-2 ring-amber-200' : ''
              } relative`}
            >
              {offer.highlight && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Popular
                  </span>
                </div>
              )}
              
              <div className="aspect-w-16 aspect-h-10">
                <img
                  src={offer.image}
                  alt={offer.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="text-amber-600 mr-2">
                    {offer.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {offer.name}
                  </h3>
                </div>
                
                <p className="text-amber-600 font-medium text-sm mb-3">
                  {offer.tagline}
                </p>
                
                <p className="text-gray-600 mb-4">
                  {offer.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Package Includes:</h4>
                  <ul className="space-y-1">
                    {offer.inclusions.slice(0, 3).map((inclusion, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                        {inclusion}
                      </li>
                    ))}
                    {offer.inclusions.length > 3 && (
                      <li className="text-sm text-amber-600 font-medium">
                        +{offer.inclusions.length - 3} more benefits
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Valid: {offer.validity}</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to={`/offers/${offer.id}`}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg font-semibold text-center transition-colors duration-200 text-sm"
                  >
                    View Details
                  </Link>
                  <button 
                    onClick={() => document.querySelector('#enquiry-btn')?.click()}
                    className="flex-1 border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200 text-sm"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Terms & Conditions Note */}
        <div className="bg-gray-50 rounded-lg p-6 mb-16">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Important Information</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• All offers are subject to availability and may be withdrawn without prior notice</p>
            <p>• Room rates are per room per night unless otherwise specified</p>
            <p>• Government taxes and service charges may apply</p>
            <p>• Full terms and conditions available on individual offer pages</p>
            <p>• For the latest availability and rates, please contact us directly</p>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-amber-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Stay Updated on New Offers
          </h2>
          <p className="text-lg text-amber-100 mb-6 max-w-2xl mx-auto">
            Be the first to know about exclusive deals, seasonal packages, and special promotions 
            at Amaluna Resorts.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-amber-100 mt-2">
              We respect your privacy. No spam, just great deals.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Questions About Our Offers?
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Our team is here to help you choose the perfect package and answer any questions 
            about terms, availability, or special requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+94770557257"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Call Now
            </a>
            <a 
              href="https://wa.me/94770557257?text=Hello%20Amaluna%2C%20I%27d%20like%20to%20enquire%20about%20your%20special%20offers"
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

export default Offers;