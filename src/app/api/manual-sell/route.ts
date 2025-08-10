
import { NextResponse } from 'next/server';
import { addSellRequest } from '@/lib/sell-requests';

// This is a simplified simulation. In a real app, you would use a secure file upload
// service like Firebase Storage or AWS S3 and get a public URL.
// For this simulation, we'll just use placeholder URLs.
const SIMULATED_IMAGE_URLS = [
    'https://images.unsplash.com/photo-1565992441121-4367c2967103?q=80&w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1551958214-2d5b80a5a088?q=80&w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?q=80&w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1587280501635-33535b3f631c?q=80&w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&h=200&fit=crop'
];


export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const category = formData.get('category') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = Number(formData.get('price'));
    const contactMethod = formData.get('contactMethod') as 'Email' | 'Phone' | 'WhatsApp';
    const contactDetail = formData.get('contactDetail') as string;
    const images = formData.getAll('images');

    if (images.length < 5) {
        return NextResponse.json({ message: 'At least 5 images are required.', success: false }, { status: 400 });
    }

    // In a real app, you would upload images to cloud storage and get the URLs.
    // Here we just simulate it with placeholder URLs.
    const imageUrls = SIMULATED_IMAGE_URLS.slice(0, images.length);

    addSellRequest({
        fullName,
        email,
        category,
        title,
        description,
        price,
        contactMethod,
        contactDetail,
        imageUrls
    });

    return NextResponse.json({ message: 'Sell request submitted successfully!', success: true }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    if (error instanceof Error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
    return NextResponse.json({ message: 'An error occurred while submitting the form.', success: false }, { status: 500 });
  }
}
