import { useState, useEffect } from 'react';

export default function SecretLetter({ 
  letterHasBeenOpened, 
  isTemporarilyUnlocked, 
  onClick 
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [btnText, setBtnText] = useState('Cek Message dari Developer');
  const [noticeText, setNoticeText] = useState('---');
  const [noticeColor, setNoticeColor] = useState('text-[#4fc3f7]');

  useEffect(() => {
    // Optional: kalau masih mau dynamic text tergantung kondisi
    if (isTemporarilyUnlocked) {
      setBtnText('Cek Message dari Developer');
      setNoticeText('✨ Lagi di-unlock sama developer');
      setNoticeColor('text-[#4fc3f7]');
    } else if (letterHasBeenOpened) {
      setBtnText('Buka Message');
      setNoticeText('Set Unlocked');
      setNoticeColor('text-white/60');
    } else {
      setBtnText('Cek Message dari Developer');
      setNoticeText('Set Unlocked');
      setNoticeColor('text-[#4fc3f7]');
    }
  }, [letterHasBeenOpened, isTemporarilyUnlocked]);

  return (
    <div className="letter-section text-center mt-10">
      <button
        className="letter-btn relative bg-gradient-to-r from-[#2979ff] to-[#7c4dff] text-white border-none px-11 py-4 text-lg rounded-full cursor-pointer inline-flex items-center gap-4 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden shadow-lg hover:scale-110 hover:shadow-xl"
        onClick={onClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {isHovering && (
          <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></span>
        )}
        <i className="fas fa-envelope"></i>
        <span className="font-medium">{btnText}</span>
      </button>
      
      <div className={`status-notice text-sm mt-5 italic flex items-center justify-center gap-2 transition-colors duration-300 ${noticeColor}`}>
        <i className="fas fa-info-circle"></i>
        <span>{noticeText}</span>
      </div>
    </div>
  );
}
