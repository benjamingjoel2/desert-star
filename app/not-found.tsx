import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="px-page flex min-h-[80svh] flex-col justify-end pb-24">
      <p className="eyebrow mb-6 text-muted">Page not found</p>
      <h1 className="display text-[56px] lg:text-[96px]">Lost in <em>the dunes</em></h1>
      <p className="mt-6 text-muted">This page doesn&apos;t exist.</p>
      <Link href="/" className="btn btn-dark mt-10 self-start">Back to Desert Stars</Link>
    </main>
  );
}
