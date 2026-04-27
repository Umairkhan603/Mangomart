import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Droplets, Sun, Thermometer, ShieldCheck, Heart, Zap } from 'lucide-react';

export const MangoGuide: React.FC = () => {
  const guideItems = [
    {
      icon: <Sun className="text-mango-orange" />,
      title: "Ripening Process",
      description: "Keep mangoes at room temperature. They ripen in 2-5 days. Do not refrigerate unripe mangoes as it stops the ripening process.",
      tip: "To speed up ripening, place mangoes in a paper bag with a banana or apple."
    },
    {
      icon: <Thermometer className="text-mango-orange" />,
      title: "Storage Tips",
      description: "Once ripe, mangoes can be moved to the refrigerator for up to 5 days. You can also peel, slice, and freeze them for up to 6 months.",
      tip: "Avoid storing mangoes near strong-smelling foods as they can absorb odors."
    },
    {
      icon: <Droplets className="text-mango-orange" />,
      title: "Washing & Prep",
      description: "Always wash the skin before cutting. Use a sharp knife to cut along the pit on both sides. Score the flesh in a grid pattern and push the skin out.",
      tip: "The skin is edible but often bitter; most people prefer to discard it."
    }
  ];

  const healthBenefits = [
    { icon: <ShieldCheck size={20} />, text: "Boosts Immunity (Vitamin C & A)" },
    { icon: <Heart size={20} />, text: "Supports Heart Health (Potassium & Magnesium)" },
    { icon: <Zap size={20} />, text: "Improves Digestion (Fiber & Enzymes)" },
    { icon: <Leaf size={20} />, text: "Healthy Skin & Eyes (Beta-carotene)" }
  ];

  return (
    <section className="py-24 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-mango-orange font-bold uppercase tracking-widest mb-4">The Ultimate Guide</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-mango-dark mb-8 leading-tight">
              Mastering the Art of <span className="text-mango-orange italic">Mango Care</span>
            </h2>
            <p className="text-lg text-stone-600 mb-12 leading-relaxed">
              At MangoMart, we don't just sell fruit; we share a legacy. Understanding how to care for your mangoes ensures you experience the peak flavor and nutritional value of every single box.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {healthBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-stone-100">
                  <div className="text-mango-orange">{benefit.icon}</div>
                  <span className="text-sm font-bold text-stone-700">{benefit.text}</span>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-mango-dark text-white font-bold rounded-full shadow-xl hover:bg-mango-orange transition-all uppercase tracking-widest text-xs"
            >
              Download Full Guide (PDF)
            </motion.button>
          </motion.div>

          <div className="space-y-6">
            {guideItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-3xl shadow-xl border border-stone-100 hover:border-mango-yellow transition-all group"
              >
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-mango-bg rounded-2xl group-hover:bg-mango-yellow transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-mango-dark mb-3">{item.title}</h3>
                    <p className="text-stone-600 mb-4 leading-relaxed">{item.description}</p>
                    <div className="p-3 bg-stone-50 rounded-lg border-l-4 border-mango-orange">
                      <p className="text-xs font-bold text-mango-dark italic">Pro Tip: {item.tip}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ripeness Indicators Section */}
        <div className="mt-24 bg-white rounded-[48px] p-10 md:p-20 border border-stone-100 shadow-sm">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-mango-dark mb-6">How to Tell if It's Ripe</h2>
            <p className="text-stone-500 max-w-2xl mx-auto">Don't just look at the color; use all your senses to find the perfect mango.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "The Squeeze Test", desc: "Gently squeeze the mango. A ripe mango will give slightly, similar to a peach or avocado.", icon: "Squeeze" },
              { title: "The Aroma Test", desc: "Sniff the stem end. Ripe mangoes will have a strong, sweet, and fruity aroma.", icon: "Sniff" },
              { title: "The Visual Test", desc: "Look for a full, plump shape. Some varieties may show small brown speckles when ripe.", icon: "Look" }
            ].map((test, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-20 h-20 bg-mango-yellow/10 rounded-full flex items-center justify-center mx-auto mb-6 text-mango-orange font-display font-bold text-2xl">
                  {test.icon.charAt(0)}
                </div>
                <h4 className="text-xl font-bold text-mango-dark">{test.title}</h4>
                <p className="text-stone-500 text-sm leading-relaxed">{test.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
