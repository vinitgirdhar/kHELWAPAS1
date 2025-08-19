const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function checkUser() {
  try {
    console.log('Checking database for user: vinit@khelwapas.com');
    
    const user = await prisma.user.findUnique({
      where: { email: 'vinit@khelwapas.com' }
    });

    if (user) {
      console.log('User found:');
      console.log('ID:', user.id);
      console.log('Full Name:', user.fullName);
      console.log('Email:', user.email);
      console.log('Role:', user.role);
      console.log('Created At:', user.createdAt);
      console.log('Password Hash Length:', user.passwordHash.length);
      
      // Test password verification
      const isValidPassword = await bcrypt.compare('vinit123', user.passwordHash);
      console.log('Password "vinit123" is valid:', isValidPassword);
      
    } else {
      console.log('❌ User not found with email: vinit@khelwapas.com');
      
      // Check all users
      const allUsers = await prisma.user.findMany();
      console.log('\nAll users in database:');
      allUsers.forEach((u, index) => {
        console.log(`${index + 1}. ${u.fullName} (${u.email}) - Role: ${u.role}`);
      });
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUser();
