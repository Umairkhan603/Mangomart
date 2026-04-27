import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Facebook, Instagram, Share2, X, Linkedin } from 'lucide-react';

export const SocialFloatingBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const phoneNumber1 = '923062841484';
  const phoneNumber2 = '923702182841';
  const message = 'Hello MangoMart! I would like to inquire about your mangoes.';
  
  const socials = [
    {
      name: 'WhatsApp 1',
      icon: <MessageCircle size={24} />,
      url: `https://wa.me/${phoneNumber1}?text=${encodeURIComponent(message)}`,
      color: 'bg-[#25D366]',
      label: 'Chat on 03062841484'
    },
    {
      name: 'WhatsApp 2',
      icon: <MessageCircle size={24} />,
      url: `https://wa.me/${phoneNumber2}?text=${encodeURIComponent(message)}`,
      color: 'bg-[#128C7E]',
      label: 'Chat on 03702182841'
    },
    {
      name: 'Instagram',
      icon: <Instagram size={24} />,
      url: 'https://instagram.com/mangomartpk',
      color: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]',
      label: 'Follow on Insta'
    },
    {
      name: 'Facebook',
      icon: <Facebook size={24} />,
      url: 'https://facebook.com/mangomartpk',
      color: 'bg-[#1877F2]',
      label: 'Like our page'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={24} />,
      url: 'https://linkedin.com/company/mangomartpk',
      color: 'bg-[#0A66C2]',
      label: 'Connect on LinkedIn'
    },
    {
      name: 'TikTok',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.13 3.44-.2 6.88-.23 10.32-.13 2.13-.87 4.26-2.6 5.71-1.89 1.58-4.66 1.9-6.99 1.11-2.25-.76-4.1-2.82-4.51-5.15-.53-2.96.73-6.19 3.29-7.73.49-.3 1.02-.55 1.58-.72V10.3c-.18.03-.35.05-.53.09-1.07.24-2.09.72-2.91 1.49-1.53 1.44-2.11 3.7-1.56 5.71.4 1.44 1.49 2.67 2.91 3.12 1.43.46 3.07.14 4.26-.86 1.16-1 1.72-2.57 1.74-4.12.04-3.81.03-7.62.03-11.43z" />
        </svg>
      ),
      url: 'https://tiktok.com/@mangomartpk',
      color: 'bg-black',
      label: 'Watch on TikTok'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-end gap-4 mb-2">
            {socials.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                transition={{ delay: (socials.length - index - 1) * 0.1 }}
                className={`${social.color} text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform flex items-center justify-center group relative`}
                aria-label={social.label}
              >
                {social.icon}
                <span className="absolute right-full mr-4 px-3 py-1.5 bg-mango-dark text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
                  {social.label}
                </span>
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'bg-mango-orange' : 'bg-mango-dark'} text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center z-50`}
        aria-label="Toggle social menu"
      >
        {isOpen ? <X size={32} /> : <Share2 size={32} />}
      </button>
    </div>
  );
};
