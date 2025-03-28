import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const volunteerSubmitForm = async (req, res, next) => {
    try {
        const { firstName, lastName, email, phone, location, subLocation, message, privacyPolicy } = req.body;
        const newVolunteer = await prisma.userVolunteer.create({
            data: {
                firstName,
                lastName,
                email,
                phone,
                location,
                subLocation,
                message,
                privacyPolicy
            }
        });

        res.status(200).json({ message: 'Volunteer form submitted successfully' });
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Internal server error' });
    }
}

export const volunteerGetPdf = async (req, res, next) => {
    const { fullName, location, subLocation, phoneNumber } = req.body;

    try {
        const volunteer = await prisma.user.create({
            data: {
                fullName,
                location,
                subLocation,
                phone: phoneNumber
            }
        });

        // Redirect to a success page (Change URL as needed)
        return res.status(200).json({ message: 'PDF generated successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
