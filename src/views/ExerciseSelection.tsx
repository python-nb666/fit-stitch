import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Link, useParams } from 'react-router-dom';

const exercises = [
  { id: 'bench-press', name: '平板卧推', tag: 'STRENGTH', lastWeight: '-', unit: 'KG', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop' },
  { id: 'db-press', name: '哑铃卧推', tag: 'STRENGTH', lastWeight: '-', unit: 'KG', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop' },
  { id: 'incline-db', name: '上斜哑铃卧推', tag: 'STRENGTH', lastWeight: '-', unit: 'KG', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop' },
  { id: 'pec-deck', name: '蝴蝶机夹胸', tag: 'ISOLATION', lastWeight: '-', unit: 'KG', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1470&auto=format&fit=crop' },
  { id: 'seated-press', name: '固定器械坐姿推胸', tag: 'MACHINE', lastWeight: '-', unit: 'KG', img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1470&auto=format&fit=crop' },
  { id: 'tricep-pushdown', name: '绳索下压', tag: 'ISOLATION', lastWeight: '-', unit: 'KG', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop', full: true }
];

export default function ExerciseSelection() {
  const { splitId } = useParams();

  return (
    <div className="space-y-6 pb-10">
      {/* Header Stat */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-primary-dim font-lexend text-[10px] tracking-[0.3em] uppercase">Current Session</span>
        </div>
        <h1 className="text-4xl font-black text-white tracking-widest uppercase italic font-lexend">Chest Day</h1>
        <div className="flex items-center gap-4">
          <div className="h-1 w-24 bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full w-1/6 bg-primary shadow-[0_0_8px_rgba(171,214,4,0.4)]" />
          </div>
          <span className="text-lexend text-[9px] text-on-surface-variant font-medium tracking-widest uppercase">1 / 6 Exercises</span>
        </div>
      </section>

      {/* Grid Selection */}
      <div className="space-y-3">
        <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">Select Next Exercise</h2>
        <p className="text-on-surface-variant text-xs border-b border-white/5 pb-3">Follow programmed progression</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exercises.map((ex) => (
            <Link 
              key={ex.id} 
              to={`/workouts/${splitId || '1'}/log/${encodeURIComponent(ex.name)}`}
              state={{ exercise: ex }}
              className={cn(
                "relative group text-left flex flex-col w-full rounded-2xl overflow-hidden glass-card transition-all active:scale-95 duration-200 bg-surface-container-low hover:bg-surface-container-high",
                ex.full && "md:col-span-2"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
              <img src={ex.img} alt={ex.name} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity" />
              
              <div className="p-6 relative z-20 h-32 flex flex-col justify-end">
                <span className="bg-primary/20 backdrop-blur-md text-primary px-2 py-0.5 rounded font-lexend text-[7px] border border-primary/20 tracking-widest uppercase w-fit mb-2">
                  {ex.tag}
                </span>
                <h3 className="text-xl font-black text-white uppercase italic tracking-tighter group-hover:text-primary transition-colors">{ex.name}</h3>
                <div className="flex justify-between items-end mt-2">
                  <div>
                    <span className="block font-lexend text-[8px] text-on-surface-variant mb-1 uppercase tracking-widest">Last Weight</span>
                    <span className="text-lg font-lexend font-medium text-primary-dim">
                      {ex.lastWeight}<span className="text-xs ml-1 text-on-surface-variant">{ex.unit}</span>
                    </span>
                  </div>
                  <motion.div whileHover={{ scale: 1.2 }} className="text-primary-dim bg-surface/50 p-2 rounded-full backdrop-blur-sm">
                    <Play className="w-4 h-4 fill-current" />
                  </motion.div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
