import { useState, useEffect } from 'react';

export default function MoneyFlowCard({ onClick }) {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleClick = () => {
        setIsAnimating(true);
        onClick?.();
        setTimeout(() => setIsAnimating(false), 300);
    };

    const createMoneyFall = () => {
        const symbols = ['💰', '💸', '💵', '💴', '😢', '💳', '🪙'];
        const count = isMobile ? 8 : 15;
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const money = document.createElement('div');
                const symbol = symbols[Math.floor(Math.random() * symbols.length)];

                money.textContent = symbol;
                money.style.position = 'fixed';
                money.style.fontSize = isMobile ? '1.2rem' : '1.8rem';
                money.style.zIndex = '9999';
                money.style.pointerEvents = 'none';
                money.style.left = `${Math.random() * 80 + 10}%`;
                money.style.top = '-50px';
                money.style.animation = `moneyFall ${Math.random() * 2 + 1.5}s cubic-bezier(0.4, 0, 0.6, 1) forwards`;
                money.style.filter = 'drop-shadow(0 0 8px rgba(255, 50, 50, 0.6))';

                document.body.appendChild(money);
                setTimeout(() => money.remove(), 3000);
            }, i * 80);
        }
    };

    return (
        <>
            <div
                className={`money-flow-card fixed top-16 sm:top-20 md:top-24 left-3 sm:left-4 md:left-5 z-40 cursor-pointer transition-all duration-500 group ${
                    isAnimating ? 'scale-105' : 'hover:scale-110'
                }`}
                onClick={() => {
                    handleClick();
                    createMoneyFall();
                }}
            >
                {/* Outer glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[#ff3232]/30 via-[#ff6b6b]/20 to-[#ff3232]/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>

                {/* Main card */}
                <div className="relative bg-gradient-to-br from-[rgba(255,50,50,0.15)] via-[rgba(255,80,80,0.1)] to-[rgba(255,50,50,0.08)] backdrop-blur-xl rounded-2xl border-2 border-[rgba(255,80,80,0.3)] shadow-[0_8px_32px_rgba(255,50,50,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-4 min-w-[140px] sm:min-w-[160px] md:min-w-[180px]">
                    
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 50, 50, 0.5) 1px, transparent 0)`,
                        backgroundSize: '20px 20px'
                    }}></div>

                    {/* Diagonal stripes */}
                    <div className="absolute inset-0 opacity-5" style={{
                        background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 50, 50, 0.3) 10px, rgba(255, 50, 50, 0.3) 20px)'
                    }}></div>

                    {/* Money rain indicator */}
                    <div className="absolute top-1 right-1 flex gap-0.5">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#ff3232]"
                                style={{
                                    animation: `moneyDrop ${0.8 + i * 0.2}s ease-in-out infinite`,
                                    animationDelay: `${i * 0.2}s`
                                }}
                            ></div>
                        ))}
                    </div>

                    {/* Warning flash */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff3232]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                    {/* Content */}
                    <div className="relative z-10">
                        {/* Icon with pulse */}
                        <div className="flex justify-center mb-1.5 sm:mb-2">
                            <div className="relative">
                                <div className="text-3xl sm:text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-300">
                                    😢
                                </div>
                                <div className="absolute -inset-2 bg-[#ff3232]/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        </div>

                        {/* Label */}
                        <div className="text-[10px] sm:text-xs text-white/70 mb-1 tracking-wide font-medium text-center">
                            evril's credit
                        </div>

                        {/* Amount with glitch effect */}
                        <div className="relative">
                            <div className="text-xl sm:text-2xl md:text-3xl font-black text-center bg-gradient-to-r from-[#ff3232] via-[#ff6b6b] to-[#ff3232] bg-clip-text text-transparent leading-none">
                                -4100k
                            </div>
                            {/* Glowing shadow */}
                            <div className="absolute inset-0 text-xl sm:text-2xl md:text-3xl font-black text-center blur-md opacity-50" style={{ color: '#ff3232' }}>
                                -4100k
                            </div>
                        </div>

                        {/* Subtitle */}
                        <div className="mt-1.5 sm:mt-2 text-[9px] sm:text-[10px] text-[#ff6b6b]/80 text-center italic">
                            habis buat jurnal 😭
                        </div>

                        {/* Animated warning line */}
                        <div className="mt-2 sm:mt-3 h-px w-full bg-gradient-to-r from-transparent via-[#ff3232]/50 to-transparent">
                            <div className="h-full w-1/3 bg-[#ff3232] animate-scan"></div>
                        </div>
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-[#ff3232]/50 rounded-tl-2xl"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-[#ff3232]/50 rounded-tr-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-[#ff3232]/50 rounded-bl-2xl"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-[#ff3232]/50 rounded-br-2xl"></div>
                </div>

                {/* Click hint */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    <div className="text-[10px] text-white/40 flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M13.5 3C13.5 2.17157 12.8284 1.5 12 1.5C11.1716 1.5 10.5 2.17157 10.5 3V9H4C3.17157 9 2.5 9.67157 2.5 10.5C2.5 11.3284 3.17157 12 4 12H10.5V18.5C10.5 19.3284 11.1716 20 12 20C12.8284 20 13.5 19.3284 13.5 18.5V12H20C20.8284 12 21.5 11.3284 21.5 10.5C21.5 9.67157 20.8284 9 20 9H13.5V3Z"/>
                        </svg>
                        <span className="hidden sm:inline">klik buat efek</span>
                        <span className="sm:hidden">klik</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes moneyFall {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(calc(100vh + 100px)) rotate(720deg);
                        opacity: 0;
                    }
                }

                @keyframes moneyDrop {
                    0%, 100% {
                        transform: translateY(0);
                        opacity: 0.3;
                    }
                    50% {
                        transform: translateY(8px);
                        opacity: 1;
                    }
                }

                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 0.8; }
                }

                @keyframes scan {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(300%); }
                }

                .animate-pulse-slow {
                    animation: pulse-slow 3s ease-in-out infinite;
                }

                .animate-scan {
                    animation: scan 2s ease-in-out infinite;
                }

                /* Mobile touch optimization */
                @media (max-width: 640px) {
                    .money-flow-card {
                        touch-action: manipulation;
                    }
                }
            `}</style>
        </>
    );
}