import { User, Bell } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function TopAppBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/80 backdrop-blur-xl border-b border-white/10 px-4 flex justify-between items-center max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden border border-white/10 flex items-center justify-center">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB31J-JxiKHNcDil2z5FiMoNO-bWv1dBjFvVUYIK86Qf7QgBjeJDzaQTf1p0BSiyMT0PXWnAb4F5bs9z0VRlUadpfYzMJGXkYFRwhMWDa5Qn3WoQzUFxSHzkNB3SiJWIuebxfPfKU_HAQ5fvDzbHAxgfKSv4Q7DefBE_H9ZxG9uOfgzE_J4YdNvgrnEDQoKgZnZ8lbmlsHQSI7WY9GzDmWTfryyVCIv1zlHe2pWI4ValpN3-_ucWBtmdZmWsZZFuZeJcs64FUbI9CA" 
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="font-sans text-2xl font-black text-primary tracking-tighter uppercase italic">FORGE</span>
      </div>
      
      <button className="text-primary hover:bg-white/5 p-2 rounded-full transition-colors active:scale-90">
        <Bell className="w-5 h-5" />
      </button>
    </header>
  );
}
