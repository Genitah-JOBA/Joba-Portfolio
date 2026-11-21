'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, MousePointerClick } from 'lucide-react';
import { ACCENT_COLOR } from '@/app/constants';
import { getProjectBySlug, projectCases } from '@/app/data/projects';
import { useApp } from '@/app/providers/AppProviders';
import { ChoixEmit } from '@/app/components/ChoixEmit';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6 },
};

const line = 'color-mix(in srgb, var(--fg) 10%, transparent)';

const SectionLabel = ({ index, children }: { index: string; children: React.ReactNode }) => (
  <div className="md:sticky md:top-28">
    <p className="font-mono text-sm" style={{ color: ACCENT_COLOR }}>{index}</p>
    <h2 className="text-2xl md:text-3xl font-bold mt-1">{children}</h2>
  </div>
);

export const ProjectDetail = ({ slug }: { slug: string }) => {
  const { t, lang } = useApp();
  const [rolesOpen, setRolesOpen] = useState(false);
  const project = getProjectBySlug(slug);
  if (!project) return null;

  const index = projectCases.findIndex((p) => p.slug === slug);
  const prev = projectCases[(index - 1 + projectCases.length) % projectCases.length];
  const next = projectCases[(index + 1) % projectCases.length];

  const meta = [
    { label: t('detail.type'), value: project.kind[lang] },
    { label: t('detail.role'), value: project.role[lang] },
    { label: t('detail.year'), value: project.year ?? '—' },
    { label: t('detail.category'), value: project.category },
  ];

  return (
    <article className="relative overflow-hidden" style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}>
      {/* Decorative glow */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: ACCENT_COLOR }}
      />

      {/* ============ HERO ============ */}
      <header className="relative max-w-6xl mx-auto px-6 pt-12 md:pt-20">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[var(--accent)] transition-colors"
        >
          <ArrowLeft size={16} /> {t('detail.back')}
        </Link>

        <motion.div {...fadeUp} className="mt-10">
          <p className="text-xs md:text-sm uppercase tracking-[0.25em]" style={{ color: ACCENT_COLOR }}>
            {project.kind[lang]}{project.year ? ` — ${project.year}` : ''}
          </p>
          <h1 className="mt-4 text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[0.95] break-words">
            {project.title}
            <span style={{ color: ACCENT_COLOR }}>.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-2xl text-white/70 leading-snug">
            {project.tagline[lang]}
          </p>
        </motion.div>

        {/* Meta strip */}
        <motion.dl
          {...fadeUp}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 border-y"
          style={{ borderColor: line }}
        >
          {meta.map((m, i) => (
            <div
              key={m.label}
              className={`py-5 pr-4 ${i % 2 === 1 ? 'pl-4 md:pl-6' : ''} ${i >= 2 ? 'border-t md:border-t-0' : ''} ${i > 0 ? 'md:border-l md:pl-6' : ''}`}
              style={{ borderColor: line }}
            >
              <dt className="text-[11px] uppercase tracking-widest text-white/40">{m.label}</dt>
              <dd className="mt-1 font-medium">{m.value}</dd>
            </div>
          ))}
        </motion.dl>
      </header>

      {/* ============ COVER ============ */}
      <motion.div {...fadeUp} className="relative max-w-6xl mx-auto px-6 mt-12">
        <div
          className="relative aspect-[16/9] rounded-3xl overflow-hidden border"
          style={{ borderColor: line, backgroundColor: project.coverColor ?? 'var(--surface)' }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 1152px) 100vw, 1152px"
            className={project.coverFit === 'contain' ? 'object-contain p-10 md:p-16' : 'object-cover'}
          />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs rounded-full border"
              style={{ borderColor: `color-mix(in srgb, ${ACCENT_COLOR} 35%, transparent)`, color: ACCENT_COLOR }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ============ CONTEXT ============ */}
      <section className="max-w-6xl mx-auto px-6 mt-24 grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
        <SectionLabel index="01">{t('detail.context')}</SectionLabel>
        <motion.div {...fadeUp} className="space-y-5 text-lg leading-relaxed text-white/75">
          {project.context[lang].map((p, i) => (
            <p key={i} className={i === 0 ? 'text-xl md:text-2xl text-white font-medium leading-snug' : ''}>
              {p}
            </p>
          ))}
          <p className="text-base text-white/60">{project.desc[lang]}</p>
        </motion.div>
      </section>

      {/* ============ APPROACH ============ */}
      <section className="max-w-6xl mx-auto px-6 mt-24 grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
        <SectionLabel index="02">{t('detail.approach')}</SectionLabel>
        <ol className="space-y-4">
          {project.approach[lang].map((step, i) => (
            <motion.li
              key={i}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-5 p-5 md:p-6 rounded-2xl border"
              style={{ borderColor: line, backgroundColor: 'var(--surface)' }}
            >
              <span className="font-mono text-sm pt-0.5" style={{ color: ACCENT_COLOR }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="leading-relaxed text-white/80">{step}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="max-w-6xl mx-auto px-6 mt-24 grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
        <SectionLabel index="03">{t('detail.features')}</SectionLabel>
        <motion.ul {...fadeUp} className="grid sm:grid-cols-2 gap-x-8">
          {project.features[lang].map((f) => (
            <li key={f} className="flex items-start gap-3 py-4 border-b" style={{ borderColor: line }}>
              <span
                className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `color-mix(in srgb, ${ACCENT_COLOR} 15%, transparent)`, color: ACCENT_COLOR }}
              >
                <Check size={14} strokeWidth={3} />
              </span>
              <span className="text-white/80">{f}</span>
            </li>
          ))}
        </motion.ul>
      </section>

      {/* ============ ROLE-BASED INTERFACES (Gestion EMIT) ============ */}
      {project.slug === 'gestion-emit' && (
        <section className="max-w-6xl mx-auto px-6 mt-16">
          <motion.div
            {...fadeUp}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 md:p-8 rounded-3xl border"
            style={{ borderColor: `color-mix(in srgb, ${ACCENT_COLOR} 30%, transparent)`, backgroundColor: 'var(--surface)' }}
          >
            <div>
              <h3 className="text-xl font-bold">{t('detail.explore')}</h3>
              <p className="text-white/60 mt-1">{t('detail.exploreText')}</p>
            </div>
            <button
              onClick={() => setRolesOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition hover:opacity-90"
              style={{ backgroundColor: ACCENT_COLOR, color: 'var(--bg)' }}
            >
              <MousePointerClick size={18} /> {t('detail.explore')}
            </button>
          </motion.div>
          <ChoixEmit isOpen={rolesOpen} onClose={() => setRolesOpen(false)} />
        </section>
      )}

      {/* ============ GALLERY ============ */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 mt-24">
          <SectionLabel index="04">{t('detail.gallery')}</SectionLabel>
          <div className={`mt-8 grid gap-6 ${project.gallery.length > 1 ? 'md:grid-cols-2' : ''}`}>
            {project.gallery.map((src, i) => (
              <motion.div
                key={src}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative rounded-2xl overflow-hidden border ${
                  project.gallery!.length % 2 === 1 && i === 0 && project.gallery!.length > 1 ? 'md:col-span-2' : ''
                }`}
                style={{ borderColor: line, backgroundColor: 'var(--surface)' }}
              >
                <Image
                  src={src}
                  alt={`${project.title} — ${i + 1}`}
                  width={1600}
                  height={1000}
                  sizes="(max-width: 768px) 100vw, 1152px"
                  className="w-full h-auto"
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ============ CTA BAND ============ */}
      <section className="max-w-6xl mx-auto px-6 mt-28">
        <motion.div
          {...fadeUp}
          className="relative overflow-hidden rounded-3xl px-8 py-14 md:px-16 md:py-20"
          style={{ backgroundColor: ACCENT_COLOR, color: 'var(--bg)' }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
              backgroundSize: '22px 22px',
            }}
          />
          <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight">
              {t('detail.ctaTitle1')}
              <br />
              <span className="italic font-light">{t('detail.ctaTitle2')}</span>
            </h2>
            <div className="max-w-xs">
              <p className="opacity-80 mb-5">{t('detail.ctaText')}</p>
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition"
                style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}
              >
                {t('detail.ctaButton')}
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ============ PREV / NEXT ============ */}
      <nav className="max-w-6xl mx-auto px-6 mt-16 mb-24 grid grid-cols-2 gap-4" aria-label={t('nav.projects')}>
        {[
          { p: prev, label: t('detail.prev'), align: 'left' as const },
          { p: next, label: t('detail.next'), align: 'right' as const },
        ].map(({ p, label, align }) => (
          <Link
            key={align}
            href={`/projects/${p.slug}`}
            className={`group p-5 md:p-6 rounded-2xl border transition-colors hover:border-[var(--accent)] ${align === 'right' ? 'text-right' : ''}`}
            style={{ borderColor: line, backgroundColor: 'var(--surface)' }}
          >
            <span className={`flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 ${align === 'right' ? 'justify-end' : ''}`}>
              {align === 'left' && <ArrowLeft size={14} />}
              {label}
              {align === 'right' && <ArrowRight size={14} />}
            </span>
            <span className="block mt-2 text-lg md:text-2xl font-bold group-hover:text-[var(--accent)] transition-colors">
              {p.title}
            </span>
          </Link>
        ))}
      </nav>
    </article>
  );
};
