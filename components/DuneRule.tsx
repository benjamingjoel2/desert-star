export default function DuneRule({ className = "" }: { className?: string }) {
  return (
    <svg className={`dune-rule ${className}`} viewBox="0 0 1200 28" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 22 C 180 4, 320 4, 470 16 S 760 30, 900 12 S 1110 2, 1200 14" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
