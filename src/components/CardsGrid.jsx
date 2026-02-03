import { useState, useEffect } from 'react';

const cardsData = [
  {
    id: 1,
    svgIcon: (color) => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill={color} stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Nilai Skripsi',
    value: 'B+',
    description: 'B+ jg bagus kok, apalagi IP MU TINGGI BGT. lumayan la buat lulus cpt :D',
    gradient: 'from-[#ffd166] via-[#ffb347] to-[#ff9a44]',
    glowColor: 'rgba(255, 209, 102, 0.4)',
    particles: ['⭐', '✨', '🌟'],
    planetColor: '#ffd166'
  },
  {
    id: 2,
    svgIcon: (color) => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 2V8H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 15L11 17L15 13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Ga Revisi',
    value: '100%',
    description: 'ko gaakan ngerjain revisian, enak kn? skip ke yudisioum',
    gradient: 'from-[#4fc3f7] via-[#29b6f6] to-[#00b0ff]',
    glowColor: 'rgba(79, 195, 247, 0.4)',
    particles: ['✓', '✅', '🚀'],
    planetColor: '#4fc3f7'
  },
  {
    id: 3,
    svgIcon: (color) => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Portofolio',
    value: '★★★★★',
    description: 'bisa tuh kalo kamu mau jadi dosen seperti pak imam kesayanganmu itu.',
    gradient: 'from-[#ef476f] via-[#ff6b6b] to-[#ff8e8e]',
    glowColor: 'rgba(239, 71, 111, 0.4)',
    particles: ['💼', '🎯', '⭐'],
    planetColor: '#ef476f'
  }
];

