'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { IconDownload, IconExternalLink, IconX } from '@tabler/icons-react';
import { useApp } from '@/app/providers/AppProviders';

export const CV_URL = '/CV_JOBA_Razafindrasoa_Genitah.pdf';
const CV_PAGES = ['/cv-page-1.webp'];

export const CvViewer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { t } = useApp();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-3 md:p-8" role="dialog" aria-modal="true" aria-label={t('cv.title')}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="relative flex flex-col w-full max-w-4xl h-[90vh] rounded-2xl overflow-hidden shadow-2xl border"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'color-mix(in srgb, var(--accent) 25%, transparent)' }}
          >
            {/* Toolbar */}
            <div
              className="flex items-center justify-between gap-3 px-4 md:px-6 py-3 border-b"
              style={{ borderColor: 'color-mix(in srgb, var(--fg) 10%, transparent)' }}
            >
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                  {t('cv.badge')}
                </p>
                <h2 className="font-semibold truncate">{t('cv.title')}</h2>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={CV_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm border transition hover:opacity-80"
                  style={{ borderColor: 'color-mix(in srgb, var(--fg) 15%, transparent)' }}
                >
                  <IconExternalLink size={16} /> {t('cv.open')}
                </a>
                <a
                  href={CV_URL}
                  download
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold transition hover:opacity-90"
                  style={{ backgroundColor: 'var(--accent)', color: 'var(--on-accent)' }}
                >
                  <IconDownload size={16} /> <span className="hidden sm:inline">{t('cv.download')}</span>
                </a>
                <button
                  onClick={onClose}
                  aria-label={t('common.close')}
                  className="p-2 rounded-full transition hover:bg-white/10"
                >
                  <IconX size={20} />
                </button>
              </div>
            </div>

            {/* CV pages rendered as images: displays the same on every browser, phones included.
                Regenerate public/cv-page-*.webp whenever the PDF changes. */}
            <div className="flex-1 overflow-y-auto bg-white/5 p-3 md:p-6">
              {CV_PAGES.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={`${t('cv.title')} — ${i + 1}`}
                  width={1488}
                  height={2105}
                  sizes="(max-width: 896px) 100vw, 850px"
                  className="mx-auto w-full max-w-[850px] h-auto rounded-lg shadow-lg bg-white mb-4 last:mb-0"
                  priority
                />
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
