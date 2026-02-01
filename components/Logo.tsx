import React from 'react';
import fullLogoImg from '../resources/Miracle Logo Transparent.png';
import compactLogoImg from '../resources/M Miracle Transparent.png';

interface LogoProps {
  className?: string;
  showText?: boolean;
  textColor?: string;
  iconSize?: number;
}

const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  showText = true, 
  textColor = "text-slate-900", // Not used anymore but kept for prop stability
  iconSize = 48
}) => {
  const imgSrc = showText ? fullLogoImg : compactLogoImg;
  const altText = showText ? 'Miracle Logo' : 'Miracle Icon Logo';

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <img 
        src={imgSrc} 
        alt={altText} 
        style={{ height: iconSize }}
        className="w-auto h-auto object-contain"
      />
    </div>
  );
};

export default Logo;
