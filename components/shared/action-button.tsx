import { LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type ActionButtonProps = {
  label: string;
  onClick: () => void | Promise<void>;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  pending?: boolean;
  className?: string;
};

export function ActionButton({
  label,
  onClick,
  variant = 'primary',
  disabled,
  pending,
  className,
}: ActionButtonProps) {
  const variants = {
    primary: 'bg-white text-slate-950 hover:bg-slate-200',
    secondary: 'bg-primary text-white hover:bg-violet-500',
    ghost: 'border border-white/10 bg-white/5 text-white hover:bg-white/10',
  };

  return (
    <button
      type="button"
      onClick={() => void onClick()}
      disabled={disabled || pending}
      className={cn(
        'inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        className,
      )}
    >
      {pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
      {label}
    </button>
  );
}
