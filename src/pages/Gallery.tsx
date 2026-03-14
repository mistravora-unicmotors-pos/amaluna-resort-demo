import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, Heart } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import OptimizedImage from '../components/OptimizedImage';
import SectionHeader from '../components/SectionHeader';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [likes, setLikes] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('gallery-likes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      localStorage.setItem('gallery-likes', JSON.stringify(updated));
      return updated;
    });
  };

  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'rooms', name: 'Rooms' },
    { id: 'pool', name: 'Pool' },
    { id: 'dining', name: 'Dining' },
    { id: 'surroundings', name: 'Garden & Surroundings' }
  ];

  const images = [
    // Rooms
    { id: 1, src: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg', alt: 'Lagoon View King Room', category: 'rooms' },
    { id: 2, src: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg', alt: 'Garden Twin Room', category: 'rooms' },
    { id: 3, src: 'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg', alt: 'Family Suite Living Area', category: 'rooms' },
    { id: 4, src: 'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg', alt: 'Poolside Deluxe Room', category: 'rooms' },
    { id: 5, src: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg', alt: 'Room Balcony View', category: 'rooms' },
    { id: 6, src: 'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg', alt: 'Ensuite Bathroom', category: 'rooms' },

    // Pool
    { id: 7, src: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg', alt: 'Resort Pool Overview', category: 'pool' },
    { id: 8, src: 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg', alt: 'Poolside Loungers', category: 'pool' },
    { id: 9, src: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg', alt: 'Pool Evening View', category: 'pool' },
    { id: 10, src: 'https://images.pexels.com/photos/2346091/pexels-photo-2346091.jpeg', alt: 'Pool Deck Area', category: 'pool' },
    { id: 11, src: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg', alt: 'Pool Bar Service', category: 'pool' },

    // Dining
    { id: 12, src: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg', alt: 'Restaurant Interior', category: 'dining' },
    { id: 13, src: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg', alt: 'Bar Area', category: 'dining' },
    { id: 14, src: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg', alt: 'Sri Lankan Curry Dish', category: 'dining' },
    { id: 15, src: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg', alt: 'Fresh Seafood Platter', category: 'dining' },
    { id: 16, src: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg', alt: 'Outdoor Dining Setup', category: 'dining' },

    // Garden & Surroundings  
    { id: 17, src: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg', alt: 'Lagoon Sunset View', category: 'surroundings' },
    { id: 18, src: 'https://images.pexels.com/photos/1031641/pexels-photo-1031641.jpeg', alt: 'Lagoon Waters', category: 'surroundings' },
    { id: 19, src: 'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg', alt: 'Traditional Fishing Boats', category: 'surroundings' },
    { id: 20, src: 'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg', alt: 'Resort Gardens', category: 'surroundings' },
    { id: 21, src: 'https://images.pexels.com/photos/1598073/pexels-photo-1598073.jpeg', alt: 'Tropical Greenery', category: 'surroundings' },
    { id: 22, src: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg', alt: 'Garden Pathways', category: 'surroundings' }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeLightbox();
  };

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <OptimizedImage
          src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
          alt="Amaluna Resort Gallery"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={600}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">Gallery</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-body">
            Discover the beauty of Amaluna through our photo gallery
          </p>
        </div>
      </section>

      <div className="container-luxury section-padding">

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 text-sm ${
                selectedCategory === category.id
                  ? 'bg-amber-600 text-white shadow-gold'
                  : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-700 border border-gray-200 shadow-sm'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
          {filteredImages.map((image, index) => (
            <ScrollReveal
              key={image.id}
              delay={index * 50}
              direction="up"
            >
              <div 
                className="aspect-square relative overflow-hidden rounded-2xl cursor-pointer group transform hover:scale-[1.02] transition-all duration-300 shadow-luxury"
                onClick={() => openLightbox(index)}
              >
              <OptimizedImage
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                width={300}
                height={300}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8" />
              </div>
              <button
                onClick={(e) => toggleLike(image.id, e)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-all duration-200"
                aria-label={likes[image.id] ? 'Unlike photo' : 'Like photo'}
              >
                <Heart
                  className={`h-5 w-5 transition-colors duration-200 ${
                    likes[image.id] ? 'text-red-500 fill-red-500' : 'text-white'
                  }`}
                />
              </button>
            </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Photo Count */}
        <div className="text-center text-gray-600">
          <p>Showing {filteredImages.length} {filteredImages.length === 1 ? 'photo' : 'photos'}</p>
        </div>

        {/* Call to Action */}
        <ScrollReveal>
        <div className="mt-16 text-center bg-gradient-to-r from-amber-50 to-yellow-50 rounded-3xl p-10 border border-amber-100">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-4">
            Ready to Experience This in Person?
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto font-body">
            These photos are just the beginning. Come and create your own memories 
            at Amaluna Resorts in beautiful Negombo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+94770557257"
              className="btn-primary"
            >
              Call to Book
            </a>
            <a 
              href="https://wa.me/94770557257?text=Hello%20Amaluna%2C%20I%27d%20like%20to%20make%20a%20reservation"
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

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            aria-label="Close gallery"
          >
            <X className="h-8 w-8" />
          </button>
          
          <div className="relative max-w-7xl max-h-full p-4 flex items-center justify-center">
            <OptimizedImage
              src={filteredImages[currentImageIndex]?.src}
              alt={filteredImages[currentImageIndex]?.alt}
              className="max-w-full max-h-full object-contain"
              width={1200}
              height={800}
            />
            
            {filteredImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-200"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-200"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
          
          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full">
            {currentImageIndex + 1} of {filteredImages.length}
          </div>
          
          {/* Image Title */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white text-center bg-black bg-opacity-50 px-4 py-2 rounded-lg max-w-md">
            {filteredImages[currentImageIndex]?.alt}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;