import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, CheckCircle } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-12 md:p-24 bg-mango-bg rounded-[4rem] border border-mango-yellow/20 overflow-hidden shadow-2xl">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-mango-yellow/10 rounded-full -mr-48 -mt-48 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-mango-orange/10 rounded-full -ml-48 -mb-48 blur-3xl" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl mb-8 shadow-sm">
                <Mail className="text-mango-orange" size={32} />
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-mango-dark mb-8 leading-tight">
                Stay Fresh with <br />
                <span className="text-mango-orange italic">MangoMart Updates</span>
              </h2>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                Subscribe to our newsletter and be the first to know about seasonal harvests, exclusive discounts, and new variety launches.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-sm font-bold text-mango-dark uppercase tracking-widest">
                  <CheckCircle className="text-mango-orange" size={18} />
                  <span>Weekly Tips</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-mango-dark uppercase tracking-widest">
                  <CheckCircle className="text-mango-orange" size={18} />
                  <span>Early Access</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-mango-dark uppercase tracking-widest">
                  <CheckCircle className="text-mango-orange" size={18} />
                  <span>Special Offers</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-stone-100"
            >
              <h3 className="text-2xl font-bold text-mango-dark mb-8">Join the Mango Family</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-8 py-5 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mango-orange focus:border-transparent transition-all text-stone-700 font-medium"
                    required
                  />
                  <Mail className="absolute right-6 top-1/2 -translate-y-1/2 text-stone-300" size={24} />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-10 py-5 bg-mango-dark text-white font-bold rounded-2xl shadow-xl hover:bg-mango-orange transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-3"
                >
                  {isSubscribed ? (
                    <>
                      <CheckCircle size={20} />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Subscribe Now</span>
                    </>
                  )}
                </motion.button>
              </form>
              <p className="mt-8 text-xs text-stone-400 text-center leading-relaxed">
                By subscribing, you agree to our <span className="text-mango-orange underline cursor-pointer">Privacy Policy</span> and <span className="text-mango-orange underline cursor-pointer">Terms of Service</span>.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
