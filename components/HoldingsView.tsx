import React from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Search, ArrowUpRight } from 'lucide-react';
import { Portfolio, Stock } from '../types';
import Card from './Card';

interface HoldingsViewProps {
  portfolio: Portfolio;
  stocks: Stock[];
  onBack: () => void;
  onSelectStock: (stock: Stock) => void;
}

const HoldingsView: React.FC<HoldingsViewProps> = ({ portfolio, stocks, onBack, onSelectStock }) => {
  const getStock = (symbol: string) => stocks.find(s => s.symbol === symbol) || stocks[0];

  const totalInvested = portfolio.holdings.reduce((acc, h) => acc + (h.quantity * h.avgPrice), 0);
  const currentValue = portfolio.holdings.reduce((acc, h) => {
    const stock = getStock(h.symbol);
    return acc + (h.quantity * stock.price);
  }, 0);
  const totalReturn = currentValue - totalInvested;
  const totalReturnPercent = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

  return (
    <div className="p-8 h-full overflow-y-auto animate-fade-in space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
        >
          <ArrowLeft size={22} />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">All Holdings</h2>
          <p className="text-slate-500">Detailed view of your assets</p>
        </div>
      </div>

      {/* Portfolio Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
           <div className="text-sm text-slate-500 mb-1 font-medium">Total Equity</div>
           <div className="text-3xl font-bold text-slate-900">${currentValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
           <div className="text-sm text-slate-500 mb-1 font-medium">Total Return</div>
           <div className={`text-3xl font-bold ${totalReturn >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
             {totalReturn >= 0 ? '+' : ''}{totalReturn.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
             <span className="text-lg ml-2 font-medium">({totalReturnPercent.toFixed(2)}%)</span>
           </div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
           <div className="text-sm text-slate-500 mb-1 font-medium">Cash Balance</div>
           <div className="text-3xl font-bold text-slate-900">${portfolio.cashBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
        </div>
      </div>

      <Card padding="none" className="overflow-hidden min-h-[500px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Asset</th>
                <th className="px-6 py-4 text-right">Quantity</th>
                <th className="px-6 py-4 text-right">Avg. Price</th>
                <th className="px-6 py-4 text-right">Current Price</th>
                <th className="px-6 py-4 text-right">Total Value</th>
                <th className="px-6 py-4 text-right">Return</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {portfolio.holdings.map((holding) => {
                const stock = getStock(holding.symbol);
                const value = holding.quantity * stock.price;
                const gainLoss = value - (holding.quantity * holding.avgPrice);
                const gainLossPercent = ((stock.price - holding.avgPrice) / holding.avgPrice) * 100;
                
                return (
                  <tr key={holding.symbol} onClick={() => onSelectStock(stock)} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm">
                          {stock.symbol[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{stock.name}</div>
                          <div className="text-xs text-slate-500">{stock.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-slate-700">
                      {holding.quantity}
                    </td>
                    <td className="px-6 py-4 text-right text-slate-500">
                      ${holding.avgPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-slate-900">
                      ${stock.price.toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900">
                      ${value.toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className={`flex flex-col items-end ${gainLoss >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        <span className="font-bold text-sm">
                           {gainLoss >= 0 ? '+' : ''}{gainLoss.toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </span>
                        <span className="text-xs">
                           {gainLossPercent >= 0 ? '+' : ''}{gainLossPercent.toFixed(2)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-blue-600 transition-colors">
                          <ArrowUpRight size={20} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {portfolio.holdings.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <Search size={24} />
            </div>
            <h3 className="text-slate-900 font-medium mb-1">No holdings found</h3>
            <p className="text-slate-500 text-sm">Start trading to build your portfolio.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default HoldingsView;