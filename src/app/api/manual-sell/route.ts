import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const category = formData.get('category');
    const title = formData.get('title');
    const description = formData.get('description');
    const price = formData.get('price');
    const contactMethod = formData.get('contactMethod');
    const contactDetail = formData.get('contactDetail');
    const images = formData.getAll('images');

    // In a real app, you would process this data:
    // 1. Save text fields to a database.
    // 2. Upload images to a cloud storage service (like Firebase Storage).
    // 3. Link the image URLs to the database record.

    console.log({
        fullName,
        email,
        category,
        title,
        description,
        price,
        contactMethod,
        contactDetail,
        imageCount: images.length
    });

    // Simulate a successful API response
    return NextResponse.json({ message: 'Sell request submitted successfully!', success: true }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'An error occurred while submitting the form.', success: false }, { status: 500 });
  }
}
