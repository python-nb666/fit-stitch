import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Trophy, Gauge, History } from 'lucide-react';
import { cn } from '@/src/lib/utils';



import { Copy } from 'lucide-react';

export default function HistoryView() {
  const [monthOffset, setMonthOffset] = useState(0);
  const [trainedDays, setTrainedDays] = useState<string[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('/api/history');
        if (res.ok) {
          const data = await res.json();
          setTrainedDays(data.trainedDays || []);
        }
      } catch (e) {
        console.error('Failed to fetch history', e);
      }
    };
    fetchHistory();
  }, []);

  const now = new Date();
  const targetDate = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
  
  const currentMonth = targetDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const currentDay = monthOffset === 0 ? now.getDate() : null;
  const daysInMonth = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0).getDate();
  
  const firstDayOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1).getDay();
  const emptyDaysCount = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const prevMonthDays = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0).getDate();

  const currentMonthTrainedCount = trainedDays.filter((dateStr: string) => {
    const d = new Date(dateStr);
    return d.getFullYear() === targetDate.getFullYear() && d.getMonth() === targetDate.getMonth();
  }).length;

  const stats = [
    { label: 'MONTHLY SESSIONS', value: currentMonthTrainedCount.toString() },
    { label: 'TOTAL VOLUME', value: '0' },
  ];

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dateStr = new Date(targetDate.getFullYear(), targetDate.getMonth(), day).toLocaleDateString('en-CA');
    
    return {
      day,
      active: trainedDays.includes(dateStr),
      current: day === currentDay
    };
  });
  const handleExport = () => {
    const exportData = {
      stats,
      calendarDays,
      trainedDays
    };
    navigator.clipboard.writeText(JSON.stringify(exportData, null, 2))
      .then(() => alert('所有的训练数据已成功复制到剪贴板！'))
      .catch(() => alert('复制失败，请重试'));
  };

  return (
    <div className="space-y-8 pb-10">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="font-lexend text-[10px] text-on-surface-variant tracking-[0.3em] uppercase mb-1">Athlete Progression</p>
          <div className="flex flex-wrap items-center gap-4 mt-1">
            <h1 className="text-4xl font-black text-white tracking-widest uppercase italic">History & Stats</h1>
            <button 
              onClick={handleExport}
              className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-3 py-1.5 rounded-lg text-xs font-lexend uppercase tracking-widest transition-colors flex items-center gap-1.5 active:scale-95"
            >
              <Copy className="w-3.5 h-3.5" />
              Copy Data
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="glass-panel p-4 px-6 rounded-2xl flex flex-col items-center min-w-[120px]">
              <span className="font-lexend text-[8px] text-on-surface-variant uppercase tracking-widest">{stat.label}</span>
              <span className="font-lexend text-2xl font-medium text-primary mt-1">{stat.value}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Calendar */}
        <section className="md:col-span-7 glass-panel rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic">{currentMonth}</h3>
            <div className="flex gap-2">
              <button onClick={() => setMonthOffset(monthOffset - 1)} className="p-2 hover:bg-white/5 rounded-full transition-colors active:scale-95"><ChevronLeft className="w-5 h-5 text-on-surface-variant hover:text-white transition-colors" /></button>
              <button onClick={() => setMonthOffset(monthOffset + 1)} className="p-2 hover:bg-white/5 rounded-full transition-colors active:scale-95"><ChevronRight className="w-5 h-5 text-on-surface-variant hover:text-white transition-colors" /></button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 text-center mb-4">
            {['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].map(d => (
              <div key={d} className="font-lexend text-[9px] text-on-surface-variant uppercase tracking-widest">{d}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: emptyDaysCount }).map((_, i) => (
              <div key={`empty-${i}`} className="h-12 flex items-center justify-center font-sans text-on-surface-variant opacity-20">
                {prevMonthDays - emptyDaysCount + i + 1}
              </div>
            ))}
            {calendarDays.map((d) => (
              <div 
                key={d.day}
                className={cn(
                  "h-12 flex flex-col items-center justify-center rounded-lg relative transition-all cursor-pointer hover:bg-white/5",
                  d.current ? "bg-primary/20 border border-primary/30 text-primary electric-glow" : "text-on-surface",
                  d.active && !d.current && "bg-surface-container-high"
                )}
              >
                <span className="text-sm font-medium">{d.day}</span>
                {d.active && (
                  <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-primary" />
                )}
              </div>
            ))}
          </div>
        </section>


      </div>
    </div>
  );
}
