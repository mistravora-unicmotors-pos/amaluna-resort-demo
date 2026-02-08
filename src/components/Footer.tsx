import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Rooms', href: '/rooms' },
    { name: 'Dining', href: '/dining' },
    { name: 'Pool/Day-Pass', href: '/pool' },
    { name: 'Offers', href: '/offers' },
    { name: 'Events', href: '/events' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <img 
              src="/WhatsApp_Image_2025-03-28_at_10.28.44_AM-removebg-preview.png" 
              alt="Amaluna Resorts" 
              className="h-12 w-auto mb-4"
            />
            <p className="text-gray-300 mb-6 max-w-md">
              Experience easy luxury by the lagoon with spacious rooms, a signature pool, 
              and warm Sri Lankan hospitality in the heart of Negombo.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  276, Pamunugama Road<br />
                  Kepungoda, 11370<br />
                  Negombo, Sri Lanka
                </p>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-amber-500 mr-3" />
                <a 
                  href="tel:+94770557257"
                  className="text-gray-300 hover:text-amber-500 transition-colors duration-200"
                >
                  077 055 7257
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-amber-500 mr-3" />
                <a 
                  href="mailto:reservations@amalunaresorts.com"
                  className="text-gray-300 hover:text-amber-500 transition-colors duration-200"
                >
                  reservations@amalunaresorts.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-amber-500 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 sm:mb-0">
              © {currentYear} Amaluna Resorts. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/amalunares"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-500 transition-colors duration-200"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com/amalunaresorts"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-500 transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;