import React, { useState } from 'react';
import { Phone, MessageCircle, Mail } from 'lucide-react';
import EnquiryModal from './EnquiryModal';

const ActionBar = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

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
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex space-x-4">
            <button
              onClick={handleCall}
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Phone className="h-5 w-5" />
              <span className="hidden sm:inline">Call</span>
            </button>
            
            <button
              onClick={handleWhatsApp}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
            
            <button
              onClick={handleEnquiry}
              id="enquiry-btn"
              className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Mail className="h-5 w-5" />
              <span className="hidden sm:inline">Enquire</span>
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