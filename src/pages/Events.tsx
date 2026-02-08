import React from 'react';
import { Users, Heart, Calendar, Camera, Music, Utensils } from 'lucide-react';

const Events = () => {
  const eventTypes = [
    {
      title: 'Garden Celebrations',
      description: 'Intimate gatherings surrounded by tropical greenery and lagoon views',
      capacity: 'Up to 50 guests',
      image: 'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg',
      features: ['Garden setting', 'Natural shade', 'Fairy lighting options', 'Photography spots'],
      icon: <Calendar className="h-6 w-6" />
    },
    {
      title: 'Poolside Gatherings',
      description: 'Relaxed events with pool access and outdoor dining areas',
      capacity: 'Up to 80 guests',
      image: 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg',
      features: ['Pool access', 'Outdoor dining', 'Bar service', 'Lounge seating'],
      icon: <Users className="h-6 w-6" />
    },
    {
      title: 'Small Weddings',
      description: 'Romantic ceremonies with personalized service and beautiful backdrops',
      capacity: 'Up to 40 guests',
      image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg',
      features: ['Ceremony setup', 'Bridal suite preparation', 'Professional photography areas', 'Reception dining'],
      icon: <Heart className="h-6 w-6" />
    }
  ];

  const services = [
    {
      icon: <Utensils className="h-8 w-8 text-amber-600" />,
      title: 'Catering & Menu Planning',
      description: 'Custom menus featuring Sri Lankan specialties and international cuisine, designed for your event style and guest preferences.'
    },
    {
      icon: <Music className="h-8 w-8 text-amber-600" />,
      title: 'Event Coordination',
      description: 'Dedicated event coordinator to handle all details, from setup to cleanup, ensuring your celebration runs smoothly.'
    },
    {
      icon: <Camera className="h-8 w-8 text-amber-600" />,
      title: 'Venue Decoration',
      description: 'Beautiful setups using tropical flowers, elegant linens, and lighting to create the perfect atmosphere for your occasion.'
    }
  ];

  const packages = [
    {
      name: 'Garden Party Package',
      guests: '20-35 guests',
      includes: [
        'Garden venue rental (4 hours)',
        'Basic table and seating setup',
        'Welcome drinks on arrival',
        'Canapés and light refreshments',
        'Event coordination support'
      ],
      note: 'Perfect for birthdays, anniversaries, and casual celebrations'
    },
    {
      name: 'Poolside Event Package', 
      guests: '40-60 guests',
      includes: [
        'Poolside venue with full access',
        'Extended setup (6 hours)',
        'Buffet lunch or dinner',
        'Bar service with house wines',
        'Pool towels and loungers',
        'Basic sound system'
      ],
      note: 'Ideal for corporate events, family reunions, and milestone celebrations'
    },
    {
      name: 'Wedding Celebration Package',
      guests: '25-40 guests',
      includes: [
        'Ceremony and reception venues',
        'Bridal suite for preparation',
        'Three-course plated dinner',
        'Champagne toast for all guests',
        'Wedding cake service',
        'Photography coordination',
        'Full-day event support'
      ],
      note: 'Intimate weddings with personalized service and attention to detail'
    }
  ];

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Events & Functions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create lasting memories in our beautiful lagoon-side setting. From intimate celebrations 
            to special occasions, we provide the perfect backdrop for your important moments.
          </p>
        </div>

        {/* Event Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Event Venues</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {eventTypes.map((event, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="text-amber-600 mr-2">
                      {event.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  
                  <div className="flex items-center mb-4">
                    <Users className="h-4 w-4 text-amber-600 mr-2" />
                    <span className="text-sm font-medium text-gray-700">{event.capacity}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900">Features:</h4>
                    {event.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Event Packages */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Event Packages</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((package_, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{package_.name}</h3>
                  <p className="text-amber-600 font-medium">{package_.guests}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-gray-900">Package Includes:</h4>
                  {package_.includes.map((inclusion, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 text-sm">{inclusion}</span>
                    </div>
                  ))}
                </div>

                <div className="text-sm text-gray-500 italic mb-6">
                  {package_.note}
                </div>

                <button 
                  onClick={() => document.querySelector('#enquiry-btn')?.click()}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200"
                >
                  Get Quote
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Planning Process */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Planning Your Event</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Initial Consultation</h3>
              <p className="text-sm text-gray-600">Discuss your vision, requirements, and budget</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Venue Selection</h3>
              <p className="text-sm text-gray-600">Choose the perfect space and confirm availability</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Custom Planning</h3>
              <p className="text-sm text-gray-600">Design menu, décor, and all event details</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                4
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Event Day</h3>
              <p className="text-sm text-gray-600">Relax while we handle all the details</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How far in advance should I book?</h3>
              <p className="text-gray-600">We recommend booking at least 6-8 weeks in advance for weekends and special dates. For larger events, 2-3 months advance booking ensures the best availability.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can you accommodate dietary restrictions?</h3>
              <p className="text-gray-600">Absolutely. Our chefs can prepare vegetarian, vegan, gluten-free, and other special dietary requirements with advance notice.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you provide decorations?</h3>
              <p className="text-gray-600">Yes, we offer decoration services including tropical flowers, linens, lighting, and themed setups. We can also work with your preferred decorators.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there parking available for guests?</h3>
              <p className="text-gray-600">Yes, we provide complimentary parking for event guests. Our parking area can accommodate cars and small buses.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-amber-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Plan Your Event?
          </h2>
          <p className="text-lg text-amber-100 mb-6 max-w-2xl mx-auto">
            Let us help you create an unforgettable celebration. Contact our events team 
            to discuss your requirements and receive a personalized quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+94770557257"
              className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Call Events Team
            </a>
            <a 
              href="https://wa.me/94770557257?text=Hello%20Amaluna%2C%20I%27d%20like%20to%20enquire%20about%20hosting%20an%20event"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-amber-600 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              WhatsApp
            </a>
            <button 
              onClick={() => document.querySelector('#enquiry-btn')?.click()}
              className="border-2 border-white text-white hover:bg-white hover:text-amber-600 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Send Enquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;