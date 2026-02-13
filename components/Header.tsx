
import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Circle, TrendingUp, TrendingDown, LayoutGrid, Command, ArrowRight, CheckCheck, X, Wallet, PieChart, ChevronRight, Settings, LogOut, User } from 'lucide-react';

interface HeaderProps {
  title?: string;
  totalBalance?: number;
  dailyChange?: number;
  cashBalance?: number;
  onViewAnalytics?: () => void;
  onSettingsClick?: () => void;
  onLogout?: () => void;
}

import { useTranslation } from '../services/LanguageContext';

const Header: React.FC<HeaderProps> = ({ 
  title = "Portfolio",
  totalBalance = 15215.70, 
  dailyChange = 2.4,
  cashBalance = 0,
  onViewAnalytics,
  onSettingsClick,
  onLogout
}) => {
  const { t } = useTranslation();
  const isPositive = dailyChange >= 0;
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNetWorth, setShowNetWorth] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const netWorthRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const investedAmount = totalBalance - cashBalance;
  const cashPercent = totalBalance > 0 ? (cashBalance / totalBalance) * 100 : 0;
  const investedPercent = totalBalance > 0 ? (investedAmount / totalBalance) * 100 : 0;

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (netWorthRef.current && !netWorthRef.current.contains(event.target as Node)) {
        setShowNetWorth(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const notifications = [
      { id: 1, title: 'Order Executed', message: 'Bought 10 MSFT @ $410.20', time: '2 min ago', type: 'success', read: false },
      { id: 2, title: 'Price Alert', message: 'AAPL is up 5% today', time: '1 hour ago', type: 'info', read: false },
      { id: 3, title: 'Security Alert', message: 'New device signed in from London', time: '5 hours ago', type: 'warning', read: true },
      { id: 4, title: 'Weekly Digest', message: 'Your portfolio performance report is ready.', time: '1 day ago', type: 'info', read: true },
  ];

  const handleAnalyticsClick = () => {
    setShowNetWorth(false);
    if (onViewAnalytics) onViewAnalytics();
  };

  return (
    <header className="h-18 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-8 sticky top-0 z-30 transition-all duration-300">
      
      {/* Left Section: Title & Market Status */}
      <div className="flex items-center gap-6">
        <h1 className="text-lg font-bold text-slate-700 tracking-tight">{title}</h1>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100/50">
          <Circle size={8} className="fill-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-wider">{t.dashboard.marketOpen}</span>
        </div>
      </div>

      {/* Center Section: Search */}
      <div className="flex-1 max-w-xl mx-8 hidden lg:block">
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search for stocks & more" 
            className="w-full bg-slate-50 border border-transparent group-hover:bg-slate-100 group-focus-within:bg-white group-focus-within:border-blue-500/30 group-focus-within:ring-4 group-focus-within:ring-blue-500/10 rounded-2xl py-2.5 pl-12 pr-4 text-sm transition-all duration-200 placeholder:text-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Right Section: Balance & Utility */}
      <div className="flex items-center gap-6">
        
        {/* Performance Badge */}
        <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-bold border border-slate-200 bg-white shadow-sm ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {isPositive ? '+' : ''}{dailyChange}% {t.portfolio.performance}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2.5 rounded-full transition-all border border-slate-100 ${showNotifications ? 'bg-slate-100 text-slate-700' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-600'}`}
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white"></span>
          </button>
          
          {/* Notification Popup Logic (kept same) */}
          {showNotifications && (
            <div className="absolute top-full right-0 mt-4 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-fade-in-up z-50">
               <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
                  <h3 className="font-bold text-slate-900">Notifications</h3>
                  <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                      <CheckCheck size={14} /> Mark all read
                  </button>
               </div>
               
               <div className="max-h-[400px] overflow-y-auto">
                   {notifications.map(n => (
                       <div key={n.id} className={`p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 ${!n.read ? 'bg-blue-50/20' : ''}`}>
                           <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${!n.read ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                           <div className="flex-1">
                               <div className="flex justify-between items-start mb-0.5">
                                   <span className={`text-sm ${!n.read ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>{n.title}</span>
                                   <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap ml-2">{n.time}</span>
                               </div>
                               <p className={`text-xs leading-relaxed ${!n.read ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>{n.message}</p>
                           </div>
                       </div>
                   ))}
               </div>

               <div className="p-3 border-t border-slate-50 bg-slate-50/50 text-center">
                   <button className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1 mx-auto transition-colors w-full py-1">
                       View All Activity <ArrowRight size={12} />
                   </button>
               </div>
            </div>
          )}
        </div>

        {/* Profile Section */}
        <div className="relative pl-6 border-l border-slate-200" ref={profileRef}>
            <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 transition-all group"
            >
                <div className="text-left hidden md:block">
                    <div className="text-sm font-bold text-slate-900 leading-none mb-0.5">Barnabas</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ID: 948201</div>
                </div>
                <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-slate-200/80 ring-2 ring-white shadow-sm group-hover:ring-blue-100 transition-all overflow-hidden flex items-center justify-center">
                       {/* Placeholder avatar or img */}
                    </div>
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                </div>
            </button>

            {showProfileMenu && (
                <div className="absolute top-full right-0 mt-4 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-fade-in-up z-50 p-2">
                    <button 
                        onClick={() => { onSettingsClick?.(); setShowProfileMenu(false); }} 
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                        <User size={16} /> Account
                    </button>
                    <div className="h-px bg-slate-50 my-1"></div>
                    <button 
                        onClick={() => { onLogout?.(); setShowProfileMenu(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    >
                        <LogOut size={16} /> Log Out
                    </button>
                </div>
            )}
        </div>

      </div>
    </header>
  );
};

export default Header;
