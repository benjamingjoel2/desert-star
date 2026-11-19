export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" className="mb-1.5">
        <path d="M12 0 L13.6 10.4 L24 12 L13.6 13.6 L12 24 L10.4 13.6 L0 12 L10.4 10.4 Z" fill="currentColor" />
      </svg>
      <span className="whitespace-nowrap font-serif text-[15px] tracking-[0.26em] pl-[0.26em] uppercase sm:text-[19px] sm:tracking-[0.34em] sm:pl-[0.34em]">Desert Stars</span>
    </span>
  );
}
