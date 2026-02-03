import { useEffect, useState } from 'react';

export default function ToastNotification({ show, message, duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 500); // Wait for animation to finish
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show && !isVisible) return null;

  return (
    <div className={`toast fixed bottom-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#2979ff] to-[#7c4dff] text-white px-6 py-4 rounded-lg shadow-xl z-[1000] flex items-center gap-3 backdrop-blur-lg border border-white/10 transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[100px] opacity-0'
    }`}>
      <i className="fas fa-key"></i>
      <span className="font-medium">{message}</span>
    </div>
  );
}