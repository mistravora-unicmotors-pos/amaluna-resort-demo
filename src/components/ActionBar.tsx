import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Mail } from 'lucide-react';
import EnquiryModal from './EnquiryModal';

const ActionBar = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCall = () => {
    window.location.href = 'tel:+94770557257';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/94770557257?text=Hello%20Amaluna%2C%20I%27d%20like%20to%20enquire', '_blank');
  };

  const handleEnquiry = () => {
    setIsEnquiryOpen(true);
  };

  return (
    <>
      <div className={`fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200/60 shadow-luxury z-50 transition-transform duration-500 ${visible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="container-luxury py-2 sm:py-3">
          <div className="flex gap-2">
            <button
              onClick={handleCall}
              className="flex-1 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white py-2.5 sm:py-3 px-2 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-gold min-w-0"
            >
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-body truncate">Call</span>
            </button>
            
            <button
              onClick={handleWhatsApp}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-2.5 sm:py-3 px-2 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 min-w-0"
            >
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-body truncate">WhatsApp</span>
            </button>
            
            <button
              onClick={handleEnquiry}
              id="enquiry-btn"
              className="flex-1 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-900 hover:to-gray-800 text-white py-2.5 sm:py-3 px-2 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 min-w-0"
            >
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-body truncate">Enquire</span>
            </button>
          </div>
        </div>
      </div>

      <EnquiryModal 
        isOpen={isEnquiryOpen} 
        onClose={() => setIsEnquiryOpen(false)} 
      />
    </>
  );
};

export default ActionBar;