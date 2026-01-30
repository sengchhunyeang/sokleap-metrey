import prisma from '@/lib/prisma';
import PrescriptionsClient from './PrescriptionsClient';

export default async function PrescriptionsPage() {
  let initialPrescriptions = [];
  let initialPagination = { total: 0, totalPages: 1 };
  try {
    const limit = 10;
    const [prescriptions, total] = await Promise.all([
      prisma.prescription.findMany({
        include: { patient: true, doctor: true, medicines: { include: { medicine: true } } },
        orderBy: { createdAt: 'desc' },
        take: limit,
      }),
      prisma.prescription.count(),
    ]);
    initialPrescriptions = JSON.parse(JSON.stringify(prescriptions));
    initialPagination = { total, totalPages: Math.ceil(total / limit) };
  } catch {}
  return <PrescriptionsClient initialPrescriptions={initialPrescriptions} initialPagination={initialPagination} />;
}
