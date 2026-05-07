import { Trophy, Activity, Dumbbell, Flame } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { BarChart, Bar, ResponsiveContainer, XAxis, Cell, LineChart, Line } from 'recharts';

export default function StatsView() {
  const weeklyData: { day: string; value: number; active?: boolean }[] = [
    { day: 'MON', value: 0 },
    { day: 'TUE', value: 0 },
    { day: 'WED', value: 0 },
    { day: 'THU', value: 0 },
    { day: 'FRI', value: 0 },
    { day: 'SAT', value: 0 },
    { day: 'SUN', value: 0 },
  ];

  return (
    <div className="space-y-8 pb-10">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="font-lexend text-[10px] text-on-surface-variant tracking-[0.3em] uppercase mb-1">Performance Analytics</p>
          <div className="flex items-center gap-4 mt-1">
            <h1 className="text-4xl font-black text-white tracking-widest uppercase italic">Athlete Stats</h1>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weight Trends */}
        <section className="glass-panel rounded-2xl p-6 flex flex-col min-h-[300px]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic">Weight Trends</h3>
              <p className="text-on-surface-variant text-xs mt-1">Consistency is key</p>
            </div>
            <div className="text-right">
              <span className="font-lexend text-3xl font-medium text-primary">0.0</span>
              <span className="font-lexend text-[10px] text-on-surface-variant ml-1 uppercase">KG</span>
            </div>
          </div>
          
          <div className="flex-grow flex items-end gap-2 mt-auto h-48">
            {[0, 0, 0, 0, 0, 0, 0].map((h, i) => (
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
            <span className="font-lexend text-[8px] text-on-surface-variant uppercase tracking-widest">Last Month</span>
            <span className="font-lexend text-[8px] text-primary uppercase tracking-widest font-bold">Today</span>
          </div>
        </section>

        {/* Volume Output */}
        <section className="glass-panel rounded-2xl p-6 flex flex-col min-h-[300px]">
           <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic">Weekly Volume</h3>
              <p className="text-on-surface-variant text-xs mt-1">Total weight moved</p>
            </div>
            <Activity className="w-5 h-5 text-primary" />
          </div>
          
          <div className="flex-grow h-48 mt-4">
            <ResponsiveContainer width="99%" height="100%" minHeight={150}>
              <BarChart data={weeklyData}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#c4c9ae', fontSize: 9, fontWeight: 600 }}
                  dy={10}
                />
                <Bar 
                  dataKey="value" 
                  radius={[4, 4, 0, 0]}
                  barSize={24}
                >
                  {weeklyData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.active ? '#c6f333' : '#353534'} 
                      className="hover:fill-primary-dim transition-colors cursor-pointer"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Benchmarks */}
        <section className="md:col-span-2 glass-panel rounded-2xl overflow-hidden mt-2">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-surface/30">
            <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic">Key Metric Benchmarks</h3>
          </div>
          
          <div className="divide-y divide-white/5">
            {[
              { icon: Dumbbell, label: 'Bench Press 1RM', value: '-', unit: 'KG', update: 'No Data', sub: '-', color: 'text-on-surface-variant' },
              { icon: Flame, label: 'Squat 1RM', value: '-', unit: 'KG', update: 'No Data', sub: '-', color: 'text-on-surface-variant' },
              { icon: Trophy, label: 'Deadlift 1RM', value: '-', unit: 'KG', update: 'No Data', sub: '-', color: 'text-on-surface-variant' },
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
