'use client';

import { motion } from 'framer-motion';
import { Card3D } from '@/app/components/Card3D';
import { Briefcase, Award, Gauge, Trophy } from 'lucide-react';
import { ACCENT_COLOR, TEXT_COLOR } from '@/app/constants';
import { useApp } from '@/app/providers/AppProviders';

export const AboutSection = () => {
  const { t } = useApp();
  const stats = [
    { label: t('about.exp.label'), value: t('about.exp.value'), desc: t('about.exp.desc'), icon: Briefcase },
    { label: t('about.hack.label'), value: "4", desc: "FANILO · Science Hack Day · EMIHACK · SmartCity", icon: Trophy },
    { label: t('about.impact.label'), value: "70%", desc: t('about.impact.desc'), icon: Award },
    { label: t('about.perf.label'), value: "90+", desc: t('about.perf.desc'), icon: Gauge },
  ];

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl md:text-7xl font-bold">
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, ${ACCENT_COLOR}, color-mix(in srgb, ${ACCENT_COLOR} 50%, transparent))` }}>01.</span>
            <br />
            <span>{t('about.title')}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Terminal 3D */}
          <div className="relative rounded-2xl p-6 backdrop-blur-sm border"
              style={{ background: `color-mix(in srgb, ${TEXT_COLOR} 3%, transparent)`, borderColor: `color-mix(in srgb, ${ACCENT_COLOR} 19%, transparent)` }}>
            <Card3D className="w-full h-full">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="space-y-3 font-mono text-sm">
                <p><span style={{ color: ACCENT_COLOR }}>$</span> whoami</p>
                <p className="text-white/70">{t('about.whoami')}</p>
                <p><span style={{ color: ACCENT_COLOR }}>$</span> cat education.txt</p>
                <p className="text-white/70">{t('about.education')}</p>
                <p><span style={{ color: ACCENT_COLOR }}>$</span> skills --tech-stack</p>
                <p className="text-white/70">React, Next.js, Vue.js, Angular, Node.js, Python (FastAPI), PHP, Laravel, Java (Spring Boot), C# (ASP.NET), Flutter</p>
                <motion.span className="inline-block w-2 h-4" style={{ backgroundColor: ACCENT_COLOR }} animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} />
              </div>
            </Card3D>
          </div>

          {/* Stats 3D */}
          <div className="space-y-6">
            {stats.map((stat, i) => (
              <div key={i} className="relative rounded-2xl p-6 border"
                style={{ background: `color-mix(in srgb, ${TEXT_COLOR} 3%, transparent)`, borderColor: `color-mix(in srgb, ${ACCENT_COLOR} 19%, transparent)` }}>
                <Card3D className="w-full h-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm uppercase tracking-wider" style={{ color: ACCENT_COLOR }}>{stat.label}</p>
                      <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
                      <p className="text-sm text-white/50 mt-1">{stat.desc}</p>
                    </div>
                    <div className="p-3 rounded-xl" style={{ backgroundColor: `color-mix(in srgb, ${ACCENT_COLOR} 13%, transparent)` }}>
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
  );
};