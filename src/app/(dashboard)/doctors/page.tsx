import prisma from '@/lib/prisma';
import DoctorsClient from './DoctorsClient';

export default async function DoctorsPage() {
  let initialDoctors = [];
  let initialPagination = { total: 0, totalPages: 1 };
  try {
    const limit = 10;
    const [doctors, total] = await Promise.all([
      prisma.doctor.findMany({ orderBy: { name: 'asc' }, take: limit }),
      prisma.doctor.count(),
    ]);
    initialDoctors = JSON.parse(JSON.stringify(doctors));
    initialPagination = { total, totalPages: Math.ceil(total / limit) };
  } catch {}
  return <DoctorsClient initialDoctors={initialDoctors} initialPagination={initialPagination} />;
}
