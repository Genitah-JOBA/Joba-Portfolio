'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { IconX, IconExternalLink } from '@tabler/icons-react';
import { Project } from '@/app/types';
import { ACCENT_COLOR, BG_COLOR } from '@/app/constants';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        onClick={onClose} 
        className="absolute inset-0 bg-black/80 backdrop-blur-md" 
      />
      <motion.div 
        initial={{ scale: 0.8, opacity: 0, rotateY: 90 }} 
        animate={{ scale: 1, opacity: 1, rotateY: 0 }} 
        exit={{ scale: 0.8, opacity: 0, rotateY: 90 }} 
        transition={{ type: "spring", damping: 20 }} 
        className="relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl" 
        style={{ backgroundColor: BG_COLOR, border: `1px solid ${ACCENT_COLOR}30` }}
      >
        <button onClick={onClose} className="absolute top-6 right-6 z-10 p-2 rounded-full hover:bg-white/10">
          <IconX size={20} />
        </button>
        <div className="grid md:grid-cols-2">
          <div className="relative h-80 md:h-full">
            <Image src={project.image} alt={project.title} fill className="object-cover" />
          </div>
          <div className="p-8">
            <span className="text-xs uppercase tracking-wider" style={{ color: ACCENT_COLOR }}>Project</span>
            <h2 className="text-3xl font-bold mt-2 mb-4">{project.title}</h2>
            <p className="text-white/70 mb-6">{project.desc}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-sm rounded-full" style={{ backgroundColor: `${ACCENT_COLOR}20`, color: ACCENT_COLOR }}>
                  {tag}
                </span>
              ))}
            </div>
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl transition" style={{ border: `2px solid ${ACCENT_COLOR}`, color: ACCENT_COLOR }}>
              Demo <IconExternalLink size={18} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};