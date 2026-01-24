import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET all doctors
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page')) || 0;
    const limit = parseInt(searchParams.get('limit')) || 0;

    const where = {
      ...(activeOnly && { isActive: true }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { specialty: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    // If no pagination params, return all (for backward compatibility)
    if (!page && !limit) {
      const doctors = await prisma.doctor.findMany({
        where: Object.keys(where).length ? where : undefined,
        orderBy: { name: 'asc' },
      });
      return NextResponse.json(doctors);
    }

    const skip = (page - 1) * limit;
    const [doctors, total] = await Promise.all([
      prisma.doctor.findMany({
        where: Object.keys(where).length ? where : undefined,
        orderBy: { name: 'asc' },
        skip,
        take: limit,
      }),
      prisma.doctor.count({ where: Object.keys(where).length ? where : undefined }),
    ]);

    return NextResponse.json({
      doctors,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch doctors' },
      { status: 500 }
    );
  }
}

// POST create new doctor
export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const doctor = await prisma.doctor.create({
      data: {
        name: data.name,
        specialty: data.specialty || null,
        phone: data.phone || null,
        isActive: data.isActive !== false,
      },
    });

    return NextResponse.json(doctor, { status: 201 });
  } catch (error) {
    console.error('Error creating doctor:', error);
    return NextResponse.json(
      { error: 'Failed to create doctor' },
      { status: 500 }
    );
  }
}
