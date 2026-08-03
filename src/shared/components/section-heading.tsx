interface SectionTitleProps {
  title: string;
  className?: string;
}

export default function SectionTitle({ title, className = '' }: SectionTitleProps) {
  return (
    <div className={['relative inline-block', className].filter(Boolean).join(' ')}>
      <div className="absolute start-0 top-6 w-40 h-4 bg-bg-secondary-faint rtl:rounded-l-full ltr:rounded-r-full" />

      <h2 className="relative z-10 text-text-primary text-4xl font-bold font-['Sarabun'] leading-9">
        {title}
      </h2>

      <div className="absolute start-0 bottom-0 top-9.5 w-14 h-0.5 bg-soft-pink rounded-full z-10" />
    </div>
  );
}
