'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  Send,
  Sparkles,
  User,
  AtSign,
  MessageSquare,
  Briefcase,
  Check,
  X,
  AlertCircle,
  Info,
  X as XIcon
} from 'lucide-react';
import { ACCENT_COLOR, TEXT_COLOR, BG_COLOR } from '@/app/constants';
import { MessageBoxState } from '@/app/types';
import { useApp } from '@/app/providers/AppProviders';

export const ContactSection = () => {
  const { t } = useApp();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [messageBox, setMessageBox] = useState<MessageBoxState>({ show: false, type: '', message: '' });
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessageBox({
          show: true,
          type: 'success',
          message: t('contact.successMsg')
        });
        formRef.current?.reset();
      } else {
        setMessageBox({
          show: true,
          type: 'error',
          message: result.error || t('contact.errorMsg')
        });
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessageBox({
        show: true,
        type: 'error',
        message: t('contact.networkMsg')
      });
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { Icon: Github, href: "https://github.com/Genitah-JOBA", label: "GitHub" },
    { Icon: Linkedin, href: "https://linkedin.com/in/joba-razafindrasoa-genitah-312645333", label: "LinkedIn" },
    { Icon: Mail, href: "mailto:genitahrazafindrasoa@gmail.com", label: "Email" },
  ];

  const fields = [
    { name: 'name', placeholder: t('contact.name'), icon: User, type: 'text' },
    { name: 'email', placeholder: t('contact.email'), icon: AtSign, type: 'email' },
    { name: 'subject', placeholder: t('contact.subject'), icon: Briefcase, type: 'text' },
  ];

  const messageIcons = {
    success: Check,
    error: X,
    info: Info,
    warning: AlertCircle,
  };

  return (
    <>
      <AnimatePresence>
        {messageBox.show && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md"
          >
            <div
              className="relative p-4 rounded-xl shadow-2xl border backdrop-blur-sm"
              style={{
                background: `linear-gradient(135deg, color-mix(in srgb, ${ACCENT_COLOR} 8%, transparent), color-mix(in srgb, ${ACCENT_COLOR} 2%, transparent))`,
                borderColor: `color-mix(in srgb, ${ACCENT_COLOR} 19%, transparent)`,
                backdropFilter: 'blur(10px)'
              }}
            >
              <button
                onClick={() => setMessageBox({ show: false, type: '', message: '' })}
                className="absolute top-2 right-2 p-1 rounded-full transition-all duration-200 hover:scale-110"
                style={{ color: TEXT_COLOR }}
              >
                <XIcon size={18} />
              </button>

              <div className="flex items-start gap-3 pr-6">
                {(() => {
                  const Icon = messageIcons[messageBox.type as keyof typeof messageIcons] || Info;
                  return (
                    <div className="flex-shrink-0 mt-0.5">
                      <Icon
                        size={22}
                        style={{
                          color: messageBox.type === 'success'
                            ? ACCENT_COLOR
                            : messageBox.type === 'error'
                            ? '#ef4444'
                            : messageBox.type === 'warning'
                            ? '#f59e0b'
                            : '#3b82f6'
                        }}
                      />
                    </div>
                  );
                })()}
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{
                      color: messageBox.type === 'success'
                        ? ACCENT_COLOR
                        : messageBox.type === 'error'
                        ? '#ef4444'
                        : messageBox.type === 'warning'
                        ? '#f59e0b'
                        : '#3b82f6'
                    }}
                  >
                    {messageBox.type === 'success' && t('contact.success')}
                    {messageBox.type === 'error' && t('contact.error')}
                    {messageBox.type === 'warning' && t('contact.warning')}
                    {messageBox.type === 'info' && t('contact.info')}
                  </p>
                  <p
                    className="text-sm mt-0.5"
                    style={{ color: `color-mix(in srgb, ${TEXT_COLOR} 80%, transparent)` }}
                  >
                    {messageBox.message}
                  </p>
                </div>
              </div>

              {/* Barre de progression */}
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 5, ease: 'linear' }}
                className="absolute bottom-0 left-0 h-0.5 rounded-b-xl"
                style={{
                  background: `linear-gradient(90deg, ${ACCENT_COLOR}, color-mix(in srgb, ${ACCENT_COLOR} 25%, transparent))`,
                  opacity: 0.5
                }}
                onAnimationComplete={() => {
                  setTimeout(() => {
                    setMessageBox({ show: false, type: '', message: '' });
                  }, 100);
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.section
        id="contact"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        className="max-w-3xl mx-auto my-32 rounded-3xl p-10 border relative overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, color-mix(in srgb, ${ACCENT_COLOR} 3%, transparent), transparent 70%), color-mix(in srgb, ${TEXT_COLOR} 1%, transparent)`,
          borderColor: `color-mix(in srgb, ${ACCENT_COLOR} 8%, transparent)`
        }}
      >
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-10" style={{ backgroundColor: ACCENT_COLOR }} />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-5" style={{ backgroundColor: ACCENT_COLOR }} />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full mb-4 border" style={{ borderColor: `color-mix(in srgb, ${ACCENT_COLOR} 13%, transparent)` }}>
              <Sparkles size={14} style={{ color: ACCENT_COLOR }} />
              <span className="text-xs font-medium" style={{ color: ACCENT_COLOR }}>{t('contact.badge')}</span>
              <Sparkles size={14} style={{ color: ACCENT_COLOR }} />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
              {t('contact.title1')}{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${ACCENT_COLOR}, color-mix(in srgb, ${ACCENT_COLOR} 38%, transparent))`
                }}
              >
                {t('contact.title2')}
              </span>
            </h2>
            <p className="text-white/40 mt-3 text-lg">
              {t('contact.subtitle')}
            </p>
          </motion.div>

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid md:grid-cols-2 gap-4">
              {fields.slice(0, 2).map((field) => (
                <motion.div
                  key={field.name}
                  className="relative"
                  whileHover={{ y: -1 }}
                >
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300" style={{ color: focused === field.name ? ACCENT_COLOR : `color-mix(in srgb, ${TEXT_COLOR} 19%, transparent)` }}>
                    <field.icon size={18} />
                  </div>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    required
                    onFocus={() => setFocused(field.name)}
                    onBlur={() => setFocused(null)}
                    className="w-full pl-12 pr-5 py-3.5 rounded-xl border bg-white/5 outline-none transition-all duration-300"
                    style={{
                      borderColor: focused === field.name ? ACCENT_COLOR : `color-mix(in srgb, ${ACCENT_COLOR} 8%, transparent)`,
                      color: TEXT_COLOR,
                      boxShadow: focused === field.name ? `0 0 30px color-mix(in srgb, ${ACCENT_COLOR} 2%, transparent)` : 'none'
                    }}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              className="relative"
              whileHover={{ y: -1 }}
            >
              <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300" style={{ color: focused === 'subject' ? ACCENT_COLOR : `color-mix(in srgb, ${TEXT_COLOR} 19%, transparent)` }}>
                <Briefcase size={18} />
              </div>
              <input
                type="text"
                name="subject"
                placeholder={t('contact.subject')}
                required
                onFocus={() => setFocused('subject')}
                onBlur={() => setFocused(null)}
                className="w-full pl-12 pr-5 py-3.5 rounded-xl border bg-white/5 outline-none transition-all duration-300"
                style={{
                  borderColor: focused === 'subject' ? ACCENT_COLOR : `color-mix(in srgb, ${ACCENT_COLOR} 8%, transparent)`,
                  color: TEXT_COLOR,
                  boxShadow: focused === 'subject' ? `0 0 30px color-mix(in srgb, ${ACCENT_COLOR} 2%, transparent)` : 'none'
                }}
              />
            </motion.div>

            <motion.div
              className="relative"
              whileHover={{ y: -1 }}
            >
              <div className="absolute left-4 top-4 transition-colors duration-300" style={{ color: focused === 'message' ? ACCENT_COLOR : `color-mix(in srgb, ${TEXT_COLOR} 19%, transparent)` }}>
                <MessageSquare size={18} />
              </div>
              <textarea
                name="message"
                rows={4}
                placeholder={t('contact.message')}
                required
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                className="w-full pl-12 pr-5 py-3.5 rounded-xl border bg-white/5 outline-none transition-all duration-300 resize-none"
                style={{
                  borderColor: focused === 'message' ? ACCENT_COLOR : `color-mix(in srgb, ${ACCENT_COLOR} 8%, transparent)`,
                  color: TEXT_COLOR,
                  boxShadow: focused === 'message' ? `0 0 30px color-mix(in srgb, ${ACCENT_COLOR} 2%, transparent)` : 'none'
                }}
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full py-4 rounded-xl font-semibold overflow-hidden transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${ACCENT_COLOR}, color-mix(in srgb, ${ACCENT_COLOR} 50%, transparent))`,
                color: BG_COLOR
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    {t('contact.sending')}
                  </>
                ) : (
                  <>
                    {t('contact.send')}
                    <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </>
                )}
              </span>
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, color-mix(in srgb, ${ACCENT_COLOR} 38%, transparent), ${ACCENT_COLOR})`,
                  opacity: 0
                }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.form>

          <motion.div
            className="flex justify-center gap-4 mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {socialLinks.map(({ Icon, href, label }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="group relative p-4 rounded-2xl transition-all duration-300"
                style={{
                  backgroundColor: `color-mix(in srgb, ${TEXT_COLOR} 2%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${ACCENT_COLOR} 6%, transparent)`,
                  color: TEXT_COLOR
                }}
              >
                <Icon size={22} className="transition-colors duration-300" style={{ color: TEXT_COLOR }} />

                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] px-2 py-0.5 rounded whitespace-nowrap"
                  style={{
                    backgroundColor: ACCENT_COLOR,
                    color: BG_COLOR
                  }}
                >
                  {label}
                </motion.span>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="flex justify-center gap-8 mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div>
              <p className="text-2xl font-bold" style={{ color: ACCENT_COLOR }}>3+</p>
              <p className="text-xs text-white/40">{t('contact.statYears')}</p>
            </div>
            <div className="w-px" style={{ backgroundColor: `color-mix(in srgb, ${ACCENT_COLOR} 8%, transparent)` }} />
            <div>
              <p className="text-2xl font-bold" style={{ color: ACCENT_COLOR }}>8+</p>
              <p className="text-xs text-white/40">{t('contact.statProjects')}</p>
            </div>
            <div className="w-px" style={{ backgroundColor: `color-mix(in srgb, ${ACCENT_COLOR} 8%, transparent)` }} />
            <div>
              <p className="text-2xl font-bold" style={{ color: ACCENT_COLOR }}>100%</p>
              <p className="text-xs text-white/40">{t('contact.statSatisfaction')}</p>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};