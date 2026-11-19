import Link from "next/link";
import PageHead from "@/components/PageHead";

export default function NotFound() {
  return (
    <>
      <PageHead eyebrow="Page not found" title={<>Lost in <em>the dunes</em></>} intro="This page doesn't exist. Try one of our experiences instead." />
      <div className="px-page pb-28"><Link href="/experiences" className="btn btn-dark">View experiences</Link></div>
    </>
  );
}
