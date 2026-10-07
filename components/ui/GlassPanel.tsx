import type { ElementType, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export default function GlassPanel({
  as: Tag = 'div',
  className,
  ...props
}: HTMLAttributes<HTMLElement> & { as?: ElementType }) {
  return <Tag className={cn('glass rounded-panel text-white', className)} {...props} />;
}
