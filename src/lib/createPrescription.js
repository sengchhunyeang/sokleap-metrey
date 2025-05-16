import prisma from '../../lib/prisma'; // Import Prisma client

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { patientData, prescriptions } = req.body;

        try {
            // Save patient data
            const patient = await prisma.patient.create({
                data: {
                    name: patientData.name,
                    gender: patientData.gender,
                    age: patientData.age,
                    diagnosis: patientData.diagnosis,
                },
            });

            // Save prescriptions
            const savedPrescriptions = await Promise.all(
                prescriptions.map((med) =>
                    prisma.prescription.create({
                        data: {
                            name: med.name,
                            morning: med.morning,
                            afternoon: med.afternoon,
                            evening: med.evening,
                            night: med.night,
                            quantity: med.quantity,
                            instructions: med.instructions,
                            patientId: patient.id, // Linking to the saved patient
                        },
                    })
                )
            );

            res.status(200).json({ message: 'Patient and prescriptions saved successfully' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ message: 'Error saving data' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
