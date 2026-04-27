import React from 'react';
import { motion } from 'motion/react';
import { Truck, Clock, Gift } from 'lucide-react';

export const DeliveryServices: React.FC = () => {
  const services = [
    {
      title: 'Nationwide Delivery',
      desc: 'We deliver fresh mangoes across all major cities of Pakistan with care.',
      icon: <Truck size={32} className="text-mango-green" />,
      image: 'https://images.unsplash.com/photo-1586864387917-f539472391e9?auto=format&fit=crop&q=80&w=400'
    },
    {
      title: 'Same Day Delivery',
      desc: 'Express delivery service for Multan and Lahore to ensure maximum freshness.',
      icon: <Clock size={32} className="text-mango-green" />,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400'
    },
    {
      title: 'Gift Delivery',
      desc: 'Send premium mango boxes as gifts to your loved ones with personalized notes.',
      icon: <Gift size={32} className="text-mango-green" />,
      image: 'https://images.unsplash.com/photo-1549463591-24c187247abc?auto=format&fit=crop&q=80&w=400'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-3xl font-display font-bold text-mango-dark uppercase tracking-widest">
          Delivery Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-48 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-mango-dark mb-2 uppercase tracking-wider">
                  {service.title}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
