const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function importMedicines() {
  console.log('Importing medicines from Drug_Price.csv...');

  const csvPath = path.join(__dirname, '..', 'Drug_Price.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = csvContent.split('\n');

  // Skip header row
  const dataLines = lines.slice(1).filter(line => line.trim());

  let imported = 0;
  let skipped = 0;

  for (const line of dataLines) {
    // Parse CSV line (handle commas in values)
    const parts = line.split(',');

    if (parts.length < 4) continue;

    const no = parts[0]?.trim();
    const name = parts[1]?.trim();
    const costUSD = parseFloat(parts[2]?.trim()) || 0;
    const costKHR = parseFloat(parts[3]?.trim()) || 0;

    if (!name || name === '0') {
      skipped++;
      continue;
    }

    try {
      await prisma.medicine.upsert({
        where: { name: name },
        update: {
          costUSD: costUSD,
          costKHR: costKHR,
        },
        create: {
          name: name,
          costUSD: costUSD,
          costKHR: costKHR,
        },
      });
      imported++;

      if (imported % 50 === 0) {
        console.log(`Imported ${imported} medicines...`);
      }
    } catch (error) {
      console.error(`Error importing "${name}":`, error.message);
      skipped++;
    }
  }

  console.log(`\nImport completed!`);
  console.log(`Imported: ${imported} medicines`);
  console.log(`Skipped: ${skipped} entries`);
}

importMedicines()
  .catch((e) => {
    console.error('Import failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
