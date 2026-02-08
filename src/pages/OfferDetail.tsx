import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, Gift, Star, Check, AlertCircle } from 'lucide-react';

const OfferDetail = () => {
  const { offerId } = useParams();

  const offersData: { [key: string]: any } = {
    'weekend-escape': {
      name: 'Weekend Escape',
      tagline: 'Unwind by the lagoon',
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
      description: 'Escape the hustle and bustle of city life with our Weekend Escape package. Designed for couples and solo travelers seeking a peaceful retreat, this offer combines the tranquility of our lagoon-side location with exceptional value and convenience.',
      longDescription: `Immerse yourself in the serene beauty of Negombo's lagoon with extended relaxation time and thoughtful touches that make your getaway truly special. Our Weekend Escape package is perfect for those who want to maximize their downtime and enjoy unhurried mornings with beautiful views.

      Wake up to the gentle sounds of the lagoon, enjoy your welcome drink on your private balcony, and take advantage of late checkout to extend your peaceful morning. Whether you're celebrating an anniversary, need some personal time, or simply want to reconnect with nature, this package offers the perfect balance of comfort and tranquility.`,
      inclusions: [
        'Late checkout until 2:00 PM (subject to availability)',
        'Welcome drink served on arrival',
        'Complimentary high-speed Wi-Fi throughout stay',
        'Full access to pool and lagoon-side areas',
        'Daily housekeeping service',
        'Complimentary pool towels'
      ],
      validity: '15 September - 31 October 2024',
      validDays: 'Available Friday - Sunday',
      terms: [
        'Minimum 2-night stay required',
        'Subject to room availability at time of booking',
        'Cannot be combined with other promotional offers',
        'Advance booking of at least 48 hours required',
        'Late checkout subject to availability on day of departure',
        'Welcome drink served between 2:00 PM - 10:00 PM',
        'Valid for new bookings only',
        'No cash alternative for package inclusions'
      ],
      suitableFor: [
        'Couples seeking romantic getaways',
        'Solo travelers wanting peaceful retreat',
        'Weekend warriors needing to recharge',
        'Anniversary or special occasion celebrations'
      ],
      icon: <Star className="h-8 w-8" />
    },
    'family-stay': {
      name: 'Family Stay Package',
      tagline: 'Creating memories together',
      image: 'https://images.pexels.com/photos/1598073/pexels-photo-1598073.jpeg',
      description: 'Our Family Stay Package is designed to create unforgettable memories for families visiting Sri Lanka. With special children\'s rates and family-focused amenities, we make it easy and affordable for the whole family to enjoy our lagoon-side resort.',
      longDescription: `Bring the whole family to Amaluna and watch as your children discover the magic of Sri Lanka\'s natural beauty. Our Family Stay Package removes the worry about extra costs while adding special touches that make family travel memorable and stress-free.

      From the moment you arrive, we\'ll help you settle in with recommendations for family-friendly local attractions, flexible dining options, and pool activities that keep everyone entertained. Our spacious rooms can accommodate families comfortably, and our staff are always ready to help with special requests that make traveling with children easier.`,
      inclusions: [
        'Children under 12 stay absolutely free in existing bedding',
        'Kids eat for half price at our restaurant',
        'Organized family pool games and activities',
        'Extra bed setup available for additional children',
        'Local tour recommendations and family itinerary planning',
        'Complimentary cribs and high chairs (advance request)',
        'Extended pool hours for families',
        'Welcome treats for children'
      ],
      validity: '1 October - 15 December 2024',
      validDays: 'Available all week',
      terms: [
        'Valid for families with children under 12 years old',
        'Maximum 2 children per room for free accommodation',
        'Extra bed charges apply for additional adults',
        'Minimum 7-day advance booking required',
        'Children must be accompanied by parents/guardians',
        'Age verification may be requested at check-in',
        'Kids meal discounts apply to children\'s menu items only',
        'Subject to room availability',
        'Cannot be combined with other family offers'
      ],
      suitableFor: [
        'Families with children under 12',
        'Multi-generational family trips',
        'Extended family gatherings',
        'School holiday getaways'
      ],
      icon: <Users className="h-8 w-8" />
    },
    'early-bird': {
      name: 'Early Bird Special',
      tagline: 'Plan ahead and save',
      image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
      description: 'Planning your Sri Lankan getaway in advance pays off with our Early Bird Special. Book 30 days ahead and enjoy significant savings along with premium perks that enhance your entire experience.',
      longDescription: `Reward yourself for being an organized traveler with our Early Bird Special. This offer combines substantial savings with valuable perks, making it easier to enjoy premium experiences during your stay at Amaluna.

      From the moment you land, you\'ll feel the VIP treatment with complimentary airport pickup, ensuring a smooth start to your vacation. The flexible cancellation policy gives you peace of mind, while the room rate savings let you allocate more budget to experiences and excursions around beautiful Negombo and beyond.`,
      inclusions: [
        'Up to 15% discount on published room rates',
        'Free cancellation up to 7 days before arrival',
        'Complimentary one-way airport pickup service',
        'Pool towel service and lounge chair reservations',
        'Early check-in subject to availability',
        'Welcome refreshments on arrival',
        'Complimentary luggage storage before/after stay'
      ],
      validity: 'Ongoing offer - Valid for stays until March 31, 2025',
      validDays: 'Available all week, subject to advance booking requirements',
      terms: [
        'Must be booked minimum 30 days in advance of arrival',
        'Full payment required at time of booking',
        'Valid for stays until March 31, 2025',
        'Cannot be combined with other promotional offers',
        'Free cancellation until 7 days before arrival date',
        'After 7 days, standard cancellation policies apply',
        'Airport pickup valid for Bandaranaike International Airport only',
        'Discount applies to room rate only, excludes taxes and extras',
        'Subject to room availability'
      ],
      suitableFor: [
        'Advance planners seeking value',
        'International visitors needing airport transfers',
        'Flexible travelers who can commit early',
        'Budget-conscious travelers wanting premium perks'
      ],
      icon: <Gift className="h-8 w-8" />
    }
  };

  const offer = offersData[offerId || ''];

  if (!offer) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Offer not found</h1>
        <Link to="/offers" className="text-amber-600 hover:text-amber-700">
          ← Back to Offers
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link 
          to="/offers" 
          className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Offers
        </Link>

        {/* Offer Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="text-amber-600 mr-3">
              {offer.icon}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              {offer.name}
            </h1>
          </div>
          <p className="text-xl text-amber-600 font-medium mb-2">{offer.tagline}</p>
          <p className="text-lg text-gray-600">{offer.description}</p>
        </div>

        {/* Hero Image */}
        <div className="mb-12">
          <img
            src={offer.image}
            alt={offer.name}
            className="w-full h-96 md:h-[500px] object-cover rounded-lg"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Detailed Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Offer</h2>
              <div className="prose prose-gray max-w-none">
                {offer.longDescription.split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index} className="text-gray-600 mb-4 leading-relaxed">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </div>

            {/* Package Inclusions */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {offer.inclusions.map((inclusion: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{inclusion}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suitable For */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Perfect For</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {offer.suitableFor.map((item: string, index: number) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms & Conditions */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Terms & Conditions</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <ul className="space-y-2">
                  {offer.terms.map((term: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{term}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Offer Summary */}
              <div className="bg-amber-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Offer Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-900">Valid Period:</span>
                      <p className="text-gray-600 text-sm">{offer.validity}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-900">Available:</span>
                      <p className="text-gray-600 text-sm">{offer.validDays}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <a 
                    href="tel:+94770557257"
                    className="block w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-lg font-semibold text-center transition-colors duration-200"
                  >
                    Call to Book
                  </a>
                  <a 
                    href={`https://wa.me/94770557257?text=Hello%20Amaluna%2C%20I%27d%20like%20to%20enquire%20about%20the%20${encodeURIComponent(offer.name)}%20offer`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold text-center transition-colors duration-200"
                  >
                    WhatsApp
                  </a>
                  <button 
                    onClick={() => document.querySelector('#enquiry-btn')?.click()}
                    className="block w-full border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Send Enquiry
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Have Questions?</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">Phone:</span>
                    <p className="text-gray-600">077 055 7257</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Email:</span>
                    <p className="text-gray-600">reservations@amalunaresorts.com</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Response Time:</span>
                    <p className="text-gray-600">Within 4 hours (usually faster)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetail;