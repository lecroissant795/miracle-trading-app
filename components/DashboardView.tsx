
import React from 'react';
import { TrendingUp, TrendingDown, Clock, Share2, Bookmark, MessageCircle, ArrowLeft, ExternalLink, Zap, Globe, ChevronRight, Flame, BarChart2, ShieldCheck, Link2 } from 'lucide-react';
import { Stock } from '../types';
import Card from './Card';
import StockChart from './StockChart';
import Button from './Button';

interface DashboardViewProps {
  stocks: Stock[];
  onSelectStock: (stock: Stock) => void;
  onBack: () => void;
}

// Mock News Data
const NEWS_ITEMS = [
  {
    id: 1,
    title: "AI Rally Continues: Tech Sector Hits New All-Time Highs",
    summary: "Major chipmakers and software giants are leading a historic surge as artificial intelligence adoption accelerates across industries. Analysts predict this trend could sustain through Q4.",
    source: "Bloomberg",
    time: "2h ago",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    tag: "Technology",
    sentiment: "bullish"
  },
  {
    id: 2,
    title: "Fed Chairman Hints at Potential Rate Cuts in Q3",
    summary: "In a surprising turn of events, the Federal Reserve signaled that inflation metrics are stabilizing, opening the door for monetary easing later this year.",
    source: "CNBC",
    time: "4h ago",
    image: "https://images.unsplash.com/photo-1526304640152-d4619684e484?auto=format&fit=crop&q=80&w=800",
    tag: "Economy",
    sentiment: "neutral"
  },
  {
    id: 3,
    title: "Bitcoin Crosses $65k Resistance Level Amid ETF Inflows",
    summary: "Institutional interest in crypto assets remains strong as spot ETF volumes break daily records. Analysts eye the $70k mark as the next major hurdle.",
    source: "CoinDesk",
    time: "5h ago",
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=800",
    tag: "Crypto",
    sentiment: "bullish"
  },
   {
    id: 4,
    title: "Electric Vehicle Sales Slow Down in European Markets",
    summary: "Supply chain constraints and reducing subsidies have impacted the quarterly growth of major EV manufacturers, leading to a slight dip in sector valuations.",
    source: "Reuters",
    time: "7h ago",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800",
    tag: "Automotive",
    sentiment: "bearish"
  }
];

const MARKET_PERFORMANCE_DATA = {
  commodities: [
    { name: 'Gold', last: '5,541.50', change: '+4.49%', bullish: true },
    { name: 'Copper', last: '1,353.95', change: '+6.00%', bullish: true },
    { name: 'Brent Crude Oil', last: '69.25', change: '+1.24%', bullish: true },
    { name: 'CBOT Soybeans', last: '1,080.50', change: '+0.51%', bullish: true },
  ],
  currencies: [
    { name: 'EUR/USD', last: '1.1973', change: '+0.16%', bullish: true },
    { name: 'GBP/USD', last: '1.3830', change: '+0.16%', bullish: true },
    { name: 'JPY/USD', last: '0.0065', change: '+0.12%', bullish: true },
    { name: 'CNY/USD', last: '0.1439', change: '-0.01%', bullish: false },
  ],
  rates: [
    { name: 'US 10Y', last: '4.271', change: '+0.02', bullish: true },
    { name: 'DE 10Y', last: '2.863', change: '+0.009', bullish: true },
    { name: 'UK 10Y', last: '4.563', change: '+0.015', bullish: true },
    { name: 'JP 10Y', last: '2.249', change: '+0.015', bullish: true },
  ],
  stocks: [
    { name: 'S&P 500', last: '6,978.03', change: '-0.01%', bullish: false },
    { name: 'Euro STOXX 50', last: '5,933.20', change: '--', bullish: null },
    { name: 'FTSE 100', last: '10,154.43', change: '--', bullish: null },
    { name: 'Nikkei 225', last: '53,375.60', change: '+0.03%', bullish: true },
  ]
};

const INVESTMENT_IDEAS = {
    gainers: [
        { symbol: 'NVDA', name: 'NVIDIA Corp', last: '1,145.00', change: '+8.33%', bullish: true },
        { symbol: 'DELL', name: 'Dell Technologies', last: '165.40', change: '+5.71%', bullish: true },
        { symbol: 'PLTR', name: 'Palantir Tech', last: '24.50', change: '+5.31%', bullish: true },
        { symbol: 'AMD', name: 'Adv Micro Devices', last: '172.15', change: '+4.88%', bullish: true },
        { symbol: 'COIN', name: 'Coinbase Global', last: '245.90', change: '+4.57%', bullish: true },
    ],
    losers: [
        { symbol: 'GME', name: 'GameStop Corp', last: '24.60', change: '-10.00%', bullish: false },
        { symbol: 'AMC', name: 'AMC Entertain', last: '4.30', change: '-5.81%', bullish: false },
        { symbol: 'LULU', name: 'Lululemon Athletica', last: '310.00', change: '-4.71%', bullish: false, badge: 'BUY' },
        { symbol: 'CRM', name: 'Salesforce Inc', last: '235.80', change: '-4.08%', bullish: false },
        { symbol: 'NKE', name: 'Nike Inc', last: '92.70', change: '-3.57%', bullish: false },
    ],
    active: [
        { symbol: 'TSLA', name: 'Tesla Inc', last: '178.50', change: '+0.44%', bullish: true, badge: 'STR' },
        { symbol: 'AAPL', name: 'Apple Inc', last: '215.30', change: '-0.23%', bullish: false },
        { symbol: 'AMZN', name: 'Amazon.com Inc', last: '185.20', change: '+0.45%', bullish: true },
        { symbol: 'MSFT', name: 'Microsoft Corp', last: '425.10', change: '+0.41%', bullish: true },
        { symbol: 'META', name: 'Meta Platforms', last: '495.30', change: '-1.05%', bullish: false },
    ]
};

