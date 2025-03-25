import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Text message banner */}
      <div className="bg-trump-mainblue text-white text-center py-3 text-sm font-bold">
        <a href="sms://88022;?&body=%20TRUMP" className="hover:underline">
          TEXT MICHAEL TO 88022!
        </a>
        <a href="#main" className="sr-only">Skip to main content</a>
      </div>

      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              {/* <Link to="/">
                <img
                  src="https://ext.same-assets.com/697774200/2762527609.png"
                  alt="Trump Logo"
                  className="h-10 md:h-12"
                />
              </Link> */}
              LOGO
            </div>

            <div className="flex items-center">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-6 mr-4">
                <Link to="/platform" className="nav-link text-sm">NEWS</Link>
                <Link to="/news" className="nav-link text-sm">VISION</Link>
                <Link to="/events" className="nav-link text-sm">UPCOMING PROJECTS</Link>
                <Link to="/join" className="nav-link text-sm">GALLERY</Link>
                <Link to="/join" className="nav-link text-sm">GET INVOLVED </Link>
              </nav>

              {/* Action Buttons */}
              <div className="hidden md:flex items-center">
                <a
                  href="https://secure.winred.com/trump-national-committee-jfc/lp-website-contribute-button-victory"
                  className="btn-contribute mr-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                SUPPORT THE CAUSE
                </a>
                {/* <a
                  href="https://secure.winred.com/trump-national-committee-jfc/storefront/"
                  className="btn-shop"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Shop
                </a> */}
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <button
                  type="button"
                  className="text-trump-light-navy p-2"
                  onClick={toggleMobileMenu}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4 flex flex-col space-y-4">
              <Link to="/platform" className="nav-link">PLATFORM</Link>
              <Link to="/news" className="nav-link">NEWS</Link>
              <Link to="/events" className="nav-link">EVENTS</Link>
              <Link to="/join" className="nav-link">GET INVOLVED</Link>
              <a
                href="https://secure.winred.com/trump-national-committee-jfc/lp-website-contribute-button-victory"
                className="text-trump-light-accent font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                CONTRIBUTE
              </a>
              <a
                href="https://secure.winred.com/trump-national-committee-jfc/storefront/"
                className="text-trump-light-blue font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                SHOP
              </a>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
