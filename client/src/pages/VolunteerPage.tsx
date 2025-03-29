import React, { useState } from 'react';
import axios from 'axios';

const VolunteerPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    subLocation: '',
    message: '',
    privacyPolicy: false
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!formData.privacyPolicy) {
      setErrorMessage('Please agree to the privacy policy');
      return;
    }
    
    try { 
      const sendVolunteerResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/volunteer/submit`, formData);
      setSuccessMessage(sendVolunteerResponse.data.message);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        subLocation: '',
        message: '',
        privacyPolicy: false
      });
    } catch(error) {
      setErrorMessage('An error occurred, please try again later');
      console.error(error);
    }
  };

  return (
    <div className="font-['Montserrat',sans-serif] text-gray-800">
      {/* Hero section with background */}
      <div className="relative">
        <div className="relative w-full h-[300px] sm:h-[400px] bg-cover bg-center" style={{ backgroundImage: `url(https://dubaianalytica.com/wp-content/uploads/2025/03/get_involved.jpg)` }}>
          <div className="absolute bg-[#d61936] text-white text-center py-4 sm:py-8 px-4 left-0 right-0 top-[230px] sm:top-80 w-11/12 sm:w-3/5 mx-auto">
            <h2 className="text-2xl sm:text-4xl font-bold mb-2">SIGN UP TO JOIN VOLUNTEERS LIKE YOU!</h2>
            <h3 className="text-xl sm:text-2xl font-bold">HELP HON. MUGENYA RESTORE THE LOST GLORY OF SAMIA!</h3>
          </div>
        </div>
      </div>

      {/* Form section */}
      <div className="max-w-5xl mx-auto px-4 pt-24 sm:pt-32 pb-10">
        <p className="text-sm sm:text-base mb-8 mt-16 md:mt-0">
        The forgotten people of Samia are the heart and soul of our great community. The only force strong enough to revive our struggling economy, restore dignity to our schools and hospitals, and secure a better future is you, the people of this land. To reclaim what we have lost and restore the fabric of our glorious Samia, and build a thriving, self-reliant Funyula constituency, we need every farmer, every youth, every family to stand together, demand change, and make their voices heard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="FIRST NAME *"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 sm:p-3 focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="LAST NAME *"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 sm:p-3 focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="EMAIL *"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 sm:p-3 focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="PHONE *"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 sm:p-3 focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>
            <div>
              <input
                type="text"
                name="location"
                placeholder="Location *"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 sm:p-3 focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>
            <div>
              <input
                type="text"
                name="subLocation"
                placeholder="Sub Location *"
                value={formData.subLocation}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 sm:p-3 focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>
          </div>

          <div>
            <textarea
              name="message"
              placeholder="MESSAGE"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full border border-gray-300 p-2 sm:p-3 focus:outline-none focus:ring-1 focus:ring-gray-300"
            ></textarea>
          </div>

          <div>
            <label className="flex items-start space-x-2">
              <input
                type="checkbox"
                name="privacyPolicy"
                checked={formData.privacyPolicy}
                onChange={handleChange}
                required
                className="mt-1"
              />
              <span className="text-sm sm:text-base">
                By providing this information you are acknowledging and agreeing to the{' '}
                <a href="#" className="text-[#d61936] font-bold">PRIVACY POLICY</a>
              </span>
            </label>
          </div>

          <div className="flex flex-col items-start">
            <div className="border border-gray-300 p-4 rounded-md mb-4 w-full">
              <div className="flex items-center">
                <div className="h-6 w-6 border border-gray-300 flex items-center justify-center mr-2"></div>
                <span className="text-sm sm:text-base">I'm not a robot</span>
              </div>
              <div className="flex items-center mt-2 ml-8">
                <img src="https://ext.same-assets.com/17751892/916436847.png" alt="reCAPTCHA" className="h-8 w-8" />
                <div className="text-xs text-gray-500 ml-2">
                  <div>reCAPTCHA</div>
                  <div>Privacy - Terms</div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#d61936] hover:bg-[#b01529] text-white font-bold py-3 sm:py-4 flex items-center justify-center text-sm sm:text-base"
          >
            <span className="mr-2">SUBMIT</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>

        <p className="text-center text-[#d61936] font-bold text-sm sm:text-lg mt-6">
        Don't want to fill out the form? Text "Volunteer" to TEXTCODE
        </p>

        <p className="text-xs sm:text-sm text-gray-600 mt-6">
        By providing your phone number, you are consenting to receive calls and recurring SMS messages or texts, to that number from each of the participating committees in Mugenya's 2027 Committee. Msg & data rates may apply. Terms & conditions/privacy policy apply
        </p>
      </div>

      {/* Donate Section */}
      <div className="bg-[#263a66] text-white text-center py-12">
        <h2 className="text-2xl sm:text-4xl font-bold">Donate</h2>
        <div className="w-12 h-1 bg-[#d61936] mx-auto mt-4"></div>
      </div>
    </div>
  );
};

export default VolunteerPage;