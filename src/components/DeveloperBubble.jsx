export default function DeveloperBubble({ onClick, letterOpened, isTemporarilyUnlocked }) {
  return (
    <div 
      className="developer-bubble fixed top-6 right-6 z-50 animate-float-bubble group"
      onClick={onClick}
    >
      {/* Chat bubble container */}
      <div className="relative">
        {/* Main bubble */}
        <div className="bg-gradient-to-br from-white/12 via-white/8 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-4 max-w-[320px] shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.1)_inset] cursor-pointer transition-all duration-300 group-hover:translate-y-[-4px] group-hover:shadow-[0_12px_40px_rgba(79,195,247,0.3),0_0_0_1px_rgba(79,195,247,0.3)_inset] group-hover:border-[#4fc3f7]/40">
          
          {/* Header dengan foto */}
          <div className="flex items-start gap-3 mb-3">
            {/* Developer photo dengan glow */}
            <div className="relative flex-shrink-0">
              <div className="dev-photo w-12 h-12 rounded-full overflow-hidden border-2 border-[#4fc3f7]/60 shadow-[0_0_15px_rgba(79,195,247,0.4)] group-hover:border-[#4fc3f7] transition-all duration-300">
                <img 
                  src="https://res.cloudinary.com/doafwrddd/image/upload/v1769808784/newmyphoto_euvajr.jpg" 
                  alt="Developer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#2979ff] to-[#7c4dff] flex items-center justify-center text-white text-xl shadow-inner">
                        👨‍💻
                      </div>
                    `;
                  }}
                />
              </div>
              {/* Online indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#00ff88] rounded-full border-2 border-white/20 shadow-[0_0_8px_rgba(0,255,136,0.6)] animate-pulse"></div>
            </div>

            {/* Name & role */}
            <div className="flex-1 pt-0.5">
              <div className="text-sm font-semibold text-white/95 mb-0.5">Developer R</div>
              <div className="text-xs text-white/50 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse"></span>
                <span>Online</span>
              </div>
            </div>
          </div>

          {/* Message content */}
          <div className="bubble-message bg-gradient-to-br from-[#4fc3f7]/15 to-[#7c4dff]/10 rounded-2xl p-3.5 relative overflow-hidden border border-white/5">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '16px 16px'
            }}></div>
            
            <p className="text-sm leading-relaxed text-white/90 relative z-10">
              tulisanku jlek vril, jd kubuat gini aja y wkwk, effortnya 11 12 sih, tp ini yg 12
            </p>
            
            {/* Message time */}
            <div className="text-[10px] text-white/40 mt-2 text-right">
              Just now
            </div>
          </div>

          {/* Hint section */}
          {(letterOpened || isTemporarilyUnlocked) && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs text-[#4fc3f7]/80 italic">
                  {!isTemporarilyUnlocked ? 'jgn lupa baca message d bwh y' : 'jgn lupa baca message d bwh y'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Chat bubble tail/arrow */}
        <div className="absolute -bottom-2 right-8 w-4 h-4 bg-gradient-to-br from-white/12 to-white/5 border-r border-b border-white/20 transform rotate-45 backdrop-blur-xl"></div>
      </div>

      {/* Floating notification badge */}
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-[#ff6b9d] to-[#ff4757] rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_15px_rgba(255,107,157,0.6)] animate-bounce-slow border-2 border-white/30">
        1
      </div>

      {/* Typing indicator (optional, can be toggled) */}
      <div className="absolute -bottom-8 right-4 bg-white/10 backdrop-blur-lg border border-white/10 rounded-full px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-[#4fc3f7] rounded-full animate-typing-dot"></div>
          <div className="w-1.5 h-1.5 bg-[#4fc3f7] rounded-full animate-typing-dot" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1.5 h-1.5 bg-[#4fc3f7] rounded-full animate-typing-dot" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-bubble {
          0%, 100% { 
            transform: translateY(0px);
          }
          50% { 
            transform: translateY(-8px);
          }
        }

        @keyframes bounce-slow {
          0%, 100% { 
            transform: scale(1) translateY(0);
          }
          50% { 
            transform: scale(1.1) translateY(-2px);
          }
        }

        @keyframes typing-dot {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }

        .animate-float-bubble {
          animation: float-bubble 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-typing-dot {
          animation: typing-dot 1.4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}