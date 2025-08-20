import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function KhelwapasLogo({ className, width = 48, height = 48, ...props }: SVGProps<SVGSVGElement> & { className?: string, width?: number, height?: number }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image 
        src="/images/logo.png" 
        alt="Khelwapas Logo" 
        width={width} 
        height={height} 
        className="rounded-full"
      />
    </div>
  );
}
