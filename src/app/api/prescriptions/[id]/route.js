import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET single prescription
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const prescription = await prisma.prescription.findUnique({
      where: { id },
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

    if (!prescription) {
      return NextResponse.json(
        { error: 'Prescription not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(prescription);
  } catch (error) {
    console.error('Error fetching prescription:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prescription' },
      { status: 500 }
    );
  }
}

// PUT update prescription
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();

    // Delete existing medicines and recreate
    await prisma.prescriptionMedicine.deleteMany({
      where: { prescriptionId: id },
    });

    const prescription = await prisma.prescription.update({
      where: { id },
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

    return NextResponse.json(prescription);
  } catch (error) {
    console.error('Error updating prescription:', error);
    return NextResponse.json(
      { error: 'Failed to update prescription' },
      { status: 500 }
    );
  }
}

// DELETE prescription
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.prescription.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Prescription deleted successfully' });
  } catch (error) {
    console.error('Error deleting prescription:', error);
    return NextResponse.json(
      { error: 'Failed to delete prescription' },
      { status: 500 }
    );
  }
}
