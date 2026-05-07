import { motion } from 'motion/react';
import { Timer, Flame, Dumbbell, Activity } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Cell } from 'recharts';
import { cn } from '@/src/lib/utils';
import { useNavigate } from 'react-router-dom';

const weeklyData = [
  { day: 'MON', value: 0 },
  { day: 'TUE', value: 0 },
  { day: 'WED', value: 0 },
  { day: 'THU', value: 0, active: true },
  { day: 'FRI', value: 0 },
  { day: 'SAT', value: 0 },
  { day: 'SUN', value: 0 },
];

const metrics = [
  { icon: Timer, label: 'AVG DURATION', value: '0m' },
  { icon: Flame, label: 'KCAL BURNED', value: '0' },
  { icon: Dumbbell, label: 'TOTAL VOLUME', value: '0t' },
  { icon: Activity, label: 'RESTING HR', value: '--' },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl h-64 flex items-end p-6 border border-white/10 group cursor-pointer bg-surface-container-low">
        <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-end gap-4">
          <div className="space-y-1">
            <span className="font-lexend text-[9px] text-primary bg-primary/10 px-3 py-0.5 rounded-full border border-primary/20 tracking-widest uppercase">
              Active Session
            </span>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Push Beyond</h1>
          </div>
          <button 
            onClick={() => navigate('/workouts')}
            className="bg-primary text-on-primary px-6 py-3 rounded-xl font-lexend text-[10px] font-black tracking-widest hover:scale-105 active:scale-95 transition-all electric-glow uppercase"
          >
            Start Training
          </button>
        </div>
      </section>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Today's Completion */}
        <div className="glass-panel rounded-2xl p-5 flex flex-col justify-between h-56 md:col-span-1">
          <div>
            <h3 className="font-lexend text-[9px] text-on-surface-variant uppercase tracking-[0.2em]">Today's Completion</h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-lexend text-4xl font-medium text-primary">0</span>
              <span className="font-sans text-lg text-on-surface-variant">%</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '0%' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-primary shadow-[0_0_12px_#c6f333]" 
              />
            </div>
            <div className="flex justify-between font-lexend text-[9px] text-on-surface-variant opacity-60">
              <span className="uppercase">Strength Target</span>
              <span>12/15 SETS</span>
            </div>
          </div>
        </div>

        {/* Weekly Performance */}
        <div className="glass-panel rounded-2xl p-5 md:col-span-2 flex flex-col justify-between h-56">
           <div className="flex justify-between items-center">
            <h3 className="font-lexend text-[9px] text-on-surface-variant uppercase tracking-[0.2em]">Weekly Performance</h3>
            <Activity className="w-4 h-4 text-primary" />
          </div>
          
          <div className="h-28 mt-4">
            <ResponsiveContainer width="99%" height={112} minHeight={112} minWidth={10}>
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
                  barSize={32}
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
        </div>
      </div>

      {/* Metric Capsules */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <div key={i} className="glass-panel p-4 rounded-xl flex items-center gap-3 hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors shrink-0">
              <metric.icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="font-lexend text-base font-medium text-white truncate">{metric.value}</div>
              <div className="font-lexend text-[8px] text-on-surface-variant uppercase tracking-widest truncate">{metric.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Discipline */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-black text-white tracking-tight uppercase italic">Recent Discipline</h2>
          <button className="font-lexend text-[9px] text-primary border-b border-primary/30 pb-0.5 tracking-widest uppercase hover:text-white transition-colors">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[].map((workout: any, i) => (
            <div key={i} className="relative h-28 rounded-2xl overflow-hidden border border-white/10 flex items-center px-5 group cursor-pointer transform hover:translate-x-1 transition-all duration-300">
              <img 
                src={workout.img} 
                className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 group-hover:scale-105 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
              <div className="relative z-10 flex-1 flex justify-between items-center">
                <div>
                  <span className={cn("font-lexend text-[8px] uppercase tracking-widest", workout.color)}>{workout.tag}</span>
                  <h4 className="text-lg font-black text-white uppercase italic tracking-tighter">{workout.name}</h4>
                </div>
                <div className="text-right">
                  <div className="font-lexend text-xs text-white">{workout.date}</div>
                  <div className="font-lexend text-[8px] text-on-surface-variant uppercase tracking-widest">{workout.meta}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
