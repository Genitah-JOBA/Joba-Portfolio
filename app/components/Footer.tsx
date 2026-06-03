"use client";

import Link from "next/link";
import { 
  Github, Linkedin, Mail, Sparkles, Code2, 
  Heart, Zap, Award, User, Layers, Briefcase,
  MessageSquare, MapPin, Clock, Star, Shield,
  Globe, ArrowUpRight, ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // SOLUTION: Typage explicite avec valeur initiale
  type Particle = {
    id: number;
    width: string;
    height: string;
    left: string;
    top: string;
    duration: number;
    delay: number;
    xMove: number;
    yMove: number;
  };
  
  const [particles, setParticles] = useState<Particle[]>([]);
  
  const accentColor = "#14B89C";
  const bgColor = "#0A0F1A";
  const textColor = "#FFFFFF";

  // SOLUTION: Vérifier qu'on est côté client avant de générer
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const generatedParticles: Particle[] = Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 4 + Math.random() * 5,
      delay: Math.random() * 3,
      xMove: (Math.random() - 0.5) * 60,
      yMove: -20 - Math.random() * 40,
    }));
    setParticles(generatedParticles);
  }, [isMounted]);

  const smoothScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 100, rotateX: 45 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      viewport={{ once: true, amount: 0.3 }}
      className="w-full relative overflow-hidden"
      style={{ 
        backgroundColor: bgColor,
        color: textColor,
        borderTop: `1px solid ${accentColor}30`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Ligne lumineuse */}
      <motion.div
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#14B89C] to-transparent"
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: "100%", opacity: 0.5 }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "linear"
        }}
      />

      {/* SOLUTION: Vérifier que particles existe et est monté */}
      {isMounted && particles.length > 0 && particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.width,
            height: particle.height,
            backgroundColor: accentColor,
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
            y: [0, particle.yMove, 0],
            x: [0, particle.xMove, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Section principale avec 4 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Colonne 1 - Brand & Stats */}
          <motion.div 
            initial={{ x: -50, opacity: 0, rotateY: -45 }}
            whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.6, type: "spring", delay: 0.1 }}
            className="text-center md:text-left"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotateX: 5 }}
              className="inline-block relative"
            >
              <h2 className="text-2xl font-bold relative z-10" style={{ fontFamily: 'Cooper' }}>
                <span style={{ color: accentColor }}>{"{"}</span>
                <motion.span
                  animate={{ 
                    textShadow: [
                      `0 0 0px ${accentColor}`,
                      `0 0 15px ${accentColor}`,
                      `0 0 0px ${accentColor}`
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  JOBA
                </motion.span>
                <span style={{ color: accentColor }}>{"}"}</span>
              </h2>
              <motion.div
                className="absolute -inset-2 rounded-lg -z-10"
                style={{ backgroundColor: `${accentColor}15` }}
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm mt-3"
              style={{ color: `${textColor}CC` }}
            >
              Fullstack Developer & Problem Solver
            </motion.p>

            {/* Statistiques animées */}
            <div className="grid grid-cols-3 gap-3 mt-5">
              {[
                { icon: Code2, value: "2", label: "Years" },
                { icon: Briefcase, value: "8+", label: "Projects" },
                { icon: Star, value: "2", label: "Clients" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, rotateX: -90 }}
                  whileInView={{ scale: 1, rotateX: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                  className="text-center p-2 rounded-lg"
                  style={{ backgroundColor: `${accentColor}10` }}
                >
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3, delay: index * 0.5, repeat: Infinity }}
                    style={{ color: accentColor }}
                  >
                    <stat.icon size={18} className="mx-auto" />
                  </motion.div>
                  <motion.div 
                    className="text-base font-bold mt-1"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, delay: index * 0.3, repeat: Infinity }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-[9px]" style={{ color: `${textColor}60` }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="flex items-center justify-center md:justify-start gap-3 mt-4 text-xs"
              style={{ color: `${textColor}60` }}
              animate={{ x: [0, -2, 2, -2, 2, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <MapPin size={12} style={{ color: accentColor }} />
              <span>Madagascar</span>
              <Clock size={12} style={{ color: accentColor }} />
              <span>UTC+3</span>
            </motion.div>
          </motion.div>

          {/* Colonne 2 - Navigation */}
          <motion.div 
            initial={{ y: 50, opacity: 0, rotateX: 30 }}
            whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h3 className="text-sm font-semibold mb-5 flex items-center justify-center md:justify-start gap-2">
              <Zap size={16} style={{ color: accentColor }} />
              <span>Navigation</span>
            </h3>
            
            <div className="space-y-3">
              {[
                { name: 'About', icon: User, href: '#about' },
                { name: 'Skills', icon: Layers, href: '#skills' },
                { name: 'Projects', icon: Briefcase, href: '#projects' },
                { name: 'Contact', icon: MessageSquare, href: '#contact' }
              ].map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 8 }}
                >
                  <Link 
                    href={item.href} 
                    onClick={(e) => smoothScrollTo(e, item.href)}
                    className="flex items-center gap-3 text-sm group"
                    style={{ color: `${textColor}CC` }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, delay: index * 0.5, repeat: Infinity }}
                      style={{ color: accentColor }}
                    >
                      <item.icon size={14} />
                    </motion.div>
                    <span className="group-hover:tracking-wider transition-all duration-300">
                      {item.name}
                    </span>
                    <ChevronRight 
                      size={12} 
                      className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" 
                      style={{ color: accentColor }} 
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Badge disponible (comme dans le Header) */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="mt-6 inline-block px-3 py-1 rounded-full text-[10px]"
              style={{ backgroundColor: accentColor, color: bgColor }}
            >
              <span className="flex items-center gap-1">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  ✦
                </motion.span>
                Available for freelance
              </span>
            </motion.div>
          </motion.div>

          {/* Colonne 3 - Expertise */}
          <motion.div 
            initial={{ y: 50, opacity: 0, rotateX: -30 }}
            whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.6, type: "spring", delay: 0.3 }}
            className="text-center md:text-left"
          >
            <h3 className="text-sm font-semibold mb-5 flex items-center justify-center md:justify-start gap-2">
              <Award size={16} style={{ color: accentColor }} />
              <span>Expertise</span>
            </h3>

            <div className="space-y-3">
              {[
                { tech: "Vue.js", level: 70 },
                { tech: "Laravel", level: 75 },
                { tech: "MySQL", level: 90 },
                { tech: "GitHub", level: 85 },
                { tech: "VS Code", level: 90 }
              ].map((skill, index) => (
                <motion.div
                  key={skill.tech}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex justify-between text-[10px] mb-1">
                    <span style={{ color: `${textColor}CC` }}>{skill.tech}</span>
                    <span style={{ color: accentColor }}>{skill.level}%</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: `${textColor}20` }}>
                    <motion.div
                      className="h-full rounded-full relative"
                      style={{ backgroundColor: accentColor }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="mt-6 flex items-center justify-center md:justify-start"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Globe size={18} style={{ color: accentColor }} />
            </motion.div>
          </motion.div>

          {/* Colonne 4 - Connect */}
          <motion.div 
            initial={{ x: 50, opacity: 0, rotateY: 45 }}
            whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.6, type: "spring", delay: 0.4 }}
            className="text-center md:text-right"
          >
            <h3 className="text-sm font-semibold mb-5 flex items-center justify-center md:justify-end gap-2">
              <Sparkles size={16} style={{ color: accentColor }} />
              <span>Connect</span>
            </h3>
            
            <div className="flex justify-center md:justify-end gap-4">
              {[
                { Icon: Github, href: "https://github.com/Genitah-JOBA", label: "GitHub" },
                { Icon: Linkedin, href: "https://linkedin.com/in/joba-razafindrasoa-genitah-312645333", label: "LinkedIn" },
                { Icon: Mail, href: "mailto:genitahrazafindrasoa@gmail.com", label: "Email" }
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0, rotateY: -180 }}
                  whileInView={{ scale: 1, rotateY: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.6 + index * 0.1
                  }}
                  whileHover={{ 
                    scale: 1.2,
                    y: -5,
                    rotateY: 15,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <motion.div 
                    className="p-2 rounded-lg"
                    style={{ 
                      backgroundColor: `${accentColor}15`,
                      border: `1px solid ${accentColor}30`,
                    }}
                    animate={{ 
                      boxShadow: [
                        `0 0 0px ${accentColor}`,
                        `0 0 15px ${accentColor}30`,
                        `0 0 0px ${accentColor}`
                      ]
                    }}
                    transition={{ duration: 2, delay: index * 0.3, repeat: Infinity }}
                  >
                    <item.Icon size={18} style={{ color: accentColor }} />
                  </motion.div>
                  
                  {/* Tooltip */}
                  <motion.span 
                    className="absolute -top-7 left-1/2 transform -translate-x-1/2 text-[8px] px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: accentColor, color: bgColor }}
                  >
                    {item.label}
                  </motion.span>
                </motion.a>
              ))}
            </div>

            {/* Bouton Contact - style identique au Header */}
            <motion.div 
              className="mt-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="#contact" 
                onClick={(e) => smoothScrollTo(e, "#contact")}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all group"
                style={{ 
                  backgroundColor: accentColor,
                  color: bgColor,
                }}
              >
                <MessageSquare size={14} />
                <span>Send Message</span>
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowUpRight size={12} />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Séparateur animé */}
        <motion.div 
          className="my-8 h-px bg-gradient-to-r from-transparent via-[#14B89C] to-transparent"
          animate={{ 
            scaleX: [0.3, 1, 0.3],
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px]" style={{ color: `${textColor}50` }}>
          <motion.div
            className="flex items-center gap-2"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Code2 size={10} style={{ color: accentColor }} />
            <span>© {currentYear} JOBA. All rights reserved.</span>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ color: accentColor }}
            >
              <Heart size={8} />
            </motion.div>
          </motion.div>
          
          <div className="flex gap-4">
            {['Privacy', 'Terms', 'Sitemap'].map((item) => (
              <motion.div
                key={item}
                whileHover={{ y: -2 }}
              >
                <Link 
                  href={`#`} 
                  className="transition-all duration-300 hover:tracking-wider"
                  style={{ color: `${textColor}60` }}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="flex items-center gap-2"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Globe size={10} style={{ color: accentColor }} />
            <span>v2.0.0</span>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}