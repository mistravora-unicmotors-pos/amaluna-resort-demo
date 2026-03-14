import React from 'react';
import { Users, Heart, Calendar, Camera, Music, Utensils } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import OptimizedImage from '../components/OptimizedImage';
import FAQAccordion from '../components/FAQAccordion';

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
    <div>
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <OptimizedImage
          src="https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg"
          alt="Events at Amaluna"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={600}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">Events & Functions</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-body">
            Create lasting memories in our beautiful lagoon-side setting
          </p>
        </div>
      </section>

      <div className="container-luxury section-padding">

        {/* Event Types */}
        <div className="mb-20">
          <SectionHeader title="Event Venues" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            {eventTypes.map((event, index) => (
              <ScrollReveal key={index} delay={index * 100} direction="up">
              <div 
                className="bg-white rounded-2xl shadow-luxury hover:shadow-luxury-lg transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                <div className="overflow-hidden">
                  <OptimizedImage
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    width={400}
                    height={192}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mr-3">
                      <div className="text-amber-600">{event.icon}</div>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-gray-900">{event.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4 font-body">{event.description}</p>
                  
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
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="mb-20">
          <SectionHeader title="Our Services" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {services.map((service, index) => (
              <ScrollReveal key={index} delay={index * 100} direction="up">
              <div className="text-center bg-white rounded-2xl shadow-luxury p-8 hover:shadow-luxury-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-amber-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 font-body">
                  {service.description}
                </p>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Event Packages */}
        <div className="mb-20">
          <SectionHeader title="Event Packages" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            {packages.map((package_, index) => (
              <ScrollReveal key={index} delay={index * 100} direction="up">
              <div 
                className="bg-white border border-gray-100 rounded-2xl p-8 shadow-luxury hover:shadow-luxury-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">{package_.name}</h3>
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
                  className="w-full btn-primary"
                >
                  Get Quote
                </button>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Planning Process */}
        <ScrollReveal>
        <div className="bg-gradient-to-br from-gray-50 to-stone-50 rounded-3xl p-10 mb-20">
          <h2 className="text-2xl font-heading font-bold text-gray-900 text-center mb-8">Planning Your Event</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-600 text-white rounded-xl flex items-center justify-center mx-auto mb-3 font-bold text-lg shadow-gold">
                1
              </div>
              <h3 className="font-heading font-semibold text-gray-900 mb-2">Initial Consultation</h3>
              <p className="text-sm text-gray-600 font-body">Discuss your vision, requirements, and budget</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-600 text-white rounded-xl flex items-center justify-center mx-auto mb-3 font-bold text-lg shadow-gold">
                2
              </div>
              <h3 className="font-heading font-semibold text-gray-900 mb-2">Venue Selection</h3>
              <p className="text-sm text-gray-600 font-body">Choose the perfect space and confirm availability</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-600 text-white rounded-xl flex items-center justify-center mx-auto mb-3 font-bold text-lg shadow-gold">
                3
              </div>
              <h3 className="font-heading font-semibold text-gray-900 mb-2">Custom Planning</h3>
              <p className="text-sm text-gray-600 font-body">Design menu, décor, and all event details</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-600 text-white rounded-xl flex items-center justify-center mx-auto mb-3 font-bold text-lg shadow-gold">
                4
              </div>
              <h3 className="font-heading font-semibold text-gray-900 mb-2">Event Day</h3>
              <p className="text-sm text-gray-600 font-body">Relax while we handle all the details</p>
            </div>
          </div>
        </div>
        </ScrollReveal>

        {/* FAQ */}
        <div className="mb-20">
          <SectionHeader title="Frequently Asked Questions" />
          <div className="max-w-3xl mx-auto mt-10">
            <FAQAccordion items={[
              { question: 'How far in advance should I book?', answer: 'We recommend booking at least 6-8 weeks in advance for weekends and special dates. For larger events, 2-3 months advance booking ensures the best availability.' },
              { question: 'Can you accommodate dietary restrictions?', answer: 'Absolutely. Our chefs can prepare vegetarian, vegan, gluten-free, and other special dietary requirements with advance notice.' },
              { question: 'Do you provide decorations?', answer: 'Yes, we offer decoration services including tropical flowers, linens, lighting, and themed setups. We can also work with your preferred decorators.' },
              { question: 'Is there parking available for guests?', answer: 'Yes, we provide complimentary parking for event guests. Our parking area can accommodate cars and small buses.' }
            ]} />
          </div>
        </div>

        {/* Call to Action */}
        <ScrollReveal>
        <div className="text-center gradient-dark rounded-3xl p-10 text-white">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
            Ready to Plan Your Event?
          </h2>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto font-body">
            Let us help you create an unforgettable celebration. Contact our events team 
            to discuss your requirements and receive a personalized quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+94770557257"
              className="btn-primary"
            >
              Call Events Team
            </a>
            <a 
              href="https://wa.me/94770557257?text=Hello%20Amaluna%2C%20I%27d%20like%20to%20enquire%20about%20hosting%20an%20event"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full font-semibold transition-colors duration-200"
            >
              WhatsApp
            </a>
            <button 
              onClick={() => document.querySelector('#enquiry-btn')?.click()}
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full font-semibold transition-colors duration-200"
            >
              Send Enquiry
            </button>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Events;