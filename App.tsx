
import React, { useState, useEffect } from 'react';
import { MoreHorizontal, ChevronRight, BrainCircuit, PieChart as PieChartIcon, History, Plus } from 'lucide-react';
import { Stock, Portfolio, StockDetails, Transaction, Pie as PieType, ViewState } from './types';
import Button from './components/Button';
import StockChart from './components/StockChart';
import TradeModal from './components/TradeModal';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PortfolioPieChart from './components/PortfolioPieChart';
import TransactionHistory from './components/TransactionHistory';
import CreatePieModal from './components/CreatePieModal';
import StockDetailView from './components/StockDetailView';
import WalletsView from './components/WalletsView';
import HoldingsView from './components/HoldingsView';
import AcademyView from './components/AcademyView';
import SettingsView from './components/SettingsView';
import PieDetailPage from './components/PieDetailPage';
import SupportView from './components/SupportView';// import CommunityView from './components/CommunityView';
import DashboardView from './components/DashboardView';
import MarketPageLoader from './components/MarketPageLoader';
import PortfolioPageLoader from './components/PortfolioPageLoader';
import PortfolioView from './components/PortfolioView';
import ListingPage from './components/ListingPage';
import StockDetailPage from './components/StockDetailPage';
import ListingView from './components/ListingView';
import LandingPage from './components/LandingPage';
import PortfolioPage from './components/PortfolioPage';
import SupportPage from './components/SupportPage';
import AuthPage from './components/AuthPage';
import VerificationModal from './components/VerificationModal';
import { getPortfolioAdvice } from './services/geminiService';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { LanguageProvider } from './services/LanguageContext';

// --- Mock Data ---
const MOCK_DETAILS: StockDetails = {
  previousClose: 4566.48,
  dayRangeLow: 4533.94,
  dayRangeHigh: 4598.53,
  yearRangeLow: 3233.94,
  yearRangeHigh: 4598.53,
  marketCap: 40.3, // Trillion USD for generic index example or similar
  volume: 2924736,
  dividendYield: 1.43,
  peRatio: 31.08,
};

const CHART_DATA_GEN = (volatility = 5) => Array.from({ length: 30 }, (_, i) => ({
  name: `Day ${i + 1}`,
  value: 4300 + Math.random() * 300 * (i / 30) + Math.sin(i / 2) * volatility * 10
}));

