import React, { useState } from 'react';
import { CartProvider, useCart } from './CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { Checkout } from './components/Checkout';
import { AboutUs } from './components/AboutUs';
import { ContactUs } from './components/ContactUs';
import { Blog } from './components/Blog';
import { ProductModal } from './components/ProductModal';
import { DeliveryServices } from './components/DeliveryServices';
import { CustomerReviews } from './components/CustomerReviews';
import { UserPanel } from './components/UserPanel';
import { AdminPanel } from './components/AdminPanel';
import { VarietiesPage } from './components/VarietiesPage';
import { GiftBoxesPage } from './components/GiftBoxesPage';
import { BulkOrdersPage } from './components/BulkOrdersPage';
import { SocialFloatingBar } from './components/SocialFloatingBar';
import { MangoGuide } from './components/MangoGuide';
import { MangoComparison } from './components/MangoComparison';
import { FAQ } from './components/FAQ';
import { Newsletter } from './components/Newsletter';
import { MangoSeasonCalendar } from './components/MangoSeasonCalendar';
import { Counter } from './components/Counter';
import { MangoSommelier } from './components/MangoSommelier';
import { TraceabilitySection } from './components/TraceabilitySection';
import { PRODUCTS } from './constants';
import { Product } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Check, Loader2 } from 'lucide-react';

type View = 'home' | 'checkout' | 'success' | 'about' | 'contact' | 'blog' | 'profile' | 'admin' | 'varieties' | 'gifts' | 'bulk';

