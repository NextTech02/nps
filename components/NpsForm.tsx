"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ASPECT_OPTIONS,
  GENDER_OPTIONS,
  content,
  type Lang,
  type Option,
} from "@/lib/content";
import { NPS_TABLE, isSupabaseConfigured, supabase } from "@/lib/supabase";
import NpsScale from "./NpsScale";
import StarRating from "./StarRating";

type FormState = {
  gender: string;
  birthDate: string;
  city: string;
  department: string;
  country: string;
  experienceRating: number;
  aspect: string;
  nps: number;
  improvements: string;
  community: string;
};

const initialState: FormState = {
  gender: "",
  birthDate: "",
  city: "",
  department: "",
  country: "",
  experienceRating: 0,
  aspect: "",
  nps: 0,
  improvements: "",
  community: "",
};

type Status = "idle" | "submitting" | "success" | "error";

/* ------------------------------ subcomponentes ------------------------------ */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-fcp-purple-2/60 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-fcp-lavender-2">
      {children}
    </span>
  );
}

function Section({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-fcp-purple-2/40 bg-fcp-dark/70 p-6 shadow-lg shadow-black/20 backdrop-blur-sm sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-fcp-gold text-sm font-bold text-fcp-night">
          {index}
        </span>
        <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">
          {title}
        </h2>
      </div>
      <div className="space-y-7">{children}</div>
    </section>
  );
}

function Field({
  label,
  required,
  optionalLabel,
  requiredLabel,
  fill,
  children,
}: {
  label: string;
  required?: boolean;
  optionalLabel: string;
  requiredLabel: string;
  /** Ocupa toda a altura da célula e ancora o input na base (alinha colunas). */
  fill?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={fill ? "flex h-full flex-col gap-3" : "space-y-3"}>
      <div className="flex flex-wrap items-center gap-2">
        <label className="text-[15px] font-medium leading-snug text-white">
          {label}
        </label>
        {required ? (
          <span className="text-fcp-gold" aria-hidden>
            *
          </span>
        ) : (
          <Badge>{optionalLabel}</Badge>
        )}
        {required && <span className="sr-only">({requiredLabel})</span>}
      </div>
      {fill ? <div className="mt-auto">{children}</div> : children}
    </div>
  );
}

