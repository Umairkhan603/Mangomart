import React from 'react';
import { motion } from 'motion/react';
import { PRODUCTS } from '../constants';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

interface VarietiesPageProps {
  onProductClick: (product: Product) => void;
}

export const VarietiesPage: React.FC<VarietiesPageProps> = ({ onProductClick }) => {
  const varieties = PRODUCTS.filter(p => p.category === 'Premium' || p.category === 'Seasonal');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-mango-dark mb-4">
          Our Mango Varieties
        </h1>
        <p className="text-stone-500 max-w-2xl mx-auto">
          From the world-famous Sindhri to the aromatic Anwar Ratol, discover the finest mangoes from Pakistan's best orchards.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {varieties.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <ProductCard 
              product={product} 
              onInfoClick={onProductClick}
            />
          </motion.div>
        ))}
      </div>

      {/* Mango Guide Section */}
      <section className="mt-32 py-20 bg-mango-bg rounded-[40px] px-8 md:px-16 border border-stone-100">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-mango-dark mb-6">Mango Selection & Care Guide</h2>
          <p className="text-stone-500">Master the art of choosing and storing the perfect Pakistani mangoes.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-mango-yellow/20 text-mango-orange rounded-2xl flex items-center justify-center font-bold text-xl">1</div>
            <h3 className="text-lg font-bold text-mango-dark">The Smell Test</h3>
            <p className="text-sm text-stone-500 leading-relaxed">A ripe mango will have a strong, sweet, and aromatic scent at the stem end. If it smells like nothing, it's not ready.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-mango-green/20 text-mango-green rounded-2xl flex items-center justify-center font-bold text-xl">2</div>
            <h3 className="text-lg font-bold text-mango-dark">The Squeeze</h3>
            <p className="text-sm text-stone-500 leading-relaxed">Gently squeeze the mango. A ripe one will give slightly, similar to a peach or avocado. Avoid mangoes with soft spots.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-mango-orange/20 text-mango-orange rounded-2xl flex items-center justify-center font-bold text-xl">3</div>
            <h3 className="text-lg font-bold text-mango-dark">Storage</h3>
            <p className="text-sm text-stone-500 leading-relaxed">Keep unripe mangoes at room temperature. Once ripe, move them to the fridge to slow down the ripening process for up to 5 days.</p>
          </div>
        </div>
      </section>

      {/* Variety Info Section */}
      <div className="mt-24 space-y-24">
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=1000" 
              alt="Sindhri Mangoes" 
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-mango-dark">The Sindhri Queen</h2>
            <p className="text-stone-600 leading-relaxed">
              Sindhri is the most famous variety from Pakistan, particularly from the Mirpur Khas region. It is known for its large size, yellow skin when ripe, and incredibly sweet, fiberless pulp.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-mango-green font-bold">
                <span className="w-2 h-2 bg-mango-yellow rounded-full" />
                Origin: Mirpur Khas, Sindh
              </li>
              <li className="flex items-center gap-3 text-mango-green font-bold">
                <span className="w-2 h-2 bg-mango-yellow rounded-full" />
                Season: May - June
              </li>
              <li className="flex items-center gap-3 text-mango-green font-bold">
                <span className="w-2 h-2 bg-mango-yellow rounded-full" />
                Taste: Honey-like sweetness
              </li>
            </ul>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
          <div className="md:order-2 rounded-3xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&q=80&w=1000" 
              alt="Chaunsa Mangoes" 
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="md:order-1 space-y-6">
            <h2 className="text-3xl font-display font-bold text-mango-dark">The Aromatic Chaunsa</h2>
            <p className="text-stone-600 leading-relaxed">
              Chaunsa mango of Pakistan is one of the world's top available varieties. It is uniquely aromatic and sweet. The name was given by Sher Shah Suri after defeating Humayun at Chaunsa.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-mango-green font-bold">
                <span className="w-2 h-2 bg-mango-yellow rounded-full" />
                Origin: Multan, Punjab
              </li>
              <li className="flex items-center gap-3 text-mango-green font-bold">
                <span className="w-2 h-2 bg-mango-yellow rounded-full" />
                Season: June - August
              </li>
              <li className="flex items-center gap-3 text-mango-green font-bold">
                <span className="w-2 h-2 bg-mango-yellow rounded-full" />
                Taste: Rich, creamy, and aromatic
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};
