import { motion } from 'motion/react';
import { Dumbbell, Target, ChevronRight, Activity, Zap, Play } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';

const exercises = [
  {
    id: 'incline-db',
    name: '上斜哑铃推胸',
    tag: 'STRENGTH',
    lastWeight: '-',
    unit: 'KG',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-kddUR0Yb9uLTHQZRdA-F-xtcfVRADkELyztcpZCnFehzbw6CivZCxlSb6mQysIDI6voXgfIu0WKR0fG8um05eHhGLgiufeRJu1NsTds3q_-6afVX9dbpG0_mlPz3Vj9uCQgqE58zori8ueHwKsGIP4oEZtUTv16x163FsNZXC78PqumakvcYpqlYMWGn96UFKRGqdZ9zD2-z_ggaqtqjgPjkRCe0I2inpiVRi8ZWET9PadnyCHTdCnqWex77HD5Yqgr0R6K6bgw'
  },
  {
    id: 'cable-flyes',
    name: '绳索飞鸟',
    tag: 'ISOLATION',
    lastWeight: '-',
    unit: 'KG',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJsGa8D17-E5gBhWjawRX-0GYmnwTAfww6D_kk-489dK6esuuGp7hqqxAU16zMlCeTmuqwNzI1uR-oawvWag8MCNcJdon-rpDZ22_zlXib3v7CDOYr56Rs4ZyXwRANNg5mRyk3wPmg5RsW_vO7xg9b7r-N7U4tRIHdy8_hUV83F2sjsjsghQkI_PvoWSux-ONFplaBdJ3Dfrpwa_QIjVBaVfvBg4EtZCvfGIDXmKDW-vFezvrcNo_k9z60Xb8nZq4B5K_nnP9-2Tk'
  },
  {
    id: 'weighted-dips',
    name: '负重双杠臂屈伸',
    tag: 'BODYWEIGHT+',
    lastWeight: '-',
    unit: 'KG',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrs8riw7WbsbeX7WRbix_YfIjqmCGOcCudLcXdhBIW_dI2Zo2oX-ZTLEPtJdqhQ64chmxP5Rak_dMsipsPuOtcAvsTrZmmAFWyzYiE_XM3XC22uq6Nqz0OmgZ56FeQyiOq5cJ5BeLq6boyEeVUoRgnjBvYtf8FKIbKXopl1GPXDW8awTQuERXW9ZrX9Bnigm8T1hlsDLO85pvp3tI45ib53BCuSSKs1qRB7IvbV097Lik-NvCzhYjIz_ZPpfPrUbaR8c-ZvKsjquU',
    full: true
  }
];

export default function ExerciseSelection() {
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
            <div className="h-full w-2/5 bg-primary shadow-[0_0_8px_rgba(171,214,4,0.4)]" />
          </div>
          <span className="text-lexend text-[9px] text-on-surface-variant font-medium tracking-widest uppercase">2 / 5 Exercises</span>
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
              to="/workouts/1/log"
              className={cn(
                "relative group text-left flex flex-col w-full rounded-2xl overflow-hidden glass-card transition-all active:scale-95 duration-200 bg-surface-container-low hover:bg-surface-container-high",
                ex.full && "md:col-span-2"
              )}
            >
              <div className="p-6 relative z-20">
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter group-hover:text-primary transition-colors">{ex.name}</h3>
                <div className="flex justify-between items-end mt-4">
                  <div>
                    <span className="block font-lexend text-[8px] text-on-surface-variant mb-1 uppercase tracking-widest">Last Weight</span>
                    <span className="text-2xl font-lexend font-medium text-primary-dim">
                      {ex.lastWeight}<span className="text-sm ml-1 text-on-surface-variant">{ex.unit}</span>
                    </span>
                  </div>
                  <motion.div whileHover={{ scale: 1.2 }} className="text-primary-dim">
                    <Play className="w-6 h-6 fill-current" />
                  </motion.div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Alternatives */}
      <section className="space-y-4">
        <h3 className="font-lexend text-[10px] text-on-surface-variant uppercase tracking-[0.3em] font-bold">Programmed Alternatives</h3>
        <div className="space-y-2">
          {[
            { name: '俯卧撑 (力竭)', icon: Activity, meta: 'Until Failure' },
            { name: '器械推胸', icon: Zap, meta: 'Last: -' }
          ].map((alt, i) => (
            <div key={i} className="flex items-center justify-between p-4 glass-card rounded-xl group hover:border-primary/50 transition-colors cursor-pointer bg-surface/40">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
                  <alt.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-white uppercase italic tracking-tighter">{alt.name}</p>
                  <p className="font-lexend text-[8px] text-on-surface-variant uppercase tracking-widest">{alt.meta}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors group-hover:translate-x-1" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
