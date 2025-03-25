import { useState } from 'react';

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
    <footer className="bg-trump-light-primary text-trump-light-navy pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="mb-14">
          <h3 className="text-lg font-bold mb-4">Join Our Movement</h3>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-2 max-w-md"
          >
            <input
              type="email"
              placeholder="ENTER YOUR EMAIL"
              className="px-4 py-3 text-trump-light-navy flex-1 focus:outline-none border border-gray-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="ZIP"
              className="w-full md:w-24 px-4 py-3 text-trump-light-navy focus:outline-none border border-gray-200"
              value={zip}
              pattern="[0-9]{5}"
              onChange={(e) => setZip(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-trump-light-accent text-white py-3 px-4 transition-colors hover:bg-trump-light-accent/90"
              aria-label="Submit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </form>
        </div>

        <div className="text-xs text-gray-600 border-t border-gray-200 pt-6">
          <p className="mb-3">
            Paid for by Never Surrender, Inc. and not authorized by any candidate or candidate's committee.
          </p>
          <p className="mb-6">
            The appearance of U.S. Department of Defense personnel or other visual information does not imply or constitute DoD endorsement.
          </p>
          <div className="flex flex-wrap gap-4 text-gray-600 justify-between items-center">
            <div className="flex flex-wrap gap-4">
              <a href="/privacy-policy" className="hover:text-trump-light-accent transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-trump-light-accent transition-colors">Terms & Conditions</a>
              <a href="/press" className="hover:text-trump-light-accent transition-colors">Press</a>
              <a href="/careers" className="hover:text-trump-light-accent transition-colors">Careers</a>
            </div>
            <div>
              <span className="text-gray-500">Powered by Nucleus</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
