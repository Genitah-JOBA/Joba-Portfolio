"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import React from "react";
import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";
import { IconDownload } from '@tabler/icons-react';
import { Sparkle } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { Server } from 'lucide-react';
import { 
  IconBrandReact, IconBrandNextjs, IconBrandTailwind, 
  IconBrandNodejs, IconBrandMysql, IconBrandGithub, IconExternalLink, 
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
  FileCode2, Layout, 
} from "lucide-react";

// Types simplifiés
type MessageType = 'success' | 'error';
interface Project {
  id: number;
  title: string;
  category: string;
  desc: string;
  image: string;
  tags: string[];
  demo: string;
}

// ================= COMPOSANTS OPTIMISÉS =================

// Message box simplifié - sans animations lourdes
const MessageBox = ({ message, type, onClose, dark = false }: { message: string; type: MessageType; onClose: () => void; dark?: boolean }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-24 right-6 z-[100] max-w-md p-4 rounded-xl shadow-2xl border
      ${type === 'success' 
        ? dark ? 'bg-[#244539] border-[#21D375]' : 'bg-white border-[#A2CA6C]'
        : dark ? 'bg-red-900/90 border-red-500' : 'bg-red-50 border-red-500'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${type === 'success' ? (dark ? 'bg-[#21D375]/20' : 'bg-[#A2CA6C]/20') : 'bg-red-500/20'}`}>
          {type === 'success' ? (
            <svg className={`w-5 h-5 ${dark ? 'text-[#21D375]' : 'text-[#A2CA6C]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <h3 className={`font-semibold mb-1 ${type === 'success' ? (dark ? 'text-[#21D375]' : 'text-[#A2CA6C]') : 'text-red-500'}`}>
            {type === 'success' ? 'Success!' : 'Error!'}
          </h3>
          <p className={`text-sm ${dark ? 'text-white/80' : 'text-slate-700'}`}>{message}</p>
        </div>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-black/10">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Version optimisée des particules - beaucoup moins
const ParticlesOptimized = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  if (!isMounted) return null;
  
  // Réduit de 20 à 8 particules
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-[#21D375]/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </>
  );
};

// Données
const skillCategories = [
  {
    title: "Frontend",
    icon: <Layout className="text-[#21D375]" />,
    skills: [
      { name: "HTML", level: 90, icon: <IconBrandHtml5 size={18} /> },
      { name: "CSS", level: 85, icon: <IconBrandCss3 size={18} /> },
      { name: "JavaScript", level: 80, icon: <IconBrandJavascript size={18} /> },
      { name: "React", level: 40, icon: <IconBrandReact size={18} /> },
      { name: "Next.js", level: 60, icon: <IconBrandNextjs size={18} /> },
      { name: "Tailwind", level: 80, icon: <IconBrandTailwind size={18} /> },
      { name: "Vue.js", level: 70, icon: <IconBrandVue size={18} /> },
    ],
  },
  {
    title: "Backend",
    icon: <FileCode2 className="text-[#21D375]" />,
    skills: [
      { name: "Node.js", level: 50, icon: <IconBrandNodejs size={18} /> },
      { name: "Laravel", level: 75, icon: <IconBrandLaravel size={18} /> },
      { name: "Java", level: 70, icon: <IconCoffee size={18} /> },
      { name: "Python", level: 85, icon: <IconBrandPython size={18} /> },
      { name: "C#", level: 75, icon: <IconBrandCSharp size={20} stroke={2} /> },
    ],
  },
  {
    title: "Databases",
    icon: <Database className="text-[#21D375]" />,
    skills: [
      { name: "MySQL", level: 90, icon: <IconBrandMysql size={18} /> },
      { name: "PostgreSQL", level: 40, icon: <Database size={18} /> },
      { name: "Supabase", level: 40, icon: <IconBrandSupabase size={18} /> },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: <Code className="text-[#21D375]" />,
    skills: [
      { name: "GitHub", level: 85, icon: <IconBrandGithub size={18} /> },
      { name: "Git", level: 80, icon: <IconBrandGit size={18} /> },
      { name: "Vercel", level: 50, icon: <IconBrandVercel size={18} /> },
      { name: "Render", level: 30, icon: <Server size={18} /> },
    ],
  },
  {
    title: "IDEs & Editors",
    icon: <FileCode2 className="text-[#21D375]" />,
    skills: [
      { name: "VS Code", level: 90, icon: <IconBrandVscode size={18} /> },
      { name: "NetBeans", level: 80, icon: <IconBrandNetbeans size={18} /> },
    ],
  },
];

const projects = [
  {
    id: 1,
    title: "Aura Privée",
    category: "Fullstack",
    desc: "Modern e-commerce platform for exclusive products.",
    image: "/Image3.jpg",
    tags: ["React", "Node.js", "Tailwind", "PostgreSQL"],
    demo: "https://auraprivefrontend.vercel.app/"
  },
  {
    id: 2,
    title: "Parent Malagasy",
    category: "Fullstack",
    desc: "Parental monitoring app for children 0-12 years.",
    image: "/parentmalagasy.jpg",
    tags: ["Vue.js", "Tailwind CSS", "Chart.js"],
    demo: "https://parentmalagasy.netlify.app",
  },
  {
    id: 3,
    title: "Modern Portfolio",
    category: "Frontend",
    desc: "Modern portfolio with smooth animations.",
    image: "/Image2.jpg",
    tags: ["Next.js", "Tailwind", "Framer"],
    demo: "#"
  }
];

export default function Home() {
  const [dark] = useState(true);
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [messageBox, setMessageBox] = useState<{ show: boolean; type: MessageType; message: string }>({ show: false, type: 'success', message: '' });
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    setLoading(true);
    
    try {
      const formData = new FormData(formRef.current);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
        }),
      });
      
      if (response.ok) {
        setMessageBox({ show: true, type: 'success', message: 'Message sent successfully!' });
        formRef.current.reset();
      } else {
        setMessageBox({ show: true, type: 'error', message: 'Error sending message.' });
      }
    } catch (error) {
      setMessageBox({ show: true, type: 'error', message: 'Error sending message.' });
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = useMemo(() => {
    return filter === "All" ? projects : projects.filter(p => p.category === filter);
  }, [filter]);

  return (
    <main className="bg-[#244539] text-white">
      <AnimatePresence>
        {messageBox.show && <MessageBox message={messageBox.message} type={messageBox.type} dark={dark} onClose={() => setMessageBox({ show: false, type: 'success', message: '' })} />}
      </AnimatePresence>

      {/* SECTION ACCUEIL - SIMPLIFIÉE */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        {/* Fond simplifié - plus de grille animée lourde */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_#21D37520_1px,_transparent_0)] bg-[length:50px_50px] opacity-30" />
        <ParticlesOptimized />

        <div className="max-w-7xl mx-auto flex flex-col-reverse md:grid md:grid-cols-2 gap-10 items-center relative z-10">
          {/* Texte - animations réduites */}
          <div className="text-center md:text-left">
            <div className="inline-block bg-[#21D375] text-white px-3 py-1 rounded-full text-xs mb-6">
              ✦ Available for work
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Hello, I'm 
              <span className="text-[#21D375] block md:inline-block">
                JOBA Razafindrasoa Genitah
              </span>
            </h1>

            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              &lt; Junior Fullstack Developer /&gt;
            </h2>

            <p className="text-gray-300 mb-6 max-w-lg">
              I design and develop modern, high-performance web applications using React, Next.js, Node.js, Python, and Laravel.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a href="#projects" className="flex items-center gap-2 border border-[#21D375] px-6 py-3 rounded-lg hover:bg-[#21D375] hover:text-[#244539] transition">
                View my projects <Sparkle size={18} />
              </a>
              <a href="/cv.pdf" download className="flex items-center gap-2 border border-[#21D375] px-6 py-3 rounded-lg hover:bg-[#21D375] hover:text-[#244539] transition">
                <IconDownload size={18} /> Download CV
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <div className="relative w-60 h-60 md:w-80 md:h-80">
              <div className="relative w-full h-full rounded-full border-4 border-[#21D375] overflow-hidden">
                <Image src="/Images.jpg" alt="JOBA" fill className="object-cover" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Séparateur */}
      <div className="flex justify-center my-8">
        <div className="w-20 h-px bg-[#21D375]/40" />
      </div>

      {/* SECTION ABOUT - SIMPLIFIÉE */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold">
              <span className="text-[#21D375]">01.</span>
              <br />Who Am I
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="bg-white/5 rounded-2xl p-6">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="space-y-4 font-mono">
                <p><span className="text-[#21D375]">$</span> whoami<br/><span className="text-gray-400">Fullstack Developer passionate about creating impactful digital experiences.</span></p>
                <p><span className="text-[#21D375]">$</span> skills<br/><span className="text-gray-400">React, Next.js, Node.js, Python, PHP, Laravel, Java, C#</span></p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 rounded-2xl p-6">
                <div className="flex justify-between">
                  <div><p className="text-[#21D375] text-sm">Experience</p><h3 className="text-3xl font-bold">2 Years</h3></div>
                  <Briefcase size={28} className="text-[#21D375]" />
                </div>
              </div>
              <div className="bg-white/5 rounded-2xl p-6">
                <div className="flex justify-between">
                  <div><p className="text-[#21D375] text-sm">Impact</p><h3 className="text-3xl font-bold">70%</h3></div>
                  <Award size={28} className="text-[#21D375]" />
                </div>
              </div>
              <div className="bg-white/5 rounded-2xl p-6">
                <div className="flex justify-between">
                  <div><p className="text-[#21D375] text-sm">Performance</p><h3 className="text-3xl font-bold">90+</h3></div>
                  <Gauge size={28} className="text-[#21D375]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Séparateur */}
      <div className="flex justify-center my-8">
        <div className="w-20 h-px bg-[#21D375]/40" />
      </div>

      {/* SECTION SKILLS */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#21D375] text-sm">• MY SKILLS •</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2">Creativity & Expertise</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition">
                <div className="text-3xl mb-4">{cat.icon}</div>
                <h3 className="text-xl font-bold mb-4">{cat.title}</h3>
                <div className="space-y-3">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="flex items-center gap-2"><span className="text-[#21D375]">{skill.icon}</span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-[#21D375] rounded-full" style={{ width: `${skill.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Séparateur */}
      <div className="flex justify-center my-8">
        <div className="w-20 h-px bg-[#21D375]/40" />
      </div>

      {/* SECTION PROJECTS */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-light tracking-wider text-[#21D375]">PROJECTS</h2>
          </div>

          {/* Filtres */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {["All", "Frontend", "Backend", "Fullstack"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-sm transition ${filter === cat ? "text-[#21D375] border-b-2 border-[#21D375]" : "text-gray-400 hover:text-[#21D375]"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grille projets */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group bg-white/5 rounded-2xl overflow-hidden cursor-pointer hover:bg-white/10 transition"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#21D375] text-black text-xs font-medium rounded-full">
                    {project.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-[#21D375] transition">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-[#21D375]/20 text-[#21D375] rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal projet */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div onClick={() => setSelectedProject(null)} className="absolute inset-0 bg-black/70" />
            <div className="relative bg-[#1a2e28] max-w-4xl w-full rounded-2xl overflow-hidden">
              <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 text-gray-400 hover:text-[#21D375] z-10">
                <IconX size={24} />
              </button>
              <div className="grid md:grid-cols-2">
                <div className="relative h-80 md:h-full">
                  <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-cover" />
                </div>
                <div className="p-8">
                  <span className="text-[#21D375] text-xs uppercase">Project</span>
                  <h2 className="text-2xl font-bold mt-2 mb-4">{selectedProject.title}</h2>
                  <p className="text-gray-300 mb-6">{selectedProject.desc}</p>
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-[#21D375]/20 text-[#21D375] text-sm rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#21D375] text-[#21D375] rounded-xl hover:bg-[#21D375] hover:text-black transition">
                    <IconExternalLink size={18} /> Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Séparateur */}
      <div className="flex justify-center my-8">
        <div className="w-20 h-px bg-[#21D375]/40" />
      </div>

      {/* SECTION CONTACT - SIMPLIFIÉE */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-2xl mx-auto bg-[#1a2e28] rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Contact Me</h2>
            <p className="text-gray-400 mt-2">Feel free to reach out for collaborations or inquiries.</p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" name="name" placeholder="Full Name" required className="w-full px-5 py-3 bg-white/10 rounded-xl border border-white/20 focus:border-[#21D375] outline-none" />
              <input type="email" name="email" placeholder="Email Address" required className="w-full px-5 py-3 bg-white/10 rounded-xl border border-white/20 focus:border-[#21D375] outline-none" />
            </div>
            <input type="text" name="subject" placeholder="Subject" required className="w-full px-5 py-3 bg-white/10 rounded-xl border border-white/20 focus:border-[#21D375] outline-none" />
            <textarea name="message" placeholder="Your Message" rows={4} required className="w-full px-5 py-3 bg-white/10 rounded-xl border border-white/20 focus:border-[#21D375] outline-none resize-none" />
            
            <button type="submit" disabled={loading} className="w-full py-3 bg-[#21D375] text-[#244539] font-semibold rounded-xl hover:bg-[#1aa55e] transition">
              {loading ? "Sending..." : "Send Message →"}
            </button>
          </form>

          {/* Social links */}
          <div className="flex justify-center gap-6 mt-8">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition">
              <Linkedin size={20} />
            </a>
            <a href="mailto:email@example.com" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}