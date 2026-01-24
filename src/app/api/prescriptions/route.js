import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET all prescriptions
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get('patientId');
    const doctorId = searchParams.get('doctorId');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page')) || 0;
    const limit = parseInt(searchParams.get('limit')) || 0;

    const where = {
      ...(patientId && { patientId }),
      ...(doctorId && { doctorId }),
    };

    // Add search filter for patient name, NSSF ID, or diagnosis
    if (search) {
      where.OR = [
        { patient: { nssfId: { contains: search, mode: 'insensitive' } } },
        { patient: { name: { contains: search, mode: 'insensitive' } } },
        { patient: { nameLatin: { contains: search, mode: 'insensitive' } } },
        { patient: { khmerName: { contains: search, mode: 'insensitive' } } },
        { diagnosis: { contains: search, mode: 'insensitive' } },
      ];
    }

    const include = {
      patient: true,
      doctor: true,
      medicines: {
        include: {
          medicine: true,
        },
      },
    };

    // If no pagination params, return all (for backward compatibility)
    if (!page && !limit) {
      const prescriptions = await prisma.prescription.findMany({
        where,
        include,
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json(prescriptions);
    }

    const skip = (page - 1) * limit;
    const [prescriptions, total] = await Promise.all([
      prisma.prescription.findMany({
        where,
        include,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.prescription.count({ where }),
    ]);

    return NextResponse.json({
      prescriptions,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prescriptions' },
      { status: 500 }
    );
  }
}

// POST create new prescription
export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.patientId || !data.doctorId || !data.diagnosis) {
      return NextResponse.json(
        { error: 'Patient, doctor, and diagnosis are required' },
        { status: 400 }
      );
    }

    const prescription = await prisma.prescription.create({
      data: {
        patientId: data.patientId,
        doctorId: data.doctorId,
        diagnosis: data.diagnosis,
        appointmentDate: data.appointmentDate
          ? new Date(data.appointmentDate)
          : null,
        medicines: {
          create: data.medicines?.map((med) => ({
            medicineId: med.medicineId,
            morning: med.morning || null,
            afternoon: med.afternoon || null,
            evening: med.evening || null,
            night: med.night || null,
            quantity: med.quantity,
            instructions: med.instructions || null,
          })) || [],
        },
      },
      include: {
        patient: true,
        doctor: true,
        medicines: {
          include: {
            medicine: true,
          },
        },
      },
    });

    return NextResponse.json(prescription, { status: 201 });
  } catch (error) {
    console.error('Error creating prescription:', error);
    return NextResponse.json(
      { error: 'Failed to create prescription' },
      { status: 500 }
    );
  }
}
