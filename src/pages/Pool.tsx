import React from 'react';
import { Clock, Users, Droplets, Umbrella, Utensils, Car } from 'lucide-react';

const Pool = () => {
  const dayPassPackages = [
    {
      name: 'Weekday Day-Pass',
      period: 'Monday - Thursday',
      inclusions: [
        'Pool access 9:00 AM - 6:00 PM',
        'Complimentary pool towel',
        'Lounge chair access',
        'Shower facilities',
        'Welcome drink on arrival'
      ],
      price: '—',
      highlight: false
    },
    {
      name: 'Weekend Day-Pass',
      period: 'Friday - Sunday & Public Holidays',
      inclusions: [
        'Pool access 9:00 AM - 7:00 PM',
        'Complimentary pool towel',
        'Premium lounge chair access',
        'Shower facilities',
        'Welcome drink on arrival',
        '10% discount on food & beverages'
      ],
      price: '—',
      highlight: true
    }
  ];

  const faqs = [
    {
      question: 'What are the pool operating hours?',
      answer: 'Our pool is open daily from 6:00 AM to 10:00 PM for resort guests. Day-pass visitors can enjoy pool access during their specified time slots.'
    },
    {
      question: 'Is there a children\'s area?',
      answer: 'Yes, we have a shallow section of the pool that\'s perfect for children. Children must be supervised by adults at all times.'
    },
    {
      question: 'Are lockers available?',
      answer: 'Yes, secure lockers are available for day-pass guests to store personal belongings. Keys are provided at check-in.'
    },
    {
      question: 'Can I bring my own food and drinks?',
      answer: 'Outside food and beverages are not permitted. However, our poolside bar and restaurant offer a wide selection of refreshments and meals.'
    },
    {
      question: 'Do I need to book in advance?',
      answer: 'We recommend booking day-passes in advance, especially during weekends and holidays, to guarantee availability.'
    },
    {
      question: 'What should I bring?',
      answer: 'Just bring swimwear, sunscreen, and a valid ID. We provide towels, lounge chairs, and shower facilities.'
    }
  ];

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Resort Pool & Day-Pass
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dive into relaxation at our resort-style pool. Whether you're staying with us or 
            visiting for the day, enjoy our beautiful pool area with lagoon views and tropical surroundings.
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-16">
          <img
            src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg"
            alt="Amaluna Resort Pool"
            className="w-full h-96 md:h-[500px] object-cover rounded-2xl"
          />
        </div>

        {/* Pool Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Pool Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Crystal Clear Waters</h3>
              <p className="text-gray-600">Large freshwater pool with modern filtration system for pristine swimming conditions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Umbrella className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Shaded Lounging</h3>
              <p className="text-gray-600">Plenty of comfortable loungers with umbrellas and shaded areas for all-day comfort</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Poolside Service</h3>
              <p className="text-gray-600">Enjoy food and beverage service delivered right to your poolside lounger</p>
            </div>
          </div>
        </div>

        {/* Day-Pass Packages */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Day-Pass Packages</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {dayPassPackages.map((package_, index) => (
              <div 
                key={index}
                className={`rounded-lg p-8 ${
                  package_.highlight 
                    ? 'bg-amber-50 border-2 border-amber-200 relative' 
                    : 'bg-white border border-gray-200'
                } shadow-sm hover:shadow-md transition-shadow duration-300`}
              >
                {package_.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{package_.name}</h3>
                  <p className="text-gray-600">{package_.period}</p>
                </div>

                <div className="space-y-3 mb-8">
                  <h4 className="font-semibold text-gray-900">Package Includes:</h4>
                  {package_.inclusions.map((inclusion, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="w-2 h-2 bg-amber-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{inclusion}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {package_.price} <span className="text-lg font-normal text-gray-600">per person</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    const enquiryBtn = document.querySelector('#enquiry-btn') as HTMLButtonElement;
                    if (enquiryBtn) enquiryBtn.click();
                  }}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-200 ${
                    package_.highlight
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white'
                  }`}
                >
                  Enquire Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Pool Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pool Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-amber-600 mr-3" />
                <div>
                  <span className="font-semibold">Pool Hours:</span>
                  <p className="text-gray-600">6:00 AM - 10:00 PM daily</p>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-amber-600 mr-3" />
                <div>
                  <span className="font-semibold">Day-Pass Hours:</span>
                  <p className="text-gray-600">Weekdays: 9:00 AM - 6:00 PM<br />Weekends: 9:00 AM - 7:00 PM</p>
                </div>
              </div>
              <div className="flex items-center">
                <Car className="h-5 w-5 text-amber-600 mr-3" />
                <div>
                  <span className="font-semibold">Parking:</span>
                  <p className="text-gray-600">Complimentary parking for day-pass guests</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Nearby</h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-600 rounded-full mr-3 mt-2"></div>
                <span>Amaluna Restaurant & Bar (on-site)</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-600 rounded-full mr-3 mt-2"></div>
                <span>Negombo Beach (10 minutes drive)</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-600 rounded-full mr-3 mt-2"></div>
                <span>Local fishing harbor and lagoon tours</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-600 rounded-full mr-3 mt-2"></div>
                <span>Traditional markets and local restaurants</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready for a Pool Day?
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Book your day-pass or enquire about availability for your preferred date. 
            Our team is here to help make your pool day perfect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+94770557257"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Call to Book
            </a>
            <a 
              href="https://wa.me/94770557257?text=Hello%20Amaluna%2C%20I%27d%20like%20to%20enquire%20about%20pool%20day-pass"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              WhatsApp
            </a>
            <button 
              onClick={() => document.querySelector('#enquiry-btn')?.click()}
              className="border-2 border-gray-400 text-gray-600 hover:bg-gray-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Send Enquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pool;