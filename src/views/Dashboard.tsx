import { motion } from 'motion/react';
import { Timer, Flame, Dumbbell, Activity } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Cell } from 'recharts';
import { cn } from '@/src/lib/utils';
import { useNavigate } from 'react-router-dom';

const weeklyData = [
  { day: 'MON', value: 40 },
  { day: 'TUE', value: 65 },
  { day: 'WED', value: 30 },
  { day: 'THU', value: 90, active: true },
  { day: 'FRI', value: 55 },
  { day: 'SAT', value: 70 },
  { day: 'SUN', value: 20 },
];

const metrics = [
  { icon: Timer, label: 'AVG DURATION', value: '42m' },
  { icon: Flame, label: 'KCAL BURNED', value: '1,840' },
  { icon: Dumbbell, label: 'TOTAL VOLUME', value: '14.2t' },
  { icon: Activity, label: 'RESTING HR', value: '58' },
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
              <span className="font-lexend text-4xl font-medium text-primary">85</span>
              <span className="font-sans text-lg text-on-surface-variant">%</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
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
            <ResponsiveContainer width="100%" height="100%">
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
          {[
            { tag: 'POWER', name: 'Hypertrophy B', date: '12.04.24', meta: '64 MIN • 8 EXERCISES', color: 'text-secondary', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_aHD2cmnIRRptIZ32Oa6qdkCvY877YXRrBDILrJbSUmpkj3enJDSVi_m02hcQ85eOJFZkmG9PCwC9Jga3h8Wud5wqsq1UGI1N0UFAre4AKpAy4l7gzZLmYnOlKW8VCMMps-Z77iDj16D93Xq1hbql4Ui9q9H4dbKTqctKfHkqF3TX5dpgAkcqVwFK_EG2nHZGleHaJT3O7QxP1kYZM9u6GVMlURWD3AsLKXh59zwh8Czk11MicQA7af2Ib_ZoZWv2A3kAw7awX2Y' },
            { tag: 'RECOVERY', name: 'Mobility Flow', date: '11.04.24', meta: '22 MIN • 4 EXERCISES', color: 'text-primary-dim', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBevwLYzkhVeclY9fzsaofq8wjqvMzPGOwPDFBNfem6oVLc3UTCLj-zxNSR99OJgzDqYa6RDL5Vtt_cy8sdKGS79-E1S_mASpJ2b59hM5lxnnjpW2vf7bx30stYQv9FWEW5By0FkyuJY-ye3jKQhSoy79EO197cX8ZKe2E4jkHm-sxEV-n90uSVcIWJhLeVyfZvT701B-0jTsCCCyMbcosWFvRE6QZ4bOCihp67bNtwM5XHnq0Ro9uTyz6I8dTRJCVrBc6qeyRdmS4' }
          ].map((workout, i) => (
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