function AppContent() {
  const { user, loading } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [view, setView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setView('checkout');
    window.scrollTo(0, 0);
  };

  const handleOrderSuccess = () => {
    setView('success');
    window.scrollTo(0, 0);
  };

  const varieties = PRODUCTS.filter(p => p.category === 'Premium' || p.category === 'Seasonal');
  const giftBoxes = PRODUCTS.filter(p => p.category === 'Gift');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mango-bg">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-mango-yellow animate-spin mx-auto mb-4" />
          <p className="text-mango-dark font-bold font-display">Loading MangoMart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mango-bg">
      <Navbar 
        onCartClick={() => setIsCartOpen(true)} 
        onHomeClick={() => setView('home')}
        onViewChange={(v) => { setView(v as any); window.scrollTo(0, 0); }}
      />
      
      <main className="pt-20">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero />
              
              {/* Quick Stats Banner */}
              <section className="py-12 bg-white border-b border-stone-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center">
                      <p className="text-4xl font-display font-bold text-mango-dark mb-1">
                        <Counter value={25} suffix="+" />
                      </p>
                      <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Years of Farming</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-4xl font-display font-bold text-mango-dark mb-1">
                        <Counter value={10} suffix="k+" />
                      </p>
                      <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Happy Customers</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-4xl font-display font-bold text-mango-dark mb-1">
                        <Counter value={100} suffix="%" />
                      </p>
                      <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Organic Ripening</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Mango Gift Boxes Section */}
              <section id="gifts" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="section-title text-3xl font-display font-bold text-mango-dark uppercase tracking-widest">
                    Mango Gift Boxes
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {giftBoxes.map((product) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onInfoClick={(p) => setSelectedProduct(p)}
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* Mango Varieties Section */}
              <section id="varieties" className="py-20 bg-mango-bg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="section-title text-3xl font-display font-bold text-mango-dark uppercase tracking-widest">
                    Mango Varieties
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {varieties.slice(0, 4).map((product) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onInfoClick={(p) => setSelectedProduct(p)}
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* Bulk Mango Orders Section */}
              <section id="bulk" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="section-title text-3xl font-display font-bold text-mango-dark uppercase tracking-widest">
                    Bulk Mango Orders
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="rounded overflow-hidden shadow-md">
                      <img 
                        src="https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&q=80&w=800" 
                        alt="Bulk Order 1" 
                        className="w-full h-80 object-cover"
                      />
                    </div>
                    <div className="rounded overflow-hidden shadow-md">
                      <img 
                        src="https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=800" 
                        alt="Bulk Order 2" 
                        className="w-full h-80 object-cover"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Product Details Section (Featured Item) */}
              <section className="py-20 bg-mango-bg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="section-title text-3xl font-display font-bold text-mango-dark uppercase tracking-widest">
                    Product Details
                  </h2>
                  <div className="bg-white p-8 rounded shadow-sm border border-stone-200 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="rounded overflow-hidden shadow-lg">
                      <img 
                        src={PRODUCTS[0].image} 
                        alt="Featured Mango" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-3xl font-display font-bold text-mango-dark">{PRODUCTS[0].name}</h3>
                        <span className="px-3 py-1 bg-mango-green text-white text-[10px] font-bold rounded uppercase tracking-wider">In Stock</span>
                      </div>
                      <p className="text-2xl font-bold text-mango-orange mb-6">Rs. {PRODUCTS[0].price.toLocaleString()} <span className="text-sm font-normal text-stone-400">(5kg Box)</span></p>
                      
                      <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-3 text-mango-green font-bold text-sm">
                          <Check size={18} />
                          <span>Premium Quality</span>
                        </div>
                        <div className="flex items-center gap-3 text-mango-green font-bold text-sm">
                          <Check size={18} />
                          <span>Real-time Fresh</span>
                        </div>
                      </div>

                      <p className="text-sm text-stone-500 leading-relaxed mb-8">
                        {PRODUCTS[0].fullDescription || PRODUCTS[0].description}
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-stone-200 rounded">
                          <button className="px-4 py-2 hover:bg-stone-100">-</button>
                          <span className="px-4 py-2 font-bold">1</span>
                          <button className="px-4 py-2 hover:bg-stone-100">+</button>
                        </div>
                        <button className="flex-1 py-3 bg-mango-green text-white font-bold rounded hover:bg-mango-dark transition-colors uppercase tracking-widest">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <DeliveryServices />

              <MangoSommelier />

              <MangoComparison />
              
              <TraceabilitySection />

              <MangoGuide />

              {/* About MangoMart Pakistan Section */}
              <section id="about" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="section-title text-3xl font-display font-bold text-mango-dark uppercase tracking-widest">
                    About MangoMart Pakistan
                  </h2>
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="rounded overflow-hidden shadow-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&q=80&w=1000" 
                        alt="Farm House" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-bold text-mango-dark mb-4">From Our Farms to Your Table</h3>
                      <p className="text-sm text-stone-500 leading-relaxed mb-6">
                        MangoMart Pakistan is dedicated to bringing the finest, naturally ripened mangoes from the heart of Pakistan's mango orchards directly to your doorstep. We believe in quality, transparency, and supporting our local farmers.
                      </p>
                      <button 
                        onClick={() => setView('about')}
                        className="px-8 py-3 bg-mango-green text-white font-bold rounded hover:bg-mango-dark transition-colors uppercase tracking-widest text-xs"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <CustomerReviews />

              <FAQ />

              <Newsletter />

              {/* Mango Health Benefits Section */}
              <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <img 
                        src="https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=1000" 
                        alt="Healthy Mangoes" 
                        className="rounded-[40px] shadow-2xl relative z-10"
                      />
                      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-mango-yellow rounded-full -z-10 blur-2xl opacity-30" />
                    </motion.div>
                    
                    <div className="space-y-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                      >
                        <h2 className="text-4xl font-display font-bold text-mango-dark mb-4">
                          Why Mangoes are the <span className="text-mango-orange">King of Fruits</span>
                        </h2>
                        <p className="text-stone-500 leading-relaxed">
                          Beyond their incredible taste, mangoes are packed with vitamins, minerals, and antioxidants that are essential for a healthy lifestyle.
                        </p>
                      </motion.div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        {[
                          { title: 'Vitamin C Boost', desc: 'Strengthens your immune system naturally.' },
                          { title: 'Eye Health', desc: 'Rich in Vitamin A for better vision.' },
                          { title: 'Digestion', desc: 'Contains enzymes that help break down protein.' },
                          { title: 'Skin Glow', desc: 'Antioxidants help clear pores and add glow.' },
                        ].map((benefit, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 rounded-2xl bg-mango-bg border border-stone-100"
                          >
                            <h4 className="font-bold text-mango-dark mb-2">{benefit.title}</h4>
                            <p className="text-xs text-stone-500">{benefit.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <MangoSeasonCalendar />
            </motion.div>
          )}

          {view === 'checkout' && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h2 className="section-title text-3xl font-display font-bold text-mango-dark uppercase tracking-widest">
                  Checkout Page
                </h2>
                <Checkout 
                  onBack={() => setView('home')} 
                  onSuccess={handleOrderSuccess}
                />
              </div>
            </motion.div>
          )}

          {view === 'about' && (
            <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AboutUs />
            </motion.div>
          )}

          {view === 'contact' && (
            <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ContactUs />
            </motion.div>
          )}

          {view === 'blog' && (
            <motion.div key="blog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Blog />
            </motion.div>
          )}

          {view === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <UserPanel />
            </motion.div>
          )}

          {view === 'admin' && (
            <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AdminPanel />
            </motion.div>
          )}

          {view === 'varieties' && (
            <motion.div key="varieties" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <VarietiesPage onProductClick={(p) => setSelectedProduct(p)} />
            </motion.div>
          )}

          {view === 'gifts' && (
            <motion.div key="gifts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <GiftBoxesPage onProductClick={(p) => setSelectedProduct(p)} />
            </motion.div>
          )}

          {view === 'bulk' && (
            <motion.div key="bulk" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <BulkOrdersPage />
            </motion.div>
          )}

          {view === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto px-4 py-32 text-center"
            >
              <div className="w-24 h-24 bg-mango-green/10 text-mango-green rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle size={48} />
              </div>
              <h2 className="text-4xl font-display font-bold text-mango-dark mb-4">Order Placed Successfully!</h2>
              <p className="text-stone-500 mb-10 text-lg">
                Thank you for choosing MangoMart PK. We've sent a confirmation email to your inbox. 
                Our team will contact you shortly for delivery scheduling.
              </p>
              <button 
                onClick={() => setView('home')}
                className="px-10 py-4 bg-mango-yellow text-mango-dark font-bold rounded-2xl hover:bg-mango-orange hover:text-white transition-all"
              >
                Continue Shopping
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={handleCheckout}
      />

      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />

      <SocialFloatingBar />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
