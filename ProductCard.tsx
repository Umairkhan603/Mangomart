import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Heart, Info } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../CartContext';

interface ProductCardProps {
  product: Product;
  onInfoClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onInfoClick }) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
      className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all border border-stone-100 overflow-hidden flex flex-col group"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            className="p-3 bg-white rounded-full text-mango-orange hover:bg-mango-yellow hover:text-mango-dark transition-all shadow-lg"
          >
            <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={() => onInfoClick(product)}
            className="p-3 bg-white rounded-full text-mango-green hover:bg-mango-yellow hover:text-mango-dark transition-all shadow-lg"
          >
            <Info size={18} />
          </button>
        </div>

        {product.isBestSeller && (
          <div className="absolute top-4 left-4 px-4 py-1.5 bg-mango-orange text-white text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg">
            Best Seller
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-display font-bold text-mango-dark group-hover:text-mango-orange transition-colors">{product.name}</h3>
        </div>
        <p className="text-sm text-stone-500 mb-6 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-stone-400 font-bold uppercase tracking-widest mb-1">Price</p>
            <p className="text-xl font-bold text-mango-dark">Rs. {product.price.toLocaleString()}</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product, 1)}
            className="px-6 py-3 bg-mango-green text-white text-xs font-bold rounded-xl hover:bg-mango-dark transition-all uppercase tracking-widest shadow-md flex items-center gap-2"
          >
            <ShoppingCart size={16} />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
