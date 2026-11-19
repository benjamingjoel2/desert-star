export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 leading-none ${className}`}>
      <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
        <path d="M12 0 L13.6 10.4 L24 12 L13.6 13.6 L12 24 L10.4 13.6 L0 12 L10.4 10.4 Z" fill="currentColor" />
      </svg>
      <span className="whitespace-nowrap font-serif text-[15px] uppercase tracking-[0.3em]">Desert Stars</span>
    </span>
  );
}
