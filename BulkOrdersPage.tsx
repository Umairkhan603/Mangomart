import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Truck, Package, Phone, Mail, CheckCircle, Send, Globe, Ship, Plane, Calculator, Info } from 'lucide-react';
import { db, collection, addDoc } from '../firebase';
import { handleFirestoreError, OperationType } from '../lib/error-handler';

export const BulkOrdersPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    variety: 'Sindhri',
    quantity: 1,
    contactMethod: 'WhatsApp',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'bulk_inquiries'), {
        ...formData,
        createdAt: new Date(),
        status: 'pending'
      });
      setSubmitted(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'bulk_inquiries');
    } finally {
      setLoading(false);
    }
  };

  const [destination, setDestination] = useState('');
  const [shippingQuote, setShippingQuote] = useState<any>(null);

  const estimateShipping = () => {
    if (!destination) return;
    setLoading(true);
    setTimeout(() => {
      setShippingQuote({
        air: Math.floor(Math.random() * 500) + 200,
        sea: Math.floor(Math.random() * 200) + 50,
        timeAir: '3-5 Days',
        timeSea: '15-20 Days'
      });
      setLoading(false);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[40px] shadow-2xl border border-stone-100"
        >
          <div className="w-20 h-20 bg-mango-green/10 text-mango-green rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-display font-bold text-mango-dark mb-4">Inquiry Received!</h2>
          <p className="text-stone-500 mb-8">
            Thank you for your interest in bulk orders. Our wholesale team will contact you within 24 hours to discuss pricing and logistics.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-8 py-3 bg-mango-dark text-white font-bold rounded-xl uppercase tracking-widest"
          >
            Send Another Inquiry
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-mango-dark mb-6">
              Bulk & Wholesale <span className="text-mango-orange">Inquiries</span>
            </h1>
            <p className="text-stone-500 mb-12 leading-relaxed">
              Are you looking to export, distribute, or order in large quantities for your business or event? We provide premium Pakistani mangoes at competitive wholesale rates with worldwide shipping options.
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              { icon: <Truck className="text-mango-orange" />, title: 'Global Logistics', desc: 'We handle air and sea freight with temperature-controlled containers.' },
              { icon: <Package className="text-mango-green" />, title: 'Custom Packaging', desc: 'Branded boxes and custom weights available for retail partners.' },
              { icon: <CheckCircle className="text-mango-yellow" />, title: 'Quality Assurance', desc: 'Every batch is inspected for ripeness, size, and export standards.' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6"
              >
                <div className="shrink-0 w-12 h-12 bg-white rounded-2xl shadow-sm border border-stone-100 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-mango-dark mb-1">{item.title}</h4>
                  <p className="text-sm text-stone-500">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-mango-dark text-white rounded-3xl">
            <h4 className="font-bold mb-4">Direct Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-stone-400">
                <Phone size={18} />
                <div className="flex flex-col">
                  <a href="https://wa.me/923062841484" target="_blank" rel="noopener noreferrer" className="hover:text-mango-orange transition-colors">03062841484</a>
                  <a href="https://wa.me/923702182841" target="_blank" rel="noopener noreferrer" className="hover:text-mango-orange transition-colors">03702182841</a>
                </div>
              </div>
              <div className="flex items-center gap-3 text-stone-400">
                <Mail size={18} />
                <a href="mailto:mangomartpakistan@gmail.com" className="hover:text-mango-orange transition-colors">mangomartpakistan@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-[40px] shadow-2xl border border-stone-100"
        >
          <h3 className="text-2xl font-display font-bold text-mango-dark mb-8">Request a Quote</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-mango-orange outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Company Name</label>
                <input 
                  type="text" 
                  value={formData.company}
                  onChange={e => setFormData({...formData, company: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-mango-orange outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Email Address</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-mango-orange outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Phone Number</label>
                <input 
                  required
                  type="tel" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-mango-orange outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Preferred Variety</label>
                <select 
                  value={formData.variety}
                  onChange={e => setFormData({...formData, variety: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-mango-orange outline-none transition-colors"
                >
                  <option>Sindhri</option>
                  <option>Chaunsa</option>
                  <option>Anwar Ratol</option>
                  <option>Langra</option>
                  <option>White Chaunsa</option>
                  <option>Dusehri</option>
                  <option>Fajri</option>
                  <option>Samar Bahisht</option>
                  <option>Neelum</option>
                  <option>Gulab Khas</option>
                  <option>Sensation</option>
                  <option>Azeem Chaunsa</option>
                  <option>Lal Badshah</option>
                  <option>Maldah</option>
                  <option>Other / Mixed</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Estimated Quantity (Boxes)</label>
                <select 
                  value={formData.quantity}
                  onChange={e => setFormData({...formData, quantity: Number(e.target.value)})}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-mango-orange outline-none transition-colors"
                >
                  <option value={1}>1 Box (Sample)</option>
                  <option value={5}>5 Boxes</option>
                  <option value={10}>10 Boxes</option>
                  <option value={25}>25 Boxes</option>
                  <option value={50}>50 Boxes</option>
                  <option value={100}>100 Boxes</option>
                  <option value={200}>200 Boxes</option>
                  <option value={500}>500 Boxes</option>
                  <option value={1000}>1000+ Boxes (Enterprise)</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Preferred Contact Method</label>
                <select 
                  value={formData.contactMethod}
                  onChange={e => setFormData({...formData, contactMethod: e.target.value as any})}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-mango-orange outline-none transition-colors"
                >
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Email">Email</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Company Name (Optional)</label>
                <input 
                  type="text" 
                  value={formData.company}
                  onChange={e => setFormData({...formData, company: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-mango-orange outline-none transition-colors"
                  placeholder="Your Business Name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Additional Requirements</label>
              <textarea 
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-mango-orange outline-none transition-colors min-h-[120px]"
                placeholder="Tell us about your shipping destination or specific needs..."
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-mango-orange text-white font-bold rounded-xl uppercase tracking-widest shadow-lg hover:bg-mango-dark transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Sending...' : (
                <>
                  <Send size={18} />
                  Submit Inquiry
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Wholesale Pricing & Tiers */}
      <section className="mt-32 py-24 bg-stone-50 rounded-[60px] overflow-hidden">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-mango-dark mb-6">Wholesale Pricing Tiers</h2>
            <p className="text-stone-500 leading-relaxed">We offer competitive rates based on order volume. The more you order, the more you save.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { tier: "Silver", quantity: "1 - 100 Boxes", discount: "10% Off", features: ["Sample Orders", "Standard Shipping", "Mixed Varieties"] },
              { tier: "Gold", quantity: "101 - 500 Boxes", discount: "20% Off", features: ["Priority Shipping", "Dedicated Manager", "Custom Branding"] },
              { tier: "Platinum", quantity: "500+ Boxes", discount: "35% Off", features: ["Cold Chain Logistics", "Export Certification", "Custom Packaging"] }
            ].map((item, index) => (
              <div key={index} className={`p-10 rounded-[40px] border shadow-sm hover:shadow-xl transition-all ${index === 1 ? 'bg-mango-dark text-white border-mango-dark' : 'bg-white border-stone-100'}`}>
                <h4 className={`text-xl font-bold mb-2 ${index === 1 ? 'text-mango-yellow' : 'text-mango-dark'}`}>{item.tier} Tier</h4>
                <p className={`text-2xl font-display font-bold mb-4 ${index === 1 ? 'text-white' : 'text-mango-orange'}`}>{item.discount}</p>
                <p className="text-sm font-bold mb-8 opacity-70">{item.quantity}</p>
                <ul className="space-y-4 mb-10">
                  {item.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3 text-sm">
                      <CheckCircle size={16} className={index === 1 ? 'text-mango-yellow' : 'text-mango-green'} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all ${index === 1 ? 'bg-mango-yellow text-mango-dark hover:bg-white' : 'bg-stone-100 text-stone-600 hover:bg-mango-orange hover:text-white'}`}>
                  Select Tier
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Export Standards Section */}
      <section className="mt-32 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&q=80&w=1000" 
            alt="Quality Inspection" 
            className="rounded-[40px] shadow-2xl"
          />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-mango-green rounded-full -z-10 blur-2xl opacity-30" />
        </div>
        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-mango-dark">Global Export Standards</h2>
          <p className="text-stone-600 leading-relaxed">
            Our mangoes meet the highest international quality standards. We are certified for export to multiple regions and follow strict phytosanitary protocols.
          </p>
          <div className="grid grid-cols-2 gap-6">
            {[
              { title: "Phytosanitary", desc: "Certified disease-free" },
              { title: "Traceability", desc: "Farm-to-box tracking" },
              { title: "Sizing", desc: "Uniform export grading" },
              { title: "Brix Level", desc: "Guaranteed sweetness" }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm">
                <h4 className="font-bold text-mango-dark mb-1 text-sm">{item.title}</h4>
                <p className="text-xs text-stone-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2026 Shipping Estimator */}
      <section className="mt-32 py-24 bg-mango-dark text-white rounded-[60px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-mango-yellow/10 rounded-full blur-[120px]" />
        <div className="max-w-4xl mx-auto px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-mango-yellow text-xs font-bold uppercase tracking-[0.3em] mb-6"
            >
              <Globe size={14} /> Global Logistics 2026
            </motion.div>
            <h2 className="text-4xl font-display font-bold mb-6">Instant Shipping Estimator</h2>
            <p className="text-stone-400">Get a real-time estimate for your bulk order shipping costs to any major global hub.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[40px] border border-white/10">
            <div className="flex flex-col md:flex-row gap-4 mb-10">
              <input 
                type="text" 
                placeholder="Enter Destination City (e.g. London, Dubai, New York)" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="flex-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-mango-yellow transition-all"
              />
              <button 
                onClick={estimateShipping}
                className="px-10 py-4 bg-mango-yellow text-mango-dark font-bold rounded-2xl hover:bg-white transition-all flex items-center justify-center gap-2"
              >
                <Calculator size={18} /> Calculate
              </button>
            </div>

            <AnimatePresence>
              {shippingQuote && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid md:grid-cols-2 gap-8"
                >
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center">
                        <Plane size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Air Freight</h4>
                        <p className="text-xs text-stone-500 uppercase tracking-widest">Express Delivery</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-stone-400 text-xs mb-1">Estimated Cost</p>
                        <p className="text-3xl font-display font-bold text-mango-yellow">${shippingQuote.air}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-stone-400 text-xs mb-1">Transit Time</p>
                        <p className="font-bold">{shippingQuote.timeAir}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-mango-green/20 text-mango-green rounded-2xl flex items-center justify-center">
                        <Ship size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Sea Freight</h4>
                        <p className="text-xs text-stone-500 uppercase tracking-widest">Economy Delivery</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-stone-400 text-xs mb-1">Estimated Cost</p>
                        <p className="text-3xl font-display font-bold text-mango-yellow">${shippingQuote.sea}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-stone-400 text-xs mb-1">Transit Time</p>
                        <p className="font-bold">{shippingQuote.timeSea}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-10 flex items-center gap-3 p-4 bg-white/5 rounded-2xl text-stone-500 text-xs italic">
              <Info size={16} />
              Note: These are estimates based on current 2026 market rates. Final pricing will be confirmed by our logistics team.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
