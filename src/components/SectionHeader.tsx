import React, { useEffect, useRef, useState } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  light?: boolean;
  className?: string;
  align?: 'center' | 'left';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  light = false,
  className = '',
  align = 'center',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={headerRef}
      className={`${align === 'center' ? 'text-center' : 'text-left'} mb-12 md:mb-16 ${className}`}
    >
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        } ${
          light ? 'text-white' : 'text-gray-900 dark:text-white'
        }`}
      >
        {title}
      </h2>
      <div
        className={`h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-5 transition-all duration-700 delay-200 ${
          align === 'left' ? 'mx-0' : 'mx-auto'
        } ${isVisible ? 'w-16 opacity-100' : 'w-0 opacity-0'}`}
      />
      {subtitle && (
        <p className={`text-lg md:text-xl max-w-3xl font-body transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        } ${
          align === 'center' ? 'mx-auto' : ''
        } ${light ? 'text-gray-300' : 'text-gray-600 dark:text-gray-400'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
