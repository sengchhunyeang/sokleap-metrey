import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET all medicines
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

    const [medicines, total] = await Promise.all([
      prisma.medicine.findMany({
        where,
        orderBy: { name: 'asc' },
        skip,
        take: limit,
      }),
      prisma.medicine.count({ where }),
    ]);

    return NextResponse.json({
      medicines,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching medicines:', error);
    return NextResponse.json(
      { error: 'Failed to fetch medicines' },
      { status: 500 }
    );
  }
}

// POST create new medicine
export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const medicine = await prisma.medicine.create({
      data: {
        name: data.name,
        description: data.description || null,
        costUSD: data.costUSD || null,
        costKHR: data.costKHR || null,
      },
    });

    return NextResponse.json(medicine, { status: 201 });
  } catch (error) {
    console.error('Error creating medicine:', error);
    return NextResponse.json(
      { error: 'Failed to create medicine' },
      { status: 500 }
    );
  }
}
