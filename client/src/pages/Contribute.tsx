import  { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {VITE_BACKEND_URL} from '../utils/ipUrl'

const Contribute = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    amount: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null); // 'pending', 'success', 'failed'
  const [statusMessage, setStatusMessage] = useState('');
  const checkoutRequestIDRef = useRef(null);
  const pollingIntervalRef = useRef(null);
  const pollingTimeoutRef = useRef(null);

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

  // Poll for payment status
  const checkPaymentStatus = async (checkoutRequestID) => {
    try {
      const response = await axios.get(`${VITE_BACKEND_URL}/api/dajaria/status/${checkoutRequestID}`);
      
      if (response.data.status === 'success') {
        setPaymentStatus('success');
        setStatusMessage(response.data.msg || 'Payment successful!');
        // Stop polling and timeout
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
        }
        if (pollingTimeoutRef.current) {
          clearTimeout(pollingTimeoutRef.current);
          pollingTimeoutRef.current = null;
        }
        // Reset form
        setFormData({
          phoneNumber: '',
          amount: ''
        });
      } else if (response.data.status === 'failed') {
        setPaymentStatus('failed');
        setStatusMessage(response.data.msg || 'Payment failed');
        // Stop polling and timeout
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
        }
        if (pollingTimeoutRef.current) {
          clearTimeout(pollingTimeoutRef.current);
          pollingTimeoutRef.current = null;
        }
      }
      // If status is 'pending', continue polling
    } catch (error) {
      console.error('Error checking payment status:', error);
      // Continue polling even on error
    }
  };

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
      if (pollingTimeoutRef.current) {
        clearTimeout(pollingTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setPaymentStatus(null);
    setStatusMessage('');
    
    // Clear any existing polling
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    if (pollingTimeoutRef.current) {
      clearTimeout(pollingTimeoutRef.current);
      pollingTimeoutRef.current = null;
    }
    
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
      
      if (response.data.status && response.data.checkoutRequestID) {
        setMessage('Payment request sent! Please check your phone and enter your M-Pesa PIN.');
        setPaymentStatus('pending');
        setStatusMessage('Waiting for payment confirmation...');
        
        // Store checkoutRequestID for polling
        checkoutRequestIDRef.current = response.data.checkoutRequestID;
        
        // Start polling for payment status (check every 3 seconds)
        pollingIntervalRef.current = setInterval(() => {
          checkPaymentStatus(checkoutRequestIDRef.current);
        }, 3000);
        
        // Stop polling after 5 minutes (300 seconds)
        pollingTimeoutRef.current = setTimeout(() => {
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
          }
          if (paymentStatus === 'pending') {
            setPaymentStatus('failed');
            setStatusMessage('Payment timeout. Please try again or contact support.');
          }
        }, 300000); // 5 minutes
        
        // Also check immediately
        setTimeout(() => {
          checkPaymentStatus(checkoutRequestIDRef.current);
        }, 2000);
        
      } else {
        setMessage(`Error: ${response.data.msg || 'Failed to process contribution'}`);
        setPaymentStatus('failed');
        setStatusMessage(response.data.msg || 'Failed to initiate payment');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || error.response?.data?.message || error.message || 'An error occurred. Please try again.';
      setMessage(`Error: ${errorMsg}`);
      setPaymentStatus('failed');
      setStatusMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Make a Contribution</h2>
      
      {message && (
        <div className={`p-3 mb-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
          {message}
        </div>
      )}
      
      {paymentStatus && (
        <div className={`p-3 mb-4 rounded ${
          paymentStatus === 'success' 
            ? 'bg-green-100 text-green-700 border border-green-300' 
            : paymentStatus === 'failed'
            ? 'bg-red-100 text-red-700 border border-red-300'
            : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
        }`}>
          <div className="flex items-center">
            {paymentStatus === 'success' && (
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
            {paymentStatus === 'failed' && (
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            {paymentStatus === 'pending' && (
              <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            <span className="font-medium">{statusMessage}</span>
          </div>
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