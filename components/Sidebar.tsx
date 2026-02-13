import React, { useState } from 'react';
import { Home, ArrowLeftRight, LineChart, Wallet, GraduationCap, Users, Phone, ChevronDown, ChevronRight, PieChart, Settings, ChevronsLeft, ChevronsRight } from 'lucide-react';
import Logo from './Logo';
import { useTranslation } from '../services/LanguageContext';

interface SidebarProps {
  currentView: string;
  currentCategory?: string;
  onChangeView: (view: any, category?: string) => void;
  width: number;
  collapsed: boolean;
  onToggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, currentCategory, onChangeView, width, collapsed, onToggleSidebar }) => {
  const { t } = useTranslation();
  const [isStockExpanded, setIsStockExpanded] = useState(true);
  const [isExchangeExpanded, setIsExchangeExpanded] = useState(false);

  // ... (MenuItem definitions) 
  const MenuItem = ({ icon: Icon, label, active = false, onClick, hasSubmenu = false, expanded = false, collapsed = false }: any) => (
    <button 
      onClick={onClick}
      className={`w-full flex items-center ${collapsed ? 'justify-center px-0' : 'justify-between px-4'} py-3 rounded-xl transition-all duration-200 group mb-1
        ${active ? 'bg-slate-100 text-blue-600 font-medium' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
      `}
    >
      <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
        <Icon size={20} className={active ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'} />
        <span className={collapsed ? 'hidden' : 'inline'}>{label}</span>
      </div>
      {hasSubmenu && !collapsed && (
        <div className="text-slate-400">
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
      )}
    </button>
  );

  const SubMenuItem = ({ label, active = false, onClick }: any) => {
    if (collapsed) return null;
    return (
      <button 
        onClick={onClick}
        className={`w-full text-left pl-12 pr-4 py-2 text-sm transition-colors ${active ? 'text-blue-600 font-medium' : 'text-slate-500 hover:text-slate-900'}`}
      >
        {label}
      </button>
    );
  };
  return (
    <aside 
      className="bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0 hidden lg:flex"
      style={{ width }}
    >
      {/* Top Section: Logo */}
      <div className="p-6 mb-2 flex-shrink-0 flex justify-center">
        <div 
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity justify-center"
          onClick={() => onChangeView('LANDING')}
          title="Back to Landing Page"
        >
            <Logo showText={!collapsed} iconSize={collapsed ? 32 : 40} />
        </div>
      </div>

      {/* Middle Section: Navigation */}
      <nav className={`flex-1 overflow-y-auto hide-scrollbar ${collapsed ? 'px-2' : 'px-4'}`}>
        <div className="mb-6">
          <p className={`px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ${collapsed ? 'hidden' : ''}`}>{t.sidebar.mainMenu}</p>
          <MenuItem 
            icon={Home} 
            label={t.sidebar.home} 
            active={currentView === 'DASHBOARD'} 
            onClick={() => onChangeView('DASHBOARD')}
            collapsed={collapsed}
          />
          <MenuItem 
            icon={LineChart} 
            label={t.sidebar.market} 
            active={currentView === 'LISTING'} 
            onClick={() => onChangeView('LISTING')}
            collapsed={collapsed}
          />
          <MenuItem 
            icon={PieChart} 
            label={t.sidebar.portfolio} 
            active={currentView === 'PORTFOLIO'} 
            onClick={() => onChangeView('PORTFOLIO')}
            collapsed={collapsed}
          />
          

          <MenuItem 
            icon={GraduationCap} 
            label={t.sidebar.academy} 
            active={currentView === 'ACADEMY'}
            onClick={() => onChangeView('ACADEMY')}
            collapsed={collapsed}
          />

          {/* <MenuItem 
            icon={Users} 
            label="Community" 
            active={currentView === 'COMMUNITY'} 
            onClick={() => onChangeView('COMMUNITY')}
            collapsed={collapsed}
          /> */}
        </div>

        <div>
          <p className={`px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ${collapsed ? 'hidden' : ''}`}>{t.sidebar.support}</p>
          {/* <MenuItem 
            icon={Users} 
            label="Community" 
            active={currentView === 'COMMUNITY'}
            onClick={() => onChangeView('COMMUNITY')}
            collapsed={collapsed}
          /> */}
          <MenuItem 
            icon={Phone} 
            label={t.sidebar.helpSupport} 
            active={currentView === 'SUPPORT'}
            onClick={() => onChangeView('SUPPORT')}
            collapsed={collapsed}
          />
        </div>
      </nav>

      {/* Bottom Section: Settings */}
      <div className={`p-4 border-t border-slate-100 flex flex-col gap-2 ${collapsed ? 'items-center' : ''}`}>
        
        <button 
          onClick={onToggleSidebar}
          className={`w-full flex items-center ${collapsed ? 'justify-center px-0' : 'justify-start px-4'} py-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-slate-50 transition-all`}
          title={collapsed ? t.sidebar.expand : t.sidebar.collapse}
        >
            <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
                {collapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
                <span className={collapsed ? 'hidden' : 'inline'}>{t.sidebar.collapse}</span>
            </div>
        </button>

        <MenuItem 
          icon={Settings} 
          label={t.sidebar.settings} 
          active={currentView === 'SETTINGS'}
          onClick={() => onChangeView('SETTINGS')}
          collapsed={collapsed}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
