import { PrismaClient } from '@prisma/client'
import axios from "axios";
import moment from "moment";
const prisma = new PrismaClient();

// Helper function to normalize phone number (remove + prefix, ensure string format)
function normalizePhoneNumber(phoneNumber) {
  if (!phoneNumber) return phoneNumber;
  return String(phoneNumber).replace(/^\+/, '');
}

// Environment configuration
const isProduction = process.env.NODE_ENV === 'production' || process.env.MPESA_ENV === 'production';
const baseUrl = isProduction 
  ? "https://api.safaricom.co.ke" 
  : "https://sandbox.safaricom.co.ke";

// Sandbox credentials (for testing)
const SANDBOX_CONFIG = {
  consumer_key: process.env.MPESA_CONSUMER_KEY || "",
  consumer_secret: process.env.MPESA_CONSUMER_SECRET || "",
  businessShortCode: process.env.MPESA_SHORTCODE || "", // Sandbox test Till number
  passKey: process.env.MPESA_PASSKEY || "", // Sandbox passkey
};

// Production credentials (set these in .env file)
const PRODUCTION_CONFIG = {
  consumer_key: process.env.MPESA_PRODUCTION_CONSUMER_KEY || "",
  consumer_secret: process.env.MPESA_PRODUCTION_CONSUMER_SECRET || "",
  businessShortCode: process.env.MPESA_PRODUCTION_SHORTCODE || "4006467", // Your PayBill number
  passKey: process.env.MPESA_PRODUCTION_PASSKEY || "", // Get from Daraja portal
};

const config = isProduction ? PRODUCTION_CONFIG : SANDBOX_CONFIG;

async function getAccessToken() {
  console.log(config, 'config');
  console.log(baseUrl, 'baseUrl');
  
  
    const url = `${baseUrl}/oauth/v1/generate?grant_type=client_credentials`;
  
    const auth =
      "Basic " +
      new Buffer.from(config.consumer_key + ":" + config.consumer_secret).toString("base64");
  
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: auth,
        },
      });
      const accessToken = response.data.access_token;
      return accessToken;
    } catch (error) {
      throw error;
    }
  }

export const stkpush = async(req,res)=>{
    const {accountNumber, phoneNumber, amount} = req.body;
    
    // Validate required fields
    if (!phoneNumber || !amount) {
      return res.status(400).json({
        msg: "Missing required fields: phoneNumber and amount are required",
        status: false,
      });
    }

    // Validate production credentials if in production mode
    if (isProduction && (!config.consumer_key || !config.consumer_secret || !config.passKey)) {
      return res.status(500).json({
        msg: "Production credentials not configured. Please set MPESA_PRODUCTION_CONSUMER_KEY, MPESA_PRODUCTION_CONSUMER_SECRET, and MPESA_PRODUCTION_PASSKEY in .env file",
        status: false,
      });
    }

    const businessShortCode = config.businessShortCode;
    const passKey = config.passKey;
    
    getAccessToken()
    .then((accessToken) => {
      const url = `${baseUrl}/mpesa/stkpush/v1/processrequest`;
      const auth = "Bearer " + accessToken;
      const timestamp = moment().format("YYYYMMDDHHmmss");
      const password = new Buffer.from(
        businessShortCode +
        passKey +
        timestamp
      ).toString("base64");

      console.log(password);
      

      const normalizedPhone = normalizePhoneNumber(phoneNumber);
      
      axios
        .post(
          url,
          {
            BusinessShortCode: businessShortCode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: amount,
            PartyA: normalizedPhone,
            PartyB: businessShortCode,
            PhoneNumber: normalizedPhone,
            CallBackURL: "https://249e-105-60-226-239.ngrok-free.app/api/callback",
            AccountReference: accountNumber || "DEFAULT_REF",
            TransactionDesc: "Mpesa Daraja API stk push test",
          },
          {
            headers: {
              Authorization: auth,
            },
          }
        )
        .then((response) => {
          // res.send("😀 Request is successful done ✔✔. Please enter mpesa pin to complete the transaction");
          //SEND BACK A JSON RESPONSE TO THE CLIENT
          console.log(response.data);
          res.status(200).json({
            msg: "Request is successful done ✔✔. Please enter mpesa pin to complete the transaction",
            status: true,
          });

        })
        .catch((error) => {
          console.log(error,'final');
          const errorMessage = error.response?.data?.errorMessage || error.response?.data?.error_description || error.message || "Request failed";
          console.log('STK Push Error:', errorMessage);
          res.status(error.response?.status || 500).json({
            msg: errorMessage,
            status: false,
            error: error.response?.data || error.message,
          });
        });
    })
    .catch((error) => {
      console.log('Access Token Error:', error);
      const errorMessage = error.response?.data?.error_description || error.message || "Failed to get access token";
      res.status(error.response?.status || 500).json({
        msg: errorMessage,
        status: false,
        error: error.response?.data || error.message,
      });
    });
}