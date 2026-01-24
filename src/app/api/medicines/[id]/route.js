import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET single medicine
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const medicine = await prisma.medicine.findUnique({
      where: { id },
    });

    if (!medicine) {
      return NextResponse.json({ error: 'Medicine not found' }, { status: 404 });
    }

    return NextResponse.json(medicine);
  } catch (error) {
    console.error('Error fetching medicine:', error);
    return NextResponse.json(
      { error: 'Failed to fetch medicine' },
      { status: 500 }
    );
  }
}

// PUT update medicine
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();

    const medicine = await prisma.medicine.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description || null,
        costUSD: data.costUSD ?? null,
        costKHR: data.costKHR ?? null,
      },
    });

    return NextResponse.json(medicine);
  } catch (error) {
    console.error('Error updating medicine:', error);
    return NextResponse.json(
      { error: 'Failed to update medicine' },
      { status: 500 }
    );
  }
}

// DELETE medicine
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.medicine.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting medicine:', error);
    return NextResponse.json(
      { error: 'Failed to delete medicine' },
      { status: 500 }
    );
  }
}
