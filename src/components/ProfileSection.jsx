import { useState, useRef, useEffect } from 'react';

export default function ProfileSection({ onImageClick, onStatusClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isImageAnimating, setIsImageAnimating] = useState(false);
  const [isStatusAnimating, setIsStatusAnimating] = useState(false);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const rotationRef = useRef(0);
  const timeRef = useRef(0);

  const handleImageClick = () => {
    setIsImageAnimating(true);
    onImageClick?.();
    setTimeout(() => setIsImageAnimating(false), 300);
  };

  const handleStatusClick = () => {
    setIsStatusAnimating(true);
    onStatusClick?.();
    setTimeout(() => setIsStatusAnimating(false), 300);
  };

  // Natural Blackhole Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Initialize particles - lebih ramai untuk efek dramatis
    if (particlesRef.current.length === 0) {
      particlesRef.current = Array.from({ length: 350 }, () => {
        const distance = 60 + Math.random() * 160;
        const isCore = distance < 100;
        return {
          angle: Math.random() * Math.PI * 2,
          distance: distance,
          baseDistance: distance,
          size: isCore ? 1 + Math.random() * 2.5 : 0.5 + Math.random() * 1.5,
          speed: (0.01 + Math.random() * 0.02) * (1.2 - distance / 220),
          opacity: isCore ? 0.4 + Math.random() * 0.6 : 0.2 + Math.random() * 0.4,
          color: Math.random() > 0.6 ? '#4fc3f7' : Math.random() > 0.3 ? '#7c4dff' : '#00e5ff',
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.003 + Math.random() * 0.004
        };
      });
    }

    const drawBlackHole = (time) => {
      ctx.clearRect(0, 0, width, height);
      
      // Outer space glow - soft integration dengan background
      const outerGlow = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, 250
      );
      outerGlow.addColorStop(0, 'rgba(0, 0, 0, 0)');
      outerGlow.addColorStop(0.3, 'rgba(15, 20, 40, 0.1)');
      outerGlow.addColorStop(0.6, 'rgba(41, 121, 255, 0.08)');
      outerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = outerGlow;
      ctx.fillRect(0, 0, width, height);

      // Draw accretion disk particles dengan gravitational lensing
      particlesRef.current.forEach((particle) => {
        // Dynamic orbital motion
        particle.angle += particle.speed;
        
        // Wobble effect untuk natural movement
        particle.wobble += particle.wobbleSpeed;
        const wobbleOffset = Math.sin(particle.wobble) * 4;
        
        // Spiral inward dengan variasi
        particle.distance -= 0.03;
        if (particle.distance < 25) {
          particle.distance = particle.baseDistance;
          particle.angle = Math.random() * Math.PI * 2;
          particle.wobble = Math.random() * Math.PI * 2;
        }
        
        const actualDistance = particle.distance + wobbleOffset;
        const x = centerX + Math.cos(particle.angle) * actualDistance;
        const y = centerY + Math.sin(particle.angle) * actualDistance * 0.65; // elliptical orbit
        
        // Distance-based opacity dengan falloff natural
        const distanceFactor = Math.max(0, 1 - (particle.distance - 60) / 160);
        const opacity = particle.opacity * distanceFactor;
        
        // Gravitational redshift - particles get redder/brighter near center
        let particleColor = particle.color;
        let glowIntensity = 1;
        if (particle.distance < 90) {
          const centerProximity = (90 - particle.distance) / 90;
          if (centerProximity > 0.6) {
            particleColor = '#ff6b9d';
            glowIntensity = 1.5;
          } else if (centerProximity > 0.3) {
            particleColor = '#ff9d6b';
            glowIntensity = 1.2;
          }
        }
        
        // Draw particle dengan dynamic glow
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        
        const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, particle.size * 3);
        particleGradient.addColorStop(0, `${particleColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
        particleGradient.addColorStop(0.5, `${particleColor}${Math.floor(opacity * 128).toString(16).padStart(2, '0')}`);
        particleGradient.addColorStop(1, `${particleColor}00`);
        
        ctx.fillStyle = particleGradient;
        ctx.fill();
        
        // Enhanced trails untuk particle dekat center
        if (particle.distance < 130) {
          const trailCount = particle.distance < 80 ? 3 : 2;
          for (let j = 1; j <= trailCount; j++) {
            const trailAngle = particle.angle - j * 0.1;
            const trailDist = actualDistance + j * 3;
            const trailX = centerX + Math.cos(trailAngle) * trailDist;
            const trailY = centerY + Math.sin(trailAngle) * trailDist * 0.65;
            const trailOpacity = opacity * (1 - j * 0.35);
            
            ctx.beginPath();
            ctx.arc(trailX, trailY, particle.size * 0.6, 0, Math.PI * 2);
            ctx.fillStyle = `${particleColor}${Math.floor(trailOpacity * 255).toString(16).padStart(2, '0')}`;
            ctx.fill();
          }
        }
      });

      // Event Horizon - smooth dark center
      const horizonGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, 140
      );
      horizonGradient.addColorStop(0, 'rgba(0, 0, 0, 0.9)');
      horizonGradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.7)');
      horizonGradient.addColorStop(0.85, 'rgba(41, 121, 255, 0.15)');
      horizonGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, 140, 0, Math.PI * 2);
      ctx.fillStyle = horizonGradient;
      ctx.fill();

      // Multi-layer Photon sphere dengan pulsing
      for (let layer = 0; layer < 2; layer++) {
        const photonRadius = 133 + layer * 4 + 3 * Math.sin(time * 0.0012 + layer * Math.PI);
        const photonGradient = ctx.createRadialGradient(
          centerX, centerY, photonRadius - 2,
          centerX, centerY, photonRadius + 2
        );
        photonGradient.addColorStop(0, `rgba(79, 195, 247, 0)`);
        photonGradient.addColorStop(0.5, `rgba(79, 195, 247, ${0.5 - layer * 0.2})`);
        photonGradient.addColorStop(1, `rgba(79, 195, 247, 0)`);
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, photonRadius, 0, Math.PI * 2);
        ctx.strokeStyle = photonGradient;
        ctx.lineWidth = 2 - layer * 0.5;
        ctx.stroke();
      }

      // Enhanced vortex lines - lebih ramai
      const vortexOpacity = 0.15 + 0.08 * Math.sin(time * 0.0008);
      
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI / 4) + rotationRef.current * 0.4;
        
        // Main vortex line
        ctx.beginPath();
        ctx.strokeStyle = `rgba(79, 195, 247, ${vortexOpacity})`;
        ctx.lineWidth = 2;
        
        for (let r = 138; r <= 185; r += 2.5) {
          const spiral = Math.sin(time * 0.0005 + r * 0.03) * 0.15;
          const x = centerX + Math.cos(angle + spiral) * r;
          const y = centerY + Math.sin(angle + spiral) * r * 0.65;
          
          if (r === 138) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        
        // Secondary faint line
        if (i % 2 === 0) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(124, 77, 255, ${vortexOpacity * 0.6})`;
          ctx.lineWidth = 1;
          
          for (let r = 145; r <= 190; r += 3) {
            const spiral = Math.sin(time * 0.0004 + r * 0.025 + Math.PI) * 0.12;
            const x = centerX + Math.cos(angle + Math.PI / 8 + spiral) * r;
            const y = centerY + Math.sin(angle + Math.PI / 8 + spiral) * r * 0.65;
            
            if (r === 145) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        }
      }

      // Outer accretion disk glow - multi-layer
      const diskGradient = ctx.createRadialGradient(
        centerX, centerY, 150,
        centerX, centerY, 230
      );
      diskGradient.addColorStop(0, 'rgba(41, 121, 255, 0.25)');
      diskGradient.addColorStop(0.2, 'rgba(124, 77, 255, 0.2)');
      diskGradient.addColorStop(0.5, 'rgba(0, 229, 255, 0.15)');
      diskGradient.addColorStop(0.8, 'rgba(79, 195, 247, 0.08)');
      diskGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, 230, 0, Math.PI * 2);
      ctx.fillStyle = diskGradient;
      ctx.fill();

      // Energy bursts - random flares
      const burstIntensity = Math.sin(time * 0.002) * 0.3 + 0.7;
      for (let i = 0; i < 4; i++) {
        const burstAngle = (i * Math.PI / 2) + rotationRef.current * 0.6;
        const burstDistance = 160 + 10 * Math.sin(time * 0.003 + i);
        const burstX = centerX + Math.cos(burstAngle) * burstDistance;
        const burstY = centerY + Math.sin(burstAngle) * burstDistance * 0.65;
        
        const burstGradient = ctx.createRadialGradient(
          burstX, burstY, 0,
          burstX, burstY, 15
        );
        burstGradient.addColorStop(0, `rgba(255, 107, 157, ${0.6 * burstIntensity})`);
        burstGradient.addColorStop(0.5, `rgba(79, 195, 247, ${0.3 * burstIntensity})`);
        burstGradient.addColorStop(1, 'rgba(0, 229, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(burstX, burstY, 15, 0, Math.PI * 2);
        ctx.fillStyle = burstGradient;
        ctx.fill();
      }
    };

    const animate = (time) => {
      timeRef.current = time;
      rotationRef.current += 0.005; // slightly faster for more dynamic look
      drawBlackHole(time);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="profile-section flex flex-col items-center justify-center min-h-screen py-20 px-4">
      {/* Profile Image Container */}
      <div 
        className={`profile-image w-[420px] h-[420px] rounded-full mb-12 relative cursor-pointer transition-all duration-700 ease-out ${isImageAnimating ? 'scale-98' : 'hover:scale-[1.02]'}`}
        onClick={handleImageClick}
      >
        {/* Canvas untuk blackhole effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <canvas 
            ref={canvasRef}
            width={440}
            height={440}
            className="w-full h-full"
          />
        </div>
        
        {/* Ambient space glow */}
        <div className="absolute inset-0 bg-gradient-radial from-[#2979ff]/15 via-[#7c4dff]/10 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        
        {/* Slow rotating cosmic dust */}
        <div 
          className="absolute inset-0 rounded-full opacity-40"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0%, rgba(41, 121, 255, 0.15) 25%, rgba(124, 77, 255, 0.2) 50%, rgba(0, 229, 255, 0.15) 75%, transparent 100%)',
            filter: 'blur(20px)',
            animation: 'spin 35s linear infinite'
          }}
        ></div>
        
        <div className="relative z-20 w-full h-full flex items-center justify-center">
          {/* Photo frame */}
          <div className="profile-photo w-[340px] h-[340px] rounded-full bg-gradient-to-br from-[#0a0a0a] via-[#050510] to-[#000000] flex items-center justify-center overflow-hidden shadow-[0_0_80px_rgba(79,195,247,0.4),0_0_120px_rgba(124,77,255,0.2)] border border-[#4fc3f7]/25">
            {!imageLoaded && (
              <div className="w-full h-full bg-gradient-to-br from-[#000428] to-[#000b1f] animate-pulse rounded-full"></div>
            )}
            <img 
              src="https://forumasisten.amikompurwokerto.ac.id/assets/pengurus/Evril.png" 
              alt="Evril Fadrekha Cahyani"
              className={`w-full h-full object-cover object-top rounded-full transition-all duration-700 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{
                objectPosition: '50% 20%'
              }}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/340x340/000000/80deea?text=Evril`;
                setImageLoaded(true);
              }}
            />
            
            {/* Inner glow ring */}
            <div className="absolute inset-0 rounded-full border-2 border-[#4fc3f7]/15 shadow-inner"></div>
          </div>
        </div>
        
        {/* Orbiting particles - lebih ramai */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-[#4fc3f7] to-[#00e5ff] pointer-events-none"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 45}deg) translateX(175px) rotate(-${i * 45}deg)`,
              animation: `orbit-particle ${6 + i * 1.5}s linear infinite`,
              animationDelay: `${i * 0.3}s`,
              boxShadow: '0 0 10px rgba(79, 195, 247, 0.8)',
              opacity: 0.8
            }}
          ></div>
        ))}
        
        {/* Space dust particles - lebih banyak */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`dust-${i}`}
            className="absolute rounded-full bg-white pointer-events-none"
            style={{
              width: `${0.5 + Math.random() * 1}px`,
              height: `${0.5 + Math.random() * 1}px`,
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 24}deg) translateX(${185 + Math.random() * 25}px) rotate(-${i * 24}deg)`,
              animation: `orbit-particle-slow ${10 + Math.random() * 5}s linear infinite`,
              animationDelay: `${i * 0.2}s`,
              opacity: 0.3 + Math.random() * 0.4
            }}
          ></div>
        ))}
        
        {/* Additional glowing particles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`glow-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
            style={{
              background: i % 2 === 0 ? 'rgba(124, 77, 255, 0.8)' : 'rgba(0, 229, 255, 0.8)',
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 60}deg) translateX(165px) rotate(-${i * 60}deg)`,
              animation: `orbit-particle-reverse ${5 + i}s linear infinite`,
              animationDelay: `${i * 0.4}s`,
              boxShadow: `0 0 8px ${i % 2 === 0 ? 'rgba(124, 77, 255, 0.9)' : 'rgba(0, 229, 255, 0.9)'}`,
              filter: 'blur(0.5px)'
            }}
          ></div>
        ))}
      </div>
      
      {/* Profile Info - Better organized */}
      <div className="profile-info text-center relative z-10 max-w-3xl mx-auto">
        {/* Name with improved spacing */}
        <div className="relative inline-block mb-6">
          <h2 className="name text-5xl md:text-6xl bg-gradient-to-r from-[#80deea] via-[#4fc3f7] to-[#00e5ff] bg-clip-text text-transparent font-bold tracking-wide relative leading-tight">
            <span className="relative z-10">Evril Fadrekha Cahyani</span>
            <span 
              className="absolute inset-0 bg-gradient-to-r from-[#80deea] via-[#4fc3f7] to-[#00e5ff] bg-clip-text text-transparent blur-md opacity-50"
              style={{
                transform: 'translate(1px, 1px)'
              }}
            >
              Evril Fadrekha Cahyani
            </span>
          </h2>
        </div>
        
        {/* Status badge with cleaner design */}
        <div 
          className={`status inline-flex items-center gap-3 bg-gradient-to-r from-[rgba(79,195,247,0.1)] via-[rgba(124,77,255,0.08)] to-[rgba(0,229,255,0.1)] backdrop-blur-md px-8 py-4 rounded-full border border-[rgba(79,195,247,0.3)] text-lg font-medium cursor-pointer transition-all duration-500 relative overflow-hidden group shadow-[0_4px_20px_rgba(79,195,247,0.15)] ${
            isStatusAnimating ? 'translate-y-[-3px] scale-105' : 'hover:translate-y-[-3px] hover:shadow-[0_8px_30px_rgba(79,195,247,0.3)]'
          }`}
          onClick={handleStatusClick}
        >
          {/* Background animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#4fc3f7] to-[#7c4dff] opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full"></div>
          
          {/* Pulse indicator */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00e5ff] rounded-full animate-ping-slow opacity-60"></div>
          
          <i className="fas fa-medal text-2xl text-[#ffd166] relative z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(255,209,102,0.6)]"></i>
          <span className="relative z-10 bg-gradient-to-r from-white via-[#80deea] to-white bg-clip-text text-transparent">
            Semhas - Pake Jurnal, Daaaaaang
          </span>
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
        
        {/* Description with better styling */}
        <div className="mt-10 relative">
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto relative z-10">
            Berikut keuntungan yang ko dapetin karna ambil jurnal:
          </p>
          <div className="absolute -inset-x-8 -inset-y-4 bg-gradient-to-r from-[#2979ff]/5 via-[#7c4dff]/8 to-[#00e5ff]/5 blur-2xl rounded-2xl -z-10"></div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes orbit-particle {
          from { transform: rotate(0deg) translateX(175px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(175px) rotate(-360deg); }
        }
        
        @keyframes orbit-particle-reverse {
          from { transform: rotate(0deg) translateX(165px) rotate(0deg); }
          to { transform: rotate(-360deg) translateX(165px) rotate(360deg); }
        }
        
        @keyframes orbit-particle-slow {
          from { transform: rotate(0deg) translateX(var(--distance, 185px)) rotate(0deg); }
          to { transform: rotate(360deg) translateX(var(--distance, 185px)) rotate(-360deg); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.8); opacity: 0; }
          100% { transform: scale(1); opacity: 0.6; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}