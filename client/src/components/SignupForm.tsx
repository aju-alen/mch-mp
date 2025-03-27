import { useState } from 'react';
import axios from 'axios';

interface SignupFormProps {
  variant?: 'default' | 'footer';
}

const SignupForm = ({ variant = 'default' }: SignupFormProps) => {
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [subLocation, setSubLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { fullName, location, subLocation, phoneNumber });
    setFullName('');
    setLocation('');
    setSubLocation('');
    setPhoneNumber('');

    // const verifyPhoneNumber = axios.get() 
  };

  if (variant === 'footer') {
    return (
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Enter Your Full Name"
          className="w-full px-3 py-2 text-trump-light-navy focus:outline-none border border-gray-200 rounded"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          className="w-full px-3 py-2 text-trump-light-navy focus:outline-none border border-gray-200 rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Sub Location"
          className="w-full px-3 py-2 text-trump-light-navy focus:outline-none border border-gray-200 rounded"
          value={subLocation}
          onChange={(e) => setSubLocation(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full px-3 py-2 text-trump-light-navy focus:outline-none border border-gray-200 rounded"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <button
          type="submit"
          className="sm:col-span-2 w-full bg-trump-light-accent text-white py-2 px-4 transition-colors hover:bg-trump-light-accent/90 flex items-center justify-center gap-2 rounded"
          aria-label="Download your copy"
        >
          DOWNLOAD YOUR COPY
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
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
    );
  }

  return (
    <section 
      id="join-movement" 
      className="bg-white shadow-2xl border border-gray-200 rounded-sm w-full md:w-2/3 lg:w-1/2 xl:w-2/5 mx-auto md:mx-12  relative z-10 overflow-hidden"
    >
      <div className="bg-trump-light-accent py-4 md:py-6">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black text-white text-center mb-2">
            DOWNLOAD THE FUNYULA 2027 
          </h2>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center mb-2">
           AND BEYOND MANIFESTO
          </h2>
        </div>
      </div>

      <div className="container mx-auto p-4 md:p-8">
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Enter Your Full Name"
            className="w-full px-4 py-3 text-trump-light-navy bg-gray-50 focus:outline-none border border-gray-200 rounded-lg focus:border-trump-light-accent focus:ring-2 focus:ring-trump-light-accent/20 transition-all"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full px-4 py-3 text-trump-light-navy bg-gray-50 focus:outline-none border border-gray-200 rounded-lg focus:border-trump-light-accent focus:ring-2 focus:ring-trump-light-accent/20 transition-all"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Sub Location"
            className="w-full px-4 py-3 text-trump-light-navy bg-gray-50 focus:outline-none border border-gray-200 rounded-lg focus:border-trump-light-accent focus:ring-2 focus:ring-trump-light-accent/20 transition-all"
            value={subLocation}
            onChange={(e) => setSubLocation(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full px-4 py-3 text-trump-light-navy bg-gray-50 focus:outline-none border border-gray-200 rounded-lg focus:border-trump-light-accent focus:ring-2 focus:ring-trump-light-accent/20 transition-all"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-trump-light-accent text-white py-3.5 px-6 rounded-lg transition-all hover:bg-trump-light-accent/90 hover:shadow-lg active:transform active:scale-[0.98] flex items-center justify-center gap-4 font-semibold text-base sm:text-lg"
            aria-label="Download your copy"
          >
            DOWNLOAD YOUR COPY
          </button>
        </form>
      </div>

      {/* Subtle shadow effect */}
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-b from-transparent to-gray-100/50"></div>
    </section>
  );
};

export default SignupForm;