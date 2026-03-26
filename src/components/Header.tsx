import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Rooms', href: '/rooms' },
    { name: 'Dining', href: '/dining' },
    { name: 'Pool/Day-Pass', href: '/pool' },
    { name: 'Offers', href: '/offers' },
    { name: 'Events', href: '/events' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Location', href: '/location' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 bg-white dark:bg-gray-900 ${
      scrolled
        ? 'shadow-luxury backdrop-blur-md dark:shadow-gray-950/50'
        : 'shadow-sm dark:shadow-gray-800/30'
    }`}>
      {/* Scroll Progress Bar */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 transition-all duration-150 z-50"
        style={{ width: `${scrollProgress}%` }}
      />
      {/* Glow effect on progress bar */}
      {scrollProgress > 0 && (
        <div
          className="absolute top-0 h-[2px] bg-amber-400/50 blur-sm transition-all duration-150 z-40"
          style={{ width: `${scrollProgress}%`, left: 0 }}
        />
      )}

      <div className="container-luxury">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group">
            <img
              src="/android-chrome-192x192.png"
              alt="Amaluna Resorts"
              className="h-8 sm:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium font-body transition-all duration-200 hover:text-amber-600 dark:hover:text-amber-400 relative group ${
                  isActive(item.href)
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-300 ${
                  isActive(item.href)
                    ? 'w-full'
                    : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
            <ThemeToggle />
            <Link
              to="/login"
              className="ml-2 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-900/50 px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 group"
            >
              <LogIn className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              Login
            </Link>
          </nav>

          {/* Mobile: theme toggle + menu button */}
          <div className="lg:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              className="p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-800 transition-all duration-200 active:scale-95"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu className={`h-6 w-6 absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
                <X className={`h-6 w-6 absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Slide-in Drawer */}
      <div
        className={`lg:hidden fixed inset-0 top-[64px] sm:top-[80px] z-40 transition-all duration-300 ${
          isMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/30 dark:bg-black/50 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 w-72 max-w-[80vw] h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-xl transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <nav aria-label="Mobile navigation" className="px-4 pt-4 pb-6 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-3 rounded-xl text-base font-medium font-body transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30'
                    : 'text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-gray-100 dark:border-gray-700 mt-3 pt-3">
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-base font-medium text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="h-5 w-5" />
                Login / Register
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;