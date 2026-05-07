import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Target, Dumbbell } from 'lucide-react';
import { getSplits, saveSplits } from '@/src/lib/defaultData';

export default function CustomSplitBuilder() {
  const navigate = useNavigate();
  const [splits, setSplits] = useState<any[]>([]);
  const [selectedSplitId, setSelectedSplitId] = useState('');
  const [exercise, setExercise] = useState('');

  useEffect(() => {
    const loadedSplits = getSplits();
    setSplits(loadedSplits);
    if (loadedSplits.length > 0) {
      setSelectedSplitId(loadedSplits[0].id);
    }
  }, []);

  const handleSave = () => {
    if (!selectedSplitId) return alert('请选择训练部位！');
    if (!exercise.trim()) return alert('请输入动作名称！');

    const newExercises = exercise.split(/[,，、\n]+/).map(e => e.trim()).filter(Boolean);
    const updatedSplits = splits.map(s => {
      if (s.id === selectedSplitId) {
        return { ...s, exercises: [...s.exercises, ...newExercises] };
      }
      return s;
    });

    saveSplits(updatedSplits);
    navigate('/workouts');
  };

  return (
    <div className="space-y-8 pb-10 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 border-b border-white/5 pb-6">
        <button 
          onClick={() => navigate('/workouts')}
          className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-black text-white tracking-widest uppercase italic leading-none">Add Exercise</h1>
          <p className="text-on-surface-variant text-xs mt-1">Append to an existing routine</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="font-lexend text-[10px] text-primary uppercase tracking-[0.2em] ml-2 flex items-center gap-1">
            <Target className="w-3 h-3" /> 训练部位 (Select Muscle Group)
          </label>
          <div className="relative">
            <select
              value={selectedSplitId}
              onChange={(e) => setSelectedSplitId(e.target.value)}
              className="w-full glass-panel border-none rounded-xl p-4 text-white font-lexend text-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer bg-transparent"
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

        <div className="space-y-2">
          <label className="font-lexend text-[10px] text-primary uppercase tracking-[0.2em] ml-2 flex items-center gap-1">
            <Dumbbell className="w-3 h-3" /> 动作名称 (Exercise Names)
          </label>
          <textarea 
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            placeholder="例如：侧平举，哑铃推举 (多个动作请用逗号隔开)"
            rows={4}
            className="w-full glass-panel border-none rounded-xl p-4 text-white font-lexend placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
          />
        </div>
      </div>

      <div className="pt-8">
        <button 
          onClick={handleSave}
          className="w-full bg-primary text-black font-black text-xl py-5 rounded-2xl shadow-[0_0_30px_rgba(198,243,51,0.2)] active:scale-95 transition-all uppercase italic tracking-tighter flex items-center justify-center gap-2"
        >
          <Save className="w-6 h-6" />
          保存动作 (Save Exercises)
        </button>
      </div>
    </div>
  );
}