const DashboardView: React.FC<DashboardViewProps> = ({ stocks, onSelectStock, onBack }) => {
  const indices = stocks.filter(s => s.type === 'Index' || s.symbol === 'BTC').slice(0, 3);
  const trending = stocks.filter(s => Math.abs(s.changePercent) > 1).sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent)).slice(0, 5);

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [activeIdeaTab, setActiveIdeaTab] = React.useState<'gainers' | 'losers' | 'active'>('gainers');

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % NEWS_ITEMS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const heroNews = NEWS_ITEMS[currentSlide];
  const feedNews = NEWS_ITEMS;

  return (
    <div className="p-0 h-full overflow-y-auto animate-fade-in bg-slate-50">
      
      {/* Header Bar */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
            <button 
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
            title="Return to Landing"
            >
            <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                Market Hub <span className="text-xs font-normal text-slate-400 border-l border-slate-300 pl-2 ml-2">Live Updates</span>
            </h1>
        </div>
        <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Market Open
        </div>
      </div>

      {/* Running Ticker Stripe */}
      <div className="bg-slate-900 border-b border-slate-800 overflow-hidden whitespace-nowrap relative z-10">
        <div className="flex animate-marquee py-3 items-center">
          {[...stocks, ...stocks].map((stock, i) => (
            <div 
              key={`${stock.symbol}-${i}`} 
              className="inline-flex items-center px-8 border-r border-slate-800 cursor-pointer hover:bg-white/5 transition-colors group"
              onClick={() => onSelectStock(stock)}
            >
              <span className="text-xs font-black text-white mr-3 tracking-tight group-hover:text-blue-400 transition-colors">{stock.name}</span>
              <span className="text-xs font-medium text-slate-400 mr-3 font-mono">{stock.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              <span className={`text-[10px] flex items-center gap-1 font-bold ${stock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {stock.change >= 0 ? '▲' : '▼'} {Math.abs(stock.changePercent)}%
              </span>
              <span className="ml-8 text-slate-700 font-light">|</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Content Area (News) */}
            <div className="lg:col-span-8 space-y-8">
                
                {/* Hero Story (Automated Slider) */}
                <div className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-shadow">
                    <div className="aspect-[16/9] w-full bg-slate-200 relative">
                        {NEWS_ITEMS.map((item, index) => (
                            <div 
                                key={item.id}
                                className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                            >
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        ))}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-[15]"></div>
                    </div>
                    
                    <div className="absolute inset-0 z-20 flex flex-col justify-end">
                        <div className="p-6 md:p-8 w-full">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg shrink-0">Top Story</span>
                                <span className="text-slate-300 text-xs font-medium flex items-center gap-1.5"><Clock size={12} /> {heroNews.time}</span>
                                <span className="text-slate-300 text-xs font-medium">{heroNews.source}</span>
                            </div>
                            <div className="relative min-h-[7rem] mb-5">
                                {NEWS_ITEMS.map((item, index) => (
                                    <div 
                                        key={item.id}
                                        className={`absolute inset-0 transition-all duration-700 ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
                                    >
                                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-blue-200 transition-colors max-w-4xl">
                                            {item.title}
                                        </h2>
                                        <p className="text-slate-200 text-sm md:text-base line-clamp-2 max-w-2xl leading-relaxed">
                                            {item.summary}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-2 text-white/80">
                                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Share"><Share2 size={18} /></button>
                                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Bookmark"><Bookmark size={18} /></button>
                                </div>
                                <div className="flex gap-2">
                                    {NEWS_ITEMS.map((_, index) => (
                                        <button 
                                            key={index}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setCurrentSlide(index);
                                            }}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-blue-500 scale-110' : 'bg-white/30 hover:bg-white/50'}`}
                                            aria-label={`Go to slide ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* News Feed */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Zap size={20} className="text-amber-500 fill-amber-500" /> Latest Updates
                    </h3>
                    
                    {feedNews.map(news => (
                        <div key={news.id} className="bg-white rounded-2xl p-5 border border-slate-100 hover:border-blue-200 transition-all flex flex-col md:flex-row gap-6 group cursor-pointer shadow-sm hover:shadow-md">
                             <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 relative">
                                <img 
                                    src={news.image} 
                                    alt={news.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider text-slate-700">
                                    {news.tag}
                                </div>
                             </div>
                             <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-2 text-xs text-slate-500 font-medium">
                                        <span className="text-slate-900 font-bold">{news.source}</span>
                                        <span>•</span>
                                        <span>{news.time}</span>
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">{news.title}</h4>
                                    <p className="text-sm text-slate-500 line-clamp-2">{news.summary}</p>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] px-2 py-0.5 rounded border uppercase font-bold ${news.sentiment === 'bullish' ? 'border-emerald-200 text-emerald-700 bg-emerald-50' : news.sentiment === 'bearish' ? 'border-red-200 text-red-700 bg-red-50' : 'border-slate-200 text-slate-600 bg-slate-50'}`}>
                                            {news.sentiment}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-400">
                                        <button className="hover:text-blue-600 transition-colors"><MessageCircle size={16} /></button>
                                        <button className="hover:text-blue-600 transition-colors"><Share2 size={16} /></button>
                                    </div>
                                </div>
                             </div>
                        </div>
                    ))}

                    <Button variant="outline" className="w-full py-4 border-dashed text-slate-500 hover:text-blue-600 hover:border-blue-300">
                        Load More News
                    </Button>
                </div>

                {/* Markets Performance Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                             Markets Performance
                        </h3>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Official Data Partner <span className="text-blue-600 font-black">LSEG</span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Commodities */}
                        <Card className="!p-4 hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-slate-900 mb-4 flex items-center justify-between group cursor-pointer">
                                Commodities <ChevronRight size={16} className="text-orange-500 group-hover:translate-x-1 transition-transform" />
                            </h4>
                            <div className="space-y-3">
                                <div className="flex justify-between text-[10px] font-bold text-slate-400 border-b border-slate-50 pb-1">
                                    <span>FUTURE</span>
                                    <span>LAST / % CHANGE</span>
                                </div>
                                {MARKET_PERFORMANCE_DATA.commodities.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-slate-700">{item.name}</span>
                                        <div className="text-right">
                                            <div className="text-slate-500 font-medium">{item.last}</div>
                                            <div className={`font-bold ${item.bullish ? 'text-emerald-500' : 'text-red-500'}`}>{item.change}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Currencies */}
                        <Card className="!p-4 hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-slate-900 mb-4 flex items-center justify-between group cursor-pointer">
                                Currencies <ChevronRight size={16} className="text-orange-500 group-hover:translate-x-1 transition-transform" />
                            </h4>
                            <div className="space-y-3">
                                <div className="flex justify-between text-[10px] font-bold text-slate-400 border-b border-slate-50 pb-1">
                                    <span>EXCHANGE</span>
                                    <span>LAST / % CHANGE</span>
                                </div>
                                {MARKET_PERFORMANCE_DATA.currencies.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-slate-700">{item.name}</span>
                                        <div className="text-right">
                                            <div className="text-slate-500 font-medium">{item.last}</div>
                                            <div className={`font-bold ${item.bullish ? 'text-emerald-500' : 'text-red-500'}`}>{item.change}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Rates & Bonds */}
                        <Card className="!p-4 hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-slate-900 mb-4 flex items-center justify-between group cursor-pointer">
                                Rates & Bonds <ChevronRight size={16} className="text-orange-500 group-hover:translate-x-1 transition-transform" />
                            </h4>
                            <div className="space-y-3">
                                <div className="flex justify-between text-[10px] font-bold text-slate-400 border-b border-slate-50 pb-1">
                                    <span>NAME</span>
                                    <span>YIELD / CHANGE</span>
                                </div>
                                {MARKET_PERFORMANCE_DATA.rates.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-slate-700">{item.name}</span>
                                        <div className="text-right">
                                            <div className="text-slate-500 font-medium">{item.last}</div>
                                            <div className={`font-bold ${item.bullish ? 'text-emerald-500' : 'text-red-500'}`}>{item.change}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Stocks */}
                        <Card className="!p-4 hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-slate-900 mb-4 flex items-center justify-between group cursor-pointer">
                                Stocks <ChevronRight size={16} className="text-orange-500 group-hover:translate-x-1 transition-transform" />
                            </h4>
                            <div className="space-y-3">
                                <div className="flex justify-between text-[10px] font-bold text-slate-400 border-b border-slate-50 pb-1">
                                    <span>INDEX</span>
                                    <span>LAST / % CHANGE</span>
                                </div>
                                {MARKET_PERFORMANCE_DATA.stocks.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-slate-700">{item.name}</span>
                                        <div className="text-right">
                                            <div className="text-slate-500 font-medium">{item.last}</div>
                                            <div className={`font-bold ${item.bullish === true ? 'text-emerald-500' : item.bullish === false ? 'text-red-500' : 'text-slate-300'}`}>
                                                {item.change}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>

            </div>

            {/* Right Sidebar (Market Data) */}
            <div className="lg:col-span-4 space-y-8">
                
                {/* Trending Stocks */}
                <Card>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2">
                            <Flame size={18} className="text-orange-500 fill-orange-500" /> Trending Stocks
                        </h3>
                        <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {trending.map((stock, i) => (
                            <div 
                                key={stock.symbol} 
                                onClick={() => onSelectStock(stock)}
                                className="flex items-center justify-between p-2 -mx-2 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-600 group-hover:bg-white group-hover:shadow-sm transition-all">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm text-slate-900">{stock.symbol}</div>
                                        <div className="text-xs text-slate-500">{stock.name}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-sm text-slate-900">${stock.price.toFixed(2)}</div>
                                    <div className={`text-xs font-bold ${stock.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                        {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Sector Performance (Mock) */}
                <Card>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2">
                            <BarChart2 size={18} className="text-indigo-500" /> Sectors
                        </h3>
                    </div>
                    <div className="space-y-3">
                        {[
                            { name: 'Technology', val: '+2.4%', color: 'bg-emerald-500', w: '80%' },
                            { name: 'Energy', val: '-0.8%', color: 'bg-red-500', w: '30%' },
                            { name: 'Finance', val: '+1.1%', color: 'bg-emerald-500', w: '60%' },
                            { name: 'Healthcare', val: '+0.2%', color: 'bg-emerald-500', w: '45%' },
                            { name: 'Consumer', val: '-1.5%', color: 'bg-red-500', w: '40%' },
                        ].map((sector, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-xs font-bold mb-1">
                                    <span className="text-slate-700">{sector.name}</span>
                                    <span className={sector.val.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}>{sector.val}</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${sector.color}`} style={{ width: sector.w }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Market Events (Economic Calendar) */}
                <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-lg">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <Clock size={18} /> Market Events
                    </h3>
                    <div className="space-y-4">
                        {[
                            { event: 'Fed Interest Rate Decision', time: 'Tomorrow, 2:00 PM', impact: 'High' },
                            { event: 'Jobless Claims', time: 'Thu, 8:30 AM', impact: 'Med' },
                            { event: 'CPI Data Release', time: 'Fri, 8:30 AM', impact: 'High' },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-3 items-start">
                                <div className="w-1 h-full min-h-[32px] bg-slate-700 rounded-full"></div>
                                <div>
                                    <div className="text-sm font-bold text-slate-100">{item.event}</div>
                                    <div className="text-xs text-slate-400 mt-0.5">{item.time}</div>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${item.impact === 'High' ? 'border-red-500/30 text-red-400 bg-red-500/10' : 'border-amber-500/30 text-amber-400 bg-amber-500/10'} mt-1 inline-block`}>
                                        {item.impact} Impact
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Investment Ideas (Condensed Sidebar Version) */}
                <Card className="!p-5 border-blue-100 bg-gradient-to-b from-white to-blue-50/20">
                    <div className="mb-4">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                            <Zap size={18} className="text-blue-600" /> Investment Ideas
                        </h3>
                        <div className="flex p-1 bg-slate-100/80 rounded-xl">
                            {(['gainers', 'losers', 'active'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveIdeaTab(tab)}
                                    className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all capitalize ${
                                        activeIdeaTab === tab 
                                        ? 'bg-white text-blue-600 shadow-sm' 
                                        : 'text-slate-500 hover:text-slate-700'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        {INVESTMENT_IDEAS[activeIdeaTab].slice(0, 4).map((stock) => (
                            <div key={stock.symbol} className="flex items-center justify-between group cursor-pointer hover:bg-white p-1 rounded-lg transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className={`w-1 h-6 rounded-full ${
                                        activeIdeaTab === 'gainers' ? 'bg-emerald-400' : activeIdeaTab === 'losers' ? 'bg-red-400' : 'bg-indigo-400'
                                    }`}></div>
                                    <div>
                                        <div className="font-bold text-xs text-slate-900">{stock.symbol}</div>
                                        <div className="text-[9px] text-slate-400 font-medium truncate max-w-[80px]">{stock.name}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-xs text-slate-900">{stock.last}</div>
                                    <div className={`text-[10px] font-bold ${
                                        stock.bullish === true ? 'text-emerald-500' : stock.bullish === false ? 'text-red-500' : 'text-slate-400'
                                    }`}>
                                        {stock.change}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-6 py-2.5 bg-white border border-slate-100 rounded-xl text-blue-600 text-[10px] font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
                        View Full Report <ChevronRight size={14} />
                    </button>
                </Card>

                {/* Verified Sources */}
                <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
                        <ShieldCheck size={18} className="text-emerald-500" /> Verified Sources
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                        {[
                            { name: 'timesunion.com', url: 'vertexaisearch.cloud.google.co...' },
                            { name: 'washingtonpost.com', url: 'vertexaisearch.cloud.google.co...' },
                            { name: 'apnews.com', url: 'vertexaisearch.cloud.google.co...' },
                            { name: 'reuters.com', url: 'vertexaisearch.cloud.google.co...' },
                        ].map((source, i) => (
                            <div key={i} className="bg-white border border-slate-50 rounded-xl p-3 flex items-center gap-3 hover:border-blue-200 transition-all cursor-pointer group shadow-sm">
                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Link2 size={14} />
                                </div>
                                <div className="overflow-hidden">
                                    <div className="text-[10px] font-bold text-slate-900 truncate tracking-tight">{source.name}</div>
                                    <div className="text-[9px] text-slate-400 truncate opacity-70">{source.url}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>

      </div>
    </div>
  );
};
export default DashboardView;
