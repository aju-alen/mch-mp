import { useState } from 'react';
import SignupForm from './SignupForm';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would submit to an API
    console.log('Form submitted:', { email, zip });
    // Reset form
    setEmail('');
    setZip('');
    // Show success message (would be implemented with state in a real app)
    alert('Thank you for joining our movement!');
  };

  return (
    <footer className="bg-trump-maingreen text-trump-light-navy pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="mb-14">
          <h3 className="text-lg font-bold mb-4">DOWNLOAD THE FUNYULA 2027
          AND BEYOND MANIFESTO</h3>
          <SignupForm variant="footer" />
        </div>

        <div className="text-xs text-white border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left px-4 sm:px-8 lg:px-16">
  {/* Left Section */}
  <div className="flex flex-col gap-2 max-w-md">
    {/* <p className="mb-3">
      Paid for by Never Surrender, Inc. and not authorized by any candidate or candidate's committee.
    </p>
    <p className="mb-6">
      The appearance of U.S. Department of Defense personnel or other visual information does not imply or constitute DoD endorsement.
    </p> */}
  </div>

  {/* Footer Nav Bar */}
  <div className="flex flex-col sm:flex-row flex-wrap gap-4 text-white justify-center sm:justify-end items-center">
    <Link to="/news" className="hover:text-trump-light-accent transition-colors">PRIVACY POLICY</Link>
    <Link to="/platform" className="hover:text-trump-light-accent transition-colors">TERMS & CONDITION</Link>
    <Link to="/upcoming-projects" className="hover:text-trump-light-accent transition-colors">UPCOMING PROJECTS</Link>
    <Link to="/gallery" className="hover:text-trump-light-accent transition-colors">GALLERY</Link>
    <Link to="/get-involved" className="hover:text-trump-light-accent transition-colors">GET INVOLVED</Link>
  </div>
</div>

      </div>
    </footer>
  );
};

export default Footer;
