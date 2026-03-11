import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [patientsCount, prescriptionsCount, doctorsCount, todayPrescriptionsCount, recentPrescriptions] =
      await Promise.all([
        prisma.patient.count(),
        prisma.prescription.count(),
        prisma.doctor.count(),
        prisma.prescription.count({
          where: {
            createdAt: {
              gte: today,
              lt: tomorrow,
            },
          },
        }),
        prisma.prescription.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: { patient: true, doctor: true },
        }),
      ]);

    return NextResponse.json({
      patientsCount,
      prescriptionsCount,
      doctorsCount,
      todayPrescriptionsCount,
      recentPrescriptions,
    });
  } catch {
    return NextResponse.json(
      { error: 'Database unavailable' },
      { status: 503 }
    );
  }
}
