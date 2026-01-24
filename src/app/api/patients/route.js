import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET patients with pagination
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { nameLatin: { contains: search, mode: 'insensitive' } },
            { khmerName: { contains: search } },
            { nssfId: { contains: search, mode: 'insensitive' } },
            { phone: { contains: search } },
          ],
        }
      : undefined;

    const [patients, total] = await Promise.all([
      prisma.patient.findMany({
        where,
        select: {
          id: true,
          nssfId: true,
          nationalIdCard: true,
          nameLatin: true,
          khmerName: true,
          name: true,
          gender: true,
          age: true,
          phone: true,
          enterprise: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.patient.count({ where }),
    ]);

    return NextResponse.json({
      patients,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch patients' },
      { status: 500 }
    );
  }
}

// POST create new patient
export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.name || !data.gender || data.age === undefined) {
      return NextResponse.json(
        { error: 'Name, gender, and age are required' },
        { status: 400 }
      );
    }

    const patient = await prisma.patient.create({
      data: {
        nssfId: data.nssfId || null,
        nationalIdCard: data.nationalIdCard || null,
        nameLatin: data.nameLatin || null,
        khmerName: data.khmerName || null,
        name: data.name,
        gender: data.gender,
        age: parseInt(data.age),
        phone: data.phone || null,
        address: data.address || null,
        enterprise: data.enterprise || null,
      },
    });

    return NextResponse.json(patient, { status: 201 });
  } catch (error) {
    console.error('Error creating patient:', error);
    return NextResponse.json(
      { error: 'Failed to create patient' },
      { status: 500 }
    );
  }
}
