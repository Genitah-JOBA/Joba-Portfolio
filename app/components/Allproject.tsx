"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IconX, IconExternalLink } from '@tabler/icons-react';
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

// TOUS LES PROJETS (existants + futurs)
const allProjects: Project[] = [
  { id: 1, title: "Aura Privée", category: "Fullstack", desc: "Modern e-commerce platform.", image: "/Image3.jpg", tags: ["React", "Node.js", "Tailwind"], demo: "https://auraprivefrontend.vercel.app/" },
  { id: 2, title: "Parent Malagasy", category: "Fullstack", desc: "Parental monitoring app.", image: "/parentmalagasy.jpg", tags: ["Vue.js", "Tailwind", "Chart.js"], demo: "https://parentmalagasy.netlify.app" },
  { id: 3, title: "Modern Portfolio", category: "Frontend", desc: "3D Portfolio with animations.", image: "/Image2.jpg", tags: ["Next.js", "Tailwind", "Framer"], demo: "#" },
  { id: 4, title: "Invitation Anniversaire", category: "Frontend", desc: "Invitation interactive avec compte à rebours pour fête d'anniversaire.", image: "/Anniversaire.jpg", tags: ["HTML", "CSS", "JavaScript", "Countdown"], demo: "https://genitah-joba.github.io/InvitationAnniv/" },
  // AJOUTE TES FUTURS PROJETS ICI
  // { id: 5, title: "Nouveau Projet", category: "Fullstack", desc: "Description...", image: "/image.jpg", tags: ["Tag1", "Tag2"], demo: "#" },
];

interface AllProjectProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AllProject({ isOpen, onClose }: AllProjectProps) {
  const [filter, setFilter] = useState("All");
  
  const filteredProjects = allProjects.filter(p => filter === "All" || p.category === filter);
  
  const categories = ["All", ...new Set(allProjects.map(p => p.category))];

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
                  <motion.a
                    key={project.id}
                    href={project.demo}
                    target={project.demo.startsWith('http') ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer border block"
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
                      
                      <span className="inline-flex items-center gap-2 text-sm transition-all group-hover:gap-3" style={{ color: ACCENT_COLOR }}>
                        View Demo <IconExternalLink size={16} />
                      </span>
                    </div>
                  </motion.a>
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