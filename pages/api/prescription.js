// pages/api/prescription.js
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { patientName, gender, age, diagnosis, medicines } = req.body;

            if (!patientName || !gender || !age || !diagnosis || !Array.isArray(medicines)) {
                return res.status(400).json({ message: 'Missing or invalid fields' });
            }

            const prescription = await prisma.prescription.create({
                data: {
                    patientName,
                    gender,
                    age,
                    diagnosis,
                    medicines: {
                        create: medicines,
                    },
                },
                include: { medicines: true },
            });

            console.log('Created prescription:', prescription);
            return res.status(201).json(prescription);
        } catch (error) {
            console.error('Error creating prescription:', error);
            return res.status(500).json({ message: 'Failed to create prescription' });
        }
    } else if (req.method === 'GET') {
        try {
            const prescriptions = await prisma.prescription.findMany({
                include: { medicines: true },
                orderBy: { createdAt: 'desc' },
            });

            console.log('Fetched prescriptions:', prescriptions);
            return res.status(200).json(prescriptions);
        } catch (error) {
            console.error('Error fetching prescriptions:', error);
            return res.status(500).json({ message: 'Failed to fetch prescriptions' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}
