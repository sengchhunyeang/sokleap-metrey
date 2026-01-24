import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET single diagnosis
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const diagnosis = await prisma.diagnosis.findUnique({
      where: { id },
    });

    if (!diagnosis) {
      return NextResponse.json(
        { error: 'Diagnosis not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(diagnosis);
  } catch (error) {
    console.error('Error fetching diagnosis:', error);
    return NextResponse.json(
      { error: 'Failed to fetch diagnosis' },
      { status: 500 }
    );
  }
}

// PUT update diagnosis
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();

    const diagnosis = await prisma.diagnosis.update({
      where: { id },
      data: {
        name: data.name,
      },
    });

    return NextResponse.json(diagnosis);
  } catch (error) {
    console.error('Error updating diagnosis:', error);
    return NextResponse.json(
      { error: 'Failed to update diagnosis' },
      { status: 500 }
    );
  }
}

// DELETE diagnosis
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.diagnosis.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Diagnosis deleted' });
  } catch (error) {
    console.error('Error deleting diagnosis:', error);
    return NextResponse.json(
      { error: 'Failed to delete diagnosis' },
      { status: 500 }
    );
  }
}
