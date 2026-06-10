"use client";

import Allproject from './components/Allproject';

import { useState, useRef, useEffect } from "react";
import React from "react";
import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";
import { IconDownload } from '@tabler/icons-react';
import { Sparkle } from "@phosphor-icons/react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Server } from 'lucide-react';
import { 
  IconBrandReact, IconBrandNextjs, IconBrandTailwind, 
  IconBrandNodejs, IconBrandMysql, IconExternalLink, 
  IconX, IconBrandHtml5, IconBrandCss3, IconBrandJavascript,
  IconBrandVue, IconBrandLaravel, IconBrandPython,
  IconBrandVercel, IconCoffee, IconBrandCSharp,
  IconBrandSupabase, IconBrandVscode,
  IconBrandNetbeans, IconTerminal2, 
  IconDatabase, IconCode, IconFileCode, IconBrandGit,
} from '@tabler/icons-react';

import { 
  Gauge, Award, Briefcase
} from 'lucide-react';

import { 
  FileCode2, Code, Database, Terminal, Layout
} from "lucide-react";

// ========== COULEUR UNIQUE (vert-bleu clair) ==========
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

type MessageType = 'success' | 'error' | 'info' | 'warning' | '';

interface MessageBoxState {
  show: boolean;
  type: MessageType;
  message: string;
}

interface MessageBoxProps {
  message: string;
  type: MessageType;
  onClose: () => void;
  duration?: number;
}

