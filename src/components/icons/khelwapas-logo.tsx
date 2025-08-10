import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export function KhelwapasLogo({ className, ...props }: SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <div className={cn("font-headline font-bold text-2xl tracking-tighter text-foreground", className)}>
      KHEL<span className="text-accent">WAPAS</span>
    </div>
  );
}
