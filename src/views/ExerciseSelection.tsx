import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, CheckCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Link, useParams } from 'react-router-dom';
import { getSplits } from '@/src/lib/defaultData';

export default function ExerciseSelection() {
  const { splitId } = useParams();
  const [split, setSplit] = useState<any>(null);
  const [completedExs, setCompletedExs] = useState<string[]>([]);

  useEffect(() => {
    const splits = getSplits();
    const found = splits.find((s: any) => s.id === splitId) || splits[0];
    setSplit(found);
    
    setCompletedExs(JSON.parse(localStorage.getItem('completedExs') || '[]'));
  }, [splitId]);

  if (!split) return null;

  const totalExercises = split.exercises.length;
  const completedCount = split.exercises.filter((ex: string) => completedExs.includes(ex)).length;
  const progressPercent = totalExercises > 0 ? (completedCount / totalExercises) * 100 : 0;

  return (
    <div className="space-y-6 pb-10">
      {/* Header Stat */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-primary-dim font-lexend text-[10px] tracking-[0.3em] uppercase">Current Session</span>
        </div>
        <h1 className="text-4xl font-black text-white tracking-widest uppercase italic font-lexend">{split.name}</h1>
        <div className="flex items-center gap-4">
          <div className="h-1 w-24 bg-surface-container-highest rounded-full overflow-hidden relative">
            <div 
              className="absolute left-0 top-0 h-full bg-primary shadow-[0_0_8px_rgba(171,214,4,0.4)] transition-all duration-500" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-lexend text-[9px] text-on-surface-variant font-medium tracking-widest uppercase">{completedCount} / {totalExercises} Exercises</span>
        </div>
      </section>

      {/* Grid Selection */}
      <div className="space-y-3">
        <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">Select Next Exercise</h2>
        <p className="text-on-surface-variant text-xs border-b border-white/5 pb-3">Follow programmed progression</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {split.exercises.map((ex: string, idx: number) => {
            const isCompleted = completedExs.includes(ex);
            return (
              <Link 
                key={idx} 
                to={`/workouts/${split.id}/log/${encodeURIComponent(ex)}`}
                state={{ exercise: { name: ex, tag: split.type, lastWeight: '-', unit: 'KG' } }}
                className={cn(
                  "relative group text-left flex flex-col w-full rounded-2xl overflow-hidden glass-card transition-all active:scale-95 duration-200",
                  isCompleted ? "bg-surface-container-highest border-primary/20" : "bg-surface-container-low hover:bg-surface-container-high"
                )}
              >
                <div className={cn("absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10", isCompleted && "opacity-80")} />
                
                <div className="p-6 relative z-20 h-32 flex flex-col justify-end">
                  <div className="flex justify-between items-start mb-auto">
                    <span className={cn(
                      "backdrop-blur-md px-2 py-0.5 rounded font-lexend text-[7px] border tracking-widest uppercase",
                      isCompleted ? "bg-green-500/20 text-green-400 border-green-500/20" : "bg-primary/20 text-primary border-primary/20"
                    )}>
                      {isCompleted ? "COMPLETED" : split.type}
                    </span>
                    {isCompleted && <CheckCircle className="w-5 h-5 text-green-400" />}
                  </div>

                  <h3 className={cn("text-xl font-black uppercase italic tracking-tighter transition-colors mt-2", isCompleted ? "text-white/60" : "text-white group-hover:text-primary")}>
                    {ex}
                  </h3>
                  <div className="flex justify-between items-end mt-2">
                    <div>
                      <span className="block font-lexend text-[8px] text-on-surface-variant mb-1 uppercase tracking-widest">Last Weight</span>
                      <span className={cn("text-lg font-lexend font-medium", isCompleted ? "text-on-surface-variant" : "text-primary-dim")}>
                        -<span className="text-xs ml-1 text-on-surface-variant">KG</span>
                      </span>
                    </div>
                    {!isCompleted && (
                      <motion.div whileHover={{ scale: 1.2 }} className="text-primary-dim bg-surface/50 p-2 rounded-full backdrop-blur-sm">
                        <Play className="w-4 h-4 fill-current" />
                      </motion.div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
