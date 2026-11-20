"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { tours } from "@/lib/tours";

const field = "mt-2 w-full rounded-none border-b border-[#efe6d6]/35 bg-transparent py-3 text-[18px] text-[#efe6d6] transition-colors [color-scheme:dark] placeholder:text-[#efe6d6]/55 focus:border-[#efe6d6] [&_option]:bg-[#0c0a08]";
const lab = "v4-m block text-[15px] text-[#efe6d6]/70";
const btn = "v4-m inline-flex h-[52px] items-center px-5 text-[19px] transition-colors";

export default function EnquiryForm() {
  const [exp, setExp] = useState("");
  const [sent, setSent] = useState(false);
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("experience");
    if (s && tours.some((t) => t.slug === s)) setExp(s);
  }, []);

  function compose(form: HTMLFormElement) {
    const d = new FormData(form);
    const t = tours.find((x) => x.slug === d.get("experience"));
    return [
      `Hello Desert Stars, I'd like to plan an experience.`,
      `Name: ${d.get("name")}`,
      `Experience: ${t ? t.title : "Not sure yet"}`,
      `Date: ${d.get("date") || "Flexible"}`,
      `Guests: ${d.get("adults")} adults, ${d.get("children") || 0} children`,
      `Email: ${d.get("email")}`,
      d.get("notes") ? `Notes: ${d.get("notes")}` : "",
    ].filter(Boolean).join("\n");
  }

  function send() {
    const form = ref.current;
    if (!form || !form.reportValidity()) return;
    const body = compose(form);
    setSent(true);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Desert Stars enquiry")}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form ref={ref} onSubmit={(e) => { e.preventDefault(); send(); }} className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
      <label className="sm:col-span-2"><span className={lab}>Experience</span>
        <select name="experience" value={exp} onChange={(e) => setExp(e.target.value)} className={field}>
          <option value="">Not sure yet, please advise</option>
          {tours.map((t) => <option key={t.slug} value={t.slug}>{t.title}</option>)}
        </select>
      </label>
      <label><span className={lab}>Full name</span><input required name="name" autoComplete="name" className={field} /></label>
      <label><span className={lab}>Email</span><input required type="email" name="email" autoComplete="email" className={field} /></label>
      <label><span className={lab}>Preferred date</span><input type="date" name="date" className={field} /></label>
      <div className="grid grid-cols-2 gap-6">
        <label><span className={lab}>Adults</span><input required type="number" min={1} max={40} defaultValue={2} name="adults" className={field} /></label>
        <label><span className={lab}>Children</span><input type="number" min={0} max={20} defaultValue={0} name="children" className={field} /></label>
      </div>
      <label className="sm:col-span-2"><span className={lab}>Anything we should know</span>
        <textarea name="notes" rows={3} className={field} placeholder="Pick-up area, dietary needs, celebrations" />
      </label>
      <div className="flex flex-wrap gap-2 pt-2 sm:col-span-2">
        <button type="submit" className={`${btn} bg-[#efe6d6] text-[#0c0a08] hover:bg-[#efe6d6]/85`}>{"{Send enquiry}"}</button>
        <a href={site.phoneHref} className={`${btn} border border-[#efe6d6]/60 text-[#efe6d6] hover:bg-[#efe6d6] hover:text-[#0c0a08]`}>{"{Or call us}"}</a>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5em] text-[14px] leading-[1.5] text-[#efe6d6]/80 sm:col-span-2">
        {sent && "Your email app is opening with your enquiry ready to send."}
      </p>
    </form>
  );
}
