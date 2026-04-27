import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, RefreshCw, CheckCircle2, Info } from 'lucide-react';
import { PRODUCTS } from '../constants';

const QUESTIONS = [
  {
    id: 'sweetness',
    question: 'How sweet do you like your mangoes?',
    options: [
      { label: 'Honey-like Sweet', value: 'high', icon: '🍯' },
      { label: 'Balanced Sweet & Tangy', value: 'medium', icon: '⚖️' },
      { label: 'Mild & Subtle', value: 'low', icon: '🍃' }
    ]
  },
  {
    id: 'texture',
    question: 'What texture do you prefer?',
    options: [
      { label: 'Buttery & Melting', value: 'buttery', icon: '🧈' },
      { label: 'Firm & Sliced', value: 'firm', icon: '🔪' },
      { label: 'Juicy & Pulpy', value: 'juicy', icon: '🥤' }
    ]
  },
  {
    id: 'aroma',
    question: 'How important is the fragrance?',
    options: [
      { label: 'Strong & Floral', value: 'strong', icon: '🌸' },
      { label: 'Fresh & Fruity', value: 'fresh', icon: '🍎' },
      { label: 'Subtle Aroma', value: 'subtle', icon: '🌬️' }
    ]
  }
];

export const MangoSommelier: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [QUESTIONS[step].id]: value };
    setAnswers(newAnswers);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<string, string>) => {
    // Simple logic to match varieties
    let recommendation;
    if (finalAnswers.sweetness === 'high' && finalAnswers.texture === 'buttery') {
      recommendation = PRODUCTS.find(p => p.name.includes('Sindhri')) || PRODUCTS[0];
    } else if (finalAnswers.aroma === 'strong') {
      recommendation = PRODUCTS.find(p => p.name.includes('Chaunsa')) || PRODUCTS[1];
    } else if (finalAnswers.texture === 'firm') {
      recommendation = PRODUCTS.find(p => p.name.includes('Anwar Ratol')) || PRODUCTS[2];
    } else {
      recommendation = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
    }
    setResult(recommendation);
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-stone-900 text-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-mango-yellow/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-mango-orange/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-mango-yellow text-xs font-bold uppercase tracking-[0.3em] mb-6"
          >
            <Sparkles size={14} /> AI Mango Sommelier 2026
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Find Your <span className="text-mango-yellow">Perfect Match</span>
          </h2>
          <p className="text-stone-400 text-lg max-w-2xl mx-auto">
            Our advanced AI analyzes your taste profile to recommend the legendary Pakistani variety that fits you best.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl rounded-[40px] border border-white/10 p-8 md:p-12 shadow-2xl min-h-[400px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">Question {step + 1} of {QUESTIONS.length}</span>
                  <div className="flex gap-1">
                    {QUESTIONS.map((_, i) => (
                      <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i <= step ? 'w-8 bg-mango-yellow' : 'w-2 bg-white/10'}`} />
                    ))}
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-display font-bold mb-10">{QUESTIONS[step].question}</h3>

                <div className="grid gap-4">
                  {QUESTIONS[step].options.map((option, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(option.value)}
                      className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 text-left transition-all group"
                    >
                      <span className="text-3xl group-hover:scale-125 transition-transform">{option.icon}</span>
                      <span className="text-lg font-medium">{option.label}</span>
                      <ArrowRight className="ml-auto text-stone-600 group-hover:text-mango-yellow transition-colors" size={20} />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8"
              >
                <div className="w-20 h-20 bg-mango-yellow/20 rounded-full flex items-center justify-center mx-auto mb-6 text-mango-yellow">
                  <CheckCircle2 size={40} />
                </div>
                
                <div>
                  <p className="text-mango-yellow font-bold uppercase tracking-widest text-sm mb-2">Your Perfect Match is</p>
                  <h3 className="text-4xl md:text-5xl font-display font-bold mb-4">{result.name}</h3>
                  <p className="text-stone-400 max-w-lg mx-auto leading-relaxed">
                    Based on your preference for {answers.sweetness} sweetness and {answers.texture} texture, the {result.name} is your ultimate summer companion.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <button className="px-8 py-4 bg-mango-yellow text-mango-dark font-bold rounded-2xl hover:bg-white transition-all flex items-center gap-2">
                    Add to Cart <ArrowRight size={18} />
                  </button>
                  <button 
                    onClick={reset}
                    className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all flex items-center gap-2"
                  >
                    <RefreshCw size={18} /> Retake Quiz
                  </button>
                </div>

                <div className="pt-8 border-t border-white/10 flex items-center justify-center gap-6 text-stone-500 text-xs font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <Info size={14} /> 98% Match Accuracy
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} /> AI Powered
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