const MOCK_STOCKS: Stock[] = [
  // Indices
  { 
    symbol: 'SPX', name: 'S&P 500', price: 4566.48, change: 74.96, changePercent: 1.66, type: 'Index',
    description: "The S&P 500 tracks the stock performance of 500 of the largest companies listed on stock exchanges in the United States.",
    details: MOCK_DETAILS, chartData: CHART_DATA_GEN(2)
  },
  {
      symbol: 'NDX', name: 'Nasdaq-100', price: 15987.30, change: 150.20, changePercent: 0.95, type: 'Index',
      description: "The Nasdaq-100 is a stock market index made up of 100 of the largest non-financial companies listed on the Nasdaq stock exchange.",
      details: { ...MOCK_DETAILS, marketCap: 18.5 }, chartData: CHART_DATA_GEN(6)
  },
  {
      symbol: 'DJI', name: 'Dow Jones Industrial Average', price: 34500.20, change: -120.50, changePercent: -0.35, type: 'Index',
      description: "The Dow Jones Industrial Average is a stock market index of 30 prominent companies listed on stock exchanges in the United States.",
      details: { ...MOCK_DETAILS, marketCap: 10.2 }, chartData: CHART_DATA_GEN(3)
  },

  // Stocks
  { 
    symbol: 'AAPL', name: 'Apple, Inc', price: 173.50, change: 2.30, changePercent: 0.66, type: 'Stock',
    description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
    details: { ...MOCK_DETAILS, marketCap: 2.7, peRatio: 28.5 }, chartData: CHART_DATA_GEN(5)
  },
  { 
    symbol: 'MSFT', name: 'Microsoft', price: 410.20, change: -1.50, changePercent: -0.36, type: 'Stock',
    description: "Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide.",
    details: { ...MOCK_DETAILS, marketCap: 3.1, peRatio: 36.2 }, chartData: CHART_DATA_GEN(4)
  },
  {
      symbol: 'NVDA', name: 'NVIDIA Corp', price: 188.03, change: -2.30, changePercent: -1.2, type: 'Stock',
      description: "NVIDIA Corporation provides graphics, and compute and networking solutions worldwide.",
      details: { ...MOCK_DETAILS, marketCap: 1.8 }, chartData: CHART_DATA_GEN(8)
  },
  {
      symbol: 'GOOGL', name: 'Alphabet Inc', price: 140.20, change: 1.10, changePercent: 0.8, type: 'Stock',
      description: "Alphabet Inc. offers various products and platforms in the United States and internationally.",
      details: { ...MOCK_DETAILS, marketCap: 1.5 }, chartData: CHART_DATA_GEN(4)
  },
  {
      symbol: 'TSLA', name: 'Tesla, Inc.', price: 215.99, change: 15.40, changePercent: 7.6, type: 'Stock',
      description: "Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems.",
      details: { ...MOCK_DETAILS, marketCap: 0.7 }, chartData: CHART_DATA_GEN(12)
  },
  {
      symbol: 'QQQ', name: 'Invesco QQQ Trust', price: 390.45, change: 3.20, changePercent: 0.82, type: 'Stock',
      description: "The Invesco QQQ Trust is an exchange-traded fund that tracks the Nasdaq-100 Index.",
      details: { ...MOCK_DETAILS, marketCap: 0.2 }, chartData: CHART_DATA_GEN(5)
  },

  // Funds
  {
      symbol: 'VTSAX', name: 'Vanguard Total Stock Market', price: 120.45, change: 0.85, changePercent: 0.71, type: 'Fund',
      description: "Vanguard Total Stock Market Index Fund tracks the performance of the CRSP US Total Market Index.",
      details: { ...MOCK_DETAILS, marketCap: 1.3 }, chartData: CHART_DATA_GEN(3)
  },
  {
      symbol: 'FXAIX', name: 'Fidelity 500 Index Fund', price: 165.20, change: 1.10, changePercent: 0.67, type: 'Fund',
      description: "Fidelity 500 Index Fund seeks to provide investment results that correspond to the total return of common stocks.",
      details: { ...MOCK_DETAILS, marketCap: 0.4 }, chartData: CHART_DATA_GEN(2)
  },
  {
      symbol: 'SWPPX', name: 'Schwab S&P 500 Index Fund', price: 75.30, change: 0.40, changePercent: 0.53, type: 'Fund',
      description: "The fund's goal is to track the total return of the S&P 500® Index.",
      details: { ...MOCK_DETAILS, marketCap: 0.6 }, chartData: CHART_DATA_GEN(2)
  },

  // Crypto
  { 
    symbol: 'BTC', name: 'Bitcoin', price: 64230.10, change: 1200.50, changePercent: 2.10, type: 'Crypto',
    description: "Bitcoin is a decentralized digital currency, without a central bank or single administrator.",
    details: { ...MOCK_DETAILS, marketCap: 1.2, peRatio: 0 }, chartData: CHART_DATA_GEN(10)
  },
  {
      symbol: 'ETH', name: 'Ethereum', price: 3450.00, change: 120.00, changePercent: 3.6, type: 'Crypto',
      description: "Ethereum is a decentralized, open-source blockchain with smart contract functionality.",
      details: { ...MOCK_DETAILS, marketCap: 0.4 }, chartData: CHART_DATA_GEN(11)
  },

  // Currency
  {
      symbol: 'EUR/USD', name: 'Euro / US Dollar', price: 1.0845, change: -0.002, changePercent: -0.18, type: 'Currency',
      description: "The euro to US dollar exchange rate.",
      details: { ...MOCK_DETAILS, marketCap: 0 }, chartData: CHART_DATA_GEN(1)
  },
  {
      symbol: 'GBP/USD', name: 'British Pound / US Dollar', price: 1.2630, change: 0.005, changePercent: 0.40, type: 'Currency',
      description: "The British pound sterling to US dollar exchange rate.",
      details: { ...MOCK_DETAILS, marketCap: 0 }, chartData: CHART_DATA_GEN(2)
  },
  {
      symbol: 'USD/JPY', name: 'US Dollar / Japanese Yen', price: 150.40, change: 0.80, changePercent: 0.53, type: 'Currency',
      description: "The US dollar to Japanese yen exchange rate.",
      details: { ...MOCK_DETAILS, marketCap: 0 }, chartData: CHART_DATA_GEN(2)
  }
];

