import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PreownedGearPage() {
    return (
        <div className="container py-12 text-center">
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">Pre-Owned Marketplace</h1>
            <p className="mt-4 text-lg text-muted-foreground">This section is coming soon!</p>
            <p className="text-muted-foreground">Find quality-inspected, pre-loved sports gear at great prices.</p>
            <Button asChild className="mt-6">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
            </Button>
        </div>
    )
}
