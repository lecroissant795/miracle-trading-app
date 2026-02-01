import React from 'react';
import Button from './Button';
import PieDetailView from './PieDetailView';
import Logo from './Logo';
import Footer from './Footer';
import { Pie as PieType, Stock } from '../types';

interface PieDetailPageProps {
  onNavigate: (view: any) => void;
  pie: PieType;
  stocks: Stock[];
  onBack: () => void;
  onInvest: () => void;
  onDelete: () => void;
}

const PieDetailPage: React.FC<PieDetailPageProps> = ({ 
  onNavigate, 
  pie,
  stocks,
  onBack,
  onInvest,
  onDelete
}) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      
      {/* Landing Style Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="cursor-pointer" onClick={() => onNavigate('LANDING')}>
                <Logo />
            </div>

            <div className="hidden md:flex items-center gap-8">
                <button onClick={() => onNavigate('LANDING')} className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Home</button>
                <button onClick={() => onNavigate('DASHBOARD')} className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Market</button>
                <button onClick={() => onNavigate('PORTFOLIO')} className="text-sm font-semibold text-blue-600 transition-colors">Portfolio</button>
                <button onClick={() => onNavigate('SUPPORT')} className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Support</button>
            </div>

            <div className="flex items-center gap-4">
                <Button onClick={() => onNavigate('DASHBOARD')} className="px-6 py-2.5 rounded-full">
                    Go to Dashboard
                </Button>
            </div>
        </div>
      </nav>

      {/* Main Content Wrapper */}
      <div className="flex-1 pt-20 flex flex-col">
          <PieDetailView 
             pie={pie} 
             stocks={stocks}
             onBack={onBack} 
             onInvest={onInvest}
             onDelete={onDelete}
          />
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default PieDetailPage;
