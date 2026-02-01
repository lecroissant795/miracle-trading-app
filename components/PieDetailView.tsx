import React from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, PieChart as PieChartIcon, Settings, Plus, RefreshCw, MoreHorizontal, ArrowUpRight, Trash2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Pie as PieType, Stock } from '../types';
import Card from './Card';
import Button from './Button';

interface PieDetailViewProps {
  pie: PieType;
  stocks: Stock[]; // Needed to get current prices/names
  onBack: () => void;
  onInvest: () => void;
  onDelete: () => void;
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#6366f1', '#ec4899', '#8b5cf6', '#ef4444', '#14b8a6'];

const PieDetailView: React.FC<PieDetailViewProps> = ({ pie, stocks, onBack, onInvest, onDelete }) => {
  // Helper to find stock info
  const getStockInfo = (symbol: string) => stocks.find(s => s.symbol === symbol);

  // Prepare chart data
  const chartData = pie.holdings.map(h => ({
    name: h.symbol,
    value: h.weight
  }));

  // Mock performance calculation based on random 'performance' in Pie object or stock movement
  const isPositive = pie.performance >= 0;

  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete "${pie.name}"? This will liquidate all holdings and return $${pie.value.toLocaleString()} to your cash balance.`)) {
      onDelete();
    }
  };

  return (
    <div className="p-8 pb-24 h-full overflow-y-auto animate-fade-in space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
          >
            <ArrowLeft size={22} />
          </button>
          <div>
            <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-slate-900">{pie.name}</h2>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs font-bold rounded-lg uppercase">Auto-Invest</span>
            </div>
            <p className="text-slate-500 text-sm">Created Oct 24, 2023 • {pie.holdings.length} Assets</p>
          </div>
        </div>
        <div className="flex gap-3">
             <Button variant="outline" className="hidden sm:flex">
                 <RefreshCw size={18} className="mr-2" /> Rebalance
             </Button>
             <Button onClick={onInvest}>
                 <Plus size={18} className="mr-2" /> Invest
             </Button>
             <button 
                onClick={handleDeleteClick}
                className="p-2.5 border border-red-200 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                title="Delete Pie"
             >
                 <Trash2 size={20} />
             </button>
        </div>
      </div>

      {/* Hero Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Value Card */}
          <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-between">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
              
              <div className="relative z-10 flex justify-between items-start">
                  <div>
                      <div className="text-slate-400 font-medium mb-1">Total Value</div>
                      <div className="text-4xl font-bold mb-4">${pie.value.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${isPositive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                          <span>{isPositive ? '+' : ''}{pie.performance}% All time</span>
                      </div>
                  </div>
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                      <PieChartIcon size={24} className="text-blue-300" />
                  </div>
              </div>

              <div className="relative z-10 grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
                  <div>
                      <div className="text-slate-400 text-xs uppercase font-bold mb-1">Dividend Yield</div>
                      <div className="font-semibold">1.42%</div>
                  </div>
                  <div>
                      <div className="text-slate-400 text-xs uppercase font-bold mb-1">Expense Ratio</div>
                      <div className="font-semibold">0.08%</div>
                  </div>
                  <div>
                      <div className="text-slate-400 text-xs uppercase font-bold mb-1">Risk Level</div>
                      <div className="font-semibold text-amber-400">Moderate</div>
                  </div>
              </div>
          </div>

          {/* Allocation Chart */}
          <Card className="flex flex-col items-center justify-center relative">
              <h3 className="absolute top-6 left-6 font-bold text-slate-900">Allocation</h3>
              <div className="w-full h-48 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                        ))}
                    </Pie>
                    <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                   {pie.holdings.slice(0, 4).map((h, i) => (
                       <div key={h.symbol} className="flex items-center gap-1 text-xs text-slate-500">
                           <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                           <span>{h.symbol}</span>
                       </div>
                   ))}
                   {pie.holdings.length > 4 && <span className="text-xs text-slate-400">+{pie.holdings.length - 4} more</span>}
              </div>
          </Card>
      </div>

      {/* Holdings List */}
      <div>
         <h3 className="text-xl font-bold text-slate-900 mb-4">Assets in this Pie</h3>
         <Card padding="none" className="overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                <tr>
                    <th className="px-6 py-4">Asset</th>
                    <th className="px-6 py-4 text-right">Target Weight</th>
                    <th className="px-6 py-4 text-right">Value</th>
                    <th className="px-6 py-4 text-right">Price</th>
                    <th className="px-6 py-4 text-right">Performance</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                {pie.holdings.map((holding, idx) => {
                    const stock = getStockInfo(holding.symbol);
                    const holdingValue = (pie.value * (holding.weight / 100));
                    // Mock individual performance
                    const holdingPerf = (Math.random() * 20) - 5; 
                    
                    return (
                    <tr key={holding.symbol} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: COLORS[idx % COLORS.length] }}>
                                {holding.symbol[0]}
                            </div>
                            <div>
                                <div className="font-semibold text-slate-900">{holding.symbol}</div>
                                <div className="text-xs text-slate-500">{stock?.name || 'Asset'}</div>
                            </div>
                        </div>
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-slate-700">
                           {holding.weight}%
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-slate-900">
                           ${holdingValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </td>
                        <td className="px-6 py-4 text-right text-slate-500">
                           ${stock?.price.toFixed(2) || '0.00'}
                        </td>
                        <td className="px-6 py-4 text-right">
                           <span className={`font-medium ${holdingPerf >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                               {holdingPerf >= 0 ? '+' : ''}{holdingPerf.toFixed(2)}%
                           </span>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
            </div>
         </Card>
      </div>
    </div>
  );
};

export default PieDetailView;