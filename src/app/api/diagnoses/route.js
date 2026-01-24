import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET all diagnoses
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const skip = (page - 1) * limit;

    const where = search
      ? { name: { contains: search, mode: 'insensitive' } }
      : undefined;

    const [diagnoses, total] = await Promise.all([
      prisma.diagnosis.findMany({
        where,
        orderBy: { name: 'asc' },
        skip,
        take: limit,
      }),
      prisma.diagnosis.count({ where }),
    ]);

    return NextResponse.json({
      diagnoses,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching diagnoses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch diagnoses' },
      { status: 500 }
    );
  }
}

// POST create new diagnosis
export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const diagnosis = await prisma.diagnosis.create({
      data: {
        name: data.name,
      },
    });

    return NextResponse.json(diagnosis, { status: 201 });
  } catch (error) {
    console.error('Error creating diagnosis:', error);
    return NextResponse.json(
      { error: 'Failed to create diagnosis' },
      { status: 500 }
    );
  }
}
