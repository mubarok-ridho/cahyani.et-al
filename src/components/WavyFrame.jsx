import { useEffect, useRef } from 'react';

export default function WavyFrame() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Animate the wave
    const animate = () => {
      const paths = svg.querySelectorAll('path');
      paths.forEach((path, index) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length} ${length}`;
        path.style.strokeDashoffset = length;
        
        path.animate([
          { strokeDashoffset: length },
          { strokeDashoffset: 0 }
        ], {
          duration: 2000 + index * 500,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          iterations: Infinity,
          direction: index % 2 === 0 ? 'normal' : 'reverse'
        });
      });
    };

    animate();
  }, []);

  return (
    <svg 
      ref={svgRef}
      className="wavy-svg-frame"
      width="280" 
      height="280" 
      viewBox="0 0 280 280"
    >
      <defs>
        <linearGradient id="wavy-gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2979ff" />
          <stop offset="50%" stopColor="#7c4dff" />
          <stop offset="100%" stopColor="#00e5ff" />
        </linearGradient>
        <linearGradient id="wavy-gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00e5ff" />
          <stop offset="50%" stopColor="#7c4dff" />
          <stop offset="100%" stopColor="#2979ff" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Wavy Circle 1 */}
      <path
        d="M140,20 
           C100,20 80,50 80,80 
           C80,110 100,140 140,140 
           C180,140 200,110 200,80 
           C200,50 180,20 140,20"
        fill="none"
        stroke="url(#wavy-gradient1)"
        strokeWidth="10"
        strokeLinecap="round"
        filter="url(#glow)"
      />
      
      {/* Wavy Circle 2 (offset) */}
      <path
        d="M140,30 
           C110,30 90,60 90,90 
           C90,120 110,150 140,150 
           C170,150 190,120 190,90 
           C190,60 170,30 140,30"
        fill="none"
        stroke="url(#wavy-gradient2)"
        strokeWidth="8"
        strokeLinecap="round"
        filter="url(#glow)"
        style={{ animationDelay: '0.5s' }}
      />
      
      {/* Dots around the circle */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30) * Math.PI / 180;
        const radius = 125;
        const x = 140 + radius * Math.cos(angle);
        const y = 140 + radius * Math.sin(angle);
        const size = 6 + Math.sin(i * 0.5) * 4;
        
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={size}
            fill="url(#wavy-gradient1)"
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        );
      })}
    </svg>
  );
}