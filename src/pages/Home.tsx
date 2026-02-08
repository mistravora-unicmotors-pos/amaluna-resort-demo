import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Wifi, Coffee, Car, MapPin, Users, Utensils, Waves } from 'lucide-react';
import BookingBar from '../components/BookingBar';
import ScrollReveal from '../components/ScrollReveal';
import OptimizedImage from '../components/OptimizedImage';

const Home = () => {
  const testimonials = [
    {
      name: "Sarah & Mike",
      location: "UK",
      text: "Perfect location with the most beautiful pool area. The staff made our honeymoon unforgettable.",
      rating: 5
    },
    {
      name: "The Johnson Family",
      location: "Australia", 
      text: "Our kids loved the pool and we loved the peaceful lagoon views. Excellent family-friendly service.",
      rating: 5
    },
    {
      name: "David Chen",
      location: "Singapore",
      text: "Exceptional value and hospitality. The restaurant serves some of the best Sri Lankan cuisine I've tasted.",
      rating: 5
    }
  ];

  const highlights = [
    {
      title: "Rooms",
      description: "Spacious accommodations with lagoon or garden views",
      image: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
      link: "/rooms",
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "Dining", 
      description: "Fresh Sri Lankan cuisine and international favorites",
      image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
      link: "/dining",
      icon: <Utensils className="h-6 w-6" />
    },
    {
      title: "Pool/Day-Pass",
      description: "Resort-style pool with day visitor packages",
      image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
      link: "/pool", 
      icon: <Waves className="h-6 w-6" />
    },
    {
      title: "Offers",
      description: "Special packages and seasonal promotions",
      image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
      link: "/offers",
      icon: <Star className="h-6 w-6" />
    }
  ];

  const usps = [
    {
      icon: <MapPin className="h-8 w-8 text-amber-600" />,
      title: "Lagoon-side Setting",
      description: "Tranquil waters and tropical gardens create the perfect escape"
    },
    {
      icon: <Waves className="h-8 w-8 text-amber-600" />,
      title: "Resort-style Pool", 
      description: "Large swimming pool with loungers and poolside service"
    },
    {
      icon: <Users className="h-8 w-8 text-amber-600" />,
      title: "Family-friendly Comfort",
      description: "Spacious rooms and facilities designed for all ages"
    },
    {
      icon: <Utensils className="h-8 w-8 text-amber-600" />,
      title: "Fresh Dining",
      description: "Local ingredients and authentic Sri Lankan hospitality"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg"
            alt="Amaluna Resorts lagoon view"
            className="w-full h-full object-cover"
            priority={true}
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Escape to Easy Luxury by the Lagoon
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Spacious rooms, a signature pool, and warm Sri Lankan hospitality—minutes from the coast.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => {
                const enquiryBtn = document.querySelector('#enquiry-btn') as HTMLButtonElement;
                if (enquiryBtn) enquiryBtn.click();
              }}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Enquire Now
            </button>
            <a 
              href="tel:+94770557257"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
            >
              Call Now
            </a>
            <a 
              href="https://wa.me/94770557257?text=Hello%20Amaluna%2C%20I%27d%20like%20to%20enquire"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Booking Bar */}
      <ScrollReveal direction="up" className="relative -mt-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingBar />
        </div>
      </ScrollReveal>

      {/* USPs Section */}
      <ScrollReveal>
        <section className="py-20 bg-gray-50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Amaluna
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of comfort, nature, and hospitality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {usps.map((usp, index) => (
              <ScrollReveal
                key={index}
                delay={index * 100}
                direction="up"
              >
                <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                <div className="flex justify-center mb-4">
                  {usp.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {usp.title}
                </h3>
                <p className="text-gray-600">
                  {usp.description}
                </p>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Highlights Section */}
      <ScrollReveal>
        <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Discover Amaluna
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for the perfect getaway
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <ScrollReveal
                key={index}
                delay={index * 150}
                direction="up"
              >
                <Link 
                  to={highlight.link}
                  className="group block bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:scale-105"
                >
                <div className="aspect-w-16 aspect-h-12 relative">
                  <OptimizedImage
                    src={highlight.image}
                    alt={highlight.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    width={400}
                    height={192}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {highlight.icon}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600">
                    {highlight.description}
                  </p>
                </div>
              </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Testimonials Section */}
      <ScrollReveal>
        <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Guest Stories
            </h2>
            <p className="text-xl text-gray-600">
              Hear from our happy guests
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal
                key={index}
                delay={index * 200}
                direction="up"
              >
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Location Teaser */}
      <ScrollReveal>
        <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Find Us in Negombo
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Just 15 minutes from Bandaranaike International Airport and moments from Negombo's beautiful beaches.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-amber-500 mr-3" />
                    <span>276, Pamunugama Road, Kepungoda</span>
                  </div>
                  <div className="flex items-center">
                    <Car className="h-5 w-5 text-amber-500 mr-3" />
                    <span>15 minutes from airport</span>
                  </div>
                </div>
                <Link 
                  to="/location"
                  className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  View Location
                </Link>
              </div>
              <div className="h-64 lg:h-full">
                <OptimizedImage
                  src="https://images.pexels.com/photos/1031641/pexels-photo-1031641.jpeg"
                  alt="Negombo lagoon"
                  className="w-full h-full object-cover"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>
    </div>
  );
};

export default Home;