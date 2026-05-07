import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Plus, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Link, useNavigate } from 'react-router-dom';

const defaultSplits = [
  {
    id: 'chest',
    name: 'Chest Day',
    type: 'STRENGTH',
    duration: '65 MIN',
    exercises: ['平板卧推', '哑铃卧推', '上斜哑铃卧推', '蝴蝶机夹胸', '固定器械坐姿推胸', '绳索下压'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJKifnBTrYnwsgF5T11IKnfqG_9RIg4IXUacTFELEa-gCXk2LTl2YrWjkuJ7B-TZt4PDQ5NYEvUqdEss0pBr2PznTDPa0FVegYOr3IVW66YhYbGVqS2cZrZhvq6Ctto49_qTw74JeEHO2W8PwyKj_ZHp1dFoHNpGQ9qFTIw3zrYZDxtfwQaNocLEtzfxuLvQnIVuwMmXnKk1UZaN92CBUqFiB8uhk14iLjdQiYwYfkpxixDhE_cmZ1jpLx_qRIHxSWzl52BivdsPo'
  },
  {
    id: 'back',
    name: 'Back Day',
    type: 'HYPERTROPHY',
    duration: '75 MIN',
    exercises: ['硬拉', '高位下拉', '哑铃划船'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNK5_2Pmcw7ITaHj_KQ7aESGwrj4UqMamCk_IqWKiMdaa7ajCZauCsgE5ZrcyX2PDP0LSh-gM4a2MBamsDPFduZui0KLmVENrphsLeV4MOyt4Pd-xzSAot7KR9cDf675DryWbnWi0lIA4RPQzKM2SYv1vR97LsBVx7gOQR37Xaz2mf7gBarg6tYsvGZQSrpf-iw8ognZgFHhN9E3l-GdsZIlguwCWKbc7-P-0ZBr5k-KVVYamKuWbBbujAIkuhnasRWbZsyhwgqIA'
  },
  {
    id: 'legs',
    name: 'Leg Day',
    type: 'INTENSITY',
    duration: '90 MIN',
    exercises: ['杠铃深蹲', '腿举', '腿弯举', '提踵'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAT_ZHsi7uMy-l9M6Aut4PMsQU5qddgjV7Q1Bya8gfLD0SWljjxup9HeFvu7w7r1a_xlYnmPKncCPaGE_KD_MzUlmtTEdG2HW953JkPpyGgu2nVxrtLHpUztWkhTt5fcGpXCg4741i0KIramNqKAV0GFg8bOThPsFLxzbAS-ePNpLe3Mk-1oXOmDDXk72MzmjFP-Xt8W73eVOhZahj_T_6wWxU2Mj-oD8ofKIUrfH49E92W3BEM9kDXH1RYJY_HEqaSSY6GuGQv9b4',
    fullWidth: true
  }
];

export default function SplitSelection() {
  const navigate = useNavigate();
  const [splits, setSplits] = useState<any[]>([]);

  useEffect(() => {
    import('@/src/lib/defaultData').then(({ getSplits }) => {
      setSplits(getSplits());
    });
  }, []);

  return (
    <div className="space-y-8 pb-10">
      <section>
        <h1 className="text-4xl font-black text-white tracking-widest uppercase italic mb-2">Select Split</h1>
        <p className="text-on-surface-variant max-w-md text-sm">
          Choose your discipline for today. Precision in execution leads to perfection in results.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {splits.map((split) => (
          <Link 
            key={split.id} 
            to={`/workouts/${split.id}`}
            className={cn(
               "group relative overflow-hidden rounded-2xl flex flex-col justify-end p-5 transition-all duration-300 border border-white/5 active:scale-95 bg-surface-container-low hover:bg-surface-container-high",
               split.fullWidth && "md:col-span-2"
            )}
          >
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-primary/20 backdrop-blur-md text-primary px-3 py-0.5 rounded-full font-lexend text-[7px] border border-primary/20 tracking-widest uppercase">
                  {split.type}
                </span>
                <div className="glass-panel px-3 py-0.5 rounded-full font-lexend text-[7px] text-on-surface-variant flex items-center gap-1 uppercase tracking-widest">
                  <Clock className="w-2.5 h-2.5" /> {split.duration}
                </div>
              </div>

              <h2 className="text-2xl font-black text-primary tracking-tighter uppercase italic">{split.name}</h2>
              
              <div className="flex flex-wrap gap-1.5">
                {split.exercises.map((ex, idx) => (
                  <span key={idx} className="text-[8px] font-lexend text-on-surface-variant/80 border border-white/10 px-1.5 py-0.5 rounded uppercase tracking-widest">
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div 
        onClick={() => navigate('/workouts/custom')}
        className="mt-8 border border-dashed border-white/10 rounded-2xl p-6 flex items-center justify-between group hover:border-primary/30 transition-colors cursor-pointer bg-surface/30"
      >
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
            <Plus className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Build Custom Split</h3>
            <p className="text-on-surface-variant text-xs">Define your own muscle group targeting</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}
