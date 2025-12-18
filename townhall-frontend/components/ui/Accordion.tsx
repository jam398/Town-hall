'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className = '' }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`space-y-4 ${className}`} role="region" aria-label="Frequently Asked Questions">
      {items.map((item, index) => (
        <div key={index} className="border-b border-neutral-700 pb-4">
          <button
            type="button"
            onClick={() => toggleItem(index)}
            className="w-full flex items-center justify-between text-left py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-swiss-red focus-visible:ring-offset-2 focus-visible:ring-offset-swiss-black"
            aria-expanded={openIndex === index}
            aria-controls={`accordion-content-${index}`}
            id={`accordion-header-${index}`}
          >
            <span className="text-body font-semibold text-swiss-white pr-4">
              {item.question}
            </span>
            <ChevronDown 
              className={`w-5 h-5 text-swiss-white flex-shrink-0 transition-transform duration-200 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>
          <div
            id={`accordion-content-${index}`}
            role="region"
            aria-labelledby={`accordion-header-${index}`}
            className={`overflow-hidden transition-all duration-200 ${
              openIndex === index ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
            }`}
          >
            <p className="text-body-sm text-neutral-400 pb-2">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
