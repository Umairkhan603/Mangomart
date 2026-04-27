import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Users, Award, Map, Globe, Heart, Droplets, Sun } from 'lucide-react';
import { Counter } from './Counter';

export const AboutUs: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-mango-yellow/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-mango-yellow/10 rounded-l-[100px] -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-5xl lg:text-6xl font-display font-bold text-mango-dark mb-8 leading-tight">
                Our Story: From <span className="text-mango-green">Multan</span> to Your Table
              </h1>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                MangoMart Pakistan was born out of a simple passion: to share the authentic, 
                sun-kissed sweetness of Pakistani mangoes with the world, exactly as nature intended.
              </p>
              <div className="flex gap-12">
                <div>
                  <p className="text-3xl font-bold text-mango-dark">
                    <Counter value={25} suffix="+" />
                  </p>
                  <p className="text-sm text-stone-500">Years of Farming</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-mango-dark">
                    <Counter value={10} suffix="k+" />
                  </p>
                  <p className="text-sm text-stone-500">Happy Customers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-mango-dark">
                    <Counter value={100} suffix="%" />
                  </p>
                  <p className="text-sm text-stone-500">Organic Ripening</p>
                </div>
              </div>
            </motion.div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=1000" 
                alt="Mango Farm" 
                className="rounded-[48px] shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-mango-green/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="p-10 rounded-[40px] bg-stone-50 hover:bg-mango-yellow/10 transition-colors">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-mango-green mb-6 shadow-sm">
                <Leaf size={28} />
              </div>
              <h3 className="text-2xl font-bold text-mango-dark mb-4">Our Mission</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                To eliminate middle-men and provide farmers with fair value while delivering 
                the freshest, chemical-free mangoes to our customers.
              </p>
            </div>
            <div className="p-10 rounded-[40px] bg-stone-50 hover:bg-mango-green/10 transition-colors">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-mango-orange mb-6 shadow-sm">
                <Globe size={28} />
              </div>
              <h3 className="text-2xl font-bold text-mango-dark mb-4">Our Vision</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                To become the global standard for Pakistani mangoes, recognized for 
                uncompromising quality and ethical farming practices.
              </p>
            </div>
            <div className="p-10 rounded-[40px] bg-stone-50 hover:bg-mango-orange/10 transition-colors">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-red-500 mb-6 shadow-sm">
                <Heart size={28} />
              </div>
              <h3 className="text-2xl font-bold text-mango-dark mb-4">Our Values</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Transparency, sustainability, and community. We believe in growing 
                together with our land and our people.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-mango-dark mb-4">Meet the Guardians of Taste</h2>
            <p className="text-stone-500">The dedicated team behind every box of sweetness.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Zia-ur-Rehman', role: 'Founder & Head Farmer', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' },
              { name: 'Saira Ahmed', role: 'Quality Control Lead', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400' },
              { name: 'Bilal Malik', role: 'Logistics Manager', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400' },
              { name: 'Fatima Noor', role: 'Customer Experience', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400' },
            ].map((member, i) => (
              <div key={i} className="group">
                <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden mb-4">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <h4 className="text-lg font-bold text-mango-dark">{member.name}</h4>
                <p className="text-sm text-mango-orange">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-mango-orange font-bold uppercase tracking-widest mb-4">Quality First</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-mango-dark mb-8 leading-tight">
                Our <span className="text-mango-orange italic">Farm-to-Door</span> Process
              </h2>
              <div className="space-y-8">
                {[
                  { step: "01", title: "Hand-Picked at Dawn", desc: "Our farmers select only the most mature mangoes during the cool early morning hours to preserve freshness." },
                  { step: "02", title: "Natural Ripening", desc: "We use traditional, chemical-free methods to allow the mangoes to reach their peak sweetness naturally." },
                  { step: "03", title: "Rigorous Quality Check", desc: "Every single mango is inspected for size, color, and aroma before being carefully packed." },
                  { step: "04", title: "Eco-Friendly Packaging", desc: "We use sustainable, breathable packaging that protects the fruit while being kind to the environment." }
                ].map((item, index) => (
                  <div key={index} className="flex gap-6">
                    <span className="text-3xl font-display font-bold text-mango-yellow/30">{item.step}</span>
                    <div>
                      <h4 className="text-xl font-bold text-mango-dark mb-2">{item.title}</h4>
                      <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=600" alt="Process 1" className="rounded-3xl shadow-xl mt-12" />
                <img src="https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&q=80&w=600" alt="Process 2" className="rounded-3xl shadow-xl" />
              </div>
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-mango-bg rounded-full blur-3xl opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-24 bg-mango-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-display font-bold mb-6">Our Commitment to <span className="text-mango-yellow">Sustainability</span></h2>
            <p className="text-stone-400 leading-relaxed">
              We believe that great taste shouldn't come at the cost of our planet. Our farming practices are designed to protect the soil, conserve water, and support the local ecosystem for generations to come.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/10">
              <div className="w-16 h-16 bg-mango-yellow/20 rounded-2xl flex items-center justify-center text-mango-yellow mx-auto mb-6">
                <Leaf size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Regenerative Farming</h3>
              <p className="text-stone-400 text-sm leading-relaxed">We use organic fertilizers and cover crops to maintain soil health and biodiversity in our orchards.</p>
            </div>
            <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/10">
              <div className="w-16 h-16 bg-mango-orange/20 rounded-2xl flex items-center justify-center text-mango-orange mx-auto mb-6">
                <Droplets size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Water Conservation</h3>
              <p className="text-stone-400 text-sm leading-relaxed">Our smart irrigation systems reduce water waste by up to 40% compared to traditional flooding methods.</p>
            </div>
            <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/10">
              <div className="w-16 h-16 bg-mango-green/20 rounded-2xl flex items-center justify-center text-mango-green mx-auto mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Empowering Farmers</h3>
              <p className="text-stone-400 text-sm leading-relaxed">We provide fair wages and training to over 50 local farming families, ensuring a sustainable livelihood.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
