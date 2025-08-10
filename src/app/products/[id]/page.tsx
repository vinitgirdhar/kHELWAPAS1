import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
    return (
        <div className="container py-12 text-center">
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">Product Detail Page</h1>
            <p className="mt-4 text-lg text-muted-foreground">This page is for product with ID: <span className="font-bold text-primary">{params.id}</span></p>
            <p className="text-muted-foreground">A detailed view of the product will be shown here soon.</p>
            <Button asChild className="mt-6">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
            </Button>
        </div>
    )
}
