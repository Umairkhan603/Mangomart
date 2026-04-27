import React from 'react';
import { motion } from 'motion/react';
import { Star, Zap, Droplets, Thermometer } from 'lucide-react';

const COMPARISON_DATA = [
  { variety: 'Sindhri', sweetness: 5, aroma: 4, size: 'Large', season: 'June - July', bestFor: 'Milkshakes & Fresh' },
  { variety: 'Chaunsa', sweetness: 5, aroma: 5, size: 'Medium', season: 'July - August', bestFor: 'Eating Fresh' },
  { variety: 'Anwar Ratol', sweetness: 5, aroma: 5, size: 'Small', season: 'June - July', bestFor: 'Gifting & Dessert' },
  { variety: 'Langra', sweetness: 4, aroma: 4, size: 'Medium', season: 'July', bestFor: 'Tangy Salads' },
  { variety: 'Dusehri', sweetness: 5, aroma: 3, size: 'Medium', season: 'June', bestFor: 'Daily Snack' },
  { variety: 'White Chaunsa', sweetness: 5, aroma: 4, size: 'Large', season: 'August - Sept', bestFor: 'Late Season' },
  { variety: 'Fajri', sweetness: 4, aroma: 3, size: 'Extra Large', season: 'July - August', bestFor: 'Slicing' },
];

export const MangoComparison: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-mango-orange font-bold uppercase tracking-widest mb-4">Choose Your Perfect Match</p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-mango-dark mb-6">
            Mango <span className="text-mango-orange italic">Comparison Matrix</span>
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Not sure which variety to pick? Compare the sweetness, aroma, and best uses of our top-selling Pakistani mangoes.
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl shadow-2xl border border-stone-100">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-mango-dark text-white">
                <th className="p-8 font-bold uppercase tracking-widest text-xs">Variety</th>
                <th className="p-8 font-bold uppercase tracking-widest text-xs">Sweetness</th>
                <th className="p-8 font-bold uppercase tracking-widest text-xs">Aroma</th>
                <th className="p-8 font-bold uppercase tracking-widest text-xs">Size</th>
                <th className="p-8 font-bold uppercase tracking-widest text-xs">Peak Season</th>
                <th className="p-8 font-bold uppercase tracking-widest text-xs">Best For</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_DATA.map((item, index) => (
                <motion.tr 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`border-b border-stone-100 hover:bg-mango-bg transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'}`}
                >
                  <td className="p-8">
                    <span className="text-lg font-bold text-mango-dark">{item.variety}</span>
                  </td>
                  <td className="p-8">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={i < item.sweetness ? 'fill-mango-yellow text-mango-yellow' : 'text-stone-200'} 
                        />
                      ))}
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Droplets 
                          key={i} 
                          size={16} 
                          className={i < item.aroma ? 'fill-mango-orange text-mango-orange' : 'text-stone-200'} 
                        />
                      ))}
                    </div>
                  </td>
                  <td className="p-8">
                    <span className="px-4 py-1 bg-stone-200 rounded-full text-xs font-bold text-stone-600 uppercase tracking-widest">
                      {item.size}
                    </span>
                  </td>
                  <td className="p-8">
                    <span className="text-sm font-medium text-stone-600">{item.season}</span>
                  </td>
                  <td className="p-8">
                    <span className="text-sm font-bold text-mango-orange italic">{item.bestFor}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-4 p-6 bg-mango-bg rounded-2xl border border-mango-yellow/20">
            <Star className="text-mango-yellow fill-mango-yellow" size={24} />
            <p className="text-xs font-bold text-mango-dark uppercase tracking-widest">Sweetness Index</p>
          </div>
          <div className="flex items-center gap-4 p-6 bg-mango-bg rounded-2xl border border-mango-yellow/20">
            <Droplets className="text-mango-orange fill-mango-orange" size={24} />
            <p className="text-xs font-bold text-mango-dark uppercase tracking-widest">Aroma Intensity</p>
          </div>
          <div className="flex items-center gap-4 p-6 bg-mango-bg rounded-2xl border border-mango-yellow/20">
            <Zap className="text-mango-orange" size={24} />
            <p className="text-xs font-bold text-mango-dark uppercase tracking-widest">Energy Boost</p>
          </div>
          <div className="flex items-center gap-4 p-6 bg-mango-bg rounded-2xl border border-mango-yellow/20">
            <Thermometer className="text-mango-orange" size={24} />
            <p className="text-xs font-bold text-mango-dark uppercase tracking-widest">Seasonal Peak</p>
          </div>
        </div>
      </div>
    </section>
  );
};
