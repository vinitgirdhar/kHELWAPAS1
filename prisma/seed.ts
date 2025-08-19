import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/lib/auth'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting clean database setup...')

  // Clear all existing data
  await prisma.order.deleteMany()
  await prisma.sellRequest.deleteMany()
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()

  // Create only an admin user - no sample products or data
  console.log('👤 Creating admin user...')
  const adminUser = await prisma.user.create({
    data: {
      fullName: 'Admin User',
      email: 'admin@khelwapas.com',
      passwordHash: await hashPassword('admin123'),
      role: 'admin'
    }
  })

  console.log('✅ Clean database setup completed!')
  console.log('📧 Admin login: admin@khelwapas.com / admin123')
  console.log('🎯 Database is now empty and ready for manual data entry!')
}

main()
  .catch((e) => {
    console.error('❌ Error during setup:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })