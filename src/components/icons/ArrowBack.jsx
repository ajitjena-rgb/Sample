import React from 'react';

export default function ArrowBack({ size = 24, color = '#11304F', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M19 12H5M5 12L11 18M5 12L11 6"
            stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
