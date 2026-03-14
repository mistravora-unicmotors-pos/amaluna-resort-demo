import { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
  interface Window {
    __pwaPrompt?: BeforeInstallPromptEvent | null;
  }
}

// Capture the prompt as early as possible (module-level)
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.__pwaPrompt = e as BeforeInstallPromptEvent;
});

const PWAInstallPrompt = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('pwa-dismissed')) return;
    // Show auto-popup after 5s if prompt is available
    const timer = setTimeout(() => {
      if (window.__pwaPrompt) setIsVisible(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Listen for footer "Install App" button
  useEffect(() => {
    const onShowInstall = async () => {
      if (window.__pwaPrompt) {
        await triggerInstall();
      }
    };
    window.addEventListener('show-pwa-install', onShowInstall);
    return () => window.removeEventListener('show-pwa-install', onShowInstall);
  }, []);

  const triggerInstall = async () => {
    const prompt = window.__pwaPrompt;
    if (!prompt) return;
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === 'accepted') {
      setIsVisible(false);
    }
    window.__pwaPrompt = null;
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setDismissed(true);
    localStorage.setItem('pwa-dismissed', 'true');
  };

  if (!isVisible || dismissed) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 md:left-auto md:right-4 md:w-[380px] z-50 animate-slide-up">
      <div className="bg-white rounded-2xl shadow-luxury-xl border border-gray-100 p-5">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 flex items-center justify-center flex-shrink-0">
            <Smartphone className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-heading font-bold text-gray-900 mb-1">Install Amaluna App</h4>
            <p className="text-sm text-gray-500 mb-3">
              Add to your home screen for quick access, offline features, and push notifications.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={triggerInstall}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-600 to-yellow-500 text-white rounded-lg text-sm font-medium hover:shadow-gold transition-all"
              >
                <Download className="h-4 w-4" /> Install
              </button>
              <button
                onClick={handleDismiss}
                className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Not now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
