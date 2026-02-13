import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Activity, Globe, Clock, BarChart3, Share2, Star, MoreHorizontal, ArrowUpRight, Plus, Maximize2, FileText, LayoutList, Scale, Banknote } from 'lucide-react';
import { Stock } from '../types';
import StockChart from './StockChart';
import Button from './Button';
import OptionChainModal from './OptionChainModal';
import FinancialsModal from './FinancialsModal';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTranslation } from '../services/LanguageContext';

interface StockDetailViewProps {
  stock: Stock;
  onBack: () => void;
  onInvest: (side?: 'BUY' | 'SELL') => void;
}

const StockDetailView: React.FC<StockDetailViewProps> = ({ stock, onBack, onInvest }) => {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState('1M');
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'INCOME' | 'BALANCE' | 'CASHFLOW'>('OVERVIEW');
  const [isOptionChainOpen, setIsOptionChainOpen] = useState(false);
  const [isFinancialsOpen, setIsFinancialsOpen] = useState(false);

  const isPositive = stock.change >= 0;

  // Formatted stats
  const stats = [
    { label: t.stockDetail.marketCap, value: `$${stock.details?.marketCap}T` },
    { label: t.stockDetail.peRatio, value: stock.details?.peRatio },
    { label: t.stockDetail.dividendYield, value: `${stock.details?.dividendYield}%` },
    { label: t.stockDetail.volume, value: (stock.details?.volume ? (stock.details.volume / 1000000).toFixed(1) + 'M' : '-') },
    { label: t.stockDetail.yearHigh, value: stock.details?.yearRangeHigh },
    { label: t.stockDetail.yearLow, value: stock.details?.yearRangeLow },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-white h-full relative animate-fade-in">
      {/* Navigation / Header */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl border-b border-slate-100 px-4 md:px-8 py-3 flex items-center justify-between transition-all">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
          >
            <ArrowLeft size={22} />
          </button>
          <div className="flex flex-col">
             <span className="font-bold text-slate-900 text-sm tracking-wide">{stock.symbol}</span>
             <span className="text-xs text-slate-400 font-medium">NASDAQ</span>
          </div>
        </div>
        <div className="flex gap-2">
            <button className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-full transition-colors">
                <Star size={20} />
            </button>
            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                <Share2 size={20} />
            </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 pb-24">
        
        {/* Hero Section: Price & Chart */}
        <div className="mb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
                <div>
                   <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">
                          {stock.symbol[0]}
                      </div>
                      <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{stock.name}</h1>
                   </div>
                   <div className="flex items-baseline gap-4 flex-wrap">
                      <span className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight">
                        ${stock.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                      <div className={`flex items-center gap-1.5 text-lg font-medium px-3 py-1 rounded-full ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                          {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                          <span>{isPositive ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent}%)</span>
                      </div>
                   </div>
                </div>
                
                {/* Time Range Selector */}
                <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                        {['1D', '1W', '1M', '3M', 'YTD', '1Y', 'ALL'].map(range => (
                            <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${timeRange === range ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
                            >
                            {range === '1D' ? '1N' : range === '1W' ? '1T' : range === '1M' ? '1Th' : range === '3M' ? '3Th' : range === 'YTD' ? 'YTD' : range === '1Y' ? '1N' : 'Tất cả'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Chart Area */}
            <div className="h-[400px] w-full -mx-4 md:mx-0 relative group">
                <StockChart 
                    data={stock.chartData || []} 
                    color={isPositive ? '#10b981' : '#ef4444'} 
                    height={400}
                />
            </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex items-center gap-8 border-b border-slate-200 mb-8 overflow-x-auto">
            <button 
                onClick={() => setActiveTab('OVERVIEW')}
                className={`flex items-center gap-2 pb-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${activeTab === 'OVERVIEW' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
                <LayoutList size={18} /> {t.stockDetail.overview}
            </button>
            <button 
                onClick={() => setActiveTab('INCOME')}
                className={`flex items-center gap-2 pb-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${activeTab === 'INCOME' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
                <TrendingUp size={18} /> {t.stockDetail.income}
            </button>
            <button 
                onClick={() => setActiveTab('BALANCE')}
                className={`flex items-center gap-2 pb-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${activeTab === 'BALANCE' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
                <Scale size={18} /> {t.stockDetail.balanceSheet}
            </button>
            <button 
                onClick={() => setActiveTab('CASHFLOW')}
                className={`flex items-center gap-2 pb-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${activeTab === 'CASHFLOW' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
                <Banknote size={18} /> {t.stockDetail.cashFlow}
            </button>
        </div>

        {/* Content Grid (OVERVIEW) */}
        {activeTab === 'OVERVIEW' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column (Details) */}
            <div className="lg:col-span-8 space-y-10">
                
                {/* AI Insight - Redesigned */}
                {/* Performance Dashboard - Replaces AI Insight */}
                <section className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                            <BarChart3 size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">{t.stockDetail.performance}</h3>
                            <p className="text-sm text-slate-500">{t.stockDetail.realTimeData}</p>
                        </div>
                    </div>

                    <div className="space-y-8">
                         {/* Ranges */}
                         <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
                                    <span>{t.stockDetail.dayLow}</span>
                                    <span className="text-slate-900 font-bold">{t.stockDetail.dayRange}</span>
                                    <span>{t.stockDetail.dayHigh}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-2">
                                    <span>${stock.details?.dayRangeLow}</span>
                                    <span>${stock.details?.dayRangeHigh}</span>
                                </div>
                                <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
                                    <div 
                                        className="absolute top-0 bottom-0 bg-blue-500 rounded-full" 
                                        style={{ 
                                            left: `${(( (stock.price - (stock.details?.dayRangeLow || 0)) / ((stock.details?.dayRangeHigh || 1) - (stock.details?.dayRangeLow || 0)) ) * 100)}%`,
                                            width: '12px',
                                            transform: 'translateX(-50%)'
                                        }}
                                    ></div>
                                     {/* Fill bar for visualization context if needed, or just the dot marker */}
                                     {/* Let's do a filled range bar instead of just a dot for better visual */}
                                     <div 
                                        className="h-full bg-blue-100 w-full absolute top-0 left-0"
                                     ></div>
                                      <div 
                                        className="h-full bg-blue-500 absolute top-0 left-0 transition-all duration-1000"
                                        style={{ width: `${Math.min(100, Math.max(0, ((stock.price - (stock.details?.dayRangeLow || 0)) / ((stock.details?.dayRangeHigh || 1) - (stock.details?.dayRangeLow || 0))) * 100))}%` }}
                                     ></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
                                    <span>{t.stockDetail.yearLow}</span>
                                    <span className="text-slate-900 font-bold">{t.stockDetail.yearRange}</span>
                                    <span>{t.stockDetail.yearHigh}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-2">
                                    <span>${stock.details?.yearRangeLow}</span>
                                    <span>${stock.details?.yearRangeHigh}</span>
                                </div>
                                <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
                                     <div 
                                        className="h-full bg-indigo-500 absolute top-0 left-0 transition-all duration-1000"
                                        style={{ width: `${Math.min(100, Math.max(0, ((stock.price - (stock.details?.yearRangeLow || 0)) / ((stock.details?.yearRangeHigh || 1) - (stock.details?.yearRangeLow || 0))) * 100))}%` }}
                                     ></div>
                                </div>
                            </div>
                         </div>

                         {/* Mini Stats Grid */}
                         <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                             <div className="p-4 bg-slate-50 rounded-2xl text-center">
                                 <div className="text-xs text-slate-500 font-medium mb-1">{t.stockDetail.open}</div>
                                 <div className="text-lg font-bold text-slate-900">${(stock.price * 0.99).toFixed(2)}</div>
                             </div>
                             <div className="p-4 bg-slate-50 rounded-2xl text-center">
                                 <div className="text-xs text-slate-500 font-medium mb-1">{t.stockDetail.prevClose}</div>
                                 <div className="text-lg font-bold text-slate-900">${stock.details?.previousClose}</div>
                             </div>
                             <div className="p-4 bg-slate-50 rounded-2xl text-center">
                                 <div className="text-xs text-slate-500 font-medium mb-1">{t.stockDetail.volAvg}</div>
                                 <div className="text-lg font-bold text-slate-900">
                                     {stock.details?.volume ? (stock.details.volume / 1000000).toFixed(1) + 'M' : 'N/A'}
                                 </div>
                             </div>
                         </div>
                    </div>
                </section>

                {/* About Section */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-slate-900">{t.stockDetail.about} {stock.name}</h3>
                        <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                            {t.stockDetail.showMore} <ArrowUpRight size={16} />
                        </button>
                    </div>
                    <p className="text-slate-500 leading-7 text-lg mb-6">
                        {stock.description || t.stockDetail.descriptionUnavailable}
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                         <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2 text-sm font-medium text-slate-700">
                            <Activity size={16} className="text-slate-400" /> {t.stockDetail.techSector}
                         </div>
                         <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2 text-sm font-medium text-slate-700">
                            <Globe size={16} className="text-slate-400" /> {t.stockDetail.globalMarket}
                         </div>
                    </div>
                </section>
            </div>

            {/* Right Column (Stats & Actions) */}
            <div className="lg:col-span-4 space-y-8">
                
                {/* Key Stats Card */}
                <section className="bg-slate-50 rounded-3xl p-6 md:p-8">
                    <h3 className="font-bold text-slate-900 mb-6 text-lg">{t.stockDetail.keyStats}</h3>
                    <div className="space-y-5">
                        {stats.map((s) => (
                            <div key={s.label} className="flex justify-between items-center">
                                <span className="text-slate-500 text-sm font-medium">{s.label}</span>
                                <span className="text-slate-900 font-bold">{s.value}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Quick Actions */}
                <div className="flex gap-4">
                    <Button 
                        onClick={() => onInvest('BUY')} 
                        className="flex-1 py-4 text-lg font-bold bg-emerald-500 hover:bg-emerald-600 shadow-xl shadow-emerald-200 transform transition-all hover:-translate-y-1"
                    >
                        {t.stockDetail.buy}
                    </Button>
                    <Button 
                        onClick={() => onInvest('SELL')} 
                        className="flex-1 py-4 text-lg font-bold bg-rose-500 hover:bg-rose-600 shadow-xl shadow-rose-200 transform transition-all hover:-translate-y-1"
                    >
                        {t.stockDetail.sell}
                    </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={() => setIsFinancialsOpen(true)}
                        className="py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2"
                    >
                        <FileText size={16} className="text-slate-400" /> {t.stockDetail.financials}
                    </button>
                    <button 
                        onClick={() => setIsOptionChainOpen(true)}
                        className="py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2"
                    >
                        <MoreHorizontal size={16} className="text-slate-400" /> {t.stockDetail.options}
                    </button>
                </div>

            </div>
        </div>
        )}

        {/* INCOME TAB */}
        {activeTab === 'INCOME' && (
            <div className="space-y-10 animate-fade-in">
                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <h4 className="text-sm font-bold text-slate-500 uppercase mb-4">{t.stockDetail.revenueVsCost} ({t.stockDetail.annual})</h4>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[
                                    { year: '2021', revenue: 365, cost: 212 },
                                    { year: '2022', revenue: 394, cost: 223 },
                                    { year: '2023', revenue: 383, cost: 214 },
                                ]}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="year" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}B`} />
                                    <Tooltip cursor={{fill: 'transparent'}} />
                                    <Legend />
                                    <Bar dataKey="revenue" name={t.stockDetail.revenue} fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                                    <Bar dataKey="cost" name={t.stockDetail.cost} fill="#ef4444" radius={[4, 4, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <h4 className="text-sm font-bold text-slate-500 uppercase mb-4">{t.stockDetail.ebitdaVsNetIncome} ({t.stockDetail.annual})</h4>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[
                                    { year: '2021', ebitda: 120, netIncome: 94 },
                                    { year: '2022', ebitda: 130, netIncome: 99 },
                                    { year: '2023', ebitda: 125, netIncome: 97 },
                                ]}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="year" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}B`} />
                                    <Tooltip cursor={{fill: 'transparent'}} />
                                    <Legend />
                                    <Bar dataKey="ebitda" name={t.stockDetail.ebitda} fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={30} />
                                    <Bar dataKey="netIncome" name={t.stockDetail.netIncome} fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Income Statement Table */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-bold text-slate-900">{t.stockDetail.incomeStatement}</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium">
                                <tr>
                                    <th className="px-6 py-4">{t.stockDetail.breakdown}</th>
                                    <th className="px-6 py-4 text-right">2023</th>
                                    <th className="px-6 py-4 text-right">2022</th>
                                    <th className="px-6 py-4 text-right">2021</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr className="font-bold bg-slate-50/50"><td className="px-6 py-3">{t.stockDetail.revenue}</td><td className="px-6 py-3 text-right">$383.29B</td><td className="px-6 py-3 text-right">$394.33B</td><td className="px-6 py-3 text-right">$365.82B</td></tr>
                                <tr><td className="px-6 py-3 pl-10 text-slate-500">{t.stockDetail.cost}</td><td className="px-6 py-3 text-right">$214.14B</td><td className="px-6 py-3 text-right">$223.55B</td><td className="px-6 py-3 text-right">$212.98B</td></tr>
                                <tr className="font-bold bg-slate-50/50"><td className="px-6 py-3">{t.stockDetail.grossProfit}</td><td className="px-6 py-3 text-right">$169.15B</td><td className="px-6 py-3 text-right">$170.78B</td><td className="px-6 py-3 text-right">$152.84B</td></tr>
                                <tr><td className="px-6 py-3 pl-10 text-slate-500">{t.stockDetail.operatingExpenses}</td><td className="px-6 py-3 text-right">$54.85B</td><td className="px-6 py-3 text-right">$51.35B</td><td className="px-6 py-3 text-right">$43.89B</td></tr>
                                <tr className="font-bold bg-slate-50/50"><td className="px-6 py-3">{t.stockDetail.netIncome}</td><td className="px-6 py-3 text-right text-emerald-600">$97.00B</td><td className="px-6 py-3 text-right text-emerald-600">$99.80B</td><td className="px-6 py-3 text-right text-emerald-600">$94.68B</td></tr>
                                <tr><td className="px-6 py-3 pl-10 text-slate-500">{t.stockDetail.basicEps}</td><td className="px-6 py-3 text-right">$6.16</td><td className="px-6 py-3 text-right">$6.15</td><td className="px-6 py-3 text-right">$5.67</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )}

        {/* BALANCE SHEET TAB */}
        {activeTab === 'BALANCE' && (
            <div className="space-y-10 animate-fade-in">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <h4 className="text-sm font-bold text-slate-500 uppercase mb-4">{t.stockDetail.assetsStructure}</h4>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[
                                    { year: '2021', current: 135, nonCurrent: 216 },
                                    { year: '2022', current: 135, nonCurrent: 217 },
                                    { year: '2023', current: 143, nonCurrent: 209 },
                                ]}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="year" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}B`} />
                                    <Tooltip cursor={{fill: 'transparent'}} />
                                    <Legend />
                                    <Bar dataKey="current" name={t.stockDetail.currentAssets} fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                                    <Bar dataKey="nonCurrent" name={t.stockDetail.nonCurrentAssets} fill="#1e40af" radius={[4, 4, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <h4 className="text-sm font-bold text-slate-500 uppercase mb-4">{t.stockDetail.debtStructure}</h4>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[
                                    { year: '2021', short: 16, long: 109 },
                                    { year: '2022', short: 21, long: 99 },
                                    { year: '2023', short: 16, long: 95 },
                                ]}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="year" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}B`} />
                                    <Tooltip cursor={{fill: 'transparent'}} />
                                    <Legend />
                                    <Bar dataKey="short" name={t.stockDetail.shortTermDebt} fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={30} />
                                    <Bar dataKey="long" name={t.stockDetail.longTermDebt} fill="#ef4444" radius={[4, 4, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-bold text-slate-900">{t.stockDetail.balanceSheet}</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium">
                                <tr>
                                    <th className="px-6 py-4">{t.stockDetail.breakdown}</th>
                                    <th className="px-6 py-4 text-right">2023</th>
                                    <th className="px-6 py-4 text-right">2022</th>
                                    <th className="px-6 py-4 text-right">2021</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr className="font-bold bg-slate-50/50"><td className="px-6 py-3">{t.stockDetail.totalAssets}</td><td className="px-6 py-3 text-right">$352.58B</td><td className="px-6 py-3 text-right">$352.75B</td><td className="px-6 py-3 text-right">$351.00B</td></tr>
                                <tr><td className="px-6 py-3 pl-10 text-slate-500">{t.stockDetail.cashEquivalents}</td><td className="px-6 py-3 text-right">$29.97B</td><td className="px-6 py-3 text-right">$23.65B</td><td className="px-6 py-3 text-right">$34.94B</td></tr>
                                <tr className="font-bold bg-slate-50/50"><td className="px-6 py-3">{t.stockDetail.totalLiabilities}</td><td className="px-6 py-3 text-right">$290.43B</td><td className="px-6 py-3 text-right">$302.08B</td><td className="px-6 py-3 text-right">$287.91B</td></tr>
                                <tr><td className="px-6 py-3 pl-10 text-slate-500">{t.stockDetail.totalDebt}</td><td className="px-6 py-3 text-right">$111.00B</td><td className="px-6 py-3 text-right">$120.00B</td><td className="px-6 py-3 text-right">$125.00B</td></tr>
                                <tr className="font-bold bg-slate-50/50"><td className="px-6 py-3">{t.stockDetail.totalEquity}</td><td className="px-6 py-3 text-right">$62.15B</td><td className="px-6 py-3 text-right">$50.67B</td><td className="px-6 py-3 text-right">$63.09B</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )}

        {/* CASH FLOW TAB */}
        {activeTab === 'CASHFLOW' && (
            <div className="space-y-10 animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <h4 className="text-sm font-bold text-slate-500 uppercase mb-4">{t.stockDetail.operatingVsFree}</h4>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[
                                    { year: '2021', operating: 104, free: 93 },
                                    { year: '2022', operating: 122, free: 111 },
                                    { year: '2023', operating: 110, free: 99 },
                                ]}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="year" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}B`} />
                                    <Tooltip cursor={{fill: 'transparent'}} />
                                    <Legend />
                                    <Bar dataKey="operating" name={t.stockDetail.cashFromOperating} fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
                                    <Bar dataKey="free" name={t.stockDetail.freeCashFlow} fill="#059669" radius={[4, 4, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <h4 className="text-sm font-bold text-slate-500 uppercase mb-4">{t.stockDetail.investingVsFinancing}</h4>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[
                                    { year: '2021', investing: -14, financing: -93 },
                                    { year: '2022', investing: -22, financing: -110 },
                                    { year: '2023', investing: 3.7, financing: -108 },
                                ]}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="year" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}B`} />
                                    <Tooltip cursor={{fill: 'transparent'}} />
                                    <Legend />
                                    <Bar dataKey="investing" name={t.stockDetail.cashFromInvesting} fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={30} />
                                    <Bar dataKey="financing" name={t.stockDetail.cashFromFinancing} fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-bold text-slate-900">{t.stockDetail.cashFlowStatement}</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium">
                                <tr>
                                    <th className="px-6 py-4">{t.stockDetail.breakdown}</th>
                                    <th className="px-6 py-4 text-right">2023</th>
                                    <th className="px-6 py-4 text-right">2022</th>
                                    <th className="px-6 py-4 text-right">2021</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr className="font-bold bg-slate-50/50"><td className="px-6 py-3">{t.stockDetail.netIncome}</td><td className="px-6 py-3 text-right">$97.00B</td><td className="px-6 py-3 text-right">$99.80B</td><td className="px-6 py-3 text-right">$94.68B</td></tr>
                                <tr><td className="px-6 py-3 pl-10 text-slate-500">{t.stockDetail.depreciation}</td><td className="px-6 py-3 text-right">$11.52B</td><td className="px-6 py-3 text-right">$11.10B</td><td className="px-6 py-3 text-right">$11.28B</td></tr>
                                <tr className="font-bold bg-slate-50/50"><td className="px-6 py-3">{t.stockDetail.cashFromOperations}</td><td className="px-6 py-3 text-right text-emerald-600">$110.54B</td><td className="px-6 py-3 text-right text-emerald-600">$122.15B</td><td className="px-6 py-3 text-right text-emerald-600">$104.04B</td></tr>
                                <tr><td className="px-6 py-3 pl-10 text-slate-500">{t.stockDetail.cashFromInvesting}</td><td className="px-6 py-3 text-right">$3.71B</td><td className="px-6 py-3 text-right">-$22.35B</td><td className="px-6 py-3 text-right">-$14.55B</td></tr>
                                <tr><td className="px-6 py-3 pl-10 text-slate-500">{t.stockDetail.cashFromFinancing}</td><td className="px-6 py-3 text-right">-$108.49B</td><td className="px-6 py-3 text-right">-$110.30B</td><td className="px-6 py-3 text-right">-$93.35B</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )}

        <OptionChainModal 
            isOpen={isOptionChainOpen}
            onClose={() => setIsOptionChainOpen(false)}
            stock={stock}
        />

        <FinancialsModal 
            isOpen={isFinancialsOpen}
            onClose={() => setIsFinancialsOpen(false)}
            stock={stock}
        />
      </main>
    </div>
  );
};

export default StockDetailView;
