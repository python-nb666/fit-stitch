import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Target, Plus, Minus, ArrowUp, ArrowDown, Dumbbell } from 'lucide-react';
import { getSplits, saveSplits } from '@/src/lib/defaultData';
import { cn } from '@/src/lib/utils';

export default function CustomSplitBuilder() {
  const navigate = useNavigate();
  const [splits, setSplits] = useState<any[]>([]);
  const [selectedSplitId, setSelectedSplitId] = useState('');
  
  const [active, setActive] = useState<string[]>([]);
  const [pool, setPool] = useState<string[]>([]);
  const [newEx, setNewEx] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const loadedSplits = await getSplits();
      setSplits(loadedSplits);
      if (loadedSplits.length > 0) {
        setSelectedSplitId(loadedSplits[0].id);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!selectedSplitId) return;
    const split = splits.find(s => s.id === selectedSplitId);
    if (split) {
      setActive([...(split.exercises || [])]);
      setPool([...(split.pool || [])]);
    }
  }, [selectedSplitId, splits]);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const items = [...active];
    [items[index - 1], items[index]] = [items[index], items[index - 1]];
    setActive(items);
  };

  const moveDown = (index: number) => {
    if (index === active.length - 1) return;
    const items = [...active];
    [items[index + 1], items[index]] = [items[index], items[index + 1]];
    setActive(items);
  };

  const moveToPool = (ex: string) => {
    setActive(active.filter(e => e !== ex));
    if (!pool.includes(ex)) setPool([ex, ...pool]);
  };

  const moveToActive = (ex: string) => {
    setPool(pool.filter(e => e !== ex));
    if (!active.includes(ex)) setActive([...active, ex]);
  };

  const addNewToPool = () => {
    if (!newEx.trim()) return;
    const exName = newEx.trim();
    if (!active.includes(exName) && !pool.includes(exName)) {
      setPool([exName, ...pool]);
    }
    setNewEx('');
  };

  const handleSave = async () => {
    try {
      await fetch(`/api/splits/${selectedSplitId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active, pool })
      });
    } catch (e) {
      console.error('Failed to save split', e);
    }
    navigate('/workouts');
  };

  return (
    <div className="space-y-6 pb-20 max-w-2xl mx-auto px-4 pt-4">
      <div className="flex items-center gap-4 border-b border-white/5 pb-4">
        <button 
          onClick={() => navigate('/workouts')}
          className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-widest uppercase italic leading-none">Orchestrator</h1>
          <p className="text-on-surface-variant text-[10px] mt-1 uppercase tracking-widest">Plan your routine</p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-lexend text-[10px] text-primary uppercase tracking-[0.2em] ml-2 flex items-center gap-1">
          <Target className="w-3 h-3" /> Select Discipline
        </label>
        <div className="relative">
          <select
            value={selectedSplitId}
            onChange={(e) => setSelectedSplitId(e.target.value)}
            className="w-full glass-panel border-none rounded-xl p-4 text-white font-lexend text-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer bg-transparent"
          >
            {splits.map(s => (
              <option key={s.id} value={s.id} className="bg-surface-container-high text-sm">
                {s.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-on-surface-variant">
            ▼
          </div>
        </div>
      </div>

      {/* Active Routine */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between ml-2">
          <label className="font-lexend text-[10px] text-green-400 uppercase tracking-[0.2em] flex items-center gap-1">
            <Target className="w-3 h-3" /> Today's Routine ({active.length})
          </label>
          <span className="text-[9px] text-on-surface-variant tracking-widest uppercase">Sorted Order</span>
        </div>
        
        <div className="space-y-2 min-h-[100px] glass-panel p-2 rounded-xl bg-surface-container-lowest border-dashed border-white/10 border">
          {active.length === 0 && (
            <div className="text-center text-on-surface-variant text-xs py-4 font-lexend uppercase tracking-widest">No active exercises</div>
          )}
          {active.map((ex, idx) => (
            <div key={ex} className="flex items-center gap-2 glass-card p-2 rounded-lg bg-surface-container-low border-white/5">
              <span className="w-6 text-center font-lexend text-xs text-primary-dim">{idx + 1}</span>
              <span className="flex-1 font-lexend text-sm text-white truncate">{ex}</span>
              
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => moveUp(idx)} disabled={idx === 0} className="p-1.5 rounded-md hover:bg-white/10 text-on-surface-variant disabled:opacity-30">
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button onClick={() => moveDown(idx)} disabled={idx === active.length - 1} className="p-1.5 rounded-md hover:bg-white/10 text-on-surface-variant disabled:opacity-30">
                  <ArrowDown className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-white/10 mx-1" />
                <button onClick={() => moveToPool(ex)} className="p-1.5 rounded-md hover:bg-red-500/20 text-on-surface-variant hover:text-red-400 transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exercise Pool */}
      <div className="space-y-2 pt-2">
        <label className="font-lexend text-[10px] text-on-surface-variant uppercase tracking-[0.2em] ml-2 flex items-center gap-1">
          <Dumbbell className="w-3 h-3" /> Exercise Pool ({pool.length})
        </label>
        
        <div className="flex gap-2">
          <input 
            value={newEx}
            onChange={(e) => setNewEx(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addNewToPool()}
            placeholder="Add new exercise to library..."
            className="flex-1 glass-card border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
          />
          <button 
            onClick={addNewToPool}
            className="px-4 glass-card border-white/5 rounded-xl text-primary hover:bg-primary/10 transition-colors flex items-center justify-center shrink-0"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          {pool.map((ex) => (
            <button
              key={ex}
              onClick={() => moveToActive(ex)}
              className="flex items-center justify-between p-3 glass-card rounded-lg text-left group hover:border-primary/30 transition-all border-white/5 bg-surface-container-low"
            >
              <span className="font-lexend text-xs text-on-surface-variant group-hover:text-white truncate pr-2">{ex}</span>
              <Plus className="w-3 h-3 text-primary shrink-0 opacity-50 group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent z-50">
        <div className="max-w-2xl mx-auto">
          <button 
            onClick={handleSave}
            className="w-full bg-primary text-black font-black text-xl py-4 rounded-2xl shadow-[0_0_30px_rgba(198,243,51,0.2)] active:scale-95 transition-all uppercase italic tracking-tighter flex items-center justify-center gap-2"
          >
            <Save className="w-6 h-6" />
            Save Protocol
          </button>
        </div>
      </div>
    </div>
  );
}
