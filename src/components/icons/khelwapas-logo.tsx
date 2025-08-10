import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function KhelwapasLogo({ className, ...props }: SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image 
        src="https://storage.googleapis.com/devo-st-uploads/25f1b14a673b4e70b975d1d322b64a2f/khelwapas-logo.png" 
        alt="Khelwapas Logo" 
        width={40} 
        height={40} 
        className="rounded-full"
      />
    </div>
  );
}
