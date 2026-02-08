import React from 'react';
import { Download, Clock, Utensils, Coffee } from 'lucide-react';

const Dining = () => {
  const menuItems = {
    starters: [
      { name: 'Negombo Prawn Cocktail', description: 'Fresh local prawns with spiced cocktail sauce', price: '—' },
      { name: 'Coconut-Lime Ceviche', description: 'Fish marinated in lime and coconut milk', price: '—' },
      { name: 'Sri Lankan Spring Rolls', description: 'Crispy rolls with vegetables and curry leaves', price: '—' }
    ],
    mains: [
      { name: 'Sri Lankan Seafood Curry', description: 'Traditional curry with fresh fish and coconut milk', price: '—' },
      { name: 'Grilled Lagoon Fish', description: 'Daily catch grilled with local spices', price: '—' },
      { name: 'Vegetable Kottu', description: 'Chopped flatbread stir-fried with vegetables', price: '—' },
      { name: 'Chicken Curry', description: 'Authentic Sri Lankan style with rice and accompaniments', price: '—' }
    ],
    desserts: [
      { name: 'Watalappan', description: 'Traditional Sri Lankan coconut custard', price: '—' },
      { name: 'Tropical Fruit Plate', description: 'Seasonal fresh fruits from local markets', price: '—' },
      { name: 'Coconut Ice Cream', description: 'Homemade with fresh coconut', price: '—' }
    ]
  };

  const beverages = [
    { name: 'Fresh Coconut Water', description: 'Straight from the shell', price: '—' },
    { name: 'King Coconut', description: 'Sweet and refreshing local favorite', price: '—' },
    { name: 'Ceylon Tea', description: 'Premium Sri Lankan black tea', price: '—' },
    { name: 'Fresh Fruit Juices', description: 'Mango, pineapple, passion fruit', price: '—' },
    { name: 'Local Beer', description: 'Lion Lager and other Sri Lankan brews', price: '—' },
    { name: 'Wine Selection', description: 'International wines by the glass or bottle', price: '—' }
  ];

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Dining at Amaluna
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience authentic Sri Lankan flavors alongside international favorites, 
            prepared with fresh local ingredients and served in our relaxed lagoon-side setting.
          </p>
        </div>

        {/* Restaurant & Bar Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Restaurant */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg"
              alt="Amaluna Restaurant"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center mb-3">
                <Utensils className="h-6 w-6 text-amber-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Restaurant</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Our main restaurant offers indoor and outdoor seating with beautiful lagoon views. 
                Enjoy fresh seafood, traditional Sri Lankan curries, and international dishes 
                prepared by our skilled chefs.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>Breakfast: 7:00 AM - 10:00 AM | Dinner: 6:00 PM - 10:00 PM</span>
              </div>
            </div>
          </div>

          {/* Bar */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg"
              alt="Amaluna Bar"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center mb-3">
                <Coffee className="h-6 w-6 text-amber-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Bar</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Unwind at our poolside bar with tropical cocktails, local beers, and fresh juices. 
                The perfect spot to watch the sunset while enjoying a refreshing drink and light snacks.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>Open: 10:00 AM - 11:00 PM daily</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sample Menu */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Sample Menu</h2>
              <p className="text-gray-600">A taste of what awaits you at Amaluna</p>
            </div>
            <button className="mt-4 sm:mt-0 flex items-center bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              <Download className="h-5 w-5 mr-2" />
              Download Full Menu (PDF)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Starters */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-amber-600">
                Starters
              </h3>
              <div className="space-y-4">
                {menuItems.starters.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      <span className="text-amber-600 font-semibold ml-2">{item.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mains */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-amber-600">
                Main Courses
              </h3>
              <div className="space-y-4">
                {menuItems.mains.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      <span className="text-amber-600 font-semibold ml-2">{item.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Desserts */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-amber-600">
                Desserts
              </h3>
              <div className="space-y-4">
                {menuItems.desserts.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      <span className="text-amber-600 font-semibold ml-2">{item.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Beverages */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Beverages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {beverages.map((item, index) => (
              <div key={index} className="flex justify-between items-start py-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <span className="text-amber-600 font-semibold ml-4">{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Special Dietary Requirements */}
        <div className="bg-amber-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Special Dietary Requirements</h2>
          <p className="text-gray-600 mb-6">
            We're happy to accommodate various dietary needs and preferences. Our chefs can prepare 
            vegetarian, vegan, and gluten-free options with advance notice.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Utensils className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Vegetarian Friendly</h3>
              <p className="text-sm text-gray-600">Fresh vegetables and plant-based options</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Utensils className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Halal Available</h3>
              <p className="text-sm text-gray-600">Prepared according to Islamic guidelines</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Utensils className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Allergy Conscious</h3>
              <p className="text-sm text-gray-600">Please inform us of any food allergies</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gray-900 rounded-2xl p-8 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Taste Sri Lanka?
          </h2>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
            Reserve your table or enquire about our dining experiences. 
            We're happy to recommend dishes based on your preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+94770557257"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Call to Reserve
            </a>
            <a 
              href="https://wa.me/94770557257?text=Hello%20Amaluna%2C%20I%27d%20like%20to%20enquire%20about%20dining%20reservations"
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

export default Dining;