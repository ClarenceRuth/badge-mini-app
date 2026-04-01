'use client';

import { motion } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type BadgeEmblemProps = {
  size?: 'hero' | 'detail' | 'small';
  highlight?: boolean;
};

const sizeStyles = {
  hero: 'h-64 w-64',
  detail: 'h-52 w-52',
  small: 'h-28 w-28',
};

export function BadgeEmblem({ size = 'hero', highlight = true }: BadgeEmblemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={cn('badge-orbit relative mx-auto flex items-center justify-center rounded-full', sizeStyles[size])}
    >
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className={cn(
          'relative flex h-full w-full items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-white/10 via-primary/30 to-secondary/30',
          highlight && 'shadow-badge',
        )}
      >
        <div className="absolute inset-[13%] rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(248,250,252,0.34),transparent_22%),radial-gradient(circle_at_70%_75%,rgba(245,158,11,0.28),transparent_24%),linear-gradient(160deg,rgba(124,58,237,0.65),rgba(15,23,42,0.86))]" />
        <div className="absolute inset-[24%] rounded-full border border-white/15 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.28),transparent_18%),linear-gradient(180deg,rgba(248,250,252,0.15),rgba(248,250,252,0.02))]" />
        <Star className="relative z-10 h-16 w-16 fill-secondary text-secondary drop-shadow-[0_0_30px_rgba(245,158,11,0.5)]" />
        <Sparkles className="absolute right-[22%] top-[26%] h-5 w-5 text-white/80" />
      </motion.div>
    </motion.div>
  );
}
