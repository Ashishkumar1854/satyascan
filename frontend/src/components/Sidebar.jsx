import { NavLink, useLocation } from 'react-router-dom';
import { ShieldCheck, Upload, FileText, Clock, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Sidebar() {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
      isActive
        ? 'bg-[#EBEBEB] dark:bg-[#252525] text-[#1A1A1A] dark:text-[#F0F0F0]'
        : 'text-[#6B6B6B] dark:text-[#9A9A9A] hover:bg-[#EBEBEB] dark:hover:bg-[#252525]'
    }`;

  return (
    <div className="w-[180px] h-full flex flex-col bg-[#F5F5F3] dark:bg-[#0F0F0F] border-r border-black/10 dark:border-white/10 p-4 shrink-0">
      <div className="flex items-center gap-2 mb-8 text-[#1A1A1A] dark:text-[#F0F0F0]">
        <ShieldCheck className="text-[#178BFF]" size={24} />
        <span className="font-medium text-[15px]">SatyaScan</span>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        <NavLink to="/" className={navLinkClass} end>
          <Upload size={16} />
          Upload
        </NavLink>
        <NavLink 
          to={location.pathname.startsWith('/results/') || location.pathname.startsWith('/processing/') ? location.pathname : '/history'} 
          className={({ isActive }) => 
            `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
              location.pathname.startsWith('/results/') || location.pathname.startsWith('/processing/')
                ? 'bg-[#EBEBEB] dark:bg-[#252525] text-[#1A1A1A] dark:text-[#F0F0F0]'
                : 'text-[#6B6B6B] dark:text-[#9A9A9A] hover:bg-[#EBEBEB] dark:hover:bg-[#252525]'
            }`
          }
        >
          <FileText size={16} />
          Results
        </NavLink>
        <NavLink to="/history" className={navLinkClass}>
          <Clock size={16} />
          History
        </NavLink>
      </nav>

      <div className="mt-auto flex flex-col gap-4">
        <div 
          className="flex items-center justify-between text-[#6B6B6B] dark:text-[#9A9A9A] text-sm px-2 cursor-pointer hover:text-[#1A1A1A] dark:hover:text-[#F0F0F0]" 
          onClick={() => setIsDark(!isDark)}
        >
          <span className="flex items-center gap-2">
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </span>
        </div>
        <div className="text-xs text-[#9A9A9A] dark:text-[#6B6B6B] px-2">
          <p>3 checks today</p>
          <p>Free plan</p>
        </div>
      </div>
    </div>
  );
}
