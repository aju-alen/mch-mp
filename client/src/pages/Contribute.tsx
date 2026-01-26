import  { useState } from 'react';
import axios from 'axios';
import {VITE_BACKEND_URL} from '../utils/ipUrl'

const Contribute = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    amount: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Function to format phone number from 0724731006 to 254724731006
  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';
    
    // Remove all non-digit characters
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    
    // If starts with 0, replace with 254
    if (digitsOnly.startsWith('0')) {
      return '254' + digitsOnly.substring(1);
    }
    
    // If starts with 254, return as is
    if (digitsOnly.startsWith('254')) {
      return digitsOnly;
    }
    
    // If it's 9 digits (without country code), add 254
    if (digitsOnly.length === 9) {
      return '254' + digitsOnly;
    }
    
    // Return as is if already formatted
    return digitsOnly;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format phone number on change
    if (name === 'phoneNumber') {
      const formatted = formatPhoneNumber(value);
      setFormData({
        ...formData,
        [name]: formatted
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    // Ensure phone number is properly formatted before submission
    const formattedPhone = formatPhoneNumber(formData.phoneNumber);
    
    // Validate phone number format (should be 12 digits starting with 254)
    if (formattedPhone.length !== 12 || !formattedPhone.startsWith('254')) {
      setMessage('Error: Please enter a valid phone number (e.g., 072xxxxxxx or 25472xxxxxxx)');
      setLoading(false);
      return;
    }
    
    try {
      const payload = {
        phoneNumber: formattedPhone,
        amount: formData.amount
      };
      
      const response = await axios.post(`${VITE_BACKEND_URL}/api/dajaria/stkpush`, payload);
      
      if (response.data.status) {
        setMessage(response.data.msg || 'Contribution submitted successfully! Please check your phone to complete the payment.');
      } else {
        setMessage(`Error: ${response.data.msg || 'Failed to process contribution'}`);
      }
      
      // Reset form after successful submission
      if (response.data.status) {
        setFormData({
          phoneNumber: '',
          amount: ''
        });
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || error.response?.data?.message || error.message || 'An error occurred. Please try again.';
      setMessage(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Make a Contribution</h2>
      
      {message && (
        <div className={`p-3 mb-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block mb-1 font-medium">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="072xxxxxxx"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Format: 072xxxxxxx or 25472xxxxxxx
          </p>
        </div>
        
        <div className="mb-6">
          <label htmlFor="amount" className="block mb-1 font-medium">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Submit Contribution'}
        </button>
      </form>
    </div>
  );
};

export default Contribute;