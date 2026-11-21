'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkle, ArrowRight } from '@phosphor-icons/react';
import Allproject from '@/app/components/Allproject';
import { ACCENT_COLOR, BG_COLOR } from '@/app/constants';
import { featuredProjects } from '@/app/data/projects';
import { useApp } from '@/app/providers/AppProviders';

const ALL = 'All';

export const ProjectsSection = () => {
  const { t, lang } = useApp();
  const [filter, setFilter] = useState(ALL);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const projects = featuredProjects;
  const filteredProjects = projects.filter(p => filter === ALL || p.category === filter);

  const totalProjects = projects.length;
  const categories = [...new Set(projects.map(p => p.category))];

  return (
    <>
      <section id="projects" className="py-24 px-6 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/3 right-1/3 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: ACCENT_COLOR }}
          />
          <div
            className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-5"
            style={{ backgroundColor: ACCENT_COLOR }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full mb-4 border" style={{ borderColor: `color-mix(in srgb, ${ACCENT_COLOR} 13%, transparent)` }}>
              <span className="text-xs font-medium" style={{ color: ACCENT_COLOR }}>{t('projects.badge')}</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
              {t('projects.featured')}{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${ACCENT_COLOR}, color-mix(in srgb, ${ACCENT_COLOR} 38%, transparent))`
                }}
              >
                {t('projects.word')}
              </span>
            </h2>
            <p className="text-white/40 mt-4 text-lg">
              {t('projects.count').replace('{n}', String(totalProjects)).replace('{c}', String(categories.length))}
            </p>
          </motion.div>

          {/* Filters with counters */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {[ALL, ...categories].map((cat) => {
              const count = cat === ALL ? totalProjects : projects.filter(p => p.category === cat).length;
              return (
                <motion.button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === cat ? 'text-[var(--bg)]' : 'text-white/50 hover:text-white/80'
                  }`}
                  style={filter === cat ? { backgroundColor: ACCENT_COLOR } : { backgroundColor: `color-mix(in srgb, ${ACCENT_COLOR} 6%, transparent)` }}
                >
                  {cat === ALL ? t('projects.filterAll') : cat}
                  <span
                    className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full ${filter === cat ? 'bg-black/20' : 'bg-white/5'}`}
                    style={filter !== cat ? { color: ACCENT_COLOR } : {}}
                  >
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => {
              const hovered = hoveredId === project.id;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group relative"
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="block relative rounded-2xl overflow-hidden transition-all duration-500"
                    style={{
                      background: 'var(--surface)',
                      border: `1px solid ${hovered ? ACCENT_COLOR : `color-mix(in srgb, var(--fg) 8%, transparent)`}`,
                      transform: hovered ? 'translateY(-8px)' : 'none',
                      boxShadow: hovered
                        ? `0 20px 60px color-mix(in srgb, ${ACCENT_COLOR} 15%, transparent)`
                        : '0 1px 3px rgba(0,0,0,0.04)'
                    }}
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden" style={{ backgroundColor: project.coverColor }}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className={`${project.coverFit === 'contain' ? 'object-contain p-8' : 'object-cover'} transition-transform duration-700 group-hover:scale-110`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <span
                        className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full"
                        style={{ backgroundColor: ACCENT_COLOR, color: BG_COLOR }}
                      >
                        {project.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <p className="text-[11px] uppercase tracking-wider mb-1 text-white/40">
                        {project.kind[lang]}{project.year ? ` · ${project.year}` : ''}
                      </p>
                      <h3
                        className="text-lg font-bold mb-1 transition-colors"
                        style={{ color: hovered ? ACCENT_COLOR : 'var(--fg)' }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed line-clamp-2 mb-3">
                        {project.desc[lang]}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: `color-mix(in srgb, ${ACCENT_COLOR} 10%, transparent)`,
                              color: hovered ? ACCENT_COLOR : 'color-mix(in srgb, var(--fg) 60%, transparent)'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full text-white/30">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <span
                          className="text-xs font-medium transition-all flex items-center gap-1 group-hover:gap-2"
                          style={{ color: ACCENT_COLOR }}
                        >
                          {t('projects.view')}
                          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/30">{t('projects.none')}</p>
            </div>
          )}
        </div>
      </section>

      {/* View all projects */}
      <div className="flex justify-center my-16 px-6">
        <motion.button
          onClick={() => setShowAllProjects(true)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group relative px-10 py-4 rounded-full font-semibold transition-all duration-300 overflow-hidden"
          style={{ backgroundColor: ACCENT_COLOR, color: BG_COLOR }}
        >
          <span className="relative z-10 flex items-center gap-3">
            <span>{t('projects.viewAll')}</span>
            <Sparkle size={22} weight="duotone" className="transition-transform group-hover:rotate-90 duration-300" />
          </span>
        </motion.button>
      </div>

      <Allproject isOpen={showAllProjects} onClose={() => setShowAllProjects(false)} />
    </>
  );
};
