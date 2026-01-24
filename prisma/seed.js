const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sokleap.com' },
    update: {},
    create: {
      email: 'admin@sokleap.com',
      password: hashedPassword,
      name: 'Administrator',
      role: 'ADMIN',
    },
  });
  console.log('Created admin user:', admin.email);

  // Create doctors
  const doctors = [
    { name: 'Dr. SEAN SOKVISAL', specialty: 'General Medicine' },
    { name: 'Dr. CHHUN PHEAKDEY', specialty: 'Internal Medicine' },
    { name: 'Dr. SOTH SEREYPISETH', specialty: 'Pediatrics' },
  ];

  for (const doctor of doctors) {
    await prisma.doctor.upsert({
      where: { id: doctor.name.toLowerCase().replace(/[^a-z]/g, '') },
      update: {},
      create: {
        name: doctor.name,
        specialty: doctor.specialty,
        isActive: true,
      },
    });
  }
  console.log('Created doctors');

  // Create common medicines
  const medicines = [
    { name: 'Paracetamol 500mg', description: 'Pain reliever and fever reducer' },
    { name: 'Amoxicillin 500mg', description: 'Antibiotic' },
    { name: 'Omeprazole 20mg', description: 'Stomach acid reducer' },
    { name: 'Cetirizine 10mg', description: 'Antihistamine' },
    { name: 'Metformin 500mg', description: 'Diabetes medication' },
    { name: 'Ibuprofen 400mg', description: 'Anti-inflammatory' },
    { name: 'Vitamin C 500mg', description: 'Vitamin supplement' },
    { name: 'Vitamin B Complex', description: 'Vitamin supplement' },
    { name: 'Loratadine 10mg', description: 'Antihistamine' },
    { name: 'Azithromycin 250mg', description: 'Antibiotic' },
  ];

  for (const medicine of medicines) {
    await prisma.medicine.upsert({
      where: { id: medicine.name.toLowerCase().replace(/[^a-z0-9]/g, '') },
      update: {},
      create: {
        name: medicine.name,
        description: medicine.description,
      },
    });
  }
  console.log('Created medicines');

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
