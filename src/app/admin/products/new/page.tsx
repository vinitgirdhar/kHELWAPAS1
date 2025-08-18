
'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  ChevronLeft,
  PlusCircle,
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
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
    const [files, setFiles] = useState<(File & { preview: string })[]>([]);
    const { toast } = useToast();
    const router = useRouter();

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
            ...prevFiles,
            ...acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
        ]);
        }
    });

    const removeFile = (fileToRemove: File) => {
        setFiles(files => files.filter(file => file !== fileToRemove));
    };

    const handleSave = () => {
        toast({
            title: 'Product Saved',
            description: 'The new product has been added to the inventory.',
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
            New Product
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
                      defaultValue="Kookaburra Cricket Bat"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      defaultValue="A top-tier English Willow cricket bat, perfect for professional players seeking power and precision."
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
                                <Image src={file.preview} alt={`Preview ${i}`} fill className="object-cover rounded-md" onLoad={() => URL.revokeObjectURL(file.preview)} />
                                <Button type="button" variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeFile(file)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
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
                    <Input id="price" type="number" defaultValue="15000" />
                  </div>
                   <div className="grid gap-3">
                    <Label htmlFor="originalPrice">Original Price (₹)</Label>
                    <Input id="originalPrice" type="number" defaultValue="22000" />
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
                    <Input id="sku" type="text" defaultValue="KW-CR-012" />
                  </div>
                   <div className="grid gap-3">
                    <Label htmlFor="stock">Stock</Label>
                    <Input id="stock" type="number" defaultValue="25" />
                  </div>
                   <div className="grid gap-3">
                     <Label htmlFor="status">Status</Label>
                    <Select defaultValue="In Stock">
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
                    <Select defaultValue="new">
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
