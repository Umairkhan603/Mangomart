import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingCart, ShieldCheck, Truck, Info, ChevronRight, ChevronLeft } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../CartContext';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = React.useState(1);
  const [selectedWeight, setSelectedWeight] = React.useState(product?.selectedWeight || 9);

  if (!product) return null;

  // Calculate price based on weight (assuming base price is for 9kg)
  const baseWeight = 9;
  const currentPrice = Math.round((product.price / baseWeight) * selectedWeight);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-5xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-mango-dark hover:bg-mango-yellow transition-colors"
          >
            <X size={24} />
          </button>

          {/* Image Section */}
          <div className="md:w-1/2 relative bg-stone-50">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-8 left-8 flex gap-2">
              {product.isBestSeller && (
                <span className="px-4 py-2 bg-mango-green text-white text-xs font-bold rounded-full shadow-lg">BEST SELLER</span>
              )}
              <span className="px-4 py-2 bg-white text-mango-dark text-xs font-bold rounded-full shadow-lg">{product.variety}</span>
            </div>
          </div>

          {/* Content Section */}
          <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-mango-yellow">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="text-xs font-bold text-stone-400">(12 Reviews)</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-mango-dark mb-4">{product.name}</h2>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-mango-orange">Rs. {currentPrice.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-lg text-stone-400 line-through">Rs. {Math.round((product.originalPrice / baseWeight) * selectedWeight).toLocaleString()}</span>
                )}
              </div>
              <p className="text-stone-600 leading-relaxed mb-8">
                {product.fullDescription || product.description}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-8 mb-10">
              <div>
                <label className="block text-sm font-bold text-mango-dark mb-4">Select Weight</label>
                <div className="flex flex-wrap gap-3">
                  {product.weightOptions.map((w) => (
                    <button 
                      key={w}
                      onClick={() => setSelectedWeight(w)}
                      className={`px-6 py-3 rounded-xl font-bold text-sm transition-all border-2 ${
                        selectedWeight === w 
                          ? 'border-mango-yellow bg-mango-yellow/5 text-mango-dark' 
                          : 'border-stone-100 text-stone-400 hover:border-stone-200'
                      }`}
                    >
                      {w} KG Box
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="flex items-center gap-3 mb-2">
                    <ShieldCheck size={18} className="text-mango-green" />
                    <span className="text-xs font-bold text-mango-dark uppercase">Quality</span>
                  </div>
                  <p className="text-[10px] text-stone-500">A+ Export Grade</p>
                </div>
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Truck size={18} className="text-mango-orange" />
                    <span className="text-xs font-bold text-mango-dark uppercase">Delivery</span>
                  </div>
                  <p className="text-[10px] text-stone-500">24-48h Nationwide</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <div className="flex items-center gap-4 bg-stone-100 rounded-2xl px-4 py-2">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-white rounded-xl transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="font-bold w-6 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-white rounded-xl transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
              <button 
                onClick={() => {
                  addToCart({ ...product, price: currentPrice, selectedWeight }, quantity);
                  onClose();
                }}
                className="flex-1 py-4 bg-mango-dark text-white font-bold rounded-2xl hover:bg-stone-800 transition-all flex items-center justify-center gap-3 shadow-xl shadow-mango-dark/10"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const Plus = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

const Minus = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
