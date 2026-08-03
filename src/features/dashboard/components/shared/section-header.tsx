interface SecHeaderProps {
  text: string;
  className?: string;
}

export default function SecHeader({ text, className = '' }: SecHeaderProps) {
  return (
    <header className={`${className}`}>
      <h2 className="w-full text-sm font-bold font-sans text-text-secondary uppercase tracking-[0.25em]">
        {text}
      </h2>
    </header>
  );
}
