import React from 'react';
import { motion } from 'motion/react';

const VARIETIES = [
  {
    name: 'Chaunsa',
    title: 'The King of Mangoes',
    desc: 'Known for its exceptional sweetness and rich aroma. Harvested in July.',
    color: 'bg-mango-yellow/20',
    icon: '👑'
  },
  {
    name: 'Sindhri',
    title: 'The Honey Mango',
    desc: 'Large, oval-shaped with a smooth texture and honey-like taste. From Sindh.',
    color: 'bg-mango-green/10',
    icon: '🍯'
  },
  {
    name: 'Anwar Ratol',
    title: 'Small but Mighty',
    desc: 'Small size but packed with the most intense aroma and flavor.',
    color: 'bg-mango-orange/10',
    icon: '✨'
  },
  {
    name: 'Langra',
    title: 'The Green Gem',
    desc: 'Stays greenish even when ripe. Unique tangy-sweet flavor profile.',
    color: 'bg-stone-100',
    icon: '🍃'
  }
];

export const VarietySpotlight: React.FC = () => {
  return (
    <section id="varieties" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-mango-dark mb-4">
            Explore Our Varieties
          </h2>
          <p className="text-stone-500 max-w-lg mx-auto">
            Each Pakistani mango variety has its own unique personality, flavor, and harvest window.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {VARIETIES.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`p-8 rounded-[40px] ${v.color} border border-transparent hover:border-mango-yellow transition-all group`}
            >
              <div className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-300">
                {v.icon}
              </div>
              <h3 className="text-2xl font-display font-bold text-mango-dark mb-2">{v.name}</h3>
              <p className="text-sm font-bold text-mango-orange mb-4 uppercase tracking-wider">{v.title}</p>
              <p className="text-stone-600 text-sm leading-relaxed">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
