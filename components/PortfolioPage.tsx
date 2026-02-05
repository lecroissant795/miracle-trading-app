
import React from 'react';
import { Portfolio, Stock, Transaction, Pie as PieType } from '../types';
import Button from './Button';
import PortfolioView from './PortfolioView';
import Logo from './Logo';
import Footer from './Footer';
import { Lock } from 'lucide-react';

interface PortfolioPageProps {
  onNavigate: (view: any, category?: string) => void;
  onBypassAuth: () => void;
  portfolio: Portfolio;
  stocks: Stock[];
  transactions: Transaction[];
  pies: PieType[];
  selectedStock: Stock;
  aiTip: string;
  onViewHoldings: () => void;
  onSelectStock: (stock: Stock) => void;
  onSelectPie: (pie: PieType) => void;
  onCreatePie: () => void;
  onTradeStock: () => void;
  netWorth: number;
  investedValue: number;
  isLoggedIn: boolean;
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ 
  onNavigate,
  onBypassAuth,
  portfolio,
  stocks,
  transactions,
  pies,
  selectedStock,
  aiTip,
  onViewHoldings,
  onSelectStock,
  onSelectPie,
  onCreatePie,
  onTradeStock,
  netWorth,
  investedValue,
  isLoggedIn,
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
                <button onClick={() => onNavigate(isLoggedIn ? 'DASHBOARD' : 'MARKET_EXPLORER')} className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Market</button>
                <button onClick={() => onNavigate('PORTFOLIO')} className="text-sm font-semibold text-blue-600 transition-colors">Portfolio</button>
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
      <div className="flex-1 pt-20 flex flex-col">
          {isLoggedIn ? (
            // Authenticated: show full portfolio experience
            <PortfolioView 
               portfolio={portfolio}
               stocks={stocks}
               transactions={transactions}
               pies={pies}
               selectedStock={selectedStock}
               aiTip={aiTip}
               onViewHoldings={onViewHoldings}
               onSelectStock={onSelectStock}
               onSelectPie={onSelectPie}
               onCreatePie={onCreatePie}
               onTradeStock={onTradeStock}
               netWorth={netWorth}
               investedValue={investedValue}
            />
          ) : (
            // Logged out: prompt user to log in
            <div className="flex-1 flex items-center justify-center px-10 py-26 md:py-24 relative overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[120px] opacity-40"></div>
                  <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-emerald-100 rounded-full blur-[80px] opacity-40"></div>
              </div>

              <div className="max-w-md w-full bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl shadow-blue-900/5 rounded-3xl p-8 md:p-10 text-center relative z-10 animate-fade-in-up">
                <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center shadow-inner">
                  <Lock size={28} className="text-blue-600 drop-shadow-sm" />
                </div>
                
                <h1 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Portfolio Access</h1>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  Your portfolio is currently locked. Sign in to view your real-time holdings, performance metrics, and transaction history.
                </p>

                <div className="space-y-3 mb-6">
                  <Button 
                    onClick={() => onNavigate('AUTH', 'LOGIN')} 
                    className="w-full py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5"
                  >
                    Secure Log In
                  </Button>
                  <button 
                    onClick={() => onNavigate('AUTH', 'SIGNUP')} 
                    className="w-full py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all"
                  >
                    Create New Account
                  </button>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={onBypassAuth}
                    className="group flex items-center justify-center gap-2 w-full text-xs font-semibold text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    <span>View Demo Portfolio</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </button>
                </div>
              </div>
            </div>
          )}
      </div>

      <Footer onNavigate={onNavigate} isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default PortfolioPage;
