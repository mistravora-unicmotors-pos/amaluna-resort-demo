import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Wifi, Coffee, Car, MapPin, Users, Utensils, Waves, ChevronDown, Award, Shield, Clock } from 'lucide-react';
import BookingBar from '../components/BookingBar';
import ScrollReveal from '../components/ScrollReveal';
import OptimizedImage from '../components/OptimizedImage';
import SectionHeader from '../components/SectionHeader';
import AnimatedCounter from '../components/AnimatedCounter';
import GoogleReviews from '../components/GoogleReviews';

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
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ transform: 'translateZ(0)' }}>
          <OptimizedImage
            src="https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg"
            alt="Amaluna Resorts lagoon view"
            className="w-full h-full object-cover scale-110"
            priority={true}
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6 border border-white/20">
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span className="text-gray-200">Premium Boutique Resort in Sri Lanka</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
            Escape to Easy Luxury<br />
            <span className="text-gradient-gold">by the Lagoon</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-2xl mx-auto font-body">
            Spacious rooms, a signature pool, and warm Sri Lankan hospitality—minutes from the coast.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => {
                const enquiryBtn = document.querySelector('#enquiry-btn') as HTMLButtonElement;
                if (enquiryBtn) enquiryBtn.click();
              }}
              className="btn-primary text-lg px-10 py-4"
            >
              Enquire Now
            </button>
            <a 
              href="tel:+94770557257"
              className="border-2 border-white/80 text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 backdrop-blur-sm"
            >
              Call Now
            </a>
            <a 
              href="https://wa.me/94770557257?text=Hello%20Amaluna%2C%20I%27d%20like%20to%20enquire"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-green-400/80 text-green-400 hover:bg-green-500 hover:text-white hover:border-green-500 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 backdrop-blur-sm"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-scroll-hint">
          <ChevronDown className="h-8 w-8 text-white/60" />
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
        <div className="container-luxury">
          <SectionHeader
            title="Why Choose Amaluna"
            subtitle="Experience the perfect blend of comfort, nature, and hospitality"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {usps.map((usp, index) => (
              <ScrollReveal
                key={index}
                delay={index * 100}
                direction="up"
              >
                <div className="text-center p-8 bg-white rounded-2xl shadow-luxury hover:shadow-luxury-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="flex justify-center mb-5">
                  <div className="p-3 bg-amber-50 rounded-xl group-hover:bg-amber-100 transition-colors">
                    {usp.icon}
                  </div>
                </div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">
                  {usp.title}
                </h3>
                <p className="text-gray-600 font-body">
                  {usp.description}
                </p>
              </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Animated Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="text-center">
              <AnimatedCounter end={5000} suffix="+" className="text-3xl md:text-4xl font-bold text-amber-600" />
              <p className="text-gray-600 text-sm mt-1 font-body">Happy Guests</p>
            </div>
            <div className="text-center">
              <AnimatedCounter end={4} suffix="" className="text-3xl md:text-4xl font-bold text-amber-600" />
              <p className="text-gray-600 text-sm mt-1 font-body">Room Categories</p>
            </div>
            <div className="text-center">
              <AnimatedCounter end={4.8} suffix="/5" className="text-3xl md:text-4xl font-bold text-amber-600" />
              <p className="text-gray-600 text-sm mt-1 font-body">Guest Rating</p>
            </div>
            <div className="text-center">
              <AnimatedCounter end={15} suffix=" min" className="text-3xl md:text-4xl font-bold text-amber-600" />
              <p className="text-gray-600 text-sm mt-1 font-body">From Airport</p>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Highlights Section */}
      <ScrollReveal>
        <section className="py-20">
        <div className="container-luxury">
          <SectionHeader
            title="Discover Amaluna"
            subtitle="Everything you need for the perfect getaway"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {highlights.map((highlight, index) => (
              <ScrollReveal
                key={index}
                delay={index * 150}
                direction="up"
              >
                <Link 
                  to={highlight.link}
                  className="group block bg-white rounded-2xl shadow-luxury hover:shadow-luxury-lg transition-all duration-300 overflow-hidden hover:-translate-y-2"
                >
                <div className="aspect-w-16 aspect-h-12 relative overflow-hidden">
                  <OptimizedImage
                    src={highlight.image}
                    alt={highlight.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    width={400}
                    height={192}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white">
                      {highlight.icon}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600 font-body">
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

      {/* Resort Video Section */}
      <ScrollReveal>
        <section className="py-20 bg-gray-900">
          <div className="container-luxury">
            <SectionHeader
              title="Experience Amaluna"
              subtitle="Take a virtual tour of our beautiful resort"
              light
            />
            <div className="mt-12 max-w-5xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-luxury-xl aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/1J5fGcvRBzI?autoplay=1&mute=1&loop=1&playlist=1J5fGcvRBzI&controls=1&rel=0&playsinline=1"
                  title="Amaluna Resorts Video Tour"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Google Reviews Section */}
      <ScrollReveal>
        <section className="py-20 bg-amber-50/50">
        <div className="container-luxury">
          <SectionHeader
            title="Guest Stories"
            subtitle="Hear from our happy guests"
          />
          <GoogleReviews />
        </div>
      </section>
      </ScrollReveal>

      {/* Trust Badges */}
      <ScrollReveal>
        <section className="py-12 bg-white border-t border-b border-gray-100">
          <div className="container-luxury">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {[
                { icon: Shield, label: 'Secure Booking' },
                { icon: Award, label: 'Top Rated' },
                { icon: Clock, label: '24/7 Support' },
                { icon: Star, label: 'Best Price' },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-500">
                  <badge.icon className="h-5 w-5 text-amber-500" />
                  <span className="text-sm font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Location Teaser */}
      <ScrollReveal>
        <section className="py-20">
        <div className="container-luxury">
          <div className="bg-gradient-dark rounded-3xl overflow-hidden shadow-luxury-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12 text-white flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  Find Us in <span className="text-gradient-gold">Negombo</span>
                </h2>
                <p className="text-xl text-white/90 mb-8 font-body">
                  Just 15 minutes from Bandaranaike International Airport and moments from Negombo's beautiful beaches.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-amber-500 mr-3" />
                    <span className="text-white/80">276, Pamunugama Road, Kepungoda</span>
                  </div>
                  <div className="flex items-center">
                    <Car className="h-5 w-5 text-amber-500 mr-3" />
                    <span className="text-white/80">15 minutes from airport</span>
                  </div>
                </div>
                <Link 
                  to="/location"
                  className="inline-block btn-primary w-fit"
                >
                  View Location
                </Link>
              </div>
              <div className="h-64 lg:h-full min-h-[300px]">
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