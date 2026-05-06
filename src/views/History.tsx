import { motion } from 'motion/react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Trophy, Gauge, History } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const stats = [
  { label: 'MONTHLY SESSIONS', value: '18' },
  { label: 'TOTAL VOLUME', value: '142k' },
];

const calendarDays = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  active: [1, 4, 5, 7, 8, 11].includes(i + 1),
  current: i + 1 === 11
}));

export default function HistoryView() {
  return (
    <div className="space-y-8 pb-10">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="font-lexend text-[10px] text-on-surface-variant tracking-[0.3em] uppercase mb-1">Athlete Progression</p>
          <h1 className="text-4xl font-black text-white tracking-widest uppercase italic">History & Stats</h1>
        </div>
        <div className="flex gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="glass-panel p-4 px-6 rounded-2xl flex flex-col items-center min-w-[120px]">
              <span className="font-lexend text-[8px] text-on-surface-variant uppercase tracking-widest">{stat.label}</span>
              <span className="font-lexend text-2xl font-medium text-primary mt-1">{stat.value}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Calendar */}
        <section className="md:col-span-7 glass-panel rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic">September 2023</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-white/5 rounded-full transition-colors"><ChevronLeft className="w-5 h-5 text-on-surface-variant" /></button>
              <button className="p-2 hover:bg-white/5 rounded-full transition-colors"><ChevronRight className="w-5 h-5 text-on-surface-variant" /></button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 text-center mb-4">
            {['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].map(d => (
              <div key={d} className="font-lexend text-[9px] text-on-surface-variant uppercase tracking-widest">{d}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={`empty-${i}`} className="h-12 flex items-center justify-center font-sans text-on-surface-variant opacity-20">
                {28 + i}
              </div>
            ))}
            {calendarDays.map((d) => (
              <div 
                key={d.day}
                className={cn(
                  "h-12 flex flex-col items-center justify-center rounded-lg relative transition-all cursor-pointer hover:bg-white/5",
                  d.current ? "bg-primary/20 border border-primary/30 text-primary electric-glow" : "text-on-surface",
                  d.active && !d.current && "bg-surface-container-high"
                )}
              >
                <span className="text-sm font-medium">{d.day}</span>
                {d.active && (
                  <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-primary" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Weight Trends */}
        <section className="md:col-span-5 glass-panel rounded-2xl p-6 flex flex-col h-full">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic">Weight Trends</h3>
              <p className="text-on-surface-variant text-xs mt-1">-2.4kg this month</p>
            </div>
            <div className="text-right">
              <span className="font-lexend text-3xl font-medium text-primary">84.2</span>
              <span className="font-lexend text-[10px] text-on-surface-variant ml-1 uppercase">KG</span>
            </div>
          </div>
          
          <div className="flex-grow flex items-end gap-2 h-40 mt-auto">
            {[0.8, 0.75, 0.78, 0.7, 0.65, 0.6].map((h, i) => (
              <div key={i} className="flex-1 bg-primary/20 h-full rounded-t-sm relative group">
                <div 
                  style={{ height: `${h * 100}%` }}
                  className="absolute bottom-0 left-0 right-0 bg-primary/30 rounded-t-sm group-hover:bg-primary/50 transition-all"
                />
                <div 
                  style={{ bottom: `${h * 100}%` }}
                  className="absolute left-0 right-0 h-[2px] bg-primary shadow-[0_0_10px_rgba(198,243,51,0.5)] z-10"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <span className="font-lexend text-[8px] text-on-surface-variant uppercase tracking-widest">Aug 15</span>
            <span className="font-lexend text-[8px] text-primary uppercase tracking-widest font-bold">Today</span>
          </div>
        </section>

        {/* Benchmarks */}
        <section className="md:col-span-12 glass-panel rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-surface/30">
            <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic">Key Metric Benchmarks</h3>
            <div className="flex gap-2 p-1 bg-black/40 rounded-full border border-white/5">
              <button className="px-5 py-1.5 bg-white/5 rounded-full font-lexend text-[9px] text-on-surface-variant uppercase tracking-widest font-bold hover:text-white transition-colors">Lifts</button>
              <button className="px-5 py-1.5 bg-primary text-on-primary rounded-full font-lexend text-[9px] uppercase tracking-widest font-bold">Cardio</button>
            </div>
          </div>
          
          <div className="divide-y divide-white/5">
            {[
              { label: 'Deadlift 1RM', icon: Trophy, value: '185.0', unit: 'KG', sub: '+5.0 KG (PR)', color: 'text-primary', update: 'Last update: 3 days ago' },
              { label: '5km Time', icon: History, value: '22:45', unit: 'MIN', sub: '+0:12 MIN', color: 'text-secondary', update: 'Last update: 1 week ago' }
            ].map((benchmark, i) => (
              <div key={i} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors group cursor-pointer">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-surface-container-highest flex items-center justify-center text-primary transition-transform group-hover:scale-110">
                    <benchmark.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-white uppercase italic tracking-tighter">{benchmark.label}</p>
                    <p className="text-on-surface-variant text-xs mt-0.5">{benchmark.update}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-lexend text-2xl font-medium text-white">
                    {benchmark.value} <span className="text-[10px] text-on-surface-variant uppercase">{benchmark.unit}</span>
                  </p>
                  <p className={cn("text-[9px] font-lexend uppercase tracking-widest mt-1", benchmark.color)}>{benchmark.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
