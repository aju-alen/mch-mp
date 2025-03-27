import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, UserPlusIcon } from 'lucide-react';

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
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-cover bg-center bg-no-repeat" 
           style={{backgroundImage: 'url(https://i.postimg.cc/KY204G4P/get-involved.jpg)'}}>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase">
              Join Our Movement
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Help Hon. Mugenya Restore the Lost Glory of Samia
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto  py-12">
        {/* Inspirational Text */}
        <div className="bg-trump-red  text-white   text-center w-5/6 md:w-5/5 mx-auto z-20">
        <h4 className=" text-sm md:text-2xl font-bold">SIGN UP TO JOIN VOLUNTEERS LIKE YOU!</h4>
        <h4 className="text-sm md:text-3xl
          px-4
          font-bold 
          mt-4
          ">
       HELP HON. MUGENYA RESTORE THE LOST GLORY OF SAMIA!
        </h4>
      </div>

        {/* Volunteer Form */}
        <div className="bg-white shadow-xl rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Contact Inputs */}
            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d61936]/50 focus:outline-none"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d61936]/50 focus:outline-none"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d61936]/50 focus:outline-none"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Location Inputs */}
            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d61936]/50 focus:outline-none"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d61936]/50 focus:outline-none"
                value={formData.location}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="subLocation"
                placeholder="Sub Location"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d61936]/50 focus:outline-none"
                value={formData.subLocation}
                onChange={handleChange}
                required
              />
            </div>

            {/* Message Textarea */}
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d61936]/50 focus:outline-none"
              value={formData.message}
              onChange={handleChange}
            ></textarea>

            {/* Privacy Policy Checkbox */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="privacyPolicy"
                name="privacyPolicy"
                className="mt-1 text-[#d61936] focus:ring-[#d61936] rounded"
                onChange={handleChange}
                required
              />
              <label htmlFor="privacyPolicy" className="text-sm text-gray-600">
                I acknowledge and agree to the <span className="text-[#d61936] font-semibold">Privacy Policy</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#d61936] text-white py-4 rounded-md hover:bg-[#b3142b] transition-colors duration-300 flex justify-center items-center space-x-2"
            >
              <UserPlusIcon className="mr-2" />
              Submit Volunteer Application
              <ChevronRightIcon />
            </button>

            {/* Message Handling */}
            {successMessage && (
              <p className="text-green-600 text-center mt-4">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-red-600 text-center mt-4">{errorMessage}</p>
            )}
          </form>
        </div>

        {/* Alternative Volunteer Options */}
        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-4">
            Don't want to fill out the form? Text "Volunteer" to TEXTCODE
          </p>
          <p className="text-xs text-gray-500">
            By providing your contact information, you consent to receive communication from Mugenya's 2027 Committee. Msg & data rates may apply.
          </p>
        </div>
      </div>

      {/* Donate Section */}
      <div className="bg-[#263a66] py-16">
        <Link 
          to="/donate" 
          className="block text-center hover:opacity-90 transition-opacity"
        >
          <h2 className="text-4xl text-white font-bold mb-4">Donate</h2>
          <div className="w-24 h-1 bg-[#d61936] mx-auto"></div>
        </Link>
      </div>
    </div>
  );
};

export default VolunteerPage;