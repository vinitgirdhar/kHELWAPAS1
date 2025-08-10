import PriceEstimator from "@/components/price-estimator";
import { CheckCircle } from "lucide-react";

const sellingPoints = [
    "AI-powered instant price estimate.",
    "Free, convenient doorstep pickup.",
    "On-the-spot digital grading.",
    "Instant payment upon agreement."
]

export default function SellPage() {
    return (
        <div className="bg-muted/20">
            <div className="container py-12 md:py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div className="flex flex-col gap-6">
                        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">
                            Give Your Gear a Second Innings
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Selling your used sports equipment has never been easier. Get a fair price estimate in seconds using our AI tool, schedule a pickup, and get paid instantly. It's simple, fast, and secure.
                        </p>
                        <ul className="space-y-3">
                           {sellingPoints.map((point, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <CheckCircle className="h-6 w-6 text-green-500" />
                                    <span className="text-lg">{point}</span>
                                </li>
                           ))}
                        </ul>
                        <div className="mt-4 p-6 bg-blue-100/50 border-l-4 border-primary rounded-r-lg">
                           <h4 className="font-headline font-semibold text-primary">How it works:</h4>
                           <p className="text-primary/80 mt-2">
                           1. Describe your gear below to get an estimate.
                           <br />
                           2. Schedule a pickup at your convenience.
                           <br />
                           3. Our team inspects and confirms the price on-site.
                           <br />
                           4. Accept the offer and receive instant payment.
                           </p>
                        </div>
                    </div>
                    <div>
                        <PriceEstimator />
                    </div>
                </div>
            </div>
        </div>
    );
}
