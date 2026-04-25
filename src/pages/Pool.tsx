import React from 'react';
import { Clock, Users, Droplets, Umbrella, Utensils, Car } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import OptimizedImage from '../components/OptimizedImage';
import FAQAccordion from '../components/FAQAccordion';
import DayPassBookingForm from '../components/DayPassBookingForm';
import { getSiteSettings } from '../services/siteSettingsService';
import { dayoutPackages } from '../services/dayoutPricingService';

const Pool = () => {
  const faqs = getSiteSettings().faqs.pool;

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <OptimizedImage
          src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg"
          alt="Amaluna Resort Pool"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={600}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">Resort Pool & Day-Pass</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-body">
            Dive into relaxation in our resort-style pool with lagoon views
          </p>
        </div>
      </section>

      <div className="container-luxury section-padding">

        {/* Pool Features */}
        <div className="mb-16">
          <SectionHeader title="Pool Features" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <ScrollReveal delay={0} direction="up">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-luxury hover:shadow-luxury-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Droplets className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-2">Crystal Clear Waters</h3>
              <p className="text-gray-600 dark:text-gray-400 font-body">Large freshwater pool with modern filtration system for pristine swimming conditions</p>
            </div>
            </ScrollReveal>
            <ScrollReveal delay={100} direction="up">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-luxury hover:shadow-luxury-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Umbrella className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-2">Shaded Lounging</h3>
              <p className="text-gray-600 dark:text-gray-400 font-body">Plenty of comfortable loungers with umbrellas and shaded areas for all-day comfort</p>
            </div>
            </ScrollReveal>
            <ScrollReveal delay={200} direction="up">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-luxury hover:shadow-luxury-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-green-50 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Utensils className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-2">Poolside Service</h3>
              <p className="text-gray-600 dark:text-gray-400 font-body">Enjoy food and beverage service delivered right to your poolside lounger</p>
            </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Day-Pass Booking Form & Packages */}
        <div className="mb-16">
          <SectionHeader title="Book a Day Pass" subtitle="Enjoy our pool and facilities for the day" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
            <ScrollReveal direction="left">
              <DayPassBookingForm />
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {dayoutPackages.map((package_) => (
                  <div
                    key={package_.id}
                    className={`rounded-2xl p-8 ${
                      package_.id === 'day-out'
                        ? 'bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-gray-800 dark:to-gray-800 border-2 border-amber-300 dark:border-amber-600 relative shadow-gold'
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-luxury'
                    } hover:shadow-luxury-lg transition-shadow duration-300`}
              >
                    {package_.id === 'day-out' && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                          Most Popular
                        </span>
                      </div>
                    )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{package_.name}</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Adult: LKR {package_.baseAdultPrice.toLocaleString()} · Child: LKR {package_.baseChildPrice.toLocaleString()}
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Package Includes:</h4>
                  {package_.perks.map((perk, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="w-2 h-2 bg-amber-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-400">{perk}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center mb-6">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Prices may vary by date (computed in the booking form).
                  </div>
                </div>

                <button 
                  onClick={() => {
                    const enquiryBtn = document.querySelector('#enquiry-btn') as HTMLButtonElement;
                    if (enquiryBtn) enquiryBtn.click();
                  }}
                  className={`w-full py-3 px-4 rounded-full font-semibold transition-all duration-200 ${
                    package_.id === 'day-out'
                      ? 'btn-primary'
                      : 'btn-outline'
                  }`}
                >
                  Enquire Now
                </button>
              </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Pool Information */}
        <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-luxury p-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">Pool Information</h2>
            <div className="space-y-5">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Pool Hours</span>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">6:00 AM - 10:00 PM daily</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Users className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Day-Pass Hours</span>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Weekdays: 9:00 AM - 6:00 PM<br />Weekends: 9:00 AM - 7:00 PM</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Car className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Parking</span>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Complimentary parking for day-pass guests</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-luxury p-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">What's Nearby</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Amaluna Restaurant & Bar (on-site)</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Negombo Beach (10 minutes drive)</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Local fishing harbor and lagoon tours</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Traditional markets and local restaurants</span>
              </div>
            </div>
          </div>
        </div>
        </ScrollReveal>

        {/* FAQ Section */}
        <div className="mb-16">
          <SectionHeader title="Frequently Asked Questions" />
          <div className="max-w-4xl mx-auto mt-10">
            <FAQAccordion items={faqs.map(f => ({ question: f.question, answer: f.answer }))} />
          </div>
        </div>

        {/* Call to Action */}
        <ScrollReveal>
        <div className="text-center bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-800 rounded-3xl p-10 border border-blue-100 dark:border-gray-700">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Ready for a Pool Day?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto font-body">
            Book your day-pass or enquire about availability for your preferred date.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+94770557257"
              className="btn-primary"
            >
              Call to Book
            </a>
            <a 
              href="https://wa.me/94770557257?text=Hello%20Amaluna%2C%20I%27d%20like%20to%20enquire%20about%20pool%20day-pass"
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

export default Pool;