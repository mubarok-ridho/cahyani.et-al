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
  const [letterHasBeenOpened, setLetterHasBeenOpened] = useLocalStorage(STORAGE_KEY, false);
  const [isTemporarilyUnlocked, setIsTemporarilyUnlocked] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', duration: 3000 });
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  // Handle developer bubble click
  const handleDeveloperBubbleClick = () => {
    if (!letterHasBeenOpened) {
      showToast('📨 message blm diliat. Klik tombol di bwh noh', 3000);
      return;
    }

    if (isTemporarilyUnlocked) {
      showToast('🔓 Unlocked!"', 3000);
      return;
    }

    setShowPasswordModal(true);
    setPasswordError(false);
    setPasswordInput('');
  };

  // Handle password submission
  const handlePasswordSubmit = async () => {
    const inputPassword = passwordInput.trim().toLowerCase();
    
    // Note: In production, this should be handled securely on the backend
    if (inputPassword === CORRECT_PASSWORD) {
      // Password correct
      setIsTemporarilyUnlocked(true);
      setShowPasswordModal(false);
      setPasswordInput('');
      
      showToast('🎉 Password benar! Surat sekarang bisa dibuka', 3000);
    } else {
      // Password wrong
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
    
    if (!letterHasBeenOpened) {
      setLetterHasBeenOpened(true);
    }
  };

  // Handle close letter modal
  const handleCloseLetterModal = () => {
    setShowLetterModal(false);
    
    if (isTemporarilyUnlocked) {
      setIsTemporarilyUnlocked(false);
    }
    
    if (letterHasBeenOpened && !isTemporarilyUnlocked) {
      showToast('🔒 Surat sudah dibaca. Klik bubble di kanan atas dan masukkan password "buatevril" untuk unlock surat.', 4000);
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
    // Show hint if letter has been opened but not temporarily unlocked
    if (letterHasBeenOpened && !isTemporarilyUnlocked) {
      setTimeout(() => {
        showToast('🔑 locked', 5000);
      }, 2000);
    }
  }, []);

  return (
    <div className="min-h-screen text-white overflow-x-hidden relative font-['Segoe_UI',system-ui,sans-serif]">
      {/* Space Background */}
      <SpaceBackground />
      
      {/* Developer Bubble */}
      <DeveloperBubble 
        onClick={handleDeveloperBubbleClick}
        letterOpened={letterHasBeenOpened}
        isTemporarilyUnlocked={isTemporarilyUnlocked}
      />
      
      {/* Money Flow Card */}
      <MoneyFlowCard />
      
      {/* Toast Notification */}
      <ToastNotification 
        show={toast.show}
        message={toast.message}
        duration={toast.duration}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />
      
      {/* Main Container */}
      <div className="container max-w-5xl w-full mx-auto py-8 px-5 sm:px-6 relative z-10">
        {/* Header */}
        <div className="header text-center mb-12 relative mt-10">
          <div className="after:content-[''] after:absolute after:-bottom-5 after:left-1/2 after:-translate-x-1/2 after:w-48 after:h-0.5 after:bg-gradient-to-r after:from-transparent after:via-[#4fc3f7] after:to-transparent">
            <div className="greeting text-[#80deea] text-xl tracking-[0.3em] uppercase mb-4">
              SELAMAT & SUKSES
            </div>
            <h1 className="main-title text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#4fc3f7] to-[#9575cd] bg-clip-text text-transparent mb-3 drop-shadow-lg">
              SEMINAR HASIL
            </h1>
            <p className="subtitle text-lg text-white/70 max-w-2xl mx-auto">
              anjay finally penantian jurnalmu yang panjang itu selesai juga ya :D
            </p>
          </div>
        </div>
        
        {/* Profile Section */}
        <ProfileSection />
        
        {/* Cards Grid */}
        <CardsGrid />
        
        {/* Secret Letter Section */}
        <SecretLetter 
          letterHasBeenOpened={letterHasBeenOpened}
          isTemporarilyUnlocked={isTemporarilyUnlocked}
          onClick={handleLetterButtonClick}
        />
      </div>
      
      {/* Password Modal */}
      <PasswordModal 
        isOpen={showPasswordModal}
        onClose={handleClosePasswordModal}
        passwordInput={passwordInput}
        setPasswordInput={setPasswordInput}
        onSubmit={handlePasswordSubmit}
        error={passwordError}
      />
      
      {/* Letter Modal */}
      <LetterModal 
        isOpen={showLetterModal}
        onClose={handleCloseLetterModal}
      />
    </div>
  );
}

export default App;