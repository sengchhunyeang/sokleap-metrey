const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const prisma = new PrismaClient();

async function importPatients() {
  const csvPath = path.join(__dirname, '..', 'PatientData.csv');

  const fileStream = fs.createReadStream(csvPath, { encoding: 'utf8' });
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const uniquePatients = new Map();
  let lineNumber = 0;
  let headers = [];

  console.log('Reading CSV file...');

  for await (const line of rl) {
    lineNumber++;

    // Parse header
    if (lineNumber === 1) {
      headers = parseCSVLine(line);
      console.log('Headers:', headers);
      continue;
    }

    try {
      const values = parseCSVLine(line);
      const row = {};
      headers.forEach((header, index) => {
        row[header.trim()] = values[index]?.trim() || '';
      });

      const nssfId = row['NSSF ID'];
      const nameLatin = row['NAME LATIN'];
      const khmerName = row['KHMER NAME'];
      const sex = row['SEX'];
      const age = row['AGE'];
      const nationalIdCard = row['NATIONAL ID CARD'];
      const enterprise = row['ENTERPRISE NAME'];

      // Skip if no NSSF ID or name
      if (!nssfId || !nameLatin) continue;

      // Use NSSF ID as unique key (keep first occurrence)
      if (!uniquePatients.has(nssfId)) {
        uniquePatients.set(nssfId, {
          nssfId,
          nationalIdCard: nationalIdCard || null,
          nameLatin,
          khmerName: khmerName || null,
          name: khmerName || nameLatin, // Use Khmer name as primary, fallback to Latin
          gender: sex?.toLowerCase() === 'male' ? 'MALE' : sex?.toLowerCase() === 'female' ? 'FEMALE' : 'OTHER',
          age: parseInt(age) || 0,
          enterprise: enterprise || null,
        });
      }
    } catch (error) {
      console.error(`Error parsing line ${lineNumber}:`, error.message);
    }

    if (lineNumber % 10000 === 0) {
      console.log(`Processed ${lineNumber} lines, ${uniquePatients.size} unique patients found`);
    }
  }

  console.log(`\nTotal unique patients: ${uniquePatients.size}`);
  console.log('Importing to database...\n');

  let imported = 0;
  let skipped = 0;
  let errors = 0;

  const patients = Array.from(uniquePatients.values());
  const batchSize = 100;

  for (let i = 0; i < patients.length; i += batchSize) {
    const batch = patients.slice(i, i + batchSize);

    for (const patient of batch) {
      try {
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
        imported++;
      } catch (error) {
        if (error.code === 'P2002') {
          skipped++;
        } else {
          errors++;
          console.error(`Error importing ${patient.nssfId}:`, error.message);
        }
      }
    }

    if ((i + batchSize) % 1000 === 0 || i + batchSize >= patients.length) {
      console.log(`Progress: ${Math.min(i + batchSize, patients.length)}/${patients.length} (${imported} imported, ${skipped} skipped, ${errors} errors)`);
    }
  }

  console.log('\n=== Import Complete ===');
  console.log(`Imported: ${imported}`);
  console.log(`Skipped (duplicates): ${skipped}`);
  console.log(`Errors: ${errors}`);
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);

  return result;
}

importPatients()
  .catch((error) => {
    console.error('Import failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
