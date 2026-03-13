import React from 'react';

export default function ChevronRight({ size = 24, color = '#666F77', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M9 18L15 12L9 6"
            stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
