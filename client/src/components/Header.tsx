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
      <div className="bg-trump-maingreen text-white text-center py-3 text-sm font-bold">
        <a href="sms://88022;?&body=%20TRUMP" className="hover:underline">
          TEXT MUGENYA TO 88022!
        </a>
        <a href="#main" className="sr-only">Skip to main content</a>
      </div>

      <header className="bg-white border-b-4 border-trump-maingreen sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  src="https://funyula.com/wp-content/uploads/2025/03/logo.png"
                  alt="Trump Logo"
                  className="h-10 md:h-24"
                />
              </Link>
              
            </div>

            <div className="flex items-center">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-6 mr-4">
                <Link to="/news" className="nav-link text-sm">NEWS</Link>
                <Link to="/platform" className="nav-link text-sm">VISION</Link>
                <Link to="/upcoming-projects" className="nav-link text-sm">UPCOMING PROJECTS</Link>
                <Link to="/gallery" className="nav-link text-sm">GALLERY</Link>
                <Link to="/get-involved" className="nav-link text-sm">GET INVOLVED </Link>
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
              <Link to="/news" className="nav-link">NEWS</Link>
              <Link to="/platform" className="nav-link">VISION</Link>
              <Link to="/upcoming-projects" className="nav-link">UPCOMING PROJECTS</Link>
              <Link to="/gallery" className="nav-link">GALLERY</Link>
              <Link to="/get-involved" className="nav-link">GET INVOLVED</Link>



             
              <a
                href="https://secure.winred.com/trump-national-committee-jfc/lp-website-contribute-button-victory"
                className="text-trump-light-accent font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                SUPPORT THE CAUSE
              </a>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
