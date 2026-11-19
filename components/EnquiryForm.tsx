"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { tours } from "@/lib/tours";

const field = "w-full border-b border-line bg-transparent py-3 text-[16px] outline-none focus:border-ink";

export default function EnquiryForm() {
  const [exp, setExp] = useState("");
  const [sent, setSent] = useState<"" | "wa" | "mail">("");
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

  function send(via: "wa" | "mail") {
    const form = ref.current;
    if (!form || !form.reportValidity()) return;
    const body = compose(form);
    const url = via === "wa"
      ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(body)}`
      : `mailto:${site.email}?subject=${encodeURIComponent("Desert Stars enquiry")}&body=${encodeURIComponent(body)}`;
    setSent(via);
    window.open(url, via === "wa" ? "_blank" : "_self");
  }

  return (
    <form ref={ref} onSubmit={(e) => { e.preventDefault(); send("wa"); }} className="grid gap-8 sm:grid-cols-2">
      <label className="sm:col-span-2"><span className="eyebrow text-muted">Experience</span>
        <select name="experience" value={exp} onChange={(e) => setExp(e.target.value)} className={field}>
          <option value="">Not sure yet, please advise</option>
          {tours.map((t) => <option key={t.slug} value={t.slug}>{t.title}</option>)}
        </select>
      </label>
      <label><span className="eyebrow text-muted">Full name</span><input required name="name" autoComplete="name" className={field} /></label>
      <label><span className="eyebrow text-muted">Email</span><input required type="email" name="email" autoComplete="email" className={field} /></label>
      <label><span className="eyebrow text-muted">Preferred date</span><input type="date" name="date" className={field} /></label>
      <div className="grid grid-cols-2 gap-6">
        <label><span className="eyebrow text-muted">Adults</span><input required type="number" min={1} max={40} defaultValue={2} name="adults" className={field} /></label>
        <label><span className="eyebrow text-muted">Children</span><input type="number" min={0} max={20} defaultValue={0} name="children" className={field} /></label>
      </div>
      <label className="sm:col-span-2"><span className="eyebrow text-muted">Anything we should know</span>
        <textarea name="notes" rows={3} className={field} placeholder="Pick-up area, dietary needs, celebrations" />
      </label>
      <div className="flex flex-wrap gap-3 sm:col-span-2">
        <button type="submit" className="btn btn-dark">Send on WhatsApp</button>
        <button type="button" className="btn btn-line" onClick={() => send("mail")}>Send by email</button>
      </div>
      <p role="status" aria-live="polite" className="text-[14px] text-muted sm:col-span-2">
        {sent === "wa" && "WhatsApp is opening with your enquiry. Press send there and we'll reply within 30 minutes."}
        {sent === "mail" && "Your email app is opening with your enquiry ready to send."}
      </p>
    </form>
  );
}
