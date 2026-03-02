import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function Logo({ className = "w-8 h-8", style }: { className?: string, style?: React.CSSProperties }) {
    return (
        <div className={cn("relative overflow-hidden rounded-full", className)} style={style}>
            <Image
                src="/logo.jpg"
                alt="Sulva Tech Logo"
                fill
                className="object-cover"
            />
        </div>
    );
}
