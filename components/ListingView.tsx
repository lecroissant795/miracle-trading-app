
import React, { useState } from 'react';
import { Info, ChevronRight, Search, Filter, Globe, BarChart3, Layers, Zap, Shield, Sparkles, Flame, Heart, ShoppingBag, TrendingDown, Flag, Plus, Star } from 'lucide-react';
import { useTranslation } from '../services/LanguageContext';

// --- Types & Data ---

type CategoryItem = { id: string; name: string; icon: React.ReactNode };

type CategoryGroup = {
  title: string;
  items: CategoryItem[];
};

const SIDEBAR_GROUPS: CategoryGroup[] = [
  {
    title: "Users' choice",
    items: [
      { id: 'most_traded', name: 'Most traded', icon: <Flame size={16} className="text-orange-500" /> },
      { id: 'most_owned', name: 'Most owned', icon: <Heart size={16} className="text-rose-500" /> },
      { id: 'most_bought', name: 'Most bought', icon: <ShoppingBag size={16} className="text-emerald-500" /> },
      { id: 'most_sold', name: 'Most sold', icon: <TrendingDown size={16} className="text-red-500" /> },
    ]
  },
  {
    title: "Thematic",
    items: [
      { id: 'big_tech', name: 'Big tech', icon: <Zap size={16} className="text-yellow-500" /> },
      { id: 'ai', name: 'AI', icon: <Sparkles size={16} className="text-purple-500" /> },
      { id: 'cybersecurity', name: 'Cybersecurity', icon: <Shield size={16} className="text-blue-500" /> },
      { id: 'ev', name: 'EVs', icon: <Zap size={16} className="text-lime-500" /> },
    ]
  },
  {
    title: "Asset Class",
    items: [
      { id: 'stocks', name: 'Stocks', icon: <BarChart3 size={16} className="text-slate-400" /> },
      { id: 'etfs', name: 'ETFs', icon: <Layers size={16} className="text-slate-400" /> },
      { id: 'crypto', name: 'Crypto', icon: <Globe size={16} className="text-slate-400" /> },
    ]
  },
  {
    title: "Regions",
    items: [
      { id: 'us', name: 'US greats', icon: <Flag size={16} className="text-blue-600" /> },
      { id: 'uk', name: 'UK gems', icon: <Flag size={16} className="text-red-600" /> },
      { id: 'eu', name: 'EU leaders', icon: <Flag size={16} className="text-blue-400" /> },
    ]
  }
];

