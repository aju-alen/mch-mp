import { PrismaClient } from '@prisma/client'
import axios from "axios";
import moment from "moment";
const prisma = new PrismaClient();

async function getAccessToken() {
    const consumer_key = "uJQCrh8m5ICcvWiyAJDM41QAf7YEkgMye3I3d0u9UbIPmgbq"; // REPLACE IT WITH YOUR CONSUMER KEY
    const consumer_secret = "YKvXNW2Rs5gP8vDRxEDGJMM4NIjO3movvVMfHzS9JEJhRct27dIkbkkdyZLF7oBq"; // REPLACE IT WITH YOUR CONSUMER SECRET
    const url =
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  
    const auth =
      "Basic " +
      new Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");
  
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
    getAccessToken()
    .then((accessToken) => {
      const url =
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
      const auth = "Bearer " + accessToken;
      const timestamp = moment().format("YYYYMMDDHHmmss");
      const password = new Buffer.from(
        "174379" +
        "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" +
        timestamp
      ).toString("base64");

      console.log(password);
      

      axios
        .post(
          url,
          {
            BusinessShortCode: "174379",
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: amount,
            PartyA: Number(phoneNumber),
            PartyB: "174379",
            PhoneNumber: Number(phoneNumber),
            CallBackURL: "https://249e-105-60-226-239.ngrok-free.app/api/callback",
            AccountReference: Number(accountNumber),
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
          //res.status(500).send("❌ Request failed");
          console.log(error);
          res.status(500).json({
            msg: "Request failed",
            status: false,
          });
        });
    })
    .catch(console.log);
}