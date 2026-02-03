import { useState, useEffect } from 'react';
import { CORRECT_PASSWORD } from '../utils/constants';

export default function PasswordModal({ 
  isOpen, 
  onClose, 
  passwordInput, 
  setPasswordInput, 
  onSubmit, 
  error 
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus input when modal opens
      const input = document.getElementById('passwordInput');
      setTimeout(() => input?.focus(), 100);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    await onSubmit();
    setIsSubmitting(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="password-modal fixed inset-0 bg-black/85 backdrop-blur-lg z-[2000] flex items-center justify-center animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="password-container bg-gradient-to-br from-[rgba(26,35,126,0.9)] to-[rgba(0,11,31,0.9)] rounded-2xl p-10 max-w-md w-[90%] border border-[rgba(79,195,247,0.2)] shadow-2xl animate-slide-up text-center relative">
        <button 
          className="close-password-btn absolute top-4 right-4 bg-transparent border-none text-white/50 text-xl cursor-pointer transition-colors duration-300 hover:text-[#4fc3f7]"
          onClick={onClose}
        >
          <i className="fas fa-times"></i>
        </button>
        
        <h2 className="password-title text-2xl bg-gradient-to-r from-[#4fc3f7] to-[#9575cd] bg-clip-text text-transparent mb-3">
          🔐 Unlock Surat
        </h2>
        <p className="password-subtitle text-white/60 mb-6 text-sm">
          Surat sudah terkunci. Hanya developer yang bisa membukanya kembali
        </p>
        
        <form onSubmit={handleSubmit}>
          <input
            id="passwordInput"
            type="password"
            className={`password-input w-full px-4 py-3 bg-white/5 border-2 rounded-lg text-white text-base mb-5 transition-all duration-300 focus:outline-none focus:border-[#4fc3f7] focus:shadow-[0_0_15px_rgba(79,195,247,0.2)] ${
              error ? 'border-[#ff6b6b]' : 'border-[rgba(79,195,247,0.2)]'
            }`}
            placeholder="Ketik password developer..."
            autoComplete="off"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isSubmitting}
          />
          
          <button
            type="submit"
            className={`password-submit w-full bg-gradient-to-r from-[#2979ff] to-[#7c4dff] text-white border-none px-8 py-3 text-base rounded-lg cursor-pointer transition-all duration-300 hover:translate-y-[-3px] hover:shadow-lg ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            <i className="fas fa-unlock-alt mr-2"></i>
            {isSubmitting ? 'Memproses...' : 'Unlock Surat'}
          </button>
        </form>
        
        {error && (
          <div className="password-error text-[#ff6b6b] mt-3 text-sm animate-pulse">
            <i className="fas fa-exclamation-circle mr-2"></i>
            Password salah!
          </div>
        )}
        
        <p className="password-hint text-white/40 text-xs mt-4 italic">
          
        </p>
      </div>
    </div>
  );
}