import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Calendar, ShieldCheck, Info, Loader2, Thermometer, Droplets, Sun } from 'lucide-react';

const BATCH_DATA: Record<string, any> = {
  'MM-2026-SINDH-01': {
    farm: 'Al-Noor Orchards, Mirpur Khas',
    harvestDate: 'May 12, 2026',
    variety: 'Sindhri',
    qualityScore: 9.8,
    temperature: '12°C (Cold Chain)',
    humidity: '85%',
    sunlight: '14 hrs/day',
    origin: 'Sindh, Pakistan',
    farmer: 'Haji Muhammad Ali',
    certifications: ['Global GAP', 'Organic Certified', 'ISO 22000']
  },
  'MM-2026-PUNJAB-05': {
    farm: 'Sadiqabad Mango Farms, Rahim Yar Khan',
    harvestDate: 'June 05, 2026',
    variety: 'Chaunsa',
    qualityScore: 9.9,
    temperature: '10°C (Cold Chain)',
    humidity: '80%',
    sunlight: '13 hrs/day',
    origin: 'Punjab, Pakistan',
    farmer: 'Chaudhry Rashid',
    certifications: ['Global GAP', 'Fair Trade', 'HACCP']
  }
};

export const TraceabilitySection: React.FC = () => {
  const [batchId, setBatchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchId) return;

    setLoading(true);
    setError('');
    setResult(null);

    // Simulate API call
    setTimeout(() => {
      const data = BATCH_DATA[batchId.toUpperCase()];
      if (data) {
        setResult(data);
      } else {
        setError('Batch ID not found. Please check the code on your box.');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mango-green/10 text-mango-green text-xs font-bold uppercase tracking-[0.3em] mb-6"
            >
              <ShieldCheck size={14} /> 2026 Transparency Protocol
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-mango-dark mb-6 leading-tight">
              Trace Your Mangoes <br />
              <span className="text-mango-orange">Back to the Farm</span>
            </h2>
            <p className="text-stone-500 text-lg mb-10 leading-relaxed">
              Every box of MangoMart mangoes comes with a unique Batch ID. Enter it below to see the exact farm, harvest conditions, and quality certifications of your fruit.
            </p>

            <form onSubmit={handleSearch} className="relative max-w-md mb-8">
              <input 
                type="text" 
                placeholder="Enter Batch ID (e.g. MM-2026-SINDH-01)" 
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                className="w-full pl-6 pr-32 py-4 rounded-2xl bg-stone-50 border border-stone-200 focus:border-mango-orange outline-none transition-all font-mono text-sm uppercase tracking-widest"
              />
              <button 
                type="submit"
                disabled={loading}
                className="absolute right-2 top-2 bottom-2 px-6 bg-mango-dark text-white font-bold rounded-xl hover:bg-mango-orange transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
                Track
              </button>
            </form>

            <div className="flex items-center gap-2 text-stone-400 text-xs font-bold uppercase tracking-widest">
              <Info size={14} /> Try: MM-2026-SINDH-01
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-red-500 text-sm font-bold"
              >
                {error}
              </motion.p>
            )}
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                  className="bg-white p-8 rounded-[40px] shadow-2xl border border-stone-100 relative z-10"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h4 className="text-2xl font-display font-bold text-mango-dark mb-1">{result.farm}</h4>
                      <div className="flex items-center gap-2 text-stone-400 text-sm">
                        <MapPin size={14} /> {result.origin}
                      </div>
                    </div>
                    <div className="bg-mango-yellow/10 text-mango-orange px-4 py-2 rounded-xl text-center">
                      <span className="block text-2xl font-bold leading-none">{result.qualityScore}</span>
                      <span className="text-[10px] font-bold uppercase tracking-tighter">Quality Score</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center text-mango-green">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest leading-none mb-1">Harvested</p>
                          <p className="text-sm font-bold text-mango-dark">{result.harvestDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center text-mango-green">
                          <Thermometer size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest leading-none mb-1">Storage Temp</p>
                          <p className="text-sm font-bold text-mango-dark">{result.temperature}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center text-mango-green">
                          <Sun size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest leading-none mb-1">Sun Exposure</p>
                          <p className="text-sm font-bold text-mango-dark">{result.sunlight}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center text-mango-green">
                          <Droplets size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest leading-none mb-1">Humidity</p>
                          <p className="text-sm font-bold text-mango-dark">{result.humidity}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-stone-100">
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">Verified Certifications</p>
                    <div className="flex flex-wrap gap-2">
                      {result.certifications.map((cert: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-mango-green/10 text-mango-green text-[10px] font-bold rounded-full uppercase tracking-wider">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&q=80&w=1000" 
                    alt="Farm Origin" 
                    className="rounded-[40px] shadow-2xl brightness-75 grayscale-[0.2]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-center max-w-xs">
                      <Search className="text-white mx-auto mb-4" size={32} />
                      <p className="text-white font-bold text-sm uppercase tracking-widest">Enter a Batch ID to see farm details</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-mango-yellow rounded-full -z-10 blur-3xl opacity-20" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-mango-orange rounded-full -z-10 blur-3xl opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
};
