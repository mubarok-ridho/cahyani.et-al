import { useState } from 'react';

export default function MoneyFlowCard({ onClick }) {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = () => {
        setIsAnimating(true);
        onClick?.();
        setTimeout(() => setIsAnimating(false), 300);
    };

    const createMoneyFall = () => {
        const symbols = ['💰', '💸', '💵', '💴', '😢'];
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                const money = document.createElement('div');
                const symbol = symbols[Math.floor(Math.random() * symbols.length)];

                money.textContent = symbol;
                money.style.position = 'fixed';
                money.style.fontSize = '1.5rem';
                money.style.zIndex = '9999';
                money.style.pointerEvents = 'none';
                money.style.left = `${Math.random() * 80 + 10}%`;
                money.style.top = '-50px';
                money.style.animation = `moneyFall ${Math.random() * 2 + 1}s ease-in forwards`;

                document.body.appendChild(money);
                setTimeout(() => money.remove(), 2000);
            }, i * 100);
        }
    };

    return (
        <div
            className={`money-flow-card absolute top-[80px] left-5 bg-[rgba(255,50,50,0.1)] border-2 border-[rgba(255,50,50,0.2)] rounded-xl px-6 py-4 backdrop-blur-lg text-center animate-money-flow cursor-pointer shadow-lg ${isAnimating ? 'scale-110 bg-[rgba(255,50,50,0.2)]' : ''}`}
            onClick={() => {
                handleClick();
                createMoneyFall();
            }}
        >
            <div className="money-icon text-xl">😢</div>
            <div className="money-label text-sm opacity-80 mt-1">evril's credit</div>
            <div className="money-amount text-2xl font-bold mt-1">-4100k</div>
        </div>
    );
}