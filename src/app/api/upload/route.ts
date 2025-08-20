import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, access, unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// Simple in-memory rate limiter (per server instance)
const uploadRateLimiter = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: NextRequest) {
  try {
    // Basic rate limiting per IP: max 20 uploads per 5 min
    const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0]?.trim() || 'local';
    const now = Date.now();
    const windowMs = 5 * 60 * 1000;
    const entry = uploadRateLimiter.get(ip);
    if (!entry || now > entry.resetAt) {
      uploadRateLimiter.set(ip, { count: 1, resetAt: now + windowMs });
    } else {
      if (entry.count >= 20) {
        return NextResponse.json({ success: false, message: 'Too many upload requests. Please try again later.' }, { status: 429 });
      }
      entry.count++;
    }

  const formData = await request.formData();
  const typeIn = ((formData.get('type') as string) || 'product').toLowerCase();
  const type = typeIn === 'products' ? 'product' : typeIn;

    // Accept both multiple 'files' and a single 'file'
    let files = formData.getAll('files') as File[];
    const singleFile = formData.get('file') as File | null;
    if ((!files || files.length === 0) && singleFile) {
      files = [singleFile];
    }
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No files provided' },
        { status: 400 }
      );
    }

  // Select target directory based on type
    const subdir = type === 'profile' ? 'profile' : 'products';
    const uploadDir = join(
      process.cwd(),
      'public',
      'uploads',
      subdir
    );
    
    // Create upload directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

  console.log('[UPLOAD] Incoming files:', files.map(f => ({ name: f.name, type: (f as any).type, size: (f as any).size })));

  const uploadedFiles: string[] = [];

    for (const file of files) {
      // Validate file type and size
      // Some environments may not populate file.type; fall back to extension check
      if (file.type && !file.type.startsWith('image/')) {
        continue; // Skip non-image files
      }
      // Strict whitelist by extension (expanded)
      const allowedExt = ['jpg','jpeg','png','gif','webp','avif','heic','heif'];
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (!extension || !allowedExt.includes(extension)) {
        console.warn('[UPLOAD] Skipping file due to extension:', file.name, extension);
        continue;
      }
      // Size limits: 5MB for profile, 10MB otherwise
      const maxSize = type === 'profile' ? 5 * 1024 * 1024 : 10 * 1024 * 1024;
      if (typeof file.size === 'number' && file.size > maxSize) {
        return NextResponse.json(
          { success: false, message: `File too large. Max ${maxSize / (1024 * 1024)}MB` },
          { status: 400 }
        );
      }

      // Generate unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
  const filename = `${timestamp}-${randomString}.${extension}`;
      const filepath = join(uploadDir, filename);

      // Convert file to buffer and save
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
  await writeFile(filepath, buffer);
      
  // Return the public URL path
  const publicUrl = `/uploads/${subdir}/${filename}`;
      uploadedFiles.push(publicUrl);
    }

    if (uploadedFiles.length === 0) {
      console.warn('[UPLOAD] No valid image files processed');
      return NextResponse.json(
        { success: false, message: 'No valid image files provided. Allowed: jpg, jpeg, png, gif, webp, avif, heic, heif' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      files: uploadedFiles,
      // For convenience, provide single url when only one file is uploaded
      url: uploadedFiles[0] || null,
      message: `${uploadedFiles.length} file${uploadedFiles.length === 1 ? '' : 's'} uploaded successfully`
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload files' },
      { status: 500 }
    );
  }
}

// Simple health check to verify write permissions in upload directories
export async function GET() {
  try {
    const baseDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(baseDir)) {
      await mkdir(baseDir, { recursive: true });
    }

    const productsDir = join(baseDir, 'products');
    if (!existsSync(productsDir)) {
      await mkdir(productsDir, { recursive: true });
    }

    // Attempt to write and delete a temp file
    const tempPath = join(productsDir, `.__permcheck_${Date.now()}.tmp`);
    await writeFile(tempPath, Buffer.from('ok'));
    await access(tempPath);
    await unlink(tempPath);

    return NextResponse.json({ success: true, message: 'Upload directory is writable' });
  } catch (error) {
    console.error('Upload permission check failed:', error);
    return NextResponse.json({ success: false, message: 'Upload directory is not writable' }, { status: 500 });
  }
}
