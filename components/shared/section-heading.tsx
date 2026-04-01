type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  caption?: string;
};

export function SectionHeading({ eyebrow, title, caption }: SectionHeadingProps) {
  return (
    <div className="space-y-2">
      <div className="text-xs uppercase tracking-[0.28em] text-slate-500">{eyebrow}</div>
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        {caption ? <p className="max-w-xs text-sm text-slate-400">{caption}</p> : null}
      </div>
    </div>
  );
}
