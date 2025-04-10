import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  RecaptchaVerifier, 
  signInWithPhoneNumber,
  PhoneAuthProvider
} from 'firebase/auth';

// Your Firebase configuration
// Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to set up reCAPTCHA verifier
export const setupRecaptcha = (elementId: string) => {
  // Clear any existing reCAPTCHA
  const existingRecaptcha = document.getElementById(elementId);
  if (existingRecaptcha) {
    existingRecaptcha.innerHTML = '';
  }
  
  // Create a new reCAPTCHA verifier
  return new RecaptchaVerifier(auth, elementId, {
    size: 'normal', // Change from 'invisible' to 'normal' for better visibility
    callback: (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      console.log('reCAPTCHA verified');
    },
    'expired-callback': () => {
      // Reset reCAPTCHA when expired
      console.log('reCAPTCHA expired');
    }
  });
};

// Function to send verification code
export const sendVerificationCode = async (phoneNumber: string, recaptchaVerifier: RecaptchaVerifier) => {
  try {
    // Render the reCAPTCHA widget
    await recaptchaVerifier.render();
    
    // Send the verification code
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    return confirmationResult;
  } catch (error) {
    console.error('Error sending verification code:', error);
    throw error;
  }
};

// Function to verify the code
export const verifyCode = async (confirmationResult: any, code: string) => {
  try {
    const result = await confirmationResult.confirm(code);
    return result;
  } catch (error) {
    console.error('Error verifying code:', error);
    throw error;
  }
};

export { auth }; 