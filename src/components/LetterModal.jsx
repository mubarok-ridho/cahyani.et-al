import { useEffect } from 'react';

export default function LetterModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const createUnlockEffect = () => {
    const effects = ['✨', '🌟', '⚡', '💫', '🔓', '💝', '🎉', '🌸'];
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const effect = document.createElement('div');
        const symbol = effects[Math.floor(Math.random() * effects.length)];

        effect.textContent = symbol;
        effect.style.position = 'fixed';
        effect.style.fontSize = `${Math.random() * 1.5 + 1.5}rem`;
        effect.style.zIndex = '9999';
        effect.style.pointerEvents = 'none';
        effect.style.left = `${Math.random() * 80 + 10}%`;
        effect.style.top = `${Math.random() * 80 + 10}%`;
        effect.style.animation = `unlockFloat ${Math.random() * 1.5 + 1.5}s ease-out forwards`;

        document.body.appendChild(effect);
        setTimeout(() => effect.remove(), 2000);
      }, i * 60);
    }
  };

  useEffect(() => {
    if (isOpen) {
      createUnlockEffect();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop blur overlay - web tetap keliatan tapi blur */}
      <div
        className="letter-backdrop fixed inset-0 z-[1500] animate-fade-in"
        style={{
          backdropFilter: 'blur(12px) brightness(0.7) saturate(1.3)',
          WebkitBackdropFilter: 'blur(12px) brightness(0.7) saturate(1.3)',
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }}
        onClick={onClose}
      >
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/50"></div>
      </div>

      {/* Letter modal */}
      <div
        className="letter-modal fixed inset-0 z-[1501] flex items-center justify-center p-4 animate-fade-in pointer-events-none"
      >
        <div 
          className="letter-container relative max-w-2xl w-full pointer-events-auto animate-slide-up-bounce"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Outer glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#4fc3f7]/20 via-[#7c4dff]/20 to-[#ff6b9d]/20 rounded-3xl blur-2xl animate-pulse-glow"></div>
          
          {/* Main letter card */}
          <div className="relative bg-gradient-to-br from-[#1a237e]/95 via-[#000b1f]/95 to-[#0a0a1f]/95 backdrop-blur-xl rounded-3xl border-2 border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)_inset] overflow-hidden">
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4fc3f7] via-[#7c4dff] to-[#ff6b9d]"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#4fc3f7]/10 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#7c4dff]/10 to-transparent rounded-tr-full"></div>
            
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }}></div>

            {/* Close button */}
            <button
              className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#4fc3f7] hover:bg-white/10 hover:border-[#4fc3f7]/30 hover:scale-110 transition-all duration-300 group"
              onClick={onClose}
            >
              <i className="fas fa-times text-lg group-hover:rotate-90 transition-transform duration-300"></i>
            </button>

            {/* Content container */}
            <div className="relative p-8 md:p-12">
              
              {/* Header */}
              <div className="letter-header text-center mb-10 relative">
                {/* Decorative icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#4fc3f7]/20 to-[#7c4dff]/20 border border-[#4fc3f7]/30 mb-4 shadow-[0_0_20px_rgba(79,195,247,0.3)]">
                  <i className="fas fa-envelope-open-text text-2xl text-[#4fc3f7]"></i>
                </div>

                <h2 className="letter-title text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#4fc3f7] via-[#9575cd] to-[#ff6b9d] bg-clip-text text-transparent mb-3 leading-tight">
                  Selamat Semhas + LOA Abangku!
                </h2>
                <p className="text-white/50 text-sm tracking-wide">(Cahyani et al., 2026)</p>
                
                {/* Decorative line */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#4fc3f7]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4fc3f7] animate-pulse"></div>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#4fc3f7]"></div>
                </div>
              </div>

              {/* Letter content */}
              <div className="letter-content bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 mb-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)] relative overflow-hidden">
                {/* Paper texture overlay */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 3px)`
                }}></div>

                <div className="relative leading-relaxed text-white/90 text-base md:text-lg space-y-4">
                  <p className="text-[#4fc3f7] font-medium">Halo Evril,</p>
                  
                  <p>Finally ya vril ♨️</p>
                  
                  <p>LOAmu yang ga turun turun itu, akhirnya turun juga wkwkwk, yaa walaupun tabunganmu ..., mkny ak beliin ini biar km ttp bisa ngopi kpn aja 🤘🏼🤘🏼</p>
                  
                  <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  
                  <p>Thanks ya vril, for listening and being there. It meant a lot to me, sorry jd sering gangguin dan risihin km.</p>
                  
                  <p>Wish you happy always deh. apapun yg km pilih, semoga yg terbaik utk km yee, tp klo bingung, kudoain semoga diarahkan ke yang baik baik buat km, aamiin.</p>
                  
                  <div className="bg-gradient-to-r from-[#4fc3f7]/10 to-[#7c4dff]/10 border-l-4 border-[#4fc3f7] rounded-r-lg p-4 mt-6">
                    <p className="text-[#80deea]">⛰️ : jangan lupa ndakinya, im really wait for it!</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="letter-footer text-right space-y-3">
                <p className="text-[#80deea]/80 italic text-sm md:text-base">
                  dari orang yang sering curhat wkwk
                </p>
                <div className="flex items-center justify-end gap-2">
                  <div className="text-4xl animate-wave">🧙🏼</div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#4fc3f7] animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-[#7c4dff] animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-[#ff6b9d] animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up-bounce {
          0% {
            opacity: 0;
            transform: translateY(100px) scale(0.9);
          }
          60% {
            opacity: 1;
            transform: translateY(-10px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes wave {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(20deg);
          }
          75% {
            transform: rotate(-20deg);
          }
        }

        @keyframes unlockFloat {
          0% {
            opacity: 0;
            transform: translateY(0) scale(0);
          }
          20% {
            opacity: 1;
            transform: translateY(-20px) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translateY(-80px) scale(0.8) rotate(180deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .animate-slide-up-bounce {
          animation: slide-up-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .animate-wave {
          animation: wave 2s ease-in-out infinite;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </>
  );
}