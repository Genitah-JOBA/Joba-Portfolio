'use client';

import { motion } from 'framer-motion';
import { ACCENT_COLOR } from '@/app/constants';

export const FloatingShape = ({ delay = 0 }: { delay?: number }) => (
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