export default function CardsGrid({ onCardClick }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [clickedCard, setClickedCard] = useState(null);
  const [activeParticles, setActiveParticles] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);

  const handleCardClick = (cardId) => {
    setClickedCard(cardId);
    onCardClick?.();
    
    // Create compact particle burst
    const card = cardsData.find(c => c.id === cardId);
    if (card) {
      const particleCount = 8;
      const newParticles = Array.from({ length: particleCount }, (_, i) => {
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = 40 + Math.random() * 20;
        return {
          id: `${cardId}-${i}-${Date.now()}`,
          content: card.particles[Math.floor(Math.random() * card.particles.length)],
          x: 50 + Math.cos(angle) * distance,
          y: 50 + Math.sin(angle) * distance,
          delay: i * 40,
          rotation: Math.random() * 360
        };
      });
      setActiveParticles(prev => [...prev, ...newParticles]);
      
      setTimeout(() => {
        setActiveParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)));
      }, 2000);
    }

    setTimeout(() => setClickedCard(null), 300);
  };

  // Random shooting stars effect
  useEffect(() => {
    const createShootingStar = () => {
      const newStar = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 50,
        duration: 1 + Math.random() * 1
      };
      setShootingStars(prev => [...prev, newStar]);
      
      setTimeout(() => {
        setShootingStars(prev => prev.filter(s => s.id !== newStar.id));
      }, newStar.duration * 1000 + 500);
    };

    const interval = setInterval(createShootingStar, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll('.card-container');
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.15}s`;
    });
  }, []);

  return (
    <div className="cards-section relative py-16 px-4">
      {/* Space background effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Nebula clouds */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2979ff] rounded-full blur-[150px] opacity-20 animate-nebula-float"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#7c4dff] rounded-full blur-[140px] opacity-15 animate-nebula-float-delayed"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-[#ff6b9d] rounded-full blur-[130px] opacity-10 animate-nebula-float"></div>
        
        {/* Twinkling stars background */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              opacity: 0.3 + Math.random() * 0.7
            }}
          ></div>
        ))}
        
        {/* Shooting stars */}
        {shootingStars.map(star => (
          <div
            key={star.id}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              animation: `shootingStar ${star.duration}s linear forwards`,
              boxShadow: '0 0 4px 2px rgba(255, 255, 255, 0.8)'
            }}
          ></div>
        ))}
      </div>

      <div className="cards-grid grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto relative">
        {cardsData.map((card, index) => (
          <div
            key={card.id}
            className="card-container relative"
            style={{
              animation: 'cardFloat 6s ease-in-out infinite',
              animationDelay: `${index * 0.5}s`
            }}
          >
            <div
              className={`relative group cursor-pointer transition-all duration-700 ease-out ${
                clickedCard === card.id ? 'scale-[0.95]' : ''
              }`}
              style={{
                transform: hoveredCard === card.id ? 'translateY(-12px) scale(1.02)' : 'translateY(0)',
                opacity: 0,
                animation: `cardEntrance 1s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.2 + 0.4}s forwards`
              }}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(card.id)}
            >
              {/* Compact planet glow */}
              <div 
                className="absolute -inset-6 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl"
                style={{
                  background: `radial-gradient(circle, ${card.glowColor}, transparent 70%)`,
                  animation: 'planetRingPulse 3s ease-in-out infinite'
                }}
              ></div>

              {/* Main compact card */}
              <div className="relative bg-gradient-to-br from-[#0a0a1f]/95 via-[#000b1f]/90 to-[#050510]/95 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/10 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)_inset] h-full">
                
                {/* Subtle cosmic dust */}
                <div 
                  className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700"
                  style={{
                    background: `conic-gradient(from 0deg, transparent 0%, ${card.glowColor} 25%, transparent 50%, ${card.glowColor} 75%, transparent 100%)`,
                    filter: 'blur(30px)',
                    animation: 'spin 20s linear infinite'
                  }}
                ></div>

                {/* Shine sweep */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Card content */}
                <div className="relative z-10 flex flex-col items-center h-full">
                  {/* Compact planet icon */}
                  <div className="relative mb-5 w-16 h-16">
                    {/* Planet glow */}
                    <div 
                      className="absolute inset-0 rounded-full blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                      style={{ backgroundColor: card.planetColor }}
                    ></div>
                    
                    {/* Planet surface */}
                    <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${card.gradient} p-[2px] group-hover:scale-110 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]`}>
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0a0a1f] to-[#050510] flex items-center justify-center border border-white/10">
                        <div className="transform group-hover:scale-110 transition-all duration-500">
                          {card.svgIcon(card.planetColor)}
                        </div>
                      </div>
                    </div>

                    {/* Orbiting particles */}
                    {[0, 120, 240].map((angle, i) => (
                      <div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full"
                        style={{
                          background: card.planetColor,
                          top: '50%',
                          left: '50%',
                          transform: `rotate(${angle}deg) translateX(30px) rotate(-${angle}deg)`,
                          animation: `orbitMoon 4s linear infinite`,
                          animationDelay: `${i * 0.3}s`,
                          boxShadow: `0 0 6px ${card.planetColor}`,
                          opacity: 0.7
                        }}
                      ></div>
                    ))}
                  </div>

                  {/* Compact title */}
                  <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent text-center">
                    {card.title}
                  </h3>

                  {/* Divider */}
                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="h-px w-6 bg-gradient-to-r from-transparent to-white/30"></div>
                    <div className="w-1 h-1 rounded-full bg-white/40"></div>
                    <div className="h-px w-6 bg-gradient-to-l from-transparent to-white/30"></div>
                  </div>

                  {/* Compact value */}
                  <div className="relative mb-4">
                    <div className={`text-5xl font-black bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent leading-none drop-shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                      {card.value}
                    </div>
                    {/* Value glow */}
                    <div 
                      className="absolute inset-0 text-5xl font-black blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 -z-10"
                      style={{ color: card.planetColor }}
                    >
                      {card.value}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent mb-4"></div>

                  {/* Compact description */}
                  <p className="text-white/60 text-xs text-center leading-relaxed group-hover:text-white/80 transition-colors duration-500 flex-grow mb-4">
                    {card.description}
                  </p>

                  {/* Progress bar for card 2 */}
                  {card.id === 2 && (
                    <div className="w-full">
                      <div className="relative h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-2">
                        <div 
                          className={`absolute inset-0 bg-gradient-to-r ${card.gradient} rounded-full`}
                          style={{
                            width: '100%',
                            animation: 'progressFill 2s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[10px] text-white/30">
                        <span>0%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  )}

                  {/* Star rating for card 3 */}
                  {card.id === 3 && (
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div
                          key={star}
                          className="text-lg text-[#ffd166]"
                          style={{
                            animation: `starPulse ${0.6 + star * 0.1}s ease-in-out infinite`,
                            animationDelay: `${star * 0.15}s`,
                            filter: 'drop-shadow(0 0 3px rgba(255, 209, 102, 0.5))'
                          }}
                        >
                          ★
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Compact interaction hint */}
                  <div className="mt-auto pt-3 flex items-center gap-1.5 text-[10px] text-white/25 group-hover:text-white/40 transition-all duration-500">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.5 3C13.5 2.17157 12.8284 1.5 12 1.5C11.1716 1.5 10.5 2.17157 10.5 3V9H4C3.17157 9 2.5 9.67157 2.5 10.5C2.5 11.3284 3.17157 12 4 12H10.5V18.5C10.5 19.3284 11.1716 20 12 20C12.8284 20 13.5 19.3284 13.5 18.5V12H20C20.8284 12 21.5 11.3284 21.5 10.5C21.5 9.67157 20.8284 9 20 9H13.5V3Z"/>
                    </svg>
                    <span>Klik</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Particle burst effects */}
      {activeParticles.map(particle => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-50 text-lg"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `particleBurst 2s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
            animationDelay: `${particle.delay}ms`,
            transform: `translate(-50%, -50%) rotate(${particle.rotation}deg)`,
            filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.6))'
          }}
        >
          {particle.content}
        </div>
      ))}

      <style jsx>{`
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes cardEntrance {
          0% {
            opacity: 0;
            transform: translateY(60px) scale(0.8) rotateX(20deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0deg);
          }
        }

        @keyframes nebula-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.1); }
          66% { transform: translate(-20px, 30px) scale(0.9); }
        }

        @keyframes nebula-float-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 20px) scale(0.9); }
          66% { transform: translate(20px, -30px) scale(1.1); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        @keyframes shootingStar {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateX(200px) translateY(100px);
            opacity: 0;
          }
        }

        @keyframes planetRingPulse {
          0%, 100% { transform: scale(1); opacity: 0; }
          50% { transform: scale(1.2); opacity: 1; }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes orbitMoon {
          from { transform: rotate(0deg) translateX(30px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
        }

        @keyframes progressFill {
          from { width: 0%; }
          to { width: 100%; }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        @keyframes starPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
        }

        @keyframes particleBurst {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
          }
          20% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2) rotate(90deg);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -150%) scale(0.5) rotate(360deg);
          }
        }

        .animate-nebula-float {
          animation: nebula-float 15s ease-in-out infinite;
        }

        .animate-nebula-float-delayed {
          animation: nebula-float-delayed 18s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }
      `}</style>
    </div>
  );
}