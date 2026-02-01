import React, { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Activity, Globe, Clock, BrainCircuit, BarChart3, Share2, Star, MoreHorizontal, ArrowUpRight, Plus, Maximize2, FileText, LayoutList, Scale, Banknote } from 'lucide-react';
import { Stock } from '../types';
import StockChart from './StockChart';
import Button from './Button';
import OptionChainModal from './OptionChainModal';
import FinancialsModal from './FinancialsModal';
import { getStockInsight } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StockDetailViewProps {
  stock: Stock;
  onBack: () => void;
  onInvest: (side?: 'BUY' | 'SELL') => void;
}

const StockDetailView: React.FC<StockDetailViewProps> = ({ stock, onBack, onInvest }) => {
  const [timeRange, setTimeRange] = useState('1M');
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'INCOME' | 'BALANCE' | 'CASHFLOW'>('OVERVIEW');
  const [aiInsight, setAiInsight] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);
  const [isOptionChainOpen, setIsOptionChainOpen] = useState(false);
  const [isFinancialsOpen, setIsFinancialsOpen] = useState(false);

  useEffect(() => {
    setLoadingAi(true);
    getStockInsight(stock).then(insight => {
        setAiInsight(insight);
        setLoadingAi(false);
    });
  }, [stock]);

  const isPositive = stock.change >= 0;

  // Formatted stats
  const stats = [
    { label: 'Market Cap', value: `$${stock.details?.marketCap}T` },
    { label: 'P/E Ratio', value: stock.details?.peRatio },
    { label: 'Dividend Yield', value: `${stock.details?.dividendYield}%` },
    { label: 'Volume', value: (stock.details?.volume ? (stock.details.volume / 1000000).toFixed(1) + 'M' : '-') },
    { label: '52 Wk High', value: stock.details?.yearRangeHigh },
    { label: '52 Wk Low', value: stock.details?.yearRangeLow },
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
                            {range}
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
                <LayoutList size={18} /> Overview
            </button>
            <button 
                onClick={() => setActiveTab('INCOME')}
                className={`flex items-center gap-2 pb-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${activeTab === 'INCOME' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
                <TrendingUp size={18} /> Income
            </button>
            <button 
                onClick={() => setActiveTab('BALANCE')}
                className={`flex items-center gap-2 pb-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${activeTab === 'BALANCE' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
                <Scale size={18} /> Balance Sheet
            </button>
            <button 
                onClick={() => setActiveTab('CASHFLOW')}
                className={`flex items-center gap-2 pb-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${activeTab === 'CASHFLOW' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
                <Banknote size={18} /> Cash Flow
            </button>
        </div>

        {/* Content Grid (OVERVIEW) */}
        {activeTab === 'OVERVIEW' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column (Details) */}
            <div className="lg:col-span-8 space-y-10">
                
                {/* AI Insight - Redesigned */}
                <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-1 shadow-xl shadow-indigo-100">
                    <div className="bg-white rounded-[22px] p-6 md:p-8 h-full relative z-10">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                                <BrainCircuit size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Gemini Market Insight</h3>
                                <p className="text-sm text-slate-500">AI-powered analysis based on recent trends</p>
                            </div>
                        </div>
                        <div className="pl-0 md:pl-[68px]">
                            {loadingAi ? (
                                <div className="space-y-2 animate-pulse">
                                    <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                                    <div className="h-4 bg-slate-100 rounded w-full"></div>
                                </div>
                            ) : (
                                <p className="text-slate-700 leading-relaxed text-lg">
                                    "{aiInsight || "Analysis unavailable."}"
                                </p>
                            )}
                            <div className="mt-4 flex gap-2">
                                <span className="text-xs font-medium px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg">#Bullish</span>
                                <span className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg">#Tech</span>
                            </div>
                        </div>
                    </div>
                    {/* Decorative blurred blob behind */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-400 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
                </section>

                {/* About Section */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-slate-900">About {stock.name}</h3>
                        <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                            Show more <ArrowUpRight size={16} />
                        </button>
                    </div>
                    <p className="text-slate-500 leading-7 text-lg mb-6">
                        {stock.description || "Company description unavailable."}
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                         <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2 text-sm font-medium text-slate-700">
                            <Activity size={16} className="text-slate-400" /> Technology Sector
                         </div>
                         <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2 text-sm font-medium text-slate-700">
                            <Globe size={16} className="text-slate-400" /> Global Market
                         </div>
                    </div>
                </section>
            </div>

            {/* Right Column (Stats & Actions) */}
            <div className="lg:col-span-4 space-y-8">
                
                {/* Key Stats Card */}
                <section className="bg-slate-50 rounded-3xl p-6 md:p-8">
                    <h3 className="font-bold text-slate-900 mb-6 text-lg">Key Statistics</h3>
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
                        Buy
                    </Button>
                    <Button 
                        onClick={() => onInvest('SELL')} 
                        className="flex-1 py-4 text-lg font-bold bg-rose-500 hover:bg-rose-600 shadow-xl shadow-rose-200 transform transition-all hover:-translate-y-1"
                    >
                        Sell
                    </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={() => setIsFinancialsOpen(true)}
                        className="py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2"
                    >
                        <FileText size={16} className="text-slate-400" /> Financials
                    </button>
                    <button 
                        onClick={() => setIsOptionChainOpen(true)}
                        className="py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2"
                    >
                        <MoreHorizontal size={16} className="text-slate-400" /> Options
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
                        <h4 className="text-sm font-bold text-slate-500 uppercase mb-4">Revenue vs Cost of Revenue (Annual)</h4>
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
                                    <Bar dataKey="revenue" name="Revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                                    <Bar dataKey="cost" name="Cost of Revenue" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <h4 className="text-sm font-bold text-slate-500 uppercase mb-4">EBITDA vs Net Income (Annual)</h4>
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
                                    <Bar dataKey="ebitda" name="EBITDA" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={30} />
                                    <Bar dataKey="netIncome" name="Net Income" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Income Statement Table */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-bold text-slate-900">Income Statement</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Breakdown</th>
                                    <th className="px-6 py-4 text-right">2023</th>
                                    <th className="px-6 py-4 text-right">2022</th>
                                    <th className="px-6 py-4 text-right">2021</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr className="font-bold bg-slate-50/50"><td className="px-6 py-3">Revenue</td><td className="px-6 py-3 text-right">$383.29B</td><td className="px-6 py-3 text-right">$394.33B</td><td className="px-6 py-3 text-right">$365.82B</td></tr>
                                <tr><td className="px-6 py-3 pl-10 text-slate-500">Cost of Revenue</td><td className="px-6 py-3 text-right">$214.14B</td><td className="px-6 py-3 text-right">$223.55B</td><td className="px-6 py-3 text-right">$212.98B</td></tr>
                                <tr className="font-bold bg-slate-50/50"><td className="px-6 py-3">Gross Profit</td><td className="px-6 py-3 text-right">$169.15B</td><td className="px-6 py-3 text-right">$170.78B</td><td className="px-6 py-3 text-right">$152.84B</td></tr>
                                <tr><td className="px-6 py-3 pl-10 text-slate-500">Operating Expenses</td><td className="px-6 py-3 text-right">$54.85B</td><td className="px-6 py-3 text-right">$51.35B</td><td className="px-6 py-3 text-right">$43.89B</td></tr>
                                <tr className="font-bold bg-slate-50/50"><td className="px-6 py-3">Net Income</td><td className="px-6 py-3 text-right text-emerald-600">$97.00B</td><td className="px-6 py-3 text-right text-emerald-600">$99.80B</td><td className="px-6 py-3 text-right text-emerald-600">$94.68B</td></tr>
                                <tr><td className="px-6 py-3 pl-10 text-slate-500">Basic EPS</td><td className="px-6 py-3 text-right">$6.16</td><td className="px-6 py-3 text-right">$6.15</td><td className="px-6 py-3 text-right">$5.67</td></tr>
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
                        <h4 className="text-sm font-bold text-slate-500 uppercase mb-4">Short vs Long Term Assets</h4>
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
                                    <Bar dataKey="current" name="Current Assets" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                                    <Bar dataKey="nonCurrent" name="Non-Current Assets" fill="#1e40af" radius={[4, 4, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <h4 className="text-sm font-bold text-slate-500 uppercase mb-4">Debt Structure</h4>
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
                                    <Bar dataKey="short" name="Short Term Debt" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={30} />
                                    <Bar dataKey="long" name="Long Term Debt" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-bold text-slate-900">Balance Sheet</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Breakdown</th>
                                    <th className="px-6 py-4 text-right">2023</th>
                                    <th className="px-6 py-4 text-right">2022</th>
                                    <th className="px-6 py-4 text-right">2021</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr className="font-bold bg-slate-50/50"><td className="px-6 py-3">Total Assets</td><td className="px-6 py-3 text-right">$352.58B</td><td className="px-6 py-3 text-right">$352.75B</td><td className="px-6 py-3 text-right">$351.00B</td></tr>
                                <tr><td className="px-6 py-3 pl-10 text-slate-500">Cash & Equivalents</td><td className="px-6 py-3 text-right">$29.97B</td><td className="px-6 py-3 text-right">$23.65B</td><td className="px-6 py-3 text-right">$34.94B</td></tr>
                                <tr className="font-bold bg-slate-50/50"><td className="px-6 py-3">Total Liabilities</td><td className="px-6 py-3 text-right">$290.43B</td><td className="px-6 py-3 text-right">$302.08B</td><td className="px-6 py-3 text-right">$287.91B</td></tr>
                                <tr><td className="px-6 py-3 pl-10 text-slate-500">Total Debt</td><td className="px-6 py-3 text-right">$111.00B</td><td className="px-6 py-3 text-right">$120.00B</td><td className="px-6 py-3 text-right">$125.00B</td></tr>
                                <tr className="font-bold bg-slate-50/50"><td className="px-6 py-3">Total Equity</td><td className="px-6 py-3 text-right">$62.15B</td><td className="px-6 py-3 text-right">$50.67B</td><td className="px-6 py-3 text-right">$63.09B</td></tr>
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
                        <h4 className="text-sm font-bold text-slate-500 uppercase mb-4">Operating vs Free Cash Flow</h4>
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
                                    <Bar dataKey="operating" name="Cash from Operating" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
                                    <Bar dataKey="free" name="Free Cash Flow" fill="#059669" radius={[4, 4, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <h4 className="text-sm font-bold text-slate-500 uppercase mb-4">Investing vs Financing</h4>
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
                                    <Bar dataKey="investing" name="Cash from Investing" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={30} />
                                    <Bar dataKey="financing" name="Cash from Financing" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-bold text-slate-900">Cash Flow Statement</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Breakdown</th>
                                    <th className="px-6 py-4 text-right">2023</th>
                                    <th className="px-6 py-4 text-right">2022</th>
                                    <th className="px-6 py-4 text-right">2021</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr className="font-bold bg-slate-50/50"><td className="px-6 py-3">Net Income</td><td className="px-6 py-3 text-right">$97.00B</td><td className="px-6 py-3 text-right">$99.80B</td><td className="px-6 py-3 text-right">$94.68B</td></tr>
                                <tr><td className="px-6 py-3 pl-10 text-slate-500">Depreciation</td><td className="px-6 py-3 text-right">$11.52B</td><td className="px-6 py-3 text-right">$11.10B</td><td className="px-6 py-3 text-right">$11.28B</td></tr>
                                <tr className="font-bold bg-slate-50/50"><td className="px-6 py-3">Cash from Operations</td><td className="px-6 py-3 text-right text-emerald-600">$110.54B</td><td className="px-6 py-3 text-right text-emerald-600">$122.15B</td><td className="px-6 py-3 text-right text-emerald-600">$104.04B</td></tr>
                                <tr><td className="px-6 py-3 pl-10 text-slate-500">Cash from Investing</td><td className="px-6 py-3 text-right">$3.71B</td><td className="px-6 py-3 text-right">-$22.35B</td><td className="px-6 py-3 text-right">-$14.55B</td></tr>
                                <tr><td className="px-6 py-3 pl-10 text-slate-500">Cash from Financing</td><td className="px-6 py-3 text-right">-$108.49B</td><td className="px-6 py-3 text-right">-$110.30B</td><td className="px-6 py-3 text-right">-$93.35B</td></tr>
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
