"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IconX, IconArrowUpRight, IconEye } from '@tabler/icons-react';
import { useState } from "react";
import { ACCENT_COLOR, BG_COLOR } from "@/app/constants";
import { projectCases } from "@/app/data/projects";
import { useApp } from "@/app/providers/AppProviders";

interface AllProjectProps {
  isOpen: boolean;
  onClose: () => void;
}

const ALL = "All";

export default function AllProject({ isOpen, onClose }: AllProjectProps) {
  const { t, lang } = useApp();
  const [filter, setFilter] = useState(ALL);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredProjects = projectCases.filter(p => filter === ALL || p.category === filter);
  const categories = [ALL, ...new Set(projectCases.map(p => p.category))];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-7xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl custom-scroll"
            style={{
              backgroundColor: BG_COLOR,
              border: `1px solid color-mix(in srgb, ${ACCENT_COLOR} 13%, transparent)`,
              scrollbarWidth: 'thin',
              scrollbarColor: `color-mix(in srgb, ${ACCENT_COLOR} 25%, transparent) transparent`
            }}
          >
            <style jsx>{`
              .custom-scroll::-webkit-scrollbar { width: 5px; }
              .custom-scroll::-webkit-scrollbar-track { background: transparent; border-radius: 10px; margin: 8px 0; }
              .custom-scroll::-webkit-scrollbar-thumb { background: color-mix(in srgb, var(--accent) 19%, transparent); border-radius: 10px; }
              .custom-scroll::-webkit-scrollbar-thumb:hover { background: color-mix(in srgb, var(--accent) 38%, transparent); }
            `}</style>

            <button
              onClick={onClose}
              aria-label={t('common.close')}
              className="sticky top-4 float-right z-20 p-3 rounded-full hover:bg-white/10 transition-all mr-4 md:mr-6 mt-4"
              style={{ backgroundColor: `color-mix(in srgb, ${ACCENT_COLOR} 8%, transparent)`, color: ACCENT_COLOR }}
            >
              <IconX size={22} />
            </button>

            <div className="p-6 md:p-10 pt-0">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10 pt-4"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: ACCENT_COLOR }}>
                  {t('all.title')}
                </h2>
                <p className="text-white/60 text-base max-w-2xl mx-auto">
                  {t('all.subtitle')}
                </p>
              </motion.div>

              <div className="flex justify-center gap-2 mb-10 flex-wrap">
                {categories.map((cat) => (
                  <motion.button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      filter === cat ? 'text-[var(--bg)]' : 'text-white/50 hover:text-white/80'
                    }`}
                    style={filter === cat ? { backgroundColor: ACCENT_COLOR } : { backgroundColor: `color-mix(in srgb, ${ACCENT_COLOR} 6%, transparent)` }}
                  >
                    {cat === ALL ? t('projects.filterAll') : cat}
                  </motion.button>
                ))}
              </div>

              <div className="space-y-6">
                {filteredProjects.map((project, index) => {
                  const hovered = hoveredId === project.id;
                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 8 }}
                    >
                      <Link
                        href={`/projects/${project.slug}`}
                        onClick={onClose}
                        onMouseEnter={() => setHoveredId(project.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className="group block relative rounded-2xl overflow-hidden transition-all duration-300"
                        style={{
                          background: hovered ? `color-mix(in srgb, ${ACCENT_COLOR} 3%, transparent)` : 'transparent',
                          border: `1px solid ${hovered ? ACCENT_COLOR : `color-mix(in srgb, ${ACCENT_COLOR} 8%, transparent)`}`,
                        }}
                      >
                        <div className="flex flex-col md:flex-row gap-6 p-5 md:p-6">
                          <div className="relative w-full md:w-56 h-40 md:h-44 flex-shrink-0 rounded-xl overflow-hidden" style={{ backgroundColor: project.coverColor }}>
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 224px"
                              className={`${project.coverFit === 'contain' ? 'object-contain p-6' : 'object-cover'} transition-transform duration-500 group-hover:scale-105`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            <span
                              className="absolute bottom-3 left-3 px-3 py-1 text-xs font-semibold rounded-full"
                              style={{ backgroundColor: ACCENT_COLOR, color: BG_COLOR }}
                            >
                              {project.category}
                            </span>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: ACCENT_COLOR }}>
                                  {project.kind[lang]}{project.year ? ` · ${project.year}` : ''}
                                </p>
                                <h3 className="text-xl font-bold mb-1 transition-colors group-hover:text-[var(--accent)]">
                                  {project.title}
                                </h3>
                                <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                                  {project.desc[lang]}
                                </p>
                              </div>
                              <div
                                className="p-2 rounded-full transition-all flex-shrink-0"
                                style={{
                                  backgroundColor: hovered ? ACCENT_COLOR : `color-mix(in srgb, ${ACCENT_COLOR} 8%, transparent)`,
                                  color: hovered ? BG_COLOR : ACCENT_COLOR
                                }}
                              >
                                <IconArrowUpRight size={18} />
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-3">
                              {project.tags.slice(0, 4).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs px-2.5 py-1 rounded-full border"
                                  style={{
                                    borderColor: `color-mix(in srgb, ${ACCENT_COLOR} 13%, transparent)`,
                                    color: hovered ? ACCENT_COLOR : 'color-mix(in srgb, var(--fg) 50%, transparent)'
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                              {project.tags.length > 4 && (
                                <span className="text-xs px-2.5 py-1 rounded-full text-white/30">
                                  +{project.tags.length - 4}
                                </span>
                              )}
                            </div>

                            <div className="mt-4 flex items-center gap-2">
                              <span className="text-sm font-medium flex items-center gap-1.5" style={{ color: ACCENT_COLOR }}>
                                {t('projects.view')}
                                <IconEye size={16} className="transition-transform group-hover:translate-x-1" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
