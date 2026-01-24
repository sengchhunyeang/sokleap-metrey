import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET single doctor
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const doctor = await prisma.doctor.findUnique({
      where: { id },
      include: {
        prescriptions: {
          include: {
            patient: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!doctor) {
      return NextResponse.json(
        { error: 'Doctor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(doctor);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    return NextResponse.json(
      { error: 'Failed to fetch doctor' },
      { status: 500 }
    );
  }
}

// PUT update doctor
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();

    const doctor = await prisma.doctor.update({
      where: { id },
      data: {
        name: data.name,
        specialty: data.specialty,
        phone: data.phone,
        isActive: data.isActive,
      },
    });

    return NextResponse.json(doctor);
  } catch (error) {
    console.error('Error updating doctor:', error);
    return NextResponse.json(
      { error: 'Failed to update doctor' },
      { status: 500 }
    );
  }
}

// DELETE doctor
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.doctor.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    return NextResponse.json(
      { error: 'Failed to delete doctor' },
      { status: 500 }
    );
  }
}
