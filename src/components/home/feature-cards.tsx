import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Truck, CheckCircle, Zap } from "lucide-react";

const features = [
  {
    icon: <Truck className="h-8 w-8 text-primary" />,
    title: "Free Doorstep Pickup",
    description: "Schedule a pickup, and we'll collect your used gear from your home, hassle-free."
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Instant Payment",
    description: "Our team grades your gear on-site. Accept the offer and get paid instantly."
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: "Assured Quality",
    description: "Every pre-owned item is thoroughly inspected and graded, so you buy with confidence."
  }
];

export default function FeatureCards() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">Why Choose KHELWAPAS?</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            We make buying and selling sports gear simpler, safer, and more sustainable.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
              <CardHeader className="items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                <CardDescription className="pt-2">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