const MessageBox = ({ message, type, onClose, duration = 5000 }: MessageBoxProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: -50, rotateX: -90 }}
      className="fixed top-24 right-6 z-[100] max-w-md p-4 rounded-2xl shadow-2xl border backdrop-blur-xl"
      style={{
        background: type === 'success' ? 'rgba(10, 26, 21, 0.9)' : 'rgba(139, 0, 0, 0.9)',
        borderColor: type === 'success' ? ACCENT_COLOR : '#ff4444',
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="flex items-start gap-3">
        <motion.div
          animate={{ rotate: type === 'success' ? [0, 360] : [0, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
          className={`p-2 rounded-full ${type === 'success' ? 'bg-[#6EE7B7]/20' : 'bg-red-500/20'}`}
        >
          {type === 'success' ? (
            <svg className="w-5 h-5 text-[#6EE7B7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </motion.div>
        <div className="flex-1">
          <h3 className={`font-semibold mb-1 ${type === 'success' ? 'text-[#6EE7B7]' : 'text-red-500'}`}>
            {type === 'success' ? 'Success!' : 'Error!'}
          </h3>
          <p className="text-sm text-white/80">{message}</p>
        </div>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-black/10 text-white/60 hover:text-white">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <motion.div
        className={`absolute bottom-0 left-0 h-1 rounded-b-xl ${type === 'success' ? 'bg-[#6EE7B7]' : 'bg-red-500'}`}
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: 5, ease: "linear" }}
      />
    </motion.div>
  );
};

const skillCategories = [
  { title: "Frontend", icon: <Layout />, skills: [{ name: "React", level: 40 }, { name: "Next.js", level: 60 }, { name: "Tailwind", level: 80 }, { name: "Vue.js", level: 70 }] },
  { title: "Backend", icon: <Terminal />, skills: [{ name: "Node.js", level: 50 }, { name: "Laravel", level: 75 }, { name: "Python", level: 85 }, { name: "C#", level: 75 }] },
  { title: "Databases", icon: <Database />, skills: [{ name: "MySQL", level: 90 }, { name: "PostgreSQL", level: 40 }, { name: "Supabase", level: 40 }] },
  { title: "DevOps", icon: <Code />, skills: [{ name: "GitHub", level: 85 }, { name: "Git", level: 80 }, { name: "Vercel", level: 50 }] },
];

const projects: Project[] = [
  { id: 1, title: "Aura Privée", category: "Fullstack", desc: "Modern e-commerce platform.", image: "/Image3.jpg", tags: ["React", "Node.js", "Tailwind"], demo: "https://auraprivefrontend.vercel.app/" },
  { id: 2, title: "Parent Malagasy", category: "Fullstack", desc: "Parental monitoring app.", image: "/parentmalagasy.jpg", tags: ["Vue.js", "Tailwind", "Chart.js"], demo: "https://parentmalagasy.netlify.app" },
  { id: 3, title: "Modern Portfolio", category: "Frontend", desc: "3D Portfolio with animations.", image: "/Image2.jpg", tags: ["Next.js", "Tailwind", "Framer"], demo: "#" }
];

// Composant 3D Card
const Card3D = ({ children, className = "", style = {}, onClick }: { 
  children: React.ReactNode; 
  className?: string; 
  style?: React.CSSProperties;
  onClick?: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateY(((x - centerX) / centerX) * 15);
    setRotateX(((centerY - y) / centerY) * 15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      style={{
        ...style,
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {children}
    </motion.div>
  );
};

// Composant 3D Floating Shape
const FloatingShape = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute w-32 h-32 rounded-full"
    style={{
      background: `radial-gradient(circle, ${ACCENT_COLOR}20, transparent)`,
      filter: 'blur(40px)',
    }}
    animate={{
      y: [0, -50, 0, 50, 0],
      x: [0, 30, -30, 20, 0],
      scale: [1, 1.2, 0.8, 1.1, 1],
    }}
    transition={{ duration: 12, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

export default function Home() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [messageBox, setMessageBox] = useState<MessageBoxState>({ show: false, type: '', message: '' });
  const [showAllProjects, setShowAllProjects] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setMessageBox({ show: true, type: 'success', message: 'Message sent successfully!' });
      formRef.current?.reset();
      setLoading(false);
    }, 1000);
  };

  const filteredProjects = projects.filter(p => filter === "All" || p.category === filter);

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ backgroundColor: BG_COLOR, color: TEXT_COLOR }}>
      <AnimatePresence>
        {messageBox.show && <MessageBox {...messageBox} onClose={() => setMessageBox({ show: false, type: '', message: '' })} />}
      </AnimatePresence>

      {/* Hero Section 3D */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden perspective-1000">
        {/* Fond 3D animé */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 50%, ${ACCENT_COLOR}15, transparent 70%)` }} />
          <FloatingShape delay={0} />
          <FloatingShape delay={4} />
          <FloatingShape delay={8} />
          
          {/* Grille 3D */}
          <div className="absolute inset-0" style={{ 
            backgroundImage: `linear-gradient(${ACCENT_COLOR}20 1px, transparent 1px), linear-gradient(90deg, ${ACCENT_COLOR}20 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            transform: 'rotateX(50deg) scale(2)',
            opacity: 0.1,
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-12 items-center">
            
            {/* Texte à gauche */}
            <motion.div
              style={{ opacity, scale }}
              className="space-y-6 text-center md:text-left"
            >
              {/* Badge 3D */}
              <motion.div
                initial={{ opacity: 0, y: -50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                className="inline-block px-4 py-2 rounded-full border backdrop-blur-sm"
                style={{ borderColor: `${ACCENT_COLOR}50`, background: `${ACCENT_COLOR}10` }}
              >
                <span className="text-sm" style={{ color: ACCENT_COLOR }}>✦ Available for work</span>
              </motion.div>

              {/* Titre principal */}
              <motion.h1
                initial={{ opacity: 0, y: 50, rotateX: 45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ type: "spring", stiffness: 80, delay: 0.4 }}
                className="text-4xl md:text-6xl font-bold"
                style={{ textShadow: `0 10px 30px ${ACCENT_COLOR}40` }}
              >
                Hello, I'm{" "}
                <span className="relative inline-block" style={{ color: ACCENT_COLOR }}>
                  JOBA
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1"
                    style={{ backgroundColor: ACCENT_COLOR }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                  />
                </span>
              </motion.h1>

              {/* Sous-titre */}
              <motion.h2
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="text-xl md:text-2xl"
              >
                <span style={{ color: ACCENT_COLOR }}>&lt;</span>
                Junior Fullstack Developer
                <span style={{ color: ACCENT_COLOR }}>/&gt;</span>
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-white/70 max-w-lg mx-auto md:mx-0"
              >
                I design and develop modern, high-performance web applications using Next.js, React, Node.js, Python, and Laravel.
              </motion.p>

              {/* Boutons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex gap-4 justify-center md:justify-start"
              >
                <motion.a
                  href="#projects"
                  className="px-6 py-3 rounded-full font-semibold relative overflow-hidden group"
                  style={{ backgroundColor: ACCENT_COLOR, color: BG_COLOR }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">View Projects</span>
                  <motion.div
                    className="absolute inset-0 bg-white/30"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.a>
                
                <motion.a
                  href="/cv.pdf"
                  download
                  className="px-6 py-3 rounded-full font-semibold border backdrop-blur-sm"
                  style={{ borderColor: ACCENT_COLOR, color: ACCENT_COLOR }}
                  whileHover={{ scale: 1.05, y: -5, backgroundColor: `${ACCENT_COLOR}20` }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download CV <IconDownload size={18} className="inline ml-2" />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Image avec animation 3D à droite */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 100, damping: 15 }}
              className="flex justify-center relative"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                {/* Cercles orbitaux */}
                <motion.div
                  className="absolute -inset-4 rounded-full border-2 border-dashed"
                  style={{ borderColor: `${ACCENT_COLOR}50` }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute -inset-8 rounded-full border"
                  style={{ borderColor: `${ACCENT_COLOR}30` }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute -inset-12 rounded-full border"
                  style={{ borderColor: `${ACCENT_COLOR}15` }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                />

                {/* Image principale */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src="/Images.jpg"
                    alt="JOBA Photo"
                    loading="eager"
                    fill
                    className="object-cover rounded-full shadow-2xl relative z-10"
                    style={{ border: `4px solid ${ACCENT_COLOR}` }}
                  />
                  
                  {/* Effet de brillance */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                  />
                </motion.div>

                {/* Badge développeur */}
                <motion.div
                  animate={{ x: [0, 8, -8, 0], y: [0, -12, 12, 0], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.15, rotate: 0 }}
                  className="absolute -bottom-6 -right-8 md:bottom-10 md:-right-12 px-4 py-2 rounded-full shadow-xl border-2 border-white flex items-center gap-2 z-30 whitespace-nowrap"
                  style={{ backgroundColor: ACCENT_COLOR, color: BG_COLOR }}
                >
                  <motion.span 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: BG_COLOR }}
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-xs md:text-sm font-bold tracking-wider">&lt; DEVELOPPER /&gt;</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 flex justify-center" style={{ borderColor: ACCENT_COLOR }}>
            <motion.div className="w-1 h-2 rounded-full mt-2" style={{ backgroundColor: ACCENT_COLOR }} animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
          </div>
        </motion.div>
      </section>

      {/* About Section 3D */}
      <section id="about" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl md:text-7xl font-bold">
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, ${ACCENT_COLOR}, ${ACCENT_COLOR}80)` }}>01.</span>
              <br />
              <span>Who Am I</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Terminal 3D */}
            <div className="relative rounded-2xl p-6 backdrop-blur-sm border" 
                style={{ background: `${TEXT_COLOR}08`, borderColor: `${ACCENT_COLOR}30` }}>
              <Card3D className="w-full h-full">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="space-y-3 font-mono text-sm">
                  <p><span style={{ color: ACCENT_COLOR }}>$</span> whoami</p>
                  <p className="text-white/70">Fullstack Developer passionate about impactful digital experiences.</p>
                  <p><span style={{ color: ACCENT_COLOR }}>$</span> skills --tech-stack</p>
                  <p className="text-white/70">React, Next.js, Node.js, Python, PHP, Laravel, Java, C#</p>
                  <motion.span className="inline-block w-2 h-4" style={{ backgroundColor: ACCENT_COLOR }} animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                </div>
              </Card3D>
            </div>

            {/* Stats 3D */}
            <div className="space-y-6">
              {[
                { label: "Experience", value: "2 Years", desc: "Fullstack Development", icon: Briefcase },
                { label: "Impact", value: "70%", desc: "Client Satisfaction", icon: Award },
                { label: "Performance", value: "90+", desc: "Lighthouse Score", icon: Gauge },
              ].map((stat, i) => (
                <div key={i} className="relative rounded-2xl p-6 border"
                  style={{ background: `${TEXT_COLOR}08`, borderColor: `${ACCENT_COLOR}30` }}>
                  <Card3D className="w-full h-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm uppercase tracking-wider" style={{ color: ACCENT_COLOR }}>{stat.label}</p>
                        <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
                        <p className="text-sm text-white/50 mt-1">{stat.desc}</p>
                      </div>
                      <div className="p-3 rounded-xl" style={{ backgroundColor: `${ACCENT_COLOR}20` }}>
                        <stat.icon size={24} style={{ color: ACCENT_COLOR }} />
                      </div>
                    </div>
                  </Card3D>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section 3D */}
      <section id="skills" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm tracking-wider mb-2" style={{ color: ACCENT_COLOR }}>• MY SKILLS •</p>
            <h2 className="text-5xl md:text-6xl font-bold">
              Creativity &{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, ${ACCENT_COLOR}, ${ACCENT_COLOR}80)` }}>Expertise</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="relative rounded-2xl p-6 border group"
                  style={{ background: `${TEXT_COLOR}08`, borderColor: `${ACCENT_COLOR}20` }}>
                <Card3D className="w-full h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl" style={{ backgroundColor: `${ACCENT_COLOR}20` }}>
                      <div style={{ color: ACCENT_COLOR }}>{cat.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold">{cat.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {cat.skills.map((skill, sIdx) => (
                      <div key={sIdx}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{skill.name}</span>
                          <span style={{ color: ACCENT_COLOR }}>{skill.level}%</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: `${TEXT_COLOR}20` }}>
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: `linear-gradient(90deg, ${ACCENT_COLOR}, ${ACCENT_COLOR}80)` }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.3 + sIdx * 0.1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card3D>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section 3D */}
      <section id="projects" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl md:text-7xl font-bold tracking-wider" style={{ color: ACCENT_COLOR }}>PROJECTS</h2>
          </motion.div>

          {/* Filters */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {["All", "Frontend", "Backend", "Fullstack"].map((cat) => (
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

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card3D key={project.id} className="group relative rounded-2xl overflow-hidden cursor-pointer border" 
                style={{ background: `${TEXT_COLOR}08`, borderColor: `${ACCENT_COLOR}20` }} 
                onClick={() => setSelectedProject(project)}>
                <div className="relative h-48 overflow-hidden">
                  <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs rounded-full" style={{ backgroundColor: ACCENT_COLOR, color: BG_COLOR }}>{project.category}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2" style={{ color: ACCENT_COLOR }}>{project.title}</h3>
                  <p className="text-white/70 text-sm mb-4 line-clamp-2">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${ACCENT_COLOR}20`, color: ACCENT_COLOR }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal - Projet individuel */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.8, opacity: 0, rotateY: 90 }} animate={{ scale: 1, opacity: 1, rotateY: 0 }} exit={{ scale: 0.8, opacity: 0, rotateY: 90 }} transition={{ type: "spring", damping: 20 }} className="relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl" style={{ backgroundColor: BG_COLOR, border: `1px solid ${ACCENT_COLOR}30` }}>
              <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 z-10 p-2 rounded-full hover:bg-white/10"><IconX size={20} /></button>
              <div className="grid md:grid-cols-2">
                <div className="relative h-80 md:h-full"><Image src={selectedProject.image} alt={selectedProject.title} fill className="object-cover" /></div>
                <div className="p-8">
                  <span className="text-xs uppercase tracking-wider" style={{ color: ACCENT_COLOR }}>Project</span>
                  <h2 className="text-3xl font-bold mt-2 mb-4">{selectedProject.title}</h2>
                  <p className="text-white/70 mb-6">{selectedProject.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tags.map((tag) => (<span key={tag} className="px-3 py-1 text-sm rounded-full" style={{ backgroundColor: `${ACCENT_COLOR}20`, color: ACCENT_COLOR }}>{tag}</span>))}
                  </div>
                  <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl transition" style={{ border: `2px solid ${ACCENT_COLOR}`, color: ACCENT_COLOR }}>Demo <IconExternalLink size={18} /></a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bouton View All Projects */}
      <div className="flex gap-4 mt-8 justify-center pb-12">
        <button
          onClick={() => setShowAllProjects(true)}
          className="text-[#FFFF] flex items-center gap-2 border border-[#21D375] dark:text-[#21D375] px-6 py-3 rounded-lg hover:bg-[#244539] hover:text-white transition group"
        >
          <span>View all projects</span>
          <Sparkle size={22} weight="duotone" className="group-hover:rotate-3 transition-transform" />
        </button>
      </div>

      <Allproject 
        isOpen={showAllProjects} 
        onClose={() => setShowAllProjects(false)} 
      />

      {/* Contact Section 3D */}
      <motion.section
        id="contact"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        className="max-w-2xl mx-auto my-32 rounded-3xl p-8 border backdrop-blur-xl relative overflow-hidden"
        style={{ background: `${TEXT_COLOR}05`, borderColor: `${ACCENT_COLOR}30` }}
      >
        <div className="relative z-10">
          <motion.div initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold">Contact Me</h2>
            <p className="text-white/70 mt-2">Feel free to reach out for collaborations or projects</p>
          </motion.div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" name="name" placeholder="Your Name" required className="w-full px-5 py-3 rounded-xl border bg-white/5 outline-none transition-all focus:border-[#6EE7B7]" style={{ borderColor: `${ACCENT_COLOR}30`, color: TEXT_COLOR }} />
              <input type="email" name="email" placeholder="Your Email" required className="w-full px-5 py-3 rounded-xl border bg-white/5 outline-none transition-all focus:border-[#6EE7B7]" style={{ borderColor: `${ACCENT_COLOR}30`, color: TEXT_COLOR }} />
            </div>
            <input type="text" name="subject" placeholder="Subject" required className="w-full px-5 py-3 rounded-xl border bg-white/5 outline-none transition-all focus:border-[#6EE7B7]" style={{ borderColor: `${ACCENT_COLOR}30`, color: TEXT_COLOR }} />
            <textarea name="message" rows={4} placeholder="Your Message" required className="w-full px-5 py-3 rounded-xl border bg-white/5 outline-none transition-all resize-none focus:border-[#6EE7B7]" style={{ borderColor: `${ACCENT_COLOR}30`, color: TEXT_COLOR }} />
            
            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-3 rounded-xl font-semibold relative overflow-hidden" style={{ backgroundColor: ACCENT_COLOR, color: BG_COLOR }}>
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
          </form>

          <div className="flex justify-center gap-4 mt-8">
            {[Github, Linkedin, Mail].map((Icon, i) => (
              <motion.a key={i} href="#" target="_blank" whileHover={{ scale: 1.1, y: -3, backgroundColor: ACCENT_COLOR, color: BG_COLOR }} className="p-3 rounded-full transition-all" style={{ backgroundColor: `${TEXT_COLOR}10`, color: TEXT_COLOR }}><Icon size={20} /></motion.a>
            ))}
          </div>
        </div>
      </motion.section>
    </main>
  );
}