import { useEffect, useState } from 'react';

export default function SecretLetter({ 
  letterHasBeenOpened, 
  isTemporarilyUnlocked, 
  onClick 
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [btnText, setBtnText] = useState('Buka Surat Rahasia');
  const [noticeText, setNoticeText] = useState('🔐 Surat hanya bisa dibuka sekali');
  const [noticeColor, setNoticeColor] = useState('text-white/60');

  useEffect(() => {
    if (letterHasBeenOpened && !isTemporarilyUnlocked) {
      setBtnText('Surat Sudah Dibaca');
      setNoticeText('🔒 Ko udah liat, cm blh sekali.');
      setNoticeColor('text-[#ff6b6b]');
    } else if (isTemporarilyUnlocked) {
      setBtnText('Cek Message dari Developer');
      setNoticeText('✨ Baca message y');
      setNoticeColor('text-[#4fc3f7]');
    } else {
      setBtnText('Cek Message dari Developer');
      setNoticeText('🔐 Surat hanya bisa dibuka sekali');
      setNoticeColor('text-white/60');
    }
  }, [letterHasBeenOpened, isTemporarilyUnlocked]);

  const isLocked = letterHasBeenOpened && !isTemporarilyUnlocked;

  return (
    <div className="letter-section text-center mt-10">
      <button
        className={`letter-btn relative bg-gradient-to-r from-[#2979ff] to-[#7c4dff] text-white border-none px-11 py-4 text-lg rounded-full cursor-pointer inline-flex items-center gap-4 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden shadow-lg ${
          isLocked 
            ? 'bg-gradient-to-r from-gray-600 to-gray-400 cursor-not-allowed' 
            : 'hover:scale-110 hover:shadow-xl'
        }`}
        onClick={isLocked ? undefined : onClick}
        disabled={isLocked}
        onMouseEnter={() => !isLocked && setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {isHovering && !isLocked && (
          <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></span>
        )}
        <i className={`fas ${isLocked ? 'fa-lock' : 'fa-envelope'}`}></i>
        <span className="font-medium">{btnText}</span>
      </button>
      
      <div className={`status-notice text-sm mt-5 italic flex items-center justify-center gap-2 transition-colors duration-300 ${noticeColor}`}>
        <i className="fas fa-info-circle"></i>
        <span>{noticeText}</span>
      </div>
    </div>
  );
}