import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQ_DATA = [
  {
    question: "How do you ensure the mangoes are naturally ripened?",
    answer: "We strictly avoid the use of calcium carbide or any other artificial ripening agents. Our mangoes are tree-ripened or ripened naturally using traditional methods like wrapping in paper or straw, which preserves the authentic flavor and aroma."
  },
  {
    question: "What is the delivery time for orders within Pakistan?",
    answer: "For major cities like Karachi, Lahore, and Islamabad, we typically deliver within 24-48 hours of harvest. For other regions, it may take 3-4 business days. We use temperature-controlled logistics where possible to maintain freshness."
  },
  {
    question: "Can I order specific varieties that are not currently in season?",
    answer: "Mango varieties have specific harvest windows. You can pre-order upcoming varieties, and we will ship them as soon as they reach peak maturity. Check our 'Mango Season Calendar' for more details."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Currently, we focus on domestic delivery within Pakistan to ensure maximum freshness. However, we are working on export licenses for the UK, UAE, and USA. Stay tuned for updates!"
  },
  {
    question: "What should I do if my mangoes arrive damaged?",
    answer: "We take great care in packaging, but if your order arrives damaged, please take a photo and contact our support team within 24 hours. We offer a full replacement or refund for any quality issues."
  }
];

export const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-stone-50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-mango-yellow/20 rounded-2xl mb-6">
            <HelpCircle className="text-mango-orange" size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-mango-dark mb-6">
            Frequently Asked <span className="text-mango-orange italic">Questions</span>
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed">
            Everything you need to know about our premium mangoes, delivery process, and quality guarantees.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full p-8 text-left flex items-center justify-between hover:bg-mango-bg transition-colors group"
              >
                <span className="text-lg font-bold text-mango-dark group-hover:text-mango-orange transition-colors">
                  {item.question}
                </span>
                <div className={`p-2 rounded-full transition-all ${activeIndex === index ? 'bg-mango-orange text-white rotate-180' : 'bg-stone-100 text-stone-400'}`}>
                  {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-8 pt-0 text-stone-600 leading-relaxed border-t border-stone-50">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-12 bg-mango-dark rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-mango-orange/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-mango-yellow/10 rounded-full -ml-32 -mb-32 blur-3xl" />
          
          <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Still have questions?</h3>
          <p className="text-white/70 mb-8 relative z-10">Our mango experts are here to help you 24/7.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-mango-orange text-white font-bold rounded-full shadow-xl hover:bg-mango-yellow hover:text-mango-dark transition-all uppercase tracking-widest text-xs relative z-10"
          >
            Contact Support
          </motion.button>
        </div>
      </div>
    </section>
  );
};
