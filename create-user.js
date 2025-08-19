const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createUser() {
  try {
    console.log('Creating user: vinit@khelwapas.com');
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: 'vinit@khelwapas.com' }
    });

    if (existingUser) {
      console.log('❌ User already exists!');
      return;
    }

    // Hash the password
    const passwordHash = await bcrypt.hash('vinit123', 12);
    
    // Create the user
    const user = await prisma.user.create({
      data: {
        fullName: 'Vinit Khelwapas',
        email: 'vinit@khelwapas.com',
        passwordHash: passwordHash,
        role: 'user'
      }
    });

    console.log('✅ User created successfully:');
    console.log('ID:', user.id);
    console.log('Full Name:', user.fullName);
    console.log('Email:', user.email);
    console.log('Role:', user.role);
    console.log('Created At:', user.createdAt);
    
    // Test password verification
    const isValidPassword = await bcrypt.compare('vinit123', user.passwordHash);
    console.log('Password verification test:', isValidPassword);
    
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createUser();
