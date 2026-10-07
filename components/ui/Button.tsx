import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonTone = 'dark' | 'light';

const base =
  'inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-[15px] font-medium transition duration-200 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper disabled:pointer-events-none disabled:opacity-60';

const variants: Record<ButtonTone, Record<ButtonVariant, string>> = {
  dark: {
    primary: 'bg-white text-ink hover:bg-white/90',
    secondary: 'glass text-white hover:text-white/90',
  },
  light: {
    primary: 'bg-ink text-white hover:bg-ink-soft',
    secondary: 'border border-ink/15 text-ink hover:border-ink/40',
  },
};

export function buttonClasses({
  variant = 'primary',
  tone = 'dark',
  className,
}: { variant?: ButtonVariant; tone?: ButtonTone; className?: string } = {}) {
  return cn(base, variants[tone][variant], className);
}

type CommonProps = {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = CommonProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'className' | 'children'
  >;

type NativeButtonProps = CommonProps & { href?: never } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'className' | 'children'
  >;

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const EXTERNAL = /^(https?:|mailto:|tel:)/;

export default function Button(props: ButtonProps) {
  if (typeof props.href === 'string') {
    const { variant, tone, className, children, href, ...anchorProps } = props as LinkButtonProps;
    const classes = buttonClasses({ variant, tone, className });
    if (EXTERNAL.test(href)) {
      const newTab = href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {};
      return (
        <a href={href} className={classes} {...newTab} {...anchorProps}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const { variant, tone, className, children, type = 'button', ...buttonProps } = props as NativeButtonProps;
  return (
    <button type={type} className={buttonClasses({ variant, tone, className })} {...buttonProps}>
      {children}
    </button>
  );
}
