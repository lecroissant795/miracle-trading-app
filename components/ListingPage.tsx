
import React, { useEffect } from 'react';
import ListingView from './ListingView';
import Logo from './Logo';
import Footer from './Footer';
import Button from './Button';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '../services/LanguageContext';

interface ListingPageProps {
  onNavigate: (view: any, category?: string) => void;
  isLoggedIn?: boolean;
  onSelectStock: (symbol: string) => void;
}

const ListingPage: React.FC<ListingPageProps> = ({ onNavigate, isLoggedIn, onSelectStock }) => {
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      
      {/* Landing Style Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="cursor-pointer" onClick={() => onNavigate('LANDING')}>
                <Logo />
            </div>

            <div className="hidden md:flex items-center gap-8">
                <button onClick={() => onNavigate('LANDING')} className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">{t.nav.home}</button>
                <button onClick={() => onNavigate(isLoggedIn ? 'DASHBOARD' : 'MARKET_EXPLORER')} className="text-sm font-semibold text-blue-600 transition-colors">{t.nav.market}</button>
                <button onClick={() => onNavigate('PORTFOLIO')} className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">{t.nav.portfolio}</button>
                <button onClick={() => onNavigate('SUPPORT_PUBLIC')} className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">{t.nav.support}</button>
            </div>

             <div className="flex items-center gap-3">
                <LanguageSelector />
                {isLoggedIn ? (
                    <Button onClick={() => onNavigate('DASHBOARD')} className="px-6 py-2.5 rounded-full">
                        {t.nav.dashboard}
                    </Button>
                ) : (
                    <>
                        <button onClick={() => onNavigate('AUTH', 'SIGNUP')} className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors px-4 py-2">
                            {t.nav.signin}
                        </button>
                        <Button onClick={() => onNavigate('AUTH', 'LOGIN')} className="px-6 py-2.5 rounded-full">
                            {t.nav.login}
                        </Button>
                    </>
                )}
            </div>
        </div>
      </nav>

      {/* Main Content Wrapper */}
      <div className="flex-1 pt-20 flex flex-col">
          <ListingView onSelectStock={onSelectStock} />
      </div>

      <Footer onNavigate={onNavigate} isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default ListingPage;
