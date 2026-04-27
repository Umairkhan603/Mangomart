import React from 'react';
import { motion } from 'motion/react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-mango-yellow rounded-full flex items-center justify-center">
                <span className="text-lg">🥭</span>
              </div>
              <span className="text-xl font-display font-bold tracking-tight">
                MangoMart<span className="text-mango-green">PK</span>
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed mb-8">
              Bringing the world's finest Pakistani mangoes directly from our farms to your table. 
              Fresh, sweet, and naturally ripened.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/mangomartpk" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-mango-yellow hover:text-mango-dark transition-all" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://instagram.com/mangomartpk" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-mango-yellow hover:text-mango-dark transition-all" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://tiktok.com/@mangomartpk" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-mango-yellow hover:text-mango-dark transition-all" aria-label="TikTok">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.13 3.44-.2 6.88-.23 10.32-.13 2.13-.87 4.26-2.6 5.71-1.89 1.58-4.66 1.9-6.99 1.11-2.25-.76-4.1-2.82-4.51-5.15-.53-2.96.73-6.19 3.29-7.73.49-.3 1.02-.55 1.58-.72V10.3c-.18.03-.35.05-.53.09-1.07.24-2.09.72-2.91 1.49-1.53 1.44-2.11 3.7-1.56 5.71.4 1.44 1.49 2.67 2.91 3.12 1.43.46 3.07.14 4.26-.86 1.16-1 1.72-2.57 1.74-4.12.04-3.81.03-7.62.03-11.43z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Shop Mangoes', 'Mango Varieties', 'Gift Boxes', 'Bulk Orders', 'About Us', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-stone-400 text-sm hover:text-mango-yellow transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Varieties */}
          <div>
            <h4 className="text-lg font-bold mb-6">Varieties</h4>
            <ul className="space-y-4">
              {['Sindhri Mango', 'Chaunsa Mango', 'Anwar Ratol', 'Langra Mango', 'White Chaunsa'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-stone-400 text-sm hover:text-mango-yellow transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-stone-400 text-sm">
                <MapPin size={18} className="text-mango-yellow shrink-0" />
                <span>Farm #42, Mango Road, Multan, Pakistan</span>
              </li>
              <li className="flex items-center gap-3 text-stone-400 text-sm">
                <Phone size={18} className="text-mango-yellow shrink-0" />
                <div className="flex flex-col">
                  <a href="https://wa.me/923062841484" target="_blank" rel="noopener noreferrer" className="hover:text-mango-yellow transition-colors">03062841484</a>
                  <a href="https://wa.me/923702182841" target="_blank" rel="noopener noreferrer" className="hover:text-mango-yellow transition-colors">03702182841</a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-stone-400 text-sm">
                <Mail size={18} className="text-mango-yellow shrink-0" />
                <a href="mailto:mangomartpakistan@gmail.com" className="hover:text-mango-yellow transition-colors">mangomartpakistan@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-stone-500 text-xs">
            © 2026 MangoMart Pakistan. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-stone-500 text-xs hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-stone-500 text-xs hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-stone-500 text-xs hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
