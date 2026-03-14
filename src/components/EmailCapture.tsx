import React, { useState, useEffect } from 'react';
import { X, Mail } from 'lucide-react';

const STORAGE_KEY = 'amaluna_email_captured';

export default function EmailCapture() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const timer = setTimeout(() => setShow(true), 25000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    localStorage.setItem(STORAGE_KEY, '1');
    setTimeout(() => setShow(false), 2000);
  };

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem(STORAGE_KEY, '1');
  };

  // Note: dismiss (X) uses sessionStorage — will re-ask next session
  // Submit uses localStorage — never asks again

  if (!show) return null;

  return (
    <div className="fixed bottom-24 left-4 z-50 animate-in slide-in-from-left duration-500">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 w-72 overflow-hidden">
        <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-3">
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="text-white text-sm font-heading font-semibold">Stay in touch ✨</p>
          <p className="text-gray-400 text-xs mt-0.5">Get exclusive offers & updates</p>
        </div>

        <div className="p-4">
          {submitted ? (
            <p className="text-emerald-600 text-sm text-center py-2 font-medium">Thank you! 🎉</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors flex-shrink-0"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
