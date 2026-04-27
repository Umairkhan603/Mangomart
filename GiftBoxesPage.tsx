import React from 'react';
import { motion } from 'motion/react';
import { Gift, Heart, Sparkles, Star, Package, CheckCircle, TrendingDown, Layers, ShieldCheck, Zap } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

interface GiftBoxesPageProps {
  onProductClick: (product: Product) => void;
}

export const GiftBoxesPage: React.FC<GiftBoxesPageProps> = ({ onProductClick }) => {
  const giftBoxes = PRODUCTS.filter(p => p.category === 'Gift');

  const wholesaleTiers = [
    { range: '10 - 24 Boxes', discount: '5% OFF', icon: <Package className="text-mango-green" /> },
    { range: '25 - 49 Boxes', discount: '10% OFF', icon: <Layers className="text-mango-orange" /> },
    { range: '50 - 99 Boxes', discount: '15% OFF', icon: <Zap className="text-mango-yellow" /> },
    { range: '100+ Boxes', discount: '20% OFF', icon: <Star className="text-mango-dark" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-mango-dark mb-4">
            Premium <span className="text-mango-orange">Gift Boxes</span>
          </h1>
          <p className="text-stone-500 max-w-2xl mx-auto">
            Share the sweetness of Pakistan with our elegantly packaged mango gift boxes. Perfect for corporate gifts, family, and friends.
          </p>
        </motion.div>
      </div>

      {/* Wholesale Pricing Tiers */}
      <section className="mb-24">
        <div className="bg-white rounded-[40px] border border-stone-100 shadow-sm p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-display font-bold text-mango-dark flex items-center justify-center md:justify-start gap-3">
                <TrendingDown className="text-mango-green" />
                Wholesale Pricing Tiers
              </h2>
              <p className="text-stone-500 max-w-md">Save more when you gift more. Perfect for weddings, corporate events, and large families.</p>
            </div>
            <div className="px-6 py-3 bg-mango-green/10 text-mango-green rounded-full font-bold text-sm uppercase tracking-widest border border-mango-green/20">
              Bulk Discounts Applied Automatically
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wholesaleTiers.map((tier, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 bg-stone-50 rounded-3xl border border-stone-100 text-center space-y-4 hover:bg-white hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                  {tier.icon}
                </div>
                <h4 className="text-sm font-bold text-stone-400 uppercase tracking-widest">{tier.range}</h4>
                <p className="text-3xl font-display font-bold text-mango-dark">{tier.discount}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24">
        {giftBoxes.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard 
              product={product} 
              onInfoClick={onProductClick}
            />
          </motion.div>
        ))}
      </div>

      {/* Gift Experience Section */}
      <section className="py-24 bg-mango-dark text-white rounded-[60px] overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-mango-yellow rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-mango-orange rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">The Perfect Gifting Experience</h2>
            <p className="text-stone-400">We don't just send mangoes; we deliver a premium experience that leaves a lasting impression.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: <Sparkles className="text-mango-yellow" />, title: 'Premium Packaging', desc: 'Hand-crafted wooden and high-quality cardboard boxes with elegant designs.' },
              { icon: <Heart className="text-mango-orange" />, title: 'Personalized Notes', desc: 'Add a custom message to your gift box for that personal touch.' },
              { icon: <Star className="text-mango-green" />, title: 'Selected Quality', desc: 'Only the top 1% of our harvest is selected for our premium gift boxes.' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold">{item.title}</h4>
                <p className="text-sm text-stone-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Box Customizer Feature */}
      <section className="mt-32 py-24 bg-mango-yellow/5 rounded-[60px] border border-mango-yellow/20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-mango-yellow/20 text-mango-dark rounded-full text-xs font-bold uppercase tracking-widest">
                <Star size={14} className="fill-current" />
                New Feature
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-mango-dark">Build Your Own <span className="text-mango-orange">Gift Box</span></h2>
              <p className="text-stone-600 leading-relaxed text-lg">
                Can't decide on just one variety? Our new customizer allows you to mix and match your favorite mangoes in a single premium gift box.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: <ShieldCheck className="text-mango-green" />, title: 'Quality Guaranteed' },
                  { icon: <Zap className="text-mango-orange" />, title: 'Express Delivery' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      {item.icon}
                    </div>
                    <span className="font-bold text-mango-dark text-sm">{item.title}</span>
                  </div>
                ))}
              </div>
              <button className="px-10 py-5 bg-mango-dark text-white font-bold rounded-2xl uppercase tracking-widest shadow-xl hover:bg-mango-orange transition-all transform hover:scale-105">
                Start Customizing
              </button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[60px] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=1000" 
                  alt="Custom Gift Box" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[40px] shadow-2xl border border-stone-100 max-w-[240px] hidden md:block">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Popular Mix</p>
                <p className="text-sm font-bold text-mango-dark leading-relaxed">Sindhri + Anwar Ratol + Chaunsa Celebration Box</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Gifting Section */}
      <section className="mt-24 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-mango-dark">Corporate Gifting</h2>
          <p className="text-stone-600 leading-relaxed">
            Impress your clients and partners with the world's most delicious fruit. We offer customized corporate gifting solutions including company branding on boxes and bulk delivery to multiple addresses.
          </p>
          <div className="space-y-4">
            {[
              'Customized Company Branding',
              'Bulk Delivery to Multiple Locations',
              'Special Corporate Pricing',
              'Dedicated Account Manager'
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-mango-green font-bold">
                <CheckCircle size={20} />
                <span>{text}</span>
              </div>
            ))}
          </div>
          <button className="px-8 py-4 bg-mango-orange text-white font-bold rounded-xl uppercase tracking-widest shadow-lg hover:bg-mango-dark transition-all">
            Inquire for Corporate
          </button>
        </div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&q=80&w=1000" 
            alt="Corporate Gift Box" 
            className="rounded-[40px] shadow-2xl"
          />
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-mango-yellow rounded-full -z-10 blur-2xl opacity-30" />
        </div>
      </section>

      {/* Gift Guide Section */}
      <section className="mt-32 py-24 bg-stone-50 rounded-[60px] overflow-hidden">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-mango-dark mb-6">Choosing the Right Gift</h2>
            <p className="text-stone-500 leading-relaxed">Not sure which box to pick? Our gift guide helps you select the perfect variety for every occasion.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              { title: "For Family & Friends", desc: "Our 'Seasonal Mix' box is the most popular choice, offering a variety of flavors that everyone will love.", recommendation: "Seasonal Variety Box" },
              { title: "For Corporate Clients", desc: "The 'Premium Sindhri' box in our luxury wooden packaging makes a powerful statement of quality and respect.", recommendation: "Luxury Wooden Gift Box" },
              { title: "For Special Occasions", desc: "Our 'Anwar Ratol' limited edition box is for those who truly appreciate the finest aromas in the world.", recommendation: "Anwar Ratol Special Box" },
              { title: "For Bulk Gifting", desc: "Our 'Classic Chaunsa' boxes offer the best balance of world-famous taste and value for large groups.", recommendation: "Classic Chaunsa Bulk Pack" }
            ].map((item, index) => (
              <div key={index} className="p-10 bg-white rounded-[40px] border border-stone-100 shadow-sm hover:shadow-lg transition-all">
                <h4 className="text-xl font-bold text-mango-dark mb-4">{item.title}</h4>
                <p className="text-stone-500 text-sm leading-relaxed mb-6">{item.desc}</p>
                <div className="p-4 bg-mango-bg rounded-2xl border-l-4 border-mango-orange">
                  <p className="text-xs font-bold text-mango-dark uppercase tracking-widest">Recommended:</p>
                  <p className="text-sm font-bold text-mango-orange">{item.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
