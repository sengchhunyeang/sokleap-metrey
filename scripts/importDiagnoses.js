const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function importDiagnoses() {
  console.log('Importing diagnoses from Diagnosis_List.csv...');

  const csvPath = path.join(__dirname, '..', 'Diagnosis_List.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = csvContent.split('\n');

  // Skip header row, limit to 500 entries
  const dataLines = lines.slice(1).filter(line => line.trim()).slice(0, 500);

  let imported = 0;
  let skipped = 0;

  for (const line of dataLines) {
    // Parse CSV line - format is: No,Diagnosis_Name
    const commaIndex = line.indexOf(',');
    if (commaIndex === -1) continue;

    const name = line.substring(commaIndex + 1).trim();

    if (!name) {
      skipped++;
      continue;
    }

    try {
      await prisma.diagnosis.upsert({
        where: { name: name },
        update: {},
        create: {
          name: name,
        },
      });
      imported++;

      if (imported % 100 === 0) {
        console.log(`Imported ${imported} diagnoses...`);
      }
    } catch (error) {
      console.error(`Error importing "${name}":`, error.message);
      skipped++;
    }
  }

  console.log(`\nImport completed!`);
  console.log(`Imported: ${imported} diagnoses`);
  console.log(`Skipped: ${skipped} entries`);
}

importDiagnoses()
  .catch((e) => {
    console.error('Import failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
