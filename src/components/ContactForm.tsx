"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { budgetRanges, contactServices } from "@/content/site";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";

const field =
  "mt-2 block w-full rounded-2xl border border-line bg-mist px-4 py-3.5 text-[16px] text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-ink/35 focus:border-accent focus:shadow-[0_0_0_4px_rgba(139,92,246,0.12)] aria-[invalid=true]:border-danger";

function Field({ id, label, error, optional, children }: { id: string; label: string; error?: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-[14px] font-medium">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p id={`${id}-error`} role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 text-[13px] text-danger">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { startedAt: 0, website: "", company: "", budget: "" },
  });

  // Stamp the form-open time after mount (used server-side to flag instant bot submissions).
  useEffect(() => setValue("startedAt", Date.now()), [setValue, status]);

  async function onSubmit(data: ContactInput) {
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setStatus("sent");
      reset();
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Something went wrong.");
      setStatus("error");
    }
  }

  const aria = (k: keyof ContactInput) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-error` : undefined });

  if (status === "sent") {
    return (
      <motion.div role="status" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="card flex flex-col items-start gap-4 p-10">
        <CheckCircle2 className="size-10 text-accent" aria-hidden />
        <h2 className="text-title">Thank you — message received.</h2>
        <p className="text-muted">We&apos;ll get back to you soon at the email you provided.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-2 text-[15px] font-medium text-accent hover:underline">Send another message</button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="card relative space-y-6 p-6 md:p-10">
      <div className="grid gap-6 md:grid-cols-2">
        <Field id="name" label="Full Name" error={errors.name?.message}>
          <input id="name" autoComplete="name" className={field} {...register("name")} {...aria("name")} />
        </Field>
        <Field id="email" label="Work Email" error={errors.email?.message}>
          <input id="email" type="email" autoComplete="email" className={field} {...register("email")} {...aria("email")} />
        </Field>
        <Field id="company" label="Company" optional error={errors.company?.message}>
          <input id="company" autoComplete="organization" className={field} {...register("company")} {...aria("company")} />
        </Field>
        <Field id="service" label="Service Interested In" error={errors.service?.message}>
          <select id="service" defaultValue="" className={field} {...register("service")} {...aria("service")}>
            <option value="" disabled>Select a service</option>
            {contactServices.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
      </div>
      <Field id="message" label="Project Description" error={errors.message?.message}>
        <textarea id="message" rows={6} className={`${field} resize-y`} placeholder="What are you building, and where could we help?" {...register("message")} {...aria("message")} />
      </Field>
      <Field id="budget" label="Budget Range" optional error={errors.budget?.message}>
        <select id="budget" className={field} {...register("budget")}>
          <option value="">Prefer not to say</option>
          {budgetRanges.map((b) => <option key={b}>{b}</option>)}
        </select>
      </Field>

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <input type="hidden" {...register("startedAt", { valueAsNumber: true })} />

      <AnimatePresence>
        {status === "error" && (
          <motion.p role="alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-2xl bg-red-500/10 px-4 py-3 text-[14px] text-red-300">
            {serverError}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-4 pt-2 md:flex-row md:items-center md:justify-between">
        <p className="max-w-md text-[13px] text-muted">
          We use your details only to respond to this enquiry. See our <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>.
        </p>
        <motion.button
          type="submit"
          disabled={status === "sending"}
          whileTap={{ scale: 0.97 }}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 font-medium text-white transition-colors hover:bg-[#7C3AED] disabled:opacity-70"
        >
          {status === "sending" ? <><Loader2 className="size-4 animate-spin" aria-hidden /> Sending…</> : "Start a Conversation"}
        </motion.button>
      </div>
    </form>
  );
}