const INITIAL_PORTFOLIO: Portfolio = {
  cashBalance: 15215.70,
  holdings: [
    { symbol: 'AAPL', quantity: 25, avgPrice: 150.00 },
    { symbol: 'MSFT', quantity: 10, avgPrice: 380.00 },
    { symbol: 'SPX', quantity: 1, avgPrice: 4200.00 },
    { symbol: 'BTC', quantity: 0.1, avgPrice: 50000.00 },
  ]
};

const MOCK_TRANSACTIONS: Transaction[] = [
    { id: '1', type: 'BUY', symbol: 'AAPL', quantity: 25, price: 150.00, date: new Date('2023-10-01T10:00:00') },
    { id: '2', type: 'BUY', symbol: 'MSFT', quantity: 10, price: 380.00, date: new Date('2023-10-05T14:30:00') },
    { id: '3', type: 'BUY', symbol: 'SPX', quantity: 1, price: 4200.00, date: new Date('2023-10-15T09:15:00') },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#6366f1', '#ec4899', '#8b5cf6'];

const MAX_SIDEBAR_WIDTH = 256;
const MIN_SIDEBAR_WIDTH = 80;
const COLLAPSED_SIDEBAR_WIDTH = 96;

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

const AppContent: React.FC = () => {
  const [view, setView] = useState<ViewState>('LANDING');
  const [authMode, setAuthMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState<boolean>(false);
  const [explorerCategory, setExplorerCategory] = useState<string>('All');
  const [portfolio, setPortfolio] = useState<Portfolio>(INITIAL_PORTFOLIO);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [selectedStock, setSelectedStock] = useState<Stock>(MOCK_STOCKS[0]);
  const [selectedPie, setSelectedPie] = useState<PieType | null>(null);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [tradeModalSide, setTradeModalSide] = useState<'BUY' | 'SELL'>('BUY');
  const [isPieModalOpen, setIsPieModalOpen] = useState(false);
  const [pies, setPies] = useState<PieType[]>([]);
  const [aiTip, setAiTip] = useState<string>('');
  const [timeRange, setTimeRange] = useState<string>('1d');
  const [sidebarWidth, setSidebarWidth] = useState<number>(MAX_SIDEBAR_WIDTH);
  const [isResizingSidebar, setIsResizingSidebar] = useState<boolean>(false);
  const [isMarketLoading, setIsMarketLoading] = useState(false);
  const [isPortfolioLoading, setIsPortfolioLoading] = useState(false);

  // Show seamless loader when navigating to Market (DASHBOARD) page
  useEffect(() => {
    if (view === 'DASHBOARD') {
      setIsMarketLoading(true);
      const t = setTimeout(() => setIsMarketLoading(false), 700);
      return () => clearTimeout(t);
    } else {
      setIsMarketLoading(false);
    }
  }, [view]);

  // Show seamless loader when navigating to Portfolio page
  useEffect(() => {
    if (view === 'PORTFOLIO') {
      setIsPortfolioLoading(true);
      const t = setTimeout(() => setIsPortfolioLoading(false), 700);
      return () => clearTimeout(t);
    } else {
      setIsPortfolioLoading(false);
    }
  }, [view]);

  // Helper to find stock data for a holding
  const getStockData = (symbol: string) => MOCK_STOCKS.find(s => s.symbol === symbol) || MOCK_STOCKS[0];

  // Calculate Net Worth
  const investedValue = portfolio.holdings.reduce((acc, h) => acc + (h.quantity * (getStockData(h.symbol).price || 0)), 0);
  const netWorth = portfolio.cashBalance + investedValue;

  useEffect(() => {
    // Basic AI tip on load
    const summary = portfolio.holdings.map(h => ({ symbol: h.symbol, value: h.quantity * 100 })); // Simplified
    getPortfolioAdvice(summary, portfolio.cashBalance).then(setAiTip);
  }, []);

  const handleStockClick = (symbol: string) => {
    const found = MOCK_STOCKS.find(s => s.symbol === symbol);
    if (found) {
        setSelectedStock(found);
        setView('STOCK_DETAILS');
    }
  };

  const handlePieClick = (pie: PieType) => {
      setSelectedPie(pie);
      setView('PIE_DETAILS');
  };

  const handleNavigation = (newView: any, category?: string) => {
      setView(newView);
      if (newView === 'AUTH' && category) {
          setAuthMode(category as 'LOGIN' | 'SIGNUP');
      } else if (category) {
          setExplorerCategory(category);
      }
  };

  const handleOpenTradeModal = (side?: 'BUY' | 'SELL') => {
    if (side) setTradeModalSide(side);
    if (!isVerified) {
        setIsVerificationModalOpen(true);
    } else {
        setIsTradeModalOpen(true);
    }
  };

  const handleTrade = (type: 'BUY' | 'SELL', quantity: number) => {
    if (!isVerified) {
        setIsVerificationModalOpen(true);
        return;
    }
    // Legacy support for modal trade which uses state 'selectedStock'
    executeTrade(type, selectedStock, quantity);
    setIsTradeModalOpen(false);
  };

  const executeTrade = (type: 'BUY' | 'SELL', stock: Stock, quantity: number) => {
    setPortfolio(prev => {
       const cost = quantity * stock.price;
       let newHoldings = [...prev.holdings];
       let newCash = prev.cashBalance;

       if (type === 'BUY') {
         newCash -= cost;
         const existing = newHoldings.find(h => h.symbol === stock.symbol);
         if (existing) {
             existing.quantity += quantity;
         } else {
             newHoldings.push({ symbol: stock.symbol, quantity, avgPrice: stock.price });
         }
       } else {
           newCash += cost;
           const existing = newHoldings.find(h => h.symbol === stock.symbol);
           if (existing) {
               existing.quantity -= quantity;
               if (existing.quantity <= 0) {
                   newHoldings = newHoldings.filter(h => h.symbol !== stock.symbol);
               }
           }
       }
       return { ...prev, cashBalance: newCash, holdings: newHoldings }; 
    });

    const newTransaction: Transaction = {
        id: Math.random().toString(36).substr(2, 9),
        type,
        symbol: stock.symbol,
        quantity,
        price: stock.price,
        date: new Date()
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleVerificationCompleted = () => {
      setIsVerified(true);
      setIsVerificationModalOpen(false);
      // Optional: Open trade modal automatically after verification?
      // setIsTradeModalOpen(true);
  };

  const handleDeposit = (amount: number) => {
      setPortfolio(prev => ({
          ...prev,
          cashBalance: prev.cashBalance + amount
      }));
  };

  const handleWithdraw = (amount: number) => {
      setPortfolio(prev => ({
          ...prev,
          cashBalance: Math.max(0, prev.cashBalance - amount)
      }));
  };

  const handleCreatePie = (newPie: PieType, initialDeposit: number) => {
      setPies(prev => [...prev, newPie]);
      // Deduct from cash
      setPortfolio(prev => ({
          ...prev,
          cashBalance: prev.cashBalance - initialDeposit
      }));
  };

  // Sidebar resizing handlers
  const handleSidebarMouseDown = () => {
    setIsResizingSidebar(true);
  };

  useEffect(() => {
    if (!isResizingSidebar) return;

    const handleMouseMove = (event: MouseEvent) => {
      const newWidth = Math.min(
        Math.max(event.clientX, MIN_SIDEBAR_WIDTH),
        MAX_SIDEBAR_WIDTH
      );
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizingSidebar(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizingSidebar]);

  const handleDeletePie = (pieId: string, value: number) => {
    // Return value to cash balance
    setPortfolio(prev => ({
        ...prev,
        cashBalance: prev.cashBalance + value
    }));
    // Remove pie from list
    setPies(prev => prev.filter(p => p.id !== pieId));
    // Reset view
    setSelectedPie(null);
    setView('DASHBOARD');
  };

  // --- Render Logic ---
  const getHeaderTitle = () => {
    switch (view) {
      case 'DASHBOARD': return 'Market';
      case 'PORTFOLIO': return 'Portfolio';
      case 'STOCK_DETAILS': return selectedStock.symbol;
      case 'EXCHANGE': return 'Exchange';
      case 'MARKET_EXPLORER': return 'Market Explorer';
      case 'WALLETS': return 'Wallets';
      case 'HOLDINGS': return 'Holdings';
      case 'ACADEMY': return 'Academy';
      case 'SUPPORT': return 'Help & Support';
      case 'SETTINGS': return 'Settings';
      case 'PIE_DETAILS': return selectedPie?.name || 'Pie Details';
      case 'ANALYTICS': return 'Analytics';
      case 'COMMUNITY': return 'Community';
      case 'LISTING': return 'Listing';
      default: return 'Miracle';
    }
  };

  if (view === 'LANDING') {
      return <LandingPage onNavigate={handleNavigation} isLoggedIn={isLoggedIn} />;
  }

  if (view === 'AUTH') {
      return (
          <AuthPage 
            onLogin={() => {
              setIsLoggedIn(true);
              setView('DASHBOARD');
            }}
            startView={authMode}
          />
      );
  }

  if (view === 'PORTFOLIO') {
      if (isPortfolioLoading) {
        return <PortfolioPageLoader />;
      }
      return (
        <>
            <div className="animate-market-in">
            <PortfolioPage 
                onNavigate={handleNavigation}
                onBypassAuth={() => setIsLoggedIn(true)}
                portfolio={portfolio}
                isLoggedIn={isLoggedIn}
                  stocks={MOCK_STOCKS}
                  transactions={transactions}
                  pies={pies}
                  selectedStock={selectedStock}
                  aiTip={aiTip}
                  onViewHoldings={() => setView('HOLDINGS')}
                  onSelectStock={(stock) => {
                      setSelectedStock(stock);
                      setView('STOCK_DETAILS');
                  }}
                  onSelectPie={handlePieClick}
                  onCreatePie={() => setIsPieModalOpen(true)}
                  onTradeStock={() => handleOpenTradeModal()} 
                  netWorth={netWorth}
                  investedValue={investedValue}
              />
            </div>
            <CreatePieModal 
                isOpen={isPieModalOpen}
                onClose={() => setIsPieModalOpen(false)}
                availableStocks={MOCK_STOCKS}
                onCreatePie={handleCreatePie}
            />
            {isVerificationModalOpen && (
                <VerificationModal 
                    isOpen={isVerificationModalOpen} 
                    onClose={() => setIsVerificationModalOpen(false)}
                    onCompleted={handleVerificationCompleted}
                />
            )}
        </>
      );
  }

  if (view === 'MARKET_EXPLORER') {
    return (
        <ListingPage 
            onNavigate={handleNavigation}
            isLoggedIn={isLoggedIn}
            onSelectStock={(symbol) => {
                const stock = getStockData(symbol);
                if (stock) {
                    setSelectedStock(stock);
                    setView('STOCK_DETAILS_PUBLIC');
                }
            }}
        />
    );
  }

  if (view === 'STOCK_DETAILS_PUBLIC') {
      return (
          <StockDetailPage 
            onNavigate={handleNavigation}
            isLoggedIn={isLoggedIn}
            stock={selectedStock}
            onBack={() => setView('MARKET_EXPLORER')}
            onInvest={() => setView('AUTH')}
          />
      );
  }

  if (view === 'SUPPORT_PUBLIC') {
      return (
          <SupportPage 
            onNavigate={handleNavigation}
            isLoggedIn={isLoggedIn}
            netWorth={netWorth}
          />
      );
  }  if (view === 'PIE_DETAILS' && selectedPie) {
    return (
        <PieDetailPage 
           onNavigate={handleNavigation}
           isLoggedIn={isLoggedIn}
           pie={selectedPie} 
           stocks={MOCK_STOCKS}
           onBack={() => setView('PORTFOLIO')} 
           onInvest={() => {
               // Simple mock invest action
               setIsPieModalOpen(true);
           }}
           onDelete={() => handleDeletePie(selectedPie.id, selectedPie.value)}
        />
    );
}

  const handleToggleSidebar = () => {
    if (sidebarWidth > COLLAPSED_SIDEBAR_WIDTH) {
      setSidebarWidth(MIN_SIDEBAR_WIDTH);
    } else {
      setSidebarWidth(MAX_SIDEBAR_WIDTH);
    }
  };

  // App Shell (Sidebar + Main) for all other views
  return (
    <div className="min-h-screen flex bg-slate-50 font-sans text-slate-900 overflow-hidden">
      
      <Sidebar 
        currentView={view} 
        currentCategory={explorerCategory}
        onChangeView={handleNavigation} 
        width={sidebarWidth}
        collapsed={sidebarWidth <= COLLAPSED_SIDEBAR_WIDTH}
        onToggleSidebar={handleToggleSidebar}
      />

      {/* Sidebar resize handle */}
      <div
        onMouseDown={handleSidebarMouseDown}
        className={`hidden lg:block h-screen w-1 cursor-col-resize bg-slate-100 hover:bg-slate-200 ${
          isResizingSidebar ? 'bg-slate-300' : ''
        }`}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Pass calculated net worth and cash balance to Header */}
        <Header 
          title={getHeaderTitle()}
          totalBalance={netWorth} 
          cashBalance={portfolio.cashBalance} 
          dailyChange={2.4} 
          onViewAnalytics={() => setView('ANALYTICS')}
          onSettingsClick={() => setView('SETTINGS')}
          onLogout={() => {
            setIsLoggedIn(false);
            setView('LANDING');
          }}
        />
        
        {view === 'STOCK_DETAILS' ? (
            <StockDetailView 
                stock={selectedStock}
                onBack={() => setView('DASHBOARD')}
                onInvest={handleOpenTradeModal}
            />
        ) : view === 'HOLDINGS' ? (
             <HoldingsView
                portfolio={portfolio}
                stocks={MOCK_STOCKS}
                onBack={() => setView('DASHBOARD')}
                onSelectStock={(stock) => {
                    setSelectedStock(stock);
                    setView('STOCK_DETAILS');
                }}
             />
        ) : view === 'ACADEMY' ? (
             <AcademyView />
        ) : view === 'SUPPORT' ? (
             <SupportView />
        ) : view === 'SETTINGS' ? (
             <SettingsView 
                portfolio={portfolio}
                onDeposit={handleDeposit}
                onWithdraw={handleWithdraw}
             />
        ) : view === 'ANALYTICS' ? (
             <AnalyticsView 
                portfolio={portfolio}
                stocks={MOCK_STOCKS}
             />
        ) : view === 'LISTING' ? (
             <ListingView onSelectStock={handleStockClick} />
        ) : view === 'DASHBOARD' && isMarketLoading ? (
             <MarketPageLoader />
        ) : view === 'DASHBOARD' ? (
             <div className="flex-1 overflow-hidden animate-market-in">
               <DashboardView 
                  stocks={MOCK_STOCKS} 
                  onSelectStock={(stock) => {
                      setSelectedStock(stock);
                      setView('STOCK_DETAILS');
                  }}
                  onBack={() => setView('LANDING')} 
               />
             </div>
        ) : (
             <DashboardView 
                stocks={MOCK_STOCKS} 
                onSelectStock={(stock) => {
                    setSelectedStock(stock);
                    setView('STOCK_DETAILS');
                }}
                onBack={() => setView('LANDING')} 
             />
        )}
      </main>

      <TradeModal 
        stock={selectedStock} 
        isOpen={isTradeModalOpen} 
        onClose={() => setIsTradeModalOpen(false)} 
        onTrade={handleTrade}
        portfolio={portfolio}
        initialSide={tradeModalSide}
      />

      <CreatePieModal 
        isOpen={isPieModalOpen}
        onClose={() => setIsPieModalOpen(false)}
        availableStocks={MOCK_STOCKS}
        onCreatePie={handleCreatePie}
      />
        {isVerificationModalOpen && (
            <VerificationModal 
                isOpen={isVerificationModalOpen} 
                onClose={() => setIsVerificationModalOpen(false)}
                onCompleted={handleVerificationCompleted}
            />
        )}
    </div>
  );
};

export default App;
