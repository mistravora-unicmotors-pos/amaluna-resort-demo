import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Facebook, Instagram, Send, Shield, Award, Download } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const quickLinks = [
    { name: 'Rooms', href: '/rooms' },
    { name: 'Dining', href: '/dining' },
    { name: 'Pool/Day-Pass', href: '/pool' },
    { name: 'Offers', href: '/offers' },
    { name: 'Events', href: '/events' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms & Conditions', href: '/terms' },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Newsletter subscription:', email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container-luxury py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-heading font-bold mb-1">Stay Updated</h3>
              <p className="text-gray-400 font-body text-sm">Get exclusive offers and resort news delivered to your inbox.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 md:w-72 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-200 font-body text-sm"
              />
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-gold flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Send className="h-4 w-4" />
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container-luxury py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <img 
              src="/android-chrome-192x192.png" 
              alt="Amaluna Resorts" 
              className="h-12 w-auto mb-4"
            />
            <p className="text-gray-400 mb-6 max-w-md font-body text-sm leading-relaxed">
              Experience easy luxury by the lagoon with spacious rooms, a signature pool, 
              and warm Sri Lankan hospitality in the heart of Negombo.
            </p>
            {/* Trust Badges */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Secure Booking</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                <Award className="h-4 w-4 text-amber-500" />
                <span>Best Rate Guarantee</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-5">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-gray-400 text-sm font-body">
                  276, Pamunugama Road<br />
                  Kepungoda, 11370<br />
                  Negombo, Sri Lanka
                </p>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-amber-500 mr-3" />
                <a 
                  href="tel:+94770557257"
                  className="text-gray-400 hover:text-amber-500 transition-colors duration-200 text-sm font-body"
                >
                  077 055 7257
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-amber-500 mr-3" />
                <a 
                  href="mailto:reservations@amalunaresorts.com"
                  className="text-gray-400 hover:text-amber-500 transition-colors duration-200 text-sm font-body"
                >
                  reservations@amalunaresorts.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-amber-500 transition-colors duration-200 text-sm font-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & App */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-5">Legal</h3>
            <ul className="space-y-2 mb-6">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-amber-500 transition-colors duration-200 text-sm font-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              onClick={async () => {
                if (window.__pwaPrompt) {
                  const prompt = window.__pwaPrompt;
                  await prompt.prompt();
                  const { outcome } = await prompt.userChoice;
                  if (outcome === 'accepted') window.__pwaPrompt = null;
                } else {
                  window.dispatchEvent(new Event('show-pwa-install'));
                  // Fallback for browsers that don't support beforeinstallprompt
                  setTimeout(() => {
                    if (!window.__pwaPrompt) {
                      alert('To install: tap your browser menu (⋮ or share icon) and select "Add to Home Screen" or "Install App".');
                    }
                  }, 300);
                }
              }}
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-amber-500 transition-colors duration-200 border border-gray-700 rounded-xl px-4 py-2 hover:border-amber-500/50"
            >
              <Download className="h-4 w-4" />
              Install App
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 sm:mb-0 font-body">
              © {currentYear} Amaluna Resorts. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              <a 
                href="https://facebook.com/amalunares"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-800 text-gray-400 hover:bg-amber-600 hover:text-white transition-all duration-200"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com/amalunaresorts"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-800 text-gray-400 hover:bg-amber-600 hover:text-white transition-all duration-200"
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