import { useState, useEffect } from 'react';
import SpaceBackground from './components/SpaceBackground';
import DeveloperBubble from './components/DeveloperBubble';
import MoneyFlowCard from './components/MoneyFlowCard';
import ProfileSection from './components/ProfileSection';
import CardsGrid from './components/CardsGrid';
import SecretLetter from './components/SecretLetter';
import PasswordModal from './components/PasswordModal';
import LetterModal from './components/LetterModal';
import ToastNotification from './components/ToastNotification';
import useLocalStorage from './hooks/useLocalStorage';
import { CORRECT_PASSWORD, STORAGE_KEY } from './utils/constants';
import './App.css';

function App() {
  // State management
  // ✅ UBAH INI: dari false jadi true
  const [letterHasBeenOpened, setLetterHasBeenOpened] = useLocalStorage(STORAGE_KEY, true);
  const [isTemporarilyUnlocked, setIsTemporarilyUnlocked] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', duration: 3000 });
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  // Handle developer bubble click
  const handleDeveloperBubbleClick = () => {
    if (!letterHasBeenOpened && !isTemporarilyUnlocked) {
      showToast('📨 message udah dibaca. Kalo mau baca lagi, pake password', 3000);
      return;
    }

    if (isTemporarilyUnlocked) {
      showToast('🔓 Unlocked!', 3000);
      return;
    }

    setShowPasswordModal(true);
    setPasswordError(false);
    setPasswordInput('');
  };

  // Handle password submission
  const handlePasswordSubmit = async () => {
    const inputPassword = passwordInput.trim().toLowerCase();
    
    if (inputPassword === CORRECT_PASSWORD) {
      setIsTemporarilyUnlocked(true);
      setShowPasswordModal(false);
      setPasswordInput('');
      showToast('🎉 Password benar! Surat bisa dibuka', 3000);
    } else {
      setPasswordError(true);
      setTimeout(() => {
        setPasswordInput('');
        setPasswordError(false);
      }, 1000);
    }
  };

  // Handle letter button click
  const handleLetterButtonClick = () => {
    setShowLetterModal(true);
    
    // ✅ LOGIC: Kalo masih true (belum pernah dibaca di device ini)
    if (letterHasBeenOpened === true && !isTemporarilyUnlocked) {
      setLetterHasBeenOpened(false); // Langsung kunci
    }
  };

  // Handle close letter modal
  const handleCloseLetterModal = () => {
    setShowLetterModal(false);
    
    if (isTemporarilyUnlocked) {
      setIsTemporarilyUnlocked(false);
    }
  };

  // Show toast notification
  const showToast = (message, duration = 3000) => {
    setToast({ show: true, message, duration });
  };

  // Close password modal
  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordInput('');
    setPasswordError(false);
  };

  // Initialize on mount
  useEffect(() => {
    if (letterHasBeenOpened === false && !isTemporarilyUnlocked) {
      setTimeout(() => {
        showToast('🔒 Surat udah dibaca di device ini', 4000);
      }, 2000);
    }
  }, []);

  return (
    <div className="min-h-screen text-white overflow-x-hidden relative font-['Segoe_UI',system-ui,sans-serif]">
      <SpaceBackground />
      
      <DeveloperBubble 
        onClick={handleDeveloperBubbleClick}
        letterOpened={letterHasBeenOpened}
        isTemporarilyUnlocked={isTemporarilyUnlocked}
      />
      
      <MoneyFlowCard />
      
      <ToastNotification 
        show={toast.show}
        message={toast.message}
        duration={toast.duration}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />
      
      <div className="container max-w-5xl w-full mx-auto px-5 sm:px-6 relative z-10 pt-20 sm:pt-8">
        <div className="header text-center mb-6 sm:mb-12 relative mt-2 sm:mt-10">
          <div className="after:content-[''] after:absolute after:-bottom-3 sm:after:-bottom-5 after:left-1/2 after:-translate-x-1/2 after:w-32 sm:after:w-48 after:h-0.5 after:bg-gradient-to-r after:from-transparent after:via-[#4fc3f7] after:to-transparent">
            <div className="greeting text-[#80deea] text-sm sm:text-xl tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-2 sm:mb-4">
              SELAMAT & SUKSES
            </div>
            <h1 className="main-title text-3xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#4fc3f7] to-[#9575cd] bg-clip-text text-transparent mb-2 sm:mb-3 drop-shadow-lg px-2">
              SEMINAR HASIL
            </h1>
            <p className="subtitle text-sm sm:text-lg text-white/70 max-w-2xl mx-auto px-4">
              anjay finally penantian jurnalmu yang panjang itu selesai juga ya :D
            </p>
          </div>
        </div>
        
        <div className="mb-6 sm:mb-12">
          <ProfileSection />
        </div>
        
        <div className="mb-6 sm:mb-12">
          <CardsGrid />
        </div>
        
        <SecretLetter 
          letterHasBeenOpened={letterHasBeenOpened}
          isTemporarilyUnlocked={isTemporarilyUnlocked}
          onClick={handleLetterButtonClick}
        />
      </div>
      
      <PasswordModal 
        isOpen={showPasswordModal}
        onClose={handleClosePasswordModal}
        passwordInput={passwordInput}
        setPasswordInput={setPasswordInput}
        onSubmit={handlePasswordSubmit}
        error={passwordError}
      />
      
      <LetterModal 
        isOpen={showLetterModal}
        onClose={handleCloseLetterModal}
      />
      
      <style jsx>{`
        @media (max-width: 640px) {
          .container {
            padding-top: 70px !important;
          }
          .header {
            margin-bottom: 24px !important;
          }
          .greeting, .main-title, .subtitle {
            position: relative;
            z-index: 5;
          }
          .profile-section {
            margin-bottom: 24px !important;
          }
          .cards-grid {
            margin-bottom: 24px !important;
          }
          .mt-10 {
            margin-top: 8px !important;
          }
          @media (max-width: 375px) {
            .main-title {
              font-size: 1.8rem !important;
            }
            .greeting {
              font-size: 0.7rem !important;
            }
          }
        }
      `}</style>
    </div>
  );
}

export default App;