const LISTING_DATA = [
    // Big Tech / US Greats
    { tags: ['big_tech', 'us', 'most_traded', 'most_owned', 'stocks'], symbol: 'AAPL', name: 'Apple Inc.', currency: 'USD', isin: 'US0378331005', type: 'Stock', exchange: 'NASDAQ', spread: '0.05', interest: '0.00%', change: 1.25, logo: '🍎' },
    { tags: ['big_tech', 'us', 'most_traded', 'stocks'], symbol: 'MSFT', name: 'Microsoft Corp.', currency: 'USD', isin: 'US5949181045', type: 'Stock', exchange: 'NASDAQ', spread: '0.08', interest: '0.00%', change: -0.45, logo: '💻' },
    { tags: ['big_tech', 'us', 'stocks'], symbol: 'GOOGL', name: 'Alphabet Inc.', currency: 'USD', isin: 'US02079K3059', type: 'Stock', exchange: 'NASDAQ', spread: '0.06', interest: '0.00%', change: 0.88, logo: '🔍' },
    { tags: ['big_tech', 'us', 'most_bought', 'ev', 'stocks'], symbol: 'TSLA', name: 'Tesla, Inc.', currency: 'USD', isin: 'US88160R1014', type: 'Stock', exchange: 'NASDAQ', spread: '0.12', interest: '0.00%', change: 3.42, logo: '⚡' },
    
    // AI
    { tags: ['ai', 'big_tech', 'us', 'most_traded', 'stocks'], symbol: 'NVDA', name: 'NVIDIA Corp.', currency: 'USD', isin: 'US67066G1040', type: 'Stock', exchange: 'NASDAQ', spread: '0.15', interest: '0.00%', change: 2.15, logo: '🎮' },
    { tags: ['ai', 'us', 'stocks'], symbol: 'AMD', name: 'Advanced Micro Devices', currency: 'USD', isin: 'US0079031078', type: 'Stock', exchange: 'NASDAQ', spread: '0.05', interest: '0.00%', change: -1.20, logo: '💾' },
    { tags: ['ai', 'us', 'stocks'], symbol: 'PLTR', name: 'Palantir Technologies', currency: 'USD', isin: 'US69608A1088', type: 'Stock', exchange: 'NYSE', spread: '0.02', interest: '0.00%', change: 4.50, logo: '🔮' },

    // Cybersecurity
    { tags: ['cybersecurity', 'us', 'stocks'], symbol: 'PANW', name: 'Palo Alto Networks', currency: 'USD', isin: 'US6974351057', type: 'Stock', exchange: 'NASDAQ', spread: '0.18', interest: '0.00%', change: 0.35, logo: '🔒' },
    { tags: ['cybersecurity', 'us', 'stocks'], symbol: 'CRWD', name: 'CrowdStrike Holdings', currency: 'USD', isin: 'US22788C1053', type: 'Stock', exchange: 'NASDAQ', spread: '0.14', interest: '0.00%', change: -0.90, logo: '🦅' },

    // ETFs
    { tags: ['etfs', 'most_owned', 'us'], symbol: 'VUSA', name: 'Vanguard S&P 500', currency: 'GBP', isin: 'IE00B3XXRP09', type: 'ETF', exchange: 'LSE', spread: '0.02', interest: 'N/A', change: 0.45, logo: '📊' },
    { tags: ['etfs', 'most_bought', 'us'], symbol: 'QQQ', name: 'Invesco QQQ Trust', currency: 'USD', isin: 'US46090E1038', type: 'ETF', exchange: 'NASDAQ', spread: '0.03', interest: 'N/A', change: 0.72, logo: '📈' },
    { tags: ['etfs', 'eu'], symbol: 'EFA', name: 'iShares MSCI EAFE', currency: 'USD', isin: 'US4642874659', type: 'ETF', exchange: 'NYSE', spread: '0.04', interest: 'N/A', change: -0.15, logo: '🌍' },

    // UK Gems
    { tags: ['uk', 'stocks'], symbol: 'RR.', name: 'Rolls-Royce Holdings', currency: 'GBP', isin: 'GB00B63H8491', type: 'Stock', exchange: 'LSE', spread: '0.20', interest: '0.00%', change: 1.80, logo: '✈️' },
    { tags: ['uk', 'stocks'], symbol: 'BARC', name: 'Barclays plc', currency: 'GBP', isin: 'GB0031348658', type: 'Stock', exchange: 'LSE', spread: '0.05', interest: '0.00%', change: 0.25, logo: '🏦' },

    // Crypto
    { tags: ['crypto', 'most_traded'], symbol: 'BTC', name: 'Bitcoin', currency: 'USD', isin: 'N/A', type: 'Crypto', exchange: 'BINANCE', spread: '12.50', interest: '-0.035%', change: 5.60, logo: '₿' },
    { tags: ['crypto'], symbol: 'ETH', name: 'Ethereum', currency: 'USD', isin: 'N/A', type: 'Crypto', exchange: 'BINANCE', spread: '1.20', interest: '-0.042%', change: 3.20, logo: 'Ξ' },
];

interface ListingViewProps {
    onSelectStock: (symbol: string) => void;
}

