'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ACCENT_COLOR } from '@/app/constants';
import { useApp } from '@/app/providers/AppProviders';

interface ChoixEmitProps {
  isOpen: boolean;
  onClose: () => void;
}

// Role chooser for the Gestion EMIT project (owner / secretary interfaces)
export const ChoixEmit = ({ isOpen, onClose }: ChoixEmitProps) => {
  const { t } = useApp();

  const roles = [
    { href: '/AdminEmit', image: '/admin.jpg', title: t('choix.owner'), desc: t('choix.ownerDesc') },
    { href: '/SecretaireEmit', image: '/secretary.jpg', title: t('choix.secretary'), desc: t('choix.secretaryDesc') },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-x-4 top-24 z-[9999] flex justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -50, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -50, rotateX: -90 }}
            className="pointer-events-auto relative w-full max-w-sm p-5 rounded-2xl shadow-2xl border backdrop-blur-xl bg-[var(--surface)]/90"
            style={{ borderColor: ACCENT_COLOR, transformStyle: 'preserve-3d' }}
          >
            <button
              onClick={onClose}
              aria-label={t('common.close')}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-lg font-bold mb-4 text-center pr-4" style={{ color: ACCENT_COLOR }}>
              {t('choix.title')}
            </h3>

            <div className="flex flex-col gap-3">
              {roles.map((role) => (
                <Link
                  key={role.href}
                  href={role.href}
                  onClick={onClose}
                  className="group flex items-center gap-4 p-3 rounded-xl border transition-all hover:scale-[1.02] bg-white/5"
                  style={{ borderColor: `color-mix(in srgb, ${ACCENT_COLOR} 19%, transparent)` }}
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2" style={{ borderColor: ACCENT_COLOR }}>
                    <Image src={role.image} alt={role.title} fill sizes="48px" className="object-cover" />
                  </div>
                  <div>
                    <p className="font-medium text-white group-hover:text-[var(--accent)] transition-colors">{role.title}</p>
                    <p className="text-xs text-white/50">{role.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
