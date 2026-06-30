'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase, Award, GraduationCap, Code, Terminal, Sparkles, ChevronRight } from 'lucide-react';
import { experiences } from '@/app/constants';
import { ACCENT_COLOR, TEXT_COLOR } from '@/app/constants';
import { Experience } from '@/app/types';

export const ExperienceSection = () => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Stage':
        return Briefcase;
      case 'Mission':
        return Code;
      case 'Formation':
        return GraduationCap;
      case 'Certification':
        return Award;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="experience" className="py-24 px-6 relative overflow-hidden">
      {/* Background decoration minimal */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-5"
          style={{ backgroundColor: ACCENT_COLOR }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header - apparait rapidement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full mb-4 border"
            style={{ borderColor: `${ACCENT_COLOR}20` }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, type: "spring", stiffness: 200 }}
          >
            <Sparkles size={14} style={{ color: ACCENT_COLOR }} />
            <span className="text-xs font-medium" style={{ color: ACCENT_COLOR }}>EXPERIENCE</span>
            <Sparkles size={14} style={{ color: ACCENT_COLOR }} />
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
            My{" "}
            <span 
              className="text-transparent bg-clip-text" 
              style={{ 
                backgroundImage: `linear-gradient(135deg, ${ACCENT_COLOR}, ${ACCENT_COLOR}50)` 
              }}
            >
              Journey
            </span>
          </h2>
          <motion.p 
            className="text-white/40 mt-4 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Professional experiences and training that shaped my career
          </motion.p>
        </motion.div>

        {/* Timeline - apparition rapide 1 par 1 */}
        <div className="relative">
          {/* Timeline line */}
          <motion.div 
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px"
            style={{ 
              background: `linear-gradient(to bottom, ${ACCENT_COLOR}30, ${ACCENT_COLOR}05)` 
            }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          />

          {experiences.map((exp, index) => {
            const Icon = getTypeIcon(exp.type);

            return (
              <motion.div
                key={exp.id}
                className={`relative flex flex-col md:flex-row gap-6 mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ 
                  duration: 0.4,
                  delay: index * 0.12, // Délai réduit : 0.12s au lieu de 0.25s
                  type: "spring",
                  damping: 25,
                  stiffness: 150
                }}
              >
                {/* Timeline dot */}
                <motion.div 
                  className="absolute left-0 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 z-10"
                  style={{ backgroundColor: ACCENT_COLOR }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.12 + 0.15,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  <motion.div 
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: ACCENT_COLOR }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.1
                    }}
                  />
                </motion.div>

                {/* Content */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <motion.div 
                    className="p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                    style={{ 
                      background: `${TEXT_COLOR}03`,
                      borderColor: `${ACCENT_COLOR}15`,
                    }}
                    whileHover={{
                      boxShadow: `0 8px 30px ${ACCENT_COLOR}05`,
                    }}
                  >
                    {/* Header */}
                    <div 
                      className="flex items-center gap-3 mb-3"
                      style={{ justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start' }}
                    >
                      <motion.div 
                        className="p-2 rounded-xl"
                        style={{ backgroundColor: `${ACCENT_COLOR}10` }}
                        whileHover={{ rotate: 15, scale: 1.1 }}
                      >
                        <Icon size={18} style={{ color: ACCENT_COLOR }} />
                      </motion.div>
                      <span 
                        className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ backgroundColor: `${ACCENT_COLOR}10`, color: ACCENT_COLOR }}
                      >
                        {exp.type}
                      </span>
                    </div>

                    {/* Title - apparition rapide */}
                    <motion.h3 
                      className="text-xl font-bold mb-1"
                      style={{ color: ACCENT_COLOR }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.12 + 0.2 }}
                    >
                      {exp.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-white/60 font-medium"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.12 + 0.25 }}
                    >
                      {exp.company}
                    </motion.p>

                    {/* Meta */}
                    <motion.div 
                      className="flex flex-wrap gap-3 mt-3 text-sm text-white/30"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.12 + 0.3 }}
                    >
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                      {exp.duration !== '-' && (
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${ACCENT_COLOR}10`, color: ACCENT_COLOR }}>
                          {exp.duration}
                        </span>
                      )}
                    </motion.div>

                    {/* Description */}
                    <motion.p 
                      className="text-white/50 text-sm leading-relaxed mt-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.12 + 0.35 }}
                    >
                      {exp.description}
                    </motion.p>

                    {/* Technologies */}
                    <motion.div 
                      className="flex flex-wrap gap-1.5 mt-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.12 + 0.4 }}
                    >
                      {exp.technologies.map((tech, techIndex) => (
                        <motion.span 
                          key={tech}
                          className="text-[10px] px-2 py-0.5 rounded-full"
                          style={{ 
                            backgroundColor: `${ACCENT_COLOR}08`,
                            color: ACCENT_COLOR
                          }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ 
                            delay: index * 0.12 + 0.4 + techIndex * 0.03,
                            type: "spring",
                            stiffness: 200
                          }}
                          whileHover={{ scale: 1.1, backgroundColor: `${ACCENT_COLOR}20` }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>

                    {/* Achievements */}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <motion.div 
                        className="mt-3 pt-3 border-t"
                        style={{ borderColor: `${ACCENT_COLOR}10` }}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.12 + 0.45 }}
                      >
                        <ul className="space-y-1">
                          {exp.achievements.slice(0, 3).map((achievement, i) => (
                            <motion.li 
                              key={i} 
                              className="flex items-start gap-2 text-xs text-white/40"
                              initial={{ opacity: 0, x: -5 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.12 + 0.5 + i * 0.03 }}
                            >
                              <ChevronRight size={12} className="mt-0.5 flex-shrink-0" style={{ color: ACCENT_COLOR }} />
                              {achievement}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                {/* Empty space */}
                <div className="hidden md:block w-5/12" />
              </motion.div>
            );
          })}
        </div>

        {/* Stats - apparition rapide */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 p-6 rounded-2xl border"
          style={{ 
            background: `${TEXT_COLOR}02`,
            borderColor: `${ACCENT_COLOR}10`
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {[
            { 
              value: experiences.filter(e => e.type === 'Stage' || e.type === 'Mission').length, 
              label: 'Professional Experiences'
            },
            { 
              value: experiences.filter(e => e.type === 'Formation' || e.type === 'Certification').length, 
              label: 'Trainings & Certifications'
            },
            { 
              value: experiences.reduce((acc, e) => acc + e.technologies.length, 0), 
              label: 'Technologies Used'
            },
            { 
              value: experiences.length, 
              label: 'Total Experiences'
            }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <p 
                className="text-3xl font-bold"
                style={{ color: ACCENT_COLOR }}
              >
                {stat.value}
              </p>
              <p className="text-xs text-white/30 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};