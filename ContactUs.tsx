import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Instagram, Facebook, Twitter, Youtube, Plus, Minus, ShieldCheck, Globe } from 'lucide-react';

export const ContactUs: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    { q: "How do I track my order?", a: "Once your order is shipped, you will receive a tracking number via WhatsApp and Email. You can also track it directly in your user panel." },
    { q: "Do you offer international shipping?", a: "Yes! We export our premium mangoes to several countries. Please contact our export department for a custom quote." },
    { q: "What is your return policy?", a: "We offer a 100% freshness guarantee. If you receive damaged or poor quality fruit, contact us within 24 hours for a full refund or replacement." },
    { q: "Can I customize a corporate gift box?", a: "Absolutely. We offer custom branding, personalized notes, and bulk delivery options for corporate clients." }
  ];

  return (
    <div className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-mango-dark mb-6">Get in <span className="text-mango-orange">Touch</span></h1>
            <p className="text-stone-500 max-w-2xl mx-auto text-lg">
              Have questions about your order or want to discuss bulk corporate gifting? 
              Our team is here to help you experience the best of Pakistani mangoes.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info & Socials */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-stone-100 hover:shadow-xl transition-all">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-mango-yellow/10 rounded-2xl flex items-center justify-center text-mango-orange shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-mango-dark mb-1">Call Us</h4>
                  <div className="flex flex-col">
                    <a href="https://wa.me/923062841484" target="_blank" rel="noopener noreferrer" className="text-stone-500 text-sm mb-1 font-medium hover:text-mango-orange transition-colors">03062841484</a>
                    <a href="https://wa.me/923702182841" target="_blank" rel="noopener noreferrer" className="text-stone-500 text-sm mb-1 font-medium hover:text-mango-orange transition-colors">03702182841</a>
                  </div>
                  <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">Mon-Sat, 9am-6pm</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-stone-100 hover:shadow-xl transition-all">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-mango-green/10 rounded-2xl flex items-center justify-center text-mango-green shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-mango-dark mb-1">Email Us</h4>
                  <a href="mailto:mangomartpakistan@gmail.com" className="text-stone-500 text-sm mb-1 font-medium hover:text-mango-orange transition-colors">mangomartpakistan@gmail.com</a>
                  <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">24/7 Support Response</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-stone-100 hover:shadow-xl transition-all">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-mango-orange/10 rounded-2xl flex items-center justify-center text-mango-orange shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-mango-dark mb-1">Visit Our Farm</h4>
                  <p className="text-stone-500 text-sm mb-1 font-medium">Mango Road, Multan</p>
                  <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">Punjab, Pakistan</p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-mango-dark p-10 rounded-[40px] text-white space-y-6 shadow-2xl">
              <h4 className="text-xl font-display font-bold">Follow Our Journey</h4>
              <p className="text-stone-400 text-sm leading-relaxed">Get a glimpse of our orchards and stay updated with the latest harvests.</p>
              <div className="flex gap-4">
                {[
                  { icon: <Instagram size={20} />, label: 'Instagram' },
                  { icon: <Facebook size={20} />, label: 'Facebook' },
                  { icon: <Twitter size={20} />, label: 'Twitter' },
                  { icon: <Youtube size={20} />, label: 'Youtube' }
                ].map((social, i) => (
                  <button key={i} className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-mango-orange hover:scale-110 transition-all">
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 md:p-16 rounded-[48px] shadow-sm border border-stone-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-mango-yellow/5 rounded-full -mr-32 -mt-32 blur-3xl" />
              
              <div className="relative z-10">
                <h3 className="text-3xl font-display font-bold text-mango-dark mb-10 flex items-center gap-4">
                  <div className="w-12 h-12 bg-mango-yellow rounded-2xl flex items-center justify-center text-mango-dark">
                    <MessageSquare size={24} />
                  </div>
                  Send us a Message
                </h3>
                <form className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Your Name</label>
                      <input 
                        type="text" 
                        className="w-full px-8 py-5 rounded-2xl bg-stone-50 border border-stone-100 focus:ring-2 focus:ring-mango-yellow focus:bg-white outline-none transition-all font-medium"
                        placeholder="Ahmed Khan"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Email Address</label>
                      <input 
                        type="email" 
                        className="w-full px-8 py-5 rounded-2xl bg-stone-50 border border-stone-100 focus:ring-2 focus:ring-mango-yellow focus:bg-white outline-none transition-all font-medium"
                        placeholder="ahmed@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Subject</label>
                    <select className="w-full px-8 py-5 rounded-2xl bg-stone-50 border border-stone-100 focus:ring-2 focus:ring-mango-yellow focus:bg-white outline-none transition-all appearance-none font-medium cursor-pointer">
                      <option>General Inquiry</option>
                      <option>Order Support</option>
                      <option>Bulk/Corporate Orders</option>
                      <option>Farm Visit Request</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Your Message</label>
                    <textarea 
                      className="w-full px-8 py-5 rounded-2xl bg-stone-50 border border-stone-100 focus:ring-2 focus:ring-mango-yellow focus:bg-white outline-none transition-all min-h-[180px] font-medium"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button className="w-full py-6 bg-mango-dark text-white font-bold rounded-2xl hover:bg-mango-orange transition-all flex items-center justify-center gap-4 group shadow-xl uppercase tracking-widest text-sm">
                    Send Message
                    <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-mango-dark mb-4">Frequently Asked Questions</h2>
            <p className="text-stone-500">Quick answers to common questions about our mangoes and delivery.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-3xl border border-stone-100 overflow-hidden shadow-sm">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-stone-50 transition-colors"
                >
                  <span className="font-bold text-mango-dark">{faq.q}</span>
                  {activeFaq === i ? <Minus size={20} className="text-mango-orange" /> : <Plus size={20} className="text-mango-orange" />}
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-8 pb-6 text-stone-500 text-sm leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Map & Office Section */}
        <div className="mt-32 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-mango-dark leading-tight">Our Regional <br /><span className="text-mango-orange">Offices</span></h2>
              <p className="text-stone-500 text-lg">We have a strong presence across major cities to ensure fast and fresh delivery.</p>
            </div>
            <div className="space-y-6">
              {[
                { city: "Multan (Head Office)", address: "12-B, Industrial Estate, Multan, Punjab", phone: "03062841484 / 03702182841", icon: <Globe className="text-mango-yellow" /> },
                { city: "Shujabad (Regional Hub)", address: "Main Mango Road, Shujabad", phone: "+92 301 2345678", icon: <ShieldCheck className="text-mango-green" /> },
                { city: "Muzaffargarh (Distribution)", address: "Chenab Bridge Road, Muzaffargarh", phone: "+92 302 3456789", icon: <Clock className="text-mango-orange" /> },
                { city: "Khanewal (Logistics Center)", address: "N-5 Highway, Khanewal", phone: "+92 303 4567890", icon: <MapPin className="text-mango-yellow" /> },
                { city: "Karachi (Export Center)", address: "Plot 45, Korangi Industrial Area, Karachi", phone: "+92 321 7654321", icon: <Globe className="text-mango-green" /> }
              ].map((office, index) => (
                <div key={index} className="p-8 bg-white rounded-[32px] border border-stone-100 shadow-sm hover:shadow-xl transition-all flex items-start gap-6">
                  <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center shrink-0">
                    {office.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-mango-dark mb-2 text-lg">{office.city}</h4>
                    <p className="text-sm text-stone-500 mb-3">{office.address}</p>
                    <p className="text-xs font-bold text-mango-orange uppercase tracking-widest">{office.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-[600px] bg-stone-200 rounded-[60px] overflow-hidden relative shadow-2xl border border-stone-100 group">
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000" 
              alt="Map Placeholder" 
              className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-mango-dark/40 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="bg-white/90 backdrop-blur-xl p-10 rounded-[48px] shadow-2xl text-center max-w-sm border border-white/20"
              >
                <div className="w-20 h-20 bg-mango-orange rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-mango-orange/20">
                  <MapPin className="text-white" size={40} />
                </div>
                <h4 className="text-2xl font-display font-bold text-mango-dark mb-4">Interactive Farm Map</h4>
                <p className="text-sm text-stone-600 leading-relaxed mb-8">Our farms and distribution centers are located across the heart of Pakistan. Visit us to experience the harvest.</p>
                <a 
                  href="https://www.google.com/maps/search/mango+farms+multan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-mango-dark text-white font-bold rounded-2xl uppercase tracking-widest text-xs hover:bg-mango-orange transition-all"
                >
                  View Full Map
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
