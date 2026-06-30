'use client';

import { motion } from 'framer-motion';
import { Card3D } from '@/app/components/Card3D';
import { Briefcase, Award, Gauge } from 'lucide-react';
import { ACCENT_COLOR, TEXT_COLOR } from '@/app/constants';

export const AboutSection = () => {
  const stats = [
    { label: "Experience", value: "2 Years", desc: "Fullstack Development", icon: Briefcase },
    { label: "Impact", value: "70%", desc: "Client Satisfaction", icon: Award },
    { label: "Performance", value: "90+", desc: "Lighthouse Score", icon: Gauge },
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
            {stats.map((stat, i) => (
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
  );
};