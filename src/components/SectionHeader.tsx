import React from 'react';

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
  return (
    <div className={`${align === 'center' ? 'text-center' : 'text-left'} mb-12 md:mb-16 ${className}`}>
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 ${
          light ? 'text-white' : 'text-gray-900'
        }`}
      >
        {title}
      </h2>
      <div className={`gold-divider mb-5 ${align === 'left' ? 'mx-0' : ''}`} />
      {subtitle && (
        <p className={`text-lg md:text-xl max-w-3xl font-body ${
          align === 'center' ? 'mx-auto' : ''
        } ${light ? 'text-gray-300' : 'text-gray-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
