import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import * as XLSX from 'xlsx';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Read file buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Parse Excel file
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    if (data.length === 0) {
      return NextResponse.json({ error: 'Excel file is empty' }, { status: 400 });
    }

    // Map Excel columns to database fields
    // Expected columns: NSSF ID, NAME LATIN, KHMER NAME, SEX, AGE
    const patients = data.map((row) => {
      // Try different column name variations
      const nssfId = row['NSSF ID'] || row['NSSF_ID'] || row['nssfId'] || row['nssf_id'] || '';
      const nationalIdCard = row['NATIONAL ID CARD'] || row['NATIONAL_ID_CARD'] || row['nationalIdCard'] || '';
      const nameLatin = row['NAME LATIN'] || row['NAME_LATIN'] || row['nameLatin'] || row['name_latin'] || '';
      const khmerName = row['KHMER NAME'] || row['KHMER_NAME'] || row['khmerName'] || row['khmer_name'] || '';
      const sex = row['SEX'] || row['sex'] || row['GENDER'] || row['gender'] || '';
      const age = row['AGE'] || row['age'] || 0;
      const enterprise = row['ENTERPRISE NAME'] || row['ENTERPRISE_NAME'] || row['enterprise'] || '';

      // Determine gender
      let gender = 'MALE';
      if (sex) {
        const sexLower = sex.toString().toLowerCase();
        if (sexLower === 'f' || sexLower === 'female' || sexLower === 'ស្រី') {
          gender = 'FEMALE';
        }
      }

      // Create name from nameLatin or khmerName
      const name = nameLatin || khmerName || 'Unknown';

      return {
        nssfId: nssfId ? nssfId.toString().trim() : null,
        nationalIdCard: nationalIdCard ? nationalIdCard.toString().trim() : null,
        nameLatin: nameLatin ? nameLatin.toString().trim() : null,
        khmerName: khmerName ? khmerName.toString().trim() : null,
        name: name.toString().trim(),
        gender,
        age: parseInt(age) || 0,
        enterprise: enterprise ? enterprise.toString().trim() : null,
      };
    });

    // Filter out patients without valid data
    const validPatients = patients.filter(
      (p) => p.name && p.name !== 'Unknown' && (p.nssfId || p.nameLatin || p.khmerName)
    );

    if (validPatients.length === 0) {
      return NextResponse.json(
        { error: 'No valid patient data found in file. Please check column names: NSSF ID, NAME LATIN, KHMER NAME, SEX, AGE' },
        { status: 400 }
      );
    }

    // Import patients using upsert to avoid duplicates
    let imported = 0;
    let skipped = 0;
    let errors = [];

    for (const patient of validPatients) {
      try {
        if (patient.nssfId) {
          // Use upsert if nssfId exists
          await prisma.patient.upsert({
            where: { nssfId: patient.nssfId },
            update: {
              nationalIdCard: patient.nationalIdCard,
              nameLatin: patient.nameLatin,
              khmerName: patient.khmerName,
              name: patient.name,
              gender: patient.gender,
              age: patient.age,
              enterprise: patient.enterprise,
            },
            create: patient,
          });
        } else {
          // Create new patient if no nssfId
          await prisma.patient.create({
            data: patient,
          });
        }
        imported++;
      } catch (err) {
        if (err.code === 'P2002') {
          // Duplicate entry, skip
          skipped++;
        } else {
          errors.push(`Row error: ${err.message}`);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Import completed: ${imported} patients imported, ${skipped} skipped (duplicates)`,
      imported,
      skipped,
      total: validPatients.length,
      errors: errors.slice(0, 5), // Return first 5 errors if any
    });
  } catch (error) {
    console.error('Error importing patients:', error);
    return NextResponse.json(
      { error: 'Failed to import patients: ' + error.message },
      { status: 500 }
    );
  }
}
