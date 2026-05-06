import { LayoutDashboard, Dumbbell, Calendar, BarChart3 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dash', path: '/' },
  { icon: Dumbbell, label: 'Workouts', path: '/workouts' },
  { icon: Calendar, label: 'History', path: '/history' },
  { icon: BarChart3, label: 'Stats', path: '/stats' },
];

export function BottomNavBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-20 bg-surface-container/90 backdrop-blur-2xl border-t border-white/10 flex justify-around items-center px-4 pb-safe max-w-5xl mx-auto w-full rounded-t-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.5)]">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center transition-all duration-300",
            isActive ? "text-primary scale-110 font-bold" : "text-on-surface-variant/60"
          )}
        >
          {({ isActive }) => (
            <>
              <item.icon className={cn("w-6 h-6", isActive && "fill-current")} />
              <span className="text-[10px] uppercase font-lexend mt-1 tracking-widest">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
