"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IconX, IconExternalLink } from '@tabler/icons-react';
import { Sparkle } from "@phosphor-icons/react";
import { useState } from "react";

const ACCENT_COLOR = "#6EE7B7";
const BG_COLOR = "#050B14";
const TEXT_COLOR = "#FFFFFF";

interface Project {
  id: number;
  title: string;
  category: string;
  desc: string;
  image: string;
  tags: string[];
  demo: string;
}

interface AllProjectProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];  // ← Ajoute cette ligne
}

export default function AllProject({ isOpen, onClose, projects }: AllProjectProps) {
  const [filter, setFilter] = useState("All");
  
  const filteredProjects = projects.filter(p => filter === "All" || p.category === filter);
  
  const categories = ["All", ...new Set(projects.map(p => p.category))];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="absolute inset-0 bg-black/90 backdrop-blur-md" 
          />
          
          {/* Modal principal */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotateY: 90 }} 
            animate={{ scale: 1, opacity: 1, rotateY: 0 }} 
            exit={{ scale: 0.8, opacity: 0, rotateY: 90 }} 
            transition={{ type: "spring", damping: 20 }} 
            className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
            style={{ backgroundColor: BG_COLOR, border: `1px solid ${ACCENT_COLOR}30` }}
          >
            <button 
              onClick={onClose} 
              className="sticky top-6 float-right z-20 p-2 rounded-full hover:bg-white/10 transition-all mr-6 mt-6"
              style={{ backgroundColor: `${ACCENT_COLOR}20`, color: ACCENT_COLOR }}
            >
              <IconX size={24} />
            </button>

            <div className="p-8 md:p-12 pt-0">
              <motion.div 
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: ACCENT_COLOR }}>
                  All Projects
                </h2>
                <p className="text-white/70 text-lg">
                  Discover all my creative works and innovative solutions
                </p>
              </motion.div>

              {/* Filtres */}
              <div className="flex justify-center gap-4 mb-12 flex-wrap">
                {categories.map((cat) => (
                  <motion.button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    whileHover={{ y: -2 }}
                    className={`px-6 py-2 rounded-full transition-all ${filter === cat ? 'font-semibold border-b-2' : 'text-white/50'}`}
                    style={filter === cat ? { color: ACCENT_COLOR, borderBottomColor: ACCENT_COLOR } : {}}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>

              {/* Grille des projets */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer border"
                    style={{ background: `${TEXT_COLOR}08`, borderColor: `${ACCENT_COLOR}20` }}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image 
                        src={project.image} 
                        alt={project.title} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <span 
                        className="absolute top-4 left-4 px-3 py-1 text-xs rounded-full z-10"
                        style={{ backgroundColor: ACCENT_COLOR, color: BG_COLOR }}
                      >
                        {project.category}
                      </span>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 transition-colors group-hover:text-[#6EE7B7]">
                        {project.title}
                      </h3>
                      <p className="text-white/70 text-sm mb-4 line-clamp-2">
                        {project.desc}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span 
                            key={tag} 
                            className="text-xs px-2 py-1 rounded-full"
                            style={{ backgroundColor: `${ACCENT_COLOR}20`, color: ACCENT_COLOR }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm transition-all group-hover:gap-3"
                        style={{ color: ACCENT_COLOR }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Demo <IconExternalLink size={16} />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-12"
              >
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-full font-semibold transition-all hover:scale-105"
                  style={{ backgroundColor: ACCENT_COLOR, color: BG_COLOR }}
                >
                  Close
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}