import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Target, Dumbbell } from 'lucide-react';

export default function CustomSplitBuilder() {
  const navigate = useNavigate();
  const [part, setPart] = useState('');
  const [exercise, setExercise] = useState('');

  const handleSave = () => {
    if (!part.trim()) return alert('请输入训练部位！');
    if (!exercise.trim()) return alert('请输入动作名称！');

    const newSplit = {
      id: `custom-${Date.now()}`,
      name: part.trim(),
      type: 'CUSTOM',
      duration: '60 MIN',
      exercises: exercise.split(/[,，、\n]+/).map(e => e.trim()).filter(Boolean),
      img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop',
      fullWidth: false
    };

    const saved = localStorage.getItem('customSplits');
    const parsed = saved ? JSON.parse(saved) : [];
    localStorage.setItem('customSplits', JSON.stringify([...parsed, newSplit]));
    
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
          <p className="text-on-surface-variant text-xs mt-1">Quickly add a new routine</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="font-lexend text-[10px] text-primary uppercase tracking-[0.2em] ml-2 flex items-center gap-1">
            <Target className="w-3 h-3" /> 训练部位 (Target Muscle)
          </label>
          <input 
            value={part}
            onChange={(e) => setPart(e.target.value)}
            placeholder="例如：肩膀、核心..."
            className="w-full glass-panel border-none rounded-xl p-4 text-white font-lexend text-xl placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
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
          保存 (Save)
        </button>
      </div>
    </div>
  );
}
