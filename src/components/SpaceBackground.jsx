import { useEffect, useRef } from 'react';

export default function SpaceBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Hapus elemen lama
    container.querySelectorAll('.star-particle, .nebula-smudge, .planet, .asteroid, .galaxy-dust, .distant-galaxy').forEach(el => el.remove());

    // Layer 1: Distant stars (dikurangi dari 600 jadi 300)
    const createDistantStars = () => {
      const count = 300;
      
      for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star-particle distant';
        
        const size = 0.5 + Math.random() * 0.5;
        const opacity = 0.2 + Math.random() * 0.3;
        const twinkleSpeed = 5 + Math.random() * 10;
        const twinkleDelay = Math.random() * 8;
        
        const colors = ['#a8b8d8', '#b0c0e0', '#c8d0e8', '#ffffff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        star.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background-color: ${color};
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          opacity: ${opacity};
          box-shadow: 0 0 ${size}px ${color};
          animation: star-twinkle-slow ${twinkleSpeed}s ease-in-out infinite ${twinkleDelay}s;
          z-index: 1;
        `;
        
        container.appendChild(star);
      }
    };

    // Layer 2: Medium distance stars (dikurangi dari 200 jadi 120)
    const createMediumStars = () => {
      const count = 120;
      
      for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star-particle medium';
        
        const size = 1 + Math.random() * 1.5;
        const opacity = 0.4 + Math.random() * 0.4;
        const twinkleSpeed = 3 + Math.random() * 6;
        const twinkleDelay = Math.random() * 5;
        
        const colorRand = Math.random();
        let color;
        if (colorRand < 0.5) color = '#ffffff';
        else if (colorRand < 0.75) color = '#fff8e0';
        else if (colorRand < 0.9) color = '#e0f0ff';
        else color = '#ffe0e0';
        
        star.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background-color: ${color};
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          opacity: ${opacity};
          box-shadow: 0 0 ${size * 2}px ${color};
          animation: star-twinkle ${twinkleSpeed}s ease-in-out infinite ${twinkleDelay}s;
          z-index: 2;
        `;
        
        container.appendChild(star);
      }
    };

    // Layer 3: Close/bright stars (dikurangi dari 80 jadi 50)
    const createCloseStars = () => {
      const count = 50;
      
      for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star-particle close';
        
        const size = 2 + Math.random() * 2;
        const opacity = 0.6 + Math.random() * 0.4;
        const twinkleSpeed = 2 + Math.random() * 4;
        const twinkleDelay = Math.random() * 3;
        
        const colorRand = Math.random();
        let color;
        if (colorRand < 0.4) color = '#ffffff';
        else if (colorRand < 0.6) color = '#fff4d0';
        else if (colorRand < 0.75) color = '#d0e8ff';
        else if (colorRand < 0.85) color = '#ffd0d0';
        else color = '#e8d0ff';
        
        star.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background-color: ${color};
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          opacity: ${opacity};
          box-shadow: 0 0 ${size * 3}px ${color}, 0 0 ${size * 6}px ${color};
          animation: star-twinkle-bright ${twinkleSpeed}s ease-in-out infinite ${twinkleDelay}s;
          z-index: 3;
        `;
        
        container.appendChild(star);
      }
    };

    // Milky Way / Galaxy dust
    const createGalaxyDust = () => {
      const dust = document.createElement('div');
      dust.className = 'galaxy-dust';
      
      dust.style.cssText = `
        position: absolute;
        width: 100%;
        height: 150%;
        left: -25%;
        top: -25%;
        background: 
          radial-gradient(ellipse at 20% 40%, rgba(100, 120, 180, 0.08) 0%, transparent 40%),
          radial-gradient(ellipse at 60% 60%, rgba(80, 100, 160, 0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 40% 80%, rgba(120, 100, 180, 0.04) 0%, transparent 45%);
        transform: rotate(-20deg);
        filter: blur(60px);
        z-index: 0;
        opacity: 0.6;
        animation: galaxy-drift 200s linear infinite;
      `;
      
      container.appendChild(dust);
    };

    // Nebula clouds
    const createNebulas = () => {
      const nebulaCount = 5;
      const colors = [
        { main: 'rgba(41, 121, 255, 0.04)', glow: 'rgba(41, 121, 255, 0.02)' },
        { main: 'rgba(124, 77, 255, 0.035)', glow: 'rgba(124, 77, 255, 0.015)' },
        { main: 'rgba(0, 229, 255, 0.025)', glow: 'rgba(0, 229, 255, 0.01)' },
        { main: 'rgba(255, 100, 200, 0.02)', glow: 'rgba(255, 100, 200, 0.01)' },
        { main: 'rgba(100, 255, 150, 0.015)', glow: 'rgba(100, 255, 150, 0.005)' }
      ];
      
      for (let i = 0; i < nebulaCount; i++) {
        const nebula = document.createElement('div');
        nebula.className = 'nebula-smudge';
        
        const size = 250 + Math.random() * 400;
        const left = -10 + Math.random() * 100;
        const top = -10 + Math.random() * 100;
        const color = colors[i % colors.length];
        
        nebula.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size * 0.7}px;
          background: 
            radial-gradient(ellipse, ${color.main} 0%, ${color.glow} 40%, transparent 70%);
          border-radius: 50%;
          left: ${left}%;
          top: ${top}%;
          filter: blur(50px);
          animation: nebula-drift ${80 + i * 30}s ease-in-out infinite;
          z-index: 0;
          opacity: 0.7;
          transform: rotate(${Math.random() * 360}deg);
        `;
        
        container.appendChild(nebula);
      }
    };

    // Distant planets
    const createPlanets = () => {
      const planetCount = 3;
      const positions = [
        { left: 15, top: 20, size: 40 },
        { left: 75, top: 65, size: 30 },
        { left: 85, top: 15, size: 25 }
      ];
      
      for (let i = 0; i < planetCount; i++) {
        const planet = document.createElement('div');
        planet.className = 'planet';
        
        const pos = positions[i];
        const colors = [
          'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)',
          'linear-gradient(135deg, #744c2c 0%, #5a3621 100%)',
          'linear-gradient(135deg, #4a6fa5 0%, #364f75 100%)'
        ];
        
        planet.style.cssText = `
          position: absolute;
          width: ${pos.size}px;
          height: ${pos.size}px;
          background: ${colors[i]};
          border-radius: 50%;
          left: ${pos.left}%;
          top: ${pos.top}%;
          opacity: 0.4;
          box-shadow: 
            inset -${pos.size/4}px -${pos.size/4}px ${pos.size/3}px rgba(0,0,0,0.5),
            0 0 ${pos.size/2}px rgba(255,255,255,0.1);
          z-index: 1;
          animation: planet-float ${40 + i * 20}s ease-in-out infinite;
        `;
        
        container.appendChild(planet);
      }
    };

    // Asteroids
    const createAsteroids = () => {
      const asteroidCount = 8;
      
      for (let i = 0; i < asteroidCount; i++) {
        const asteroid = document.createElement('div');
        asteroid.className = 'asteroid';
        
        const size = 2 + Math.random() * 4;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        asteroid.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: #4a5568;
          left: ${left}%;
          top: ${top}%;
          opacity: 0.3;
          box-shadow: 0 0 ${size}px rgba(255,255,255,0.1);
          transform: rotate(${Math.random() * 360}deg);
          animation: asteroid-drift ${30 + Math.random() * 40}s linear infinite;
          z-index: 1;
        `;
        
        const borderRadius = `${30 + Math.random() * 20}% ${40 + Math.random() * 20}% ${35 + Math.random() * 20}% ${45 + Math.random() * 20}%`;
        asteroid.style.borderRadius = borderRadius;
        
        container.appendChild(asteroid);
      }
    };

    // IMPROVED: Shooting stars / Meteor (lebih jarang tapi lebih terlihat)
    const createShootingStar = () => {
      if (Math.random() > 0.3) return; // Lebih sering muncul saat dipanggil
      
      const shootingStar = document.createElement('div');
      shootingStar.className = 'shooting-star';
      
      // Random posisi awal dari berbagai sudut
      const startSide = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
      let startX, startY, angle;
      
      switch(startSide) {
        case 0: // Dari atas
          startX = 20 + Math.random() * 60;
          startY = -5;
          angle = (Math.PI / 6) + (Math.random() * Math.PI / 6); // 30-60 derajat ke bawah
          break;
        case 1: // Dari kanan
          startX = 105;
          startY = 20 + Math.random() * 30;
          angle = (Math.PI * 3/4) + (Math.random() * Math.PI / 6); // Diagonal kiri bawah
          break;
        case 2: // Dari kiri atas (most common)
          startX = -5;
          startY = 20 + Math.random() * 40;
          angle = (Math.PI / 4) + (Math.random() * Math.PI / 8); // 45-67 derajat
          break;
        default: // Dari atas kanan
          startX = 70 + Math.random() * 30;
          startY = -5;
          angle = (Math.PI / 3) + (Math.random() * Math.PI / 12);
          break;
      }
      
      const length = 100 + Math.random() * 150; // Lebih panjang
      const duration = 1 + Math.random() * 1.5; // Lebih lambat
      const thickness = 1.5 + Math.random() * 1; // Variasi ketebalan
      
      // Warna random (putih, biru, atau kekuningan)
      const colorVariant = Math.random();
      let gradient;
      if (colorVariant < 0.6) {
        // Putih kebiruan (paling umum)
        gradient = `linear-gradient(90deg, 
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 1) 20%,
          rgba(200, 230, 255, 0.8) 50%,
          rgba(150, 200, 255, 0.4) 80%,
          rgba(100, 150, 255, 0) 100%
        )`;
      } else if (colorVariant < 0.85) {
        // Putih murni
        gradient = `linear-gradient(90deg, 
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 1) 25%,
          rgba(255, 255, 255, 0.7) 60%,
          rgba(200, 200, 255, 0) 100%
        )`;
      } else {
        // Kekuningan (jarang)
        gradient = `linear-gradient(90deg, 
          rgba(255, 240, 200, 0) 0%,
          rgba(255, 250, 220, 1) 20%,
          rgba(255, 240, 200, 0.6) 60%,
          rgba(200, 180, 150, 0) 100%
        )`;
      }
      
      shootingStar.style.cssText = `
        position: fixed;
        width: ${length}px;
        height: ${thickness}px;
        background: ${gradient};
        left: ${startX}%;
        top: ${startY}%;
        transform: rotate(${angle}rad);
        box-shadow: 0 0 6px rgba(255, 255, 255, 0.9), 0 0 12px rgba(200, 230, 255, 0.5);
        animation: shooting-star-fall ${duration}s ease-in forwards;
        z-index: 100;
        pointer-events: none;
      `;
      
      document.body.appendChild(shootingStar);
      
      setTimeout(() => shootingStar.remove(), duration * 1000);
    };

    // NEW: Komet dengan ekor panjang (lebih dramatis)
    const createComet = () => {
      if (Math.random() > 0.4) return; // 40% chance saat dipanggil
      
      const comet = document.createElement('div');
      comet.className = 'comet';
      
      // Komet datang dari berbagai arah
      const directions = [
        { startX: -10, startY: 30, endX: 110, endY: 70, angle: 25 },
        { startX: 110, startY: 20, endX: -10, endY: 80, angle: 155 },
        { startX: 50, startY: -10, endX: 70, endY: 110, angle: 80 },
        { startX: -10, startY: 50, endX: 110, endY: 60, angle: 10 }
      ];
      
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const length = 200 + Math.random() * 250; // Sangat panjang
      const duration = 2.5 + Math.random() * 2; // Lebih lambat untuk efek dramatis
      const size = 3 + Math.random() * 2; // Kepala komet
      
      // Warna komet (kebanyakan putih kebiruan dengan variasi)
      const cometColors = [
        'rgba(255, 255, 255, 0.9)',
        'rgba(200, 230, 255, 0.85)',
        'rgba(180, 220, 255, 0.8)'
      ];
      const headColor = cometColors[Math.floor(Math.random() * cometColors.length)];
      
      comet.innerHTML = `
        <div class="comet-head" style="
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: ${headColor};
          border-radius: 50%;
          box-shadow: 
            0 0 ${size * 3}px ${headColor},
            0 0 ${size * 6}px rgba(255, 255, 255, 0.6),
            0 0 ${size * 10}px rgba(200, 230, 255, 0.4);
          z-index: 2;
        "></div>
        <div class="comet-tail" style="
          position: absolute;
          width: ${length}px;
          height: ${size * 0.8}px;
          background: linear-gradient(90deg,
            ${headColor} 0%,
            rgba(255, 255, 255, 0.6) 10%,
            rgba(200, 230, 255, 0.4) 30%,
            rgba(150, 200, 255, 0.2) 60%,
            rgba(100, 150, 200, 0.05) 85%,
            transparent 100%
          );
          box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.3);
          transform-origin: left center;
          z-index: 1;
        "></div>
      `;
      
      comet.style.cssText = `
        position: fixed;
        left: ${dir.startX}%;
        top: ${dir.startY}%;
        transform: rotate(${dir.angle}deg);
        animation: comet-travel ${duration}s ease-in forwards;
        z-index: 100;
        pointer-events: none;
        --end-x: ${dir.endX}%;
        --end-y: ${dir.endY}%;
      `;
      
      document.body.appendChild(comet);
      
      setTimeout(() => comet.remove(), duration * 1000);
    };

    // Distant galaxies
    const createDistantGalaxies = () => {
      const galaxyCount = 4;
      
      for (let i = 0; i < galaxyCount; i++) {
        const galaxy = document.createElement('div');
        galaxy.className = 'distant-galaxy';
        
        const size = 15 + Math.random() * 25;
        const left = 10 + Math.random() * 80;
        const top = 10 + Math.random() * 80;
        
        galaxy.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size * 0.4}px;
          background: radial-gradient(ellipse, rgba(180, 190, 220, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          left: ${left}%;
          top: ${top}%;
          filter: blur(2px);
          opacity: 0.5;
          z-index: 0;
          transform: rotate(${Math.random() * 360}deg);
          animation: galaxy-pulse ${60 + i * 20}s ease-in-out infinite;
        `;
        
        container.appendChild(galaxy);
      }
    };

    // Initialize semua layer
    createGalaxyDust();
    createNebulas();
    createDistantGalaxies();
    createDistantStars();
    createMediumStars();
    createCloseStars();
    createPlanets();
    createAsteroids();
    
    // Shooting stars setiap 3-7 detik
    const createShootingStarRandomly = () => {
      createShootingStar();
      const nextTime = 3000 + Math.random() * 4000;
      setTimeout(createShootingStarRandomly, nextTime);
    };
    createShootingStarRandomly();
    
    // Komet besar setiap 8-15 detik
    const createCometRandomly = () => {
      createComet();
      const nextTime = 8000 + Math.random() * 7000;
      setTimeout(createCometRandomly, nextTime);
    };
    setTimeout(createCometRandomly, 5000); // Mulai setelah 5 detik
    
    const handleResize = () => {
      container.querySelectorAll('.star-particle, .nebula-smudge, .planet, .asteroid, .galaxy-dust, .distant-galaxy').forEach(el => el.remove());
      createGalaxyDust();
      createNebulas();
      createDistantGalaxies();
      createDistantStars();
      createMediumStars();
      createCloseStars();
      createPlanets();
      createAsteroids();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes star-twinkle-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        
        @keyframes star-twinkle-bright {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        
        @keyframes nebula-drift {
          0% { transform: translateX(0) translateY(0) rotate(0deg); }
          50% { transform: translateX(30px) translateY(-20px) rotate(5deg); }
          100% { transform: translateX(0) translateY(0) rotate(0deg); }
        }
        
        @keyframes galaxy-drift {
          0% { transform: translateX(0) rotate(-20deg); }
          100% { transform: translateX(-10%) rotate(-20deg); }
        }
        
        @keyframes shooting-star-fall {
          0% { 
            transform: translateY(0) translateX(0) rotate(var(--rotation, 45deg)); 
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          70% { 
            opacity: 0.9; 
          }
          100% { 
            transform: translateY(150vh) translateX(150vh) rotate(var(--rotation, 45deg)); 
            opacity: 0; 
          }
        }
        
        @keyframes comet-travel {
          0% {
            opacity: 0;
            transform: translate(0, 0) rotate(var(--rotation, 45deg));
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: translate(
              calc(var(--end-x) - 50vw), 
              calc(var(--end-y) - 50vh)
            ) rotate(var(--rotation, 45deg));
          }
        }
        
        @keyframes planet-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes asteroid-drift {
          0% { transform: translateX(0) translateY(0) rotate(0deg); }
          100% { transform: translateX(30px) translateY(20px) rotate(360deg); }
        }
        
        @keyframes galaxy-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
      `}</style>
      
      <div 
        ref={containerRef}
        className="fixed inset-0 -z-50 overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse at top, #0a0e27 0%, #000000 100%),
            linear-gradient(to bottom, #000814 0%, #000000 50%, #000814 100%)
          `,
        }}
      >
        {/* Deep space gradient layers */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 25% 25%, rgba(30, 50, 100, 0.08) 0%, transparent 50%)',
            filter: 'blur(80px)',
            opacity: 0.4
          }}
        />
        
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 75% 75%, rgba(60, 40, 100, 0.06) 0%, transparent 50%)',
            filter: 'blur(100px)',
            opacity: 0.3
          }}
        />
        
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(10, 30, 60, 0.05) 0%, transparent 60%)',
            filter: 'blur(120px)',
            opacity: 0.5
          }}
        />
      </div>
    </>
  );
}