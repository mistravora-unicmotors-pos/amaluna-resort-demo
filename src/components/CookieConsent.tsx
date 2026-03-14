import { useState, useEffect } from 'react';
import { Cookie, X, Settings, Check } from 'lucide-react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    const all = { essential: true, analytics: true, marketing: true, preferences: true };
    localStorage.setItem('cookie-consent', JSON.stringify(all));
    setIsVisible(false);
  };

  const acceptSelected = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setIsVisible(false);
  };

  const rejectAll = () => {
    const minimal = { essential: true, analytics: false, marketing: false, preferences: false };
    localStorage.setItem('cookie-consent', JSON.stringify(minimal));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] animate-slide-up">
      <div className="bg-white border-t border-gray-200 shadow-luxury-xl">
        <div className="container-luxury py-4 px-4">
          {!showPreferences ? (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-start gap-3 flex-1">
                <Cookie className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-700">
                    We use cookies to enhance your browsing experience and provide personalized content. 
                    By clicking "Accept All", you consent to our use of cookies.{' '}
                    <a href="/privacy-policy" className="text-amber-600 hover:underline font-medium">Learn more</a>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 w-full md:w-auto">
                <button
                  onClick={() => setShowPreferences(true)}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Settings className="h-4 w-4" /> Customize
                </button>
                <button
                  onClick={rejectAll}
                  className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reject
                </button>
                <button
                  onClick={acceptAll}
                  className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-amber-600 to-yellow-500 rounded-lg hover:shadow-gold transition-all"
                >
                  Accept All
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-gray-900">Cookie Preferences</h3>
                <button onClick={() => setShowPreferences(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {[
                  { key: 'essential' as const, label: 'Essential', desc: 'Required for the website to function', locked: true },
                  { key: 'analytics' as const, label: 'Analytics', desc: 'Help us understand site usage', locked: false },
                  { key: 'marketing' as const, label: 'Marketing', desc: 'Personalized ads and offers', locked: false },
                  { key: 'preferences' as const, label: 'Preferences', desc: 'Remember your settings', locked: false },
                ].map(cookie => (
                  <div key={cookie.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{cookie.label}</p>
                      <p className="text-xs text-gray-500">{cookie.desc}</p>
                    </div>
                    <button
                      disabled={cookie.locked}
                      onClick={() => setPreferences(p => ({ ...p, [cookie.key]: !p[cookie.key] }))}
                      className={`h-6 w-11 rounded-full transition-colors relative ${
                        preferences[cookie.key] ? 'bg-amber-500' : 'bg-gray-300'
                      } ${cookie.locked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                          preferences[cookie.key] ? 'translate-x-5' : ''
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={rejectAll}
                  className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Reject All
                </button>
                <button
                  onClick={acceptSelected}
                  className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-amber-600 to-yellow-500 rounded-lg hover:shadow-gold transition-all flex items-center gap-1.5"
                >
                  <Check className="h-4 w-4" /> Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
