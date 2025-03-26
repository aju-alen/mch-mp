import { useState, useEffect } from 'react';

const MerchPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Store in session storage to prevent showing again
    sessionStorage.setItem('popup_closed', 'true');
  };

  // Don't show if already closed in this session
  if (!isOpen || sessionStorage.getItem('popup_closed') === 'true') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white p-0 max-w-md mx-auto rounded-sm relative shadow-xl">
        <button
          className="absolute top-1 right-1 text-gray-700 hover:text-trump-light-accent z-10"
          onClick={handleClose}
          aria-label="Close popup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center">
          <img
            src="https://ext.same-assets.com/1716151995/550139104.png"
            alt="Trump Merchandise"
            className="w-full h-auto"
          />

          <div className="p-4 pb-5">
            <a
              href="https://secure.winred.com/trump-national-committee-jfc/storefront/"
              className="inline-block bg-trump-light-accent text-white py-3 px-8 font-medium uppercase hover:bg-trump-light-accent/90 transition-colors text-sm tracking-wider"
              target="_blank"
              rel="noopener noreferrer"
            >
              SHOP NOW
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchPopup;
