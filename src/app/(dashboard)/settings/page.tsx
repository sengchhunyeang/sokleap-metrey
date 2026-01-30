import prisma from '@/lib/prisma';
import SettingsClient from './SettingsClient';

export default async function SettingsPage() {
  let initialData = {
    patients: [] as any[],
    patientCount: 0,
    patientTotalPages: 1,
    doctors: [] as any[],
    doctorCount: 0,
    doctorTotalPages: 1,
    medicines: [] as any[],
    medicineCount: 0,
    medicineTotalPages: 1,
    users: [] as any[],
    userCount: 0,
    userTotalPages: 1,
    diagnoses: [] as any[],
    diagnosisCount: 0,
    diagnosisTotalPages: 1,
  };
  try {
    const [patients, patientCount, doctors, doctorCount, medicines, medicineCount, users, userCount, diagnoses, diagnosisCount] = await Promise.all([
      prisma.patient.findMany({ take: 10, orderBy: { createdAt: 'desc' } }),
      prisma.patient.count(),
      prisma.doctor.findMany({ take: 10, orderBy: { name: 'asc' } }),
      prisma.doctor.count(),
      prisma.medicine.findMany({ take: 20, orderBy: { name: 'asc' } }),
      prisma.medicine.count(),
      prisma.user.findMany({ take: 10, select: { id: true, name: true, email: true, role: true } }),
      prisma.user.count(),
      prisma.diagnosis.findMany({ take: 20, orderBy: { name: 'asc' } }),
      prisma.diagnosis.count(),
    ]);
    initialData = JSON.parse(JSON.stringify({
      patients, patientCount, patientTotalPages: Math.ceil(patientCount / 10),
      doctors, doctorCount, doctorTotalPages: Math.ceil(doctorCount / 10),
      medicines, medicineCount, medicineTotalPages: Math.ceil(medicineCount / 20),
      users, userCount, userTotalPages: Math.ceil(userCount / 10),
      diagnoses, diagnosisCount, diagnosisTotalPages: Math.ceil(diagnosisCount / 20),
    }));
  } catch {}
  return <SettingsClient initialData={initialData} />;
}
