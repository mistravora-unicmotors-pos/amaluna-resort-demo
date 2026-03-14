import React from 'react';
import { Heart, Leaf, Users, MapPin } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import OptimizedImage from '../components/OptimizedImage';

const About = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-amber-600" />,
      title: 'Family-Run Warmth',
      description: 'Our family-owned resort brings personal touches and genuine care to every guest experience, creating memories that feel like home.'
    },
    {
      icon: <MapPin className="h-8 w-8 text-amber-600" />,
      title: 'Easy Coastal Access',
      description: 'Perfectly positioned between Negombo\'s beautiful beaches and the tranquil lagoon, offering the best of both worlds.'
    },
    {
      icon: <Users className="h-8 w-8 text-amber-600" />,
      title: 'Thoughtful Service',
      description: 'Our dedicated team anticipates your needs and goes beyond expectations to ensure your stay is effortlessly enjoyable.'
    },
    {
      icon: <Leaf className="h-8 w-8 text-amber-600" />,
      title: 'Sustainable Practices',
      description: 'We\'re committed to protecting our beautiful environment through responsible tourism and community partnerships.'
    }
  ];

  const milestones = [
    { year: '2018', event: 'Amaluna Resorts founded with a vision for boutique hospitality' },
    { year: '2019', event: 'Resort-style pool and gardens completed' },
    { year: '2020', event: 'Restaurant expanded to include lagoon-view dining' },
    { year: '2022', event: 'Sustainability initiatives and local partnerships established' },
    { year: '2024', event: 'Recognition as a leading family-friendly resort in Negombo' }
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <OptimizedImage
          src="https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg"
          alt="Amaluna Resorts lagoon view"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={600}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">About Amaluna Resorts</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-body">
            Where Sri Lankan hospitality meets modern comfort
          </p>
        </div>
      </section>

      <div className="container-luxury section-padding">

        {/* Story Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
            <div>
              <SectionHeader title="Our Story" align="left" />
              <div className="space-y-4 text-gray-600 leading-relaxed font-body mt-6">
                <p>
                  Born from a passion for authentic Sri Lankan hospitality, Amaluna Resorts began 
                  as a family dream to create a haven where guests could experience the true warmth 
                  of our island nation while enjoying modern comforts.
                </p>
                <p>
                  Located on the serene banks of Negombo's lagoon, our resort embodies the perfect 
                  balance between tranquil natural beauty and convenient coastal access. We believe 
                  that the best vacations happen when you can truly relax, knowing that every detail 
                  has been thoughtfully considered.
                </p>
                <p>
                  From our family to yours, we've created spaces where memories are made, friendships 
                  are formed, and the gentle rhythm of lagoon life helps you reconnect with what 
                  matters most. Every room, every meal, and every moment is designed with your 
                  comfort and joy in mind.
                </p>
              </div>
            </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
            <div>
              <OptimizedImage
                src="https://images.pexels.com/photos/1031641/pexels-photo-1031641.jpeg"
                alt="Negombo lagoon sunset"
                className="w-full h-80 object-cover rounded-2xl shadow-luxury"
                width={600}
                height={320}
              />
            </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <SectionHeader title="What Drives Us" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
            {values.map((value, index) => (
              <ScrollReveal key={index} delay={index * 100} direction="up">
              <div className="text-center bg-white rounded-2xl shadow-luxury p-6 hover:shadow-luxury-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-amber-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 font-body">
                  {value.description}
                </p>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Sustainability Section */}
        <div className="mb-20">
          <ScrollReveal>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-10 border border-green-100">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">Our Commitment to Sustainability</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto font-body">
                We believe in protecting the beautiful environment that makes Amaluna special
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center bg-white/60 rounded-2xl p-6">
                <h3 className="text-lg font-heading font-semibold text-gray-900 mb-3">Water Conservation</h3>
                <p className="text-gray-600 font-body">
                  Rainwater harvesting, greywater recycling, and mindful usage throughout our operations
                </p>
              </div>
              <div className="text-center bg-white/60 rounded-2xl p-6">
                <h3 className="text-lg font-heading font-semibold text-gray-900 mb-3">Local Sourcing</h3>
                <p className="text-gray-600 font-body">
                  Supporting local farmers and suppliers, featuring fresh Sri Lankan ingredients in our restaurant
                </p>
              </div>
              <div className="text-center bg-white/60 rounded-2xl p-6">
                <h3 className="text-lg font-heading font-semibold text-gray-900 mb-3">Community Partnership</h3>
                <p className="text-gray-600 font-body">
                  Working with local communities to preserve lagoon ecosystems and traditional crafts
                </p>
              </div>
            </div>
          </div>
          </ScrollReveal>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <SectionHeader title="Our Journey" />
          <div className="max-w-4xl mx-auto mt-10">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <ScrollReveal key={index} delay={index * 80}>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-20 text-right mr-8">
                    <span className="text-2xl font-heading font-bold text-amber-600">{milestone.year}</span>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 bg-amber-500 rounded-full mt-2 mr-8 ring-4 ring-amber-100"></div>
                  <div className="flex-1">
                    <p className="text-gray-700 text-lg font-body">{milestone.event}</p>
                  </div>
                </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <ScrollReveal>
          <div className="bg-gradient-to-br from-gray-50 to-stone-50 rounded-3xl p-10">
            <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-8">Meet Our Team</h2>
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-lg text-gray-600 mb-6 font-body">
                Our dedicated team combines years of hospitality experience with genuine passion 
                for making every guest feel welcome. From housekeeping to the kitchen, reception 
                to maintenance, each team member contributes to the warm, family atmosphere 
                that makes Amaluna special.
              </p>
              <p className="text-gray-600 font-body">
                Many of our staff have been with us since opening, and their commitment to 
                excellence and authentic Sri Lankan hospitality shines through in every interaction. 
                We're proud to be not just a team, but a family dedicated to your comfort and enjoyment.
              </p>
            </div>
          </div>
          </ScrollReveal>
        </div>
        <div className="mb-20">
          <SectionHeader title="Why Negombo?" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-10">
            <ScrollReveal direction="left">
            <div>
              <OptimizedImage
                src="https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg"
                alt="Negombo fishing boats"
                className="w-full h-80 object-cover rounded-2xl shadow-luxury"
                width={600}
                height={320}
              />
            </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-luxury">
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">Perfect Gateway</h3>
                <p className="text-gray-600 font-body">
                  Just 15 minutes from Bandaranaike International Airport, making us the ideal 
                  first or last stop on your Sri Lankan adventure.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-luxury">
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">Rich Culture</h3>
                <p className="text-gray-600 font-body">
                  Experience authentic fishing village life, colonial heritage, and vibrant 
                  local markets just minutes from our peaceful retreat.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-luxury">
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">Natural Beauty</h3>
                <p className="text-gray-600 font-body">
                  The unique lagoon ecosystem provides stunning sunsets, diverse birdlife, 
                  and tranquil waters perfect for relaxation.
                </p>
              </div>
            </div>
            </ScrollReveal>
          </div>
        </div>
        <ScrollReveal>
        <div className="text-center bg-gradient-to-r from-amber-50 to-yellow-50 rounded-3xl p-10 border border-amber-100">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-4">
            Experience Amaluna
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto font-body">
            We'd love to welcome you to our family and share the beauty of Sri Lanka 
            from our tranquil lagoon-side home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+94770557257"
              className="btn-primary"
            >
              Call Us
            </a>
            <a 
              href="https://wa.me/94770557257?text=Hello%20Amaluna%2C%20I%27d%20like%20to%20learn%20more%20about%20your%20resort"
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

export default About;