import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const type = searchParams.get('type')
    const available = searchParams.get('available')

    // Build where clause
    const where: any = {}
    
    if (category) {
      where.category = category
    }
    
    if (type) {
      where.type = type
    }
    
    if (available === 'true') {
      where.isAvailable = true
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Transform products to match the expected format
    const transformedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      category: product.category,
      type: product.type,
      price: Number(product.price),
      originalPrice: product.originalPrice ? Number(product.originalPrice) : undefined,
      grade: product.grade,
      image: Array.isArray(product.imageUrls) && product.imageUrls.length > 0 
        ? product.imageUrls[0] 
        : '/images/products/background.jpg',
      images: Array.isArray(product.imageUrls) ? product.imageUrls : [],
      dataAiHint: product.name.toLowerCase().split(' ').slice(0, 2).join(' '),
      badge: product.badge,
      description: product.description,
      specs: product.specs || {},
      status: product.isAvailable ? 'In Stock' : 'Out of Stock',
      listingDate: product.createdAt.toISOString().split('T')[0],
      sku: `KW-${product.category.substring(0, 2).toUpperCase()}-${product.id.substring(0, 3)}`
    }))

    return NextResponse.json({
      success: true,
      products: transformedProducts
    })
  } catch (error) {
    console.error('Get products error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
