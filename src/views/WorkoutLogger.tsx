import { motion } from 'motion/react';
import { ArrowLeft, History, Check, X, Plus } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/src/lib/utils';
import { Link, useParams } from 'react-router-dom';

const mockExercise = {
  name: '杠铃卧推',
  category: 'CHEST & TRICEPS',
  lastSession: [],
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBi3JjkGlWIk9DB1BkEWz0nTI4i_0kxNs1loKKUCaJgWF0K-3mXDVWftS03r5WXBC9EC7ILeGfOW1qVUGrvSGaurjo-aqRaN99gLVbzGdbwNlSRwDivlHjI76Ci4aaAqMpLn8QEmGj-IixOwWE13EzLGSVR41Mvz_ePOFSx5Czrc3FVq1dcSgRv2xpoMdKEMBFksrchGEbb90d7OpzERHNiToVbIrxCDiYQxulGSDy8exynsY_Z2bVvHEamqNTfm3yUNhHu4ajXJnQ'
};

export default function WorkoutLogger() {
  const { splitId } = useParams();
  const [sets, setSets] = useState([
    { id: 1, weight: '', reps: '' },
    { id: 2, weight: '', reps: '' },
  ]);

  const addSet = () => {
    setSets([...sets, { id: sets.length + 1, weight: '', reps: '' }]);
  };

  const removeSet = (id: number) => {
    setSets(sets.filter(s => s.id !== id));
  };

  const updateSet = (id: number, field: 'weight' | 'reps', value: string) => {
    setSets(sets.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Exercise Hero */}
      <section className="relative h-48 w-full rounded-2xl overflow-hidden border border-white/10 bg-surface-container-low flex flex-col justify-end p-6">
        <div className="relative z-10 space-y-2">
           <span className="font-lexend text-[8px] bg-primary/20 backdrop-blur-md text-primary px-3 py-1 rounded-full border border-primary/20 tracking-widest uppercase inline-block">
            {mockExercise.category}
          </span>
          <h1 className="text-4xl font-black text-white tracking-widest uppercase italic">{mockExercise.name}</h1>
        </div>
        <div className="absolute top-6 right-6 glass-panel px-4 py-3 rounded-xl border-primary/20 min-w-[140px]">
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
            <History className="w-4 h-4 text-primary" />
            <span className="font-lexend text-[9px] text-white tracking-widest uppercase leading-none">Last Session</span>
          </div>
          {mockExercise.lastSession && mockExercise.lastSession.length > 0 ? (
            <div className="space-y-1.5">
              {mockExercise.lastSession.map((set, idx) => (
                <div key={idx} className="flex justify-between items-center font-lexend text-[10px]">
                  <span className="text-on-surface-variant font-medium">S{idx + 1}</span>
                  <span className="text-primary-dim tracking-wider">{set.weight}<span className="text-[8px] text-on-surface-variant ml-0.5">KG</span> × {set.reps}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-[10px] font-lexend text-on-surface-variant text-center py-1">No Data</div>
          )}
        </div>
      </section>

      {/* Logging Form */}
      <section className="space-y-6">
        <div className="grid grid-cols-12 gap-4 px-4 text-on-surface-variant font-lexend text-[8px] tracking-[0.2em] uppercase">
          <div className="col-span-2">Set</div>
          <div className="col-span-4 text-center">Weight (kg)</div>
          <div className="col-span-4 text-center">Reps</div>
          <div className="col-span-2" />
        </div>

        <div className="space-y-3">
          {sets.map((set, i) => (
            <motion.div 
              key={set.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="grid grid-cols-12 gap-4 items-center glass-panel p-3 rounded-xl group transition-all hover:bg-white/5"
            >
              <div className="col-span-2 font-lexend text-2xl font-medium text-primary ml-2">{i + 1}</div>
              <div className="col-span-4">
                <input 
                  type="number" 
                  placeholder="0" 
                  value={set.weight}
                  onChange={(e) => updateSet(set.id, 'weight', e.target.value)}
                  className="w-full bg-transparent input-underline font-lexend text-2xl text-white text-center py-1"
                />
              </div>
              <div className="col-span-4 flex flex-col items-center">
                <input 
                  type="number" 
                  placeholder="0" 
                  value={set.reps}
                  onChange={(e) => updateSet(set.id, 'reps', e.target.value)}
                  className="w-full bg-transparent input-underline font-lexend text-2xl text-white text-center py-1 mb-1.5"
                />
                <div className="flex justify-center gap-1.5 w-full">
                  {[8, 10, 12].map(r => (
                    <button 
                      key={r}
                      onClick={() => updateSet(set.id, 'reps', r.toString())}
                      className="flex-1 py-1 bg-surface-container-highest rounded text-[9px] font-lexend text-on-surface-variant hover:text-primary transition-colors active:scale-95"
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div className="col-span-2 flex justify-end">
                <button 
                  onClick={() => removeSet(set.id)}
                  className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:text-secondary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="pt-4 space-y-4">
          <button 
            onClick={addSet}
            className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-surface-container-highest rounded-2xl text-on-surface-variant hover:border-primary hover:text-primary transition-all active:scale-[0.98] group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            <span className="font-lexend text-[10px] tracking-widest uppercase">Add Set</span>
          </button>
          
          <div className="grid grid-cols-1 gap-4">
            <button className="w-full bg-primary text-on-primary font-black text-xl py-5 rounded-2xl shadow-[0_0_30px_rgba(198,243,51,0.2)] active:scale-95 transition-all uppercase italic tracking-tighter">
              Finish Exercise
            </button>
            <Link 
              to="/workouts/next"
              className="w-full border-2 border-primary text-primary font-black text-xl py-5 rounded-2xl active:scale-95 transition-all text-center uppercase italic tracking-tighter"
            >
              Next Exercise
            </Link>
          </div>
        </div>
      </section>

      {/* Progression Track */}
      <section className="pt-8">
        <h3 className="font-lexend text-[10px] text-on-surface-variant uppercase tracking-[0.2em] mb-4">Progression Track</h3>
        <div className="glass-panel p-6 rounded-2xl h-36 flex items-end gap-2">
          {[0, 0, 0, 0, 0].map((h, i) => (
            <motion.div 
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h * 100}%` }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="flex-1 bg-primary/20 rounded-t-sm relative"
            >
               {i === 4 && <div className="absolute inset-0 bg-primary shadow-[0_0_15px_rgba(198,243,51,0.5)] rounded-t-sm" />}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
