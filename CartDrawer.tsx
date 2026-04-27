import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onCheckout }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
          >
            <div className="p-6 border-b border-stone-100 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-mango-orange" size={24} />
                <h2 className="text-xl font-bold text-mango-dark">Your Cart</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-stone-50 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag size={32} className="text-stone-300" />
                  </div>
                  <p className="text-stone-500 font-medium">Your cart is empty</p>
                  <button 
                    onClick={onClose}
                    className="mt-4 text-mango-orange font-bold hover:underline"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.id}-${item.selectedWeight}`} className="flex gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-bold text-mango-dark text-sm">{item.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item.id, item.selectedWeight)}
                          className="text-stone-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-stone-500 mb-3">{item.selectedWeight}KG Box</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 bg-stone-50 rounded-lg p-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedWeight)}
                            className="p-1 hover:bg-white rounded-md transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedWeight)}
                            className="p-1 hover:bg-white rounded-md transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="font-bold text-mango-dark">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-stone-100 bg-stone-50/50">
                <div className="flex justify-between mb-2">
                  <span className="text-stone-500">Subtotal</span>
                  <span className="font-bold text-mango-dark">Rs. {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="text-stone-500">Delivery</span>
                  <span className="text-mango-green font-bold">FREE</span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full py-4 bg-mango-dark text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-stone-800 transition-all group"
                >
                  Checkout Now
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
