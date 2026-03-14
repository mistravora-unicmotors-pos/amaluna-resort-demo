import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft, Phone, MapPin } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-amber-50/30 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-[10rem] md:text-[14rem] font-heading font-bold text-amber-100 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Search className="h-16 w-16 text-amber-400 mx-auto mb-2 animate-float" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 font-body">
          It seems this page has drifted away like a sunset over the Indian Ocean.
          Let us guide you back to paradise.
        </p>

        {/* Quick Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link to="/" className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
            <Home className="h-4 w-4" /> Back to Home
          </Link>
          <Link to="/rooms" className="btn-outline flex items-center gap-2 w-full sm:w-auto justify-center">
            <ArrowLeft className="h-4 w-4" /> View Rooms
          </Link>
        </div>

        {/* Helpful Links Grid */}
        <div className="bg-white rounded-2xl shadow-luxury p-6">
          <p className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">Or explore</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'Rooms & Suites', path: '/rooms' },
              { name: 'Dining', path: '/dining' },
              { name: 'Pool & Spa', path: '/pool' },
              { name: 'Special Offers', path: '/offers' },
              { name: 'Events', path: '/events' },
              { name: 'Gallery', path: '/gallery' },
            ].map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-3 rounded-xl bg-gray-50 hover:bg-amber-50 hover:text-amber-700 text-gray-700 text-sm font-medium transition-all duration-200 hover:shadow-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Fallback */}
        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
          <a href="tel:+94312230000" className="flex items-center gap-1 hover:text-amber-600 transition-colors">
            <Phone className="h-4 w-4" /> +94 31 223 0000
          </a>
          <Link to="/contact" className="flex items-center gap-1 hover:text-amber-600 transition-colors">
            <MapPin className="h-4 w-4" /> Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
