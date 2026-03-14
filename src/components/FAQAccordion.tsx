import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ items, className = '' }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-amber-200"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-amber-50/50 transition-colors duration-200"
            aria-expanded={openIndex === index}
          >
            <span className="font-semibold text-gray-900 pr-4 font-body">{item.question}</span>
            <ChevronDown
              className={`h-5 w-5 text-amber-600 flex-shrink-0 transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div className={`accordion-content ${openIndex === index ? 'open' : ''}`}>
            <div className="accordion-inner">
              <div className="px-6 pb-5 text-gray-600 leading-relaxed font-body">
                {item.answer}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
