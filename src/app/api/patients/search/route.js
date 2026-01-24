import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET search patients by NSSF ID, name, or Khmer name
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit')) || 10;

    if (!query || query.length < 2) {
      return NextResponse.json([]);
    }

    const patients = await prisma.patient.findMany({
      where: {
        OR: [
          { nssfId: { contains: query, mode: 'insensitive' } },
          { nameLatin: { contains: query, mode: 'insensitive' } },
          { khmerName: { contains: query } },
          { nationalIdCard: { contains: query } },
          { name: { contains: query, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        nssfId: true,
        nationalIdCard: true,
        nameLatin: true,
        khmerName: true,
        name: true,
        gender: true,
        age: true,
        enterprise: true,
      },
      take: limit,
      orderBy: { nameLatin: 'asc' },
    });

    return NextResponse.json(patients);
  } catch (error) {
    console.error('Error searching patients:', error);
    return NextResponse.json(
      { error: 'Failed to search patients' },
      { status: 500 }
    );
  }
}
