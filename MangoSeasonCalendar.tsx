import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Info } from 'lucide-react';

const SEASONS = [
  { month: 'May', status: 'Early' },
  { month: 'June', status: 'Peak' },
  { month: 'July', status: 'Peak' },
  { month: 'August', status: 'Late' },
  { month: 'September', status: 'End' },
];

const VARIETIES_SEASON = [
  { name: 'Sindhri', start: 'May', end: 'July', color: 'bg-mango-yellow' },
  { name: 'Anwar Ratol', start: 'June', end: 'July', color: 'bg-mango-orange' },
  { name: 'Chaunsa', start: 'July', end: 'August', color: 'bg-mango-green' },
  { name: 'Dusehri', start: 'June', end: 'July', color: 'bg-yellow-400' },
  { name: 'White Chaunsa', start: 'August', end: 'September', color: 'bg-stone-200' },
  { name: 'Azeem Chaunsa', start: 'August', end: 'September', color: 'bg-mango-green' },
  { name: 'Lal Badshah', start: 'June', end: 'July', color: 'bg-red-500' },
];

export const MangoSeasonCalendar: React.FC = () => {
  const getMonthIndex = (month: string) => SEASONS.findIndex(s => s.month === month);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-mango-dark mb-4">
              Mango <span className="text-mango-orange">Season Calendar</span>
            </h2>
            <p className="text-stone-500 max-w-2xl mx-auto">
              Plan your summer with our harvest calendar. Each variety has its own unique window of perfection.
            </p>
          </motion.div>
        </div>

        <div className="bg-stone-50 rounded-[48px] p-8 md:p-12 border border-stone-100 shadow-sm overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header */}
            <div className="grid grid-cols-[200px_1fr] mb-8">
              <div className="font-bold text-mango-dark uppercase tracking-widest text-xs">Variety</div>
              <div className="grid grid-cols-5 gap-4">
                {SEASONS.map((s) => (
                  <div key={s.month} className="text-center">
                    <p className="font-bold text-mango-dark">{s.month}</p>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{s.status}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Rows */}
            <div className="space-y-6">
              {VARIETIES_SEASON.map((v, i) => {
                const startIdx = getMonthIndex(v.start);
                const endIdx = getMonthIndex(v.end);
                const span = endIdx - startIdx + 1;

                return (
                  <motion.div 
                    key={v.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-[200px_1fr] items-center group"
                  >
                    <div className="font-bold text-mango-dark group-hover:text-mango-orange transition-colors">
                      {v.name}
                    </div>
                    <div className="grid grid-cols-5 gap-4 h-8 relative">
                      {/* Background Grid Lines */}
                      {[...Array(5)].map((_, idx) => (
                        <div key={idx} className="border-l border-stone-200 h-full first:border-l-0" />
                      ))}
                      
                      {/* Season Bar */}
                      <div 
                        className={`absolute h-full rounded-full ${v.color} shadow-sm flex items-center justify-center text-[10px] font-bold text-mango-dark/60 uppercase tracking-tighter overflow-hidden`}
                        style={{
                          left: `calc(${(startIdx / 5) * 100}% + 4px)`,
                          width: `calc(${(span / 5) * 100}% - 8px)`
                        }}
                      >
                        <span className="truncate px-2">Harvest Period</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-stone-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-mango-yellow" />
            <span>Early Season</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-mango-orange" />
            <span>Mid Season</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-mango-green" />
            <span>Late Season</span>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Info size={16} className="text-mango-orange" />
            <span>Dates may vary slightly based on weather conditions.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
