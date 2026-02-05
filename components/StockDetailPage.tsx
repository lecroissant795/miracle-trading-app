
import React from 'react';
import StockDetailView from './StockDetailView';
import Logo from './Logo';
import Footer from './Footer';
import Button from './Button';
import { Stock } from '../types';

interface StockDetailPageProps {
  onNavigate: (view: any, category?: string) => void;
  isLoggedIn?: boolean;
  stock: Stock;
  onBack: () => void;
  onInvest: (side?: 'BUY' | 'SELL') => void;
}

const StockDetailPage: React.FC<StockDetailPageProps> = ({ onNavigate, isLoggedIn, stock, onBack, onInvest }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      
      {/* Landing Style Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="cursor-pointer" onClick={() => onNavigate('LANDING')}>
                <Logo />
            </div>

            <div className="hidden md:flex items-center gap-8">
                <button onClick={() => onNavigate('LANDING')} className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Home</button>
                <button onClick={() => onNavigate(isLoggedIn ? 'DASHBOARD' : 'MARKET_EXPLORER')} className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Market</button>
                <button onClick={() => onNavigate('PORTFOLIO')} className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Portfolio</button>
                <button onClick={() => onNavigate('SUPPORT_PUBLIC')} className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Support</button>
            </div>

             <div className="flex items-center gap-3">
                {isLoggedIn ? (
                    <Button onClick={() => onNavigate('DASHBOARD')} className="px-6 py-2.5 rounded-full">
                        Go to Dashboard
                    </Button>
                ) : (
                    <>
                        <button onClick={() => onNavigate('AUTH', 'SIGNUP')} className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors px-4 py-2">
                            Sign in
                        </button>
                        <Button onClick={() => onNavigate('AUTH', 'LOGIN')} className="px-6 py-2.5 rounded-full">
                            Log in
                        </Button>
                    </>
                )}
            </div>
        </div>
      </nav>

      {/* Main Content Wrapper */}
      <div className="flex-1 pt-20 flex flex-col items-center">
        <div className="w-full h-full max-w-7xl mx-auto transform scale-[0.85] origin-top">
             <StockDetailView 
                stock={stock}
                onBack={onBack}
                onInvest={onInvest}
             />
        </div>
      </div>

      <Footer onNavigate={onNavigate} isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default StockDetailPage;