const ListingView: React.FC<ListingViewProps> = ({ onSelectStock }) => {
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] = useState('most_traded');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = LISTING_DATA.filter(item => {
        const matchesCategory = item.tags.includes(activeCategory);
        const matchesSearch = item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="flex bg-white h-full animate-fade-in overflow-hidden">
            
            {/* --- Sidebar --- */}
            <div className="w-64 border-r border-slate-100 flex flex-col bg-slate-50/30 overflow-y-auto">
                <div className="p-6">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                         <Search size={20} className="text-blue-600" />
                         {t.market.browse}
                    </h2>
                </div>

                <div className="flex-1 px-4 space-y-6 pb-8">
                    {SIDEBAR_GROUPS.map((group, idx) => (
                        <div key={idx}>
                            <h3 className="px-3 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                {idx === 0 ? t.market.categories.usersChoice : 
                                 idx === 1 ? t.market.categories.thematic : 
                                 idx === 2 ? t.market.categories.assetClass : 
                                 t.market.categories.regions}
                            </h3>
                            <div className="space-y-0.5">
                                {group.items.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveCategory(item.id)}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                            activeCategory === item.id 
                                            ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100' 
                                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                        }`}
                                    >
                                        <div className={`transition-transform ${activeCategory === item.id ? 'scale-110' : ''}`}>
                                            {item.icon}
                                        </div>
                                        {item.id === 'most_traded' ? t.market.categories.mostTraded :
                                         item.id === 'most_owned' ? t.market.categories.mostOwned :
                                         item.id === 'most_bought' ? t.market.categories.mostBought :
                                         item.id === 'most_sold' ? t.market.categories.mostSold :
                                         item.id === 'big_tech' ? t.market.categories.bigTech :
                                         item.id === 'ai' ? t.market.categories.ai :
                                         item.id === 'cybersecurity' ? t.market.categories.cybersecurity :
                                         item.id === 'ev' ? t.market.categories.evs :
                                         item.id === 'stocks' ? t.market.categories.stocks :
                                         item.id === 'etfs' ? t.market.categories.etfs :
                                         item.id === 'crypto' ? t.market.categories.crypto :
                                         item.id === 'us' ? t.market.categories.usGreats :
                                         item.id === 'uk' ? t.market.categories.ukGems :
                                         item.id === 'eu' ? t.market.categories.euLeaders :
                                         item.name}
                                        {activeCategory === item.id && <ChevronRight size={14} className="ml-auto text-blue-400" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Main Content --- */}
            <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
                {/* Header */}
                <div className="px-8 py-6 border-b border-slate-100 bg-white z-10">
                    <div className="max-w-5xl mx-auto w-full">
                        <div className="flex justify-between items-end mb-6">
                             <div>
                                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                                    {(activeCategory === 'most_traded' && t.market.categories.mostTraded) ||
                                     (activeCategory === 'most_owned' && t.market.categories.mostOwned) ||
                                     (activeCategory === 'most_bought' && t.market.categories.mostBought) ||
                                     (activeCategory === 'most_sold' && t.market.categories.mostSold) ||
                                     (activeCategory === 'big_tech' && t.market.categories.bigTech) ||
                                     (activeCategory === 'ai' && t.market.categories.ai) ||
                                     (activeCategory === 'cybersecurity' && t.market.categories.cybersecurity) ||
                                     (activeCategory === 'ev' && t.market.categories.evs) ||
                                     (activeCategory === 'stocks' && t.market.categories.stocks) ||
                                     (activeCategory === 'etfs' && t.market.categories.etfs) ||
                                     (activeCategory === 'crypto' && t.market.categories.crypto) ||
                                     (activeCategory === 'us' && t.market.categories.usGreats) ||
                                     (activeCategory === 'uk' && t.market.categories.ukGems) ||
                                     (activeCategory === 'eu' && t.market.categories.euLeaders) ||
                                     t.market.browseAssets}
                                </h1>
                                <p className="text-slate-500 font-medium">
                                    {filteredData.length} {t.market.instrumentsAvailable}
                                </p>
                            </div>
                            
                             <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
                                <input 
                                    type="text" 
                                    placeholder={t.market.searchList} 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all w-64"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Content */}
                <div className="flex-1 overflow-y-auto scroll-smooth">
                    <div className="max-w-5xl mx-auto w-full px-8 py-4">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100">
                                     <th className="py-4 px-4 w-12 bg-white"></th>
                                    <th className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-wider bg-white">{t.market.instrument}</th>
                                    <th className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-wider bg-white">{t.market.name}</th>
                                    <th className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-wider bg-white">{t.market.type}</th>
                                    <th className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-wider bg-white text-center">{t.market.change24h}</th>
                                    <th className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-wider bg-white text-center">{t.market.currency}</th>
                                    <th className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-wider bg-white text-center">{t.market.spread}</th>
                                    <th className="py-4 px-4 w-16 bg-white"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredData.length > 0 ? (
                                    filteredData.map((item, i) => (
                                        <tr 
                                            key={i} 
                                            onClick={() => onSelectStock(item.symbol)}
                                            className="hover:bg-slate-50 transition-all cursor-pointer group"
                                        >
                                            <td className="py-3 px-4">
                                                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                                                    {item.logo}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="font-bold text-slate-900 text-sm">{item.symbol}</span>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <span className="text-[10px] text-slate-400 font-medium">{item.exchange}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="text-sm font-medium text-slate-700">{item.name}</span>
                                            </td>
                                             <td className="py-3 px-4">
                                                  <span className="text-[11px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-500 uppercase tracking-wide">
                                                      {item.type.toUpperCase() === 'STOCK' ? t.market.stock : t.market.crypto}
                                                  </span>
                                             </td>
                                            <td className="py-3 px-4 text-center">
                                                <span className={`text-xs font-bold ${item.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                    {item.change >= 0 ? '+' : ''}{item.change}%
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                                <span className="text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">{item.currency}</span>
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                                <span className="text-xs font-mono text-slate-600">{item.spread}</span>
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <button 
                                                    className="w-8 h-8 rounded-full border border-blue-200 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm hover:shadow-blue-200"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onSelectStock(item.symbol);
                                                    }}
                                                >
                                                    <Plus size={16} strokeWidth={3} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="py-20 text-center">
                                            <div className="max-w-xs mx-auto space-y-3">
                                                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                                                    <Search size={24} />
                                                </div>
                                                <p className="text-sm text-slate-500 font-medium">{t.market.noInstruments}</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ListingView;