function RadioOptions({
  name,
  options,
  value,
  lang,
  onChange,
}: {
  name: string;
  options: Option[];
  value: string;
  lang: Lang;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <label
            key={opt.value}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
              selected
                ? "border-fcp-gold bg-fcp-gold/10 text-white"
                : "border-fcp-purple-2/50 bg-fcp-purple/30 text-fcp-lavender-2 hover:border-fcp-lavender hover:text-white"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={selected}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                selected ? "border-fcp-gold" : "border-fcp-lavender-2/70"
              }`}
            >
              {selected && (
                <span className="h-2 w-2 rounded-full bg-fcp-gold" />
              )}
            </span>
            {opt[lang]}
          </label>
        );
      })}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-fcp-purple-2/50 bg-fcp-purple/30 px-4 py-3 text-sm text-white placeholder:text-fcp-lavender-2/60 transition-colors focus:border-fcp-gold focus:bg-fcp-purple/50";

/* --------------------------------- form ----------------------------------- */

export default function NpsForm() {
  const [lang, setLang] = useState<Lang>("es");
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>("idle");
  const [showErrors, setShowErrors] = useState(false);

  const t = content[lang];

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const missingRequired =
    form.gender === "" ||
    form.birthDate === "" ||
    form.city.trim() === "" ||
    form.department.trim() === "" ||
    form.country.trim() === "" ||
    form.experienceRating === 0 ||
    form.aspect === "" ||
    form.nps === 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (missingRequired) {
      setShowErrors(true);
      document
        .getElementById("required-error")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      console.error(
        "Supabase não configurado: defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY em .env.local",
      );
      setStatus("error");
      return;
    }

    setStatus("submitting");

    const { error } = await supabase.from(NPS_TABLE).insert({
      language: lang,
      gender: form.gender || null,
      birth_date: form.birthDate || null,
      city: form.city.trim() || null,
      department: form.department.trim() || null,
      country: form.country.trim() || null,
      experience_rating: form.experienceRating,
      valued_aspect: form.aspect,
      nps_score: form.nps,
      improvements: form.improvements.trim() || null,
      community_meaning: form.community.trim() || null,
    });

    if (error) {
      console.error("Erro ao salvar resposta:", error);
      setStatus("error");
      return;
    }

    setStatus("success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ----------------------------- tela de sucesso ---------------------------- */
  if (status === "success") {
    return (
      <div className="fcp-fade-up mx-auto flex max-w-xl flex-col items-center px-5 py-24 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-fcp-gold text-fcp-night">
          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          {t.thanksTitle}
        </h1>
        <p className="mt-3 text-fcp-lavender-2">{t.thanksText}</p>
        <button
          type="button"
          onClick={() => {
            setForm(initialState);
            setStatus("idle");
            setShowErrors(false);
          }}
          className="mt-8 rounded-full border border-fcp-purple-2/60 px-6 py-2.5 text-sm font-medium text-fcp-lavender-2 transition-colors hover:border-fcp-lavender hover:text-white"
        >
          {t.thanksBack}
        </button>
      </div>
    );
  }

  /* -------------------------------- formulário ------------------------------ */
  return (
    <div className="mx-auto max-w-2xl px-5 py-10 sm:py-16">
      {/* seletor de idioma */}
      <div className="mb-8 flex justify-end">
        <div className="inline-flex rounded-full border border-fcp-purple-2/60 bg-fcp-dark/60 p-1">
          {(["es", "en"] as Lang[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                lang === l
                  ? "bg-fcp-gold text-fcp-night"
                  : "text-fcp-lavender-2 hover:text-white"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* cabeçalho com logo + introdução */}
      <header className="mb-12 text-center">
        <Image
          src="/logo_FCP.png"
          alt="Federación Colombiana de Póker"
          width={300}
          height={120}
          priority
          className="mx-auto h-auto w-56 sm:w-64"
        />
        <p className="mt-8 inline-block rounded-full border border-fcp-gold/40 bg-fcp-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-fcp-peach">
          {t.intro.eyebrow}
        </p>
        <h1 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">
          {t.intro.title}
        </h1>
        <div className="mt-5 space-y-3 text-sm leading-relaxed text-fcp-lavender-2 sm:text-base">
          {t.intro.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* 1 · Dados gerais */}
        <Section index={1} title={t.sections.general}>
          <Field
            label={t.q.gender}
            required
            optionalLabel={t.optional}
            requiredLabel={t.required}
          >
            <RadioOptions
              name="gender"
              options={GENDER_OPTIONS}
              value={form.gender}
              lang={lang}
              onChange={(v) => set("gender", v)}
            />
          </Field>

          <Field
            label={t.q.birthDate}
            required
            optionalLabel={t.optional}
            requiredLabel={t.required}
          >
            <input
              type="date"
              value={form.birthDate}
              max={new Date().toISOString().slice(0, 10)}
              onChange={(e) => set("birthDate", e.target.value)}
              className={`${inputClass} max-w-xs [color-scheme:dark]`}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field
              label={t.q.city}
              required
              optionalLabel={t.optional}
              requiredLabel={t.required}
              fill
            >
              <input
                type="text"
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                className={inputClass}
                autoComplete="address-level2"
              />
            </Field>
            <Field
              label={t.q.department}
              required
              optionalLabel={t.optional}
              requiredLabel={t.required}
              fill
            >
              <input
                type="text"
                value={form.department}
                onChange={(e) => set("department", e.target.value)}
                className={inputClass}
                autoComplete="address-level1"
              />
            </Field>
            <Field
              label={t.q.country}
              required
              optionalLabel={t.optional}
              requiredLabel={t.required}
              fill
            >
              <input
                type="text"
                value={form.country}
                onChange={(e) => set("country", e.target.value)}
                className={inputClass}
                autoComplete="country-name"
              />
            </Field>
          </div>
        </Section>

        {/* 2 · Experiência geral */}
        <Section index={2} title={t.sections.experience}>
          <Field
            label={t.q.experienceRating}
            required
            optionalLabel={t.optional}
            requiredLabel={t.required}
          >
            <StarRating
              value={form.experienceRating}
              onChange={(v) => set("experienceRating", v)}
            />
          </Field>

          <Field
            label={t.q.aspect}
            required
            optionalLabel={t.optional}
            requiredLabel={t.required}
          >
            <RadioOptions
              name="aspect"
              options={ASPECT_OPTIONS}
              value={form.aspect}
              lang={lang}
              onChange={(v) => set("aspect", v)}
            />
          </Field>
        </Section>

        {/* 3 · NPS */}
        <Section index={3} title={t.sections.nps}>
          <Field
            label={t.q.nps}
            required
            optionalLabel={t.optional}
            requiredLabel={t.required}
          >
            <NpsScale
              value={form.nps}
              onChange={(v) => set("nps", v)}
              lowLabel={t.npsLow}
              highLabel={t.npsHigh}
            />
          </Field>
        </Section>

        {/* 4 · Melhorias */}
        <Section index={4} title={t.sections.improvements}>
          <Field
            label={t.q.improvements}
            optionalLabel={t.optional}
            requiredLabel={t.required}
          >
            <textarea
              value={form.improvements}
              onChange={(e) => set("improvements", e.target.value)}
              rows={4}
              placeholder={t.openPlaceholder}
              className={`${inputClass} resize-y`}
            />
          </Field>
        </Section>

        {/* 5 · Comunidade */}
        <Section index={5} title={t.sections.community}>
          <Field
            label={t.q.community}
            optionalLabel={t.optional}
            requiredLabel={t.required}
          >
            <textarea
              value={form.community}
              onChange={(e) => set("community", e.target.value)}
              rows={4}
              placeholder={t.openPlaceholder}
              className={`${inputClass} resize-y`}
            />
          </Field>
        </Section>

        {/* erros + envio */}
        {showErrors && missingRequired && (
          <p
            id="required-error"
            className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
          >
            {t.validationError}
          </p>
        )}
        {status === "error" && (
          <p className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {t.submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-full bg-fcp-gold py-4 text-base font-bold text-fcp-night transition-all hover:bg-fcp-peach disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? t.submitting : t.submit}
        </button>

        <p className="pb-6 text-center text-xs text-fcp-lavender-2/60">
          Federación Colombiana de Póker · CCP Barranquilla
        </p>
      </form>
    </div>
  );
}
