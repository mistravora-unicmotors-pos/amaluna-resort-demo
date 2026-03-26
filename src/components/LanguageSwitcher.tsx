import { Globe, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧', gtCode: 'en' },
  { code: 'si', label: 'සිංහල', flag: '🇱🇰', gtCode: 'si' },
  { code: 'ta', label: 'தமிழ்', flag: '🇱🇰', gtCode: 'ta' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺', gtCode: 'ru' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', gtCode: 'fr' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪', gtCode: 'de' },
  { code: 'zh', label: '中文', flag: '🇨🇳', gtCode: 'zh-CN' },
];

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('en');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    // Read the current language from google translate cookie on mount
    const match = document.cookie.match(/(?:^|;)\s*googtrans=([^;]+)/);
    if (match) {
      const code = match[1].split('/').pop();
      if (code) {
        const lang = languages.find(l => l.gtCode === code);
        if (lang) setSelected(lang.code);
      }
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: typeof languages[0]) => {
    setSelected(lang.code);
    setIsOpen(false);
    
    if (lang.gtCode === 'en') {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
    } else {
      document.cookie = `googtrans=/en/${lang.gtCode}; path=/;`;
      document.cookie = `googtrans=/en/${lang.gtCode}; domain=${window.location.hostname}; path=/;`;
    }
    
    window.location.reload();
  };

  const current = languages.find(l => l.code === selected) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-800 transition-colors text-sm"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{current.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-luxury-lg border border-gray-100 dark:border-gray-700 py-2 z-50 animate-fade-in">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors ${
                selected === lang.code ? 'text-amber-700 dark:text-amber-400 font-medium' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="flex-1 text-left">{lang.label}</span>
              {selected === lang.code && <Check className="h-4 w-4 text-amber-600 dark:text-amber-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
