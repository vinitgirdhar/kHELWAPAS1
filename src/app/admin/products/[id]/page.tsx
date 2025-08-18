
'use client';

import Link from 'next/link';
import {
  ChevronLeft,
  Upload,
  X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter, useParams } from 'next/navigation';
import { allProducts, addProduct } from '@/lib/products';
import type { Product } from '@/components/product-card';


export default function ProductFormPage() {
    const [files, setFiles] = useState<(File & { preview: string })[]>([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [originalPrice, setOriginalPrice] = useState(0);
    const [sku, setSku] = useState('');
    const [stock, setStock] = useState(0);
    const [status, setStatus] = useState<'In Stock' | 'Out of Stock'>('In Stock');
    const [type, setType] = useState<'new' | 'preowned'>('new');
    const [category, setCategory] = useState('');
    
    const { toast } = useToast();
    const router = useRouter();
    const params = useParams();
    const productId = typeof params.id === 'string' ? params.id : null;
    const isEditing = productId !== 'new';

    useEffect(() => {
        if (isEditing) {
            const product = allProducts.find(p => p.id === productId);
            if (product) {
                setName(product.name);
                setDescription(product.description || '');
                setPrice(product.price);
                setOriginalPrice(product.originalPrice || 0);
                setSku(product.sku);
                setStock(product.status === 'In Stock' ? 1 : 0); // Simplified stock logic
                setStatus(product.status);
                setType(product.type);
                setCategory(product.category);
                // In a real app, you'd fetch image files or handle them differently
                // For this prototype, we'll just show the main image as a preview
                if (product.image) {
                     setFiles([{
                        name: 'existing-image',
                        preview: product.image,
                        ...new File([], 'existing-image')
                     }]);
                }
            } else {
                 toast({ variant: 'destructive', title: 'Product not found' });
                 router.push('/admin/products');
            }
        }
    }, [isEditing, productId, router, toast]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'image/*': [] },
        onDrop: acceptedFiles => {
        if (files.length + acceptedFiles.length > 10) {
            toast({
            variant: 'destructive',
            title: 'Too many images',
            description: 'You can upload a maximum of 10 images.',
            });
            return;
        }
        setFiles(prevFiles => [
            ...prevFiles.filter(f => f.name !== 'existing-image'), // Remove placeholder
            ...acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
        ]);
        }
    });

    const removeFile = (fileToRemove: File | (File & { preview: string })) => {
        setFiles(files => files.filter(file => file.preview !== (fileToRemove as any).preview));
    };

    const handleSave = () => {
        if (!isEditing) {
            // This is a simplified version. In a real app, you'd have robust validation.
            const newProduct: Omit<Product, 'id' | 'listingDate' | 'dataAiHint'> = {
                name,
                category,
                type,
                price,
                originalPrice,
                image: files.length > 0 ? files[0].preview : 'https://placehold.co/600x600.png',
                description,
                status,
                sku,
                // These are just placeholders
                grade: type === 'preowned' ? 'A' : undefined,
                badge: 'Inspected',
                images: files.slice(1).map(f => f.preview),
                specs: {},
            };
            addProduct(newProduct);
        }
        // Add logic here for updating an existing product if `isEditing` is true.
        // For the prototype, we'll just show the toast.

        toast({
            title: isEditing ? 'Product Updated' : 'Product Saved',
            description: `The product "${name}" has been saved.`,
        });
        router.push('/admin/products');
    }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon" className="h-7 w-7">
            <Link href="/admin/products">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {isEditing ? 'Edit Product' : 'New Product'}
          </h1>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm" onClick={() => router.push('/admin/products')}>
              Discard
            </Button>
            <Button size="sm" onClick={handleSave}>Save Product</Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>
                  Fill in the basic information about the product.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      className="w-full"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="min-h-32"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>
                  Upload up to 10 images for the product. The first image will be the thumbnail.
                </CardDescription>
              </CardHeader>
              <CardContent>
                 <div {...getRootProps()} className="flex justify-center rounded-lg border-2 border-dashed border-input px-6 py-10 cursor-pointer hover:border-primary transition-colors">
                    <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="mt-4 text-sm text-muted-foreground">
                            {isDragActive ? 'Drop the files here...' : 'Drag & drop images here, or click to select'}
                        </p>
                         <Input {...getInputProps()} />
                    </div>
                 </div>
                  {files.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                        {files.map((file, i) => (
                            <div key={i} className="relative aspect-square group">
                                <Image src={file.preview} alt={`Preview ${i}`} fill className="object-cover rounded-md" onLoad={() => {if(file.name !== 'existing-image') URL.revokeObjectURL(file.preview)}} />
                                <Button type="button" variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeFile(file)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
              </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Category</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6">
                        <div className="grid gap-3">
                        <Label htmlFor="category">Category</Label>
                        <Input
                            id="category"
                            type="text"
                            className="w-full"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="e.g. Cricket, Football"
                        />
                        </div>
                    </div>
                </CardContent>
             </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
             <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input id="price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                  </div>
                   <div className="grid gap-3">
                    <Label htmlFor="originalPrice">Original Price (₹)</Label>
                    <Input id="originalPrice" type="number" value={originalPrice} onChange={(e) => setOriginalPrice(Number(e.target.value))} />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Inventory & Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="sku">SKU</Label>
                    <Input id="sku" type="text" value={sku} onChange={(e) => setSku(e.target.value)} />
                  </div>
                   <div className="grid gap-3">
                    <Label htmlFor="stock">Stock</Label>
                    <Input id="stock" type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
                  </div>
                   <div className="grid gap-3">
                     <Label htmlFor="status">Status</Label>
                    <Select value={status} onValueChange={(value) => setStatus(value as 'In Stock' | 'Out of Stock')}>
                      <SelectTrigger id="status" aria-label="Select status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="In Stock">In Stock</SelectItem>
                        <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                   <div className="grid gap-3">
                     <Label htmlFor="type">Type</Label>
                    <Select value={type} onValueChange={(value) => setType(value as 'new' | 'preowned')}>
                      <SelectTrigger id="type" aria-label="Select type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="preowned">Pre-owned</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button variant="outline" size="sm" onClick={() => router.push('/admin/products')}>
            Discard
          </Button>
          <Button size="sm" onClick={handleSave}>Save Product</Button>
        </div>
      </div>
    </main>
  );
}

