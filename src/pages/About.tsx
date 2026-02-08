import React from 'react';
import { Heart, Leaf, Users, MapPin } from 'lucide-react';

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
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            About Amaluna Resorts
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Where Sri Lankan hospitality meets modern comfort in a tranquil lagoon-side setting
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-16">
          <img
            src="https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg"
            alt="Amaluna Resorts lagoon view"
            className="w-full h-96 md:h-[500px] object-cover rounded-2xl"
          />
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
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
            <div>
              <img
                src="https://images.pexels.com/photos/1031641/pexels-photo-1031641.jpeg"
                alt="Negombo lagoon sunset"
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What Drives Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sustainability Section */}
        <div className="mb-16">
          <div className="bg-green-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Commitment to Sustainability</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We believe in protecting the beautiful environment that makes Amaluna special
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Water Conservation</h3>
                <p className="text-gray-600">
                  Rainwater harvesting, greywater recycling, and mindful usage throughout our operations
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Local Sourcing</h3>
                <p className="text-gray-600">
                  Supporting local farmers and suppliers, featuring fresh Sri Lankan ingredients in our restaurant
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Community Partnership</h3>
                <p className="text-gray-600">
                  Working with local communities to preserve lagoon ecosystems and traditional crafts
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-20 text-right mr-8">
                    <span className="text-2xl font-bold text-amber-600">{milestone.year}</span>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 bg-amber-600 rounded-full mt-2 mr-8"></div>
                  <div className="flex-1">
                    <p className="text-gray-700 text-lg">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Meet Our Team</h2>
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-lg text-gray-600 mb-6">
                Our dedicated team combines years of hospitality experience with genuine passion 
                for making every guest feel welcome. From housekeeping to the kitchen, reception 
                to maintenance, each team member contributes to the warm, family atmosphere 
                that makes Amaluna special.
              </p>
              <p className="text-gray-600">
                Many of our staff have been with us since opening, and their commitment to 
                excellence and authentic Sri Lankan hospitality shines through in every interaction. 
                We're proud to be not just a team, but a family dedicated to your comfort and enjoyment.
              </p>
            </div>
          </div>
        </div>

        {/* Location Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Negombo?</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg"
                alt="Negombo fishing boats"
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Perfect Gateway</h3>
                <p className="text-gray-600">
                  Just 15 minutes from Bandaranaike International Airport, making us the ideal 
                  first or last stop on your Sri Lankan adventure.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Rich Culture</h3>
                <p className="text-gray-600">
                  Experience authentic fishing village life, colonial heritage, and vibrant 
                  local markets just minutes from our peaceful retreat.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Natural Beauty</h3>
                <p className="text-gray-600">
                  The unique lagoon ecosystem provides stunning sunsets, diverse birdlife, 
                  and tranquil waters perfect for relaxation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-amber-50 rounded-2xl p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Experience Amaluna
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            We'd love to welcome you to our family and share the beauty of Sri Lanka 
            from our tranquil lagoon-side home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+94770557257"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Call Us
            </a>
            <a 
              href="https://wa.me/94770557257?text=Hello%20Amaluna%2C%20I%27d%20like%20to%20learn%20more%20about%20your%20resort"
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

export default About;