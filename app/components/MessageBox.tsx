'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageBoxProps } from '@/app/types';
import { ACCENT_COLOR } from '@/app/constants';

export const MessageBox = ({ 
  message, 
  type, 
  onClose, 
  duration = 5000 
}: MessageBoxProps) => {
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