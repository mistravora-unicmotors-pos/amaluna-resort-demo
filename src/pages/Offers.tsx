import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Gift, Users, Star, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import OptimizedImage from '../components/OptimizedImage';

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
    <div>
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <OptimizedImage
          src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
          alt="Amaluna Special Offers"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={600}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">Special Offers</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-body">
            Discover exceptional value with our carefully crafted packages
          </p>
        </div>
      </section>

      <div className="container-luxury section-padding">

        {/* Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {offers.map((offer, index) => (
            <ScrollReveal key={offer.id} delay={index * 100} direction="up">
            <div 
              className={`bg-white rounded-2xl shadow-luxury hover:shadow-luxury-lg transition-all duration-300 overflow-hidden hover:-translate-y-1 ${
                offer.highlight ? 'ring-2 ring-amber-300' : ''
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
                <OptimizedImage
                  src={offer.image}
                  alt={offer.name}
                  className="w-full h-48 object-cover"
                  width={400}
                  height={192}
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mr-3">
                    <div className="text-amber-600">{offer.icon}</div>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-gray-900">
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
                    className="flex-1 btn-primary text-center text-sm"
                  >
                    View Details
                  </Link>
                  <button 
                    onClick={() => document.querySelector('#enquiry-btn')?.click()}
                    className="flex-1 btn-outline text-center text-sm"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Terms & Conditions Note */}
        <div className="bg-gradient-to-br from-gray-50 to-stone-50 rounded-2xl p-6 mb-16">
          <h2 className="text-lg font-heading font-semibold text-gray-900 mb-3">Important Information</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• All offers are subject to availability and may be withdrawn without prior notice</p>
            <p>• Room rates are per room per night unless otherwise specified</p>
            <p>• Government taxes and service charges may apply</p>
            <p>• Full terms and conditions available on individual offer pages</p>
            <p>• For the latest availability and rates, please contact us directly</p>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="gradient-dark rounded-3xl p-10 text-white text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
            Stay Updated on New Offers
          </h2>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto font-body">
            Be the first to know about exclusive deals, seasonal packages, and special promotions 
            at Amaluna Resorts.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              We respect your privacy. No spam, just great deals.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <ScrollReveal>
        <div className="text-center mt-16">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-4">
            Questions About Our Offers?
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto font-body">
            Our team is here to help you choose the perfect package and answer any questions 
            about terms, availability, or special requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+94770557257"
              className="btn-primary"
            >
              Call Now
            </a>
            <a 
              href="https://wa.me/94770557257?text=Hello%20Amaluna%2C%20I%27d%20like%20to%20enquire%20about%20your%20special%20offers"
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
    </div>
  );
};

export default Offers;