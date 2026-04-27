import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Menu, X, User, Search, ShieldCheck, LogOut } from 'lucide-react';
import { useCart } from '../CartContext';

interface NavbarProps {
  onCartClick: () => void;
  onHomeClick: () => void;
  onViewChange: (view: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCartClick, onHomeClick, onViewChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems, user, login, logout } = useCart();

  const navLinks = [
    { name: 'Home', onClick: onHomeClick },
    { name: 'About Us', onClick: () => onViewChange('about') },
    { name: 'Mango Varieties', onClick: () => onViewChange('varieties') },
    { name: 'Gift Boxes', onClick: () => onViewChange('gifts') },
    { name: 'Bulk Orders', onClick: () => onViewChange('bulk') },
    { name: 'Blog', onClick: () => onViewChange('blog') },
    { name: 'Contact', onClick: () => onViewChange('contact') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer shrink-0"
            onClick={onHomeClick}
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1">
                <span className="text-2xl">🥭</span>
                <div className="flex flex-col leading-none">
                  <span className="text-xl font-display font-black tracking-tight text-mango-orange">
                    MangoMart
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.2em] text-mango-green text-center">
                    Multan
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Nav - Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1 gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={link.onClick || (() => {})}
                className="text-xs font-bold text-mango-green hover:text-mango-orange transition-colors uppercase tracking-wider"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 shrink-0">
            <button 
              onClick={onCartClick}
              className="p-2 text-mango-green hover:text-mango-orange transition-colors relative"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-mango-orange text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            
            {user ? (
              <div className="flex items-center gap-2">
                {user.role === 'admin' && (
                  <button 
                    onClick={() => onViewChange('admin')}
                    className="p-2 text-mango-orange hover:bg-mango-orange/10 rounded-full transition-colors"
                    title="Admin Panel"
                  >
                    <ShieldCheck size={20} />
                  </button>
                )}
                <button 
                  onClick={() => onViewChange('profile')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-mango-green/10 text-mango-green text-xs font-bold rounded-full hover:bg-mango-green/20 transition-colors"
                >
                  <User size={16} />
                  <span className="hidden sm:inline">{user.displayName?.split(' ')[0]}</span>
                </button>
                <button 
                  onClick={logout}
                  className="p-2 text-stone-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={login}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-mango-green text-white text-xs font-bold rounded hover:bg-mango-orange transition-colors uppercase"
              >
                Login / Register
              </button>
            )}

            <button 
              className="lg:hidden p-2 text-mango-green"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-stone-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  className="block w-full text-left px-3 py-4 text-base font-medium text-stone-600 hover:bg-stone-50 hover:text-mango-orange rounded-lg"
                  onClick={() => {
                    if (link.onClick) link.onClick();
                    setIsMenuOpen(false);
                  }}
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                {user ? (
                  <>
                    {user.role === 'admin' && (
                      <button 
                        onClick={() => { onViewChange('admin'); setIsMenuOpen(false); }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-mango-orange text-white font-bold rounded-xl"
                      >
                        <ShieldCheck size={18} />
                        Admin Panel
                      </button>
                    )}
                    <button 
                      onClick={() => { onViewChange('profile'); setIsMenuOpen(false); }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-mango-green text-white font-bold rounded-xl"
                    >
                      <User size={18} />
                      My Profile
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => { login(); setIsMenuOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-mango-yellow text-mango-dark font-bold rounded-xl"
                  >
                    <User size={18} />
                    Login
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
