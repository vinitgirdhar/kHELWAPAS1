import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "../ui/badge";

const testimonials = [
  {
    name: "Rohan Sharma",
    role: "Cricketer",
    avatar: "https://images.unsplash.com/photo-1587402120412-df5702caa356?q=80&w=100&h=100&fit=crop",
    dataAiHint: "indian man",
    testimonial: "Selling my old bat was so easy with Khelwapas. The pickup was on time, and I got the money in my account before the agent even left. Fantastic service!"
  },
  {
    name: "Priya Singh",
    role: "Football Parent",
    avatar: "https://images.unsplash.com/photo-1610216705422-caa3fc269258?q=80&w=100&h=100&fit=crop",
    dataAiHint: "indian woman",
    testimonial: "I bought a pair of 'Excellent' grade football boots for my son. They looked almost new! The quality check is a game-changer. Will definitely buy again."
  },
  {
    name: "Ankit Desai",
    role: "Badminton Player",
    avatar: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=100&h=100&fit=crop",
    dataAiHint: "man playing badminton",
    testimonial: "Found a high-end racket that I could never afford new. The 'Refurbished' tag was accurate, and it plays like a dream. This is the future of sports shopping."
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">Trusted by Athletes & Parents</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Hear from our community of buyers and sellers.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 mb-12 flex-wrap">
            <Badge variant="outline" className="text-lg py-2 px-4 border-support bg-support/10 text-support-foreground border-green-500 bg-green-50 text-green-700">1000+ Items Sold</Badge>
            <Badge variant="outline" className="text-lg py-2 px-4 border-primary bg-primary/10 text-primary-foreground">Verified Sellers</Badge>
            <Badge variant="outline" className="text-lg py-2 px-4 border-accent bg-accent/10 text-accent-foreground">Quality Inspected</Badge>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="h-full">
                    <CardContent className="flex flex-col items-center text-center p-6 gap-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={item.avatar} alt={item.name} data-ai-hint={item.dataAiHint} />
                        <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                       <p className="text-muted-foreground flex-grow">"{item.testimonial}"</p>
                      <div>
                        <p className="font-headline font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
