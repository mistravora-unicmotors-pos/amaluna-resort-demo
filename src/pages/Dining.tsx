import React from 'react';
import { Download, Clock, Utensils, Coffee, Leaf, AlertCircle } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import OptimizedImage from '../components/OptimizedImage';

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
    <div>
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <OptimizedImage
          src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg"
          alt="Amaluna Dining"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={600}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">Dining at Amaluna</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-body">
            Authentic Sri Lankan flavors and international favorites
          </p>
        </div>
      </section>

      <div className="container-luxury section-padding">

        {/* Restaurant & Bar Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Restaurant */}
          <ScrollReveal direction="left">
          <div className="bg-white rounded-2xl shadow-luxury overflow-hidden hover:shadow-luxury-lg transition-all duration-300 group">
            <div className="overflow-hidden">
              <OptimizedImage
                src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg"
                alt="Amaluna Restaurant"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                width={600}
                height={256}
              />
            </div>
            <div className="p-6">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-amber-50 rounded-lg mr-3"><Utensils className="h-6 w-6 text-amber-600" /></div>
                <h2 className="text-2xl font-heading font-bold text-gray-900">Restaurant</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Our main restaurant offers indoor and outdoor seating with beautiful lagoon views. 
                Enjoy fresh seafood, traditional Sri Lankan curries, and international dishes 
                prepared by our skilled chefs.
              </p>
              <div className="flex items-center text-sm text-gray-500 bg-amber-50 rounded-lg px-3 py-2">
                <Clock className="h-4 w-4 mr-1 text-amber-600" />
                <span>Breakfast: 7:00 AM - 10:00 AM | Dinner: 6:00 PM - 10:00 PM</span>
              </div>
            </div>
          </div>
          </ScrollReveal>

          {/* Bar */}
          <ScrollReveal direction="right">
          <div className="bg-white rounded-2xl shadow-luxury overflow-hidden hover:shadow-luxury-lg transition-all duration-300 group">
            <div className="overflow-hidden">
              <OptimizedImage
                src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg"
                alt="Amaluna Bar"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                width={600}
                height={256}
              />
            </div>
            <div className="p-6">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-amber-50 rounded-lg mr-3"><Coffee className="h-6 w-6 text-amber-600" /></div>
                <h2 className="text-2xl font-heading font-bold text-gray-900">Bar</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Unwind at our poolside bar with tropical cocktails, local beers, and fresh juices. 
                The perfect spot to watch the sunset while enjoying a refreshing drink and light snacks.
              </p>
              <div className="flex items-center text-sm text-gray-500 bg-amber-50 rounded-lg px-3 py-2">
                <Clock className="h-4 w-4 mr-1 text-amber-600" />
                <span>Open: 10:00 AM - 11:00 PM daily</span>
              </div>
            </div>
          </div>
          </ScrollReveal>
        </div>

        {/* Sample Menu */}
        <ScrollReveal>
        <div className="bg-gradient-to-br from-gray-50 to-amber-50/30 rounded-3xl p-8 md:p-10 mb-12 border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <SectionHeader title="Sample Menu" subtitle="A taste of what awaits you at Amaluna" align="left" />
            <button className="mt-4 sm:mt-0 btn-primary flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download Menu
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Starters */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-4 pb-2 border-b-2 border-amber-400">
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
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-4 pb-2 border-b-2 border-amber-400">
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
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-4 pb-2 border-b-2 border-amber-400">
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
        </ScrollReveal>

        {/* Beverages */}
        <ScrollReveal>
        <div className="bg-white rounded-2xl shadow-luxury p-8 mb-12">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Beverages</h2>
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
        </ScrollReveal>

        {/* Special Dietary Requirements */}
        <ScrollReveal>
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-3xl p-8 md:p-10 mb-12 border border-amber-100">
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
        </ScrollReveal>

        {/* Call to Action */}
        <ScrollReveal>
        <div className="text-center bg-gradient-dark rounded-3xl p-10 text-white">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
            Ready to Taste Sri Lanka?
          </h2>
          <p className="text-lg text-white/85 mb-6 max-w-2xl mx-auto font-body">
            Reserve your table or enquire about our dining experiences. 
            We're happy to recommend dishes based on your preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+94770557257"
              className="btn-primary"
            >
              Call to Reserve
            </a>
            <a 
              href="https://wa.me/94770557257?text=Hello%20Amaluna%2C%20I%27d%20like%20to%20enquire%20about%20dining%20reservations"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white/70 text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full font-semibold transition-all duration-300"
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

export default Dining;