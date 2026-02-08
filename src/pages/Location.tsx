import React from 'react';
import { MapPin, Plane, Car, Clock, Navigation } from 'lucide-react';

const Location = () => {
  const nearbyAttractions = [
    { name: 'Negombo Beach', distance: '3.5 km', time: '10 minutes drive' },
    { name: 'Negombo Fish Market', distance: '4 km', time: '12 minutes drive' },
    { name: 'Dutch Canal', distance: '2 km', time: '6 minutes drive' },
    { name: 'St. Mary\'s Church', distance: '4.5 km', time: '15 minutes drive' },
    { name: 'Angunakolapelessa Beach', distance: '5 km', time: '15 minutes drive' },
    { name: 'Muthurajawela Marsh', distance: '8 km', time: '20 minutes drive' }
  ];

  const transportOptions = [
    {
      icon: <Plane className="h-6 w-6 text-amber-600" />,
      title: 'From Airport',
      details: [
        'Bandaranaike International Airport: 15 minutes drive',
        'Airport taxi: Available 24/7',
        'Tuk-tuk: 20-25 minutes', 
        'Hotel pickup: Available on request'
      ]
    },
    {
      icon: <Car className="h-6 w-6 text-amber-600" />,
      title: 'By Road',
      details: [
        'From Colombo: 45 minutes via A3 highway',
        'From Kandy: 3 hours via A1 and A3',
        'Parking: Free on-site parking available',
        'Rental cars: Available at airport'
      ]
    }
  ];

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Location & Directions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Perfectly positioned between Negombo's beaches and the tranquil lagoon, 
            just minutes from the international airport.
          </p>
        </div>

        {/* Address & Contact */}
        <div className="bg-amber-50 rounded-2xl p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-start mb-4">
                <MapPin className="h-6 w-6 text-amber-600 mr-3 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Our Address</h2>
                  <p className="text-gray-700">
                    276, Pamunugama Road<br />
                    Kepungoda, 11370<br />
                    Negombo, Sri Lanka
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-start mb-4">
                <Clock className="h-6 w-6 text-amber-600 mr-3 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Contact Information</h2>
                  <p className="text-gray-700 mb-2">
                    Phone: <a href="tel:+94770557257" className="text-amber-600 hover:text-amber-700">077 055 7257</a>
                  </p>
                  <p className="text-gray-700">
                    Email: <a href="mailto:reservations@amalunaresorts.com" className="text-amber-600 hover:text-amber-700">reservations@amalunaresorts.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Find Us Here</h2>
          <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <MapPin className="h-16 w-16 mx-auto mb-4 text-amber-600" />
              <p className="text-lg font-semibold mb-2">Interactive Map</p>
              <p>Google Maps integration would be embedded here</p>
              <p className="text-sm mt-2">
                <a 
                  href="https://maps.google.com/?q=276+Pamunugama+Road+Kepungoda+Negombo+Sri+Lanka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 hover:text-amber-700 underline"
                >
                  Open in Google Maps
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Transport Options */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Getting Here</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {transportOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  {option.icon}
                  <h3 className="text-xl font-bold text-gray-900 ml-3">{option.title}</h3>
                </div>
                <ul className="space-y-2">
                  {option.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Directions */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Driving Directions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Navigation className="h-5 w-5 text-amber-600 mr-2" />
                From Bandaranaike Airport
              </h3>
              <ol className="space-y-3 text-gray-600">
                <li className="flex">
                  <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                  Exit airport and join the Colombo-Katunayake Expressway
                </li>
                <li className="flex">
                  <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                  Take the Ja-Ela exit and follow signs to Negombo
                </li>
                <li className="flex">
                  <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                  Continue on A3 highway towards Negombo
                </li>
                <li className="flex">
                  <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                  Turn right onto Pamunugama Road at Kepungoda
                </li>
                <li className="flex">
                  <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">5</span>
                  Amaluna Resorts will be on your left at 276
                </li>
              </ol>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Navigation className="h-5 w-5 text-amber-600 mr-2" />
                From Colombo City
              </h3>
              <ol className="space-y-3 text-gray-600">
                <li className="flex">
                  <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                  Take A3 highway north towards Negombo
                </li>
                <li className="flex">
                  <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                  Continue for approximately 35km
                </li>
                <li className="flex">
                  <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                  Look for Kepungoda junction signs
                </li>
                <li className="flex">
                  <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                  Turn right onto Pamunugama Road
                </li>
                <li className="flex">
                  <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">5</span>
                  Resort entrance is 200m on the left
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Nearby Attractions */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">What's Nearby</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyAttractions.map((attraction, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <h3 className="font-semibold text-gray-900 mb-2">{attraction.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{attraction.distance}</p>
                <p className="text-sm text-amber-600">{attraction.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Local Tips */}
        <div className="bg-blue-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Local Travel Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Best Travel Times</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Airport pickup: Early morning arrivals avoid traffic</li>
                <li>• From Colombo: Travel after 10 AM or before 4 PM</li>
                <li>• Weekend traffic is lighter on A3 highway</li>
                <li>• Monsoon season: Allow extra travel time</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Transportation Notes</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Tuk-tuks are readily available but negotiate fare</li>
                <li>• Taxi apps work well in this area</li>
                <li>• Local buses connect to Negombo town center</li>
                <li>• Hotel pickup service available with advance notice</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-amber-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Need Directions or Pickup?
          </h2>
          <p className="text-lg text-amber-100 mb-6 max-w-2xl mx-auto">
            Lost or need assistance getting here? Our team is happy to provide detailed directions 
            or arrange airport pickup service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+94770557257"
              className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Call for Help
            </a>
            <a 
              href="https://wa.me/94770557257?text=Hello%20Amaluna%2C%20I%20need%20help%20with%20directions%20to%20your%20resort"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-amber-600 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              WhatsApp Location
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;