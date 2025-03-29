import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const credentials = {
    apiKey: 'YOUR_API_KEY',         // use your sandbox app API key for development in the test environment
    username: 'YOUR_USERNAME',      // use 'sandbox' for development in the test environment
};
import africastalking from 'africastalking';
const AfricasTalking = africastalking(credentials);
const sms = AfricasTalking.SMS;




export const phoneVerification = async (req, res) => {
    const { fullName, location, subLocation, phoneNumber } = req.body;
    try{

        const checkVolunteer = await prisma.user.findUnique({
            where: {
                phone: phoneNumber
            }
        });
        if (checkVolunteer) {
            return res.status(400).json({ message: 'You have already verified.' });
        }
        const generateCode = Math.floor(1000 + Math.random() * 9000);
        // Create a new volunteer
        const volunteer = await prisma.user.create({
            data: {
                fullName,
                location,
                subLocation,
                phone: phoneNumber,
                verificationCode: generateCode,
                isVerified: false,
            }
        });

        const sendVerificationSMS = await sms.send({
            to: phoneNumber,
            message: `Your verification code is ${generateCode}`, // Replace with actual verification code
            from: '' // Replace with your shortcode 
        });

        res.status(200).json({ message: 'Phone verification endpoint hit successfully' });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const volunteerGetPdf = async (req, res, next) => {
    const { fullName, location, subLocation, phoneNumber } = req.body;

    try {
        // Check if the user already exists
        const checkVolunteer = await prisma.user.findUnique({
            where: {
                phone: phoneNumber
            }
        });
        if (checkVolunteer) {
            return res.status(400).json({ message: 'You have already verified.' });
        }
        // Create a new volunteer
        const generateCode = Math.floor(1000 + Math.random() * 9000);
        const volunteer = await prisma.user.create({
            data: {
                fullName,
                location,
                subLocation,
                phone: phoneNumber,
                verificationCode: generateCode,
                isVerified: false,
            }
        });

        // Redirect to a success page (Change URL as needed)
        return res.status(200).json({ message: 'PDF generated successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};