import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET single patient
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const patient = await prisma.patient.findUnique({
      where: { id },
      include: {
        prescriptions: {
          include: {
            doctor: true,
            medicines: {
              include: {
                medicine: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!patient) {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error);
    return NextResponse.json(
      { error: 'Failed to fetch patient' },
      { status: 500 }
    );
  }
}

// PUT update patient
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();

    const patient = await prisma.patient.update({
      where: { id },
      data: {
        name: data.name,
        gender: data.gender,
        age: data.age ? parseInt(data.age) : undefined,
        phone: data.phone,
        address: data.address,
      },
    });

    return NextResponse.json(patient);
  } catch (error) {
    console.error('Error updating patient:', error);
    return NextResponse.json(
      { error: 'Failed to update patient' },
      { status: 500 }
    );
  }
}

// DELETE patient
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.patient.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Error deleting patient:', error);
    return NextResponse.json(
      { error: 'Failed to delete patient' },
      { status: 500 }
    );
  }
}
