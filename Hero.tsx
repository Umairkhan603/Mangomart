import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Star, ShieldCheck, Truck, ChevronLeft, ChevronRight } from 'lucide-react';

const BANNER_SLIDES = [
  {
    id: 1,
    title: "Premium Sindhri",
    subtitle: "The Queen of Mangoes",
    description: "Experience the honey-like sweetness of Sindh's finest orchards.",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=1920",
    color: "text-mango-yellow"
  },
  {
    id: 2,
    title: "Export Chaunsa",
    subtitle: "World Famous Aroma",
    description: "Indulge in the legendary fragrance and rich flavor of Multani Chaunsa.",
    image: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&q=80&w=1920",
    color: "text-white"
  },
  {
    id: 3,
    title: "Anwar Ratol",
    subtitle: "The Scent of Summer",
    description: "Small in size, giant in flavor. The most aromatic variety in the world.",
    image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&q=80&w=1920",
    color: "text-mango-yellow"
  },
  {
    id: 4,
    title: "Langra Organic",
    subtitle: "The Green Gem",
    description: "Unique tangy-sweet flavor with a fiberless melting texture.",
    image: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&q=80&w=1920",
    color: "text-white"
  },
  {
    id: 5,
    title: "Dusehri Special",
    subtitle: "Legendary Sweetness",
    description: "The most popular variety from the heart of Punjab's mango belt.",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=1920",
    color: "text-mango-yellow"
  }
];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);

  return (
    <section className="relative overflow-hidden bg-mango-dark">
      <div className="relative h-[85vh] min-h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <motion.div 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 7 }}
              className="absolute inset-0"
            >
              <img 
                src={BANNER_SLIDES[currentSlide].image} 
                alt={BANNER_SLIDES[currentSlide].title} 
                className="w-full h-full object-cover brightness-[0.4]"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="max-w-4xl"
              >
                <motion.p 
                  initial={{ opacity: 0, letterSpacing: "0.2em" }}
                  animate={{ opacity: 1, letterSpacing: "0.5em" }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="text-white text-sm md:text-base font-bold mb-6 uppercase tracking-[0.5em]"
                >
                  {BANNER_SLIDES[currentSlide].subtitle}
                </motion.p>
                
                <h1 className={`text-5xl md:text-7xl lg:text-9xl font-display font-bold mb-8 leading-tight drop-shadow-2xl ${BANNER_SLIDES[currentSlide].color}`}>
                  {BANNER_SLIDES[currentSlide].title.split(' ').map((word, i) => (
                    <span key={i} className={i === 1 && BANNER_SLIDES[currentSlide].color === 'text-white' ? 'text-mango-yellow' : ''}>
                      {word}{' '}
                    </span>
                  ))}
                </h1>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-lg md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto font-medium leading-relaxed"
                >
                  {BANNER_SLIDES[currentSlide].description}
                </motion.p>
                
                <div className="flex flex-wrap justify-center gap-6">
                  <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: '#fbbf24' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-mango-orange text-white font-bold rounded-full shadow-2xl transition-all uppercase tracking-widest text-xs"
                  >
                    Shop Now
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold rounded-full shadow-2xl transition-all uppercase tracking-widest text-xs"
                  >
                    View Varieties
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls */}
        <div className="absolute bottom-20 left-0 right-0 z-30 flex justify-center items-center gap-8">
          <button 
            onClick={prevSlide}
            className="p-3 rounded-full bg-white/5 hover:bg-white/20 text-white transition-all border border-white/10"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="flex gap-3">
            {BANNER_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  currentSlide === index ? 'w-12 bg-mango-yellow' : 'w-3 bg-white/30'
                }`}
              />
            ))}
          </div>

          <button 
            onClick={nextSlide}
            className="p-3 rounded-full bg-white/5 hover:bg-white/20 text-white transition-all border border-white/10"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Decorative Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
          <svg className="relative block w-[calc(100%+1.3px)] h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-mango-bg"></path>
          </svg>
        </div>
      </div>

      {/* Category Tabs at Bottom with Staggered Animation */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-20 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { emoji: '🥭', label: 'Mango Varieties', delay: 0.6 },
            { emoji: '🎁', label: 'Gift Boxes', delay: 0.7 },
            { emoji: '📦', label: 'Bulk Orders', delay: 0.8 },
          ].map((item, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: item.delay }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-xl flex items-center justify-center gap-4 hover:bg-mango-yellow transition-all group border border-stone-100"
            >
              <span className="text-3xl group-hover:scale-125 transition-transform duration-300">{item.emoji}</span>
              <span className="font-bold text-mango-dark uppercase tracking-widest text-sm">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
